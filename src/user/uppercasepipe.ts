import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class UpperCasePipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. Expected a string.');
    }
    return value.toUpperCase();
  }
}