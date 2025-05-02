import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUI } from "@contexts/ui.context";

interface AddressListProps {
  onAddressSelect: (address: AddressInputType) => void;
  onDelete?: (id: string) => void;
  addresses: AddressInputType[];
  isLoading: boolean;
}

const AddressList: React.FC<AddressListProps> = ({
  onAddressSelect,
  onDelete,
  addresses,
  isLoading,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  if (isLoading) return <p>Loading...</p>;

  if (!addresses || addresses.length === 0) {
    return (
      <p className="text-red-600 font-semibold pb-6">
        No address found. Please add an address!
      </p>
    );
  }
  console.log(selectedAddress, "selectedaddres");
  const { setSelectedAddressId } = useUI();
  return (
    <div className="pb-8">
      <h2 className="text-lg font-semibold mb-2">Your Addresses</h2>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap py-2 no_scrollbar">
        {addresses.map((addr) => {
          const isSelected = selectedAddress === addr.id;
          return (
            <div
              key={addr.id}
              className={`relative cursor-pointer border rounded-md text-heading p-4 min-w-[300px] flex flex-col justify-between ${
                isSelected
                  ? "border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-800"
              }`}
              onClick={() => {
                setSelectedAddress(addr.id);
                setSelectedAddressId(addr.id);
                onAddressSelect(addr);
              }}
            >
              {/* Remove button */}
              {onDelete && (
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering address select
                    onDelete(addr.id);
                  }}
                  className="!absolute top-2 right-2"
                >
                  <DeleteIcon fontSize="small" className="text-red-200" />
                </IconButton>
              )}

              <p
                className={`mb-0 font-semibold
                ${isSelected && " text-blue-300"}
                `}
              >
                {addr.first_name} {addr.last_name}
              </p>
              <p className="mb-0">
                {addr.address}, {addr.city}
              </p>
              <p className="mb-0">{addr.post_code}</p>
              <p className="mb-0">{addr.phone}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressList;
