import React, { useState, useEffect } from "react";
import "../styles/toast.css";

const Toast = ({ message, type, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setVisible(false), duration - 500);
    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast ${type} ${visible ? "fade-in" : "fade-out"}`}>
      {message}
    </div>
  );
};

export default Toast;
