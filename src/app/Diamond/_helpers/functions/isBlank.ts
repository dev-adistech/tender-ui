import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Injectable({ providedIn: 'root' })

export class IsBlank {
  // const isFalsy = value => !value;
  // const isWhitespaceString = value =>
  //   typeof value === 'string' && /^\s*$/.test(value);
  // const isEmptyCollection = value =>
  //   (Array.isArray(value) || value === Object(value)) &&
  //   !Object.keys(value).length;
  // const isInvalidDate = value =>
  //   value instanceof Date && Number.isNaN(value.getTime());
  // const isEmptySet = value => value instanceof Set && value.size === 0;
  // const isEmptyMap = value => value instanceof Map && value.size === 0;

  // const isBlank = value => {
  //   if (isFalsy(value)) return true;
  //   if (isWhitespaceString(value)) return true;
  //   if (isEmptyCollection(value)) return true;
  //   if (isInvalidDate(value)) return true;
  //   if (isEmptySet(value)) return true;
  //   if (isEmptyMap(value)) return true;
  //   return false;
  // };

  constructor(
    private toastr: ToastrService,
  ) { }

  isFalsy = value => !value;

  isWhitespaceString = value =>
    typeof value === 'string' && /^\s*$/.test(value);

  isEmptyCollection = value =>
    (Array.isArray(value) || value === Object(value)) &&
    !Object.keys(value).length;

  isInvalidDate = value =>
    value instanceof Date && Number.isNaN(value.getTime());

  isEmptySet = value => value instanceof Set && value.size === 0;

  isEmptyMap = value => value instanceof Map && value.size === 0;

  isBlank = (value, param) => {
    if (this.isFalsy(value)) {
      this.toastr.warning(`Enter valid ${param}`, '', {
        positionClass: 'toast-top-center'
      })
      return true
    };
    if (this.isWhitespaceString(value)) {
      this.toastr.warning(`Enter valid ${param}`, '', {
        positionClass: 'toast-top-center'
      })
      return true
    };
    if (this.isEmptyCollection(value)) return true;
    if (this.isInvalidDate(value)) return true;
    if (this.isEmptySet(value)) return true;
    if (this.isEmptyMap(value)) return true;
    return false;
  };
}
