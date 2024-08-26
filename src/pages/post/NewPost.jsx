// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import addPostValidator from "../../validators/addPostValidator";
// const initialFormData = {
//   title: "",
//   desc: "",
//   category: "",
// };

// const initialFormError = {
//   title: "",
//   category: "",
// };

// const NewPost = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [formError, setFormError] = useState(initialFormError);
//   const [loading, setLoading] = useState(false);
//   const [category, setCategory] = useState([]);
//   const [extensionError, setExtensionError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const response = await axios
//           .get(`/category/getCategories?size=1000`)
//           .then((res) => res.data);

//         setCategory(response.data.categories);
//       } catch (error) {
//         if (error.response) {
//           toast.error(error.response.data.message, {
//             autoClose: true,
//           });
//         } else {
//           toast.error("Some Thing Went Wrong", {
//             autoClose: true,
//           });
//         }
//         setFormError(initialFormData);
//       }
//     };

//     getCategories();
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("form Data", formData, "form Error", formError);
//     const error = addPostValidator({
//       title: formData.title,
//       category: formData.category,
//     });
//     if (error.title || error.category) {
//       setFormError(error);
//     } else {
//       try {
//         setLoading(true);

//         const response = await axios
//           .post("/post/addPost", formData)
//           .then((res) => res.data);

//         console.log("api post response", response);
//         if (response.status) {
//           toast.success(response.message, {
//             autoClose: true,
//           });
//           setFormData(initialFormData);
//           setLoading(false);
//           navigate(-1);
//         } else {
//           toast.error("Error", {
//             autoClose: true,
//           });
//           setLoading(false);
//         }

//         setFormError(initialFormError);
//       } catch (error) {
//         if (error.response) {
//           toast.error(error.response.data.message, {
//             autoClose: true,
//           });
//         } else {
//           toast.error("SomeThing went wrong ", {
//             autoClose: true,
//           });
//         }
//         setLoading(false);
//         setFormError(initialFormData);
//       }
//     }
//   };
//   console.log("formData", formData);
//   const handleFileChange = async (e) => {
//     console.log(e.target.files);
//     const formInput = new FormData();
//     formInput.append("image", e.target.files[0]);
//     const type = e.target.files[0].type;
//     console.log("dataType", type);
//     if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
//       setExtensionError(null);
//       //
//       try {
//         const response = await axios
//           .post("/file/upload", formInput)
//           .then((res) => res.data);

//         console.log("api post response", response);
//         if (response.status) {
//           toast.success(response.message, {
//             autoClose: true,
//           });
//         } else {
//           toast.error("Error", {
//             autoClose: true,
//           });
//           setLoading(false);
//         }
//       } catch (error) {
//         if (error.response) {
//           toast.error(error.response.data.message, {
//             autoClose: true,
//           });
//         } else {
//           toast.error("SomeThing went wrong ", {
//             autoClose: true,
//           });
//         }
//       }
//       //
//     } else {
//       setExtensionError(`only jpg,jpeg and png files are allowed`);
//     }
//   };
//   return (
//     <div>
//       <button className="button button-block" onClick={() => navigate(-1)}>
//         Go Back
//       </button>
//       <div className="form-container">
//         <form className="inner-container" onSubmit={handleSubmit}>
//           <h2 className="form-title">New Post</h2>
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               className="form-control"
//               type="text"
//               name="title"
//               placeholder="React Blog post"
//               value={formData.title}
//               onChange={handleChange}
//             />
//             {formError.title && <p className="error">{formError.title}</p>}
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <input
//               className="form-control"
//               type="text"
//               name="desc"
//               placeholder="Description here"
//               value={formData.desc}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Select an image</label>
//             <input
//               className="form-control"
//               type="file"
//               name="file"
//               placeholder="File uploaded here"
//               onChange={handleFileChange}
//             />
//             {extensionError && <p className="error">{extensionError}</p>}
//           </div>
//           <div className="form-group">
//             <label>Select a Category</label>
//             <select
//               className="form-control"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               {category.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.title}
//                 </option>
//               ))}
//             </select>
//             {formError.category && (
//               <p className="error">{formError.category}</p>
//             )}
//           </div>
//           <div className="form-group">
//             <input
//               className="button"
//               type="submit"
//               value={`${loading ? "Adding..." : "Add"}`}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default NewPost;
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";
const initialFormData = {
  title: "",
  desc: "",
  category: "",
  file: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios
          .get(`/category/getCategories?size=1000`)
          .then((res) => res.data);

        setCategory(response.data.categories);
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

    getCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form Data", formData, "form Error", formError);
    const error = addPostValidator({
      title: formData.title,
      category: formData.category,
    });
    if (error.title || error.category) {
      setFormError(error);
    } else {
      try {
        setLoading(true);
        formData.file = fileId;
        console.log("formData before adding post", formData);
        const response = await axios
          .post("/post/addPost", formData)
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
  console.log("formData", formData);
  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);
    const type = e.target.files[0].type;
    console.log("dataType", type);
    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);
      //
      try {
        const response = await axios
          .post("/file/upload", formInput)
          .then((res) => res.data);

        console.log("api post response", response);
        if (response.status) {
          const idd = response.data.file_id;
          setFileId(idd);
          console.log("fileId in file ", fileId);
          toast.success(response.message, {
            autoClose: true,
          });
        } else {
          toast.error("Error", {
            autoClose: true,
          });
          setLoading(false);
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
      }
      //
    } else {
      setExtensionError(`only jpg,jpeg and png files are allowed`);
    }
  };
  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React Blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="desc"
              placeholder="Description here"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="File uploaded here"
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>
          <div className="form-group">
            <label>Select a Category</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {category.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="error">{formError.category}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Adding..." : "Add"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPost;
