import {ApiProperty} from "@nestjs/swagger";

export class CreateBlogCommentDto {
  @ApiProperty()
  comment: string;
}
