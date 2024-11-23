import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import DBConnection from "./db/index.js";
import { app } from "./app.js";

const response = DBConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on http://localhost/${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection Error!!!");
  });
