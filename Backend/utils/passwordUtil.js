import bcrypt from "bcrypt";

export const generatePassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log("❌ Error generating password:", error.message);
    return null;
  }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.log("❌ Error comparing password:", error.message);
    return null;
  }
};
