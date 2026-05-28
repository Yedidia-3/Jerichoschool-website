import React from 'react';
import { Link } from "react-router";

export const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Jericho School Site</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore our academic programs, news, events, and apply online.
      </p>
      <Link
        to="/school"
        className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
      >
        Go to School Section
      </Link>
    </div>
  );
};
