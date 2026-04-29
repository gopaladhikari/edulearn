import type { HydratedDocument } from "mongoose";
import type { IUsers } from "./users.t.js";

declare global {
  namespace Express {
    interface User extends HydratedDocument<IUsers> {}
  }
}
