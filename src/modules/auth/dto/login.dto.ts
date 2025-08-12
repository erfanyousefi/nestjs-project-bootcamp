import {ApiProperty} from "@nestjs/swagger";

export default class SignInDto {
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  password: string;
}
