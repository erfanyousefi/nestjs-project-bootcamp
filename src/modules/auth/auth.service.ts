import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {compareSync, genSaltSync, hashSync} from "bcrypt";
import {randomInt} from "crypto";
import JwtConstant from "src/common/constant/jwt.constant";
import {Repository} from "typeorm";
import User from "../user/entity/user.entity";
import {ForgetPasswordDto, ResetPasswordDto} from "./dto/forget-password.dto";
import SignInDto from "./dto/login.dto";
import SignUpDto from "./dto/register.dto";

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup(signDto: SignUpDto) {
    const {firstname, lastname, mobile, password} = signDto;
    const user = await this.userRepository.findOneBy({mobile});
    if (user) throw new UnauthorizedException("already exist user mobile");
    const sal = genSaltSync(10);
    const hashed = hashSync(password, sal);
    await this.userRepository.insert({
      firstname,
      lastname,
      mobile,
      password: hashed,
    });
    return {message: "Your registered successful"};
  }
  async signIn(signinDto: SignInDto) {
    const {mobile, password} = signinDto;
    const user = await this.userRepository.findOneBy({mobile});
    if (!user) throw new UnauthorizedException("not found account ");
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException("username or password in incorrect");
    }
    let token = this.jwtService.sign(
      {id: user.id},
      {expiresIn: "1d", secret: JwtConstant.secret}
    );
    return {
      token,
      message: "You logged in successful",
    };
  }
  async forgetPassword(forgetDto: ForgetPasswordDto) {
    const {mobile} = forgetDto;
    const user = await this.userRepository.findOneBy({mobile});
    if (!user) throw new UnauthorizedException("not found account");
    const code = randomInt(1000, 9999).toString();
    if (user.otp_expire > new Date()) {
      throw new BadRequestException("the previous code not expired!");
    }
    if (user.reset_password_count >= 3) {
      throw new ForbiddenException(
        "You cant try more than 3 times for reset password"
      );
    }
    user.reset_password_count += 1;
    user.otp_code = code;
    user.otp_expire = new Date(Date.now() + 1000 * 60 * 2);
    await this.userRepository.save(user);
    const token = this.jwtService.sign(
      {accountId: user.id},
      {secret: JwtConstant.ResetPasswordSecret, expiresIn: 120 * 1000}
    );
    //send sms after conditions

    return {
      code,
      token,
      message: "sent otp code",
    };
  }
  async resetPassword(forgetDto: ResetPasswordDto) {
    const {code, token, newPassword, confirm} = forgetDto;
    const user = await this.validateResetToken(token);
    if (newPassword !== confirm) {
      throw new BadRequestException(
        "You're password should be equals with their confirm."
      );
    }
    if (user.otp_expire < new Date()) {
      throw new BadRequestException("You're otp code is expired!");
    }
    if (user.wrong_count >= 3) {
      throw new BadRequestException("you tries too today please try again!");
    }
    if (user.otp_code !== code) {
      user.wrong_count += 1;
      await this.userRepository.save(user);
      throw new BadRequestException("otp code is wrong!");
    }
    const sal = genSaltSync(10);
    const password = hashSync(newPassword, sal);
    user.password = password;
    await this.userRepository.save(user);
    return {
      message: "reset password successfully. please login on you're account",
    };
  }
  async validateToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: JwtConstant.secret,
    });
    if (payload?.id) {
      const user = await this.userRepository.findOneBy({id: payload.id});
      if (!user) throw new UnauthorizedException("not found user account");
      return {
        id: user.id,
        image: user.image,
        firstname: user.firstname,
        lastname: user.lastname,
        mobile: user.mobile,
      };
    }
    throw new UnauthorizedException("not found user account");
  }
  async validateResetToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: JwtConstant.ResetPasswordSecret,
    });
    if (payload?.accountId) {
      const user = await this.userRepository.findOneBy({id: payload.accountId});
      if (!user) throw new UnauthorizedException("not found user account");
      return user;
    }
    throw new UnauthorizedException("not found user account");
  }
}
