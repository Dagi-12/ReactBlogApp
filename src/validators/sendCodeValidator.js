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
//    else if (!isEmail(email)) {
//     errors.email = "Invalid Email";
//   }

  return errors;
};

export default sendCodeValidator;
