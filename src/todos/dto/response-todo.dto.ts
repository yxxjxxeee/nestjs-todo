import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';

export class ResponseTodoDto implements Todo {
  @ApiProperty({
    required: true,
    type: String,
    description: '할 일 제목입니다.',
    example: '예시 할 일 제목입니다.',
    default: '제목 없음',
    minimum: 3,
    maximum: 30,
  })
  title: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: '할 일 완료 여부입니다.',
    example: false,
    default: false,
  })
  isDone: boolean;

  @ApiProperty({
    required: true,
    type: Number,
    description: '할 일 id입니다.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    required: true,
    type: Date,
    description: '할 일 생성일입니다.',
    example: '2025-09-02T07:59:36.217Z',
  })
  createdAt: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: '할 일 수정일입니다.',
    example: '2025-09-02T07:59:36.217Z',
  })
  updatedAt: Date;
}
