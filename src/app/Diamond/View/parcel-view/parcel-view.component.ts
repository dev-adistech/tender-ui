import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ViewService } from "src/app/Service/View/view.service";
import { GridFunctions } from "../../_helpers/functions/GridFunctions";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { ListboxComponent } from "../../Common/listbox/listbox.component";
import { ParcelEntService } from "src/app/Service/Transaction/parcel-ent.service";
declare let $: any;

export interface Code {
  code: string;
  name: string;
}

@Component({
  selector: "app-parcel-view",
  templateUrl: "./parcel-view.component.html",
  styleUrls: ["./parcel-view.component.css"],
})
export class ParcelViewComponent implements OnInit {
  @ViewChild("agGrid", { static: true }) agGrid: ElementRef;
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowDatadock;
  public getRowStyleDock;

  public columnDefs1;
  public pinnedBottomRowData;
  public gridApi1;
  public gridColumnApi1;
  public getRowStyle;
  public defaultColDef1;
  public gridOptions1;

  GridDataForMapping: any[] = [];

  F_DATE: any = "";
  T_DATE: any = "";

  S_CODE: any = "";
  Shapes: Code[] = [];

  DockData: any = [];

  C_CODE: any = "";
  Colors: Code[] = [];

  Q_CODE: any = "";
  Quality: Code[] = [];

  F_CARAT: any = "";
  T_CARAT: any = "";

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  agGridWidth: number = 0;
  agGridStyles: string = "";

  agGridWidth1: number = 0;
  agGridStyles1: string = "";

  touchStartTime: number;

  FooterKey = [];
  FooterKey1 = [];
  ISFILTER: boolean = false;
  GRIDON: boolean = false;

  GRIDDATA: any = [];

  ISCHANGED: boolean = false;

  I_CARAT: any = "";
  RTOP: any = "";
  SIZE: any = "";
  AMT: any = "";
  CARAT: any = "";
  RATE: any = "";
  TDIS: any = "";
  RCTS: any = "";
  TRESRVE: any = "";

  HIDEPOL: boolean = false;
  disabledata: boolean = false;
  ADISDISABLE: boolean = true;
  SAVEBTNSHOW: boolean = true;

