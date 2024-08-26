import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import addCategoryValidator from "../../validators/addCategoryValidator";
const initialFormData = {
  title: "",
  desc: "",
};

const initialFormError = {
  title: "",
};

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const categoryId = param.id;

  useEffect(() => {
    if (categoryId) {
      const getCategory = async () => {
        try {
          const response = await axios
            .get(`/category/getCategory/${categoryId}`)
            .then((res) => res.data);
          console.log("data", response);
          setFormData({
            title: response.data.category.title,
            desc: response.data.category.desc,
          });
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

          setFormError(initialFormData);
        }
      };

      getCategory();
    }
  }, [categoryId]);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = addCategoryValidator({ title: formData.title });
    if (error.title) {
      setFormError(error);
    } else {
      try {
        setLoading(true);
        const response = await axios
          .put(`/category/updateCategory/${categoryId}`, formData)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          toast.success(response.message, {
            autoClose: true,
          });
          setFormData(initialFormData);
          setLoading(false);
          navigate(-1);
        } else {
          toast.error("Error", {
            autoClose: true,
          });
          setLoading(false);
        }

        setFormError(initialFormError);
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
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Title here"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Description here"
              value={formData.desc}
              onChange={handleChange}
            />
            {formError.desc && <p className="error">{formError.desc}</p>}
          </div>
          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Updating..." : "Update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateCategory;
