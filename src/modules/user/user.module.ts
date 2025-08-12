import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import AuthModule from "../auth/auth.module";
import User from "./entity/user.entity";
import UserController from "./user.controller";
import UserService from "./user.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export default class UserModule {}
