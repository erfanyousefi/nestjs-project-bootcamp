import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("blog_comment")
export class BlogComment {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  blogId: number;
  @Column()
  userId: number;
  @Column({type: "text"})
  comment: string;
  @Column({type: "boolean", default: false})
  accepted: boolean;
  @CreateDateColumn()
  created_at: Date;
}
