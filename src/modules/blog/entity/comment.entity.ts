import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./blog.entity";

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
  @ManyToOne(() => Blog, (blog) => blog.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  blog: Blog;
}
