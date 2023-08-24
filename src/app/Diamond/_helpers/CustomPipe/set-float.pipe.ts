import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setFloat'
})
export class SetFloatPipe implements PipeTransform {

  // transform(e: number, flonum: any): unknown {

  //   return parseFloat(this[e]).toFixed(flonum)
  // }
  transform(e: any, flonum: number): unknown {

    e = parseFloat(e);
    return e.toFixed(flonum);
  }

  // SETFLOAT(e: any, flonum: any) {
  //   return parseFloat(this[e]).toFixed(flonum)
  // }

}
