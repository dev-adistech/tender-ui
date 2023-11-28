import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { GridFunctions } from 'src/app/Diamond/_helpers/functions/GridFunctions';
import { CommonService } from 'src/app/Service/Common/common.service';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { RapCalcService } from 'src/app/Service/Rap/rap-calc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rap-cal-modal',
  templateUrl: './rap-cal-modal.component.html',
  styleUrls: ['./rap-cal-modal.component.css']
})
export class RapCalModalComponent implements OnInit {

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowData;
  public getRowStyle;
  public rowSelection;
  public gridOptions;

  GridHeader = []
  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []

  ISFILTER: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataMain: any,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  private datepipe: DatePipe,
  private _convFunction: ConverterFunctions,
  private ViewParaMastServ: ViewParaMastService,
  private _gridFunction: GridFunctions,
  private elementRef: ElementRef,
    private CommonServ: CommonService,
    private RapCalcServ: RapCalcService,
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

    this.gridOptions = {
      // columnDefs: this.columnDefs,
      // rowData: this.rowData,
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }

    this.gridOptions = {
      // columnDefs: this.columnDefs,
      // rowData: this.rowData,
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }
    this.FillViewPara();
  }

  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "FrmDashMrkAccMakClick" }).subscribe(
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
                this._gridFunction.FooterKey = this.FooterKey
                // console.log(this.FooterKey);
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


  LoadGridData() {
    // this.spinner.sho
    let payload = {
      L_CODE: this.dataMain.L_CODE,
      SRNO: this.dataMain.SRNO,
      TAG: this.dataMain.TAG
    }

    this.RapCalcServ.RapCalcDoubleClick(payload).subscribe((FRes) => {
      try {
        if(FRes.success == true){
          this.gridApi.setRowData(FRes.data)
        }
      } catch(err){
        console.log(err)
        this.toastr.warning(err)
      }
    })
  }

  async onFilterChanged(event) {
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      _GridRowData.push(rowNode.data)
    })
    // let TEMP = this._gridFunction.footerCal(_GridRowData)
    // TEMP[0].I_DATE = ''
    // TEMP[0].R_DATE = ''
    // this.pinnedBottomRowData = TEMP
    this.pinnedBottomRowData = this._gridFunction.footerCal(_GridRowData)
    this._gridFunction.FooterKey = this.FooterKey
    const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
    if (agBodyViewport) {
      const ps = new PerfectScrollbar(agBodyViewport);
      const container = document.querySelector('.ag-body-viewport');
      container.scrollTop = 0;
      ps.update();
    }

  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy")
    } else {
      return ""
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "hh:mm a", "UTC+0")
    } else {
      return ""
    }
  }

  getContextMenuItems(params) {
    let inputText = '';
    if (params.context.thisComponent.ISFILTER == true) {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck" checked>`;
    } else {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck">`;
    }
    var result = [
      {
        // custom item
        name: inputText,
        action: () => {
          params.context.thisComponent.ISFILTER = !params.context.thisComponent.ISFILTER
          var tempColumnDefs = params.context.thisComponent.gridApi.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu
            })
          })
          params.context.thisComponent.columnDefs = tempColumnDefs
        }
        // cssClasses: ['redFont', 'bold'],
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export"
    ];
    return result;
  }

}
