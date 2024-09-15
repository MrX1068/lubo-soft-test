import React, { useState, useEffect, useRef } from "react";
import { addCategory, updateCategory } from "../services/API";
import Spinner from "./Spinner";
import "../styles/form.css";

const CategoryForm = ({
  selectedCategory,
  setSelectedCategory,
  onCategoryAdded,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.MAIN_CAT_NAME);
      setIsEditing(true);
      inputRef.current?.focus();
    } else {
      setCategoryName("");
      setIsEditing(false);
    }
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      setLoading(true);
      try {
        if (isEditing) {
          await updateCategory(selectedCategory.MAIN_CAT_ID, categoryName);
        } else {
          await addCategory(categoryName);
        }
        onCategoryAdded(
          `Category ${isEditing ? "updated" : "saved"} successfully!`,
          "success"
        );
      } catch (error) {
        onCategoryAdded("Failed to save category", "error");
      } finally {
        setLoading(false);
        setCategoryName("");
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter category name"
        value={categoryName}
        ref={inputRef}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {isEditing ? "Update Category" : "Add Category"}
      </button>
      {isEditing && (
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setSelectedCategory(null)}
        >
          Cancel
        </button>
      )}
      {loading && (
        <div className="fullscreen-spinner">
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
