const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
const loginValidator = ({ email, password }) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (!password) {
    errors.password = "password is Required";
  }

  return errors;
};
export default loginValidator;
