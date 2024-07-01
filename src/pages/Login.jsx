import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import loginValidator from "../validators/loginValidator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialFormData = {
  email: "",
  password: "",
};
const initialFormError = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const error = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (error.email || error.password) {
      setFormError(error);
    } else {
      try {
        setLoading(true);

        const response = await axios
          .post("/auth/signin", formData)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          window.localStorage.setItem(
            "blogData",
            JSON.stringify(response.data)
          );
          toast.success(response.message, {
            autoClose: true,
          });
          setFormData(initialFormData);
          setLoading(false);
          navigate("/");
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
        setFormError(initialFormData);
      }
    }
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">LogIn</h2>
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
          <input
            className="button"
            type="submit"
            value={`${loading ? "Logging..." : "Login"}`}
          />
        </div>
      </form>
    </div>
  );
};
export default Login;
