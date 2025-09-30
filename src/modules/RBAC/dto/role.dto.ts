import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty()
  title: string;
  @ApiPropertyOptional({type: "integer", isArray: true})
  permissionIds: number[];
}
