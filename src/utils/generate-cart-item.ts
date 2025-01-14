import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify"; // Correct import for toast

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item, attribute: object, quantity: number): void {
  // Debug logs (optional)
  
  // Check if the attribute is empty
  if (isEmpty(attribute)) {
    toast.error("Please select an attribute");
    
    return true
  }

  // Proceed with the rest of the logic for generating the cart item
  console.log("Cart item successfully generated!");
  // Example: return { item, attribute, quantity }; if needed
}
