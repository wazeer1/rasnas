import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useCartQuery } from "@framework/checkout/get-cartitems";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { checkoutRazorPay } from "./razorpay-checkout";
import { toast } from "react-toastify";

const CheckoutCard: React.FC = () => {
  // const { items, total, isEmpty } = useCart();
  const { data, isLoading, isError } = useCartQuery({ country: "IN" });
  const isEmpty = false;
  const { selectedAddressId } = useUI();
  const { price: subtotal } = usePrice({
    amount: data?.product_total,
    currencyCode: "USD",
  });
  const { t } = useTranslation("common");
  const checkoutFooter = [
    {
      id: 1,
      name: t("text-sub-total"),
      price: subtotal,
    },
    {
      id: 2,
      name: t("text-shipping"),
      price: t("text-free"),
    },
    {
      id: 3,
      name: t("text-total"),
      price: subtotal,
    },
  ];
  const handleSubmit2 = (e: any) => {
    e.preventDefault();
    if (!selectedAddressId) {
      toast.error("Please select or add an address");
    } else {
      http
        .post(API_ENDPOINTS.PURCHASE, { address: selectedAddressId })
        .then((res) => {
          const { razorpay, purchase } = res.data.app_data.data;
          const { order_id, amount } = razorpay;
          checkoutRazorPay(order_id, amount, purchase);
        });
    }
  };
  return (
    <div className="pt-12 md:pt-0 ltr:2xl:pl-4 rtl:2xl:pr-4">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-your-order")}
      </h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-800 text-sm font-semibold text-heading">
        <span>{t("text-product")}</span>
        <span className="ltr:ml-auto rtl:mr-auto flex-shrink-0">
          {t("text-sub-total")}
        </span>
      </div>
      {!isEmpty ? (
        data?.items?.map((item) => <CheckoutItem item={item} key={item.id} />)
      ) : (
        <p className="text-red-500 lg:px-3 py-4">{t("text-empty-cart")}</p>
      )}
      {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id} />
      ))}
      <div className="py-8 flex justify-end">
        <Button onClick={(e) => handleSubmit2(e)}>Place order</Button>
      </div>
    </div>
  );
};

export default CheckoutCard;
