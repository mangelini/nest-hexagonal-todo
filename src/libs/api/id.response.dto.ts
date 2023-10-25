import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({ example: 12346789 })
  readonly id: number;
}
