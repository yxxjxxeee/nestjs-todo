import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTodoDto } from './dto/response-todo.dto';
import {
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('todos')
@ApiExtraModels(ResponseTodoDto)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '할 일 추가' })
  @ApiResponse({
    status: 201,
    description: '성공적으로 할 일을 추가했습니다.',
    type: ResponseTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        message: ['Boolean 타입만 가능합니다.'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createdTodo;
  }

  @Get(':id')
  @ApiOperation({ summary: '할 일 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 할 일을 불러왔습니다.',
    type: ResponseTodoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'id가 1인 할 일이 존재하지 않습니다.',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(id);
    return foundTodo;
  }

  @Get()
  @ApiOperation({ summary: '전체 할 일 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 전체 할 일을 불러왔습니다.',
    type: ResponseTodoDto,
    isArray: true,
  })
  async findAll() {
    const foundTodos = await this.todosService.findAll();
    return foundTodos;
  }

  @Patch(':id')
  @ApiOperation({ summary: '할 일 수정' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 할 일을 수정했습니다.',
    type: ResponseTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        message: ['Boolean 타입만 가능합니다.'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'id가 1인 할 일이 존재하지 않습니다.',
        error: 'Not Found',
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const updatedTodo = await this.todosService.update(id, updateTodoDto);
    return updatedTodo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: '성공적으로 할 일을 삭제했습니다.' })
  @ApiOperation({ summary: '할 일 삭제' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        message: ['Boolean 타입만 가능합니다.'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'id가 1인 할 일이 존재하지 않습니다.',
        error: 'Not Found',
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.todosService.remove(id);
  }
}
