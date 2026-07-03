import api from "@/lib/api";


export interface PlaceOrderPayload {

  address: {

    fullName: string;

    phone: string;

    address: string;

    city: string;

    state: string;

    pincode: string;

  };

}



export const orderService = {


  placeOrder: async (
    payload: PlaceOrderPayload
  ) => {


    const { data } =
      await api.post(
        "/orders",
        payload
      );


    return data;


  },




  getOrders: async ({

    page = 1,

    limit = 10,

    status = "",

    search = "",

  }: {

    page?: number;

    limit?: number;

    status?: string;

    search?: string;

  } = {}) => {


    const { data } =
      await api.get(
        "/orders",
        {
          params: {

            page,

            limit,

            status,

            search,

          },
        }
      );


    return data;


  },




  getOrderById: async (
    id: string
  ) => {


    const { data } =
      await api.get(
        `/orders/${id}`
      );


    return data.data;


  },




  updateStatus: async (
    id: string,
    status: string
  ) => {


    const { data } =
      await api.patch(
        `/orders/${id}/status`,
        {
          orderStatus: status,
        }
      );


    return data;


  },


};