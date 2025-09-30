import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth} from "@nestjs/swagger";
import AuthGuard from "src/modules/auth/guard/auth.guard";
import {RoleGuard} from "src/modules/RBAC/guard/rbac.guard";
import {AccessGroup, EGroup, JustForCondition} from "./rbac.decorator";

export default function CheckAuth(group?: EGroup) {
  return applyDecorators(
    ApiBearerAuth("Authorization"),
    UseGuards(AuthGuard),
    group ? AccessGroup(group) : JustForCondition(),
    UseGuards(RoleGuard)
  );
}
