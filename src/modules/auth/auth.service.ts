import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {compareSync, genSaltSync, hashSync} from "bcrypt";
import JwtConstant from "src/common/constant/jwt.constant";
import {Repository} from "typeorm";
import User from "../user/entity/user.entity";
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
}
