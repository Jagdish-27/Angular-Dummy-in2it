import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readKey',
})
export class ReadKeyPipe implements PipeTransform {
  transform(obj: any, ...args: any[]): any {
    const keys = args[0].split('.');
    const key = keys[0];

    if (!obj || !obj.hasOwnProperty(key)) {
      return undefined;
    }

    if (keys.length === 1) {
      return obj[key];
    }

    return this.transform(obj[key], keys.slice(1).join('.'));
  }
}
