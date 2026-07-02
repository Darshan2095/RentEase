import api from "@/lib/api";

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  sort?: string;
}

export const productService = {
  getProducts: async (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.page)
      params.append("page", filters.page.toString());

    if (filters.limit)
      params.append("limit", filters.limit.toString());

    if (filters.search)
      params.append("search", filters.search);

    if (filters.category)
      params.append("category", filters.category);

    if (filters.featured !== undefined)
      params.append(
        "featured",
        String(filters.featured)
      );

    if (filters.sort)
      params.append("sort", filters.sort);

    const { data } = await api.get(
      `/products?${params.toString()}`
    );

    return data;
  },

  getProduct: async (slug: string) => {
    const { data } = await api.get(
      `/products/${slug}`
    );

    return data.data;
  },

  createProduct: async (payload: any) => {
    const { data } = await api.post(
      "/products",
      payload
    );

    return data;
  },

  updateProduct: async (
    slug: string,
    payload: any
  ) => {
    const { data } = await api.put(
      `/products/${slug}`,
      payload
    );

    return data;
  },

  deleteProduct: async (slug: string) => {
    const { data } = await api.delete(
      `/products/${slug}`
    );

    return data;
  },

  bulkAction: async (
  ids: string[],
  action: "DELETE" | "ACTIVATE" | "DEACTIVATE"
) => {
  const { data } = await api.patch(
    "/products/bulk",
    {
      ids,
      action,
    }
  );

  return data;
},
};