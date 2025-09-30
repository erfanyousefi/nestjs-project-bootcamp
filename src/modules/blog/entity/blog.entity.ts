import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {BlogBookmark} from "./bookmark.entity";
import {BlogComment} from "./comment.entity";
import {BlogLike} from "./like.entity";

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
  @OneToMany(() => BlogLike, (like) => like.blog)
  likes: BlogLike[];
  @OneToMany(() => BlogBookmark, (bookmark) => bookmark.blog)
  bookmarks: BlogBookmark[];
  @OneToMany(() => BlogComment, (comment) => comment.blog)
  comments: BlogComment[];
}
