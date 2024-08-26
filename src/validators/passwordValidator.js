const changePasswordValidator = ({ oldPassword, newPassword }) => {
  const errors = {
    oldPassword:"",
    newPassword:"",
  };

  //   if (!newPassword) {
  //     errors.newPassword = "newPassword is Required";
  //   } else if (newPassword.length < 6) {
  //     errors.newPassword = "Password must be 6 characters long ";
  //   }
  if (!newPassword) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters long";
  } else if (!/[a-z]/.test(newPassword)) {
    errors.newPassword = "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(newPassword)) {
    errors.newPassword = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(newPassword)) {
    errors.newPassword = "Password must contain at least one number";
  } else if (!/[!@#$%^&*]/.test(newPassword)) {
    errors.newPassword = "Password must contain at least one special character";
  }
  if(oldPassword&&oldPassword===newPassword){
    errors.newPassword="you are providing old password"
  }
  if (!oldPassword) {
    errors.oldPassword = "oldPassword is required";
  }

  return errors;
};
export default changePasswordValidator;
