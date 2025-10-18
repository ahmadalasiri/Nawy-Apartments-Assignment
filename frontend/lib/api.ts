import axios from "axios";
import type { Apartment, PaginatedResponse, SearchFilters } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apartments API
export const apartmentsAPI = {
  getAll: async (
    filters?: SearchFilters
  ): Promise<PaginatedResponse<Apartment>> => {
    const params = new URLSearchParams();

    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.search) params.append("search", filters.search);
    if (filters?.project) params.append("project", filters.project);
    if (filters?.minPrice !== undefined)
      params.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice !== undefined)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters?.bedrooms !== undefined)
      params.append("bedrooms", filters.bedrooms.toString());
    if (filters?.bathrooms !== undefined)
      params.append("bathrooms", filters.bathrooms.toString());

    const response = await api.get(`/apartments?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Apartment> => {
    const response = await api.get(`/apartments/${id}`);
    return response.data;
  },

  getProjects: async (): Promise<string[]> => {
    const response = await api.get("/apartments/projects");
    return response.data;
  },
};

export default api;
