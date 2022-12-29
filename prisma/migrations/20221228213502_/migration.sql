-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "CPF" TEXT NOT NULL,
    "admissionDate" TIMESTAMPTZ NOT NULL,
    "bank" TEXT,
    "agency" TEXT,
    "account" TEXT,
    "operation" TEXT,
    "pixKey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,
    "hierarchy" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Construction" (
    "id" TEXT NOT NULL,
    "overTimeId" TEXT,
    "name" TEXT NOT NULL,
    "UF" TEXT NOT NULL,

    CONSTRAINT "Construction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariableMoney" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "productionSalary" DECIMAL(10,2) NOT NULL,
    "bonus" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "VariableMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyInAdvance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MoneyInAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverTime" (
    "id" TEXT NOT NULL,
    "overTimeWorkId" TEXT NOT NULL,
    "percentageOnSalary" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OverTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverTimeWork" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "OverTimeWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscountToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConstructionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_CPF_key" ON "User"("name", "CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_UF_key" ON "Role"("name", "UF");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_name_key" ON "Discount"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Construction_name_UF_key" ON "Construction"("name", "UF");

-- CreateIndex
CREATE UNIQUE INDEX "OverTime_overTimeWorkId_key" ON "OverTime"("overTimeWorkId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscountToUser_AB_unique" ON "_DiscountToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscountToUser_B_index" ON "_DiscountToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConstructionToUser_AB_unique" ON "_ConstructionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConstructionToUser_B_index" ON "_ConstructionToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_overTimeId_fkey" FOREIGN KEY ("overTimeId") REFERENCES "OverTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariableMoney" ADD CONSTRAINT "VariableMoney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyInAdvance" ADD CONSTRAINT "MoneyInAdvance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverTime" ADD CONSTRAINT "OverTime_overTimeWorkId_fkey" FOREIGN KEY ("overTimeWorkId") REFERENCES "OverTimeWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverTimeWork" ADD CONSTRAINT "OverTimeWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToUser" ADD CONSTRAINT "_DiscountToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToUser" ADD CONSTRAINT "_DiscountToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConstructionToUser" ADD CONSTRAINT "_ConstructionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Construction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConstructionToUser" ADD CONSTRAINT "_ConstructionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;