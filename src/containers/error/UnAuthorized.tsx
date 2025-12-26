import { Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnAuthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center bg-white rounded-2xl shadow-sm p-10">
        
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <SearchX className="h-8 w-8 text-blue-600" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Authorized Access Required
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          You do not have permission to view this page. Please log in to continue.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 transition"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default UnAuthorized;
