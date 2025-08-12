import {ApiProperty} from "@nestjs/swagger";

export default class SignUpDto {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  password: string;
}
