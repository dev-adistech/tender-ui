import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class GridFunctions {
  public pinnedBottomRowData;

  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []

  footerCal(FillRes) {
    this.GridFooter = []
    this.FooterValue = []
    var result = [];
    for (let i = 0; i < this.FooterKey.length; i++) {
      let a = 0
      if (i == 0) {
        this.FooterValue.push(FillRes.length)

      } else {
        for (let j = 0; j < FillRes.length; j++) {
          if (FillRes[j][this.FooterKey[i]]) {
            a = a + FillRes[j][this.FooterKey[i]]
          }
        }
        this.FooterValue.push(a)
      }
    }
    let e = this

    this.GridFooter = this.FooterValue.reduce(function (result, field, index) {
      result[e.FooterKey[index]] = field;
      return result;
    }, {})

    // console.log(this.FooterKey)
    // console.log(this.FooterValue)
    // console.log(this.GridFooter)

    result.push(this.GridFooter)
    this.FooterKey = []
    return this.pinnedBottomRowData = result;
  }


}
