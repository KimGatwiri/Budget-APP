-- CreateTable
CREATE TABLE "Budget" (
    "title" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitprice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("title")
);
