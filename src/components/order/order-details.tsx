import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { formatDate } from "@utils/formatDateDDMMYYYY";
import Image from "next/image";

const OrderDetails = ({ className = "pt-10 lg:pt-12" }) => {
  const {
    query: { id },
  } = useRouter();
  const { t } = useTranslation("common");
  const { data, isLoading } = useOrderQuery(id?.toString());

  const order = data?.app_data?.data?.find((item) => item.id === id);

  if (!order || isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className={className}>
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        {t("text-order-details")}: #{order.invoice_no}
      </h2>

      <div className="border rounded-lg p-6 pt-0 shadow ">
        <div className="space-y-4 my-7 bg-[#042e27]">
          {order.purchase_items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border p-4 rounded-md sm:flex-row sm:items-center "
            >
              <div className="sm:w-[100px] w-full relative">
                <img
                  src={item.product_details.thumbnail}
                  className="w-full block rounded"
                  alt=""
                />
              </div>
              <div className="flex-1">
                <p className="font-bold">{item.product_details.name}</p>
                <p className="text-sm ">
                  Qty: {item.quantity} &nbsp; | &nbsp; ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-bold">{formatDate(order.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`text-sm font-bold inline-block px-2 py-1 rounded 
              ${
                order.status === "Pending"
                  ? "bg-yellow-200"
                  : order.status === "Completed"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium">{order.total_amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment</p>
            <p className="font-medium">{order.paymentMethod || "N/A"}</p>
          </div>
        </div>

        <h3 className="text-md font-bold mb-4 text-heading ">
          Delivery Address
        </h3>
        <div className="text-sm text-gray-700 mb-6">
          <p>
            {order.address.first_name} {order.address.last_name}
          </p>
          <p>{order.address.address}</p>
          <p>
            {order.address.city}, {order.address.post_code}
          </p>
          <p>{order.address.phone}</p>
          <p>{order.address.email}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
