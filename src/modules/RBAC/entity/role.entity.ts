import User from "src/modules/user/entity/user.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolePermission} from "./role-permisssion";

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  title: string;
  @OneToMany(() => RolePermission, (rp) => rp.role)
  permissions: RolePermission[];
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
