import HashMap from "./HashMap";

const family = new HashMap();

family.set("Peter", "Peter Griffin");
family.set("Luis", "Luis Griffin");
family.set("Chris", "Chris Griffin");
family.print();

console.log(family.get("Peter"));
console.log(family.has("Luis"));

family.remove("Chris");
family.print();

console.log(family.length());

console.log(family.keys());
console.log(family.values());
console.log(family.entries());

family.clear();
family.print();
