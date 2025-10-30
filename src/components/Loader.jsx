// -------------------- IMPORTS --------------------
import React from 'react'; // Import React library

// -------------------- COMPONENT DEFINITION --------------------
/**
 * Loader Component
 * Displays a Bootstrap spinner centered horizontally and vertically.
 * Useful for indicating loading states in the UI.
 */
const Loader = () => {
  return (
    // Container div to center the spinner
    // Uses Bootstrap flex utilities for horizontal and vertical centering
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "100px" }} // Fixed height for spacing
    >
      {/* Bootstrap spinner */}
      <div className="spinner-border text-primary" role="status">
        {/* Visually hidden text for screen readers */}
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

// -------------------- EXPORT --------------------
// Export the component for use in other parts of the application
export default Loader;
