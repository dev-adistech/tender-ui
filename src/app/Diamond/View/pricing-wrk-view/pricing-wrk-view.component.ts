import { Component, ElementRef, OnInit } from '@angular/core';
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
    this.columnDefs = [
      {
        headerName: "Date",
        field: "T_DATE",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 126,
        cellRenderer: this.DateFormat.bind(this),
      },
      {
        headerName: "Pcs",
        field: "PCS",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 62,
      },
    ]

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
    this.FillViewPara()
  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
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
                },
                resizable: GroupData[i].Data[j].ISRESIZE,
                GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                hide: GroupData[i].Data[j].DISP == false ? true : false,
                pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                suppressMenu: true,
              })

              if(GroupData[i].Data[j].FIELDNAME === "MPER"){
                tempData[j].editable = this.decodedTkn.U_CAT === 'P' || this.decodedTkn.U_CAT === 'S'? true : false
              }
              if (j == 4) {
                this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
              }
              if (GroupData[i].Data[j].FIELDNAME == "CARAT") {
                this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
                tempData[j].valueFormatter = this._convFunction.ThreeFloatFormat
                tempData[j].aggFunc = 'sum'
              } else if (GroupData[i].Data[j].FIELDNAME == "PTAG"){
                tempData[j].valueFormatter = this._convFunction.StringFormat
                tempData[j].aggFunc = 'length'
              }

              // console.log(this._gridFunction.FooterKey)
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

  TimeFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "hh:mm a", "UTC+0")
    } else {
      return ""
    }
  }

  OnCellEditingStart(params){
    console.log(params)

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

  onTouchStart(event) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.touchStartTime;
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (timeDiff < 300) {
      alert(selectedNodes)
      if (selectedNodes.length > 0) {
        const rowData = selectedNodes[0].data;
        this.onCellDoubleClick(rowData);
      }
    } else {
      this.touchStartTime = currentTime;
    }
  }

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

}
