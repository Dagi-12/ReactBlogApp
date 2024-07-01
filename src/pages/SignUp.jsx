import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import signUpValidators from "../validators/signUpValidators";
const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialFormError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = signUpValidators({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (error.name || error.email || error.password || error.confirmPassword) {
      setFormError(error);
    } else {
      try {
        setLoading(true);
        const body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        console.log("bodysent", body);
        const response = await axios
          .post("/auth/signup", body)
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
          console.log("elseeeeeeeeeeeeeeeeeeeee");
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
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup Form</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Dagim"
            value={formData.name}
            onChange={handleChange}
          />
          {formError.name && <p className="error">{formError.name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="dagimawiengidawork371@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <p className="error">{formError.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="***********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formError.confirmPassword && (
            <p className="error">{formError.confirmPassword}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="button"
            type="submit"
            value={`${loading ? "Processing..." : "Signup"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
