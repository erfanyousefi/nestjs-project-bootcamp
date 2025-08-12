import {Module} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "../user/entity/user.entity";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export default class AuthModule {}
