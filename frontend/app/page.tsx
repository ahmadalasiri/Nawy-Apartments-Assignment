"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Use useRef to persist cache across re-renders without causing re-fetches
  const apartmentsCacheRef = useRef<
    Map<string, { data: Apartment[]; totalPages: number; total: number }>
  >(new Map());
  const projectsCacheRef = useRef<string[] | null>(null);

  // Initialize page and filters from URL - recomputed when searchParams change
  const initialPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const initialFilters = useMemo((): Filters => {
    const filters: Filters = {};
    const search = searchParams.get("search");
    const project = searchParams.get("project");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");

    if (search) filters.search = search;
    if (project) filters.project = project;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (bedrooms) filters.bedrooms = parseInt(bedrooms);
    if (bathrooms) filters.bathrooms = parseInt(bathrooms);

    return filters;
  }, [searchParams]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Generate cache key from filters and page
  const generateCacheKey = useCallback(
    (pageNum: number, filterParams: Filters): string => {
      const parts: string[] = [`page:${pageNum}`];
      if (filterParams.search) parts.push(`search:${filterParams.search}`);
      if (filterParams.project) parts.push(`project:${filterParams.project}`);
      if (filterParams.minPrice !== undefined)
        parts.push(`minPrice:${filterParams.minPrice}`);
      if (filterParams.maxPrice !== undefined)
        parts.push(`maxPrice:${filterParams.maxPrice}`);
      if (filterParams.bedrooms !== undefined)
        parts.push(`bedrooms:${filterParams.bedrooms}`);
      if (filterParams.bathrooms !== undefined)
        parts.push(`bathrooms:${filterParams.bathrooms}`);
      return parts.join("|");
    },
    []
  );

  // Sync state when URL parameters change (e.g., navigating back from detail page)
  useEffect(() => {
    setCurrentPage(initialPage);
    setFilters(initialFilters);
  }, [initialPage, initialFilters]);

  // Fetch projects
  useEffect(() => {
    if (!backendAvailable) return;

    // Check cache first
    if (projectsCacheRef.current) {
      setProjects(projectsCacheRef.current);
      return;
    }

    apartmentsAPI
      .getProjects()
      .then((data) => {
        setProjects(data);
        projectsCacheRef.current = data;
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
          setBackendAvailable(false);
        }
      });
  }, [backendAvailable]);

  // Fetch apartments
  useEffect(() => {
    if (!backendAvailable) {
      setLoading(false);
      setError("Unable to connect to server");
      return;
    }

    const fetchApartments = async () => {
      // Generate cache key for current request
      const cacheKey = generateCacheKey(currentPage, filters);

      // Check cache first
      const cachedData = apartmentsCacheRef.current.get(cacheKey);
      if (cachedData) {
        setApartments(cachedData.data);
        setTotalPages(cachedData.totalPages);
        setTotal(cachedData.total);
        setLoading(false);
        return;
      }

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
        setBackendAvailable(true);

        // Store in cache
        apartmentsCacheRef.current.set(cacheKey, {
          data: response.data,
          totalPages: response.meta.totalPages,
          total: response.meta.total,
        });
      } catch (err: any) {
        console.error("Error fetching apartments:", err);

        // Check if it's a network error (backend not running)
        if (
          err.code === "ERR_NETWORK" ||
          err.code === "ECONNREFUSED" ||
          !err.response
        ) {
          setBackendAvailable(false);
          setError("Unable to connect to server");
        } else {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch apartments"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [filters, currentPage, backendAvailable, generateCacheKey]);

  const handleFiltersChange = useCallback(
    (newFilters: Filters) => {
      setFilters(newFilters);
      setCurrentPage(1);
      // Clear cache when filters change
      apartmentsCacheRef.current.clear();

      // Update URL
      const params = new URLSearchParams();
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.project) params.set("project", newFilters.project);
      if (newFilters.minPrice)
        params.set("minPrice", newFilters.minPrice.toString());
      if (newFilters.maxPrice)
        params.set("maxPrice", newFilters.maxPrice.toString());
      if (newFilters.bedrooms)
        params.set("bedrooms", newFilters.bedrooms.toString());
      if (newFilters.bathrooms)
        params.set("bathrooms", newFilters.bathrooms.toString());

      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : "/";
      router.push(newUrl, { scroll: false });
    },
    [router]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Update URL with new page
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.project) params.set("project", filters.project);
      if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
      if (filters.bedrooms) params.set("bedrooms", filters.bedrooms.toString());
      if (filters.bathrooms)
        params.set("bathrooms", filters.bathrooms.toString());
      if (page > 1) params.set("page", page.toString());

      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : "/";
      router.push(newUrl, { scroll: false });
    },
    [filters, router]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      {error && !backendAvailable && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Server Connection Required
          </h3>
          <p className="text-gray-600 mb-4">
            Please start the backend server to view apartments
          </p>
          <button
            onClick={() => {
              setBackendAvailable(true);
              setError(null);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {error && backendAvailable && (
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
