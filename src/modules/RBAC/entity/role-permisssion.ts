import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "./permission";
import {Role} from "./role.entity";

@Entity("role_permission")
export class RolePermission {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  permissionId: number;
  @Column()
  roleId: number;
  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  role: Role;
  @ManyToOne(() => Permission, (permission) => permission.roles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  permission: Permission;
}
