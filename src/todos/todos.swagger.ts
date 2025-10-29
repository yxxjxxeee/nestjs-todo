import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseTodoDto } from './dto/response-todo.dto';

// 실패 응답 (Bad Request)
const badRequestExample = {
  message: ['Boolean 타입만 가능합니다.'],
  error: 'Bad Request',
  statusCode: 400,
};

// 실패 응답 (Not Found)
const notFoundExample = {
  message: 'ID가 {id}인 할 일이 존재하지 않습니다.',
  error: 'Not Found',
  statusCode: 404,
};

// 성공 응답 (단일 데이터)
const ApiResponseWithData = <T extends Type<any>>(
  model: T,
  status = 200,
  description = '할 일을 성공적으로 조회했습니다.',
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      description,
      type: model,
    }),
  );
};

// 성공 응답 (배열)
const ApiResponseWithArrayData = <T extends Type<any>>(
  model: T,
  status = 200,
  description = '전체 할 일을 성공적으로 조회했습니다.',
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      description,
      type: model,
      isArray: true,
    }),
  );
};

// 성공 응답 (삭제 등 데이터 없음)
const successResponseNoData = (message: string, status = 204) =>
  ApiResponse({
    status,
    description: message,
  });

// Swagger 데코레이터
export const ApiTodos = {
  create: () =>
    applyDecorators(
      ApiOperation({ summary: '할 일 추가' }),
      ApiResponseWithData(
        ResponseTodoDto,
        201,
        '할 일이 성공적으로 추가되었습니다.',
      ),
      ApiResponse({
        status: 400,
        description: 'Bad Request',
        content: { 'application/json': { example: badRequestExample } },
      }),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: '할 일 조회' }),
      ApiResponseWithData(ResponseTodoDto),
      ApiResponse({
        status: 404,
        description: 'Not Found',
        content: { 'application/json': { example: notFoundExample } },
      }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: '전체 할 일 조회' }),
      ApiResponseWithArrayData(ResponseTodoDto),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: '할 일 수정' }),
      ApiResponseWithData(
        ResponseTodoDto,
        200,
        '할 일이 성공적으로 수정되었습니다.',
      ),
      ApiResponse({
        status: 400,
        description: 'Bad Request',
        content: { 'application/json': { example: badRequestExample } },
      }),
      ApiResponse({
        status: 404,
        description: 'Not Found',
        content: { 'application/json': { example: notFoundExample } },
      }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: '할 일 삭제' }),
      successResponseNoData('할 일이 성공적으로 삭제되었습니다.'),
      ApiResponse({
        status: 404,
        description: 'Not Found',
        content: { 'application/json': { example: notFoundExample } },
      }),
    ),
};
