import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
    <div className="min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
);
}

export default NotFound;
