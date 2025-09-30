import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {PermissionDto} from "../dto/permission.dto";
import {RoleDto} from "../dto/role.dto";
import {Permission} from "../entity/permission";
import {RolePermission} from "../entity/role-permisssion";
import {Role} from "../entity/role.entity";

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>
  ) {}
  async createRole(dto: RoleDto) {
    let {title, permissionIds} = dto;
    if (
      permissionIds &&
      Array.isArray(permissionIds) &&
      permissionIds.length > 0
    ) {
      permissionIds = [...new Set(permissionIds.map(Number))];
      const permissionCount = await this.permissionRepository.countBy({
        id: In(permissionIds),
      });
      if (permissionCount !== permissionIds.length) {
        throw new BadRequestException("permission list is invalid");
      }
    }
    let role = this.roleRepository.create({title});
    role = await this.roleRepository.save(role);
    if (permissionIds?.length > 0) {
      let rolePermission: Partial<RolePermission>[] = [];
      for (const permissionId of permissionIds) {
        rolePermission.push({roleId: role.id, permissionId});
      }
      await this.rolePermissionRepository.insert(rolePermission);
    }
    return {
      message: "role created successfully",
    };
  }
  async createPermission(dto: PermissionDto) {
    let {title, group} = dto;

    let permission = await this.permissionRepository.findOneBy({title, group});
    if (permission)
      throw new ConflictException(
        "already exist permission in this group: " + group
      );
    await this.permissionRepository.insert({title, group});
    return {
      message: "permission created successfully",
    };
  }
}
