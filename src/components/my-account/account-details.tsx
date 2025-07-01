import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useGetUserQuery } from "@framework/customer/use-get-customer";
import { useMutation } from "react-query";

const AccountDetails: React.FC = () => {
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const { data, refetch } = useGetUserQuery();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const userData = data?.app_data?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserType>({
    defaultValues: userData,
  });
  const onSubmit = async (input: UpdateUserType) => {
    updateUser(input, {
      onSuccess: () => {
        refetch();
        setIsEditing(false);
      },
    });
  };

  function handleEditClick() {
    reset(userData);
    setIsEditing(true);
  }

  if (!userData) return null;
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInTop(0.35)}
      className="w-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading">
          {t("common:text-account-details")}
        </h2>
        {!isEditing && (
          <Button
            onClick={handleEditClick}
            className="text-sm px-4 py-2 h-auto"
          >
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center"
          noValidate
        >
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
              <Input
                labelKey="forms:label-first-name"
                {...register("first_name", {
                  required: "forms:first-name-required",
                })}
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.first_name?.message}
              />
              <Input
                labelKey="forms:label-last-name"
                {...register("last_name", {
                  required: "forms:last-name-required",
                })}
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.last_name?.message}
              />
            </div>
            <Input
              labelKey="forms:label-display-name"
              {...register("display_name", {
                required: "forms:display-name-required",
              })}
              variant="solid"
              errorKey={errors.display_name?.message}
            />
            <div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                labelKey="forms:label-phone"
                {...register("phone_number", {
                  required: "forms:phone-required",
                })}
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.phone_number?.message}
              />
              <Input
                type="email"
                labelKey="forms:label-email-star"
                {...register("email", {
                  required: "forms:email-required",
                })}
                variant="solid"
                className="w-full sm:w-1/2"
                errorKey={errors.email?.message}
              />
            </div>
            <div className="relative flex flex-col">
              <span className="mt-2 text-sm text-heading font-semibold block pb-1">
                {t("common:text-gender")}
              </span>
              <div className="mt-2 flex items-center gap-x-6">
                <RadioBox
                  labelKey="forms:label-male"
                  {...register("gender")}
                  value="male"
                />
                <RadioBox
                  labelKey="forms:label-female"
                  {...register("gender")}
                  value="female"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-3 mt-3">
              <Button type="submit" loading={isPending} disabled={isPending}>
                {t("common:button-save")}
              </Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("forms:label-first-name")}
                  </h3>
                  <p className="font-bold text-heading">
                    {userData.first_name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("forms:label-display-name")}
                  </h3>
                  <p className="font-bold text-heading">
                    {userData.display_name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("forms:label-email-star")}
                  </h3>
                  <p className="font-bold text-heading">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("forms:label-last-name")}
                  </h3>
                  <p className="font-bold text-heading">{userData.last_name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("forms:label-phone")}
                  </h3>
                  <p className="font-bold text-heading">
                    {userData.phone_number}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-heading mb-1">
                    {t("common:text-gender")}
                  </h3>
                  <p className="font-bold text-heading capitalize">
                    {userData.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AccountDetails;
