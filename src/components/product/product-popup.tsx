import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { useAddCartMutation } from "@framework/checkout/use-add-cart";
import userStore from "@contexts/userStore";

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [selectedAttribute, setSelectedAttribute] = useState<any>();
  const [imageNumb, setImageNumb] = useState<number>(0);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: "USD",
  });
  const variations = getVariations(data.variations);
  const { slug, images, name, description, selling_price, attribute } = data;
  const { mutate, isLoading, isError, error, isSuccess } = useAddCartMutation();
  const { country, countryDetails } = userStore();

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  function getRandomNumber(limit: number) {
    return Math.floor(Math.random() * limit);
  }
  function addToCart() {
    if (!selectedAttribute) {
      toast.error("Please select the size");
    } else {
      mutate({
        product_id: data.id,
        attribute_id: selectedAttribute.id,
        quantity: quantity,
      });
    }
    // const item:string = generateCartItem(data, selectedAttribute, quantity);
    // if (!isSelected) return;
    // // to show btn feedback while product carting
    // setAddToCartLoader(true);
    // // setTimeout(() => {
    // //   setAddToCartLoader(false);
    // //   setViewCartBtn(true);
    // // }, 600);
    // addItemToCart(item, quantity);
    // console.log(item, "item");
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${data.id}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    // setAttributes((prev) => ({
    //   ...prev,
    //   ...attribute,
    // }));
    setSelectedAttribute(attribute);
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }
  useEffect(() => {
    setInterval(() => {
      setImageNumb(getRandomNumber(images.length));
    }, 10000);
  }, []);

  return (
    <div className="rounded-lg bg-body">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          <img
            src={
              images[getRandomNumber(images.length)]?.image ??
              "/assets/placeholder/products/product-thumbnail.svg"
            }
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-[#fff] md:leading-7">
              {description}
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {countryDetails.currencySymbol} {selling_price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {/* {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                title={variation}
                attributes={attribute}
                active={attributes[variation]}
                onClick={handleAttribute}
              />
            );
          })} */}
          <ProductAttributes
            key={`popup-attribute-key${"variation"}`}
            title={"Size"}
            attributes={attribute}
            active={selectedAttribute}
            onClick={handleAttribute}
          />
          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
              <Counter
                quantity={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() =>
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                }
                disableDecrement={quantity === 1}
              />
              <Button
                onClick={addToCart}
                variant="flat"
                className={`w-full bg-black h-11 md:h-12 px-1.5 `}
                disabled={!isSelected}
                loading={addToCartLoader}
              >
                {t("text-add-to-cart")}
              </Button>
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t("text-view-cart")}
              </button>
            )}

            <Button
              onClick={navigateToProductPage}
              variant="flat"
              className="w-full h-11 md:h-12"
            >
              {t("text-view-details")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
