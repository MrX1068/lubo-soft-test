const API_URL = "https://lubosoftdev.com/api/nst_back_end_code/catagory.php";

export const addCategory = async (categoryName) => {
  const response = await fetch(`${API_URL}?run=insert_main_catagory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceType: "web",
      username: "anvar",
      cat_name: categoryName,
    }),
  });
  return response.json();
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}?run=get_all_main_cat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceType: "web",
        username: "anvar",
      }),
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.message || [];
    } else {
      console.error("API Error:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return [];
  }
};

export const updateCategory = async (categoryId, newName) => {
  const response = await fetch(`${API_URL}?run=update_main_catagory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceType: "web",
      username: "anvar",
      cat_name: newName,
      main_cat_id: categoryId,
      deleted_flg: "U",
    }),
  });
  return response.json();
};

export const deleteCategory = async (categoryId) => {
  const response = await fetch(`${API_URL}?run=update_main_catagory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceType: "web",
      username: "anvar",
      main_cat_id: categoryId,
      deleted_flg: "D",
    }),
  });
  return response.json();
};
