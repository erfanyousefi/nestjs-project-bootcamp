import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolePermission} from "./role-permisssion";

@Entity("permission")
export class Permission {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  group: string;
  @Column()
  title: string;
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  roles: RolePermission[];
}
