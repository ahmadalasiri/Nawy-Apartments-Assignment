"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchFilters from "@/components/SearchFilters";
import ApartmentGrid from "@/components/ApartmentGrid";
import Pagination from "@/components/Pagination";
import { apartmentsAPI } from "@/lib/api";
import type { Apartment, SearchFilters as Filters } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Parse initial filters from URL
  const getInitialFilters = (): Filters => {
    const filters: Filters = {};
    const search = searchParams.get("search");
    const project = searchParams.get("project");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const page = searchParams.get("page");

    if (search) filters.search = search;
    if (project) filters.project = project;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (bedrooms) filters.bedrooms = parseInt(bedrooms);
    if (bathrooms) filters.bathrooms = parseInt(bathrooms);
    if (page) setCurrentPage(parseInt(page));

    return filters;
  };

  const [filters, setFilters] = useState<Filters>(getInitialFilters());

  // Fetch projects
  useEffect(() => {
    apartmentsAPI
      .getProjects()
      .then(setProjects)
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  // Fetch apartments
  useEffect(() => {
    const fetchApartments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apartmentsAPI.getAll({
          ...filters,
          page: currentPage,
          limit: 12,
        });

        setApartments(response.data);
        setTotalPages(response.meta.totalPages);
        setTotal(response.meta.total);
      } catch (err: any) {
        setError(err.message || "Failed to fetch apartments");
        console.error("Error fetching apartments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [filters, currentPage]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.project) params.set("project", filters.project);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms.toString());
    if (filters.bathrooms)
      params.set("bathrooms", filters.bathrooms.toString());
    if (currentPage > 1) params.set("page", currentPage.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [filters, currentPage, router]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Discover Your Next Home
        </h1>
        <p className="text-lg text-gray-600">
          Browse {total} luxury apartments in top compounds across Egypt
        </p>
      </div>

      {/* Filters */}
      <SearchFilters
        projects={projects}
        onFiltersChange={handleFiltersChange}
        initialFilters={filters}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {apartments.length} of {total} apartments
            </p>
          </div>

          <ApartmentGrid apartments={apartments} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
