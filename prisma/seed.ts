import { getPrisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

const prisma = getPrisma();

async function main() {
  console.log("Start seeding...");

  // Create a teacher
  const teacherPassword = await bcrypt.hash("password123", 10);
  const teacher = await prisma.user.upsert({
    where: { username: "professor-x" },
    update: {},
    create: {
      username: "professor-x",
      name: "Charles Xavier",
      password: teacherPassword,
      role: "TEACHER",
    },
  });
  console.log(`Upserted teacher: ${teacher.name}`);

  // Create a student
  const studentPassword = await bcrypt.hash("password123", 10);
  const student = await prisma.user.upsert({
    where: { username: "jean-grey" },
    update: {},
    create: {
      username: "jean-grey",
      name: "Jean Grey",
      password: studentPassword,
      role: "STUDENT",
    },
  });
  console.log(`Upserted student: ${student.name}`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
