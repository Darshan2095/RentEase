import api from "@/lib/api";

export const cartService = {
  getCart: async () => (await api.get("/cart")).data.data,

  addToCart: async (payload: any) =>
    (await api.post("/cart", payload)).data,

  updateCart: async (
    itemId: string,
    quantity: number
  ) =>
    (
      await api.put(`/cart/${itemId}`, {
        quantity,
      })
    ).data,

  removeCart: async (itemId: string) =>
    (await api.delete(`/cart/${itemId}`)).data,
};