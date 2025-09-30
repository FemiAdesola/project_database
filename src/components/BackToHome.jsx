import { useNavigate } from "react-router-dom";

const BackToHome = () => {
    const navigate = useNavigate();
  return (
    <button className="btn btn-dark btn-sm" onClick={() => navigate("/")}>
        Back to Home
    </button>
  )
}

export default BackToHome