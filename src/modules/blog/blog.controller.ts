import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {ApiQuery} from "@nestjs/swagger";
import CheckAuth from "src/common/decorators/auth.decorator";
import {
  CanAccess,
  EGroup,
  EPermission,
} from "src/common/decorators/rbac.decorator";
import BlogService from "./blog.service";
import {CreateBlogCommentDto} from "./dto/comment.dto";
import CreateBlogDto from "./dto/create.dto";
import PaginationDto from "./dto/pagination.dto";
import UpdateBlogDto from "./dto/update.dto";

@Controller("blog")
@CheckAuth(EGroup.Blog)
export default class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @ApiQuery({name: "search", required: false})
  @CanAccess(EPermission.Read)
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query("search") search: string
  ) {
    return this.blogService.find(paginationDto, search);
  }
  @Get("/:id")
  findOneById(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.findOneDetail(id);
  }
  @Post()
  @CanAccess(EPermission.Write)
  create(@Body() createDto: CreateBlogDto) {
    return this.blogService.create(createDto);
  }
  @Post("/like-toggle/:blogId")
  likeToggle(@Param("blogId", ParseIntPipe) blogId: number) {
    return this.blogService.likeToggle(blogId);
  }
  @Post("/bookmark-toggle/:blogId")
  bookmarkToggle(@Param("blogId", ParseIntPipe) blogId: number) {
    return this.blogService.bookmarkToggle(blogId);
  }
  @Post("/comment-toggle/:commentId")
  commentToggle(@Param("commentId", ParseIntPipe) commentId: number) {
    return this.blogService.commentToggle(commentId);
  }
  @Post("/comment/:blogId")
  createComment(
    @Param("blogId", ParseIntPipe) blogId: number,
    @Body() commentDto: CreateBlogCommentDto
  ) {
    return this.blogService.createBlogComment(blogId, commentDto);
  }
  @Put("/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBlogDto
  ) {
    return this.blogService.update(id, updateDto);
  }
  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.delete(id);
  }
}
