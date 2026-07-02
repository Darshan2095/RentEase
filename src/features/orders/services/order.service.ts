import api from "@/lib/api";

export interface OrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const orderService = {
  getOrders: async (filters: OrderFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.page)
      params.append("page", filters.page.toString());

    if (filters.limit)
      params.append("limit", filters.limit.toString());

    if (filters.search)
      params.append("search", filters.search);

    if (
      filters.status &&
      filters.status !== "all"
    ) {
      params.append("status", filters.status);
    }

    const { data } = await api.get(
      `/orders?${params.toString()}`
    );

    return data;
  },

  getOrder: async (id: string) => {
    const { data } = await api.get(
      `/orders/${id}`
    );

    return data.data;
  },

  updateStatus: async (
    id: string,
    status: string
  ) => {
    const { data } = await api.patch(
      `/orders/${id}/status`,
      {
        orderStatus: status,
      }
    );

    return data;
  },
};