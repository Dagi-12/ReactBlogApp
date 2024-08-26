import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import profileValidators from "../validators/profileValidator";
const initialFormData = {
  name: "",
  email: "",
};
const initialFormError = {
  name: "",
  email: "",
};
const Profile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [oldEmail, setOldEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios
          .get(`/auth/current-user`)
          .then((res) => res.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
        });
        setOldEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            autoClose: true,
          });
        } else {
          toast.error("Some Thing Went Wrong", {
            autoClose: true,
          });
        }
        setFormError(initialFormData);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = profileValidators({
      name: formData.name,
      email: formData.email,
    });

    if (error.name || error.email) {
      setFormError(error);
    } else {
      try {
        setLoading(true);
        console.log("bodysent", formData);
        const response = await axios
          .put("/auth/updateProfile", formData)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          toast.success(response.message, {
            autoClose: true,
          });
          setLoading(false);
        } else {
          toast.error("Error", {
            autoClose: true,
          });
        }

        setFormError(initialFormError);
        setLoading(false);
        if (oldEmail !== formData.email) {
          window.localStorage.removeItem("blogData");
          navigate("/login");
        }
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
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Profile</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Dagimawi"
              value={formData.name}
              onChange={handleChange}
            />
            {formError.name && <p className="error">{formError.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="dagimawiengidawork@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {formError.email && <p className="error">{formError.email}</p>}
          </div>
          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={loading ? "Updating..." : "Update"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
