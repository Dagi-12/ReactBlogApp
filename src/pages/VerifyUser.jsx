// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "../utils/axiosInstance";
// import { useAuth } from "../components/context/AuthContext";
// const VerifyUser = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [code, setCode] = useState("");
//   const [codeError, setCodeError] = useState("");
//   const [loading2, setLoading2] = useState(false);

//   const handleSendVerificationCode = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading2(true);
//       const response = await axios
//         .post("/auth/verifyUser", { email: auth.email, code: code })
//         .then((res) => res.data);
//       console.log("api post response", response);
//       if (response.status) {
//         toast.success(response.message, {
//           autoClose: true,
//         });
//         window.localStorage.removeItem("blogData");
//         navigate("/login")
//         setLoading2(false);
//       } else {
//         toast.error("Error", {
//           autoClose: true,
//         });

//         setLoading2(false);
//       }
//       setCode("");
//       setCodeError("");
//     } catch (error) {
//       setCode("");
//       setCodeError("");
//       if (error.response) {
//         toast.error(error.response.data.message, {
//           autoClose: true,
//         });
//       } else {
//         toast.error("SomeThing went wrong ", {
//           autoClose: true,
//         });
//       }
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (code) {
//       try {
//         setLoading(true);

//         const response = await axios
//           .post("/auth/send-verification-email", { email: auth.email })
//           .then((res) => res.data);

//         console.log("api post response", response);
//         if (response.status) {
//           toast.success(response.message, {
//             autoClose: true,
//           });

//           setLoading(false);
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
//         setLoading(false);
//       }
//     } else {
//       setCodeError("code is required");
//     }
//   };
//   return (
//     <div>
//       <button className="button button-block" onClick={() => navigate(-1)}>
//         Go Back
//       </button>
//       <button
//         className="button button-block"
//         onClick={handleSendVerificationCode}
//       >
//         {`${loading ? "Sending Code..." : "Send Verification Code"}`}
//       </button>
//       <div className="form-container">
//         <form className="inner-container" onSubmit={handleSubmit}>
//           <h2 className="form-title">Verify User</h2>
//           <div className="form-group">
//             <label>Confirmation code</label>
//             <input
//               className="form-control"
//               type="text"
//               name="code"
//               placeholder="123456"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//             {codeError && <p className="error">{codeError}</p>}
//           </div>
//           <div className="form-group">
//             <input className="button" type="submit" value={`${loading2 ? "Verifying...": "Verify"} `} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default VerifyUser;
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useAuth } from "../components/context/AuthContext";

const VerifyUser = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false); // For sending the verification email
  const [loading2, setLoading2] = useState(false); // For verifying the code
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading for sending verification email
      const response = await axios
        .post("/auth/send-verification-email", { email: auth.email })
        .then((res) => res.data);

      console.log("api post response", response);
      if (response.status) {
        toast.success(response.message, {
          autoClose: true,
        });
      } else {
        toast.error("Error sending code", {
          autoClose: true,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          autoClose: true,
        });
      } else {
        toast.error("Something went wrong", {
          autoClose: true,
        });
      }
    } finally {
      setLoading(false); // Reset loading after sending
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setCodeError("Code is required");
      return;
    }

    try {
      setLoading2(true); // Set loading for verifying the code
      const response = await axios
        .post("/auth/verifyUser", { email: auth.email, code })
        .then((res) => res.data);

      console.log("api post response", response);
      if (response.status) {
        toast.success(response.message, {
          autoClose: true,
        });
        window.localStorage.removeItem("blogData");
        navigate("/login");
      } else {
        toast.error("Error verifying code", {
          autoClose: true,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          autoClose: true,
        });
      } else {
        toast.error("Something went wrong", {
          autoClose: true,
        });
      }
    } finally {
      setLoading2(false); // Reset loading after verifying
      setCode(""); // Clear code field after submission
      setCodeError(""); // Reset error
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>

      {/* Send Verification Code Button */}
      <button
        className="button button-block"
        onClick={handleSendVerificationCode}
      >
        {loading ? "Sending Code..." : "Send Verification Code"}
      </button>

      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Verify User</h2>

          <div className="form-group">
            <label>Confirmation code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {codeError && <p className="error">{codeError}</p>}
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={loading2 ? "Verifying..." : "Verify"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
