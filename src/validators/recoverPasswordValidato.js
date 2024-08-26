const recoverPasswordValidator = ({ code, password }) => {
    console.log("code and pass",code,password)
  const errors = {
    code: "",
    password: "",
  };

  if (!code) {
    errors.code = "Code is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password("password is at least 6 char long");
  }
  return errors;
};

export default recoverPasswordValidator