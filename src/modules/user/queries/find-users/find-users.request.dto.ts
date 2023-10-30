import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindUsersRequestDto {
  @ApiProperty({ example: 123456789, description: 'User id'})
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ example: 'some-complex-string', description: 'User id'})
  @IsOptional()
  @IsString()
  readonly uuid?: string;
}