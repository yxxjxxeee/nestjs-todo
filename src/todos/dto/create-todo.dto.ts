import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '할 일 제목입니다.',
    example: '예시 할 일 제목입니다.',
    default: '제목 없음',
    minimum: 3,
    maximum: 30,
  })
  @IsString({ message: '제목은 문자열만 가능합니다.' })
  @MinLength(3, { message: '제목은 $constraint1자 이상 작성해주세요.' })
  @MaxLength(30, { message: '제목은 $constraint1자를 넘길 수 없습니다.' })
  title: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: '할 일 완료 여부입니다.',
    example: false,
    default: false,
  })
  @IsBoolean({ message: 'Boolean 타입만 가능합니다.' })
  isDone: boolean;
}
