/*
  Warnings:

  - The primary key for the `Budget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Budget` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `unitprice` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `item` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_pkey",
DROP COLUMN "title",
ADD COLUMN     "item" TEXT NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "unitprice" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Budget_pkey" PRIMARY KEY ("item");
