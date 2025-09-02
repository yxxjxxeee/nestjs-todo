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
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseMessage } from './decorators/response-message.decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';

@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ResponseMessage('성공적으로 할 일을 추가했습니다.')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createdTodo;
  }

  @Get()
  @ResponseMessage('성공적으로 전체 할 일을 불러왔습니다.')
  async findAll() {
    const foundTodos = await this.todosService.findAll();
    return foundTodos;
  }

  @Get(':id')
  @ResponseMessage('성공적으로 할 일을 불러왔습니다.')
  async findOne(@Param('id') id: number) {
    const foundTodo = await this.todosService.findOne(id);
    return foundTodo;
  }

  @Patch(':id')
  @ResponseMessage('성공적으로 할 일을 수정했습니다.')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const updatedTodo = await this.todosService.update(id, updateTodoDto);
    return { data: updatedTodo };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    this.todosService.remove(id);
  }
}
