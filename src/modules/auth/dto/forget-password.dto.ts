import {ApiProperty} from "@nestjs/swagger";

export class ForgetPasswordDto {
  @ApiProperty()
  mobile: string;
}
export class ResetPasswordDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  confirm: string;
}
