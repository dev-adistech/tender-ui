import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { FrmOpePer } from 'src/app/Diamond/_helpers/frm-ope-per';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { GridFunctions } from 'src/app/Diamond/_helpers/functions/GridFunctions';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rap-mast-det',
  templateUrl: './rap-mast-det.component.html',
  styleUrls: ['./rap-mast-det.component.css']
})
export class RapMastDetComponent implements OnInit {


  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowData;
  public getRowStyle;
  public rowSelection;
  public gridOptions;

  PER = []
  PASS: any = ""
  GridHeader = []
  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []
  showdispcol: boolean = false

  L_CODE: any = ''
  SRNO: any = ''
  TAG: any = ''
  EMP_CODE: any = ''
  PRDTYPE: any = ''
  PNT: any = ''
  GRP: any = ''
  CUT_CODE: any = []
  S_CODE: any = []
  ALLOWINS: boolean = false

  C_CODE: any
  Q_CODE: any
  POL_CODE: any
  FL_CODE: any
  SYM_CODE: any
  IN_CODE: any
  SH_CODE: any
  MILKY_CODE: any
  REDSPOT: any

  PASSWORD: any = ''

  ISFILTER: boolean = true

  data: any[] = []

  constructor(
    private ViewParaMastServ: ViewParaMastService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _gridFunction: GridFunctions,
    private elementRef: ElementRef,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private _FrmOpePer: FrmOpePer,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
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

    // this.PRDTYPE = dataMain.PRDTYPE.PRDTYPE

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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  onFilterChanged(params) {
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    this._gridFunction.FooterKey = this.FooterKey
    this.pinnedBottomRowData = this._gridFunction.footerCal(_GridRowData)
    const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
    if (agBodyViewport) {
      const ps = new PerfectScrollbar(agBodyViewport);
      const container = document.querySelector('.ag-body-viewport');
      container.scrollTop = 0;
      ps.update();
    }
  }

  async ngOnInit() {
    this.PER = await this._FrmOpePer.UserFrmOpePer('RapMastDetComponent')
    this.ALLOWINS = this.PER[0].INS
    this.PASS = this.PER[0].PASS
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

  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    return filterModel;
  }

  async LoadGridData() {
    this.data = this.dataMain
    if (this.dataMain) {
      try {

        this.gridApi.setRowData(this.dataMain);

        // const agBodyViewport: HTMLElement =
        //   this.elementRef.nativeElement.querySelector(".ag-body-viewport")
        // const agBodyHorizontalViewport: HTMLElement =
        //   this.elementRef.nativeElement.querySelector(
        //     ".ag-body-horizontal-scroll-viewport"
        //   )

        // if (agBodyViewport) {
        //   const psV = new PerfectScrollbar(agBodyViewport)
        //   psV.update()
        // }
        // if (agBodyHorizontalViewport) {
        //   const psH = new PerfectScrollbar(agBodyHorizontalViewport)
        //   psH.update()
        // }

        this._gridFunction.FooterKey = this.FooterKey
        this.pinnedBottomRowData = this._gridFunction.footerCal(this.dataMain)

      } catch (err) {
        console.log(err)
        this.toastr.error(err)
      }
    }
  }

  cellColor(params) {
    if (params.data) {

      if (params.value == 'Col' || params.value == 'FL' || params.value == 'VVS1' || params.value == 'VVS2' || params.value == 'VS1' || params.value === 'SI1' || params.value == 'SI2' || params.value == 'SI3' || params.value == 'I1' || params.value == 'I2' || params.value == 'I3' || params.value == 'I4' || params.value == 'I5' || params.value == 'I6' || params.value == 'I7' || params.value == 'I8' || params.value == 'IF' || params.value == 'VS2'
        || params.value == 'D' || params.value == 'E' || params.value == 'F' || params.value == 'G' || params.value == 'H' || params.value == 'I' || params.value == 'J' || params.value == 'K' || params.value == 'L' || params.value == 'M' || params.value == 'N' || params.value == 'O-P' || params.value == 'Q-W' || params.value == 'YZ-1' || params.value == 'YZ-2' || params.value == 'YZ-3' || params.value == 'FLY' || params.value == 'FY' || params.value == 'FIY' || params.value == 'FVY' || params.value == 'FBY' || params.value == 'VLP' || params.value == 'LP' || params.value == 'FLP' || params.value == 'FGO' || params.value == 'FP') {
        return { background: '#FFE4E1' }
      }
      if (!params.data.C_NAME && !params.data.C_NAME1 && !params.data.C_NAME2 && !params.data.DD && !params.data.FL && !params.data.FL1 && !params.data.FL2 && !params.data.I1 && !params.data.I2 && !params.data.I3 && !params.data.I4 && !params.data.I5 && !params.data.I6 && !params.data.I7 && !params.data.I8 && !params.data.I11 && !params.data.I12 && !params.data.I21 && !params.data.I22 && !params.data.I31 && !params.data.I32 && !params.data.I41 && !params.data.I42 && !params.data.I51 && !params.data.I52 && !params.data.I61 && !params.data.I62 && !params.data.I71 && !params.data.I72 && !params.data.I81 && !params.data.I82 && !params.data.IF && !params.data.IF1 && !params.data.IF2 && params.data.ORD == 0 && params.data.SI1 && params.data.SI2 && params.data.SI3 && params.data.SI11 && params.data.SI12 && params.data.SI21 && params.data.SI22 && params.data.SI31 && params.data.SI32 && !params.data.SP && !params.data.VS1 && !params.data.VS2 && !params.data.VS11 && !params.data.VS12 && !params.data.VS21 && !params.data.VS22 && !params.data.VVS2 && !params.data.VVS1 && !params.data.VVS11 && !params.data.VVS12 && !params.data.VVS21 && !params.data.VVS22) {
        return { background: '#FFFFE0' }
      }
      if (params.value) {
        let value = params.value;
        if (typeof value === 'string' && value.includes('-')) {
          return { background: '#FFC5C5' };
        }
      }
    }
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'RapDisCompView' }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          // console.log(VPRes)
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
                // cellStyle: {
                //   "text-align": GroupData[i].Data[j].CELLALIGN,
                //   "background-color": GroupData[i].Data[j].BACKCOLOR,
                // },

                resizable: GroupData[i].Data[j].ISRESIZE,
                GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                // hide: GroupData[i].Data[j].DISP == false ? true : false,
                pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                suppressMenu: true,

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
              // console.log(this.FooterKey)
              this._gridFunction.FooterKey = this.FooterKey
              tempData[j].cellStyle = this.cellColor.bind(this)
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
    })
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
