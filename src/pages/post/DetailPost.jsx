import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import placeImg from "../../assets/images/place.jpeg";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const DetailPost = () => {
  const [post, setPost] = useState({});
  const [mimeType, setMimeType] = useState("");
  const [base64String, setBase64String] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const param = useParams();
  const postId = param.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          const response = await axios
            .get(`post/getSinglePost/${postId}`)
            .then((res) => res.data);
          const postData = response.data.post;
          const fileId = postData.file ? postData.file._id : null;
          console.log("responseData", postData);
          setPost(postData);
          if (fileId) {
            const fileData = await axios
              .get(`file/getFile/${fileId}`)
              .then((res) => res.data);
            const mime = fileData.data.mimetype;
            const base64 = fileData.data.data;
            setMimeType(mime);
            setBase64String(base64);
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message, {
              autoClose: true,
            });
          } else {
            toast.error(error.message, {
              autoClose: true,
            });
          }
        }
      };

      getPost();
    }
  }, [postId]);
  console.log("post", post);
  const handleDelete = async () => {
    try {
      const result = await axios
        .delete(`/post/delete/${postId}`)
        .then((res) => res.data);

      toast.success(result.message, {
        autoClose: true,
      });
      navigate(-1);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
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
  };
  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <button
        className="button button-block"
        onClick={() => {
          navigate(`/posts/update-post/${postId}`);
        }}
      >
        <FontAwesomeIcon icon={faPen} /> Update Post
      </button>
      <button
        className="delete-button button-block "
        onClick={() => setShowModal(true)}
      >
     <FontAwesomeIcon icon={faTrash} />   Delete Post
      </button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">Category: {post?.category?.title}</h5>
        <h5 className="post-category">
          CreatedAt:{new Date(post?.createdAt).toLocaleString()}
        </h5>
        <h5 className="post-category">
          UpdatedAt: {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <p className="post-desc">{post?.desc}</p>
        <img src={`data:${mimeType};base64,${base64String}`} alt=" Image" />
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              No
            </Button>{" "}
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default DetailPost;
