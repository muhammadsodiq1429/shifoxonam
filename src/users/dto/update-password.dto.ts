import { IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {
  old_password: string;

  @IsStrongPassword()
  new_password: string;

  confirm_password: string;
}
