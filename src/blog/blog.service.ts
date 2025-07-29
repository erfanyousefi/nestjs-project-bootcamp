import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOptionsWhere, ILike, Repository} from "typeorm";
import CreateBlogDto from "./dto/create.dto";
import PaginationDto from "./dto/pagination.dto";
import UpdateBlogDto from "./dto/update.dto";
import Blog from "./entity/blog.entity";

@Injectable()
export default class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>
  ) {}
  async find(paginationDto: PaginationDto, search?: string) {
    const {limit = 10, page = 1} = paginationDto;
    const skip = (page - 1) * limit;
    let where: FindOptionsWhere<Blog> | FindOptionsWhere<Blog>[] = {};
    if (search?.trim() && search.trim().length > 0) {
      search = `%${search}%`;
      where = {title: ILike(search)};
    }
    const [blog, totalCount] = await this.blogRepository.findAndCount({
      where,
      take: limit,
      skip,
    });
    return {
      pagination: {
        totalCount,
        page,
        limit,
      },
      blog,
    };
  }
  async findOne(id: number) {
    const blog = await this.blogRepository.findOneBy({id});
    if (!blog) throw new NotFoundException();
    return blog;
  }
  async create(createDto: CreateBlogDto) {
    const {title, description, content, author, study_time, image} = createDto;
    await this.blogRepository.insert({
      title,
      description,
      content,
      author,
      study_time,
      image,
    });
    return {
      message: "created blog successfully",
    };
  }
  async update(id: number, updateDto: UpdateBlogDto) {
    const blog = await this.findOne(id);
    const {title, description, content, author, study_time, image} = updateDto;
    Object.assign(blog, {
      title,
      description,
      content,
      author,
      study_time,
      image,
    });
    await this.blogRepository.save(blog);
    return {
      message: "updated blog successfully",
    };
  }
  async delete(id: number) {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
    return {
      message: "deleted blog successfully",
    };
  }
}
