import "dotenv/config";
import { web } from "./app/web.js";

// console.log("DATABASE_URL at runtime:", process.env.DATABASE_URL);
// console.log("JWT_SECRET at runtime:", process.env.JWT_SECRET);

const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  // console.log(`✅ Server running on port ${PORT}`);
  console.log(`API   : http://localhost:${PORT}/api`);
  console.log(`Docs  : http://localhost:${PORT}/docs`);
});
