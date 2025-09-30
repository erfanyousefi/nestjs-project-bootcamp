import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Request} from "express";
import {
  AccessGroupKey,
  AccessPermissionKey,
} from "src/common/decorators/rbac.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const user = req.user;
    const userPermissions = user?.permissions ?? [];
    const accessGroup = this.reflector.get<string>(
      AccessGroupKey,
      context.getClass()
    );
    const requiredPermission = this.reflector.get<string>(
      AccessPermissionKey,
      context.getHandler()
    );
    if (!accessGroup || !requiredPermission) return true;
    return userPermissions.includes(`${accessGroup}.${requiredPermission}`);
  }
}
