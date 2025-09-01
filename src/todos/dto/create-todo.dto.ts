import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: '제목은 문자열만 가능합니다.' })
  @MinLength(3, { message: '제목은 $constraint1자 이상 작성해주세요.' })
  @MaxLength(30, { message: '제목은 $constraint1자를 넘길 수 없습니다.' })
  title: string;

  @IsBoolean({ message: 'Boolean 타입만 가능합니다.' })
  isDone: boolean;
}
