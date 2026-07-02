import Rental from "@/models/Rental";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function createRentals(orderId: string) {
  const order = await Order.findById(orderId);

  if (!order) return;

  const rentals = order.items.map((item: any) => {
    const startDate = new Date();

    const endDate = new Date(startDate);

    endDate.setMonth(
      endDate.getMonth() + item.rentalTenure
    );

    return {
      user: order.user,

      order: order._id,

      product: item.product,

      quantity: item.quantity,

      monthlyRent: item.monthlyRent,

      securityDeposit: item.securityDeposit,

      rentalTenure: item.rentalTenure,

      startDate,

      endDate,

      status: "ACTIVE",
    };
  });

  await Rental.insertMany(rentals);
  for (const item of order.items) {
  await Product.findByIdAndUpdate(
    item.product,
    {
      $inc: {
        stock: -item.quantity,
      },
    }
  );
}
}