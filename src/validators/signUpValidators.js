const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
const signUpValidators = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (!password) {
    errors.password = "password is Required";
  } else if (password.length < 6) {
    errors.password = "Password must be 6 characters long ";
  }
 if (password !== confirmPassword) {
   errors.confirmPassword = "Confirm Password does not match ";
 }

  return errors;
};
export default signUpValidators;
