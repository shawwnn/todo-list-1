// components/ToastContent.jsx
import React from "react";

const ToastContent = ({ title, subtitle }) => {
  return (
    <div className="toast-content-container">
      <div 
        className="toast-title"
      >{title}</div>
      <div 
        className="toast-subtitle"
      >{subtitle}</div>
    </div>
  );
};

export default ToastContent;
