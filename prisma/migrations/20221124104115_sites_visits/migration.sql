-- CreateTable
CREATE TABLE "siteVisits" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "siteVisits_pkey" PRIMARY KEY ("id")
);
