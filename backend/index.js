require("./DB/Connect");
require("dotenv").config();

let Express = require("express");
let Cors = require("cors");
let bcrypt = require("bcrypt");
let bodyParser = require('body-parser')
let App = Express();

let UserModel = require("./DB/Users");
let StoreModel = require("./DB/Stores");
let ReviewModel = require("./DB/Reviews");
let mailer = require("./utils/mailer");
let Stripe = require('./utils/stripe')

App.use('/webhook', bodyParser.raw({ type: 'application/json' }))

App.use(Express.json());
App.use(Cors());

var jwt = require("jsonwebtoken");
let jwtKey = process.env.JWT_KEY;

let Verify = (Req, Res, next) => {
  let Token = Req.headers["authorization"];
  if (Token) {
    jwt.verify(Token, jwtKey, (Err, Valid) => {
      if (Err) {
        Res.status(401).json(Err);
      } else {
        next();
      }
    });
  } else {
    Res.status(401).json("Unauthorized access.");
  }
};
String.prototype.pick = function (min, max) {
  var n,
    chars = "";

  if (typeof max === "undefined") {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  for (var i = 0; i < n; i++) {
    chars += this.charAt(Math.floor(Math.random() * this.length));
  }

  return chars;
};

// Credit to @Christoph: http://stackoverflow.com/a/962890/464744
String.prototype.shuffle = function () {
  var array = this.split("");
  var tmp,
    current,
    top = array.length;

  if (top)
  {
    while (--top > 0) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }

  return array.join("");
};

let GenRandomPassword = () => {
  var specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "0123456789";

  var all = specials + lowercase + uppercase + numbers;

  var password = "";
  password += specials.pick(1);
  password += lowercase.pick(1);
  password += uppercase.pick(1);
  password += all.pick(10, 12);
  password = password.shuffle();

  return password;
};

let GenVerificationCode = () => {
  var numbers = "0123456789";
  var code = numbers.pick(6).shuffle();

  return code;
};

App.post("/register", async (Req, Res) => {
  const data = Req.body;
  const { email, password } = Req.body;
  let User = await UserModel.findOne({ email });
  if (User && !User["verification_code"]) {
    Res.send({ Error: "Already registered email." });
  } else {
    if (User) await UserModel.deleteOne({ email });
    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in the database
          data["password"] = hash;
          data["verification_code"] = GenVerificationCode();
          let User = new UserModel(data);
          let result = await User.save();
          Res.send({ User: result });
        });
      });
    } catch (error) {
      Res.send({ Error: error });
    }
  }
});

App.post("/login", async (Req, Res) => {
  const { email, password } = Req.body;
  let User = await UserModel.findOne({ email });
  if (User) {
    if (User["verification_code"]) Res.send({ Error: "Non-verified User." });
    else {
      try {
        bcrypt.compare(
          password,
          User["password"],
          async function (err, result) {
            if (result) {
              // password is valid
              var token = jwt.sign({ User }, jwtKey);

              Res.send({ User: User, Token: token });
            } else Res.send({ Error: "Wrong Password." });
          }
        );
      } catch (error) {
        Res.send({ Error: error });
      }
    }
  } else {
    Res.send({ Error: "Unregistered Email." });
  }
});

App.post("/reset-password", async (Req, Res) => {
  let User = await UserModel.findOne(Req.body);
  if (User) {
    try {
      const password = GenRandomPassword();
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in the database
          User['password'] = hash;
          await User.save();

          const to = User.email;
          const subject = "Your password was changed";
          const body = `<p>This is your new password:</p><p>${password}</p>`;

          await mailer.sendMail(to, subject, body);
          Res.send({ Result: "Success" });
        });
      });
    } catch (error) {
      Res.send({ Error: error });
    }
  } else {
    Res.send({ Error: "Unregistered User." });
  }
});

App.post("/send-code-by-email", async (Req, Res) => {
  let User = await UserModel.findOne(Req.body);
  if (User) {
    try {
      const to = User.email;
      const subject = "Welcome to our site!";
      const body = `<p>This is your verification code:</p><p>${User.verification_code}</p>`;

      await mailer.sendMail(to, subject, body);

      Res.send({ Result: "Success" });
    } catch (error) {
      Res.send({ Error: error });
    }
  } else {
    Res.send({ Error: "Unregistered User." });
  }
});

