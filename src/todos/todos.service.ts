import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  create(createTodo: CreateTodoDto) {
    return `This action adds a new todo 
    todo: ${createTodo.todo} 
    isDone: ${createTodo.isDone}`;
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodo: UpdateTodoDto) {
    return `This action updates a #${id} todo
    todo: ${updateTodo.todo} 
    isDone: ${updateTodo.isDone}`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
