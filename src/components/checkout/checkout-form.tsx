import Input from "@components/ui/input";
import AddressList from "./addresses";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "react-i18next";
import { useAddAddressMutation } from "./useAddressMutation";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { toast } from "react-toastify";
import { checkoutRazorPay } from "./razorpay-checkout";

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: updateUser, isPending } = useCheckoutMutation();
  const { mutate, isLoading, isError, error, isSuccess } = useAddAddressMutation();
  const [refresh, setRefresh] = useState(false); // State to control refresh

  // Function to toggle the refresh state
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutInputType>();

  // Handle form submission
  function onSubmit(input: CheckoutInputType) {
    console.log(input);
    mutate({
      first_name: input.firstName,
      last_name: input.lastName,
      address: input.address,
      phone: input.phone,
      email: input.email,
      city: input.city,
      post_code: input.zipCode,
    });
    handleRefresh()
    // if (input.save) {
    //   // Only save the address if "Save information" checkbox is checked
    //   mutate({
    //     first_name: input.firstName,
    //     last_name: input.lastName,
    //     address: input.address,
    //     phone: input.phone,
    //     email: input.email,
    //     city: input.city,
    //     post_code: input.zipCode,
    //   });
    // }

    // Uncomment if you need additional logic
    // updateUser(input);
    // Router.push(ROUTES.ORDER);
  }
  const [selectedAddress, setSelectedAddress] = useState()

  const handleSubmit2 = (e) => {
    e.preventDefault()
    if(!selectedAddress){
      toast.error("Please select or add an address")
    }else{
      http.post(API_ENDPOINTS.PURCHASE, {address: selectedAddress.id}).then((res)=>{
        const { razorpay, purchase } = res.data.app_data.data;
        const { order_id, amount } = razorpay;
        checkoutRazorPay(order_id, amount, purchase)
        
      })
    }
    
    
  }
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t('text-shipping-address')} 
      </h2>
      <div>
        <AddressList onAddressSelect={(e)=>setSelectedAddress(e)
        }/>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)} // Form submission is handled by handleSubmit
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="forms:label-address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register('phone', {
                required: 'forms:phone-required',
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
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
              {...register('city')}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="forms:label-postcode"
              {...register('zipCode')}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>
          <div>
            <Button
              type="submit" // Changed to 'submit' to trigger form submission
              loading={isLoading}
              disabled={isLoading}
            >
              Add Address
            </Button>
          </div>
          <TextArea
            labelKey="forms:label-order-notes"
            {...register('note')}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
        </div>
        <div className="py-8 flex justify-end">
          <Button onClick={(e)=>handleSubmit2(e)}>Place order</Button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
