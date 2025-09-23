import { web } from "./app/web.js";
import "dotenv/config";


web.listen(3000, () => {
  console.log("listening on port 3000");
});

const PORT = process.env.PORT ?? 3000;
web.listen(PORT, () => {
  console.log(`API    : http://localhost:${PORT}/api`);
  console.log(`Docs   : http://localhost:${PORT}/docs`);
});