import { web } from "./app/web.js";
import "dotenv/config";

import "dotenv/config";
console.log("DATABASE_URL at runtime:", process.env.DATABASE_URL);

web.listen(3000, () => {
  console.log("listening on port 3000");
});

const PORT = process.env.PORT ?? 3000;
web.listen(PORT, () => {
  console.log(`API    : http://localhost:${PORT}/api`);
  console.log(`Docs   : http://localhost:${PORT}/docs`);
});
