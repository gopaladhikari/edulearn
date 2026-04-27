import type { IUsers } from "./users.t.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUsers;
    }
  }
}
