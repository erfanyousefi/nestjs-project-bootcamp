import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class PermissionDto {
  @ApiPropertyOptional({enum: ["Blog", "User"]})
  group: string;
  @ApiProperty({enum: ["Write", "Update", "Delete", "Read"]})
  title: string;
}
