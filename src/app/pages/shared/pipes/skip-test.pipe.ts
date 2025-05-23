import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skipTest',
})
export class SkipTestPipe implements PipeTransform {
  transform(_value: unknown, ..._args: unknown[]): unknown {
    return null;
  }
}
