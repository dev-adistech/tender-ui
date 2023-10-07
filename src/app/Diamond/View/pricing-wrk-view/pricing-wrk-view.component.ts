import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListboxComponent } from '../../Common/listbox/listbox.component';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ViewService } from 'src/app/Service/View/view.service';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { GridFunctions } from '../../_helpers/functions/GridFunctions';
import { ConverterFunctions } from '../../_helpers/functions/ConverterFunctions';
declare let $: any;


export interface Code {
  code: string;
  name: string;
}
@Component({
  selector: 'app-pricing-wrk-view',
  templateUrl: './pricing-wrk-view.component.html',
  styleUrls: ['./pricing-wrk-view.component.css']
})
export class PricingWrkViewComponent implements OnInit {
  @ViewChild('agGrid', { static: true }) agGrid: ElementRef;
  decodeHelper = new JwtHelperService()
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"))
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  public columnDefs1;
  public pinnedBottomRowData
  public gridApi1;
  public gridColumnApi1;
  public getRowStyle
  public defaultColDef1;
  public gridOptions1;

  GridDataForMapping: any[] = []

  F_DATE:any =''
  T_DATE:any =''

  S_CODE:any=''
  Shapes: Code[] = [];
  
  C_CODE:any =''
  Colors:Code[]=[];

  Q_CODE:any=''
  Quality:Code[]=[]

  F_CARAT:any=''
  T_CARAT:any=''

  agGridWidth: number = 0;
  agGridStyles: string = "";

  agGridWidth1: number = 0;
  agGridStyles1: string = "";

  touchStartTime: number;

  FooterKey = []
  ISFILTER: boolean = false
  GRIDON:boolean = false

