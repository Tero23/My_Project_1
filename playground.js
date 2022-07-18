const bcrypt = require("bcryptjs");

const hash = async (pass) => {
  const hashedPassword = await bcrypt.hash(pass, 8);
  return hashedPassword;
};

console.log(hash("jadsjasdjas"));
