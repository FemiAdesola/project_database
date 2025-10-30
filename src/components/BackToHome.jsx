// Import the `useNavigate` hook from React Router
// This hook allows navigation between routes programmatically (without using <Link>)
import { useNavigate } from "react-router-dom";

// -------------------- COMPONENT DEFINITION --------------------
/**
 * BackToHome Component
 * A simple reusable button that takes the user back to the homepage ("/")
 * using React Router's navigation hook.
 */
const BackToHome = () => {
  // Initialize the navigate function
  // `navigate` allows redirection to a specific route in the app
  const navigate = useNavigate();

  return (
    // Button styled with Bootstrap classes
    // When clicked, the button triggers `navigate("/")` to redirect to the homepage
    <button 
      className="btn btn-dark btn-sm" 
      onClick={() => navigate("/")}
    >
      Back to Home
    </button>
  );
};

// -------------------- EXPORT --------------------
// Export the component so it can be used in other parts of the app
export default BackToHome;
