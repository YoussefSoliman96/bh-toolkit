-- CreateEnum
CREATE TYPE "Title" AS ENUM ('NP', 'MD', 'DNP', 'DO', 'AMFT', 'APCC', 'LCSW', 'PhD', 'PsyD');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PSYCHIATRIST', 'THERAPIST', 'RESIDENCY');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "title" "Title" NOT NULL,
    "role" "Role" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "evaluation" TEXT NOT NULL DEFAULT '30',
    "followUp" TEXT NOT NULL DEFAULT '10',
    "languages" TEXT NOT NULL DEFAULT 'English',
    "ageRange" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL DEFAULT '',
    "suboxoneAddiction" BOOLEAN NOT NULL DEFAULT false,
    "adhd" BOOLEAN NOT NULL DEFAULT false,
    "schizophreniaBipolar" BOOLEAN NOT NULL DEFAULT false,
    "clozapine" BOOLEAN NOT NULL DEFAULT false,
    "autism" BOOLEAN NOT NULL DEFAULT false,
    "acceptPainManagementPts" BOOLEAN NOT NULL DEFAULT false,
    "traumaticBrainInjury" BOOLEAN NOT NULL DEFAULT false,
    "neurodegenerativeDisease" BOOLEAN NOT NULL DEFAULT false,
    "minorsAfterSchool" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL DEFAULT '',
    "handlerId" INTEGER,
    "schedulerId" INTEGER,
    "transcriberId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Handler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Scheduler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcriber" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Transcriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "gender" "Gender" NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'English',
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "Handler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_schedulerId_fkey" FOREIGN KEY ("schedulerId") REFERENCES "Scheduler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_transcriberId_fkey" FOREIGN KEY ("transcriberId") REFERENCES "Transcriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
