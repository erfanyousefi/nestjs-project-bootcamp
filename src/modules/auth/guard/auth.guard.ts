import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {Request} from "express";
import AuthService from "../auth.service";

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    const user = await this.authService.validateToken(token);
    request.user = user;
    return true;
  }
  extractToken(req: Request) {
    const {authorization} = req.headers;
    if (!authorization || authorization.trim() === "") {
      throw new UnauthorizedException();
    }
    const [bearer, token] = authorization.split(" "); //bearer token
    if (bearer?.toLowerCase() !== "bearer" || !token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}
