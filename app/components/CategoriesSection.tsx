'use client';

import { useEffect } from 'react';
import { useCategories } from '../lib/hooks';

export default function CategoriesSection() {
  const { categories, categoriesLoading, categoriesError, fetchCategories } =
    useCategories();

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, [fetchCategories]);

  if (categoriesLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading categories...</span>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">
            Error loading categories: {categoriesError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <span
              key={category.id}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {category.name} ({category.count})
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No categories available.</p>
      )}
    </div>
  );
}
