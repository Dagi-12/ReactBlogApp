import placeImg from "../../assets/images/place.jpeg";
import { useNavigate } from "react-router-dom";
const PostList = () => {
  const navigate=useNavigate()
  return (
    <div>
      <button className="button button-block" onClick={()=>navigate("new-post")}>Add New Post</button>
      <h2 className="table-title">PostList</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
      />

      <div className="flexbox-container wrap">
        <div className="post-card" onClick={()=>navigate("detail-post")}>
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
        <div className="post-card">
          <h4 className="card-title">React Blog Post</h4>
          <p className="card-desc">
            The description for the react blog post displayed here{" "}
          </p>
          <img src={placeImg} alt="mern" className="card-img" />
        </div>
      </div>
    </div>
  );
};
export default PostList;
