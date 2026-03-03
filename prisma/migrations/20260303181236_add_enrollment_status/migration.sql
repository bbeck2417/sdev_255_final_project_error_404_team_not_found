-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('IN_CART', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "status" "EnrollmentStatus" NOT NULL DEFAULT 'IN_CART';
