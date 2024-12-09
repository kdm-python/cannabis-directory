import React from "react";
import PropTypes from 'prop-types';

const TailwindStylesOverview = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Container Styles */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
        {/* Header Styles */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Cannabis Strains Catalog
          </h1>
        </div>

        {/* Add the children passed as props here */}
        <div className="p-6">
          {children} {/* This is where the nested content will go */}
        </div>

        {/* Table Styles */}
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Strain Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-100 transition duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Sour Diesel
                    </div>
                    <div className="text-sm text-gray-500">Sativa</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  bg-green-100 text-green-800"
                >
                  Sativa
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Responsive Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Effects
            </h3>
            <p className="text-blue-600">Energetic, Creative</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              THC Content
            </h3>
            <p className="text-green-600">19%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              Rating
            </h3>
            <p className="text-purple-600">4.3/5</p>
          </div>
        </div>
      </div>
    </div>
  );
};
//
// Add PropTypes validation for children
TailwindStylesOverview.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TailwindStylesOverview;
