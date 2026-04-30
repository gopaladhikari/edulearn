import { app } from "./app.js";
import { dbConnection } from "./utils/connect-to-db.js";

const port = process.env.PORT;

dbConnection
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running in the port ${port}`);
    });
  })
  .catch(() => {
    console.error("Database connection failed");
    process.exit(1);
  });

// TODO: Add CourseReview, rating, Wishlist, Cart, Certificate, Notification
