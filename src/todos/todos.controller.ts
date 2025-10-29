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
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTodos } from './todos.swagger';

@ApiTags('todos')
@ApiExtraModels(ResponseTodoDto)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiTodos.create()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createdTodo;
  }

  @Get(':id')
  @ApiTodos.findOne()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(id);
    return foundTodo;
  }

  @Get()
  @ApiTodos.findAll()
  async findAll() {
    const foundTodos = await this.todosService.findAll();
    return foundTodos;
  }

  @Patch(':id')
  @ApiOperation({ summary: '할 일 수정' })
  @ApiTodos.update()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const updatedTodo = await this.todosService.update(id, updateTodoDto);
    return updatedTodo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTodos.remove()
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.todosService.remove(id);
  }
}
