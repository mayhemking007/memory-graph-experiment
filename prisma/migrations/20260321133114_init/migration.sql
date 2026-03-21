CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('ASSISTANT', 'USER');

-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('SEMANTIC', 'TEMPORAL');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "conv_id" TEXT NOT NULL,
    "embedding" vector(1536),
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segment" (
    "id" TEXT NOT NULL,
    "start_message" TEXT NOT NULL,
    "end_message" TEXT NOT NULL,
    "conv_id" TEXT NOT NULL,
    "drift_score" DOUBLE PRECISION NOT NULL,
    "topic_order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "segment_id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "embedding" vector(1536),
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "from_node" TEXT NOT NULL,
    "to_node" TEXT NOT NULL,
    "similarity" DOUBLE PRECISION NOT NULL,
    "type" "EdgeType" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiment" (
    "id" TEXT NOT NULL,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "query_id" TEXT NOT NULL,
    "scores" JSONB,
    "experiment_id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Query" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_conv_id_position_idx" ON "Message"("conv_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Node_segment_id_key" ON "Node"("segment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Result_query_id_key" ON "Result"("query_id");

-- CreateIndex
CREATE UNIQUE INDEX "Result_experiment_id_key" ON "Result"("experiment_id");

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_start_message_fkey" FOREIGN KEY ("start_message") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_end_message_fkey" FOREIGN KEY ("end_message") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "Segment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_from_node_fkey" FOREIGN KEY ("from_node") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_to_node_fkey" FOREIGN KEY ("to_node") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "Experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "Query"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
