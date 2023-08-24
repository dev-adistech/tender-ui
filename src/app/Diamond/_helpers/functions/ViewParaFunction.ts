import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import Swal from "sweetalert2";
import { ConverterFunctions } from "./ConverterFunctions";

@Injectable({ providedIn: 'root' })

export class ViewParaFunctions {

  GridHeader = []
  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []

  constructor(
    private toastr: ToastrService,
    private ViewParaMastServ: ViewParaMastService,
    private _convFunction: ConverterFunctions,
    // private _gridFunction: GridFunctions,
  ) { }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'DashStock' }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          let ColDefs = []
          this.GridHeader = VPRes.data.map((item) => { return item.FIELDNAME })

          let temp = []

          for (let i = 0; i < VPRes.data.length; i++) {
            temp.push({
              headerName: VPRes.data[i].DISPNAME,
              headerClass: VPRes.data[i].HEADERALIGN,
              field: VPRes.data[i].FIELDNAME,
              width: VPRes.data[i].COLWIDTH,
              cellStyle: { 'text-align': VPRes.data[i].CELLALIGN },
              resizable: VPRes.data[i].ISRESIZE,
              hide: VPRes.data[i].DISP == false ? true : false,
            })

            if (i == 0) { this.FooterKey.push(VPRes.data[i].FIELDNAME) }
            if (VPRes.data[i].FORMAT == '#0') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this._convFunction.NumberFormat
            } else if (VPRes.data[i].FORMAT == '#0.00') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this._convFunction.TwoFloatFormat
            } else if (VPRes.data[i].FORMAT == '#0.000') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this._convFunction.ThreeFloatFormat
            } else if (VPRes.data[i].FORMAT == 'DateFormat') {
              temp[i].cellRenderer = this._convFunction.DateFormat.bind(this)
              delete temp[i].valueFormatter
            } else if (VPRes.data[i].FORMAT == 'TimeFormat') {
              temp[i].cellRenderer = this._convFunction.TimeFormat.bind(this)
              delete temp[i].valueFormatter
            } else {
              temp[i].valueFormatter = this._convFunction.StringFormat
            }
            // this._gridFunction.FooterKey = this.FooterKey
          }

          // this.columnDefs = temp
          // console.log('temp: ', temp);
          ColDefs.push(temp)
          // console.log('footer: ', this.FooterKey);
          ColDefs.push(this.FooterKey)
          temp = []
          console.log('FINAL VIEWPARA WITH FOOTERKEYS: ', ColDefs);
          return ColDefs;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(VPRes.data),
          })
        }
      } catch (error) {
        this.toastr.error(error)
      }
    })

  }
}
