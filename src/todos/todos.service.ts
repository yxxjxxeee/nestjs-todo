import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodo: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title: createTodo.title,
        isDone: createTodo.isDone,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`id가 ${id}인 할 일이 존재하지 않습니다.`);
    }
    return todo;
  }

  async update(id: number, updateTodo: UpdateTodoDto): Promise<Todo> {
    await this.findOne(id);
    return this.prisma.todo.update({
      where: { id },
      data: {
        title: updateTodo.title,
        isDone: updateTodo.isDone,
      },
    });
  }

  async remove(id: number): Promise<Todo> {
    await this.findOne(id);
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
