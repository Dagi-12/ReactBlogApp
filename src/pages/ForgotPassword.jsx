import { useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import sendCodeValidator from "../validators/sendCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidato";
import { useNavigate } from "react-router-dom";
const initialFormData = {
  email: "",
  code: "",
  password: "",
};
const initialFormError = {
  code: "",
  password: "",
};
const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    const errors = sendCodeValidator({ email: formData.email });
    if (errors.email) {
      setEmailError(errors.email);
    } else {
      try {
        setLoading(true);
        const response = await axios
          .post("/auth/forgetPasswordCode", { email: formData.email })
          .then((res) => res.data);
        if (response.status) {
          toast.success(response.message, {
            autoClose: true,
          });

          setHasEmail(true);
        } else {
          toast.error("Error", {
            autoClose: true,
          });
        }
        setLoading(false);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            autoClose: true,
          });
        } else {
          toast.error("SomeThing went wrong ", {
            autoClose: true,
          });
        }
        setLoading(false);
      }
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const error = await recoverPasswordValidator({
      code: formData.code,
      password: formData.password,
    });
console.log("errrrprrrrrr",error)
    if (error.code || error.password) {
      setFormError(error);
    } else {
      try {
        setLoading(true);

        const response = await axios
          .post("/auth/recoverPassword", formData)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          toast.success(response.message, {
            autoClose: true,
          });
          setFormData(initialFormData);
          setLoading(false);
          navigate("/login");
        } else {
          toast.error("Error", {
            autoClose: true,
          });
        }

        setFormError(initialFormError);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            autoClose: true,
          });
        } else {
          toast.error("SomeThing went wrong ", {
            autoClose: true,
          });
        }
        setLoading(false);
        setFormError(initialFormData);
      }
    }
    console.log(formData);
  };
  return (
    <div className="form-container">
      <form
        className="inner-container"
        onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}
      >
        <h2 className="form-title">{`${
          !hasEmail ? "Recover Password" : "New Password"
        }`}</h2>
        {!hasEmail ? (
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="dagi@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Code</label>
              <input
                className="form-control"
                type="text"
                name="code"
                placeholder="1234"
                value={formData.code}
                onChange={handleChange}
              />
              {formError.code && <p className="error">{formError.code}</p>}
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
              />
              {formError.password && (
                <p className="error">{formError.password}</p>
              )}
            </div>
          </>
        )}

        <div className="form-group">
          <input
            className="button"
            type="submit"
            value={`${loading ? "Sending..." : "Send"}`}
          ></input>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