  constructor(
    public dialog: MatDialog,
    private EncrDecrServ: EncrDecrService,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private ViewServ :ViewService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private ViewParaMastServ : ViewParaMastService
  ) { 
    this.touchStartTime=0
   
    this.getRowStyle = function (params) {
      if (params.data) {
        if (params.node.rowPinned === 'bottom') {
          return { 'background': '#FFE0C0', 'font-weight': 'bold' };
        }
      }
    };

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: false,
    };
    this.defaultColDef1 = {
      resizable: true,
      sortable: true,
      filter: true,
      enableRowGroup: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    }
    this.gridOptions1 = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }
    this.FillViewPara()
    this.FillViewPara1()
  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }
  DockClick(){
    if(this.GRIDON === false){
      this.GRIDON = true
    }else {
      this.GRIDON = false
    }
  }

  ngOnInit(): void {
    this.Shapes = this.decodedMast[15].map(item => {
      return {code: item.S_CODE, name: item.S_NAME.toString(),}
    });
    this.Colors = this.decodedMast[12].map(item => {
      return {code: item.C_CODE, name: item.C_NAME.toString(),}
    });
    this.Quality = this.decodedMast[5].map(item => {
      return {code: item.Q_CODE, name: item.Q_NAME.toString(),}
    });
  }

  onCellDoubleClick(eve){
    let NewObj ={
      T_DATE:eve.data.T_DATE,
      F_DATE:eve.data.T_DATE,
      S_CODE:this.S_CODE ? this.S_CODE:'',
      C_CODE:this.C_CODE ? this.C_CODE:'',
      Q_CODE:this.Q_CODE ? this.Q_CODE:'',
      F_CARAT:this.F_CARAT ? this.F_CARAT:0,
      T_CARAT:this.T_CARAT ? this.T_CARAT:0,
    }
    this.GRIDON = false
    this.ViewServ.PricingWrkDisp(NewObj).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.gridApi1.setRowData(FillRes.data);
            this.GridDataForMapping = FillRes.data
            this._gridFunction.FooterKey = this.FooterKey
          this.pinnedBottomRowData = this._gridFunction.footerCal(FillRes.data)
            const agBodyViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(".ag-body-viewport");
            const agBodyHorizontalViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(
                ".ag-body-horizontal-scroll-viewport"
              );
            if (agBodyViewport) {
              const psV = new PerfectScrollbar(agBodyViewport);
              psV.update();
            }
            if (agBodyHorizontalViewport) {
              const psH = new PerfectScrollbar(agBodyHorizontalViewport);
              psH.update();
            }
            if (agBodyViewport) {
              const ps = new PerfectScrollbar(agBodyViewport);
              const container = document.querySelector(".ag-body-viewport");
              ps.update();
            }
            const widthsArray =
              this.gridColumnApi1.columnController.displayedColumns.map(
                (item) => item.actualWidth
              );
            this.agGridWidth1 = widthsArray.reduce(function (
              previousValue,
              currentValue
            ) {
              return previousValue + currentValue;
            });
            this.agGridWidth1 = 200 + this.agGridWidth1;
            this.agGridStyles1 = `width: ${this.agGridWidth1}px; height: 70vh`;

            this.gridApi1.refreshCells({ force: true })
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(FillRes.data),
            });
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );
  }

  LoadGridData1(){
    let NewObj ={
      F_DATE:this.F_DATE ? this.datepipe.transform(this.F_DATE,'yyyy-MM-dd'):null,
      T_DATE:this.T_DATE ? this.datepipe.transform(this.T_DATE,'yyyy-MM-dd'):null,
      S_CODE:this.S_CODE ? this.S_CODE:'',
      C_CODE:this.C_CODE ? this.C_CODE:'',
      Q_CODE:this.Q_CODE ? this.Q_CODE:'',
      F_CARAT:this.F_CARAT ? this.F_CARAT:0,
      T_CARAT:this.T_CARAT ? this.T_CARAT:0,
    }
    this.ViewServ.PricingWrkDisp(NewObj).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.gridApi1.setRowData(FillRes.data);
            this._gridFunction.FooterKey = this.FooterKey
          this.pinnedBottomRowData = this._gridFunction.footerCal(FillRes.data)
            const agBodyViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(".ag-body-viewport");
            const agBodyHorizontalViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(
                ".ag-body-horizontal-scroll-viewport"
              );
            // if (agBodyViewport) {
            //   const psV = new PerfectScrollbar(agBodyViewport);
            //   psV.update();
            // }
            // if (agBodyHorizontalViewport) {
            //   const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            //   psH.update();
            // }
            // if (agBodyViewport) {
            //   const ps = new PerfectScrollbar(agBodyViewport);
            //   const container = document.querySelector(".ag-body-viewport");
            //   ps.update();
            // }
            // const widthsArray =
            //   this.gridColumnApi1.columnController.displayedColumns.map(
            //     (item) => item.actualWidth
            //   );
            // this.agGridWidth1 = widthsArray.reduce(function (
            //   previousValue,
            //   currentValue
            // ) {
            //   return previousValue + currentValue;
            // });
            // this.agGridWidth1 = 200 + this.agGridWidth1;
            // this.agGridStyles1 = `width: ${this.agGridWidth1}px; height: 70vh`;
            this.gridApi1.refreshCells({ force: true })
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(FillRes.data),
            });
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'PricingWrkDisp' }).subscribe((VPRes) => {
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
                  "color":GroupData[i].Data[j].FONTCOLOR
                },
                resizable: GroupData[i].Data[j].ISRESIZE,
                GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                hide: GroupData[i].Data[j].DISP == false ? true : false,
                pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                rowSpan: this.rowSpy.bind(this),
                suppressMenu: true,
                cellClass: function (params) {
                    if (params.node.rowPinned != 'bottom') {
                      if (params.colDef.field == 'TOTAL') {
                        return 'cell-span1 cell-center'
                      }
                      if (params.colDef.field == 'RCTS') {
                        return 'cell-span1 cell-center'
                      }
                    }
                  }
              })

              if(GroupData[i].Data[j].FIELDNAME === "MPER"){
                tempData[j].editable = this.decodedTkn.U_CAT === 'P' || this.decodedTkn.U_CAT === 'S'? true : false
              }
              // if (j == 4) {
              //   this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
              // }
              // if (GroupData[i].Data[j].FIELDNAME == "CARAT") {
              //   this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
              //   tempData[j].valueFormatter = this._convFunction.ThreeFloatFormat
              //   tempData[j].aggFunc = 'sum'
              // } else if (GroupData[i].Data[j].FIELDNAME == "PTAG"){
              //   tempData[j].valueFormatter = this._convFunction.StringFormat
              //   tempData[j].aggFunc = 'length'
              // }

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
                tempData[j].cellRenderer = this._convFunction.DateFormat.bind(this)
                delete tempData[j].valueFormatter
              } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                tempData[j].cellRenderer = this._convFunction.TimeFormat.bind(this)
                delete tempData[j].valueFormatter
              } else {
                tempData[j].valueFormatter = this._convFunction.StringFormat
              }
              this._gridFunction.FooterKey = this.FooterKey
            }

            jsonData["children"] = tempData
            tempData = []
            ViewParaRowData.push(jsonData)
          }

          this.columnDefs1 = ViewParaRowData
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(VPRes.data),
          })
        }
      } catch (error) {
        console.log(error)
        this.toastr.error(error)
      }
    })
  }
  FillViewPara1() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'PricingWrk' }).subscribe((VPRes) => {
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
                  "color":GroupData[i].Data[j].FONTCOLOR
                },
                resizable: GroupData[i].Data[j].ISRESIZE,
                GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                hide: GroupData[i].Data[j].DISP == false ? true : false,
                pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                // rowSpan: this.rowSpy.bind(this),
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
              // this._gridFunction.FooterKey = this.FooterKey
            }

            jsonData["children"] = tempData
            tempData = []
            ViewParaRowData.push(jsonData)
          }

          this.columnDefs = ViewParaRowData
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(VPRes.data),
          })
        }
      } catch (error) {
        console.log(error)
        this.toastr.error(error)
      }
    })
  }

  rowSpy(params) {
    let SubData = []
    this.gridApi1.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });

    if (SubData.length != 0 && params.colDef.field == "TOTAL") {
      if (params.node.rowIndex == 0) {
        let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
        if (params.data.TOTAL == SubData[params.node.rowIndex].TOTAL) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
        if (params.data.TOTAL != SubData[previousIndex].TOTAL) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    } else if (SubData.length != 0 && params.colDef.field == "RCTS") {
      if (params.node.rowIndex == 0) {
        let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
        if (params.data.RCTS == SubData[params.node.rowIndex].RCTS) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
        if (params.data.RCTS != SubData[previousIndex].RCTS) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "hh:mm a", "UTC+0")
    } else {
      return ""
    }
  }

  OnCellEditingStart(params){
    if(params.colDef.field == 'MPER'){
    this.gridApi1.stopEditing({
      rowIndex: params.rowIndex,
      colKey: 'MPER'
    })
    if(params.newValue){
    let SaveObj ={
      MPER:params.data.MPER,
      COMP_CODE:params.data.COMP_CODE ? params.data.COMP_CODE:'',
      DETID:params.data.DETID ? params.data.DETID:0,
      SRNO:params.data.SRNO ? params.data.SRNO:0,
      PLANNO:params.data.PLANNO ? params.data.PLANNO:0,
      PTAG:params.data.PTAG ? params.data.PTAG:'',
    }

    this.ViewServ.PricingWrkMperSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save successfully.");
          this.gridApi1.startEditingCell({
            rowIndex: params.rowIndex +1,
            colKey: 'MPER'
          })
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data),
          });
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    });
  }

  }
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

  oncellClick(eve){
    if(eve.colDef.field === 'MPER'){
    this.gridApi1.startEditingCell({
      rowIndex: eve.rowIndex,
      colKey: eve.colDef.field,
    })
  }
  }
  touchCount:number=0
  touchTimer: any;

  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Shapes, CODE: this.S_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.S_CODE = result
    });
  }
  OpenColor() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Colors, CODE: this.C_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.C_CODE = result
    });
  }
  OpenQua() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Quality, CODE: this.Q_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.Q_CODE = result
    });
  }

  LoadGridData(){
    this.spinner.show();
    this.ViewServ.PricingWrk({
      F_DATE:this.F_DATE ? this.datepipe.transform(this.F_DATE,'dd-MM-yyyy'):null,
      T_DATE:this.T_DATE ? this.datepipe.transform(this.T_DATE,'dd-MM-yyyy'):null,
      S_CODE:this.S_CODE? this.S_CODE:'',
      C_CODE : this.C_CODE ? this.C_CODE:'',
      Q_CODE: this.Q_CODE ? this.Q_CODE:'',
      F_CARAT:this.F_CARAT ? this.F_CARAT:0,
      T_CARAT:this.T_CARAT ? this.T_CARAT:0
    }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.gridApi.setRowData(FillRes.data);
            const agBodyViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(".ag-body-viewport");
            const agBodyHorizontalViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(
                ".ag-body-horizontal-scroll-viewport"
              );
            // if (agBodyViewport) {
            //   const psV = new PerfectScrollbar(agBodyViewport);
            //   psV.update();
            // }
            // if (agBodyHorizontalViewport) {
            //   const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            //   psH.update();
            // }
            // if (agBodyViewport) {
            //   const ps = new PerfectScrollbar(agBodyViewport);
            //   const container = document.querySelector(".ag-body-viewport");
            //   ps.update();
            // }
            // const widthsArray =
            //   this.gridColumnApi.columnController.displayedColumns.map(
            //     (item) => item.actualWidth
            //   );
            // this.agGridWidth = widthsArray.reduce(function (
            //   previousValue,
            //   currentValue
            // ) {
            //   return previousValue + currentValue;
            // });
            // this.agGridWidth = 200 + this.agGridWidth;
            // this.agGridStyles = `width: ${this.agGridWidth}px; height: 70vh`;
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(FillRes.data),
            });
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );
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
          var tempColumnDefs = params.context.thisComponent.gridApi1.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu
            })
          })
          params.context.thisComponent.columnDefs1 = tempColumnDefs
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

  oncellValueChanged(eve){
    let SubData = []
    this.gridApi1.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });
    let MERGEDATA =[]
    for(let i=0;i<SubData.length;i++){
      if(SubData[i].TOTAL == eve.data.TOTAL && SubData[i].RCTS === eve.data.RCTS){
        MERGEDATA.push(SubData[i])
      }
    }
    let NewAMT = 0
    for(let i=0;i<MERGEDATA.length;i++){
      if(MERGEDATA[i].PLN == eve.data.PLN){
        let carat = MERGEDATA[i].CARAT
        let Orap = MERGEDATA[i].ORAP
        let Mprevalue
        if(parseFloat(MERGEDATA[i].MPER)){
          Mprevalue = parseFloat(MERGEDATA[i].MPER)
        }else{
          Mprevalue = MERGEDATA[i].PER
        }
        let newArray
        let FinalValue = 0
        let NewSum = 0
        newArray = (Mprevalue / 100) * Orap
        FinalValue = Orap - newArray
        NewSum = FinalValue * carat
        MERGEDATA[i].RATE = FinalValue
        MERGEDATA[i].AMT = NewSum
        NewAMT += NewSum
      }else{
        NewAMT += MERGEDATA[i].AMT
      }
    }
    console.log(NewAMT)
    for(let i=0;i<MERGEDATA.length;i++){
      MERGEDATA[i].TOTAL = NewAMT
      let NewPer = 0
      NewPer = MERGEDATA[i].TOTAL / MERGEDATA[i].I_CARAT
      MERGEDATA[i].RCTS = NewPer.toFixed(0)
    }
    this.gridApi1.refreshCells({ force: true })
  }
}
