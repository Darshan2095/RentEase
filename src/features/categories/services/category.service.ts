import api from "@/lib/api";

export const categoryService = {
  getCategories: async () =>
    (await api.get("/categories")).data.data,

  createCategory: async (payload: any) =>
    (await api.post("/categories", payload)).data,
};