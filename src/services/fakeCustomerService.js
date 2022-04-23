const customers = [
  {
    firstName: "Bruno",
    lastName: "Andrade",
    age: "20",
    adress: "Shoof Boulevard 123",
    city: "Los Angeles",
    phone: "312 983-3213",
  },
  {
    firstName: "Alexandre",
    lastName: "Junior",
    age: "32",
    adress: "Hooks Street 12",
    city: "",
    phone: "321 329-3213",
  },
  {
    firstName: "Dave",
    lastName: "Ghrol",
    age: "45",
    adress: "",
    city: "Acacia Avenue 22",
    phone: "123 983-1232",
  },
  {
    firstName: "Saul",
    lastName: "Hudson",
    age: "26",
    adress: "",
    city: "Captain Jordan's Boulevart 21",
    phone: "122 932-3123",
  },
];

export function getCustomers() {
  return customers.filter((customer) => customer);
}
