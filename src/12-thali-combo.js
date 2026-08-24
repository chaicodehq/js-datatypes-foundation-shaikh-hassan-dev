/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    typeof thali !== "object" ||
    thali === null ||
    Array.isArray(thali) ||
    typeof thali.name !== "string" ||
    !Array.isArray(thali.items) ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean"
  ) {
    return "";
  }

  const type = thali.isVeg ? "Veg" : "Non-Veg";

  return `${thali.name.toUpperCase()} (${type}) - Items: ${thali.items.join(
    ", "
  )} - Rs.${thali.price.toFixed(2)}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }

  const vegThalis = thalis.filter((thali) => thali.isVeg === true);
  const nonVegThalis = thalis.filter((thali) => thali.isVeg === false);

  const totalPrice = thalis.reduce((sum, thali) => sum + thali.price, 0);

  const prices = thalis.map((thali) => thali.price);

  return {
    totalThalis: thalis.length,
    vegCount: vegThalis.length,
    nonVegCount: nonVegThalis.length,
    avgPrice: (totalPrice / thalis.length).toFixed(2),
    cheapest: Math.min(...prices),
    costliest: Math.max(...prices),
    names: thalis.map((thali) => thali.name),
  };
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }

  const searchQuery = query.toLowerCase();

  return thalis.filter((thali) => {
    const nameMatches =
      typeof thali.name === "string" &&
      thali.name.toLowerCase().includes(searchQuery);

    const itemMatches =
      Array.isArray(thali.items) &&
      thali.items.some(
        (item) =>
          typeof item === "string" &&
          item.toLowerCase().includes(searchQuery)
      );

    return nameMatches || itemMatches;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  if (
    typeof customerName !== "string" ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  ) {
    return "";
  }

  const lineItems = thalis
    .map((thali) => `- ${thali.name} x Rs.${thali.price}`)
    .join("\n");

  const total = thalis.reduce((sum, thali) => sum + thali.price, 0);

  const itemCount = thalis.length;

  return `THALI RECEIPT

Customer: ${customerName.toUpperCase()}
${lineItems}

Total: Rs.${total}
Items: ${itemCount}`;
}
