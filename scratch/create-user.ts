import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "mosin@tracker.com";
  const password = "password@123";
  const name = "Mosin";

  const hashedPassword = await bcrypt.hash(password, 10);

  // Clean up any old duplicate if exists
  await prisma.user.deleteMany({
    where: { email },
  });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  console.log("\n==========================================");
  console.log("🎉 SUCCESS! Created credentials-enabled user:");
  console.log(`📧 Email:    ${user.email}`);
  console.log(`🔑 Password: ${password}`);
  console.log("==========================================\n");
}

main()
  .catch((e) => {
    console.error("Failed to seed user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
