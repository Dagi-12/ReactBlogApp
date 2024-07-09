import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await axios
          .get(`/category/getCategories?page=${currentPage}&q=${searchValue}`)
          .then((res) => res.data);

        setCategory(response.data.categories);
        setTotalPage(response.data.pages);
        console.log("get response", category);
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
        }
        setLoading(false);
        setFormError(initialFormData);
      }
    };

    getCategories();
  }, [currentPage]);
  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];
      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }
      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);
  console.log("page count ", pageCount);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input);
      const response = await axios
        // .get(`/category/getCategories?page=${currentPage}&q=${input}`)
        .get(`/category/getCategories?q=${input}`)
        .then((res) => res.data);

      setCategory(response.data.categories);
      setTotalPage(response.data.pages);
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
  };
  const handleDelete = async () => {
    try {
      const result = await axios
        .delete(`/category/deleteCategory/${categoryId}`)
        .then((res) => res.data);

      toast.success(result.message, {
        autoClose: true,
      });
      const response = await axios
        .get(`/category/getCategories?page=${currentPage}&q=${searchValue}`)
        .then((res) => res.data);

      setCategory(response.data.categories);
      setTotalPage(response.data.pages);
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
      <button
        className="button button-block"
        onClick={() => navigate("new-category")}
      >
        Add New Category
      </button>
      <h2 className="table-title">Category List</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search  here"
        onChange={handleSearch}
      />
      {loading ? (
        "Loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category._id}>
                <td>{category.title}</td>
                <td>{category.desc}</td>
                <td>
                  {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>
                  {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <th>
                  <button
                    className="button"
                    onClick={() => navigate(`update-category/${category._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      setCategoryId(category._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pageCount.length > 0 && (
        <div className="pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={() => {
          setCategoryId(null);
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
                setCategoryId(null);
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
export default CategoryList;
