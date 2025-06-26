import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useGetAllOrders } from "@framework/order/get-all-orders";
import { formatDate } from "@framework/utils/format-data";

// Define types for order data
interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  itemCount: number;
  data: object;
}

// Desktop table row component
const OrderTableRow: React.FC<{ order: Order }> = ({ order }) => {
  const { t } = useTranslation("common");

  return (
    <tr className="border-b border-gray-300 last:border-b-0">
      <td className="px-4 py-5 ltr:text-left rtl:text-right">
        <Link
          href={`/my-account/orders/${order.id}`}
          className="underline hover:no-underline text-heading"
        >
          #{order.invoice_no}
        </Link>
      </td>
      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
        {formatDate(order.created_at)}
      </td>
      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
        {order.status}
      </td>
      <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
        {order.total_amount}
      </td>
      <td className="px-4 py-5 ltr:text-right rtl:text-left text-heading">
        <Link
          href={`/my-account/orders/${order.id}`}
          className="text-sm leading-4 bg-black text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
        >
          {t("button-view")}
        </Link>
      </td>
    </tr>
  );
};

// Mobile order card component
const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { t } = useTranslation("common");

  return (
    <ul className="flex flex-col px-4 pt-5 pb-6 space-y-5 text-sm font-semibold border border-gray-300 rounded-md text-heading">
      <li className="flex items-center justify-between">
        {t("text-order")}
        <span className="font-normal">
          <Link
            href={`/my-account/orders/${order.id}`}
            className="underline hover:no-underline text-heading"
          >
            #{order.invoice_no}
          </Link>
        </span>
      </li>
      <li className="flex items-center justify-between">
        {t("text-date")}
        <span className="font-normal"> {formatDate(order.created_at)}</span>
      </li>
      <li className="flex items-center justify-between">
        {t("text-status")}
        <span className="font-normal">{order.status}</span>
      </li>
      <li className="flex items-center justify-between">
        {t("text-total")}
        <span className="font-normal">{order.total_amount}</span>
      </li>
      <li className="flex items-center justify-between">
        {t("text-actions")}
        <span className="font-normal">
          <Link
            href={`/my-account/orders/${order.id}`}
            className="text-sm leading-4 bg-black text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
          >
            {t("button-view")}
          </Link>
        </span>
      </li>
    </ul>
  );
};

// Desktop table header component
const TableHeader: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <thead className="text-sm lg:text-base">
      <tr>
        <th className="p-4 font-semibold bg-gray-100 text-black ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
          {t("text-order")}
        </th>
        <th className="p-4 font-semibold bg-gray-100 text-black ltr:text-left rtl:text-right lg:text-center">
          {t("text-date")}
        </th>
        <th className="p-4 font-semibold bg-gray-100 text-black ltr:text-left rtl:text-right lg:text-center">
          {t("text-status")}
        </th>
        <th className="p-4 font-semibold bg-gray-100 text-black ltr:text-left rtl:text-right lg:text-center">
          {t("text-total")}
        </th>
        <th className="p-4 font-semibold bg-gray-100 text-black ltr:text-left rtl:text-right ltr:lg:text-right rtl:lg:text-left ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
          {t("text-actions")}
        </th>
      </tr>
    </thead>
  );
};

// Main component
const OrdersTable: React.FC<{ orders?: Order[] }> = ({}) => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { t } = useTranslation("common");
  const isDesktopView = width >= 1025;
  const { data } = useGetAllOrders();
  const orders = data?.app_data.data;

  return (
    <>
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        {t("text-orders")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        variants={fadeInTop(0.35)}
        className="w-full flex flex-col"
      >
        {isDesktopView ? (
          <table className="w-full">
            <TableHeader />
            <tbody className="text-sm lg:text-base">
              {orders?.map((order) => (
                <OrderTableRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full space-y-4">
            {orders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrdersTable;
