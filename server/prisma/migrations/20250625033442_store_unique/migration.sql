/*
  Warnings:

  - A unique constraint covering the columns `[addres]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stores_addres_key" ON "Stores"("addres");