App.post("/verify-account", async (Req, Res) => {
  const { email, code } = Req.body;
  let User = await UserModel.findOne({ email });
  if (User) {
    if (code == User["verification_code"]) {
      try {
        let result = await UserModel.updateOne(Req.body, {
          $unset: { verification_code: code },
        });
        Res.send({ User: result });
      } catch (error) {
        Res.send({ Error: error });
      }
    } else {
      Res.send({ Error: "Invalid Code" });
    }
  } else {
    Res.send({ Error: "Unregistered User." });
  }
});

// Get all stores of current user
App.get("/get-store-list/:user_id", async (Req, Res) => {
  await StoreModel.deleteMany({ billing_id: null });

  let page = parseInt(Req.query.page, 10) || 1;
  let limit = parseInt(Req.query.limit, 10) || 5;
  let query = [
    { $match: Req.params },
    { $sort: { _id: -1 } },
    { $setWindowFields: { output: { totalCount: { $count: {} } } } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ];
  StoreModel.aggregate(query).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
  // StoreModel.find()
  //     .skip((page - 1) * limit)
  //     .limit(limit)
  // .exec(function (err, doc) {
  //     if(err) { Res.status(500).json(err); return; };
  //     Res.status(200).json(doc);
  //     });
});

// Get all stores for selection
App.get("/get-store-select-list/:user_id", async (Req, Res) => {
  await StoreModel.deleteMany({ billing_id: null });

  let query = [
    { $match: Req.params },
    { $sort: { active: -1, _id: -1 } },
    {
      $project: {
        label: "$name",
        active: "$active"
      },
    },
  ];
  StoreModel.aggregate(query).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
});

// Add new store
App.post("/add-store", Verify, async (Req, Res) => {
  let Data = new StoreModel(Req.body);
  let Result = await Data.save();

  Res.send(Result);
});

// Get a single store
App.get("/get-single-store/:_id", async (Req, Res) => {
  StoreModel.findOne(Req.params).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
});

// Delete a store
App.delete("/delete-store/:_id", Verify, async (Req, Res) => {
  let { _id } = Req.params;  
  await StoreModel.findOne(Req.params);
  await Stripe.removeCustomerByID(Store.billing_id);
  await ReviewModel.deleteMany({ store_id: _id });
  await StoreModel.deleteOne(Req.params);

  Res.status(204).end();
});

// Update a store
App.put("/update-store/:_id", Verify, async (Req, Res) => {
  StoreModel.updateOne(Req.params, {
    $set: Req.body,
  }).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
});

// Check if secretcode for store exists
App.post("/check-if-secretcode/:_id", async (Req, Res) => {
  const { email } = Req.body;
  await StoreModel.findOne(Req.params).exec(async function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    if (doc.secretcode) {
      try {
        const to = email;
        const subject = `You need to input verification code to review ${doc.name}`;
        const body = `<p>This is verification code:</p><p>${doc.secretcode}</p>`;

        await mailer.sendMail(to, subject, body);

        Res.status(200).json({ secretcode: true });
      } catch (error) {
        Res.send({ Error: error });
      }
    } else {
      Res.status(200).json({ secretcode: false });
    }
  });
});

// Verify secretcode to review
App.post("/verify-secretcode/:_id", async (Req, Res) => {
  const { code } = Req.body;
  await StoreModel.findOne(Req.params).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json({ valid: doc.secretcode == code ? true : false });
  });
});

// Get all reviews of current store
App.get("/get-all-reviews/:store_id", async (Req, Res) => {
  let page = parseInt(Req.query.page, 10) || 1;
  let limit = parseInt(Req.query.limit, 10) || 5;
  let order = parseInt(Req.query.order, 10) || 1;
  let query = [
    { $match: Req.params },
    { $sort: { _id: order } },
    { $setWindowFields: { output: { totalCount: { $count: {} } } } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ];
  ReviewModel.aggregate(query).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
});

// Get total average and 5 recent reviews of current store
App.get("/get-review-list/:store_id", async (Req, Res) => {
  let query_for_average = [
    { $match: Req.params },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
      },
    },
  ];
  ReviewModel.aggregate(query_for_average).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }

    const data = {
      average: doc[0] ? doc[0]["average"] : 0,
    };
    let query_for_data = [
      { $match: Req.params },
      { $sort: { date: -1 } },
      { $limit: 5 },
    ];
    ReviewModel.aggregate(query_for_data).exec(function (err, doc) {
      if (err) {
        Res.status(500).json(err);
        return;
      }

      data["data"] = doc;
      Res.status(200).json(data);
    });
  });
});

