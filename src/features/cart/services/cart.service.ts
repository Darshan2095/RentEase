import api from "@/lib/api";

export const cartService = {
  addToCart: async ({
    productId,
    quantity = 1,
    rentalTenure,
  }: {
    productId: string;
    quantity?: number;
    rentalTenure: number;
  }) => {
    const { data } = await api.post(
      "/cart",
      {
        productId,
        quantity,
        rentalTenure,
      }
    );

    return data;
  },

  getCart: async () => {
    const { data } =
      await api.get("/cart");

    return data.data;
  },

  removeItem: async (
    productId: string
  ) => {
    const { data } =
      await api.delete(
        `/cart/${productId}`
      );

    return data;
  },
};