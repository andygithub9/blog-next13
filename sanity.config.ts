import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import StudioNavbar from "./components/StudioNavbar";
import Logo from "./components/Logo";
import { getDefaultDocumentNode } from "./structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "PAPAFAM_Content_Studio",
  title: "PAPAFAM Content Studio",
  projectId,
  dataset,

  plugins: [
    // https://www.sanity.io/docs/desk-tool-api#defaultDocumentNode-ef8f0b9fc102
    deskTool({ defaultDocumentNode: getDefaultDocumentNode }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  // https://www.sanity.io/docs/studio-components
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  // examplie code: https://www.sanity.io/docs/theming
  theme: myTheme,
});
