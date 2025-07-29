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
import BlogService from "./blog.service";
import CreateBlogDto from "./dto/create.dto";
import PaginationDto from "./dto/pagination.dto";
import UpdateBlogDto from "./dto/update.dto";

@Controller("blog")
export default class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query("search") search: string
  ) {
    return this.blogService.find(paginationDto, search);
  }
  @Get("/:id")
  findOneById(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }
  @Post()
  create(@Body() createDto: CreateBlogDto) {
    return this.blogService.create(createDto);
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
