import api from "@/lib/api";

export interface RentalFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const rentalService = {
  getRentals: async (filters: RentalFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.page)
      params.append("page", filters.page.toString());

    if (filters.limit)
      params.append("limit", filters.limit.toString());

    if (filters.search)
      params.append("search", filters.search);

    if (filters.status)
      params.append("status", filters.status);

    const { data } = await api.get(
      `/rentals?${params.toString()}`
    );

    return data;
  },

  getRental: async (id: string) => {
    const { data } = await api.get(`/rentals/${id}`);
    return data.data;
  },

  extendRental: async (
    id: string,
    months: number
  ) => {
    const { data } = await api.patch(
      `/rentals/${id}/extend`,
      {
        months,
      }
    );

    return data;
  },

  returnRental: async (
  id: string,
  payload: {
    damageStatus: string;
    damageCharges: number;
    notes: string;
  }
) => {
  const { data } = await api.patch(
    `/rentals/${id}/return`,
    payload
  );

  return data;
},
};