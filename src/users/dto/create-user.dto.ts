import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({
    description: 'The user email',
    required: true,
    type: String,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    description: 'The user password',
    required: true,
    type: String,
  })
  readonly password: string;
}
