const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: { title: "SIRADU BE API", description: "Dokumentasi API SIRADU", version: "1.0.0" },
  servers: [{ url: process.env.APP_URL || "http://localhost:3000", description: "Local" }],
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: "Auth", description: "Autentikasi" },
    { name: "Pasien", description: "Manajemen pasien" },
  ],
};

// OUTPUT ke folder root "assets"
const outputFile = "./assets/swagger.json";

// scan file yang berisi definisi route
const endpointsFiles = ["./src/app/web.js", "./src/routes/routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
