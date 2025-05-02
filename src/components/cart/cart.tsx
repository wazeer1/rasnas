import Scrollbar from "@components/common/scrollbar";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useCartQuery } from "@framework/checkout/get-cartitems";
import userStore from "@contexts/userStore";

export default function Cart() {
  const { t } = useTranslation("common");
  const { closeCart } = useUI();

  // Fetch cart data using React Query
  const { data, isLoading, isError } = useCartQuery({ country: "IN" });
  const { countryDetails } = userStore();

  // Destructure items and product total from the cart data
  const items = data?.items || [];
  const productTotal = data?.product_total || 0;

  // Get formatted price using the usePrice hook
  const { price: cartTotal } = usePrice({
    amount: productTotal,
    currencyCode: "USD",
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p>{t("text-loading-cart")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p>{t("text-error-cart")}</p>
      </div>
    );
  }

  // Check if the cart is empty
  const isEmpty = items.length === 0;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {/* Header */}
      <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
        <h2 className="m-0 text-xl font-bold md:text-2xl text-black">
          {t("text-shopping-cart")}
        </h2>
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeCart}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>

      {/* Cart Content */}
      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="w-full px-5 md:px-7">
            {items.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          variants={fadeInOut(0.25)}
          className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7"
        >
          <EmptyCart />
          <h3 className="pt-8 text-lg font-bold text-heading">
            {t("text-empty-cart")}
          </h3>
        </motion.div>
      )}

      {/* Footer */}
      <div
        className="flex flex-col px-5 pt-2 pb-5 md:px-7 md:pb-7"
        onClick={closeCart}
      >
        <Link
          href={!isEmpty ? ROUTES.CHECKOUT : "/"}
          className={cn(
            "w-full px-5 py-3 md:py-4 bg-black flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300",
            isEmpty
              ? "cursor-not-allowed bg-gray-800 hover:bg-gray-400"
              : "bg-gray-800 hover:bg-gray-600"
          )}
        >
          <span className="w-full ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
            {t("text-proceed-to-checkout")}
          </span>
          <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
            <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
            {countryDetails.currencySymbol} {productTotal}
          </span>
        </Link>
      </div>
    </div>
  );
}
