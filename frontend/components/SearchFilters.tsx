"use client";

import { useState, useEffect, useRef } from "react";
import type { SearchFilters } from "@/lib/types";

interface SearchFiltersProps {
  projects: string[];
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export default function SearchFilters({
  projects,
  onFiltersChange,
  initialFilters = {},
}: SearchFiltersProps) {
  const isInitialMount = useRef(true);
  const isSyncingFromProps = useRef(false);
  const [search, setSearch] = useState(initialFilters.search || "");
  const [project, setProject] = useState(initialFilters.project || "");
  const [minPrice, setMinPrice] = useState(
    initialFilters.minPrice?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    initialFilters.maxPrice?.toString() || ""
  );
  const [bedrooms, setBedrooms] = useState(
    initialFilters.bedrooms?.toString() || ""
  );
  const [bathrooms, setBathrooms] = useState(
    initialFilters.bathrooms?.toString() || ""
  );

  // Sync local state with initialFilters when they change (e.g., when navigating back)
  useEffect(() => {
    isSyncingFromProps.current = true;
    setSearch(initialFilters.search || "");
    setProject(initialFilters.project || "");
    setMinPrice(initialFilters.minPrice?.toString() || "");
    setMaxPrice(initialFilters.maxPrice?.toString() || "");
    setBedrooms(initialFilters.bedrooms?.toString() || "");
    setBathrooms(initialFilters.bathrooms?.toString() || "");
    // Reset the flag after a short delay to allow state updates to complete
    setTimeout(() => {
      isSyncingFromProps.current = false;
    }, 100);
  }, [initialFilters]);

  // Debounce search
  useEffect(() => {
    // Skip the initial mount to prevent calling onFiltersChange on page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if we're syncing from props (URL changes from navigation)
    if (isSyncingFromProps.current) {
      return;
    }

    const timer = setTimeout(() => {
      const filters: SearchFilters = {};
      if (search) filters.search = search;
      if (project) filters.project = project;
      if (minPrice) filters.minPrice = parseFloat(minPrice);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
      if (bedrooms) filters.bedrooms = parseInt(bedrooms);
      if (bathrooms) filters.bathrooms = parseInt(bathrooms);

      onFiltersChange(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    search,
    project,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    onFiltersChange,
  ]);

  const clearFilters = () => {
    setSearch("");
    setProject("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
  };

  const hasActiveFilters =
    search || project || minPrice || maxPrice || bedrooms || bathrooms;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Search & Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name, unit number, or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="input-field"
          >
            <option value="">All Projects</option>
            {projects.map((proj) => (
              <option key={proj} value={proj}>
                {proj}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price (EGP)
          </label>
          <input
            type="number"
            placeholder="e.g., 2000000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-field"
            min="0"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price (EGP)
          </label>
          <input
            type="number"
            placeholder="e.g., 5000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-field"
            min="0"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="input-field"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="input-field"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
