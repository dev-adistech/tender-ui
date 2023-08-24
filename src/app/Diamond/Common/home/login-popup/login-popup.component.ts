import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FrmOpePer } from 'src/app/Diamond/_helpers/frm-ope-per';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { GridFunctions } from 'src/app/Diamond/_helpers/functions/GridFunctions';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowData;
  public getRowStyle;
  public rowSelection;
  public gridOptions;

  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []

  data: any[] = []
  CLOSE: boolean = true;

  constructor(
    private ViewParaMastServ: ViewParaMastService,
    private _convFunction: ConverterFunctions,
    private _FrmOpePer: FrmOpePer,
    private datePipe: DatePipe,
    private _gridFunction: GridFunctions,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dataMain: any,
    private _mdr: MatDialogRef<LoginPopupComponent>
  ) {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    }

    this.data = dataMain.Res

    this.getRowStyle = function (params) {
      if (params.node.rowPinned === 'bottom') {
        return { 'background': '#FFE0C0', 'font-weight': 'bold' };
      }
    }

    this.rowSelection = 'multiple'

    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
      onCellKeyDown: (event) => {
        if (event.event.key === 'Tab') {
          event.preventDefault()
        }
        if (event.event.key === 'Enter') {
          this.gridApi.tabToNextCell();
        }
      }
    }
    this.FillViewPara()
  }


  ngOnInit(): void {
  }

  CloseHRDIGI() {
    this._mdr.close();
  }

  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY]

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY)

      if (el) {
        el.Data.push(x)
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        })
      }

      return rv
    }, [])
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  async LoadGridData() {
    setTimeout(() => {

      if (this.data) {
        try {
          this.gridApi.setRowData(this.data);
          this._gridFunction.FooterKey = this.FooterKey
          this.pinnedBottomRowData = this._gridFunction.footerCal(this.data)

        } catch (err) {
          console.log(err)
          this.toastr.error(err)
        }
      }
    }, 1500)
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "LockDataPopUp" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY")
            let ViewParaRowData = []
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {}
              jsonData["headerName"] = GroupData[i].GROUPKEY
              jsonData["headerClass"] = "header-align-center"
              let tempData = []

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  suppressMenu: true
                })
                if (i == 0 && j == 0) {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
                  tempData[j].valueFormatter = this._convFunction.NumberFormat
                  tempData[j].aggFunc = 'sum'
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
                  tempData[j].valueFormatter = this._convFunction.TwoFloatFormat
                  tempData[j].aggFunc = 'sum'
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
                  tempData[j].valueFormatter = this._convFunction.ThreeFloatFormat
                  tempData[j].aggFunc = 'sum'
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer = this.DateFormat.bind(this)
                  delete tempData[j].valueFormatter
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer = this.TimeFormat.bind(this)
                  delete tempData[j].valueFormatter
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat
                }
                let temp = this.FooterKey
                this._gridFunction.FooterKey = temp
              }
              jsonData["children"] = tempData
              tempData = []
              ViewParaRowData.push(jsonData)
            }

            this.columnDefs = ViewParaRowData
            this.gridOptions.columnDefs = ViewParaRowData
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            })
          }
        } catch (error) {
          this.toastr.error(error)
        }
      }
    )
  }

  DateFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "dd-MM-yyyy")
    } else {
      return ""
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "hh:mm a", "UTC+0")
    } else {
      return ""
    }
  }

}
