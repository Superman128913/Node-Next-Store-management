const creditCardValidation = (creditCardNum) => {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  let isValid = false;

  if (visaRegEx.test(creditCardNum)) {
    isValid = true;
  } else if (mastercardRegEx.test(creditCardNum)) {
    isValid = true;
  } else if (amexpRegEx.test(creditCardNum)) {
    isValid = true;
  } else if (discovRegEx.test(creditCardNum)) {
    isValid = true;
  }
  return isValid;
};

export default creditCardValidation;