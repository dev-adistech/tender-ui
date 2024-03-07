import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { TendatMastService } from "src/app/Service/Transaction/tendat-mast.service";
import Swal from "sweetalert2";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { AssMastService } from "src/app/Service/Master/ass-mast.service";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";

@Component({
  selector: "app-assort-ent",
  templateUrl: "./assort-ent.component.html",
  styleUrls: ["./assort-ent.component.css"],
})
export class AssortEntComponent implements OnInit {
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  filteredDept: Observable<any[]>;
  DEPTArr: any = [];
  DeptControl: FormControl;
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DetIdControl: FormControl;
  filteredDetId: Observable<any[]>;
  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;

  T_PCS: any = "";
  T_CARAT: any = "";
  T_SIZE: any = "";
  T_AVG: any = "";
  T_AMT: any = "";
  T_NOPKT: any = "";
  K_CARAT: any = "";

  ModelControl: FormControl;
  filteredModel: Observable<any[]>;
  Modelarr: any = [];
  M_CODE: any = "";

  R_FEEL: any = "";
  S_PRD: any = "";
  M_QUA: any = "";
  A_COLOR: any = "";
  A_CLA: any = "";
  C_BLACK: any = "";
  M_TINGE: any = "";
  A_TENSION: any = "";

  rowData: any[] = [Array(1).fill(0)];

  GridHeader = [];
  FooterKey = [];
  FooterValue = [];
  GridFooter: any[] = [];
  NewRowData: any[] = [];

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public getRowStyle;

  USERID: any = "";
  USERCat: any = "";
  TRESRVE: any = "";