// Add new review
App.post("/add-review", async (Req, Res) => {
  const { origin_url, data } = Req.body;
  try {
    const random_string = GenVerificationCode();
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(random_string, salt, async function (err, hash) {
        // Store hash in the database
        const code = hash.replace('/', '.');
        data["verification_code"] = code
        let Review = new ReviewModel(data);
        await Review.save();
        
        const verify_url = `${origin_url}/verify-email/${code}`;
        const to = data["email"];
        const subject = "Please verify your email";
        const body = `<p>Access here to verify:</p><a href="${verify_url}">${verify_url}</a>`;

        await mailer.sendMail(to, subject, body);

        Res.status(200).json({ Result: "Success" });
      });
    });
  } catch (error) {
    Res.send({ Error: error });
  }
});

// Get a single store
App.get("/get-single-review/:_id", async (Req, Res) => {
  ReviewModel.findOne(Req.params).exec(function (err, doc) {
    if (err) {
      Res.status(500).json(err);
      return;
    }
    Res.status(200).json(doc);
  });
});

// Verify email for review
App.put("/verify-email/:verification_code", async (Req, Res) => {
  let Review = await ReviewModel.findOne(Req.params);
  if (Review) {
    try {
      if(Review.verified)
        Res.send({ Error: "Already verified." });
      else{
        Review['verified'] = true;
        await Review.save();
        
        Res.status(200).json(Review);
      }
    } catch (error) {
      Res.send({ Error: error });
    }
  } else {
    Res.send({ Error: "Invalid Token." });
  }
});

App.post('/checkout/:_id', async (Req, Res) => {
  const { source_url } = Req.body
  const Store = await StoreModel.findOne(Req.params);
  if (!Store.billing_id) {
    customerInfo = await Stripe.addNewCustomer();
    Store["billing_id"] = customerInfo.id;
    await Store.save();
  }
  await Stripe.createCheckoutSession(source_url, Store.billing_id)
    .then(session => {
      Res.status(200).json({ session_url: session.url });
    }).catch(error => {
      Res.send({ Error: error })
    });
});

App.post('/billing/:_id', async (Req, Res) => {
  const Store = await StoreModel.findOne(Req.params);
  if (!Store.billing_id) {
    customerInfo = await Stripe.addNewCustomer();
    Store["billing_id"] = customerInfo.id;
    await Store.save();
  }
  await Stripe.createBillingSession(Store.billing_id)
    .then(session => {
      Res.status(200).end(session.url);
    }).error(error => {
      Res.send({ Error: error })
    });
})

App.post('/webhook', async (Req, Res) => {
  let event;

  try {
    event = Stripe.createWebhook(Req.body, Req.header('Stripe-Signature'));
  } catch (err) {
    console.log(err);
    return Res.sendStatus(400);
  }

  const data = event.data.object;

  console.log(event.type, data);
  switch (event.type) {
    case 'customer.created':
      console.log(JSON.stringify(data));
      break
    case 'invoice.paid':
      break
    case 'checkout.session.completed': {
      const Store = await StoreModel.findOne({ billing_id: data.customer });

      if (data.status === 'complete') {
        if (Store) {
          Store["end_date"] = new Date(data.expires_at * 1000);
          Store["active"] = true;
          await Store.save()
        }
      }

      console.log('customer changed', JSON.stringify(data))
      break
    }
    case 'customer.subscription.created': {
      const Store = await StoreModel.findOne({ billing_id: data.customer });

      if (data.status === 'active') {
        if (Store) {
          Store["end_date"] = new Date(data.current_period_end * 1000);
          Store["active"] = true;
          await Store.save()
        }
      }

      console.log('customer changed', JSON.stringify(data))
      break
    }
    case 'customer.subscription.updated': {
      // started trial
      const Store = await StoreModel.findOne({ billing_id: data.customer });
      
      if (data.status === 'active') {
        if (Store) {
          Store["end_date"] = new Date(data.current_period_end * 1000);
          Store["active"] = true;
          await Store.save()
        }
      }

      if (data.canceled_at) {
        // cancelled
        console.log('You just canceled the subscription' + data.canceled_at)
        if (Store) {
          Store["end_date"] = null
          Store["active"] = false;
          await Store.save()
        }
      }

      console.log('customer changed', JSON.stringify(data))
      break
    }
    case 'customer.subscription.deleted': {
      // started trial
      const Store = await StoreModel.findOne({ billing_id: data.customer });

      // cancelled
      console.log('You just canceled the subscription' + data.canceled_at)
      if (Store) {
        Store["end_date"] = null
        Store["active"] = false;
        await Store.save()
      }

      console.log('customer changed', JSON.stringify(data))
      break
    }
    default:
  }
  Res.sendStatus(200)
})

const port = 4500

App.listen(port, () => console.log(`Listening on port ${port}!`))
