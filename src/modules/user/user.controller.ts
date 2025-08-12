import {Controller, Get, Req, UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Request} from "express";
import AuthGuard from "../auth/guard/auth.guard";
import UserService from "./user.service";

@Controller("user")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export default class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  findAll() {
    return this.userService.findAll();
  }
  @Get("/whoami")
  whoami(@Req() req: Request) {
    return req.user;
  }
}
