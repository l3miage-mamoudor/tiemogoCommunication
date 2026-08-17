import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "9dwvb0rr",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  studioHost: "tiemogo-communication",
  deployment: {
    appId: "yr7pozocvkuont42r2rt6g7m",
  },
});
