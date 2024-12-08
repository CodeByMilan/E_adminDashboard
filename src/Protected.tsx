import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { ReactNode } from "react";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const isAuthenticated = token || localStorage.getItem("token");

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          You need to log in to access this page
        </h2>
        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate("/login")}
        >
          Click here to log in
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
