import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Blog from "./blog.entity";

@Entity("blog_bookmark")
export class BlogBookmark {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  blogId: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => Blog, (blog) => blog.bookmarks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  blog: Blog;
}
