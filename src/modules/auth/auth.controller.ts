import {Body, Controller, Post} from "@nestjs/common";
import AuthService from "./auth.service";
import SignInDto from "./dto/login.dto";
import SignUpDto from "./dto/register.dto";

@Controller("auth")
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/sign-up")
  signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }
  @Post("/sign-in")
  signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }
}
