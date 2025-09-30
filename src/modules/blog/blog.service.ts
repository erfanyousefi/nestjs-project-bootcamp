import {Inject, Injectable, NotFoundException, Scope} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {InjectRepository} from "@nestjs/typeorm";
import {Request} from "express";
import {FindOptionsWhere, ILike, Repository} from "typeorm";
import {CreateBlogCommentDto} from "./dto/comment.dto";
import CreateBlogDto from "./dto/create.dto";
import PaginationDto from "./dto/pagination.dto";
import UpdateBlogDto from "./dto/update.dto";
import Blog from "./entity/blog.entity";
import {BlogBookmark} from "./entity/bookmark.entity";
import {BlogComment} from "./entity/comment.entity";
import {BlogLike} from "./entity/like.entity";

@Injectable({scope: Scope.REQUEST})
export default class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(BlogLike) private likeRepository: Repository<BlogLike>,
    @InjectRepository(BlogComment)
    private commentRepository: Repository<BlogComment>,
    @InjectRepository(BlogBookmark)
    private bookmarkRepository: Repository<BlogBookmark>,
    @Inject(REQUEST) private request: Request
  ) {}
  async find(paginationDto: PaginationDto, search?: string) {
    const {limit = 10, page = 1} = paginationDto;
    const skip = (page - 1) * limit;
    let whereParams: FindOptionsWhere<Blog> | FindOptionsWhere<Blog>[] = {};
    let whereString = "";
    if (search?.trim() && search.trim().length > 0) {
      search = `%${search}%`;
      whereString = "blog.title = :title";
      whereParams = {title: ILike(search)};
    }
    const queryBuilder = this.blogRepository
      .createQueryBuilder("blog")
      .loadRelationCountAndMap("blog.likes", "blog.likes")
      .loadRelationCountAndMap("blog.bookmarks", "blog.bookmarks")
      .loadRelationCountAndMap(
        "blog.comments",
        "blog.comments",
        "comments",
        (qb) => qb.where("comments.accepted = :accepted", {accepted: true})
      );
    if (whereString) {
      queryBuilder.where(whereString, whereParams);
    }
    queryBuilder.skip(skip).take(limit);
    queryBuilder.orderBy("blog.created_at", "ASC");
    const [blogs, totalCount] = await queryBuilder.getManyAndCount();
    return {
      pagination: {
        totalCount,
        page,
        limit,
      },
      blogs,
    };
  }
  async findOne(id: number) {
    const blog = await this.blogRepository.findOneBy({id});
    if (!blog) throw new NotFoundException();
    return blog;
  }
  async findOneDetail(id: number) {
    const blog = await this.blogRepository
      .createQueryBuilder("blog")
      .where("blog.id = :id", {id})
      .loadRelationCountAndMap("blog.likes", "blog.likes")
      .loadRelationCountAndMap("blog.bookmarks", "blog.bookmarks")
      .leftJoinAndSelect(
        "blog.comments",
        "comments",
        "comments.accepted  = :accepted",
        {accepted: true}
      )
      .getOne();
    if (!blog) throw new NotFoundException("not found blog");
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
  async likeToggle(blogId: number) {
    const {id: userId} = this.request.user;
    await this.findOne(blogId);
    const liked = await this.likeRepository.findOneBy({userId, blogId});
    if (liked) {
      await this.likeRepository.remove(liked);
      return {
        message: "blog unlike successfully",
      };
    } else {
      await this.likeRepository.insert({userId, blogId});
      return {
        message: "blog liked successfully",
      };
    }
  }
  async bookmarkToggle(blogId: number) {
    const {id: userId} = this.request.user;
    await this.findOne(blogId);
    const liked = await this.bookmarkRepository.findOneBy({userId, blogId});
    if (liked) {
      await this.bookmarkRepository.remove(liked);
      return {
        message: "remove in bookmark list",
      };
    } else {
      await this.bookmarkRepository.insert({userId, blogId});
      return {
        message: "added to bookmark list",
      };
    }
  }
  async commentToggle(commentId: number) {
    const comment = await this.commentRepository.findOneBy({id: commentId});
    if (comment) {
      comment.accepted = !comment.accepted;
      await this.commentRepository.save(comment);
      return {
        message: "the comment status changed successfully",
      };
    }
    throw new NotFoundException("not found comment");
  }
  async createBlogComment(blogId: number, commentDto: CreateBlogCommentDto) {
    const {id: userId} = this.request.user;
    await this.findOne(blogId);
    const {comment} = commentDto;
    await this.commentRepository.insert({
      blogId,
      comment,
      userId,
      accepted: false,
    });
    return {
      message: "You're comment inserted successfully",
    };
  }
}
