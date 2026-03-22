import { ingestData } from "./pipeline/ingest/ingest.runner.js";

const main = async () => {
    await ingestData();
}
main();