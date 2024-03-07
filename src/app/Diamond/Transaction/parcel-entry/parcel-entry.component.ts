import { Component, ElementRef, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { StoneidPopupComponent } from "../../View/pricing-wrk-view/stoneid-popup/stoneid-popup.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { TendatMastService } from "src/app/Service/Transaction/tendat-mast.service";
import { ViewService } from "src/app/Service/View/view.service";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { DatePipe } from "@angular/common";
import { TendarEstService } from "src/app/Service/Rap/tendar-est.service";
import { MatDialog } from "@angular/material/dialog";
import { BvViewDetComponent } from "../../View/b-v-view/bv-view-det/bv-view-det.component";
import { map, startWith } from "rxjs/operators";
import PerfectScrollbar from "perfect-scrollbar";
import { ParcelEntService } from "src/app/Service/Transaction/parcel-ent.service";
import { GridFunctions } from "../../_helpers/functions/GridFunctions";
declare let $: any;
@Component({
  selector: "app-parcel-entry",
  templateUrl: "./parcel-entry.component.html",
  styleUrls: ["./parcel-entry.component.css"],
})
export class ParcelEntryComponent implements OnInit {
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  tableRepeatCount = Array(1).fill(0);

  allSzs: any[] = [];
  filteredSzs: Observable<any[]>;
  szControl: FormControl;
  selectedSz: any = "";

  GridHeader = [];
  FooterKey = [];
  FooterValue = [];
  GridFooter: any[] = [];

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

  HIDEPOL: boolean = false;
  disabledata: boolean = false;
  ADISDISABLE: boolean = true;
  SAVEBTNSHOW: boolean = true;
  disabledataArray: any = [];

  LS: boolean = false;
  R1: any = "";
  R2: any = "";
  F1: any = "";
  F2: any = "";
  DN: any = "";
  USER1: any = "";
  USER2: any = "";
  USER3: any = "";
  FANCY1: any = "";
  ROUNDC1: any = "";
  COLORArr = [];
  filteredColor: Observable<any[]>;
  ColControl: FormControl;
  FINALBID: any = "";
  FLOCODE: any = "";

  FLOCODEDIS: boolean = false;

  MacColControl: FormControl;
  MacColor: any = [];
  filteredMacColor: Observable<any[]>;
  FINAL1: any = "";
  FINAL2: any = "";
  FINALME: any = "";
  FINALHE: any = "";
  RESULT1: any = "";
  RESULT2: any = "";
  RESULTME: any = "";
  RESULTHE: any = "";

  FloControl: FormControl;
  FLONO: any = [];
  filteredFLO: Observable<any[]>;
  FLO1: any = "";
  FLO2: any = "";
  FLOME: any = "";
  FLOHE: any = "";

  MacFloControl: FormControl;
  MacFLONO: any = [];
  filteredMacFLO: Observable<any[]>;
  MacFLO1: any = "";
  MacFLO2: any = "";
  MacFLOME: any = "";
  MacFLOHE: any = "";

  MacComControl: FormControl;
  MacComm: any = [];
  filteredMacCom: Observable<any[]>;
  MacCom1: any = "";
  MacCom2: any = "";
  MacComME: any = "";
  MacComHE: any = "";

  PKTNAME: any = "";
  PKTSRNO: any = "";
  PKTWEIGHT: any = "";
  PKTRESERVE: any = "";
  PKTPER: any = "";
  PKTSRW: any = "";
  PKTSRW1: any = "";
  FLAT1: any = "";
  FLAT2: any = "";

  TensionControl: FormControl;
  TenArr: any = [];
  filteredTension: Observable<any[]>;
  TENSION: any = "";

  TENDAR_NAME: any = "";

  TendarStyle: string = `width: 100%;height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
  AreaBoxStyle: string = `border:1px solid black;width: 100%;height: 50px;resize: none;`;
  CommentStyle: string = `border:1px solid black;width: 100%;height: 175px;resize: none;`;
  ContainWidth: string = `border:1px solid black;width: calc(100% - 10px);height: 55px;border-top:none`;
  BlankBoxStyle: string = `border:1px solid black;padding: 21px 0px; width: 100%; text-align: center;border-top:none;`;
  HearderBoxStyle: string = `border:1px solid black; width:100%; text-align: center;border-bottom:none`;

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;
  rowData: any[] = [Array(1).fill(0)];
  GRIDROw: any[] = [];
  NewRowData: any[] = [];
  ROWData1: any[] = [];

  I_CARAT: any = "";
  RTOP: any = "";
  SIZE: any = "";
  AMT: any = "";
  DAMT: any = "";
  DRCTS: any = "";
  CARAT: any = "";
  RATE: any = "";
  TDIS: any = "";
  RCTS: any = "";

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public getRowStyle;

  SECONDDATA: any[] = [];
  _GridRowData: any[] = [];
  FINALAMT: any = "";
  FINALAMT1: any = "";
  ADIS: any = "";

  ISFINDRAP: boolean = true;
  ICARATDISABLE: boolean = false;

  USERID: any = "";
  USERCat: any = "";
  TRESRVE: any = "";
  T_PCS: any = "";

  ProposalHide: boolean = false;

  public columnDefsShape;
  public gridApiShape;
  public pinnedBottomRowDataShape;
  public gridColumnApiShape;
  public defaultColDefShape;
  public gridOptionsShape;
  ShapeRowData: any[] = [];

  public columnDefsSize;
  public gridApiSize;
  public pinnedBottomRowDataSize;
  public gridColumnApiSize;
  public defaultColDefSize;
  public gridOptionsSize;
  SizeRowData: any[] = [];
  
  public columnDefsColor;
  public gridApiColor;
  public gridColumnApiColor;
  public defaultColDefColor;
  public gridOptionsColor;
  public pinnedBottomRowDataColor;
  ColorRowData: any[] = [];
  
  public columnDefsQua;
  public gridApiQua;
  public gridColumnApiQua;
  public defaultColDefQua;
  public gridOptionsQua;
  public pinnedBottomRowDataQua;
  QuaRowData: any[] = [];
  
  public columnDefsShd;
  public gridApiShd;
  public gridColumnApiShd;
  public defaultColDefShd;
  public gridOptionsShd;
  public pinnedBottomRowDataShd;
  ShdRowData: any[] = [];
  
  public columnDefsCut;
  public gridApiCut;
  public gridColumnApiCut;
  public defaultColDefCut;
  public gridOptionsCut;
  public pinnedBottomRowDataCut;
  CutRowData: any[] = [];
  
  public columnDefsFlo;
  public gridApiFlo;
  public gridColumnApiFlo;
  public defaultColDefFlo;
  public gridOptionsFlo;
  public pinnedBottomRowDataFlo;
  FloRowData: any[] = [];

  public columnDefsInc;
  public gridApiInc;
  public gridColumnApiInc;
  public defaultColDefInc;
  public gridOptionsInc;
  public pinnedBottomRowDataInc;
  IncRowData: any[] = [];

  public columnDefsLab;
  public gridApiLab;
  public gridColumnApiLab;
  public defaultColDefLab;
  public gridOptionsLab;
  public pinnedBottomRowDataLab;
  LabRowData: any[] = [];

  public getRowStyleDock;

  
  FooterKeyShape = ["NAME", "CARAT", "PCS", "RATE", "AMT"];

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private ViewServ: ViewService,
    private ViewParaMastServ: ViewParaMastService,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private TendarEstServ: TendarEstService,
    private dialog: MatDialog,
    private _gridFunction: GridFunctions,
    private ParcelEntServ: ParcelEntService
  ) {
    this.szControl = new FormControl();
    this.ColControl = new FormControl();
    this.MacColControl = new FormControl();
    this.FloControl = new FormControl();
    this.MacFloControl = new FormControl();
    this.MacComControl = new FormControl();
    this.TensionControl = new FormControl();

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      enableRowGroup: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    };
    let op = this;
    this.getRowStyle = function (params) {
      for (let i = 0; i < op.SECONDDATA.length; i++) {
        if (
          op.SECONDDATA[i].PLANNO == params.data.PLANNO &&
          op.SECONDDATA[i].SRNO == params.data.SRNO
        ) {
          if (params.data.PTAG == "Total") {
            return { background: "#c0ffc0", fontWeight: "bold" };
          }
        }
      }
      if (params.data.PTAG === "Total") {
        return { background: "#FFE0C0" };
      }
      return {};
    };
    this.FillViewPara();
    this.USERID = this.decodedTkn.UserId;
    this.USERCat = this.decodedTkn.U_CAT;

    this.getRowStyleDock = function (params) {
      if (params.data) {
        if (params.node.rowPinned === "bottom") {
          return { background: "#FFE0C0", "font-weight": "bold" };
        }
      }
    };

    let columnDefs = [];
    columnDefs.push({
      headerName: "Shape Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
        {
          headerName: "Shape",
          field: "NAME",
          cellStyle: { "text-align": "left" },
          headerClass: "text-center",
          width: 64,
        },
        {
          headerName: "Weight",
          field: "CARAT",
          cellStyle: { "text-align": "right" },
          headerClass: "text-center",
          width: 49,
        },
        {
          headerName: "Pcs",
          field: "PCS",
          cellStyle: { "text-align": "right" },
          headerClass: "text-center",
          width: 34,
        },
        {
          headerName: "Carat%",
          field: "RATE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 64,
        },
        {
          headerName: "Price%",
          field: "AMT",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 68,
        },
      ],
    });
    this.columnDefsShape = columnDefs;

    let columnDefsSize = [];
    columnDefsSize.push({
      headerName: "Size Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
        {
          headerName: "Size",
          field: "NAME",
          cellStyle: { "text-align": "right" },
          headerClass: "text-center",
          width: 75,
        },
        {
          headerName: "Weight",
          field: "CARAT",
          cellStyle: { "text-align": "right" },
          headerClass: "text-center",
          width: 49,
        },
        {
          headerName: "Pcs",
          field: "PCS",
          cellStyle: { "text-align": "right" },
          headerClass: "text-center",
          width: 34,
        },
        {
          headerName: "Carat%",
          field: "RATE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 60,
        },
        {
          headerName: "Price%",
          field: "AMT",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 61,
        },
      ],
    });
    this.columnDefsSize = columnDefsSize;

    let columnDefsColor = [];
    columnDefsColor.push({
      headerName: "Color Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Color",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:42
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:60
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
		]
  })
  this.columnDefsColor = columnDefsColor

    let columnDefsQua = [];
    columnDefsQua.push({
      headerName: "Clarity Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Qua",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:42
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:60
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
		]
  })
  this.columnDefsQua = columnDefsQua

    let columnDefsShd = [];
    columnDefsShd.push({
      headerName: "Shade Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Shade",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsShd = columnDefsShd

    let columnDefsCut = [];
    columnDefsCut.push({
      headerName: "Cut Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Cut",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsCut = columnDefsCut

    let columnDefsFlo = [];
    columnDefsFlo.push({
      headerName: "Fluorescence Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Flo",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsFlo = columnDefsFlo

    let columnDefsInc = [];
    columnDefsInc.push({
      headerName: "Inclusion Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Inc",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:65
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsInc = columnDefsInc

    let columnDefsLab = [];
    columnDefsLab.push({
      headerName: "Lab Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Lab",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:65
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:70
			},
		]
  })
  this.columnDefsLab = columnDefsLab

    this.defaultColDefShape = {
      resizable: true,
      sortable: true,
      filter: true,
      suppressMenu: true,
    };
    this.defaultColDefSize = {
      resizable: true,
      sortable: true,
      filter: true,
      suppressMenu: true,
    };
    this.defaultColDefColor = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefQua = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefShd = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefCut = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefFlo = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefInc = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefLab = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
  }

  onGridReadyShape(params) {
    this.gridApiShape = params.api;
    this.gridColumnApiShape = params.columnApi;
  }
  onGridReadySize(params) {
    this.gridApiSize = params.api;
    this.gridColumnApiSize = params.columnApi;
  }

  onGridReadyColor(params) {
    this.gridApiColor = params.api;
    this.gridColumnApiColor = params.columnApi;
  }

  onGridReadyQua(params) {
    this.gridApiQua = params.api;
    this.gridColumnApiQua = params.columnApi;
  }

  onGridReadyShd(params) {
    this.gridApiShd = params.api;
    this.gridColumnApiShd = params.columnApi;
  }

  onGridReadyCut(params) {
    this.gridApiCut = params.api;
    this.gridColumnApiCut = params.columnApi;
  }

  onGridReadyFlo(params) {
    this.gridApiFlo = params.api;
    this.gridColumnApiFlo = params.columnApi;
  }

  onGridReadyInc(params) {
    this.gridApiInc = params.api;
    this.gridColumnApiInc = params.columnApi;
  }
  onGridReadyLab(params) {
    this.gridApiLab = params.api;
    this.gridColumnApiLab = params.columnApi;
  }

  SAVEBTNDISABLE(eve) {
    if (eve.GRID_DATA) {
      if (
        eve.GRID_DATA[0].ISLOCK == 1 &&
        this.decodedTkn.UserId !== "ADMIN" &&
        this.decodedTkn.UserId !== "DN"
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  NewClick(item) {
    console.log(item);
    let Data = [];
    this.TendarEstServ.TendarPrdDetDisp({
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
      SRNO: item.SRNO,
      TYPE: "BV",
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          Data.push(FillRes.data);
          localStorage.setItem("TendarEstComponent", JSON.stringify(Data[0]));
          const dialogRef = this.dialog.open(BvViewDetComponent, {
            panelClass: "mat-dialog-container",
            autoFocus: false,
            minWidth: "99vw",
            width: "100vw !important",
            height: "calc(100vh - 1%)",
            data: Data,
          });
          $("#Close").click();
          dialogRef.afterClosed().subscribe((result) => {
            this.LoadGridData();
          });
        } else {
          this.spinner.hide();
          this.toastr.error("Data Not Found");
        }
      } catch {
        this.spinner.hide();
        this.toastr.error("Data Not Found");
      }
    });
    $("#Close").click();
  }

  oncellClick(eve) {
    let Data = [];
    this.TendarEstServ.TendarPrdDetDisp({
      COMP_CODE: eve.data.COMP_CODE,
      DETID: eve.data.DETID,
      SRNO: eve.data.SRNO,
      TYPE: "BV",
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          Data.push(FillRes.data);
          localStorage.setItem("TendarEstComponent", JSON.stringify(Data[0]));
          const dialogRef = this.dialog.open(BvViewDetComponent, {
            panelClass: "mat-dialog-container",
            autoFocus: false,
            minWidth: "99vw",
            width: "100vw !important",
            height: "calc(100vh - 1%)",
            data: Data,
          });
        } else {
          this.spinner.hide();
          this.toastr.error("Data Not Found");
        }
      } catch {
        this.spinner.hide();
        this.toastr.error("Data Not Found");
      }
    });
    $("#Close").click();
  }

  SaveMain() {
    this.ParcelEntServ.TendarMastDisSave({
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
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
    this.DEPTArr = this.decodedMast[34].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });

    let C_arr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    this.COLORArr = [[{ code: 0, name: "---" }, ...C_arr]];

    let MC_arr = this.decodedMast[17].map((item) => {
      return { code: item.MC_CODE, name: item.MC_NAME };
    });

    this.MacColor = [[{ code: 0, name: "---" }, ...MC_arr]];

    let FLO_arr = this.decodedMast[19].map((item) => {
      return { code: item.NFL_CODE, name: item.NFL_NAME };
    });
    this.FLONO = [[{ code: 0, name: "---" }, ...FLO_arr]];

    let MacFLO_arr = this.decodedMast[18].map((item) => {
      return { code: item.MFL_CODE, name: item.MFL_NAME };
    });
    this.MacFLONO = [[{ code: 0, name: "---" }, ...MacFLO_arr]];

    let F_arr = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });
    this.allSzs = [[{ code: 0, name: "---" }, ...F_arr]];

    let Com_arr = this.decodedMast[20].map((item) => {
      return { code: item.MCOM_NAME };
    });

    this.MacComm = [[{ code: 0 }, ...Com_arr]];

    let Tension_arr = this.decodedMast[16].map((item) => {
      return { code: item.T_CODE, name: item.T_NAME };
    });
    this.TenArr = [[{ code: 0 }, ...Tension_arr]];

    this.filteredSzs = this.szControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.filteredColor = this.ColControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._Colfilter(value))
    );
    this.filteredMacColor = this.MacColControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._MacColfilter(value))
    );
    this.filteredFLO = this.FloControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._FLOfilter(value))
    );
    this.filteredMacFLO = this.MacFloControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._MacFLOfilter(value))
    );
    this.filteredMacCom = this.MacComControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._MacComfilter(value))
    );
    this.filteredTension = this.TensionControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._Tensionfilter(value))
    );

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

    let op = this;

    $("body").on("focusin", "select.ShapeList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.ShapeList", function (this) {
      var inputData = $(this).prevAll();

      let IN_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let CARAT = $(inputData[4]).val();
      let Q_CODE = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let S_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].S_CODE = S_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.ColorList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.ColorList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let IN_CODE = $(inputData[1]).val();
      let LB_CODE = $(inputData[2]).val();
      let FL_CODE = $(inputData[3]).val();
      let CT_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let Q_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let C_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].C_CODE = C_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.QuaList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.QuaList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let IN_CODE = $(inputData[1]).val();
      let LB_CODE = $(inputData[2]).val();
      let FL_CODE = $(inputData[3]).val();
      let CT_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let Q_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].Q_CODE = Q_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.CutList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.CutList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let IN_CODE = $(inputData[1]).val();
      let LB_CODE = $(inputData[2]).val();
      let FL_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let CT_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].CT_CODE = CT_CODE;
              }
            }
          }
        }
      }

      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.FloList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.FloList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let IN_CODE = $(inputData[1]).val();
      let LB_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let FL_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].FL_CODE = FL_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.LabList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.LabList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let IN_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let LB_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].LB_CODE = LB_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.IncList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.IncList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let ML_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let IN_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].IN_CODE = IN_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.MilkyLIST", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.MilkyLIST", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let DEP_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let ML_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].ML_CODE = ML_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.DepList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.DepList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let RAT_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let DEP_CODE = $(this).val();

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].DEP_CODE = DEP_CODE;
              }
            }
          }
        }
      }
    });

    $("body").on("focusin", "select.RatList", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.RatList", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let DEP_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let GRD_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let RAT_CODE = $(this).val();

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].RAT_CODE = RAT_CODE;
              }
            }
          }
        }
      }
    });

    $("body").on("focusin", "select.GRDFill", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.GRDFill", function (this) {
      var inputData = $(this).prevAll();

      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let DEP_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let RAT_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let GRD_CODE = $(this).val();

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].GRD_CODE = GRD_CODE;
              }
            }
          }
        }
      }
    });

    $("body").on("focusin", "select.ShdFill", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.ShdFill", function (this) {
      var inputData = $(this).prevAll();
      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let DEP_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let RAT_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let GRD_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let SH_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].SH_CODE = SH_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });
    $("body").on("focusin", "select.RefFill", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.RefFill", function (this) {
      var inputData = $(this).prevAll();
      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let DEP_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let RAT_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let GRD_CODE = $(inputData[21]).val();
      let SH_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let REF_CODE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].REF_CODE = REF_CODE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });

    $("body").on("focusin", "select.RapTypeFill", function (this) {
      $(this).data("val", $(this).val());
    });

    $("body").on("change", "select.RapTypeFill", function (this) {
      var inputData = $(this).prevAll();
      let S_CODE = $(inputData[0]).val();
      let LB_CODE = $(inputData[1]).val();
      let FL_CODE = $(inputData[2]).val();
      let CT_CODE = $(inputData[3]).val();
      let Q_CODE = $(inputData[4]).val();
      let CARAT = $(inputData[5]).val();
      let C_CODE = $(inputData[6]).val();
      let PTAG = $(inputData[7]).val();
      let PLANNO = $(inputData[8]).val();
      let SRNO = $(inputData[9]).val();
      let ORAP = $(inputData[10]).val();
      let PER = $(inputData[11]).val();
      let RTYPE = $(inputData[12]).val();
      let AMT = $(inputData[13]).val();
      let DATA = $(inputData[14]).val();
      let IN_CODE = $(inputData[15]).val();
      let DEP_CODE = $(inputData[16]).val();
      let ML_CODE = $(inputData[17]).val();
      let RAT_CODE = $(inputData[18]).val();
      let MPER = $(inputData[19]).val();
      let PLNSEL = $(inputData[20]).val();
      let GRD_CODE = $(inputData[21]).val();
      let SH_CODE = $(inputData[22]).val();
      let REF_CODE = $(inputData[23]).val();
      let RAPTYPE = $(this).val();

      let NewCode = {
        IN_CODE,
        LB_CODE,
        FL_CODE,
        CT_CODE,
        CARAT,
        Q_CODE,
        C_CODE,
        PTAG,
        PLANNO,
        SRNO,
        S_CODE,
        ORAP,
        PER,
        RTYPE,
        AMT,
        DATA,
        ML_CODE,
        RAT_CODE,
        DEP_CODE,
        GRD_CODE,
        PLNSEL,
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE,
      };

      for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length; j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length; k++) {
            if (
              op._GridRowData[i].PLANNO === parseInt(PLANNO) &&
              op._GridRowData[i].SRNO == parseInt(SRNO) &&
              op._GridRowData[i].PTAG === PTAG
            ) {
              if (
                op._GridRowData[i].PLANNO ===
                  op.rowData[j].GRID_DATA[k].PLANNO &&
                op._GridRowData[i].SRNO &&
                op.rowData[j].GRID_DATA[k].SRNO &&
                op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG
              ) {
                op.rowData[j].GRID_DATA[k].RAPTYPE = RAPTYPE;
              }
            }
          }
        }
      }
      op.findrap1(NewCode);
    });
  }

  private _filter(value: string): any[] {
    return this.allSzs[0].filter((sz) => sz.name);
  }

  private _Colfilter(value: string): any[] {
    return this.COLORArr[0].filter((sz) => sz.name);
  }

  private _MacColfilter(value: string): any[] {
    return this.MacColor[0].filter((sz) => sz.name);
  }

  private _FLOfilter(value: string): any[] {
    return this.FLONO[0].filter((sz) => sz.name);
  }

  private _MacFLOfilter(value: string): any[] {
    return this.MacFLONO[0].filter((sz) => sz.name);
  }

  private _MacComfilter(value: string): any[] {
    return this.MacComm[0].filter((sz) => sz.code);
  }

  private _Tensionfilter(value: string): any[] {
    return this.TenArr[0].filter((sz) => sz.name);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  GETDETID() {
    this.DETID = "";
    this.T_DATE = null;
    this.T_NAME = "";
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.DETIDarr = FillRes.data
              .filter((item) => item.ISACTIVE == true && item.ISMIX == true)
              .map((item) => {
                return {
                  code: item.DETID,
                  date: this.datePipe.transform(item.T_DATE, "yyyy-MM-dd"),
                  name: item.T_NAME,
                };
              });
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

  GETDATE() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_DATE = this.DETIDarr.filter((x) => x.code == this.DETID)[0].date;
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

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({
      FORMNAME: "BVView",
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
            if (VPRes.data[i].FIELDNAME == "S_NAME") {
              temp[i].cellRenderer = this.ShapeFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "CARAT") {
              temp[i].editable = this.CARATEDISABLE.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "MPER") {
              temp[i].editable = this.MPERDISABLE.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "C_NAME") {
              temp[i].cellRenderer = this.ColorFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "Q_NAME") {
              temp[i].cellRenderer = this.QuaFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "CT_NAME") {
              temp[i].cellRenderer = this.CutFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "FL_NAME") {
              temp[i].cellRenderer = this.FloFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "LB_NAME") {
              temp[i].cellRenderer = this.LabFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "IN_NAME") {
              temp[i].cellRenderer = this.IncFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "ML_NAME") {
              temp[i].cellRenderer = this.MilkyFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "DEP_CODE") {
              temp[i].cellRenderer = this.DepFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "RAT_CODE") {
              temp[i].cellRenderer = this.RatFill.bind(this);
            }
            if (VPRes.data[i].FIELDNAME == "GRD_CODE") {
              temp[i].cellRenderer = this.GrdFill.bind(this);
            }

            if (VPRes.data[i].FIELDNAME == "SH_NAME") {
              temp[i].cellRenderer = this.SHADESFill.bind(this);
            }

            if (VPRes.data[i].FIELDNAME == "REF_NAME") {
              temp[i].cellRenderer = this.REFFill.bind(this);
            }

            if (VPRes.data[i].FIELDNAME == "RAPTYPE") {
              temp[i].cellRenderer = this.RAPTYPEFill.bind(this);
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
            temp[i].cellStyle = this.ColColor.bind(this);
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

  ColColor(params) {
    if (params.data.PTAG === "Total") {
      return;
    }
    if (params.colDef.field === "LB_NAME") {
      if (params.data.LB_CODE === "I") {
        return { background: "#78f587" };
      } else if (params.data.LB_CODE === "HRD") {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "S_NAME") {
      if (params.data.S_CODE !== "R" && params.data.S_CODE) {
        return { background: "#ffff9e" };
      }
    } else if (params.colDef.field === "CT_NAME") {
      if (params.data.CT_CODE == 2) {
        return { background: "#8db6fc" };
      } else if (params.data.CT_CODE == 3) {
        return { background: "#fc6a6a" };
      } else if (params.data.CT_CODE == 4) {
        return { background: "#f09c9c" };
      }
    } else if (params.colDef.field === "Q_NAME") {
      if (params.data.Q_CODE == 1) {
        return { background: "#f09c9c" };
      } else if (params.data.Q_CODE == 2) {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "FL_NAME") {
      if (params.data.FL_CODE == 2) {
        return { background: "#78f587" };
      } else if (params.data.FL_CODE == 3) {
        return { background: "#ffff9e" };
      } else if (params.data.FL_CODE == 4) {
        return { background: "#8db6fc" };
      } else if (params.data.FL_CODE == 5) {
        return { background: "#aac0e6" };
      }
    } else if (params.colDef.field === "ML_NAME") {
      if (params.data.ML_CODE == 2) {
        return { background: "#a3a2a2" };
      } else if (params.data.ML_CODE == 3) {
        return { background: "#e3e3e3" };
      }
    } else if (params.colDef.field === "SH_NAME") {
      if (params.data.SH_CODE == 2) {
        return { background: "#C4A484" };
      } else if (params.data.SH_CODE == 3) {
        return { background: "#d9c6b4" };
      } else if (params.data.SH_CODE == 7) {
        return { background: "#acfaa5" };
      }
    }
  }

  MPERDISABLE(params) {
    if (this.decodedTkn.UserId === "DN" || this.decodedTkn.UserId === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  CARATEDISABLE(params) {
    if (this.decodedTkn.UserId === "DN" || this.decodedTkn.UserId === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  ShapeFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
          <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
          <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
          <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                  <input id="GRD_CODE" type="hidden" value=${
                    params.data.GRD_CODE
                  } / >
                  <input id="DEP_CODE" type="hidden" value=${
                    params.data.DEP_CODE
                  } / >
                  <input id="RAT_CODE" type="hidden" value=${
                    params.data.RAT_CODE
                  } / >
                  <input id="ML_CODE" type="hidden" value=${
                    params.data.ML_CODE
                  } / >
                  <input id="DATA" type="hidden" value=${JSON.stringify(
                    params.data
                  )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / > 
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >`;
        template += '<select class="ShapeList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.S_CODE.length; i++) {
          if (this.S_CODE[i].code == params.data.S_CODE) {
            template +=
              '<option selected value="' +
              this.S_CODE[i].code +
              '">' +
              this.S_CODE[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.S_CODE[i].code +
              '">' +
              this.S_CODE[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
          <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
          <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
          <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
              <input id="MPER" type="hidden" value=${params.data.MPER} / >
                        <input id="GRD_CODE" type="hidden" value=${
                          params.data.GRD_CODE
                        } / >
                        <input id="DEP_CODE" type="hidden" value=${
                          params.data.DEP_CODE
                        } / >
                        <input id="RAT_CODE" type="hidden" value=${
                          params.data.RAT_CODE
                        } / >
                        <input id="ML_CODE" type="hidden" value=${
                          params.data.ML_CODE
                        } / >
                        <input id="DATA" type="hidden" value=${JSON.stringify(
                          params.data
                        )} / >
                          <input id="AMT" type="hidden" value="${
                            params.data.AMT ? params.data.AMT : 0
                          }" / >
                          <input id="RTYPE" type="hidden" value="${
                            params.data.RTYPE ? params.data.RTYPE : ""
                          }" / >
                          <input id="PER" type="hidden" value="${
                            params.data.PER ? params.data.PER : 0
                          }" / >
                          <input id="ORAP" type="hidden" value="${
                            params.data.ORAP ? params.data.ORAP : 0
                          }" / >
                          <input id="SRNO" type="hidden" value="${
                            params.data.SRNO
                          }" / >  
                          <input id="PLANNO" type="hidden" value="${
                            params.data.PLANNO
                          }" / > 
                          <input id="PTAG" type="hidden" value="${
                            params.data.PTAG
                          }" / > 
                          <input id="C_CODE" type="hidden" value="${
                            params.data.C_CODE ? params.data.C_CODE : 0
                          }" / > 
                          <input id="Q_CODE" type="hidden" value="${
                            params.data.Q_CODE ? params.data.Q_CODE : 0
                          }" / > 
                          <input id="CARAT" type="hidden" value="${
                            params.data.CARAT ? params.data.CARAT : 0
                          }" / > 
                          <input id="CT_CODE" type="hidden" value="${
                            params.data.CT_CODE
                          }" / > 
                          <input id="FL_CODE" type="hidden" value="${
                            params.data.FL_CODE
                          }" / > 
                          <input id="LB_CODE" type="hidden" value="${
                            params.data.LB_CODE ? params.data.LB_CODE : ""
                          }" / > 
                          <input id="IN_CODE" type="hidden" value="${
                            params.data.IN_CODE
                          }" / >`;
        template += '<select class="ShapeList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.S_CODE.length; i++) {
          if (this.S_CODE[i].code == params.data.S_CODE) {
            template +=
              '<option selected value="' +
              this.S_CODE[i].code +
              '">' +
              this.S_CODE[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.S_CODE[i].code +
              '">' +
              this.S_CODE[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  ColorFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="ColorList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {
          if (this.C_NAME[i].code == params.data.C_CODE) {
            template +=
              '<option selected value="' +
              this.C_NAME[i].code +
              '">' +
              this.C_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.C_NAME[i].code +
              '">' +
              this.C_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="ColorList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {
          if (this.C_NAME[i].code == params.data.C_CODE) {
            template +=
              '<option selected value="' +
              this.C_NAME[i].code +
              '">' +
              this.C_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.C_NAME[i].code +
              '">' +
              this.C_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  QuaFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="QuaList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {
          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template +=
              '<option selected value="' +
              this.Q_NAME[i].code +
              '">' +
              this.Q_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.Q_NAME[i].code +
              '">' +
              this.Q_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="QuaList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {
          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template +=
              '<option selected value="' +
              this.Q_NAME[i].code +
              '">' +
              this.Q_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.Q_NAME[i].code +
              '">' +
              this.Q_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  CutFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="CutList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {
          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template +=
              '<option selected value="' +
              this.CT_NAME[i].code +
              '">' +
              this.CT_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.CT_NAME[i].code +
              '">' +
              this.CT_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="CutList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {
          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template +=
              '<option selected value="' +
              this.CT_NAME[i].code +
              '">' +
              this.CT_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.CT_NAME[i].code +
              '">' +
              this.CT_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  FloFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="FloList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {
          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template +=
              '<option selected value="' +
              this.FL_NAME[i].code +
              '">' +
              this.FL_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.FL_NAME[i].code +
              '">' +
              this.FL_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="FloList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {
          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template +=
              '<option selected value="' +
              this.FL_NAME[i].code +
              '">' +
              this.FL_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.FL_NAME[i].code +
              '">' +
              this.FL_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  LabFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="LabList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {
          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template +=
              '<option selected value="' +
              this.LB_NAME[i].code +
              '">' +
              this.LB_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.LB_NAME[i].code +
              '">' +
              this.LB_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="IN_CODE" type="hidden" value="${
                      params.data.IN_CODE
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="LabList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {
          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template +=
              '<option selected value="' +
              this.LB_NAME[i].code +
              '">' +
              this.LB_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.LB_NAME[i].code +
              '">' +
              this.LB_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  IncFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="IncList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {
          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template +=
              '<option selected value="' +
              this.IN_NAME[i].code +
              '">' +
              this.IN_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.IN_NAME[i].code +
              '">' +
              this.IN_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${
                      params.data.GRD_CODE
                    } / >
                    <input id="DEP_CODE" type="hidden" value=${
                      params.data.DEP_CODE
                    } / >
                    <input id="RAT_CODE" type="hidden" value=${
                      params.data.RAT_CODE
                    } / >
                    <input id="ML_CODE" type="hidden" value=${
                      params.data.ML_CODE
                    } / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(
                      params.data
                    )} / >
                    <input id="AMT" type="hidden" value="${
                      params.data.AMT ? params.data.AMT : 0
                    }" / >
                    <input id="RTYPE" type="hidden" value="${
                      params.data.RTYPE ? params.data.RTYPE : ""
                    }" / >
                    <input id="PER" type="hidden" value="${
                      params.data.PER ? params.data.PER : 0
                    }" / >
                    <input id="ORAP" type="hidden" value="${
                      params.data.ORAP ? params.data.ORAP : 0
                    }" / >
                    <input id="SRNO" type="hidden" value="${
                      params.data.SRNO
                    }" / >  
                    <input id="PLANNO" type="hidden" value="${
                      params.data.PLANNO
                    }" / > 
                    <input id="PTAG" type="hidden" value="${
                      params.data.PTAG
                    }" / >  
                    <input id="C_CODE" type="hidden" value="${
                      params.data.C_CODE ? params.data.C_CODE : 0
                    }" / >
                    <input id="CARAT" type="hidden" value="${
                      params.data.CARAT ? params.data.CARAT : 0
                    }" / > 
                    <input id="Q_CODE" type="hidden" value="${
                      params.data.Q_CODE ? params.data.Q_CODE : 0
                    }" / > 
                    <input id="CT_CODE" type="hidden" value="${
                      params.data.CT_CODE
                    }" / > 
                    <input id="FL_CODE" type="hidden" value="${
                      params.data.FL_CODE
                    }" / > 
                    <input id="LB_CODE" type="hidden" value="${
                      params.data.LB_CODE ? params.data.LB_CODE : ""
                    }" / >
                    <input id="S_CODE" type="hidden" value="${
                      params.data.S_CODE ? params.data.S_CODE : ""
                    }" / >`;
        template += '<select class="IncList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {
          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template +=
              '<option selected value="' +
              this.IN_NAME[i].code +
              '">' +
              this.IN_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.IN_NAME[i].code +
              '">' +
              this.IN_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  MilkyFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="MilkyLIST">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {
          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template +=
              '<option selected value="' +
              this.ML_NAME[i].code +
              '">' +
              this.ML_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.ML_NAME[i].code +
              '">' +
              this.ML_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="MilkyLIST" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {
          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template +=
              '<option selected value="' +
              this.ML_NAME[i].code +
              '">' +
              this.ML_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.ML_NAME[i].code +
              '">' +
              this.ML_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  DepFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="DepList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {
          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template +=
              '<option selected value="' +
              this.DEP_NAME[i].code +
              '">' +
              this.DEP_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.DEP_NAME[i].code +
              '">' +
              this.DEP_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="DepList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {
          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template +=
              '<option selected value="' +
              this.DEP_NAME[i].code +
              '">' +
              this.DEP_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.DEP_NAME[i].code +
              '">' +
              this.DEP_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  RatFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RatList">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {
          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template +=
              '<option selected value="' +
              this.RAT_NAME[i].code +
              '">' +
              this.RAT_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.RAT_NAME[i].code +
              '">' +
              this.RAT_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${
                        params.data.GRD_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RatList" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {
          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template +=
              '<option selected value="' +
              this.RAT_NAME[i].code +
              '">' +
              this.RAT_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.RAT_NAME[i].code +
              '">' +
              this.RAT_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  GrdFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="GRDFill">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {
          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template +=
              '<option selected value="' +
              this.GRD_NAME[i].code +
              '">' +
              this.GRD_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.GRD_NAME[i].code +
              '">' +
              this.GRD_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="GRDFill" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {
          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template +=
              '<option selected value="' +
              this.GRD_NAME[i].code +
              '">' +
              this.GRD_NAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.GRD_NAME[i].code +
              '">' +
              this.GRD_NAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  SHADESFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="ShdFill">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {
          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template +=
              '<option selected value="' +
              this.SHD_NAME[i].code +
              '">' +
              this.SHD_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.SHD_NAME[i].code +
              '">' +
              this.SHD_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="ShdFill" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {
          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template +=
              '<option selected value="' +
              this.SHD_NAME[i].code +
              '">' +
              this.SHD_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.SHD_NAME[i].code +
              '">' +
              this.SHD_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  REFFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RefFill">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {
          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template +=
              '<option selected value="' +
              this.REF_NAME[i].code +
              '">' +
              this.REF_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.REF_NAME[i].code +
              '">' +
              this.REF_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RefFill" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {
          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template +=
              '<option selected value="' +
              this.REF_NAME[i].code +
              '">' +
              this.REF_NAME[i].name +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.REF_NAME[i].code +
              '">' +
              this.REF_NAME[i].name +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      }
    }
  }

  RAPTYPEFill(params) {
    if (params.data.PTAG !== "Total") {
      if (
        this.decodedTkn.UserId === "DN" ||
        this.decodedTkn.UserId === "ADMIN"
      ) {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RapTypeFill">';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {
          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template +=
              '<option selected value="' +
              this.RAPNAME[i].code +
              '">' +
              this.RAPNAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.RAPNAME[i].code +
              '">' +
              this.RAPNAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
      } else {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${
                        params.data.RAT_CODE
                      } / >
                      <input id="ML_CODE" type="hidden" value=${
                        params.data.ML_CODE
                      } / >
                      <input id="DEP_CODE" type="hidden" value=${
                        params.data.DEP_CODE
                      } / >
                      <input id="IN_CODE" type="hidden" value=${
                        params.data.IN_CODE
                      } / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(
                        params.data
                      )} / >
                      <input id="AMT" type="hidden" value="${
                        params.data.AMT ? params.data.AMT : 0
                      }" / >
                      <input id="RTYPE" type="hidden" value="${
                        params.data.RTYPE ? params.data.RTYPE : ""
                      }" / >
                      <input id="PER" type="hidden" value="${
                        params.data.PER ? params.data.PER : 0
                      }" / >
                      <input id="ORAP" type="hidden" value="${
                        params.data.ORAP ? params.data.ORAP : 0
                      }" / >
                      <input id="SRNO" type="hidden" value="${
                        params.data.SRNO
                      }" / >  
                      <input id="PLANNO" type="hidden" value="${
                        params.data.PLANNO
                      }" / > 
                      <input id="PTAG" type="hidden" value="${
                        params.data.PTAG
                      }" / >  
                      <input id="C_CODE" type="hidden" value="${
                        params.data.C_CODE ? params.data.C_CODE : 0
                      }" / >
                      <input id="CARAT" type="hidden" value="${
                        params.data.CARAT ? params.data.CARAT : 0
                      }" / > 
                      <input id="Q_CODE" type="hidden" value="${
                        params.data.Q_CODE ? params.data.Q_CODE : 0
                      }" / > 
                      <input id="CT_CODE" type="hidden" value="${
                        params.data.CT_CODE
                      }" / > 
                      <input id="FL_CODE" type="hidden" value="${
                        params.data.FL_CODE
                      }" / > 
                      <input id="LB_CODE" type="hidden" value="${
                        params.data.LB_CODE ? params.data.LB_CODE : ""
                      }" / >
                      <input id="S_CODE" type="hidden" value="${
                        params.data.S_CODE ? params.data.S_CODE : ""
                      }" / >`;
        template += '<select class="RapTypeFill" disabled>';
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {
          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template +=
              '<option selected value="' +
              this.RAPNAME[i].code +
              '">' +
              this.RAPNAME[i].code +
              "</option>";
          } else {
            template +=
              '<option value="' +
              this.RAPNAME[i].code +
              '">' +
              this.RAPNAME[i].code +
              "</option>";
          }
        }
        template += "</select>";
        return template;
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

  LoadGridData() {
    this.SIZE = "";
    let FillObj = {
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
      DETID: this.DETID ? this.DETID : 0,
      IUSER: this.decodedTkn.UserId,
    };
    this.spinner.show();
    this.ParcelEntServ.TendarParcelEnt(FillObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          console.time();
          this.tableRepeatCount = Array(FillRes.data[0].length).fill(0);
          this.rowData = FillRes.data[0];
          this.NewRowData = FillRes.data[1];

          this.ShapeRowData = FillRes.data[3];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShape = this._gridFunction.footerCal(
            FillRes.data[3]
          );

          this.SizeRowData = FillRes.data[4];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataSize = this._gridFunction.footerCal(
            FillRes.data[4]
          );
          this.ColorRowData = FillRes.data[5];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataColor = this._gridFunction.footerCal(
            FillRes.data[5]
          );
          this.QuaRowData = FillRes.data[6];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataQua = this._gridFunction.footerCal(
            FillRes.data[6]
          );
          this.ShdRowData = FillRes.data[7];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShd = this._gridFunction.footerCal(
            FillRes.data[7]
          );
          this.CutRowData = FillRes.data[8];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataCut = this._gridFunction.footerCal(
            FillRes.data[8]
          );
          this.FloRowData = FillRes.data[9];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataFlo = this._gridFunction.footerCal(
            FillRes.data[9]
          );
          this.IncRowData = FillRes.data[10];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataInc = this._gridFunction.footerCal(
            FillRes.data[10]
          );
          this.LabRowData = FillRes.data[11];
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataLab = this._gridFunction.footerCal(
            FillRes.data[11]
          );

          if (FillRes.data[2][0]["AMT"]) {
            this.AMT = FillRes.data[2][0]["AMT"].toFixed(0);
          } else {
            this.AMT = FillRes.data[2][0]["AMT"];
          }
          this.CARAT = FillRes.data[2][0]["CARAT"];
          this.I_CARAT = FillRes.data[2][0]["I_CARAT"];
          this.DRCTS = FillRes.data[2][0]["DRCTS"];
          this.DAMT = FillRes.data[2][0]["DAMT"];
          if (FillRes.data[2][0]["RTOP"]) {
            this.RTOP = FillRes.data[2][0]["RTOP"].toFixed(2);
          }
          if (FillRes.data[2][0]["SIZE"]) {
            this.SIZE = FillRes.data[2][0]["SIZE"].toFixed(2);
          }
          this.RATE = FillRes.data[2][0]["RATE"];
          if (FillRes.data[2][0]["RCTS"]) {
            this.RCTS = FillRes.data[2][0]["RCTS"].toFixed(0);
          } else {
            this.RCTS = FillRes.data[2][0]["RCTS"];
          }
          this.TDIS = FillRes.data[2][0]["TDIS"];
          this.TRESRVE = FillRes.data[2][0]["TRESRVE"];
          this.T_PCS = FillRes.data[2][0]["T_PCS"];

          this.spinner.show();
          for (let i = 0; i < this.rowData.length; i++) {
            this.rowData[i].GRID_DATA = this.GetRowData(
              this.rowData[i].DETID,
              this.rowData[i].SRNO,
              this.rowData[i].COMP_CODE,
              this.NewRowData
            );
          }
          this.SECONDDATA = FillRes.data[1];
          this._GridRowData = FillRes.data[1];
          this.spinner.hide();

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
          console.timeEnd();
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

  Proposal() {
    this.ProposalHide = true;
  }
  CloseProposal() {
    this.ProposalHide = false;
  }

  GetRowData(DetId, Srno, Comp, data) {
    return data.filter(
      (row) =>
        row.COMP_CODE === Comp && row.SRNO === Srno && row.DETID === DetId
    );
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

  findrap1(RapObj) {
    if (!RapObj.S_CODE) {
      return;
    }
    if (!RapObj.Q_CODE) {
      return;
    }
    if (!RapObj.C_CODE) {
      return;
    }
    if (!parseFloat(RapObj.CARAT)) {
      return;
    }
    if (!RapObj.CT_CODE) {
      return;
    }
    if (!RapObj.FL_CODE) {
      return;
    }
    if (!RapObj.LB_CODE) {
      return;
    }
    if (!RapObj.IN_CODE) {
      return;
    }
    if (!RapObj.ML_CODE) {
      return;
    }
    this.ISFINDRAP = false;
    let RapObj1 = {
      S_CODE: RapObj.S_CODE,
      Q_CODE: RapObj.Q_CODE,
      C_CODE: RapObj.C_CODE,
      CARAT: RapObj.CARAT,
      CUT_CODE: RapObj.CT_CODE,
      FL_CODE: RapObj.FL_CODE,
      IN_CODE: RapObj.IN_CODE,
      RTYPE: RapObj.LB_CODE,
      MPER: RapObj.MPER,
      ML_CODE: RapObj.ML_CODE,
      SH_CODE: RapObj.SH_CODE,
      REF_CODE: RapObj.REF_CODE,
      RAPTYPE: RapObj.RAPTYPE,
    };

    this.TendarEstServ.FindRap(RapObj1).then((RapRes) => {
      try {
        if (RapRes.success == true) {
          this.ISFINDRAP = true;
          let oldRapObj = JSON.parse(RapObj.DATA);
          let PTAGROW = [];
          let PTAGRO = [];
          for (let i = 0; i < this._GridRowData.length; i++) {
            for (let j = 0; j < this.rowData.length; j++) {
              for (let k = 0; k < this.rowData[j].GRID_DATA.length; k++) {
                if (
                  this._GridRowData[i].PLANNO === oldRapObj.PLANNO &&
                  this._GridRowData[i].SRNO == oldRapObj.SRNO &&
                  this._GridRowData[i].PTAG === oldRapObj.PTAG
                ) {
                  if (
                    oldRapObj.PLANNO === this.rowData[j].GRID_DATA[k].PLANNO &&
                    oldRapObj.SRNO === this.rowData[j].SRNO &&
                    oldRapObj.PTAG == this.rowData[j].GRID_DATA[k].PTAG
                  ) {
                    this.rowData[j].GRID_DATA[k].ORAP = RapRes.data[0][0].AMT;
                    this.rowData[j].GRID_DATA[k].RATE = RapRes.data[1][0][""];
                    this.rowData[j].GRID_DATA[k].RTYPE = RapRes.data[2][0][""];
                    this.rowData[j].GRID_DATA[k].AMT =
                      this.rowData[j].GRID_DATA[k].RATE *
                      this.rowData[j].GRID_DATA[k].CARAT;
                    this.rowData[j].GRID_DATA[k].PER =
                      100 -
                      (this.rowData[j].GRID_DATA[k].RATE /
                        this.rowData[j].GRID_DATA[k].ORAP) *
                        100;
                    PTAGROW.push(this.rowData[j].GRID_DATA[k]);
                    PTAGRO = this.rowData[j];
                  } else {
                    PTAGROW.push(this.rowData[j].GRID_DATA[k]);
                  }
                }
              }
            }
          }
          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].SRNO === PTAGRO["SRNO"]) {
              this.rowData[i].GRID_DATA = this.GetRowData(
                PTAGRO["DETID"],
                PTAGRO["SRNO"],
                PTAGRO["COMP_CODE"],
                PTAGROW
              );
              break;
            }
          }
          let NewAmtSum = 0;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].SRNO === PTAGRO["SRNO"] &&
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
              }
            }
          }
          let ADISDIS = 0;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].SRNO === PTAGRO["SRNO"] &&
                this.rowData[i].GRID_DATA[j].PTAG == "Total"
              ) {
                this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
                this.rowData[i].GRID_DATA[j].RATE =
                  NewAmtSum / this.rowData[i].GRID_DATA[j].CARAT;
                let FINAL = (this.rowData[i].ADIS / 100) * NewAmtSum;
                ADISDIS = NewAmtSum + FINAL;
                this.rowData[i].FAMT = ADISDIS.toFixed(2);
                this.rowData[i].FBID = (
                  ADISDIS / this.rowData[i].I_CARAT
                ).toFixed(2);
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  FindRap(eve) {
    if (eve.colDef.field === "MPER") {
      if (
        parseFloat(eve.data.MPER) >= eve.data.PER + 10 ||
        parseFloat(eve.data.MPER) <= eve.data.PER - 10
      ) {
        Swal.fire({
          title: "Are you Sure You Want To Update",
          icon: "question",
          customClass: {
            popup: "swal-height",
          },
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
          } else {
            eve.data.MPER = 0;
          }
        });
      }
      let NewData = [];
      for (let i = 0; i < this.rowData.length; i++) {
        for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
          if (
            this.rowData[i].GRID_DATA[j].SRNO === eve.data.SRNO &&
            this.rowData[i].GRID_DATA[j].PTAG == eve.data.PTAG
          ) {
            this.rowData[i].GRID_DATA[j].MPER = eve.data.MPER;
          }
        }
      }
      let FinalArray = [];
      for (let i = 0; i < this.rowData.length; i++) {
        for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
          if (
            this.rowData[i].GRID_DATA[j].SRNO === eve.data.SRNO &&
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
          }
        }
      }
      let NewAmtSum = 0;
      for (let i = 0; i < this.rowData.length; i++) {
        for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
          if (
            this.rowData[i].GRID_DATA[j].SRNO === eve.data.SRNO &&
            this.rowData[i].GRID_DATA[j].PTAG !== "Total"
          ) {
            NewAmtSum += this.rowData[i].GRID_DATA[j].AMT;
          }
        }
      }
      let ADISDIS = 0;
      for (let i = 0; i < this.rowData.length; i++) {
        for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
          if (
            this.rowData[i].GRID_DATA[j].SRNO === eve.data.SRNO &&
            this.rowData[i].GRID_DATA[j].PTAG == "Total"
          ) {
            this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
            this.rowData[i].GRID_DATA[j].RATE =
              NewAmtSum / this.rowData[i].GRID_DATA[j].CARAT;
            let FINAL = (parseFloat(this.rowData[i].ADIS) / 100) * NewAmtSum;
            if (!FINAL) {
              FINAL = 0;
            }
            ADISDIS = NewAmtSum + FINAL;
            this.rowData[i].FAMT = ADISDIS.toFixed(2);
            this.rowData[i].FBID = (ADISDIS / this.rowData[i].I_CARAT).toFixed(
              2
            );
            FinalArray.push(this.rowData[i].GRID_DATA[j]);
          } else {
            FinalArray.push(this.rowData[i].GRID_DATA[j]);
          }
        }
      }
      for (let i = 0; i < this.rowData.length; i++) {
        if (this.rowData[i].SRNO === eve.data.SRNO) {
          this.rowData[i].GRID_DATA = this.GetRowData(
            eve.data.DETID,
            eve.data.SRNO,
            eve.data.COMP_CODE,
            FinalArray
          );
          break;
        }
      }
    } else {
      if (!eve.data.S_CODE) {
        return;
      }
      if (!eve.data.Q_CODE) {
        return;
      }
      if (!eve.data.C_CODE) {
        return;
      }
      if (!parseFloat(eve.data.CARAT)) {
        return;
      }
      if (!eve.data.CT_CODE) {
        return;
      }
      if (!eve.data.FL_CODE) {
        return;
      }
      if (!eve.data.LB_CODE) {
        return;
      }
      if (!eve.data.IN_CODE) {
        return;
      }
      if (!eve.data.ML_CODE) {
        return;
      }
      this.ISFINDRAP = false;
      let RapObj = {
        S_CODE: eve.data.S_CODE,
        Q_CODE: eve.data.Q_CODE,
        C_CODE: eve.data.C_CODE,
        CARAT: eve.data.CARAT,
        CUT_CODE: eve.data.CT_CODE,
        FL_CODE: eve.data.FL_CODE,
        IN_CODE: eve.data.IN_CODE,
        RTYPE: eve.data.LB_CODE,
        MPER: eve.data.MPER,
        ML_CODE: eve.data.ML_CODE,
        SH_CODE: eve.data.SH_CODE,
        REF_CODE: eve.data.REF_CODE,
        RAPTYPE: eve.data.RAPTYPE,
      };

      this.TendarEstServ.FindRap(RapObj).then((RapRes) => {
        try {
          this.ISFINDRAP = true;
          let PTAGROW = [];
          let PTAGRO = [];
          let CrtSum = 0;
          for (let j = 0; j < this.rowData.length; j++) {
            for (let k = 0; k < this.rowData[j].GRID_DATA.length; k++) {
              if (
                this.rowData[j].GRID_DATA[k].SRNO == eve.data.SRNO &&
                this.rowData[j].GRID_DATA[k].PTAG !== "Total"
              ) {
                CrtSum += parseFloat(this.rowData[j].GRID_DATA[k].CARAT);
              }
            }
          }
          for (let j = 0; j < this.rowData.length; j++) {
            for (let k = 0; k < this.rowData[j].GRID_DATA.length; k++) {
              if (
                this.rowData[j].GRID_DATA[k].SRNO == eve.data.SRNO &&
                this.rowData[j].GRID_DATA[k].PTAG == eve.data.PTAG
              ) {
                if (CrtSum > this.rowData[j].I_CARAT) {
                  this.rowData[j].GRID_DATA[k].CARAT = 0.0;
                  this.toastr.warning("Your Carat Was Greater Than Weight");
                }
              }
            }
          }
          for (let i = 0; i < this._GridRowData.length; i++) {
            for (let j = 0; j < this.rowData.length; j++) {
              for (let k = 0; k < this.rowData[j].GRID_DATA.length; k++) {
                if (
                  this._GridRowData[i].PLANNO === eve.data.PLANNO &&
                  this._GridRowData[i].SRNO == eve.data.SRNO &&
                  this._GridRowData[i].PTAG === eve.data.PTAG
                ) {
                  if (
                    eve.data.PLANNO === this.rowData[j].GRID_DATA[k].PLANNO &&
                    eve.data.SRNO === this.rowData[j].SRNO &&
                    eve.data.PTAG == this.rowData[j].GRID_DATA[k].PTAG
                  ) {
                    this.rowData[j].GRID_DATA[k].ORAP = RapRes.data[0][0].AMT;
                    this.rowData[j].GRID_DATA[k].RATE = RapRes.data[1][0][""];
                    this.rowData[j].GRID_DATA[k].RTYPE = RapRes.data[2][0][""];
                    this.rowData[j].GRID_DATA[k].AMT =
                      this.rowData[j].GRID_DATA[k].RATE *
                      this.rowData[j].GRID_DATA[k].CARAT;
                    this.rowData[j].GRID_DATA[k].PER =
                      100 -
                      (this.rowData[j].GRID_DATA[k].RATE /
                        this.rowData[j].GRID_DATA[k].ORAP) *
                        100;
                    PTAGROW.push(this.rowData[j].GRID_DATA[k]);
                    PTAGRO = this.rowData[j];
                  } else {
                    PTAGROW.push(this.rowData[j].GRID_DATA[k]);
                  }
                }
              }
            }
          }
          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].SRNO === PTAGRO["SRNO"]) {
              this.rowData[i].GRID_DATA = this.GetRowData(
                PTAGRO["DETID"],
                PTAGRO["SRNO"],
                PTAGRO["COMP_CODE"],
                PTAGROW
              );
              break;
            }
          }
          let NewAmtSum = 0;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].SRNO === PTAGRO["SRNO"] &&
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
              }
            }
          }
          let ADISDIS;
          for (let i = 0; i < this.rowData.length; i++) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].SRNO === PTAGRO["SRNO"] &&
                this.rowData[i].GRID_DATA[j].PTAG == "Total"
              ) {
                this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
                this.rowData[i].GRID_DATA[j].RATE =
                  NewAmtSum / this.rowData[i].GRID_DATA[j].CARAT;
                let FINAL = (this.rowData[i].ADIS / 100) * NewAmtSum;
                ADISDIS = NewAmtSum + FINAL;
                this.rowData[i].FAMT = ADISDIS.toFixed(2);
                this.rowData[i].FBID = (
                  ADISDIS / this.rowData[i].I_CARAT
                ).toFixed(2);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  ADISCHANGE(eve, item) {
    let NewAMT = 0;
    let FinalADIS = 0;
    for (let i = 0; i < item.GRID_DATA.length; i++) {
      for (let j = 0; j < this.rowData.length; j++) {
        if (
          item.GRID_DATA[i].PTAG === "Total" &&
          item.SRNO === this.rowData[j].SRNO
        ) {
          NewAMT = item.GRID_DATA[i].AMT;
          if (parseFloat(item.ADIS)) {
            let FINAL = (parseFloat(item.ADIS) / 100) * NewAMT;
            FinalADIS = NewAMT + FINAL;
            this.rowData[j].FAMT = FinalADIS.toFixed(2);
            this.rowData[j].FBID = (
              FinalADIS / this.rowData[j].I_CARAT
            ).toFixed(2);
          } else {
            this.rowData[j].FAMT = NewAMT.toFixed(2);
            this.rowData[j].FBID = (NewAMT / this.rowData[j].I_CARAT).toFixed(
              2
            );
          }
        }
      }
    }
  }

  Save(item) {
    if (!this.ISFINDRAP) {
      return;
    }

    if (!item.I_CARAT) {
      return this.toastr.warning("Rough Carat Is Requiere");
    }
    let NewData = item.GRID_DATA;

    let SubData = [];

    for (let i = 0; i < NewData.length; i++) {
      if (NewData[i].PTAG !== "Total") {
        SubData.push(NewData[i]);
      }
    }
    let ConditionArray = [];
    for (let i = 0; i < SubData.length; i++) {
      if (
        SubData[i].S_CODE ||
        SubData[i].C_CODE ||
        SubData[i].Q_CODE ||
        parseFloat(SubData[i].CARAT) ||
        SubData[i].LB_CODE
      ) {
        if (
          !SubData[i].S_CODE ||
          !SubData[i].C_CODE ||
          !SubData[i].Q_CODE ||
          !parseFloat(SubData[i].CARAT) ||
          !SubData[i].CT_CODE ||
          !SubData[i].FL_CODE ||
          !SubData[i].LB_CODE ||
          !SubData[i].IN_CODE ||
          !SubData[i].ML_CODE ||
          !SubData[i].SH_CODE ||
          !SubData[i].RAPTYPE ||
          !SubData[i].REF_CODE
        ) {
          if (!SubData[i].S_CODE) {
            ConditionArray.push("Shape");
          } else if (!SubData[i].C_CODE) {
            ConditionArray.push("Color");
          } else if (!SubData[i].Q_CODE) {
            ConditionArray.push("Clarity");
          } else if (!parseFloat(SubData[i].CARAT)) {
            ConditionArray.push("Carat");
          } else if (!SubData[i].CT_CODE) {
            ConditionArray.push("Cut");
          } else if (!SubData[i].FL_CODE) {
            ConditionArray.push("Fluorescence");
          } else if (!SubData[i].LB_CODE) {
            ConditionArray.push("Lab");
          } else if (!SubData[i].IN_CODE) {
            ConditionArray.push("Inclusion");
          } else if (!SubData[i].ML_CODE) {
            ConditionArray.push("Milky");
          } else if (!SubData[i].SH_CODE) {
            ConditionArray.push("Shades");
          } else if (!SubData[i].RAPTYPE) {
            ConditionArray.push("Raptype");
          } else if (!SubData[i].REF_CODE) {
            ConditionArray.push("Reflection");
          }
          return this.toastr.warning(ConditionArray[0] + " " + "is  Missing");
        }
      }
    }

    let saveOBJ1 = {
      COMP_CODE: item.COMP_CODE,
      DETID: item.DETID,
      SRNO: item.SRNO ? item.SRNO : 0,
      RESRVE: item.RESRVE ? item.RESRVE : 0,
      PERCTS: item.PERCTS ? item.PERCTS : 0,
      SRW: item.SRW ? item.SRW : "",
      FL_CODE: item.FL_CODE ? item.FL_CODE : 0,
      FBID: item.FBID ? item.FBID : 0,
      T_CODE: item.T_CODE ? item.T_CODE : "",
      LS: item.LS ? item.LS : 0,
      FFLAT1: item.FFLAT1 ? item.FFLAT1 : "",
      FFLAT2: item.FFLAT2 ? item.FFLAT2 : "",
      FMED: item.FMED ? item.FMED : "",
      FHIGH: item.FHIGH ? item.FHIGH : "",
      RFLAT1: item.RFLAT1 ? item.RFLAT1 : "",
      RFLAT2: item.RFLAT2 ? item.RFLAT2 : "",
      RMED: item.RMED ? item.RMED : "",
      RHIGH: item.RHIGH ? item.RHIGH : "",
      MFLFLAT1: item.MFLFLAT1 ? item.MFLFLAT1 : "",
      MFLFLAT2: item.MFLFLAT2 ? item.MFLFLAT2 : "",
      MFLMED: item.MFLMED ? item.MFLMED : "",
      MFLHIGH: item.MFLHIGH ? item.MFLHIGH : "",
      FLNFLAT1: item.FLNFLAT1 ? item.FLNFLAT1 : "",
      FLNFLAT2: item.FLNFLAT2 ? item.FLNFLAT2 : "",
      FLNMED: item.FLNMED ? item.FLNMED : "",
      FLNHIGH: item.FLNHIGH ? item.FLNHIGH : "",
      CFLAT1: item.CFLAT1 ? item.CFLAT1 : "",
      CFLAT2: item.CFLAT2 ? item.CFLAT2 : "",
      CMED: item.CMED ? item.CMED : "",
      CHIGH: item.CHIGH ? item.CHIGH : "",
      DNC_CODE: item.DNC_CODE ? item.DNC_CODE : 0,
      I1C_CODE: item.I1C_CODE ? item.I1C_CODE : 0,
      I2C_CODE: item.I2C_CODE ? item.I2C_CODE : 0,
      I3C_CODE: item.I3C_CODE ? item.I3C_CODE : 0,
      RC_CODE: item.RC_CODE ? item.RC_CODE : 0,
      R1C_CODE: item.R1C_CODE ? item.R1C_CODE : 0,
      R2C_CODE: item.R2C_CODE ? item.R2C_CODE : 0,
      FC_CODE: item.FC_CODE ? item.FC_CODE : 0,
      F1C_CODE: item.F1C_CODE ? item.F1C_CODE : 0,
      F2C_CODE: item.F2C_CODE ? item.F2C_CODE : 0,
      PUSER: this.decodedTkn.UserId,
      TEN_NAME: item.TEN_NAME,
      ADIS: item.ADIS ? item.ADIS : 0,
      FAMT: item.FAMT ? item.FAMT : 0,
      UUSER1: item.UUSER1 ? item.UUSER1 : "",
      UUSER2: item.UUSER2 ? item.UUSER2 : "",
      UUSER3: item.UUSER3 ? item.UUSER3 : "",
      BVCOMMENT: item.BVCOMMENT ? item.BVCOMMENT : "",
      I_CARAT: item.I_CARAT ? item.I_CARAT : 0,
      ISBV: this.decodedTkn.UserId === "DN" ? 1 : item.ISBV,
    };
    this.spinner.show();
    this.ParcelEntServ.TendarResParcelSave(saveOBJ1).subscribe((SaveRes) => {
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
        T_DATE: SubData[i].T_DATE ? SubData[i].T_DATE : null,
        SRNO: SubData[i].SRNO ? SubData[i].SRNO : 0,
        PLANNO: SubData[i].PLANNO ? SubData[i].PLANNO : 0,
        PTAG: SubData[i].PTAG ? SubData[i].PTAG : "",
        I_CARAT: item.I_CARAT ? item.I_CARAT : 0,
        S_CODE: SubData[i].S_CODE ? SubData[i].S_CODE : "",
        C_CODE: SubData[i].C_CODE ? SubData[i].C_CODE : 0,
        Q_CODE: SubData[i].Q_CODE ? SubData[i].Q_CODE : 0,
        CARAT: SubData[i].CARAT ? SubData[i].CARAT : 0,
        CT_CODE: SubData[i].CT_CODE ? SubData[i].CT_CODE : 0,
        FL_CODE: SubData[i].FL_CODE ? SubData[i].FL_CODE : 0,
        LB_CODE: SubData[i].LB_CODE ? SubData[i].LB_CODE : "",
        IN_CODE: SubData[i].IN_CODE ? SubData[i].IN_CODE : 0,
        ADNO: SubData[i].ADNO ? SubData[i].ADNO : 0,
        PLNSEL: SubData[i].PLNSEL,
        RTYPE: SubData[i].RTYPE ? SubData[i].RTYPE : "",
        ORAP: SubData[i].ORAP ? SubData[i].ORAP : 0,
        RATE: SubData[i].RATE ? SubData[i].RATE : 0,
        OTAG: SubData[i].OTAG ? SubData[i].OTAG : "",
        IUSER: this.decodedTkn.UserId,
        ML_CODE: SubData[i].ML_CODE ? SubData[i].ML_CODE : 0,
        DEP_CODE: SubData[i].DEP_CODE ? SubData[i].DEP_CODE : 0,
        RAT_CODE: SubData[i].RAT_CODE ? SubData[i].RAT_CODE : 0,
        GRD_CODE: SubData[i].GRD_CODE ? SubData[i].GRD_CODE : 0,
        MPER: SubData[i].MPER ? SubData[i].MPER : 0,
        SH_CODE: SubData[i].SH_CODE ? SubData[i].SH_CODE : 0,
        REF_CODE: SubData[i].REF_CODE ? SubData[i].REF_CODE : 0,
        RAPTYPE: SubData[i].RAPTYPE ? SubData[i].RAPTYPE : "",
      };
      PerArr.push(SaveObj);
    }
    this.spinner.show();
    this.TendarEstServ.TendarPrdDetSave(PerArr).subscribe((SaveRes) => {
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

  trackByFn(index, item) {
    return index;
  }

  TableDateFormat(value) {
    console.log(value);
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
    if (!tableRow.Q_CODE) {
      return;
    }
    if (!tableRow.C_CODE) {
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
    if (!tableRow.LB_CODE) {
      return;
    }
    if (!tableRow.IN_CODE) {
      return;
    }
    if (!tableRow.ML_CODE) {
      return;
    }
    this.ISFINDRAP = false;

    let RapObj = {
      S_CODE: tableRow.S_CODE,
      Q_CODE: tableRow.Q_CODE,
      C_CODE: tableRow.C_CODE,
      CARAT: tableRow.CARAT,
      CUT_CODE: tableRow.CT_CODE,
      FL_CODE: tableRow.FL_CODE,
      IN_CODE: tableRow.IN_CODE,
      RTYPE: tableRow.LB_CODE,
      MPER: tableRow.MPER,
      ML_CODE: tableRow.ML_CODE,
      SH_CODE: tableRow.SH_CODE,
      REF_CODE: tableRow.REF_CODE,
      RAPTYPE: tableRow.RAPTYPE,
    };
    this.TendarEstServ.FindRap(RapObj).then((RapRes) => {
      try {
        this.ISFINDRAP = true;
        let gridCaratSum = Item.GRID_DATA.filter(
          (item) => item.PTAG != "Total"
        ).reduce((acc, val) => {
          return acc + (val.CARAT ? parseFloat(val.CARAT) : 0);
        }, 0);

        if (Item.I_CARAT < gridCaratSum) {
          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].SRNO == Item.SRNO) {
              for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
                if (
                  this.rowData[i].GRID_DATA[j].PTAG == tableRow.PTAG &&
                  this.rowData[i].GRID_DATA[j].PLANNO == tableRow.PLANNO
                ) {
                  this.rowData[i].GRID_DATA[j].CARAT = 0.0;
                  break;
                }
              }
            }
          }
          this.toastr.warning("Your Carat Was Greater Than Weight");
        }

        gridCaratSum = Item.GRID_DATA.filter(
          (item) => item.PTAG != "Total"
        ).reduce((acc, val) => {
          return acc + (val.CARAT ? parseFloat(val.CARAT) : 0);
        }, 0);

        for (let i = 0; i < this.rowData.length; i++) {
          if (this.rowData[i].SRNO == Item.SRNO) {
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
          if (this.rowData[i].SRNO == Item.SRNO) {
            for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
              if (
                this.rowData[i].GRID_DATA[j].PTAG == tableRow.PTAG &&
                this.rowData[i].GRID_DATA[j].PLANNO == tableRow.PLANNO
              ) {
                this.rowData[i].GRID_DATA[j].ORAP = RapRes.data[0][0].AMT;
                this.rowData[i].GRID_DATA[j].RATE = RapRes.data[1][0][""];
                this.rowData[i].GRID_DATA[j].RTYPE = RapRes.data[2][0][""];
                this.rowData[i].GRID_DATA[j].AMT = this.rowData[i].GRID_DATA[j].RATE * this.rowData[i].GRID_DATA[j].CARAT;
                this.rowData[i].GRID_DATA[j].DRATE =this.rowData[i].GRID_DATA[j].RATE - (this.rowData[i].GRID_DATA[j].RATE * parseFloat(this.rowData[i].GRID_DATA[j].D_DIS)) / 100;
                this.rowData[i].GRID_DATA[j].DAMT = this.rowData[i].GRID_DATA[j].DRATE * this.rowData[i].GRID_DATA[j].CARAT;
                this.rowData[i].GRID_DATA[j].PER =100 -(this.rowData[i].GRID_DATA[j].RATE /  this.rowData[i].GRID_DATA[j].ORAP) *  100;
                break;
              }
            }
          }
        }

        let NewAmtSum = 0;
        let NewAmtDSum = 0;
        for (let i = 0; i < this.rowData.length; i++) {
          for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
            if (
              this.rowData[i].GRID_DATA[j].SRNO === Item.SRNO &&
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
            }
          }
        }
        let ADISDIS;
        for (let i = 0; i < this.rowData.length; i++) {
          for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
            if (
              this.rowData[i].GRID_DATA[j].SRNO === Item.SRNO &&
              this.rowData[i].GRID_DATA[j].PTAG == "Total"
            ) {
              this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
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

        let NewAmt = 0;
        let NewCrt = 0;

        for (let i = 0; i < this.rowData.length; i++) {
          for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
            if (this.rowData[i].GRID_DATA[j].PTAG === "Total") {
              NewAmt += parseFloat(this.rowData[i].GRID_DATA[j].AMT);
              NewCrt += parseFloat(this.rowData[i].GRID_DATA[j].CARAT);
            }
          }
        }
        if (!this.TDIS) {
          this.AMT = NewAmt.toFixed(0);
          this.DAMT = NewAmt.toFixed(0);
          this.CARAT = NewCrt.toFixed(2);
          this.RATE = (this.AMT / this.CARAT).toFixed(2);
          this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
          this.DRCTS = (this.DAMT / this.I_CARAT).toFixed(0);
          this.RTOP = ((this.CARAT / this.I_CARAT) * 100).toFixed(2);
        } else {
          let NewValue = (this.TDIS / 100) * NewAmt;
          let FinalValue = NewAmt + NewValue;
          this.AMT = FinalValue.toFixed(0);
          this.DAMT = NewAmt.toFixed(0);
          this.RATE = (this.AMT / this.CARAT).toFixed(2);
          this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
          this.DRCTS = (this.DAMT / this.I_CARAT).toFixed(0);
          this.RTOP = ((this.CARAT / this.I_CARAT) * 100).toFixed(2);
        }
      } catch (error) {
        console.log(error);
        this.toastr.warning(JSON.stringify(error));
      }
    });
  }

  findMPerCalc(tableRow, Item) {
    console.log("tableRow", tableRow);
    console.log("Item", Item);

    if (
      parseFloat(tableRow.MPER) >= tableRow.PER + 10 ||
      parseFloat(tableRow.MPER) <= tableRow.PER - 10
    ) {
      Swal.fire({
        title: "Are you Sure You Want To Update",
        icon: "question",
        customClass: {
          popup: "swal-height",
        },
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
        } else {
          for (let i = 0; i < this.rowData.length; i++) {
            if (this.rowData[i].SRNO == Item.SRNO) {
              for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
                if (
                  this.rowData[i].GRID_DATA[j].PTAG == tableRow.PTAG &&
                  this.rowData[i].GRID_DATA[j].PLANNO == tableRow.PLANNO
                ) {
                  this.rowData[i].GRID_DATA[j].MPER = 0.0;
                  break;
                }
              }
            }
          }
        }
      });
    }

    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (
          this.rowData[i].GRID_DATA[j].SRNO === tableRow.SRNO &&
          this.rowData[i].GRID_DATA[j].PTAG == tableRow.PTAG
        ) {
          this.rowData[i].GRID_DATA[j].MPER = tableRow.MPER;
        }
      }
    }
    let FinalArray = [];
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (
          this.rowData[i].GRID_DATA[j].SRNO === tableRow.SRNO &&
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
        }
      }
    }
    let NewAmtSum = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (
          this.rowData[i].GRID_DATA[j].SRNO === tableRow.SRNO &&
          this.rowData[i].GRID_DATA[j].PTAG !== "Total"
        ) {
          NewAmtSum += this.rowData[i].GRID_DATA[j].AMT;
        }
      }
    }
    let ADISDIS = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (
          this.rowData[i].GRID_DATA[j].SRNO === tableRow.SRNO &&
          this.rowData[i].GRID_DATA[j].PTAG == "Total"
        ) {
          this.rowData[i].GRID_DATA[j].AMT = NewAmtSum;
          this.rowData[i].GRID_DATA[j].RATE =
            NewAmtSum / this.rowData[i].GRID_DATA[j].CARAT;
          let FINAL = (parseFloat(this.rowData[i].ADIS) / 100) * NewAmtSum;

          if (!FINAL) {
            FINAL = 0;
          }
          ADISDIS = NewAmtSum + FINAL;
          this.rowData[i].FAMT = ADISDIS.toFixed(2);
          this.rowData[i].FBID = (ADISDIS / this.rowData[i].I_CARAT).toFixed(2);
          FinalArray.push(this.rowData[i].GRID_DATA[j]);
        } else {
          FinalArray.push(this.rowData[i].GRID_DATA[j]);
        }
      }
    }

    let Newarray = [];
    let NewAmt = 0;
    let NewCrt = 0;

    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (this.rowData[i].GRID_DATA[j].PTAG === "Total") {
          Newarray.push(this.rowData[i].GRID_DATA[j]);
          NewAmt += parseFloat(this.rowData[i].GRID_DATA[j].AMT);
          NewCrt += parseFloat(this.rowData[i].GRID_DATA[j].CARAT);
        }
      }
    }
    this.AMT = NewAmt.toFixed(0);
    this.CARAT = NewCrt.toFixed(2);

    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT) * 100).toFixed(2);
  }

  TdisChange() {
    let NewAmt = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData[i].GRID_DATA.length; j++) {
        if (this.rowData[i].GRID_DATA[j].PTAG === "Total") {
          NewAmt += parseFloat(this.rowData[i].GRID_DATA[j].AMT);
        }
      }
    }
    let NewValue = (this.TDIS / 100) * NewAmt;
    let FinalValue = NewAmt + NewValue;
    this.AMT = FinalValue.toFixed(0);

    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT) * 100).toFixed(2);
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

  DbClick(eve) {
    if (eve.ISCOL == 1) {
      this.ViewServ.StoneidSellDet({
        S_NAME: eve.S_CODE ? eve.S_CODE : "",
        C_NAME: eve.C_CODE ? eve.C_CODE : "",
        Q_NAME: eve.Q_CODE ? eve.Q_CODE : "",
        CARAT: eve.CARAT ? eve.CARAT : 0,
        LAB: eve.LB_CODE ? eve.LB_CODE : "",
        TYPE: "BV",
      }).subscribe((FillRes) => {
        try {
          if (FillRes.success == true) {
            const DresPrdtype = {
              Res: FillRes.data,
              DRes: FillRes,
            };
            const dialogRef = this.dialog.open(StoneidPopupComponent, {
              panelClass: "marker-acc-view-det-dialog",
              autoFocus: false,
              width: "34%",
              height: "calc(100vh - 16%)",
              disableClose: true,
              data: DresPrdtype,
            });

            $("#Close").click();
            dialogRef.afterClosed().subscribe((result) => {});
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
  }
}
