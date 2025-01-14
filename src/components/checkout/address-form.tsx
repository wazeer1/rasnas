import { useState } from "react";
import { useAddAddressMutation } from "./useAddressMutation"; // Adjust the import path

const AddressForm = () => {
  const { mutate: addAddress, isLoading } = useAddAddressMutation();
  const [addressInput, setAddressInput] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    city: "",
    post_code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addAddress(addressInput, {
      onSuccess: () => {
        alert("Address added successfully!");
        // Reset form or other success actions
        setAddressInput({
          first_name: "",
          last_name: "",
          address: "",
          phone: "",
          email: "",
          city: "",
          post_code: "",
        });
      },
      onError: (error) => {
        alert(error.message || "Failed to add address");
      },
    });
  };

  return (
    <div>
      <h2>Add Address</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="first_name"
          placeholder="First Name"
          value={addressInput.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={addressInput.last_name}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={addressInput.address}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={addressInput.phone}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={addressInput.email}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={addressInput.city}
          onChange={handleChange}
        />
        <input
          name="post_code"
          placeholder="Post Code"
          value={addressInput.post_code}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
