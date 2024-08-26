const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
const profileValidators = ({ name, email }) => {
  const errors = {
    name: "",
    email: "",
  };

  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  return errors;
};
export default profileValidators;
