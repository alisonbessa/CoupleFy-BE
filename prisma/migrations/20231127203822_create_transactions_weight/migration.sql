-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "primaryUserWeight" DOUBLE PRECISION DEFAULT 50,
ADD COLUMN     "secondaryUserWeight" DOUBLE PRECISION DEFAULT 50;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "primaryUserWeight" DOUBLE PRECISION DEFAULT 50,
ADD COLUMN     "secondaryUserWeight" DOUBLE PRECISION DEFAULT 50;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPrimaryUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserTransaction" (
    "userId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userWeight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserTransaction_pkey" PRIMARY KEY ("userId","transactionId")
);

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
