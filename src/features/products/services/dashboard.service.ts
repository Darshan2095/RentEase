import api from "@/lib/api";

export const dashboardService = {
  getProductStats: async () => {
    const { data } = await api.get(
      "/dashboard/product-stats"
    );

    return data.data;
  },
};