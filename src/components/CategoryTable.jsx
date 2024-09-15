import React, { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../services/API";
import Popup from "./Popup";
import Spinner from "./Spinner";
import editIcon from "../assets/edit-icon.svg";
import trashIcon from "../assets/trash-icon.svg";
import "../styles/table.css";

const CategoryTable = ({ onCategoryEdit, fetchAgain }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletePopup, setDeletePopup] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const fetchAndSetCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      if (data.length === 0) {
        setFetchError(true);
      } else {
        setCategories(data);
        setFetchError(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCategory(categoryId);
      setDeletePopup(null);
      fetchAndSetCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, [fetchAgain]);

  return (
    <div className="table-container">
      {loading && <Spinner />}
      {!loading && fetchError && <p>No categories found.</p>}
      {!loading && !fetchError && (
        <table className="category-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.MAIN_CAT_ID}>
                <td>{category.MAIN_CAT_NAME}</td>
                <td>
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="icon edit-icon"
                    onClick={() => onCategoryEdit(category)}
                  />
                  <img
                    src={trashIcon}
                    alt="Delete"
                    className="icon trash-icon"
                    onClick={() => setDeletePopup(category.MAIN_CAT_ID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deletePopup && (
        <Popup
          message="Are you sure you want to delete this category?"
          onConfirm={() => handleDelete(deletePopup)}
          onCancel={() => setDeletePopup(null)}
        />
      )}
    </div>
  );
};

export default CategoryTable;
