import React, { useState, useEffect } from "react";
import "../styles/Popup.css";

const Popup = ({ message, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`popup-overlay ${visible ? "fade-in" : "fade-out"}`}>
      <div className="popup scale-in">
        <p>{message}</p>
        <div className="popup-actions">
          <button className="popup-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="popup-confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