  S_CODE: any = [];
  C_NAME: any = [];
  Q_NAME: any = [];
  CT_NAME: any = [];
  FL_NAME: any = [];
  LB_NAME: any = [];
  IN_NAME: any = [];
  DEP_NAME: any = [];
  RAT_NAME: any = [];
  GRD_NAME: any = [];
  SHD_NAME: any = [];
  REF_NAME: any = [];
  RAPNAME: any = [];
  ML_NAME: any = [];

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private AssortMastServ: AssMastService,
    private ViewParaMastServ: ViewParaMastService
  ) {
    this.DeptControl = new FormControl();
    this.DetIdControl = new FormControl();
    this.ModelControl = new FormControl();
    this.S_CODE = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME };
    });
    this.C_NAME = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.Q_NAME = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });
    this.CT_NAME = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME };
    });
    this.FL_NAME = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });
    this.LB_NAME = this.decodedMast[4].map((item) => {
      return { code: item.LAB_CODE, name: item.LAB_NAME };
    });
    this.IN_NAME = this.decodedMast[6].map((item) => {
      return { code: item.IN_CODE, name: item.IN_NAME };
    });
    this.ML_NAME = this.decodedMast[24].map((item) => {
      return { code: item.ML_CODE, name: item.ML_NAME };
    });
    this.SHD_NAME = this.decodedMast[25].map((item) => {
      return { code: item.SH_CODE, name: item.SH_NAME };
    });

    this.REF_NAME = this.decodedMast[26].map((item) => {
      return { code: item.REF_CODE, name: item.REF_NAME };
    });
    this.DEP_NAME = this.decodedMast[21].map((item) => {
      return { code: item.DEP_CODE };
    });
    this.GRD_NAME = this.decodedMast[22].map((item) => {
      return { code: item.GRD_CODE };
    });
    this.RAT_NAME = this.decodedMast[23].map((item) => {
      return { code: item.RAT_CODE };
    });

    this.RAPNAME = this.decodedMast[27].map((item) => {
      return { code: item.RAPTYPE };
    });
    this.FillViewPara();
    this.USERID = this.decodedTkn.UserId;
    this.USERCat = this.decodedTkn.U_CAT;
  }

  ngOnInit() {
    let Depts = this.decodedMast[34].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
    this.DEPTArr = [{ code: 0, name: "---" }, ...Depts];

    let Models = this.decodedMast[32].map((item) => {
      return { code: item.M_CODE, name: item.M_NAME };
    });
    this.Modelarr = [{ code: 0, name: "---" }, ...Models];

    this.filteredDept = this.DeptControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.filteredModel = this.ModelControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterModel(value))
    );
  }

  private _filter(value: string): any[] {
    return this.DEPTArr.filter((sz) => sz.name);
  }

  private _filterModel(value: string): any[] {
    return this.Modelarr.filter((sz) => sz.name);
  }

  GETDETID() {
    this.DETID = "";
    this.T_DATE = null;
    this.T_NAME = "";
    this.T_PCS = "";
    this.T_CARAT = "";
    this.T_SIZE = "";
    this.T_AMT = "";
    this.T_AVG = "";
    this.T_NOPKT = "";
    this.K_CARAT = "";
    this.R_FEEL = "";
    this.S_PRD = "";
    this.M_CODE = "";
    this.M_QUA = "";
    this.A_CLA = "";
    this.A_COLOR = "";
    this.C_BLACK = "";
    this.M_TINGE = "";
    this.A_TENSION = "";
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.DETIDarr = FillRes.data
              .filter((item) => item.ISACTIVE == true && item.ISASSORT == true)
              .map((item) => {
                return {
                  code: item.DETID,
                  date: this.datePipe.transform(item.T_DATE, "yyyy-MM-dd"),
                  name: item.T_NAME,
                  pcs: item.T_PCS,
                  carat: item.T_CARAT,
                };
              });

            this.filteredDetId = this.DetIdControl.valueChanges.pipe(
              startWith(""),
              map((value) => this._filterDetId(value))
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
      }
    );
  }

  private _filterDetId(value: string): any[] {
    return this.DETIDarr.filter((sz) => sz.name);
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

  TbaleColColor(params, colDefField) {
    if (params.PTAG === "Total") {
      return;
    }
    if (colDefField === "LB_CODE") {
      if (params.LB_CODE === "I") {
        return "#78f587";
      } else if (params.LB_CODE === "HRD") {
        return "#fc6a6a";
      }
    } else if (colDefField === "S_CODE") {
      if (params.S_CODE !== "R" && params.S_CODE) {
        return "#ffff9e";
      }
    } else if (colDefField === "CT_CODE") {
      if (params.CT_CODE == 2) {
        return "#8db6fc";
      } else if (params.CT_CODE == 3) {
        return "#fc6a6a";
      } else if (params.CT_CODE == 4) {
        return "#f09c9c";
      }
    } else if (colDefField === "Q_CODE") {
      if (params.Q_CODE == 1) {
        return "#f09c9c";
      } else if (params.Q_CODE == 2) {
        return "#fc6a6a";
      }
    } else if (colDefField === "FL_CODE") {
      if (params.FL_CODE == 2) {
        return "#78f587";
      } else if (params.FL_CODE == 3) {
        return "#ffff9e";
      } else if (params.FL_CODE == 4) {
        return "#8db6fc";
      } else if (params.FL_CODE == 5) {
        return "#aac0e6";
      }
    } else if (colDefField === "ML_CODE") {
      if (params.ML_CODE == 2) {
        return "#a3a2a2";
      } else if (params.ML_CODE == 3) {
        return "#e3e3e3";
      }
    } else if (colDefField === "SH_CODE") {
      if (params.SH_CODE == 2) {
        return "#C4A484";
      } else if (params.SH_CODE == 3) {
        return "#d9c6b4";
      } else if (params.SH_CODE == 7) {
        return "#acfaa5";
      }
    }
  }

  LoadGridData() {
    let SaveObj = {
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
      DETID: this.DETID,
    };
    this.spinner.show();
    this.AssortMastServ.TendarAssEntFill(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.T_PCS = SaveRes.data[0][0].I_PCS;
          this.T_CARAT = SaveRes.data[0][0].I_CARAT;
          this.T_NOPKT = SaveRes.data[0][0].N_PCS;
          this.K_CARAT = SaveRes.data[0][0].K_CARAT;
          this.R_FEEL = SaveRes.data[0][0].ROU_FEEL;
          this.S_PRD = SaveRes.data[0][0].ST_PRD;
          this.M_QUA = SaveRes.data[0][0].M_QUALITY;
          this.M_CODE = SaveRes.data[0][0].MODEL;
          this.A_COLOR = SaveRes.data[0][0].AVG_COLOR;
          this.A_CLA = SaveRes.data[0][0].AVG_QUALITY;
          this.C_BLACK = SaveRes.data[0][0].CNT_BLK;
          this.M_TINGE = SaveRes.data[0][0].MIX_TIN;
          this.A_TENSION = SaveRes.data[0][0].AVG_TEN;
          if (SaveRes.data[0][0].TAMT) {
            this.T_AMT = SaveRes.data[0][0].TAMT.toFixed(2);
          } else {
            this.T_AMT = SaveRes.data[0][0].TAMT;
          }
          if (SaveRes.data[0][0].RAVG) {
            this.T_AVG = SaveRes.data[0][0].RAVG.toFixed(2);
          } else {
            this.T_AVG = SaveRes.data[0][0].RAVG;
          }

          this.rowData = SaveRes.data[1];
          this.NewRowData = SaveRes.data[2];

          for (let i = 0; i < this.rowData.length; i++) {
            this.rowData[i].GRID_DATA = this.GetRowData(
              this.rowData[i].DETID,
              this.rowData[i].DETNO,
              this.rowData[i].COMP_CODE,
              this.NewRowData
            );
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data),
          });
          return;
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
        return;
      }
    });
  }

  GetRowData(DetId, Detno, Comp, data) {
    return data.filter(
      (row) =>
        row.COMP_CODE === Comp && row.DETNO === Detno && row.DETID === DetId
    );
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({
      FORMNAME: "TendarAssPrdDisp",
    }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          let temp = [];
          let op = this;
          for (let i = 0; i < VPRes.data.length; i++) {
            if (VPRes.data[i].COLUMNSTYLE == "CheckBox") {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerclass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
                FORMAT: VPRes.data[i].FORMAT,
                LOCK: VPRes.data[i].LOCK,
                cellRenderer: (params) => {
                  if (params.data) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.data["PTAG"] !== "Total") {
                        if (params.data[VPRes.data[i].FIELDNAME] == 1) {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" checked disabled>'
                          );
                        } else {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" disabled>'
                          );
                        }
                      }
                    }
                  }
                },
              });
            } else {
              if (
                op.decodedTkn.U_CAT === "S" &&
                (VPRes.data[i].FIELDNAME === "ORAP" ||
                  VPRes.data[i].FIELDNAME === "RATE" ||
                  VPRes.data[i].FIELDNAME === "PER" ||
                  VPRes.data[i].FIELDNAME === "AMT" ||
                  VPRes.data[i].FIELDNAME == "MPER")
              ) {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  FORMAT: VPRes.data[i].FORMAT,
                LOCK: VPRes.data[i].LOCK,
                align: VPRes.data[i].CELLALIGN,
                Headersalign:VPRes.data[i].HEADERALIGN,
                  cellStyle: {
                    "text-align": VPRes.data[i].CELLALIGN,
                    "background-color": VPRes.data[i].BACKCOLOR,
                    color: VPRes.data[i].FONTCOLOR,
                    "font-weight": VPRes.data[i].ISBOLD === true ? "bold" : "",
                  },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide:false,
                  suppressMenu: true,
                });
              }else if(op.decodedTkn.U_CAT === "S" &&
              (VPRes.data[i].FIELDNAME === "D_DIS" || VPRes.data[i].FIELDNAME === "DRATE" ||VPRes.data[i].FIELDNAME === 'DAMT')){
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  FORMAT: VPRes.data[i].FORMAT,
                LOCK: VPRes.data[i].LOCK,
                align: VPRes.data[i].CELLALIGN,
                Headersalign:VPRes.data[i].HEADERALIGN,
                  cellStyle: {
                    "text-align": VPRes.data[i].CELLALIGN,
                    "background-color": VPRes.data[i].BACKCOLOR,
                    color: VPRes.data[i].FONTCOLOR,
                    "font-weight": VPRes.data[i].ISBOLD === true ? "bold" : "",
                  },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: true,
                  suppressMenu: true,
                });
              }else{
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  FORMAT: VPRes.data[i].FORMAT,
                LOCK: VPRes.data[i].LOCK,
                align: VPRes.data[i].CELLALIGN,
                Headersalign:VPRes.data[i].HEADERALIGN,
                  cellStyle: {
                    "text-align": VPRes.data[i].CELLALIGN,
                    "background-color": VPRes.data[i].BACKCOLOR,
                    color: VPRes.data[i].FONTCOLOR,
                    "font-weight": VPRes.data[i].ISBOLD === true ? "bold" : "",
                  },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  suppressMenu: true,
                });
              }
            }

            if (i == 0) {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
            }
            if (VPRes.data[i].FORMAT == "#0") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.NumberFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "#0.00") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.TwoFloatFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "#0.000") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.ThreeFloatFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "DateFormat") {
              temp[i].cellRenderer = this.DateFormat.bind(this);
              delete temp[i].valueFormatter;
            } else if (VPRes.data[i].FORMAT == "TimeFormat") {
              temp[i].cellRenderer = this.TimeFormat.bind(this);
              delete temp[i].valueFormatter;
            } else {
              temp[i].valueFormatter = this.StringFormat;
            }
          }
          this.columnDefs = temp;

          for (let i = 0; i < this.columnDefs.length; i++) {
            if (this.columnDefs[i].headername == "Date") {
              this.columnDefs[i].cellRenderer =
                this._convFunction.DateFormat.bind(this);
            }
            if (this.columnDefs[i].headername == "Time") {
              this.columnDefs[i].cellRenderer =
                this._convFunction.TimeFormat.bind(this);
            }
          }
        } else {
          this.toastr.error(JSON.stringify(VPRes.data));
        }
      } catch (error) {
        console.log(error);
        this.toastr.error(error);
      }
    });
  }

  Save() {
    let SaveObj = {
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
      DETID: this.DETID,
      I_PCS: this.T_PCS,
      I_CARAT: this.T_CARAT,
      N_PCS: this.T_NOPKT,
      IUSER: this.decodedTkn.UserId,
      ROU_FEEL: this.R_FEEL,
      ST_PRD: this.S_PRD,
      M_QUALITY: this.M_QUA,
      MODEL: this.M_CODE,
      AVG_COLOR: this.A_COLOR,
      AVG_QUALITY: this.A_CLA,
      CNT_BLK: this.C_BLACK,
      MIX_TIN: this.M_TINGE,
      AVG_TEN: this.A_TENSION,
    };
    this.spinner.show();
    this.AssortMastServ.TendarAssMstSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save Sucesfully");
          this.LoadGridData();
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data.originalError.info.message),
          });
          return;
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
        return;
      }
    });
  }

  GETDATE() {
    this.T_PCS = "";
    this.T_CARAT = "";
    this.T_SIZE = "";
    this.T_DATE = null;
    this.T_NAME = "";
    this.T_PCS = "";
    this.T_CARAT = "";
    this.T_SIZE = "";
    this.T_AMT = "";
    this.T_AVG = "";
    this.T_NOPKT = "";
    this.K_CARAT = "";
    this.R_FEEL = "";
    this.S_PRD = "";
    this.M_CODE = "";
    this.M_QUA = "";
    this.A_CLA = "";
    this.A_COLOR = "";
    this.C_BLACK = "";
    this.M_TINGE = "";
    this.A_TENSION = "";
    this.rowData=[Array(1).fill(0)];
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_DATE = this.DETIDarr.filter((x) => x.code == this.DETID)[0].date;
        this.T_PCS = this.DETIDarr.filter((x) => x.code == this.DETID)[0].pcs;
        this.T_CARAT = this.DETIDarr.filter(
          (x) => x.code == this.DETID
        )[0].carat;
        this.T_SIZE = (this.T_CARAT / this.T_PCS).toFixed(2);
      } else {
        this.DETID = "";
      }
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_NAME = this.DETIDarr.filter((x) => x.code == this.DETID)[0].name;
      }
    } else {
      this.DETID = "";
    }
  }

  SIZECalc() {
    this.T_SIZE = (this.T_CARAT / this.T_PCS).toFixed(2);
  }

  NumberFormat(params) {
    if (params.value != "NaN" && params.value != null) {
      return parseInt(params.value);
    } else {
      return "";
    }
  }

  TwoFloatFormat(params) {
    if (params.value != "NaN" && params.value != null && params.value != "") {
      return parseFloat(params.value).toFixed(2);
    } else {
      return "0.00";
    }
  }

  ThreeFloatFormat(params) {
    if (params.value != "NaN" && params.value != null && params.value != "") {
      return parseFloat(params.value).toFixed(3);
    } else {
      return "0.000";
    }
  }

  StringFormat(params) {
    if (params.value != "NaN" && params.value != null) {
      return params.value;
    } else {
      return "";
    }
  }

  DateFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "hh:mm a", "UTC+0");
    } else {
      return "";
    }
  }

  TableDateFormat(value) {
    if (value) {
      return this.datePipe.transform(value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }

  TabIntFormat(value) {
    if (value != "NaN" && value != null) {
      return parseInt(value);
    } else {
      return "";
    }
  }

  TabTwoFloatFormat(value) {
    if (value != "NaN" && value != null && value != "") {
      return parseFloat(value).toFixed(2);
    } else {
      return "0.00";
    }
  }

  TableThreeFloatFormat(value) {
    if (value != "NaN" && value != null && value != "") {
      return parseFloat(value).toFixed(3);
    } else {
      return "0.000";
    }
  }

  TableTimeFormat(value) {
    if (value) {
      return this.datePipe.transform(value, "hh:mm a", "UTC+0");
    } else {
      return "";
    }
  }

  TableStringFormat(value) {
    if (value != "NaN" && value != null) {
      return value;
    } else {
      return "";
    }
  }

  findRapTabe(tableRow, Item) {
    if (!tableRow.S_CODE) {
      return;
    }
    if (!tableRow.FQ_CODE) {
      return;
    }
    if (!tableRow.TQ_CODE) {
      return;
    }
    if (!tableRow.FC_CODE) {
      return;
    }
    if (!tableRow.TC_CODE) {
      return;
    }
    if (!parseFloat(tableRow.CARAT)) {
      return;
    }
    if (!tableRow.CT_CODE) {
      return;
    }
    if (!tableRow.FL_CODE) {
      return;
    }
    if (!tableRow.IN_CODE) {
      return;
    }

    let RapObj = {
      S_CODE: tableRow.S_CODE,
      FQ_CODE: tableRow.FQ_CODE,
      TQ_CODE: tableRow.TQ_CODE,
      TC_CODE: tableRow.TC_CODE,
      FC_CODE: tableRow.FC_CODE,
      CARAT: tableRow.CARAT,
      CUT_CODE: tableRow.CT_CODE,
      FL_CODE: tableRow.FL_CODE,
      IN_CODE: tableRow.IN_CODE,
      SH_CODE: tableRow.SH_CODE,
      ML_CODE: tableRow.ML_CODE,
      REF_CODE: tableRow.REF_CODE,
      RAPTYPE: tableRow.RAPTYPE,
      RTYPE: tableRow.LB_CODE,
    };
    this.AssortMastServ.FindRapAss(RapObj).then((RapRes) => {
      try {
        if (RapRes.success == 1) {
          let gridCaratSum = Item.GRID_DATA.filter(
            (item) => item.PTAG != "Total"
          ).reduce((acc, val) => {
            return acc + (val.CARAT ? parseFloat(val.CARAT) : 0);
          }, 0);

          gridCaratSum = Item.GRID_DATA.filter(
            (item) => item.PTAG != "Total"
          ).reduce((acc, val) => {
            return acc + (val.CARAT ? parseFloat(val.CARAT) : 0);
          }, 0);

          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].DETNO == Item.DETNO) {
              for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
                if (
                  this.rowData[i].GRID_DATA[j].PTAG == "Total" &&
                  this.rowData[i].GRID_DATA[j].PLANNO == tableRow.PLANNO
                ) {
                  this.rowData[i].GRID_DATA[j].CARAT =
                    parseFloat(gridCaratSum).toFixed(2);
                  break;
                }
              }
            }
          }

          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].DETNO == Item.DETNO) {
              for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
                if (
                  this.rowData[i].GRID_DATA[j].PTAG == tableRow.PTAG &&
                  this.rowData[i].GRID_DATA[j].PLANNO == tableRow.PLANNO
                ) {
                  this.rowData[i].GRID_DATA[j].ORAP = RapRes.data[0][0].AMT;
                  this.rowData[i].GRID_DATA[j].RATE = RapRes.data[1][0][""];
                  this.rowData[i].GRID_DATA[j].RTYPE = RapRes.data[2][0][""];
                  this.rowData[i].GRID_DATA[j].AMT =
                  this.rowData[i].GRID_DATA[j].RATE *
                  this.rowData[i].GRID_DATA[j].CARAT;
                  this.rowData[i].GRID_DATA[j].DRATE =this.rowData[i].GRID_DATA[j].RATE - (this.rowData[i].GRID_DATA[j].RATE * parseFloat(this.rowData[i].GRID_DATA[j].D_DIS)) / 100;
                  this.rowData[i].GRID_DATA[j].DAMT = this.rowData[i].GRID_DATA[j].DRATE * this.rowData[i].GRID_DATA[j].CARAT;
                  this.rowData[i].GRID_DATA[j].PER =
                    100 -
                    (this.rowData[i].GRID_DATA[j].RATE /
                      this.rowData[i].GRID_DATA[j].ORAP) *
                      100;
                  break;
                }
              }
            }
          }
          let NewAmtSum = 0;
          let NewAmtDSum = 0;
          let CaratSum = 0;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].DETNO === Item.DETNO &&
                this.rowData[i].GRID_DATA[j].PTAG !== "Total"
              ) {
                let carat = this.rowData[i].GRID_DATA[j].CARAT;
                let Orap = this.rowData[i].GRID_DATA[j].ORAP;
                let Mvalue;
                let newArray;
                let FinalValue = 0;
                let NewSum = 0;
                if (
                  parseFloat(this.rowData[i].GRID_DATA[j].MPER) &&
                  parseFloat(this.rowData[i].GRID_DATA[j].MPER) !== 100
                ) {
                  Mvalue = parseFloat(this.rowData[i].GRID_DATA[j].MPER);
                } else {
                  Mvalue = this.rowData[i].GRID_DATA[j].PER;
                }
                newArray = (Mvalue / 100) * Orap;
                FinalValue = Orap - newArray;
                NewSum = FinalValue * carat;
                this.rowData[i].GRID_DATA[j].RATE = FinalValue;
                this.rowData[i].GRID_DATA[j].AMT = NewSum;
                NewAmtSum += this.rowData[i].GRID_DATA[j].AMT;
                NewAmtDSum += this.rowData[i].GRID_DATA[j].DAMT;
                if (this.rowData[i].GRID_DATA[j].CARAT) {
                  CaratSum += parseFloat(this.rowData[i].GRID_DATA[j].CARAT);
                }
              }
            }
          }
          let ADISDIS;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].DETNO === Item.DETNO &&
                this.rowData[i].GRID_DATA[j].PTAG == "Total"
              ) {
                this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
                this.rowData[i].GRID_DATA[j].DAMT = NewAmtDSum
                this.rowData[i].GRID_DATA[j].RATE =NewAmtSum / this.rowData[i].GRID_DATA[j].CARAT;
                this.rowData[i].GRID_DATA[j].DRATE = NewAmtDSum / this.rowData[i].GRID_DATA[j].CARAT;
                let FINAL = (this.rowData[i].ADIS / 100) * NewAmtSum;
                ADISDIS = NewAmtSum + FINAL;
                this.rowData[i].FAMT = ADISDIS.toFixed(2);
                this.rowData[i].FBID = (
                  ADISDIS / this.rowData[i].I_CARAT
                ).toFixed(2);
              }
            }
          }
          Item.RAVG = (NewAmtSum / parseFloat(Item.SIZE)).toFixed(2);
          Item.AMT = (parseFloat(Item.I_CARAT) * parseFloat(Item.RAVG)).toFixed(
            2
          );
          Item.RTOP = ((CaratSum / parseFloat(Item.SIZE)) * 100).toFixed(2);

          let OrapSum = 0;
          for (let i = 0; i < Item.GRID_DATA.length; i++) {
            if (
              Item.GRID_DATA[i].ORAP &&
              Item.GRID_DATA[i].PTAG !== "Total" &&
              Item.GRID_DATA[i].CARAT
            ) {
              let OrapMulti = 0;
              OrapMulti =
                Item.GRID_DATA[i].ORAP * parseFloat(Item.GRID_DATA[i].CARAT);
              OrapSum += OrapMulti;
            }
          }
          for (let i = 0; i < Item.GRID_DATA.length; i++) {
            if (Item.GRID_DATA[i].PTAG == "Total") {
              Item.GRID_DATA[i].ORAP = OrapSum / Item.GRID_DATA[i].CARAT;
              Item.GRID_DATA[i].PER =
                100 - (Item.GRID_DATA[i].RATE * 100) / Item.GRID_DATA[i].ORAP;
            }
          }
          let MainAmtSum = 0;
          for (let i = 0; i < this.rowData.length; i++) {
            MainAmtSum += parseFloat(this.rowData[i].AMT);
          }
          this.T_AMT = MainAmtSum;
          this.T_AVG = (this.T_AMT / this.T_CARAT).toFixed(2);
        } else {
        }
      } catch (error) {
        console.log(error);
        this.toastr.warning(JSON.stringify(error));
      }
    });
  }

  PcsChange(item) {
    item.SIZE = (parseFloat(item.I_CARAT) / parseFloat(item.I_PCS)).toFixed(2);
    let NewWeight =0
    for(let i=0;i<this.rowData.length;i++){
      NewWeight += parseFloat(this.rowData[i].I_CARAT)
    }
    this.K_CARAT = NewWeight
  }
  SaveGrid(item) {
    let SubData = [];

    for (let i = 0; i < item.GRID_DATA.length; i++) {
      if (item.GRID_DATA[i].PTAG !== "Total") {
        SubData.push(item.GRID_DATA[i]);
      }
    }

    if(!item.I_PCS){
      return this.toastr.warning("Enter Pcs")
    }
    if(!item.I_CARAT){
      return this.toastr.warning("Enter Rough Carat")
    }
    let saveOBJ = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
      DETNO: item.DETNO,
      I_PCS: item.I_PCS,
      I_CARAT: item.I_CARAT,
      IUSER: this.decodedTkn.UserId,
      ISMC_COL: item.ISMC_COL,
    };
    this.AssortMastServ.TendarAssTrnSave(saveOBJ).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data),
          });
          return;
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
        return;
      }
    });
    let PerArr = [];
    for (let i = 0; i < SubData.length; i++) {
      let SaveObj = {
        COMP_CODE: SubData[i].COMP_CODE ? SubData[i].COMP_CODE : "",
        DETID: SubData[i].DETID ? SubData[i].DETID : 0,
        DETNO: SubData[i].DETNO ? SubData[i].DETNO : 0,
        PLANNO: SubData[i].PLANNO ? SubData[i].PLANNO : 0,
        PTAG: SubData[i].PTAG ? SubData[i].PTAG : "",
        I_CARAT: SubData[i].I_CARAT ? SubData[i].I_CARAT : 0,
        S_CODE: SubData[i].S_CODE ? SubData[i].S_CODE : "",
        FC_CODE: SubData[i].FC_CODE ? SubData[i].FC_CODE : 0,
        TC_CODE: SubData[i].TC_CODE ? SubData[i].TC_CODE : 0,
        FQ_CODE: SubData[i].FQ_CODE ? SubData[i].FQ_CODE : 0,
        TQ_CODE: SubData[i].TQ_CODE ? SubData[i].TQ_CODE : 0,
        CARAT: SubData[i].CARAT ? SubData[i].CARAT : 0,
        CT_CODE: SubData[i].CT_CODE ? SubData[i].CT_CODE : 0,
        FL_CODE: SubData[i].FL_CODE ? SubData[i].FL_CODE : 0,
        IN_CODE: SubData[i].IN_CODE ? SubData[i].IN_CODE : 0,
        SH_CODE: SubData[i].SH_CODE ? SubData[i].SH_CODE : 0,
        ML_CODE: SubData[i].ML_CODE ? SubData[i].ML_CODE : 0,
        REF_CODE: SubData[i].REF_CODE ? SubData[i].REF_CODE : 0,
        RAPTYPE: SubData[i].RAPTYPE ? SubData[i].RAPTYPE : "",
        LB_CODE: SubData[i].LB_CODE ? SubData[i].LB_CODE : "",
        RTYPE: SubData[i].RTYPE ? SubData[i].RTYPE : "",
        ORAP: SubData[i].ORAP ? SubData[i].ORAP : 0,
        RATE: SubData[i].RATE ? SubData[i].RATE : 0,
        IUSER: this.decodedTkn.UserId,
      };
      PerArr.push(SaveObj);
    }

    this.AssortMastServ.TendarAssPrdSave(PerArr).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save sucesfully");
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data),
          });
          return;
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
        return;
      }
    });
  }
}
