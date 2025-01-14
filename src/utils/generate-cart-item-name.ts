import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";

export function generateCartItemName(name: string) {
  if (!isEmpty(attributes)) {
    ;
    return `${name} - ${sortedAttributes.join(", ")}`;
  }
  return name;
}
