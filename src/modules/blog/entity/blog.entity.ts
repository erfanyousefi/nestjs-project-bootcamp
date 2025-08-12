import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("blog")
export default class Blog {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({type: "varchar"})
  title: string;
  @Column({type: "text"})
  description: string;
  @Column({type: "text"})
  content: string;
  @Column({type: "varchar"})
  author: string;
  @Column({type: "varchar"})
  study_time: string;
  @Column({type: "text"})
  image: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
