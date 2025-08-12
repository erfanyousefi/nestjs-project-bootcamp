import User from "src/modules/user/entity/user.entity";
import {DeepPartial} from "typeorm";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<DeepPartial<User>, "password" | "otp_code" | "otp_expires">;
    }
  }
}
