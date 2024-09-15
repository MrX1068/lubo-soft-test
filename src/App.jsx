import React, { useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import Toast from "./components/Toast";
import "./App.css";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [toast, setToast] = useState(null);

  const handleCategoryEdit = (category) => {
    setSelectedCategory(category);
  };

  const handleCategoryAdded = (message, type) => {
    setSelectedCategory(null);
    setToast({ message, type });
    setFetchAgain((prev) => !prev);
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <div className="app">
      <CategoryForm
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onCategoryAdded={handleCategoryAdded}
      />
      <CategoryTable
        onCategoryEdit={handleCategoryEdit}
        fetchAgain={fetchAgain}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default App;
