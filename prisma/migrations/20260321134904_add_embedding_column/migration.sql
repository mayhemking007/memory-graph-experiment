-- This is an empty migration.
ALTER TABLE "Message"
ADD COLUMN IF NOT EXISTS embedding vector(1536);

ALTER TABLE "Node"
ADD COLUMN IF NOT EXISTS embedding vector(1536);

ALTER TABLE "Query"
ADD COLUMN IF NOT EXISTS embedding vector(1536);