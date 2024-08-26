import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import changePasswordValidator from "../validators/passwordValidator";
import { useAuth } from "../components/context/AuthContext";
const initialFormData = {
  oldPassword: "",
  newPassword: "",
};
const initialFormError = {
  oldPassword: "",
  newPassword: "",
};
const Setting = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = changePasswordValidator({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
    console.log("form error", error);
    if (error.oldPassword || error.newPassword) {
      setFormError(error);
    } else {
      try {
        setLoading(true);
        const response = await axios
          .put("/auth/changePassword", formData)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          toast.success(response.message, {
            autoClose: true,
          });
          setFormData(initialFormData);
          setFormError(initialFormError);
          setLoading(false);
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
          setLoading(false);
        }
        setLoading(false);
        setFormError(initialFormError);
      }
    }
    console.log(formData);
  };
  return (
    <div>
      <button className="button button-block" onClick={() => navigate("/")}>
        Go Back
      </button>
      {!auth.isVerified && (
        <button
          className="button button-block"
          onClick={() => navigate("/verify-user")}
        >
          Verify User
        </button>
      )}
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Change Password</h2>
          <div className="form-group">
            <label>Old Password</label>
            <input
              className="form-control"
              type="password"
              name="oldPassword"
              placeholder="******"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            {formError.oldPassword && (
              <p className="error">{formError.oldPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="******"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {formError.newPassword && (
              <p className="error">{formError.newPassword}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Changing..." : "Change"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Setting;
