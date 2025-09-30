import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RbacController} from "./controller/rbac.controller";
import {Permission} from "./entity/permission";
import {RolePermission} from "./entity/role-permisssion";
import {Role} from "./entity/role.entity";
import {RbacService} from "./service/rbac.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission, Permission])],
  controllers: [RbacController],
  providers: [RbacService],
  exports: [RbacService],
})
export class RbacModule {}
