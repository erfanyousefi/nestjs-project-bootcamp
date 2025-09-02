import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import AuthModule from "../auth/auth.module";
import BlogController from "./blog.controller";
import BlogService from "./blog.service";
import Blog from "./entity/blog.entity";
import {BlogBookmark} from "./entity/bookmark.entity";
import {BlogComment} from "./entity/comment.entity";
import {BlogLike} from "./entity/like.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Blog, BlogLike, BlogBookmark, BlogComment]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [],
})
export default class BlogModule {}
