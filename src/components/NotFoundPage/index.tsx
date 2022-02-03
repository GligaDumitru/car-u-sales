import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8 w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <h1 className="text-2xl font-medium py-8">oops! Page not found</h1>
        <p className="text-lg pb-8 px-12 font-medium">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Link to="/">
          <button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-md mr-6">
            HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
