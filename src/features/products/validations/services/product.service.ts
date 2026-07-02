import api from "@/lib/api";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data.data;
};

export const createProduct = async (body: any) => {
  const { data } = await api.post("/products", body);
  return data;
};

export const updateProduct = async (
  slug: string,
  body: any
) => {
  const { data } = await api.put(
    `/products/${slug}`,
    body
  );

  return data;
};

export const deleteProduct = async (
  slug: string
) => {
  const { data } = await api.delete(
    `/products/${slug}`
  );

  return data;
};