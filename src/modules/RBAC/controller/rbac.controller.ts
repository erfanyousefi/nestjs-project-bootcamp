import {Body, Controller, Post} from "@nestjs/common";
import {PermissionDto} from "../dto/permission.dto";
import {RoleDto} from "../dto/role.dto";
import {RbacService} from "../service/rbac.service";

@Controller("/rbac")
export class RbacController {
  constructor(private rbacService: RbacService) {}

  @Post("/role")
  createRole(@Body() roleDto: RoleDto) {
    return this.rbacService.createRole(roleDto);
  }
  @Post("/permission")
  createPermission(@Body() dto: PermissionDto) {
    return this.rbacService.createPermission(dto);
  }
}
