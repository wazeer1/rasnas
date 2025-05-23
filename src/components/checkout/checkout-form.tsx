"use-client";
import Input from "@components/ui/input";
import AddressList from "./addresses";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "react-i18next";
import { useAddAddressMutation } from "./useAddressMutation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { toast } from "react-toastify";
import { checkoutRazorPay } from "./razorpay-checkout";
import { useFetchAddress } from "@framework/product/get-addresses";

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddAddressMutation();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [isHydrated, setIsHydrated] = useState(false);

  const { data, isLoading: addressLoading } = useFetchAddress();
  const addresses = data?.addresses || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutInputType>();

  function onSubmit(input: CheckoutInputType) {
    mutate(
      {
        first_name: input.firstName,
        last_name: input.lastName,
        address: input.address,
        phone: input.phone,
        email: input.email,
        city: input.city,
        post_code: input.zipCode,
      },
      {
        onSuccess: () => {
          reset();
          setShowAddressForm(false);
          toast.success("Address added successfully");
        },
      }
    );
  }

  const handleDeleteAddress = (id: string) => {
    // Placeholder: Replace with actual API call
    toast.info(`Delete address with ID: ${id}`);
  };
  console.log(addresses, "addres");

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!isHydrated) return null;
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-shipping-address")}
      </h2>

      {addresses?.length > 0 && !showAddressForm && (
        <div className="py-4">
          <Button onClick={() => setShowAddressForm(true)}>
            {t("Add Address")}
          </Button>
        </div>
      )}
      <div>
        <AddressList
          onAddressSelect={(e) => setSelectedAddress(e)}
          addresses={addresses}
          isLoading={addressLoading}
          onDelete={handleDeleteAddress}
        />
      </div>

      {(showAddressForm || addresses?.length === 0) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center"
          noValidate
        >
          <div className="flex flex-col space-y-4 lg:space-y-5">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
              <Input
                labelKey="forms:label-first-name"
                {...register("firstName", {
                  required: "forms:first-name-required",
                })}
                errorKey={errors.firstName?.message}
                variant="solid"
                className="w-full lg:w-1/2"
              />
              <Input
                labelKey="forms:label-last-name"
                {...register("lastName", {
                  required: "forms:last-name-required",
                })}
                errorKey={errors.lastName?.message}
                variant="solid"
                className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              />
            </div>
            <Input
              labelKey="forms:label-address"
              {...register("address", {
                required: "forms:address-required",
              })}
              errorKey={errors.address?.message}
              variant="solid"
            />
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
              <Input
                type="tel"
                labelKey="forms:label-phone"
                {...register("phone", {
                  required: "forms:phone-required",
                })}
                errorKey={errors.phone?.message}
                variant="solid"
                className="w-full lg:w-1/2"
              />
              <Input
                type="email"
                labelKey="forms:label-email-star"
                {...register("email", {
                  required: "forms:email-required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "forms:email-error",
                  },
                })}
                errorKey={errors.email?.message}
                variant="solid"
                className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
              <Input
                labelKey="forms:label-city"
                {...register("city")}
                variant="solid"
                className="w-full lg:w-1/2"
              />
              <Input
                labelKey="forms:label-postcode"
                {...register("zipCode")}
                variant="solid"
                className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              />
            </div>
            <div className="relative flex items-center">
              <CheckBox labelKey="forms:label-save-information" />
            </div>
            <div>
              <Button type="submit" loading={isLoading} disabled={isLoading}>
                Add Address
              </Button>
            </div>
            <TextArea
              labelKey="forms:label-order-notes"
              {...register("note")}
              placeholderKey="forms:placeholder-order-notes"
              className="relative pt-3 xl:pt-6"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
