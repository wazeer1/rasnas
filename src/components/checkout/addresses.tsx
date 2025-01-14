import React, { useEffect, useState } from "react";
import { useFetchAddress } from "@framework/product/get-addresses";

// Define the AddressList props to include the onAddressSelect callback
interface AddressListProps {
  onAddressSelect: (address: AddressInputType) => void; // Callback to return selected address
}

const AddressList: React.FC<AddressListProps> = ({
  onAddressSelect,
  refresh,
}) => {
  const {
    data: addresses,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchAddress();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  // const [refresh, setRefresh] = useState();

  // Handle loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <div>
        <p>Error fetching addresses: {error?.message}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  // If no addresses are available, show a message
  if (!addresses?.addresses || addresses.addresses.length === 0) {
    return (
      <p className="text-heading pb-6">
        No addresses found. Please add an address!
      </p>
    );
  }

  // Render the list of addresses
  return (
    <div className="pb-8">
      <h2>Your Addresses</h2>
      <div className="flex space-x-2 w-full overflow-x-scroll no_scrollbar">
        {addresses.addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-md space-x-3 text-heading p-2 flex items-start ${
              selectedAddress === addr.id
                ? "border-blue-500"
                : "border-gray-400"
            }`}
          >
            <div>
              <p className="mb-0">
                <strong>
                  {addr.first_name} {addr.last_name}
                </strong>
              </p>
              <p className="mb-0">
                {addr.address}, {addr.city}
              </p>
              <p className="mb-0">{addr.post_code}</p>
              <p className="mb-0">{addr.phone}</p>
            </div>

            <div
              className="mt-2 cursor-pointer flex items-center"
              onClick={() => {
                setSelectedAddress(addr.id);
                onAddressSelect(addr); // Return the selected address to the parent
              }}
            >
              <div
                className={`w-[10px] h-[10px] border-2 rounded-full ${
                  selectedAddress === addr.id ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
              <span className="ml-2">
                {selectedAddress === addr.id ? "Selected" : "Select"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressList;
