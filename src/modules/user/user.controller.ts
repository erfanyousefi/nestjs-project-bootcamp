import {Controller, Get, Req} from "@nestjs/common";
import {Request} from "express";
import CheckAuth from "src/common/decorators/auth.decorator";
import UserService from "./user.service";

@Controller("user")
@CheckAuth()
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