  constructor(
    public dialog: MatDialog,
    private ParcelEntServ: ParcelEntService,
    private EncrDecrServ: EncrDecrService,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private ViewServ: ViewService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private ViewParaMastServ: ViewParaMastService
  ) {
    this.touchStartTime = 0;

    this.getRowStyle = function (params) {
      if (params.data) {
        if (params.node.rowPinned === "bottom") {
          return { background: "#FFE0C0", "font-weight": "bold" };
        }
      }
    };

    this.getRowStyleDock = function (params) {
      if (params.data) {
        if (params.node.rowPinned === "bottom") {
          return { background: "#FFE0C0", "font-weight": "bold" };
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
    };
    this.gridOptions1 = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
    };
    this.FillViewPara();
    this.FillViewPara1();
  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }
  DockClick() {
    if (this.GRIDON === false) {
      this.GRIDON = true;
    } else {
      this.GRIDON = false;
    }
  }

  ngOnInit(): void {
    if (this.decodedTkn.U_CAT == "S") {
      this.ADISDISABLE = false;
      this.SAVEBTNSHOW = true;
      this.HIDEPOL = true;
    } else {
      this.ADISDISABLE = true;
      this.HIDEPOL = false;
      this.SAVEBTNSHOW = false;
    }

    this.Shapes = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME.toString() };
    });
    this.Colors = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME.toString() };
    });
    this.Quality = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME.toString() };
    });
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
    this.LoadGridData();
  }
  SaveMain(){
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    this.spinner.show();
    this.ParcelEntServ.TendarMastDisSave({
      COMP_CODE: _GridRowData[0].COMP_CODE,
      DETID: _GridRowData[0].DETID,
      ADIS: this.TDIS ? this.TDIS : 0,
      TRESRVE: this.TRESRVE ? this.TRESRVE : 0,
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save Successfully");
        } else {
          this.spinner.hide();
          this.toastr.error("Data Not Save");
        }
      } catch {
        this.spinner.hide();
        this.toastr.error("Data Not Save");
      }
    });
  }
  TdisChange() {
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let NewAmt = 0;
    
    for(let i=0;i<_GridRowData.length;i++){
      NewAmt += _GridRowData[i].AMT
    }

    let NewValue = (this.TDIS / 100) * NewAmt;
    let FinalValue = NewAmt + NewValue;
    this.AMT = FinalValue.toFixed(0);
    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT)*100).toFixed(2);
  }

  refresh() {
    this.gridApi1.setSortModel([]);
    this.gridOptions1.api.setFilterModel(null);
  }

  GETNAME() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.COMP_NAME = this.DEPTArr.filter(
          (x) => x.code == this.COMP_CODE
        )[0].name;
      } else {
        this.COMP_NAME = "";
      }
    } else {
      this.COMP_NAME = "";
    }
  }

  onCellDoubleClick(eve) {
    this.DockData = eve.data;
    let NewObj = {
      T_DATE: eve.data.T_DATE,
      F_DATE: eve.data.T_DATE,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      COMP_CODE: eve.data.COMP_CODE ? eve.data.COMP_CODE : "",
      DETID: eve.data.DETID ? eve.data.DETID : 0,
    };
    this.GRIDON = false;
    this.ViewServ.ParcelWrkDisp(NewObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.gridApi1.setRowData(FillRes.data[0]);
          this.GridDataForMapping = FillRes.data;
          this._gridFunction.FooterKey = this.FooterKey;
          this.pinnedBottomRowData = this._gridFunction.footerCal(
            FillRes.data[1]
          );

          if (FillRes.data[1][0]["AMT"]) {
            this.AMT = FillRes.data[1][0]["AMT"].toFixed(0);
          } else {
            this.AMT = FillRes.data[1][0]["AMT"];
          }
          this.CARAT = FillRes.data[1][0]["CARAT"];
          this.I_CARAT = FillRes.data[1][0]["I_CARAT"];
          if(FillRes.data[1][0]["RPPER"]){
            this.RTOP = FillRes.data[1][0]["RPPER"].toFixed(2);
          }
          if(FillRes.data[1][0]["SIZE"]){
          this.SIZE = FillRes.data[1][0]["SIZE"].toFixed(2);
          }
          this.RATE = FillRes.data[1][0]["RATE"];
          if (FillRes.data[1][0]["RCTS"]) {
            this.RCTS = FillRes.data[1][0]["RCTS"].toFixed(0);
          } else {
            this.RCTS = FillRes.data[1][0]["RCTS"];
          }
          this.TDIS = FillRes.data[1][0]["TDIS"];
          this.TRESRVE = FillRes.data[1][0]["TRESRVE"];

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

          this.gridApi1.refreshCells({ force: true });
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
    });
  }

  LoadGridData1() {
    let NewObj = {
      F_DATE: this.F_DATE
        ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd")
        : null,
      T_DATE: this.T_DATE
        ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd")
        : null,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      DETID: 0,
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
    };
    this.ViewServ.ParcelWrkDisp(NewObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.gridApi1.setRowData(FillRes.data[0]);
          this._gridFunction.FooterKey = this.FooterKey;
          this.pinnedBottomRowData = this._gridFunction.footerCal(
            FillRes.data[1]
          );
          if (FillRes.data[1][0]["AMT"]) {
            this.AMT = FillRes.data[1][0]["AMT"].toFixed(0);
          } else {
            this.AMT = FillRes.data[1][0]["AMT"];
          }
          this.CARAT = FillRes.data[1][0]["CARAT"];
          this.I_CARAT = FillRes.data[1][0]["I_CARAT"];
          if(FillRes.data[1][0]["RPPER"]){
            this.RTOP = FillRes.data[1][0]["RPPER"].toFixed(2);
          }
          if(FillRes.data[1][0]["SIZE"]){
          this.SIZE = FillRes.data[1][0]["SIZE"].toFixed(2);
          }
          this.RATE = FillRes.data[1][0]["RATE"];
          if (FillRes.data[1][0]["RCTS"]) {
            this.RCTS = FillRes.data[1][0]["RCTS"].toFixed(0);
          } else {
            this.RCTS = FillRes.data[1][0]["RCTS"];
          }
          this.TDIS = FillRes.data[1][0]["TDIS"];
          this.TRESRVE = FillRes.data[1][0]["TRESRVE"];
          
          const agBodyViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          const agBodyHorizontalViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(
              ".ag-body-horizontal-scroll-viewport"
            );
          this.gridApi1.refreshCells({ force: true });
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
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "ParcelWrkDisp" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY");
            let ViewParaRowData = [];
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {};
              jsonData["headerName"] = GroupData[i].GROUPKEY;
              jsonData["headerClass"] = "header-align-center";
              let tempData = [];

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    color: GroupData[i].Data[j].FONTCOLOR,
                    "font-weight":
                      GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  rowSpan: this.rowSpy.bind(this),
                  suppressMenu: true,
                  cellClass: function (params) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.colDef.field == "TOTAL") {
                        return "cell-span1 cell-center";
                      }
                      if (params.colDef.field == "RCTS") {
                        return "cell-span1 cell-center";
                      }
                      if (params.colDef.field == "I_CARAT") {
                        return "cell-span1 cell-center";
                      }
                    }
                  },
                });

                if (GroupData[i].Data[j].FIELDNAME === "MPER") {
                  tempData[j].editable =
                    this.decodedTkn.U_CAT === "P" ||
                    this.decodedTkn.U_CAT === "S"
                      ? true
                      : false;
                }

                if (i == 0 && j == 0) {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FIELDNAME === "SRNO") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FIELDNAME === "RPPER") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter = this._convFunction.NumberFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.TwoFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.ThreeFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer =
                    this._convFunction.DateFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer =
                    this._convFunction.TimeFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat;
                }
                this._gridFunction.FooterKey = this.FooterKey;
                if (GroupData[i].Data[j].FIELDNAME !== "MPER") {
                  tempData[j].cellStyle = this.ColColor.bind(this);
                }
              }

              jsonData["children"] = tempData;
              tempData = [];
              ViewParaRowData.push(jsonData);
            }

            this.columnDefs1 = ViewParaRowData;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      }
    );
  }

  ColColor(params) {
    if (params.node.rowPinned === "bottom") {
      return;
    }
    if (params.colDef.field === "LAB_NAME") {
      if (params.data.LAB_NAME === "IGI") {
        return { background: "#78f587" };
      } else if (params.data.LAB_NAME === "HRD") {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "S_NAME") {
      if (params.data.S_NAME !== "ROUND" && params.data.S_NAME) {
        return { background: "#ffff9e" };
      }
    } else if (params.colDef.field === "CT_NAME") {
      if (params.data.CT_NAME == "VG") {
        return { background: "#8db6fc" };
      } else if (params.data.CT_NAME == "GD") {
        return { background: "#fc6a6a" };
      } else if (params.data.CT_NAME == "FR") {
        return { background: "#f09c9c" };
      }
    } else if (params.colDef.field === "Q_NAME") {
      if (params.data.Q_NAME == "FL") {
        return { background: "#f09c9c" };
      } else if (params.data.Q_NAME == "IF") {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "FL_NAME") {
      if (params.data.FL_NAME == "FAINT") {
        return { background: "#78f587" };
      } else if (params.data.FL_NAME == "MEDIUM") {
        return { background: "#ffff9e" };
      } else if (params.data.FL_NAME == "STRONG") {
        return { background: "#8db6fc" };
      } else if (params.data.FL_NAME == "VERY STRONG") {
        return { background: "#aac0e6" };
      }
    } else if (params.colDef.field === "ML_NAME") {
      if (params.data.ML_NAME == "H-MILKY") {
        return { background: "#a3a2a2" };
      } else if (params.data.ML_NAME == "L-MILKY") {
        return { background: "#e3e3e3" };
      }
    } else if (params.colDef.field === "SH_NAME") {
      if (params.data.SH_NAME == "VL-BRN") {
        return { background: "#C4A484" };
      } else if (params.data.SH_NAME == "L-BRN") {
        return { background: "#d9c6b4" };
      } else if (params.data.SH_NAME == "MIX-T") {
        return { background: "#acfaa5" };
      }
    }
  }
  FillViewPara1() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "ParcelWrk" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY");
            let ViewParaRowData = [];
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {};
              jsonData["headerName"] = GroupData[i].GROUPKEY;
              jsonData["headerClass"] = "header-align-center";
              let tempData = [];

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    color: GroupData[i].Data[j].FONTCOLOR,
                    "font-weight":
                      GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  // rowSpan: this.rowSpy.bind(this),
                  suppressMenu: true,
                });

                if (i == 0 && j == 0) {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter = this._convFunction.NumberFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.TwoFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.ThreeFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer = this.DateFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer = this.TimeFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat;
                }
                this._gridFunction.FooterKey = this.FooterKey1;
              }

              jsonData["children"] = tempData;
              tempData = [];
              ViewParaRowData.push(jsonData);
            }

            this.columnDefs = ViewParaRowData;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      }
    );
  }

  OnCellEditingStart(params) {
    if (params.event.keyCode === 13) {
      if (params.colDef.field == "MPER") {
        if (
          parseFloat(params.data.MPER) >= params.data.PER + 10 ||
          parseFloat(params.data.MPER) <= params.data.PER - 10
        ) {
          this.gridApi1.stopEditing({
            rowIndex: params.rowIndex,
            colKey: "MPER",
          });
          this.gridApi1.setFocusedCell(params.rowIndex + 1, "MPER");
          this.gridApi1.startEditingCell({
            rowIndex: params.rowIndex + 1,
            colKey: "MPER",
          });
          Swal.fire({
            title: "Are you Sure You Want To Update",
            icon: "warning",
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.value) {
              if (params.value) {
                this.gridApi1.refreshCells({ force: true });
                this.ISCHANGED = true;
                let SaveObj = {
                  MPER: params.data.MPER,
                  COMP_CODE: params.data.COMP_CODE ? params.data.COMP_CODE : "",
                  DETID: params.data.DETID ? params.data.DETID : 0,
                  SRNO: params.data.SRNO ? params.data.SRNO : 0,
                  PLANNO: params.data.PLANNO ? params.data.PLANNO : 0,
                  PTAG: params.data.PTAG ? params.data.PTAG : "",
                  MUSER: this.decodedTkn.UserId,
                };
                this.ViewServ.PricingWrkMperSave(SaveObj).subscribe(
                  (SaveRes) => {
                    try {
                      if (SaveRes.success == true) {
                        this.spinner.hide();
                        this.toastr.success("Save successfully.");
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
                  }
                );
              }
            } else {
              this.ISCHANGED = false;
              params.data.MPER = 0;
              this.gridApi1.refreshCells({ force: true });
              this.gridApi1.stopEditing({
                rowIndex: params.rowIndex + 1,
                colKey: "MPER",
              });
              this.gridApi1.setFocusedCell(params.rowIndex, "MPER");
              this.gridApi1.startEditingCell({
                rowIndex: params.rowIndex,
                colKey: "MPER",
              });
            }
          });
        } else {
          if (params.value) {
            this.ISCHANGED = true;
            let SaveObj = {
              MPER: params.data.MPER,
              COMP_CODE: params.data.COMP_CODE ? params.data.COMP_CODE : "",
              DETID: params.data.DETID ? params.data.DETID : 0,
              SRNO: params.data.SRNO ? params.data.SRNO : 0,
              PLANNO: params.data.PLANNO ? params.data.PLANNO : 0,
              PTAG: params.data.PTAG ? params.data.PTAG : "",
              MUSER: this.decodedTkn.UserId,
            };

            this.ViewServ.PricingWrkMperSave(SaveObj).subscribe((SaveRes) => {
              try {
                if (SaveRes.success == true) {
                  this.spinner.hide();
                  this.toastr.success("Save successfully.");
                  this.gridApi1.stopEditing({
                    rowIndex: params.rowIndex,
                    colKey: "MPER",
                  });
                  this.gridApi1.refreshCells({ force: true });
                  this.gridApi1.setFocusedCell(params.rowIndex + 1, "MPER");
                  this.gridApi1.startEditingCell({
                    rowIndex: params.rowIndex + 1,
                    colKey: "MPER",
                  });
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
    }
  }

  rowSpy(params) {
    let SubData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });

    if (SubData.length != 0 && params.colDef.field == "TOTAL") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.TOTAL == SubData[params.node.rowIndex].TOTAL) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.TOTAL != SubData[previousIndex].TOTAL) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1;
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
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.RCTS == SubData[params.node.rowIndex].RCTS) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.RCTS != SubData[previousIndex].RCTS) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    } else if (SubData.length != 0 && params.colDef.field == "I_CARAT") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT == SubData[params.node.rowIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.I_CARAT == SubData[i].I_CARAT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT != SubData[previousIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.I_CARAT == SubData[i].I_CARAT) {
              mergeIndex += 1;
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
  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        });
      }

      return rv;
    }, []);
  }

  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Shapes, CODE: this.S_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.S_CODE = result;
    });
  }
  OpenColor() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Colors, CODE: this.C_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.C_CODE = result;
    });
  }
  OpenQua() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Quality, CODE: this.Q_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.Q_CODE = result;
    });
  }

  Clear() {
    this.F_DATE = null;
    this.T_DATE = null;
    this.S_CODE = "";
    this.C_CODE = "";
    this.Q_CODE = "";
    this.F_CARAT = 0;
    this.T_CARAT = 0;
    this.gridApi1.setRowData([]);
  }

  LoadGridData() {
    this.spinner.show();
    this.ViewServ.ParcelgWrk({
      F_DATE: this.F_DATE
        ? this.datepipe.transform(this.F_DATE, "dd-MM-yyyy")
        : null,
      T_DATE: this.T_DATE
        ? this.datepipe.transform(this.T_DATE, "dd-MM-yyyy")
        : null,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.GRIDDATA = FillRes.data;
          this._gridFunction.FooterKey = this.FooterKey1;
          this.pinnedBottomRowDatadock = this._gridFunction.footerCal(
            FillRes.data
          );
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
    });
  }
  getContextMenuItems(params) {
    let inputText = "";
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
          params.context.thisComponent.ISFILTER =
            !params.context.thisComponent.ISFILTER;
          var tempColumnDefs =
            params.context.thisComponent.gridApi1.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu;
            });
          });
          params.context.thisComponent.columnDefs1 = tempColumnDefs;
        },
        // cssClasses: ['redFont', 'bold'],
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export",
    ];
    return result;
  }
  TimeFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "hh:mm a", "UTC+0");
    } else {
      return "";
    }
  }

  oncellValueChanged(eve) {
    if (this.ISCHANGED === true) {
      let SubData = [];
      this.gridApi1.forEachNode(function (rowNode, index) {
        SubData.push(rowNode.data);
      });
      let MERGEDATA = [];
      for (let i = 0; i < SubData.length; i++) {
        if (
          SubData[i].TOTAL == eve.data.TOTAL &&
          SubData[i].RCTS === eve.data.RCTS
        ) {
          MERGEDATA.push(SubData[i]);
        }
      }
      let NewAMT = 0;
      for (let i = 0; i < MERGEDATA.length; i++) {
        if (MERGEDATA[i].PLN == eve.data.PLN) {
          let carat = MERGEDATA[i].CARAT;
          let Orap = MERGEDATA[i].ORAP;
          let Mprevalue;
          if (parseFloat(MERGEDATA[i].MPER)) {
            Mprevalue = parseFloat(MERGEDATA[i].MPER);
          } else {
            Mprevalue = MERGEDATA[i].PER;
          }
          let newArray;
          let FinalValue = 0;
          let NewSum = 0;
          newArray = (Mprevalue / 100) * Orap;
          FinalValue = Orap - newArray;
          NewSum = FinalValue * carat;
          MERGEDATA[i].RATE = FinalValue;
          MERGEDATA[i].AMT = NewSum;
          NewAMT += NewSum;
        } else {
          NewAMT += MERGEDATA[i].AMT;
        }
      }
      for (let i = 0; i < MERGEDATA.length; i++) {
        MERGEDATA[i].TOTAL = NewAMT;
        let NewPer = 0;
        NewPer = MERGEDATA[i].TOTAL / MERGEDATA[i].I_CARAT;
        MERGEDATA[i].RCTS = NewPer.toFixed(0);
      }
      this.gridApi1.refreshCells({ force: true });
    }
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let NewAmt = 0;
    
    for(let i=0;i<_GridRowData.length;i++){
      NewAmt += _GridRowData[i].AMT
    }

    let NewValue = (this.TDIS / 100) * NewAmt;
    let FinalValue = NewAmt + NewValue;
    this.AMT = FinalValue.toFixed(0);
    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT)*100).toFixed(2);
  }
}
