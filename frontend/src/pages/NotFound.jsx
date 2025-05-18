import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
      <p className="mb-4">Oops! Looks like you’re lost.</p>
      <Link to="/" className="text-blue-500 underline">Go back to home</Link>
    </div>
  );
};

export default NotFound;
