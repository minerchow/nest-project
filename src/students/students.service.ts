import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentsService {
  create(createStudentInput: CreateStudentInput) {
    return 'This action adds a new student';
  }

  findAll() {
    return [{exampleField:1},{exampleField:2},{exampleField:3}];
  }

  findOne(id: number) {
    return {exampleField:id};
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
