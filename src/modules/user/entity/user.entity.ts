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
  otp_expire: string;
  @CreateDateColumn()
  created_at: Date;
}
