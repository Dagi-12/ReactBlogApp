const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
const sendCodeValidator = (email) => {
  const errors = {
    email: "",
  };
  if (!email) {
    errors.email = "Email is required";
  }


  return errors;
};

export default sendCodeValidator;
