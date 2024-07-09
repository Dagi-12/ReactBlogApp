import { useNavigate } from "react-router-dom";
import placeImg from "../../assets/images/place.jpeg";
const DetailPost = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className="button button-block" onClick={()=>{navigate("/posts/update-post");}}>Update Post</button>
      <div className="detail-container">
        <h2 className="post-title">React Blog Post</h2>
        <h5 className="post-category">Category: Category 1</h5>
        <h5 className="post-category">CreatedAt: 7/4/24</h5>
        <h5 className="post-category">UpdatedAt: 7/3/24</h5>
        <p className="post-desc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
          numquam a laudantium suscipit ex eligendi. Dicta aliquam, ea aut nulla
          dolor illum rem non, minus nobis, accusamus nesciunt distinctio
          fugiat?
        </p>
        <img src={placeImg} alt="mern"  />
      </div>
    </div>
  );
};
export default DetailPost;
