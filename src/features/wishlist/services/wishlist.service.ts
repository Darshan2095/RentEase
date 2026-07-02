import api from "@/lib/api";

export const wishlistService = {
  getWishlist: async () =>
    (await api.get("/wishlist")).data.data,

  toggleWishlist: async (productId: string) =>
    (
      await api.post("/wishlist", {
        productId,
      })
    ).data,
};