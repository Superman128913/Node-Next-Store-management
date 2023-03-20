var MONGO_DB_DATABASE = "amine-db";
var MONGO_DB_USERNAME = "mongodb";
var MONGO_DB_PASSWORD = "mongodb";

var db = connect(`mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@localhost:27017/`);

db = db.getSiblingDB(MONGO_DB_DATABASE); // we can not use "use" statement here to switch db

db.createCollection("users"); //MongoDB creates the database when you first store data in that database

db.createUser(
    {
        user: "mongodb",
        pwd: "mongodb",
        roles: [ { role: "readWrite", db: MONGO_DB_DATABASE} ],
        passwordDigestor: "server",
    }
)
