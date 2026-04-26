import { app } from "./app.js";
import { connectToDb } from "./utils/connect-to-db.js";

const port = process.env.PORT;

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running in the port ${port}`);
    });
  })
  .catch(() => {
    console.error("database connection failed");
    process.exit(1);
  });
