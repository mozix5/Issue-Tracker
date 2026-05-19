import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "mosin@tracker.com";
  const password = "password123";

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  console.log("User found in database:");
  console.log(`Email: ${user.email}`);
  console.log(`Hashed password in DB: ${user.hashedPassword}`);

  const match = await bcrypt.compare(password, user.hashedPassword || "");
  console.log(`Password comparison match: ${match}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
