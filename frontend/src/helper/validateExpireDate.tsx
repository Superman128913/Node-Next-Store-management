const mmyyyyDateValidation = (expireDate) => {
  const regEx = /^(0?[1-9]|1[012])[/-]\d{4}$/;
  return expireDate.match(regEx);
};

export default mmyyyyDateValidation;
