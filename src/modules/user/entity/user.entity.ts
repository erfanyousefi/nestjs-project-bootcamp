import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({nullable: true})
  image: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  mobile: string;
  @Column({nullable: true})
  password: string;
  @Column({nullable: true})
  otp_code: string;
  @Column({nullable: true})
  otp_expire: Date;
  @Column({nullable: true, default: 0})
  wrong_count: number;
  @Column({nullable: true, default: 0})
  reset_password_count: number;
  @CreateDateColumn()
  created_at: Date;
}
