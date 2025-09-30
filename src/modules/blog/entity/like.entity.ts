import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./blog.entity";

@Entity("blog_like")
export class BlogLike {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  blogId: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => Blog, (blog) => blog.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  blog: Blog;
}
