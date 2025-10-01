import React from 'react'
import { useNavigate } from "react-router-dom";
const CancelButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-secondary ms-2"
      onClick={() => navigate(to)}
    >
      Cancel
    </button>
  );
}

export default CancelButton