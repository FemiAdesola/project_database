// -------------------- IMPORTS --------------------
import React from 'react'; // Import React library
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

// -------------------- COMPONENT DEFINITION --------------------
/**
 * CancelButton Component
 * A reusable button that redirects the user to a specified route when clicked.
 * 
 * Props:
 * @param {string} to - The path to navigate to when the button is clicked
 */
const CancelButton = ({ to }) => {
  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  return (
    // Bootstrap-styled button
    // When clicked, triggers navigation to the route specified by the "to" prop
    <button
      type="button"                     // Button type to prevent default form submission
      className="btn btn-secondary ms-2" // Bootstrap styling (secondary color, margin start)
      onClick={() => navigate(to)}       // Navigate to the "to" path when clicked
    >
      Cancel
    </button>
  );
}

// -------------------- EXPORT --------------------
// Export the component for use in other parts of the application
export default CancelButton;
