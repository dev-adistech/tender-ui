import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import PerfectScrollbar from "perfect-scrollbar";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import { RapMastService } from "src/app/Service/Rap/rap-mast.service";
import { LoginService } from "src/app/Service/Utility/login.service";
import { ViewService } from "src/app/Service/View/view.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { RapCalcService } from "../../../Service/Rap/rap-calc.service";
import { ListboxComponent } from "../../Common/listbox/listbox.component";
// import { BrkEntComponent } from "../../Transaction/brk-ent/brk-ent.component";
// import { MakHistoryPopUPComponent } from "../../Transaction/mak-history/mak-history-comPopUp/mak-history-pop-up.component/mak-history-pop-up.component";
import { AgGridAutoCompleteComponent } from "../../_helpers/ag-grid-auto-complete.component";
import { FrmOpePer } from "../../_helpers/frm-ope-per";
import { AutocompleteFunctions } from "../../_helpers/functions/AutocompleteFunction";
import { RapCalModalComponent } from "./rap-cal-modal/rap-cal-modal.component";
import { RapCalcTenderEntryComponent } from "./rap-calc-tender-entry/rap-calc-tender-entry.component";
import { RapExcelComponent } from "./rap-excel/rap-excel.component";
import { GridOptions } from "ag-grid-community";
import { BioDataMastService } from "src/app/Service/Master/bio-data-mast.service";
import { TendarEstService } from "src/app/Service/Rap/tendar-est.service";
// import * as $ from 'jquery';
declare var $: any;
export interface Emp {
  name: string;
  code: string;
}
export interface deleteLot {
  CODE: string;
}
export interface Depth {
  name: string;
  code: string;
}
export interface Diameter {
  name: string;
  code: string;
}
export interface Table {
  name: string;
  code: string;
}
export interface Ratio {
  name: string;
  code: string;
}
@Component({
  selector: "app-rap-cal",
  templateUrl: "./rap-cal.component.html",
  styleUrls: ["./rap-cal.component.css"],
})
export class RapCalComponent implements OnInit {
  public url = environment.BaseUrl;
  public port = environment.PORT;

  @ViewChild("srno") RAPCALCSRNO: ElementRef;
  @ViewChild("tag") RAPCALCTAG: ElementRef;
  @ViewChild("grid") myGrid: jqxGridComponent;
  @ViewChild("Import") Import: any;
  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete1: MatAutocompleteTrigger;

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );


  ALLOWINS: boolean = false;
  ALLOWDEL: boolean = false;
  ALLOWUPD: boolean = false;
  PASS: any = "";
  PER = [];
  hide = true;
  PASSWORD: any = "";

  deleteEnable: boolean = false;

  ISCOMM: boolean = false;
  colortrue: boolean = false;
  colortrue1: boolean = false;

  claritytrue: boolean = false;
  claritytrue1: boolean = false;

  empCtrl: FormControl;
  filteredemps: Observable<any[]>;
  EMP_CODE: any = "";
  emps: Emp[] = [];
  empName: any = "";

  oldGridData: any = [];

  vCtrl: FormControl;
  filteredVs: Observable<any[]>;
  versionArray: Emp[] = [];

  lotCtrl: FormControl;
  filteredLots: Observable<any[]>;
  lotArray: Emp[] = [];

  lotnameCtrl: FormControl;

  TENDfilteredLots: Observable<any[]>;
  TENDlotArr: Emp[] = [];

  depthCtrl: FormControl;
  filtereddepths: Observable<any[]>;
  DEPTH: any = "";
  deptharray: Depth[] = [];
  DEPTHNAME: any = "";

  diameterCtrl: FormControl;
  filtereddiameters: Observable<any[]>;
  DIAMETER: any = "";
  diameterarray: Diameter[] = [];
  DIAMETERNAME: any = "";

  tableCtrl: FormControl;
  filteredtables: Observable<any[]>;
  TABLE: any = "";
  tablearray: Table[] = [];
  TABLENAME: any = "";

  ratioCtrl: FormControl;
  filteredratios: Observable<any[]>;
  RATIO: any = "";
  ratioarray: Ratio[] = [];
  RATIONAME: any = "";

  grpCtrl: FormControl;
  filteredGrps: Observable<any[]>;
  GrpArr: Emp[] = [];

  TenColCtrl: FormControl;
  FilterTenCol: Observable<any[]>
  TenColArr: Emp[] = [];

  YAHUCtrl: FormControl;
  FilterYahu: Observable<any[]>
  YahuArr: Emp[] = [];

  SPECTMCtrl: FormControl;
  FilterSpect: Observable<any[]>
  SpectArr: Emp[] = [];

  NdCtrl: FormControl;
  FilterNd: Observable<any[]>
  NdArr: Emp[] = [];

  YahudaFloCtrl: FormControl;
  FilterYahudaFlo: Observable<any[]>
  YahudaFloArr: Emp[] = [];

  TenFloCtrl: FormControl;
  FilterTenFlo: Observable<any[]>
  TenFloArr: Emp[] = [];

  NDFLOCtrl: FormControl;
  FilterNDFlo: Observable<any[]>;
  NDFloArr: Emp[] = [];

  TENQUACTRL: FormControl;
  FilterTENQUA: Observable<any[]>;
  TENQUAaRR: Emp[] = [];

  NDQUACTRL: FormControl;
  FilterNDQUA: Observable<any[]>;
  NDQUAarr: Emp[] = [];

  MBOXQUACtrl: FormControl;
  FilterMBOXQUA: Observable<any[]>;
  MBOXQUAarr: Emp[] = [];

  currentNumber = "0";
  firstOperand = null;
  waitForSecondNumber = false;
  validationrap = true;
  CAT_P: boolean = false;
  CAT_ELSE: boolean = true;

  COL_REMP: boolean = false;
  COL_REMM: boolean = false;
  QUA_REMP: boolean = false;
  QUA_REMM: boolean = false;

  ShOWGRD: boolean = false;

  PARAMCHIP: any = "";
  Rapdisable: boolean = false;

  COLREM: any = "";
  QUAREM: any = "";

  V_CODE: any = "";
  L_CODE: any = "";
  L_NAME: any = "";
  QPAMTCOL: any = "";
  QMAMTCOL: any = "";
  CPAMTCOL: any = "";
  CMAMTCOL: any = "";
  TAG: any = "A";
  SRNO: any = 0;
  input: any = "0";
  RAPARR: any = "";
  RAPTYPE: any = "";
  ROUCARAT: any = "";
  I_PCS: any = 1;
  R_CARAT: any = 0;
  SIZE_P: any = 0;
  SIZE_VISI: boolean = false;
  POLCARAT: any = 0;
  PERCARAT: any = 0;
  NETPER: any = 0;
  ADIS: any = 0;
  TOTAMT: any = 0;

  ISAUTO: boolean = false;

  TENDER_COL: any = ''
  TENCOLNAME: any = ''
  YAHU_COL: any = ''
  YAHU_NAME: any = ''
  SPECTREM_COL: any = ''
  SPECTREMNAME: any = ''
  ND_COL: any = ''
  NDNAME: any = ''

  YAHUDA_FLO: any = ''
  YAHUDA_FLONAME: any = ''
  TEN_FLO: any = ''
  TEN_FLO_NAME: any = ''

  ND_FLO: any = ''
  NDFLONAME: any = ''

  TEN_QUA: any = ""
  TENQUANAME: any = ""
  ND_QUA: any = ""
  NDQUANAME: any = ""
  MBOX_QUA: any = ""
  MBOXQUANAME: any = ""

  CUTBUTTONVIS: boolean = true;
  PRDDIA: any = "";
  PRDDEPTH: any = "";
  PRDRAT: any = "";
  PRDTAB: any = "";
  PARAMBTNDIACOL: boolean = false;
  PARAMBTNDEPTHCOL: boolean = false;
  PARAMBTNRATCOL: boolean = false;
  PARAMBTNTABCOL: boolean = false;

  SIZE: boolean = true;

  shapeArray = [];
  clarityArray = [];
  colorArray = [];
  PLANGRIDARR = [];
  cutArray = [];
  polArray = [];
  symArray = [];
  floArray = [];
  rapArray = [];
  shadeArray = [];
  shadeArray1 = [];
  crownOpenArray = [];
  culetArray = [];
  extraFacetArray = [];
  SizeGridArray = [];
  eyeCleanArray = [];
  gridleOpenArray = [];
  grainingArray = [];
  lusterArray = [];
  milkyArray = [];
  naturalArray = [];
  pavOpenArray = [];
  sideArray = [];
  sideBlackArray = [];
  sideOpenArray = [];
  tableArray = [];
  tableBlackArray = [];
  tableOpenArray = [];
  TagArray = [];
  RemarkArray = [];
  TensionArray = [];
  MCColorArray = [];
  RegArray = [];
  RSpotArray = [];
  RAPTArray = [];
  MANPRICEGIAARR = [];
  MANPRICELOOSEARR = [];
  MANPRICEIGIARR = [];

  disabled = false;
  calcDisabled = false;
  clarityDisabled = false;
  colordisabled = false;
  tagdisabled = false;
  EmpDisabled = false;
  cutDisabled = false;

  Makok: any = "";

  clarityCheck = false;

  ROU_PCS: boolean = false;
  R_CARATVISI: boolean = false;

  DISABLELOTSRNO: boolean = false;
  ENABLEREMARK: boolean = true;

  toggleVideoDelete: boolean = false;
  toggleVideoDeleteButton: boolean = true;
  lotDeleteCtrl: FormControl;
  filteredDeleteLots: Observable<any[]>;
  lotDeleteArray: deleteLot[] = [];
  DELETE_L_CODE = "";
  FSRNO: any = 0;
  TSRNO: any = 0;

  TENDAR_DISParr: any;
  TEN_DISP_COL: boolean = false;
  TEN_DISP_QUA: boolean = false;
  TEN_DISP_LDEL: boolean = false;
  TEN_DISP_LNAM: boolean = false;
  showGRDBtn: boolean = false;

  TEN_DISP_TAG: boolean = false;

  public gridOptions: GridOptions;

  FILEOPEN:boolean =false
  FILENAME:any=''

  WHincArr: any;


  PlanArray = [
    { name: 1, selected: false },
    { name: 2, selected: false },
    { name: 3, selected: false },
    { name: 4, selected: false },
    { name: 5, selected: false },
    { name: 6, selected: false },
    { name: 7, selected: false },
    { name: 8, selected: false },
    { name: 9, selected: false },
    { name: 10, selected: false },
    { name: 11, selected: false },
    { name: 12, selected: false },
    { name: 13, selected: false },
    { name: 14, selected: false },
    { name: 15, selected: false },
    { name: 16, selected: false },
    { name: 17, selected: false },
    { name: 18, selected: false },
    { name: 19, selected: false },
    { name: 20, selected: false },
    { name: 21, selected: false },
    { name: 22, selected: false },
    { name: 23, selected: false },
    { name: 24, selected: false },
    { name: 25, selected: false },
    { name: 26, selected: false },
    { name: 27, selected: false },
    { name: 28, selected: false },
    { name: 29, selected: false },
    { name: 30, selected: false },
    { name: 31, selected: false },
    { name: 32, selected: false },
    { name: 33, selected: false },
    { name: 34, selected: false },
    { name: 35, selected: false },
    { name: 36, selected: false },
    { name: 37, selected: false },
    { name: 38, selected: false },
    { name: 39, selected: false },
    { name: 40, selected: false },
    { name: 41, selected: false },
    { name: 42, selected: false },
    { name: 43, selected: false },
    { name: 44, selected: false },
    { name: 45, selected: false },
    { name: 46, selected: false },
    { name: 47, selected: false },
    { name: 48, selected: false },
    { name: 49, selected: false },
    { name: 50, selected: false },
  ];
  DIAMArray = [];
  TABELArray = [];
  RATIOArray = [];
  VIEWPERARR = [];

  public PricecolumnDefs;
  public PricegridApi;
  public PricegridColumnApi;
  public PricedefaultColDef;

  public SizecolumnDefs;
  public SizegridApi;
  public SizegridColumnApi;
  public SizedefaultColDef;
  public SizerowSelection;

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public rowSelection;

  public MaincolumnDefs;
  public MaingridApi;
  public MaingridColumnApi;
  public MaindefaultColDef;
  public getRowStyle;
  public frameworkComponents;

  public searchcolumnDefs;
  public searchgridApi;
  public searchgridColumnApi;
  public searchdefaultColDef;
  public searchrowSelection;


  public enableRangeSelection = this.ShOWGRD ? false : true;

  constructor(
    private EncrDecrServ: EncrDecrService,
    private RapCalcServ: RapCalcService,
    private ViewParaMastServ: ViewParaMastService,
    private toastr: ToastrService,
    private ViewServ: ViewService,
    private spinner: NgxSpinnerService,
    private RapMastServ: RapMastService,
    public dialog: MatDialog,
    private LoginServ: LoginService,
    private elementRef: ElementRef,
    private _FrmOpePer: FrmOpePer,
    private datepipe: DatePipe,
    private autocomplete: AutocompleteFunctions,
    private http: HttpClient,
    private BioDataMastServ: BioDataMastService,
    private TendarEstServ: TendarEstService,
  ) {
    this.frameworkComponents = {
      autoComplete: AgGridAutoCompleteComponent,
    };
    //VIEW PARA MAIN GRID
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "FrmRapCalc" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let temp = [];
            for (let i = 0; i < VPRes.data.length; i++) {
              if (VPRes.data[i].FIELDNAME == "PLNSEL") {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  cellRenderer: (params) => {
                    let a = '<span class="det_val">';
                    if (params.data.PLNSEL == true) {
                      return '<input type="checkbox" data-action-type="IS_VIW" checked >';
                    } else {
                      return '<input type="checkbox" data-action-type="IS_VIW">';
                    }
                  },
                });
                // temp.push({
                //   headerName: "Action",
                //   headerClass: "center",
                //   field: "Action",
                //   // width: '50',
                //   width: this.getActionColumnWidth(),
                //   cellStyle: { "text-align": "center" },
                //   resizable: true,
                //   // hide: VPRes.data[i].DISP == false ? true : false,
                //   cellRenderer: (params) => {
                //     let a =
                //       '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i> ';
                //     // if (this.decodedTkn.U_CAT === "P") {
                //     //   a =
                //     //     a +
                //     //     '<i class="icon-edit grid-icon" data-action-type="TenderData" style="cursor: pointer;margin-right: 5px;" ></i>';
                //     // }
                //     return a;
                //   },
                //   // a = a + '</span>';
                //   // if (this.decodedTkn.U_CAT === 'P') {
                //   //   return '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i> '
                //   // } else {
                //   //   return '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i>'
                //   // }
                //   // },
                // });
              } else if (VPRes.data[i].FIELDNAME == "PRDCARAT") {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  cellRenderer: function (params) {
                    if (!params.value) {
                      params.value = 0;
                    }
                    return parseFloat(params.value).toFixed(2);
                  },
                });
              } else if (
                VPRes.data[i].FIELDNAME == "QPAMT" ||
                VPRes.data[i].FIELDNAME == "QMAMT" ||
                VPRes.data[i].FIELDNAME == "CPAMT" ||
                VPRes.data[i].FIELDNAME == "CMAMT" ||
                VPRes.data[i].FIELDNAME == "RRATE" ||
                VPRes.data[i].FIELDNAME == "RAMT" ||
                VPRes.data[i].FIELDNAME == "SRATE" ||
                VPRes.data[i].FIELDNAME == "IGIRATE" ||
                VPRes.data[i].FIELDNAME == "SAMT" ||
                VPRes.data[i].FIELDNAME == "RATE" ||
                VPRes.data[i].FIELDNAME == "IGIAMT" ||
                VPRes.data[i].FIELDNAME == "AMT"
              ) {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  cellRenderer: function (params) {
                    if (!params.value) {
                      params.value = 0;
                    }
                    return parseFloat(params.value).toFixed(0);
                  },
                });
              // } 
              // else if (
              //   this.decodedTkn.U_CAT === "P" &&
              //   (VPRes.data[i].FIELDNAME == "DIA" ||
              //     VPRes.data[i].FIELDNAME == "DEP" ||
              //     VPRes.data[i].FIELDNAME == "RAT" ||
              //     VPRes.data[i].FIELDNAME == "COMENT" ||
              //     VPRes.data[i].FIELDNAME == "MC1" ||
              //     VPRes.data[i].FIELDNAME == "MC2" ||
              //     VPRes.data[i].FIELDNAME == "MC3" ||
              //     VPRes.data[i].FIELDNAME == "DN" ||
              //     VPRes.data[i].FIELDNAME == "E1" ||
              //     VPRes.data[i].FIELDNAME == "E2" ||
              //     VPRes.data[i].FIELDNAME == "E3" ||
              //     VPRes.data[i].FIELDNAME == "COL_REM" ||
              //     VPRes.data[i].FIELDNAME == "QUA_REM" ||
              //     VPRes.data[i].FIELDNAME == "I_PCS" ||
              //     VPRes.data[i].FIELDNAME == "R_CARAT"
              //   )
              // ) {
              //   temp.push({
              //     headerName: VPRes.data[i].DISPNAME,
              //     headerClass: VPRes.data[i].HEADERALIGN,
              //     field: VPRes.data[i].FIELDNAME,
              //     width: VPRes.data[i].COLWIDTH,
              //     cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
              //     resizable: VPRes.data[i].ISRESIZE,
              //     hide: false,
              //     editable: VPRes.data[i].FIELDNAME == "I_PCS" ? false : true,
              //   });
              // } else if (VPRes.data[i].FIELDNAME == 'ISIGI' && this.decodedTkn.U_CAT == "P") {
              //   temp.push({
              //     headerName: VPRes.data[i].DISPNAME,
              //     headerClass: VPRes.data[i].HEADERALIGN,
              //     field: VPRes.data[i].FIELDNAME,
              //     width: VPRes.data[i].COLWIDTH,
              //     cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
              //     resizable: VPRes.data[i].ISRESIZE,
              //     hide: false,
              //     cellRenderer: (params) => {
              //       if (params.data.ISIGI) {
              //         return '<input type="checkbox" data-action-type="ISIGI" checked >';
              //       } else {
              //         return '<input type="checkbox" data-action-type="ISIGI"  >';

              //       }
              //     }
              //     // editable: VPRes.data[i].FIELDNAME == "I_PCS" ? false : true,
              //   });
              // }

              //  } else if (VPRes.data[i].FIELDNAME == "REM") {
              //   if (this.decodedTkn.U_CAT !== "P") {
              //     temp.push({
              //       headerName: VPRes.data[i].DISPNAME,
              //       headerClass: VPRes.data[i].HEADERALIGN,
              //       field: VPRes.data[i].FIELDNAME,
              //       width: VPRes.data[i].COLWIDTH,
              //       cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
              //       resizable: VPRes.data[i].ISRESIZE,
              //       hide: VPRes.data[i].DISP == false ? true : false,
              //       editable: true,
              //       cellEditor: "autoComplete",
              //       cellEditorParams: {
              //         propertyRendered: "code",
              //         returnObject: true,
              //         rowData: [],
              //         columnDefs: [
              //           {
              //             headerName: "Code",
              //             field: "code",
              //             width: 50,
              //             filter: true,
              //           },
              //         ],
              //       },
              //       valueFormatter: (params: any) => {
              //         if (params.value) return params.value.code;
              //         return "";
              //       },
              //     });
              //   }
              } else if (VPRes.data[i].FIELDNAME == "MC_NAME") {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  editable: true,
                  cellEditor: "autoComplete",
                  cellEditorParams: {
                    propertyRendered: "code",
                    returnObject: true,
                    rowData: [],
                    columnDefs: [
                      {
                        headerName: "Code",
                        field: "code",
                        width: 50,
                        filter: true,
                      },
                    ],
                  },
                  valueFormatter: (params: any) => {
                    if (params.value) return params.value.code;
                    return "";
                  },
                });
              // } else if (
              //   this.decodedTkn.U_CAT === "P" &&
              //   (VPRes.data[i].FIELDNAME == "PRDDEPTH" ||
              //     VPRes.data[i].FIELDNAME == "PRDDIA" ||
              //     VPRes.data[i].FIELDNAME == "PRDTAB" ||
              //     VPRes.data[i].FIELDNAME == "PRDRAT")
              // ) {
              //   temp.push({
              //     headerName: VPRes.data[i].DISPNAME,
              //     headerClass: VPRes.data[i].HEADERALIGN,
              //     field: VPRes.data[i].FIELDNAME,
              //     width: VPRes.data[i].COLWIDTH,
              //     cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
              //     resizable: VPRes.data[i].ISRESIZE,
              //     hide: true,
              //     editable: true,
              //     cellEditor: "autoComplete",
              //     cellEditorParams: {
              //       propertyRendered: "code",
              //       returnObject: true,
              //       rowData: [],
              //       columnDefs: [
              //         {
              //           headerName: "Code",
              //           field: "code",
              //           width: 50,
              //           filter: true,
              //         },
              //       ],
              //     },
              //     valueFormatter: (params: any) => {
              //       if (params.value) return params.value.code;
              //       return "";
              //     },
              //   });
              // } else if (
              //   this.decodedTkn.U_CAT === "P" &&
              //   VPRes.data[i].FIELDNAME == "TEN_NAME"
              // ) {
              //   temp.push({
              //     headerName: VPRes.data[i].DISPNAME,
              //     headerClass: VPRes.data[i].HEADERALIGN,
              //     field: VPRes.data[i].FIELDNAME,
              //     width: VPRes.data[i].COLWIDTH,
              //     cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
              //     resizable: VPRes.data[i].ISRESIZE,
              //     hide: false,
              //     editable: true,
              //     cellEditor: "autoComplete",
              //     cellEditorParams: {
              //       propertyRendered: "code",
              //       returnObject: true,
              //       rowData: [],
              //       columnDefs: [
              //         {
              //           headerName: "Code",
              //           field: "code",
              //           width: 50,
              //           filter: true,
              //         },
              //       ],
              //     },
              //     valueFormatter: (params: any) => {
              //       if (params.value) return params.value.code;
              //       return "";
              //     },
              //   });
              } else if (VPRes.data[i].FIELDNAME == "RELOCK") {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  cellRenderer: (params) => {
                    if (
                      this.decodedTkn.U_CAT == "S" ||
                      this.decodedTkn.U_CAT == "SA"
                    ) {
                      if (params.data.RELOCK === true) {
                        return '<input type="checkbox" data-action-type="RELOCK" checked >';
                      } else {
                        return '<input type="checkbox" data-action-type="RELOCK">';
                      }
                    } else {
                      if (params.data.RELOCK === true) {
                        return '<input type="checkbox" data-action-type="RELOCK" checked disabled>';
                      } else {
                        return '<input type="checkbox" data-action-type="RELOCK" >';
                      }
                    }
                  },
                });
              } else if (VPRes.data[i].FIELDNAME == "ISCOMMON") {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  cellRenderer: (params) => {
                    if (
                      (this.decodedTkn.U_CAT == "S" || this.decodedTkn.U_CAT == "SA") ||
                      (this.decodedTkn.DEPT_CODE == "POI" &&
                        (this.decodedTkn.PROC_CODE == 2 ||
                          this.decodedTkn.PROC_CODE == 23))
                    ) {
                      if (params.data.ISCOMMON) {
                        return '<input type="checkbox" data-action-type="ISCOMMON" checked >';
                      } else {
                        return '<input type="checkbox" data-action-type="ISCOMMON">';
                      }
                    } else {
                      if (params.data.RELOCK === true) {
                        return '<input type="checkbox" data-action-type="RELOCK" checked disabled>';
                      } else {
                        return '<input type="checkbox" data-action-type="RELOCK" disabled >';
                      }
                    }
                  },
                });
              } else if (VPRes.data[i].FIELDNAME == 'CUSER') {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                });
              }
              // else if(VPRes.data[i].FIELDNAME == 'I_PCS' && this.CAT_P ){
              //   temp.push({
              //     headerName: VPRes.data[i].DISPNAME,
              //     headerClass: VPRes.data[i].HEADERALIGN,
              //     field: VPRes.data[i].FIELDNAME,
              //     width: VPRes.data[i].COLWIDTH,
              //     cellStyle: { 'text-align': VPRes.data[i].CELLALIGN },
              //     resizable: VPRes.data[i].ISRESIZE,
              //     hide: false,
              //   })
              // }
              else {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  editable: VPRes.data[i].FIELDNAME == 'MC1' || VPRes.data[i].FIELDNAME == 'MC2' || VPRes.data[i].FIELDNAME == 'MC3' ? true : false
                });
              }
              if (
                VPRes.data[i].FIELDNAME != "PLANNO" &&
                VPRes.data[i].FIELDNAME != "PTAG"
              ) {
                temp[i].cellStyle = function (params) {
                  if (params.data.TYP == "S") {
                    return { background: "#b4ffb4" };
                  } else if (params.data.TYP == "R") {
                    return { background: "#FFFFFF" };
                  } else if (params.data.TYP == "OG") {
                    return { background: "#b4b4ff" };
                  } else if (params.data.TYP == "OL") {
                    return { background: "#ffb4b4" };
                  } else if (params.data.TYP == "I") {
                    return { background: "#5982ba" };
                  }
                };
              }
              if (VPRes.data[i].FIELDNAME == "QPAMT") {
                temp[i].cellStyle = function (params) {
                  if (
                    params.data.QPAMTCOL == "S" ||
                    params.data.QPAMTCOL == "OG"
                  ) {
                    return { "text-align": "center", background: "limegreen" };
                  } else if (
                    params.data.QPAMTCOL == "R" ||
                    params.data.QPAMTCOL == "OL"
                  ) {
                    return { "text-align": "center", background: "Tomato" };
                  }
                };
              }
              if (VPRes.data[i].FIELDNAME == "QMAMT") {
                temp[i].cellStyle = function (params) {
                  if (
                    params.data.QMAMTCOL == "S" ||
                    params.data.QMAMTCOL == "OG"
                  ) {
                    return { "text-align": "center", background: "limegreen" };
                  } else if (
                    params.data.QMAMTCOL == "R" ||
                    params.data.QMAMTCOL == "OL"
                  ) {
                    return { "text-align": "center", background: "Tomato" };
                  }
                };
              }
              if (VPRes.data[i].FIELDNAME == "CPAMT") {
                temp[i].cellStyle = function (params) {
                  if (
                    params.data.CPAMTCOL == "S" ||
                    params.data.CPAMTCOL == "OG"
                  ) {
                    return { "text-align": "center", background: "limegreen" };
                  } else if (
                    params.data.CPAMTCOL == "R" ||
                    params.data.CPAMTCOL == "OL"
                  ) {
                    return { "text-align": "center", background: "Tomato" };
                  }
                };
              }
              if (VPRes.data[i].FIELDNAME == "CMAMT") {
                temp[i].cellStyle = function (params) {
                  if (
                    params.data.CMAMTCOL == "S" ||
                    params.data.CMAMTCOL == "OG"
                  ) {
                    return { "text-align": "center", background: "limegreen" };
                  } else if (
                    params.data.CMAMTCOL == "R" ||
                    params.data.CMAMTCOL == "OL"
                  ) {
                    return { "text-align": "center", background: "Tomato" };
                  }
                };
              }

              if (VPRes.data[i].FIELDNAME == "PRDQ_CODE") {
                for (let j = 0; j < temp.length; j++) {
                  if (temp[j].field == "MAKVW") {
                    temp[j].cellStyle = function (params) {
                      if (params.data.MAKVW == "Extra") {
                        return {
                          "text-align": "center",
                          background: "#FF76F1",
                        };
                      } else if (params.data.MAKVW == "Brk") {
                        return {
                          "text-align": "center",
                          background: "#FF7043",
                        };
                      } else if (params.data.MAKVW == "Pending") {
                        return {
                          "text-align": "center",
                          background: "#FFFFFF",
                        };
                      } else if (params.data.MAKVW == "MakOk") {
                        return {
                          "text-align": "center",
                          background: "#C0FFFF",
                        };
                      } else {
                        return {
                          "text-align": "center",
                          background: "#A5D6A7",
                        };
                      }
                    };
                  }
                }
              }
            }
            this.rowSelection = "multiple";
            this.MaincolumnDefs = temp;
            this.MaindefaultColDef = {
              resizable: true,
              sortable: true,
              filter: true,
              suppressMenu: true,
            };
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

    //FOR LB & LC RENDER
    this.RAPTArray = this.decodedMast[27].map((item) => {
      return { code: item.RAPTYPE, name:item.RAPNAME};
    });
    // this.RapMastServ.RapTypeFill({ TYPE: "RAP", TABNAME: "" }).subscribe(
    //   (rapres) => {
    //     try {
    //       if (rapres.success == true) {
    //         this.RAPTArray = rapres.data.map((item) => {
    //           if (item.RAPNAME == rapres.data[0].RAPTYPE) {
    //             return {
    //               code: item.RAPTYPE,
    //               name: item.RAPNAME,
    //               selected: true,
    //             };
    //           } else {
    //             return {
    //               code: item.RAPTYPE,
    //               name: item.RAPNAME,
    //               selected: false,
    //             };
    //           }
    //         });

    //         this.RAPTYPE = rapres.data[0].RAPTYPE;
    //       } else {
    //         this.spinner.hide();
    //         this.toastr.warning("Something gone wrong while get LB/LC.");
    //       }
    //     } catch (error) {
    //       this.spinner.hide();
    //       this.toastr.error(error);
    //     }
    //   }
    // );

    //FOR GRID 2
    this.columnDefs = [
      {
        headerName: "No",
        field: "PLANNO",
        width: 30,
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
      },
      {
        headerName: "Amt",
        field: "AMT",
        width: 70,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return parseFloat(params.value).toFixed(0);
        },
      },
      {
        headerName: "Pcrt",
        field: "PCARAT",
        width: 70,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return parseFloat(params.value).toFixed(2);
        },
      },
    ];
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
    };

    //FOR GRID 1
    this.PricecolumnDefs = [
      {
        headerName: "Descr",
        field: "DESCR",
        width: 100,
        cellStyle: { "text-align": "left" },
        headerClass: "text-center",
      },
      {
        headerName: "%",
        field: "PER",
        width: 70,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return "<p>" + params.value.toFixed(2) + "</p>";
        },
      },
      {
        headerName: "Amt",
        field: "AMT",
        width: 80,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return "<p>" + params.value.toFixed(2) + "</p>";
        },
      },
    ];
    this.PricedefaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
    };

    this.searchcolumnDefs = [
      {
        headerName: "File Name",
        field: "FileName",
        width: 190,
        cellStyle: { "text-align": "left" },
        headerClass: "text-center",
      },
    ];
    this.searchdefaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
    };

    //FOR GRID 3
    this.SizecolumnDefs = [
      {
        headerName: "Code",
        field: "SZ_CODE",
        width: 50,
        cellStyle: { "text-align": "left" },
        headerClass: "text-center",
      },
      {
        headerName: "FCarat",
        field: "F_SIZE",
        width: 100,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return "<p>" + params.value.toFixed(3) + "</p>";
        },
      },
      {
        headerName: "TCarat",
        field: "T_SIZE",
        width: 100,
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        cellRenderer: function (params) {
          if (!params.value) {
            params.value = 0;
          }
          return "<p>" + params.value.toFixed(3) + "</p>";
        },
      },
    ];
    this.SizerowSelection = "single";
    this.SizedefaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
    };
    this.empCtrl = new FormControl();
    this.depthCtrl = new FormControl();
    this.diameterCtrl = new FormControl();
    this.tableCtrl = new FormControl();
    this.ratioCtrl = new FormControl();
    this.vCtrl = new FormControl();
    this.lotCtrl = new FormControl();
    this.TenColCtrl = new FormControl();
    this.YAHUCtrl = new FormControl();
    this.SPECTMCtrl = new FormControl();
    this.NdCtrl = new FormControl();
    this.YahudaFloCtrl = new FormControl();
    this.TenFloCtrl = new FormControl();
    this.NDFLOCtrl = new FormControl();
    this.TENQUACTRL = new FormControl();
    this.lotnameCtrl = new FormControl();
    this.lotDeleteCtrl = new FormControl();
    this.NDQUACTRL = new FormControl();
    this.MBOXQUACtrl = new FormControl();

    this.rapArray = this.decodedMast[14].filter((x) => x.ISACTIVE == true);
    this.rapArray = this.rapArray.map((item) => {
      return {
        code: item.RTYPE,
        name: item.RAPNAME,
        selected: false,
        ISAUTO: item.ISAUTO,
      };
    });
    this.RAPARR = this.rapArray[0].name;
    this.ISAUTO = this.rapArray[0].ISAUTO;

    this.gridOptions = {
      onRangeSelectionChanged: this.onRangeSelectionChanged.bind(this)
    }
  }

  async ngOnInit() {

    this.PER = await this._FrmOpePer.UserFrmOpePer("RapCalComponent");
    this.ALLOWDEL = this.PER[0].DEL;
    this.ALLOWINS = this.PER[0].INS;
    this.ALLOWUPD = this.PER[0].UPD;
    this.PASS = this.PER[0].PASS;

    this.CAT_P = this.decodedTkn.U_CAT === "P" ? true : false;
    this.CAT_ELSE = this.decodedTkn.U_CAT === "P" ? false : true;

    // this.decodedMast[48].map((it) => {
    //   if (it.SVALUE == 'SKD'){
    //       this.Rapdisable = false;
    //   } else {
    //     this.Rapdisable = true;
    //   }
    // })

    // if (this.decodedTkn.U_CAT === "P") {
    //   this.gridApi.redrawRows();
    //   let TempSValue = "";
    //   this.decodedMast[48].map((it) => {
    //     if (it.SKEY == "TENDAR_DISP") {
    //       TempSValue = it.SVALUE;
    //     } else if (it.SKEY == "TENDAR_TAG") {
    //       if (it.ISACTIVE == true) {
    //         this.TEN_DISP_TAG = true;
    //       } else {
    //         this.TEN_DISP_TAG = false;
    //       }
    //     }
    //   });

    //   this.TENDAR_DISParr = TempSValue.split(",");
    //   // this.TENDAR_DISParr.splice(1, 1)
    //   this.TENDAR_DISParr.map((it) => {
    //     if (it == "COL_REM") {
    //       this.TEN_DISP_COL = true;
    //     } else if (it == "QUA_REM") {
    //       this.TEN_DISP_QUA = true;
    //     } else if (it == "LOT_DELETE") {
    //       this.TEN_DISP_LDEL = true;
    //     } else if (it == "L_NAME") {
    //       this.TEN_DISP_LNAM = true;
    //     } else if (it == "I_PCS") {
    //       this.ROU_PCS = true;
    //     } else if (it == 'R_CARAT') {
    //       this.R_CARATVISI = true
    //     } else if (it == 'SIZE') {
    //       this.SIZE_VISI = true;
    //     }
    //     else {
    //       this.TEN_DISP_COL = false;
    //       this.TEN_DISP_QUA = false;
    //       this.TEN_DISP_LDEL = false;
    //       this.TEN_DISP_LNAM = false;
    //     }
    //   });
    // }

    this.spinner.hide();
    await this.LoginServ.UserFrmPer({ USER_NAME: this.decodedTkn.UserId }).then(
      (res) => {
        try {
          if (res.success == true) {
            this.VIEWPERARR = res.data[0].map((item) => {
              return item.FORM_NAME;
            });
          } else {
            this.spinner.hide();
            this.toastr.warning("Something gone wrong while get shape");
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );

    this.shapeArray = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME, selected: false };
    });

    this.clarityArray = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME, selected: false };
    });

    this.TENQUAaRR = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });
    this.NDQUAarr = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });
    this.MBOXQUAarr = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });

    this.colorArray = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME, selected: false };
    });

    this.TenColArr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.YahuArr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.SpectArr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.NdArr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.cutArray = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME, selected: false };
    });

    this.polArray = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME, selected: false };
    });

    this.symArray = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME, selected: false };
    });

    this.floArray = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME, selected: false };
    });

    this.YahudaFloArr = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });
    this.TenFloArr = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });
    this.NDFloArr = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });

    // this.rapArray = this.decodedMast[16].filter(x => x.ISACTIVE == true)
    // this.rapArray = this.rapArray.map(item => {
    //   return { code: item.RTYPE,name: item.RAPNAME, selected: false, ISAUTO: item.ISAUTO };
    // });
    // this.RAPARR = this.rapArray[0].name
    // this.ISAUTO = this.rapArray[0].ISAUTO

    this.shadeArray = this.decodedMast[25].map((item) => {
      return { code: item.SH_CODE, name: item.SH_NAME, selected: false, RAP_TYPE: item.RAP_TYPE };
    });
    this.shadeArray1 = this.decodedMast[25].map((item) => {
      return { code: item.SH_CODE, name: item.SH_NAME, selected: false, RAP_TYPE: item.RAP_TYPE };
    });

    // this.crownOpenArray = this.decodedMast[20].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.culetArray = this.decodedMast[21].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.extraFacetArray = this.decodedMast[22].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.eyeCleanArray = this.decodedMast[23].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.gridleOpenArray = this.decodedMast[24].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    this.grainingArray = this.decodedMast[30].map((item) => {
      return { code: item.GI_CODE, name: item.GI_NAME, selected: false };
    });

    this.WHincArr = this.decodedMast[29].map((item) => {
      return { code: item.WH_CODE, name: item.WH_NAME, selected: false };
    });

    // this.lusterArray = this.decodedMast[26].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    this.milkyArray = this.decodedMast[24].map((item) => {
      return { code: item.ML_CODE, name: item.ML_NAME, selected: false };
    });

    // this.naturalArray = this.decodedMast[28].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.pavOpenArray = this.decodedMast[29].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.sideArray = this.decodedMast[30].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.sideBlackArray = this.decodedMast[31].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.sideOpenArray = this.decodedMast[32].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.tableArray = this.decodedMast[33].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.tableBlackArray = this.decodedMast[34].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    // this.tableOpenArray = this.decodedMast[35].map((item) => {
    //   return { code: item.I_CODE, name: item.I_SHORTNAME, selected: false };
    // });

    this.RegArray = this.decodedMast[6].map((item) => {
      return { code: item.IN_CODE, name: item.IN_NAME, selected: false };
    });

    this.RSpotArray = this.decodedMast[26].map((item) => {
      return { code: item.REF_CODE, name: item.REF_NAME, selected: false };
    });

    // this.versionArray = this.decodedMast[36].map((item) => {
    //   return { code: item.V_CODE, selected: false };
    // });

    this.TagArray = this.decodedMast[8].map((item) => {
      return { name: item.TAG, selected: false };
    });

    // this.lotArray = this.decodedMast[14].map((item) => {
    //   return { code: item.L_CODE };
    // });
    this.filteredVs = this.vCtrl.valueChanges.pipe(
      startWith(""),
      map((grp) => (grp ? this.filterVs(grp) : this.versionArray))
    );
    this.filteredLots = this.lotCtrl.valueChanges.pipe(
      startWith(""),
      map((lot) => (lot ? this.filterLots(lot) : this.lotArray))
    );

    this.FilterTenCol = this.TenColCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterTenCols(col) : this.TenColArr))
    )

    this.FilterYahu = this.YAHUCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterYahus(col) : this.YahuArr))
    )

    this.FilterSpect = this.SPECTMCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterSpects(col) : this.SpectArr))
    )

    this.FilterNd = this.NdCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterNds(col) : this.NdArr))
    )

    this.FilterYahudaFlo = this.YahudaFloCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterYahudasFlos(col) : this.YahudaFloArr))
    )

    this.FilterTenFlo = this.TenFloCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterTenFlos(col) : this.TenFloArr))
    )

    this.FilterNDFlo = this.NDFLOCtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterNDFlos(col) : this.NDFloArr))
    )

    this.FilterTENQUA = this.TENQUACTRL.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterTenQuas(col) : this.TENQUAaRR))
    )
    this.FilterNDQUA = this.NDQUACTRL.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterNDQUAS(col) : this.NDQUAarr))
    )
    this.FilterMBOXQUA = this.MBOXQUACtrl.valueChanges.pipe(
      startWith(""),
      map((col) => (col ? this.FilterMBOXQUAS(col) : this.MBOXQUAarr))
    )


    this.FILLREMARK();
    this.FILLTENSION();
    this.FILLMCCOLOR();
    if (this.CAT_P) {
      let ExcelObj = {
        L_CODE: this.L_CODE,
        FSRNO: 0,
        TSRNO: 0,
        F_DATE: "",
        T_DATE: "",
        TYPE: "LOT",
      };
      this.RapCalcServ.TendarExcel(ExcelObj).subscribe((LRes) => {
        try {
          if (LRes.success == 1) {
            this.TENDlotArr = LRes.data.map((item) => {
              return { code: item.L_CODE };
            });
            this.TENDfilteredLots = this.lotCtrl.valueChanges.pipe(
              startWith(""),
              map((lot) => (lot ? this.TENDfilterLots(lot) : this.TENDlotArr))
            );
          }
        } catch (err) {
          console.log(err);
        }
      });
    }

    this.RapMastServ.RapTypeFill({ TYPE: "DIS", TABNAME: "PARAM" }).subscribe(
      (CRes) => {
        try {
          if (CRes.success == 1) {
            if (CRes.data[0].IS_CUT == false) {
              this.CUTBUTTONVIS = false;
            } else {
              this.CUTBUTTONVIS = true;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
  }

  FILLREMARK() {
    this.RemarkArray = this.decodedMast[47]
      .filter((item) => item.PROC_CODE == "RAP")
      .map((item) => {
        return { code: item.R_CODE, name: item.R_NAME };
      });

    let temp = this.RemarkArray.map((item) => {
      return { code: item.name };
    });
    setTimeout(() => {
      this.MaincolumnDefs.forEach((element) => {
        if (element.field == "REM" && element.cellEditorParams) {
          element.cellEditorParams.rowData = temp;
        }
      });
      this.MaingridApi.setColumnDefs(this.MaincolumnDefs);
    }, 1000);
  }

  FILLTENSION() {
    this.TensionArray = this.decodedMast[18].map((item) => {
      return { code: item.TEN_CODE, name: item.TEN_NAME };
    });
    let temp = this.TensionArray.map((item) => {
      return { code: item.name };
    });
    setTimeout(() => {
      this.MaincolumnDefs.forEach((element) => {
        if (element.field == "TEN_NAME" && element.cellEditorParams) {
          element.cellEditorParams.rowData = temp;
        }
      });
      this.MaingridApi.setColumnDefs(this.MaincolumnDefs);
    }, 1000);
  }

  FILLMCCOLOR() {
    this.MCColorArray = this.decodedMast[3].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    let temp = this.MCColorArray.map((item) => {
      return { code: item.name };
    });
    setTimeout(() => {
      this.MaincolumnDefs.forEach((element) => {
        if (element.field == "MC_NAME" && element.cellEditorParams) {
          element.cellEditorParams.rowData = temp;
        }
      });
      this.MaingridApi.setColumnDefs(this.MaincolumnDefs);
    }, 1000);
  }

  filteremps(code: string) {
    return this.emps.filter(
      (shp) => shp.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  filterVs(code: string) {
    return this.versionArray.filter(
      (shp) => shp.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  filterLots(code: string) {
    return this.lotArray.filter(
      (shp) => shp.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  FilterTenCols(code: string) {
    return this.TenColArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  FilterYahus(code: string) {
    return this.YahuArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  FilterSpects(code: string) {
    return this.SpectArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  FilterNds(code: string) {
    return this.NdArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  FilterYahudasFlos(code: string) {
    return this.YahudaFloArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  FilterTenFlos(code: string) {
    return this.TenFloArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  FilterNDFlos(code: string) {
    return this.NDFloArr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  FilterTenQuas(code: string) {
    return this.TENQUAaRR.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  FilterNDQUAS(code: string) {
    return this.NDQUAarr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  FilterMBOXQUAS(code: string) {
    return this.MBOXQUAarr.filter(
      (col) => col.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  TENDfilterLots(code: string) {
    return this.TENDlotArr.filter(
      (shp) => shp.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  SelectEmp(e: any) {
    const a = this.emps.filter((option) =>
      option.code.toLocaleLowerCase().includes(e.toLowerCase())
    );

    if (a.length == 0) {
      this.empCtrl.setValue("");
      this.EMP_CODE = "";
    } else {
      let x = this.emps.some((item) => {
        return item.code === e.toUpperCase();
      });

      if (x == true) {
        this.empName = this.emps.find((x) => x.code == e.toUpperCase()).name;
        this.EMP_CODE = e.toUpperCase();
      } else if (x == false) {
        this.empName = "";
        this.EMP_CODE = "";
      }
    }
  }

  paramTGrid(paramNam) {
    
    let GridRowData = this.MaingridApi.getSelectedNodes();
    // if (!this.PARAMBTNDIACOL || !this.PARAMBTNDEPTHCOL || !this.PARAMBTNRATCOL ||  this.PARAMBTNTABCOL) {

    //   for (let i = 0; i < GridRowData.length; i++) {
    //     GridRowData[i].setDataValue(paramNam, 0)
    //   }
    // } else {
    if (paramNam == "PRDDIA") {
      if (!this.PARAMBTNDIACOL) {
        for (let i = 0; i < GridRowData.length; i++) {
          GridRowData[i].setDataValue(paramNam, 0);
        }
      } else {
        for (let i = 0; i < GridRowData.length; i++) {
          // GridRowData[i].setDataValue(paramNam, paramNam == 'PRDDIA' ? this.PRDDIA ? this.PRDDIA : 0 : 0)
          GridRowData[i].setDataValue(
            paramNam,
            this[paramNam] ? this[paramNam].split("+")[0].split("(")[1] : 0
          );
        }
      }
    }
    if (paramNam == "PRDDEPTH") {
      if (!this.PARAMBTNDEPTHCOL) {
        for (let i = 0; i < GridRowData.length; i++) {
          GridRowData[i].setDataValue(paramNam, 0);
        }
      } else {
        for (let i = 0; i < GridRowData.length; i++) {
          // GridRowData[i].setDataValue(paramNam, paramNam == 'PRDDIA' ? this.PRDDIA ? this.PRDDIA : 0 : 0)
          GridRowData[i].setDataValue(
            paramNam,
            this[paramNam] ? this[paramNam].split("+")[0].split("(")[1] : 0
          );
        }
      }
    }

    if (paramNam == "PRDRAT") {
      if (!this.PARAMBTNRATCOL) {
        for (let i = 0; i < GridRowData.length; i++) {
          GridRowData[i].setDataValue(paramNam, 0);
        }
      } else {
        for (let i = 0; i < GridRowData.length; i++) {
          // GridRowData[i].setDataValue(paramNam, paramNam == 'PRDDIA' ? this.PRDDIA ? this.PRDDIA : 0 : 0)
          GridRowData[i].setDataValue(
            paramNam,
            this[paramNam] ? this[paramNam].split("+")[0].split("(")[1] : 0
          );
        }
      }
    }

    if (paramNam == "PRDTAB") {
      if (!this.PARAMBTNTABCOL) {
        for (let i = 0; i < GridRowData.length; i++) {
          GridRowData[i].setDataValue(paramNam, 0);
        }
      } else {
        for (let i = 0; i < GridRowData.length; i++) {
          // GridRowData[i].setDataValue(paramNam, paramNam == 'PRDDIA' ? this.PRDDIA ? this.PRDDIA : 0 : 0)
          GridRowData[i].setDataValue(
            paramNam,
            this[paramNam] ? this[paramNam].split("+")[0].split("(")[1] : 0
          );
        }
      }
    }

    this.MaingridApi.redrawRows();
    this.findRap();
  }

  closeGrdPopUP() {
    this.ShOWGRD = false
    this.disabled = false;
    this.clarityDisabled = false;
    this.calcDisabled = false;
    this.colordisabled = false;
    this.cutDisabled = false;

    const temp = this.MaingridApi.getSelectedNodes();
    const selectedrows = this.MaingridApi.getSelectedRows();

    for (let i = 0; i < selectedrows.length; i++) {
      temp[i].setDataValue("TENC_CODE", this.TENDER_COL)
      temp[i].setDataValue("TENC_NAME", this.TENCOLNAME)
      temp[i].setDataValue("YAHUC_CODE", this.YAHU_COL)
      temp[i].setDataValue("YAHUC_NAME", this.YAHU_NAME)
      temp[i].setDataValue("SPEC_CODE", this.SPECTREM_COL)
      temp[i].setDataValue("SPEC_NAME", this.SPECTREMNAME)
      temp[i].setDataValue("NDC_CODE", this.ND_COL)
      temp[i].setDataValue("NDC_NAME", this.NDNAME)
      temp[i].setDataValue("YAHUFL_CODE", this.YAHUDA_FLO)
      temp[i].setDataValue("YAHUFL_NAME", this.YAHUDA_FLONAME)
      temp[i].setDataValue("TENFL_CODE", this.TEN_FLO)
      temp[i].setDataValue("TENFL_NAME", this.TEN_FLO_NAME)
      temp[i].setDataValue("NDFL_CODE", this.ND_FLO)
      temp[i].setDataValue("NDFL_NAME", this.NDFLONAME)
      temp[i].setDataValue("TENQ_CODE", this.TEN_QUA)
      temp[i].setDataValue("TENQ_NAME", this.TENQUANAME)
      temp[i].setDataValue("NDQ_CODE", this.ND_QUA)
      temp[i].setDataValue("NDQ_NAME", this.NDQUANAME)
      temp[i].setDataValue("MBOXQ_CODE", this.MBOX_QUA)
      temp[i].setDataValue("MBOXQ_NAME", this.MBOXQUANAME)
    }

  }

  styleObj = {};
  styleObj1 = {};
  styleObj2 = {};
  styleObj3 = {};

  changeBackground(color: string, fontcol) {
    if (!this.PARAMBTNDIACOL) {
      color = "#f8f8ff";
      fontcol = "#33372b";
    }
    this.styleObj = { "background-color": color, color: fontcol };
  }

  changeBackground1(color: string, fontcol) {
    if (!this.PARAMBTNDEPTHCOL) {
      color = "#f8f8ff";
      fontcol = "#33372b";
    }
    this.styleObj1 = { "background-color": color, color: fontcol };
  }

  changeBackground2(color: string, fontcol) {
    if (!this.PARAMBTNTABCOL) {
      color = "#f8f8ff";
      fontcol = "#33372b";
    }
    this.styleObj2 = { "background-color": color, color: fontcol };
  }

  changeBackground3(color: string, fontcol) {
    if (!this.PARAMBTNRATCOL) {
      color = "#f8f8ff";
      fontcol = "#33372b";
    }
    this.styleObj3 = { "background-color": color, color: fontcol };
  }

  onEnterEmp(evt: any) {
    if (evt.source.selected) {
      this.empName = this.emps.find(
        (x) => x.code.toString() == evt.source.value
      ).name;
      let a = this.empName;
    }
  }

  //GRID 1 READY
  onPriceGridReady(params) {
    this.PricegridApi = params.api;
    this.PricegridColumnApi = params.columnApi;
    this.PriceLoadGridData([]);
    this.PricegridApi.sizeColumnsToFit();
  }

  //GRID 2 READY
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.LoadGridData([]);
    this.gridApi.sizeColumnsToFit();
  }

  onsearchGridReady(params) {
    this.searchgridApi = params.api;
    this.searchgridColumnApi = params.columnApi;
    // this.LoadGridData([]);
  }

  //GRID 3 READY
  onGridSizeReady(params) {
    this.SizegridApi = params.api;
    this.SizegridColumnApi = params.columnApi;
    this.SizeGridArray = this.decodedMast[9].filter((x) => x.SZ_TYPE == "RAP");
    this.SizeLoadGridData(this.SizeGridArray);
    this.SizegridApi.sizeColumnsToFit();
  }

  //MAIN GRID READY
  selectedRows: any[] = [];
  MainonGridReady(params) {
    this.MaingridApi = params.api;
    this.MaingridColumnApi = params.columnApi;
    this.MainLoadGridData();
    // this.MaingridApi.addEventListener('selectionChanged', () => {
    //   const selectedNodes = this.MaingridApi.getSelectedNodes();
    //   this.selectedRows = selectedNodes.map((node: any) => node.data);
    // });
    this.MaingridApi.addEventListener('cellMouseDown', (event: any) => {
      if (event.event.button === 0 && event.event.ctrlKey) {
        const rowNode = event.node;
        const isSelected = rowNode.isSelected();

        if (!isSelected) {
          rowNode.setSelected(true);
        } else {
          rowNode.setSelected(false);
        }
      }
    });
  }

  //MAIN GRID CELL CLICKED
  // onCellClicked(event: any) {
    // if (event.column.colId === "MAKVW") {
    //   if (event.data.MAKVW === "MakView") {
    //     this.MakeableHistory(event);
    //   } else if (event.data.MAKVW == 'MakOK') {
    //     this.RapDoubleClick(event)
    //   }
    // }
    // const temp = this.MaingridApi.getSelectedRows();
    // if (temp.length == 1) {
    //   this.showGRDBtn = true
    // } else {

    //   this.showGRDBtn = false
    // }

  // }

  // MakeableHistory(event) {
  //   const MakHistoryData = {
  //     L_CODE: this.L_CODE,
  //     SRNO: this.SRNO,
  //     TAG: event.data.PTAG,
  //     FRMTYP: "MAK",
  //   };
  //   localStorage.setItem("MakHistoryData", JSON.stringify(MakHistoryData));

  //   const PRF = this.dialog.open(MakHistoryPopUPComponent, {
  //     panelClass: "brk-ent-dialog",
  //     autoFocus: false,
  //     width: "fit-content",
  //     height: "100%",
  //     disableClose: true,
  //   });
  //   $("#Close").click();
  //   PRF.afterClosed().subscribe((result) => { });
  // }

  RapDoubleClick(event) {
    const Data = {
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: event.data.PTAG,
    }

    const mdl = this.dialog.open(RapCalModalComponent, {
      panelClass: "marker-acc-view-det-dialog",
      autoFocus: false,
      minWidth: "85vw",
      width: "100%",
      height: "61%",
      data: Data,
    })
    $("#Close").click()
    mdl.afterClosed().subscribe((result) => { })
  }

  getColName() {
    const temp = this.TenColArr.filter((option) => option.code.toString().toLowerCase() == this.TENDER_COL.toString().toLowerCase())
    this.TENCOLNAME = temp.length !== 0 ? temp[0].name : "";
  }

  getYahoColName() {
    const temp = this.YahuArr.filter((option) => option.code.toString().toLowerCase() == this.YAHU_COL.toString().toLowerCase())
    this.YAHU_NAME = temp.length !== 0 ? temp[0].name : "";
  }
  getTENQUAName() {
    const temp = this.TENQUAaRR.filter((option) => option.code.toString().toLowerCase() == this.TEN_QUA.toString().toLowerCase())
    this.TENQUANAME = temp.length !== 0 ? temp[0].name : "";
  }
  getNDQUAName() {
    const temp = this.NDQUAarr.filter((option) => option.code.toString().toLowerCase() == this.ND_QUA.toString().toLowerCase())
    this.NDQUANAME = temp.length !== 0 ? temp[0].name : "";
  }

  getYahuFloName() {
    const temp = this.YahudaFloArr.filter((option) => option.code.toString().toLowerCase() == this.YAHUDA_FLO.toString().toLowerCase())
    this.YAHUDA_FLONAME = temp.length !== 0 ? temp[0].name : "";
  }
  getMBOXQUAName() {
    const temp = this.MBOXQUAarr.filter((option) => option.code.toString().toLowerCase() == this.MBOX_QUA.toString().toLowerCase())
    this.MBOXQUANAME = temp.length !== 0 ? temp[0].name : "";
  }
  getNDFloName() {
    const temp = this.NDFloArr.filter((option) => option.code.toString().toLowerCase() == this.ND_FLO.toString().toLowerCase())
    this.NDFLONAME = temp.length !== 0 ? temp[0].name : "";
  }

  getTenFloName() {
    const temp = this.TenFloArr.filter((option) => option.code.toString().toLowerCase() == this.TEN_FLO.toString().toLowerCase())
    this.TEN_FLO_NAME = temp.length !== 0 ? temp[0].name : "";
  }

  getSpetColName() {
    const temp = this.SpectArr.filter((option) => option.code.toString().toLowerCase() == this.SPECTREM_COL.toString().toLowerCase())
    this.SPECTREMNAME = temp.length !== 0 ? temp[0].name : "";
  }
  getNDColName() {
    const temp = this.NdArr.filter((option) => option.code.toString().toLowerCase() == this.ND_COL.toString().toLowerCase())
    this.NDNAME = temp.length !== 0 ? temp[0].name : "";
  }

  //WHEN PAGE SHOW THAT TIME ENTRY EMPTY ROW & SELECT THAT ROW
  async MainLoadGridData() {
    await this.MaingridApi.applyTransaction({
      add: [
        {
          PLNSEL: false,
          PLANNO: 0,
          PTAG: "A",
          EMP_CODE: "",
          PRDS_CODE: "",
          PRDQ_CODE: 0,
          Q_NAME: "",
          PRDC_CODE: 0,
          C_NAME: "",
          PRDMC_CODE: 0,
          PRDMFL_CODE: 0,
          PRDCARAT: 0,
          PRDCUT_CODE: 1,
          CUT_NAME: "EX",
          PRDPOL_CODE: 1,
          POL_NAME: "EX",
          PRDSYM_CODE: 1,
          SYM_NAME: "EX",
          PRDFL_CODE: 1,
          FL_NAME: "N",
          PRDIN_CODE: 1,
          IN_NAME: "NONE",
          PRDSH_CODE: 1,
          SH_NAME: "NONE",
          PRDMILKY: 1,
          PRDMILKY_NAME: "NONE",
          PRDREDSPOT: 1,
          PRDREDSPOT_NAME: "NONE",
          RATE: 0,
          AMT: 0,
          SRATE: 0,
          IGIRATE: 0,
          SAMT: 0,
          IGIAMT: 0,
          RRATE: 0,
          RAMT: 0,
          CPAMT: 0,
          CMAMT: 0,
          QPAMT: 0,
          QMAMT: 0,
          PRDTABLE: 0,
          PRDTABLE_BLACK: 0,
          PRDTABLE_OPEN: 0,
          PRDSIDE: 0,
          PRDSIDE_BLACK: 0,
          PRDSIDE_OPEN: 0,
          PRDCROWN_OPEN: 0,
          PRDGIRDLE_OPEN: 0,
          PRDPAV_OPEN: 0,
          PRDCULET: 0,
          PRDEXTFACET: 0,
          PRDEYECLEAN: 0,
          PRDGRAINING: 1,
          PRDGRAINING_NAME: 'NONE',
          PRDWHINC: 1,
          PRDWHINC_NAME: 'NONE',
          PRDLUSTER: 0,
          PRDNATURAL: 0,
          TYP: "",
          ISLOCK: false,
          CMAMTCOL: "",
          CPAMTCOL: "",
          QMAMTCOL: "",
          QPAMTCOL: "",
          PRDDIA_CODE: 0,
          PRDDEPTH_CODE: 0,
          PRDTAB_CODE: 0,
          PRDRAT_CODE: 0,
          RAPTYPE: "LC",
          V_CODE: 0,
          REM: { code: "" },
          TEN_NAME: { code: "" },
          MC_NAME: { code: "" },
        },
      ],
      addIndex: 0,
    });
    this.MaingridApi.getRowNode(0).setSelected(true);
  }

  //LOAD GRID 1
  PriceLoadGridData(e: any) {
    this.PricegridApi.setRowData(e);
    this.PricegridApi.sizeColumnsToFit();
  }

  //LOAD GRID 3
  SizeLoadGridData(e: any) {
    this.SizegridApi.setRowData(e);
    this.SizegridApi.sizeColumnsToFit();
  }

  //LOAD GRID 2
  LoadGridData(e: any) {
    this.gridApi.setRowData(e);
    this.gridApi.sizeColumnsToFit();
  }

  async pressNum(num: string) {

    if (this.input.toString().length == 10) {
      return;
    }

    if (num == ".") {
      if (this.input.toString().includes(".")) {
        return;
      }
      if (this.input == "0") {
        this.input = "0.";
        return;
      }
    }

    if (num == "0") {
      if (this.input == "") {
        return;
      }
    }
    this.input == "0" ? (this.input = num) : (this.input += num);

    if (this.clarityCheck) {
      let GridData = this.oldGridData;
      let TempCarat = "";
      let Rowdata = this.MaingridApi.getSelectedRows()[0];

      GridData.map((item) => {
        item.map((ct) => {
          if (Rowdata.PLANNO == ct.PLANNO && Rowdata.OTAG == ct.OTAG) {
            TempCarat = ct.PRDCARAT;
          }
        });
      });
      // let tempinput = Math.floor(this.input)
      // if (num == ".") {

      if (this.input == "0.0") {
        this.input = "0.0";
        return;
      }
      // }
      if (TempCarat > this.input) {
        this.input = TempCarat;
        this.toastr.warning(`You Can't Edit Carat`);
      }
    }

    // SELECT SIZE GRID ROW AS PER CAL INPUT
    var selectedRows = this.MaingridApi.getSelectedNodes();
    for (let i = 0; i < this.MaingridApi.getSelectedRows().length; i++) {
      selectedRows[i].setDataValue("PRDCARAT", this.input);
    }
    const index = this.SizeGridArray.findIndex(
      (x) => this.input >= x.F_SIZE && this.input <= x.T_SIZE
    );
    // const index = this.SizeGridArray.indexOf(filtersize);
    if (Math.sign(index) !== -1) {
      this.SizegridApi.getRowNode(index).setSelected(true);
      this.SizegridApi.ensureIndexVisible(index, null);
    }
    await this.findRap();

    let e = "";
    e = this.PARAMCHIP;
    let Size = [];
    Size = this.SizegridApi.getSelectedNodes();
    if (Size.length != 0) {
      let a = this.decodedMast[9].filter(
        (x) =>
          x.PARAM_NAME == "DEPTH" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.deptharray = a.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddepths = this.depthCtrl.valueChanges.pipe(
        startWith(""),
        map((depth) => (depth ? this.filterdepths(depth) : this.deptharray))
      );
    } else {
      let a = this.decodedMast[9].filter(
        (x) => x.PARAM_NAME == "DEPTH" && x.S_CODE == e
      );
      this.deptharray = a.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddepths = this.depthCtrl.valueChanges.pipe(
        startWith(""),
        map((depth) => (depth ? this.filterdepths(depth) : this.deptharray))
      );
    }

    if (Size.length != 0) {
      let b = this.decodedMast[9].filter(
        (x) =>
          x.PARAM_NAME == "DIAMETER" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.diameterarray = b.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddiameters = this.diameterCtrl.valueChanges.pipe(
        startWith(""),
        map((diameter) =>
          diameter ? this.filterdiameters(diameter) : this.diameterarray
        )
      );
    } else {
      let b = this.decodedMast[9].filter(
        (x) => x.PARAM_NAME == "DIAMETER" && x.S_CODE == e
      );
      this.diameterarray = b.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddiameters = this.diameterCtrl.valueChanges.pipe(
        startWith(""),
        map((diameter) =>
          diameter ? this.filterdiameters(diameter) : this.diameterarray
        )
      );
    }

    if (Size.length != 0) {
      let c = this.decodedMast[9].filter(
        (x) =>
          x.PARAM_NAME == "TABLE" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.tablearray = c.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredtables = this.tableCtrl.valueChanges.pipe(
        startWith(""),
        map((table) => (table ? this.filtertables(table) : this.tablearray))
      );
    } else {
      let c = this.decodedMast[9].filter(
        (x) => x.PARAM_NAME == "TABLE" && x.S_CODE == e
      );
      this.tablearray = c.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredtables = this.tableCtrl.valueChanges.pipe(
        startWith(""),
        map((table) => (table ? this.filtertables(table) : this.tablearray))
      );
    }

    if (Size.length != 0) {
      let d = this.decodedMast[9].filter(
        (x) =>
          x.PARAM_NAME == "RATIO" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.ratioarray = d.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredratios = this.ratioCtrl.valueChanges.pipe(
        startWith(""),
        map((ratio) => (ratio ? this.filterratios(ratio) : this.ratioarray))
      );
    } else {
      let d = this.decodedMast[9].filter(
        (x) => x.PARAM_NAME == "RATIO" && x.S_CODE == e
      );
      this.ratioarray = d.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredratios = this.ratioCtrl.valueChanges.pipe(
        startWith(""),
        map((ratio) => (ratio ? this.filterratios(ratio) : this.ratioarray))
      );
    }
    // this.refreshAutocomplete()
  }

  async backSpace() {
    this.input = this.input.toString().slice(0, -1);
    if (this.input.length == 0) {
      this.input = "0";
    }

    // if (this.clarityCheck) {
    //   let GridData = this.oldGridData
    //   let TempCarat = ''
    //   let Rowdata = this.MaingridApi.getSelectedRows()[0]

    //   GridData.map((item) => {
    //     item.map((ct) => {
    //       if (Rowdata.OTAG == ct.OTAG) {
    //         TempCarat = ct.PRDCARAT
    //       }
    //     }
    //     )
    //   })
    //   // let tempinput = Math.floor(this.input)
    //   // if (num == ".") {

    //   if (this.input == "0.0") {
    //     this.input = "0.0";
    //     return;
    //   }
    //   // }
    //   if (TempCarat > this.input) {
    //     this.input = TempCarat
    //     this.toastr.warning(`You Can't Edit Carat`)
    //   }
    // }

    var selectedRows = this.MaingridApi.getSelectedNodes();
    for (let i = 0; i < this.MaingridApi.getSelectedRows().length; i++) {
      selectedRows[i].setDataValue("PRDCARAT", this.input);
    }
    await this.findRap();
  }

  clear() {
    this.input = "0";
    this.PARAMBTNDIACOL = false;
    this.PARAMBTNDEPTHCOL = false;
    this.PARAMBTNTABCOL = false;
    this.PARAMBTNRATCOL = false;
    this.changeBackground("#f8f8ff", "#33372b");
    this.changeBackground1("#f8f8ff", "#33372b");
    this.changeBackground2("#f8f8ff", "#33372b");
    this.changeBackground3("#f8f8ff", "#33372b");
    this.PRDDIA = "";
  }

  ClearSRNO() {
    this.SRNO = "";
  }

  onCellFocused(params) {
    
    if (this.clarityCheck) {
      let GridData = this.oldGridData;
      let TempCarat = "";
      let Rowdata = this.MaingridApi.getSelectedRows()[0];
      let GridRowData = [];
      this.MaingridApi.forEachNode(function (rowNode, index) {
        GridRowData.push(rowNode.data);
      });
      GridData.map((item) => {
        item.map((ct) => {
          if (Rowdata.PLANNO == ct.PLANNO && Rowdata.OTAG == ct.OTAG) {
            TempCarat = ct.PRDCARAT;
          }
        });
      });
      // let tempinput = Math.floor(this.input)
      // if (num == ".") {

      if (this.input == "0.0") {
        this.input = "0.0";
        return;
      }
      // }
      if (TempCarat > this.input) {
        this.input = TempCarat;
        this.toastr.warning(`You Can't Edit Carat`);

        GridRowData.map((it) => {
          if (Rowdata.PLANNO == it.PLANNO && Rowdata.OTAG == it.OTAG) {
            it.PRDCARAT = this.input;
          }
        });

        this.gridApi.setRowData(GridRowData);
      }
    }
  }

  //SET USER WISE PREDECTION
  GetPrd() {
    this.DISABLELOTSRNO = true;
    let IUSER = "";
    if (
      (this.decodedTkn.U_CAT == "S" ||
        this.decodedTkn.U_CAT == "SA" ||
        this.decodedTkn.PROC_CODE == 2 ||
        this.decodedTkn.PROC_CODE == 5 ||
        this.decodedTkn.PROC_CODE == 22 ||
        this.decodedTkn.PROC_CODE == 23) &&
      this.decodedTkn.DEPT_CODE == "POI"
    ) {
      IUSER = "";
      this.EmpDisabled = false;
    } else {
      IUSER = this.decodedTkn.UserId;
      this.empCtrl.disable();
      this.empCtrl.disabled;
      this.EmpDisabled = true;
    }
    //FOR EMP FILL
    this.RapCalcServ.PrdEmpFill({
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
      IUSER: IUSER,
      OEMP_CODE: this.decodedTkn.UserId,
    }).subscribe((PCRes) => {
      try {
        if (PCRes.success == true) {
          this.emps = PCRes.data[0].map((item) => {
            return { code: item.EMP_CODE, name: item.EMP_NAME };
          });
          this.empCtrl.setValue(PCRes.data[1][0].EMP_CODE);
          this.filteredemps = this.empCtrl.valueChanges.pipe(
            startWith(""),
            map((emp) => (emp ? this.filteremps(emp) : this.emps))
          );
          this.EMP_CODE = PCRes.data[1][0].EMP_CODE;
          this.ROUCARAT = PCRes.data[1][0].I_CARAT;
          this.ISCOMM = PCRes.data[1][0].ISCOMMON;
          let columns = this.MaincolumnDefs;
          if (PCRes.data[1][0].ISCOMMON) {
            columns.map((it) => {
              if (it.field == "ISCOMMON" || it.field == 'CUSER') {
                it.hide = !it.hide;
              }
            });
          }
          
          this.MaingridApi.setColumnDefs(columns);
          // THIS FUNCTION FOR PREDECTION FILL
          this.FILLDATA();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(PCRes.data.originalError.info.message),
          });
        }
      } catch (error) {
        this.toastr.error(error);
      }
    });
  }

  onRouPcschange(event) {
    let selectData = this.MaingridApi.getSelectedRows();
    this.MaingridApi.getSelectedRows().map((it) => {
      it[event] = this[event]
    })
    this.SIZE_P = (this.R_CARAT / this.I_PCS)

    this.MaingridApi.refreshCells();

  }

  // THIS FUNCTION FOR PREDECTION FILL
  async FILLDATA() {
    if (!this.EMP_CODE) {
      return;
    }

    this.RapCalcServ.RapCalcDisp({
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
      EMP_CODE: this.EMP_CODE,
      IUSER: this.decodedTkn.UserId,
    }).subscribe(async (PCRes) => {
      try {
        if (PCRes.success == true) {
          this.oldGridData.push(PCRes.data);
          let a = PCRes.data.map((item) => {
            return {
              PLNSEL: item.PLNSEL,
              PLANNO: item.PLANNO,
              PTAG: item.PTAG,
              EMP_CODE: item.EMP_CODE,
              MAKVW: item.MAKVW,
              PRDS_CODE: item.PRDS_CODE,
              PRDQ_CODE: item.PRDQ_CODE,
              Q_NAME:
                this.clarityArray.filter((x) => x.code == item.PRDQ_CODE)
                  .length != 0
                  ? this.clarityArray.filter((x) => x.code == item.PRDQ_CODE)[0]
                    .name
                  : "",
              PRDC_CODE: item.PRDC_CODE,
              C_NAME:
                this.colorArray.filter((x) => x.code == item.PRDC_CODE)
                  .length != 0
                  ? this.colorArray.filter((x) => x.code == item.PRDC_CODE)[0]
                    .name
                  : "",
              PRDCARAT: item.PRDCARAT,
              PRDCUT_CODE: item.PRDCUT_CODE,
              CUT_NAME:
                this.cutArray.filter((x) => x.code == item.PRDCUT_CODE)
                  .length != 0
                  ? this.cutArray.filter((x) => x.code == item.PRDCUT_CODE)[0]
                    .name
                  : "",
              PRDMC_CODE: item.PRDMC_CODE,
              PRDMFL_CODE: item.PRDMFL_CODE,
              PRDPOL_CODE: item.PRDPOL_CODE,
              POL_NAME: this.polArray.filter(
                (x) => x.code == item.PRDPOL_CODE
              )[0].name,
              PRDSYM_CODE: item.PRDSYM_CODE,
              SYM_NAME: this.symArray.filter(
                (x) => x.code == item.PRDSYM_CODE
              )[0].name,
              PRDFL_CODE: item.PRDFL_CODE,
              FL_NAME: this.floArray.filter((x) => x.code == item.PRDFL_CODE)[0]
                .name,
              PRDIN_CODE: item.PRDIN_CODE,
              IN_NAME: this.RegArray.filter((x) => x.code == item.PRDIN_CODE)[0]
                .name,
              PRDSH_CODE: item.PRDSH_CODE,
              SH_NAME: this.shadeArray.filter(
                (x) => x.code == item.PRDSH_CODE
              )[0].name,
              RATE: item.RATE,
              AMT: item.AMT,
              SRATE: item.SRATE,
              IGIRATE: item.IGIRATE,
              SAMT: item.SAMT,
              IGIAMT: item.IGIAMT,
              RRATE: item.RRATE,
              RAMT: item.RAMT,
              CPAMT: item.CPAMT,
              CMAMT: item.CMAMT,
              QPAMT: item.QPAMT,
              QMAMT: item.QMAMT,
              PRDTABLE: item.PRDTABLE,
              PRDTABLE_BLACK: item.PRDTABLE_BLACK,
              PRDTABLE_OPEN: item.PRDTABLE_OPEN,
              PRDSIDE: item.PRDSIDE,
              PRDSIDE_BLACK: item.PRDSIDE_BLACK,
              PRDSIDE_OPEN: item.PRDSIDE_OPEN,
              PRDCROWN_OPEN: item.PRDCROWN_OPEN,
              PRDGIRDLE_OPEN: item.PRDGIRDLE_OPEN,
              PRDPAV_OPEN: item.PRDPAV_OPEN,
              PRDCULET: item.PRDCULET,
              PRDEXTFACET: item.PRDEXTFACET,
              PRDEYECLEAN: item.PRDEYECLEAN,
              PRDGRAINING: item.PRDGRAINING,
              PRDGRAINING_NAME: item.PRDGRAINING
                ? this.grainingArray.filter((x) => x.code == item.PRDGRAINING)[0].name
                : "",
              PRDLUSTER: item.PRDLUSTER,
              PRDMILKY: item.PRDMILKY,
              PRDMILKY_NAME: item.PRDMILKY
                ? this.milkyArray.filter((x) => x.code == item.PRDMILKY)[0].name
                : "",
              PRDNATURAL: item.PRDNATURAL,
              PRDREDSPOT: item.PRDREDSPOT,
              PRDREDSPOT_NAME: item.PRDREDSPOT
                ? this.RSpotArray.filter((x) => x.code == item.PRDREDSPOT)[0]
                  .name
                : "",
              TYP: item.TYP,
              ISLOCK: item.ISLOCK,
              PRDDIA_CODE: item.PRDDIA_CODE,
              PRDDEPTH_CODE: item.PRDDEPTH_CODE,
              PRDTAB_CODE: item.PRDTAB_CODE,
              PRDRAT_CODE: item.PRDRAT_CODE,
              PRDDIA: item.PRDDIA,
              PRDDEPTH: item.PRDDEPTH,
              PRDTAB: item.PRDTAB,
              PRDRAT: item.PRDRAT,
              CMAMTCOL: "",
              CPAMTCOL: "",
              QMAMTCOL: "",
              QPAMTCOL: "",
              RAPTYPE: item.RAPTYPE,
              V_CODE: item.V_CODE,
              REM: item.R_CODE
                ? this.RemarkArray.filter((x) => x.code == item.R_CODE).map(
                  (item) => {
                    return { code: item.name };
                  }
                )[0]
                : { code: "" },
              TEN_NAME: item.T_CODE
                ? this.TensionArray.filter((x) => x.code == item.T_CODE).map(
                  (item) => {
                    return { code: item.name };
                  }
                )[0]
                : { code: "" },
              MC_NAME: item.PRDMC_CODE
                ? this.MCColorArray.filter(
                  (x) => x.code == item.PRDMC_CODE
                ).map((item) => {
                  return { code: item.name };
                })[0]
                : { code: "" },
              OTAG: item.OTAG,
              RELOCK: item.RELOCK,
              ORDNO: item.ORDNO,
              FPLNSEL: item.FPLNSEL,
              PRDGIRDLE: item.PRDGIRDLE,
              ISCOMMON: item.ISCOMMON,
              CUSER: item.CUSER,
              MC1: item.MC1,
              MC2: item.MC2,
              MC3: item.MC3,
              TENC_NAME: item.TENC_CODE ? this.TenColArr.filter((c) => c.code == item.TENC_CODE)[0].name : '',
              YAHUC_NAME: item.YAHUC_CODE ? this.YahuArr.filter((y) => y.code == item.YAHUC_CODE)[0].name : '',
              SPEC_NAME: item.SPEC_CODE ? this.SpectArr.filter((s) => s.code == item.SPEC_CODE)[0].name : '',
              NDC_NAME: item.NDC_CODE ? this.NdArr.filter(n => n.code == item.NDC_CODE)[0].name : '',
              YAHUFL_NAME: item.YAHUFL_CODE ? this.YahudaFloArr.filter(yf => yf.code == item.YAHUFL_CODE)[0].name : '',
              TENFL_NAME: item.TENFL_CODE ? this.TenFloArr.filter(tf => tf.code == item.TENFL_CODE)[0].name : '',
              NDFL_NAME: item.NDFL_CODE ? this.NDFloArr.filter(nf => nf.code == item.NDFL_CODE)[0].name : '',
              TENQ_NAME: item.TENQ_CODE ? this.TENQUAaRR.filter(tq => tq.code == item.TENQ_CODE)[0].name : '',
              NDQ_NAME: item.NDQ_CODE ? this.NDQUAarr.filter(nq => nq.code == item.NDQ_CODE)[0].name : '',
              MBOXQ_NAME: item.MBOXQ_CODE ? this.MBOXQUAarr.filter(mq => mq.code == item.MBOXQ_CODE)[0].name : '',
              TENC_CODE: item.TENC_CODE,
              YAHUC_CODE: item.YAHUC_CODE,
              SPEC_CODE: item.SPEC_CODE,
              NDC_CODE: item.NDC_CODE,
              YAHUFL_CODE: item.YAHUFL_CODE,
              TENFL_CODE: item.TENFL_CODE,
              NDFL_CODE: item.NDFL_CODE,
              TENQ_CODE: item.TENQ_CODE,
              NDQ_CODE: item.NDQ_CODE,
              MBOXQ_CODE: item.MBOXQ_CODE,
              PRDWHINC: item.PRDWHINC,
              PRDWHINC_NAME: item.PRDWHINC ? this.WHincArr.filter((i) => i.code == item.PRDWHINC)[0].name: '',

            };
          });

          //SET DATE AS PER API RES
          this.MaingridApi.setRowData(a);
          this.MaingridApi.redrawRows();

          if (a.length == 0) {
            this.MainLoadGridData();
            this.UPDATEGRID();
            this.MaingridApi.redrawRows();
          } else {
            if (a[0].EMP_CODE != "") {
              this.MaingridApi.getRowNode(0).setSelected(true);
              await this.findRap();
              //FOR APPLY COLOR EFFET
              this.MaingridApi.redrawRows({ rowNodes: a });
              this.MaingridApi.redrawRows();
            } else {
              // for (let i = 0; i < a.length; i++) {
              // this.MaingridApi.getRowNode(i).setSelected(true);
              await this.findRapNoEmp(a);
              // this.MaingridApi.redrawRows();
              // this.MaingridApi.redrawRows({ rowNodes: a });
              // this.MaingridApi.getRowNode(i).setSelected(false);
              // }
              // this.MaingridApi.getRowNode(0).setSelected(true);
            }
          }
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
        } else {
        }
      } catch (error) {
        console.log(error);

        this.toastr.error(error);
      }
    });
  }

  onspaceBar(event) {
  }

  ShowTag: boolean = false;
  ShowPlan: boolean = false;
  //SELECT CHIP
  SelectItem(Data: any, Mast: any) {
    let selectedRowsdata = this.MaingridApi.getSelectedRows();
    let GridRowData = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    // selectedRowsdata.map((it) => {
    //   if(it.C_NAME == ''|| it.Q_NAME == ''){
    //     this.clarityCheck = false;
    //   }
    // })
    ///
    let tempData = 0;
    let Rowdata = this.MaingridApi.getSelectedRows()[0];
    if (this.clarityCheck) {
      // if (Rowdata.ISLOCK) {
      // this.clarityDisabled
      this.oldGridData.map((it) => {
        it.map((pb) => {
          if (Rowdata.PLANNO == pb.PLANNO && Rowdata.OTAG == pb.PLANNO) {
            tempData = pb.PRDQ_CODE;
          }
        });
      });
      if (tempData < Data.code) {
        // let claData = {
        //   code: tempData,
        //   name: this.clarityArray.find((t) => t.code == tempData).name,
        //   selected: true,
        // }
        // this.SelectItem(claData, 'clarityArray')
        // e.code = tempData ;
        // e.name = this.clarityArray.find((t) => t.code == tempData).name ;
        // e.selected = false;

        this[Mast] = this[Mast].map((item) =>
          item.name == this.clarityArray.find((t) => t.code == tempData).name
            ? {
              name: item.name,
              code: tempData,
              selected: true,
            }
            : {
              name: item.name,
              code: item.code,
              selected: false,
            }
        );
        this.toastr.warning(`You Can't Select`);
      } else {
        if (this[Mast]) {
          this[Mast] = this[Mast].map((item) =>
            item.name == Data.name
              ? {
                name: item.name,
                code: item.code,
                selected: true,
              }
              : {
                name: item.name,
                code: item.code,
                selected: false,
              }
          );
        }
      }
    } else {
      this[Mast] = this[Mast].map((item) =>
        item.name == Data.name
          ? {
            name: item.name,
            code: item.code,
            selected: true,
          }
          : {
            name: item.name,
            code: item.code,
            selected: false,
          }
      );
    }

    //GET SELECTED ROW
    let selectedRows = this.MaingridApi.getSelectedNodes();
    if (Mast == "TagArray") {
      if (selectedRows[0].data.PLANNO == 0) {
        this.toastr.warning("Please select PLAN NO.");
        this.ShowTag = true;
      } else {
        if (this.MaingridApi.getSelectedRows().length == 1) {
          selectedRows[0].setDataValue(
            "PTAG",
            this[Mast].filter((x) => x.selected == true)[0].name
          );
          this.ShowTag = true;
          // document.getElementById('tagDropdown').hidden = true
          // for (let i = 0; i < GridRowData.length; i++) {
          //   if (GridRowData[i].PTAG == this[Mast].filter(x => x.selected == true)[0].name && GridRowData[i].PLANNO == selectedRowsdata[0].PLANNO && GridRowData[i].PTAG != '') {
          //     this.toastr.warning('ENTER ANOTHER TAG OR PLANNO')
          //     return
          //   }
          // }
          if (
            this.L_CODE != "" &&
            this.SRNO != 0 &&
            selectedRows[0].data.PTAG != ""
          ) {
            //CALL RAP CAL SELECTION VALIDATION
            let Obj = {
              L_CODE: this.L_CODE,
              SRNO: this.SRNO,
              PTAG: selectedRows[0].data.PTAG,
              EMP_CODE: this.EMP_CODE,
              PLANNO: selectedRows[0].data.PLANNO,
              IUSER: this.decodedTkn.UserId,
            };
            this.RapCalcServ.RapCalcSelectValidation(Obj).then((RAPVAL) => {
              try {
                if (RAPVAL.success == 1) {
                  if (RAPVAL.data == "TRUE") {
                    // this.tagdisabled = false
                    // this.disabled = false
                  } else {
                    this.toastr.warning(RAPVAL.data);
                    // this.tagdisabled = true
                    selectedRows[0].setDataValue("PTAG", "");
                    // this.disabled = true
                  }
                } else {
                  selectedRows[0].setDataValue("PTAG", "");
                  this.toastr.warning(RAPVAL.data.originalError.info.message);
                  // this.tagdisabled = false
                  // this.disabled = false
                }
              } catch (error) {
                selectedRows[0].setDataValue("PTAG", "");
                this.toastr.error(error);
                console.log(error);

                // this.tagdisabled = false
                // this.disabled = false
              }
            });
          }
        }
      }
    } else {
      //GridRowData FOR FULL DATA
      //selectedRowsdata FOR SELECT DATA
      //SET DATA IN GRID AS PER SELECT CHIPS
      for (let i = 0; i < this.MaingridApi.getSelectedRows().length; i++) {
        switch (Mast) {
          case "PlanArray":
            for (let i = 0; i < GridRowData.length; i++) {
              for (let j = 0; j < selectedRowsdata.length; j++) {
                if (
                  GridRowData[i].PTAG == selectedRowsdata[j].PTAG &&
                  GridRowData[i].PLANNO ==
                  this[Mast].filter((x) => x.selected == true)[0].name &&
                  GridRowData[i].PTAG != ""
                ) {
                  this.toastr.warning("ENTER ANOTHER TAG OR PLANNO");
                  // this.ShowPlan = true;
                  return;
                }
              }
            }
            selectedRows[i].setDataValue(
              "PLANNO",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            // this.ShowPlan = true;
            break;
          case "shapeArray":
            selectedRows[i].setDataValue(
              "PRDS_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "clarityArray":
            selectedRows[i].setDataValue(
              "PRDQ_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "Q_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "colorArray":
            selectedRows[i].setDataValue(
              "PRDC_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "C_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "cutArray":
            selectedRows[i].setDataValue(
              "PRDCUT_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "CUT_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "polArray":
            selectedRows[i].setDataValue(
              "PRDPOL_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "POL_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "symArray":
            selectedRows[i].setDataValue(
              "PRDSYM_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "SYM_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "floArray":
            selectedRows[i].setDataValue(
              "PRDFL_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "FL_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "shadeArray":
            selectedRows[i].setDataValue(
              "PRDSH_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "SH_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "RegArray":
            selectedRows[i].setDataValue(
              "PRDIN_CODE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "IN_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "milkyArray":
            selectedRows[i].setDataValue(
              "PRDMILKY",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "PRDMILKY_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "RSpotArray":
            selectedRows[i].setDataValue(
              "PRDREDSPOT",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "PRDREDSPOT_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
          case "crownOpenArray":
            selectedRows[i].setDataValue(
              "PRDCROWN_OPEN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "culetArray":
            selectedRows[i].setDataValue(
              "PRDCULET",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "extraFacetArray":
            selectedRows[i].setDataValue(
              "PRDEXTFACET",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "eyeCleanArray":
            selectedRows[i].setDataValue(
              "PRDEYECLEAN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "gridleOpenArray":
            selectedRows[i].setDataValue(
              "PRDGIRDLE_OPEN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "grainingArray":
            selectedRows[i].setDataValue(
              "PRDGRAINING",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "PRDGRAINING_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
            case "WHincArr":
            selectedRows[i].setDataValue(
              "PRDWHINC",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            selectedRows[i].setDataValue(
              "PRDWHINC_NAME",
              this[Mast].filter((x) => x.selected == true)[0].name
            );
            break;
            
          case "lusterArray":
            selectedRows[i].setDataValue(
              "PRDLUSTER",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "naturalArray":
            selectedRows[i].setDataValue(
              "PRDNATURAL",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "pavOpenArray":
            selectedRows[i].setDataValue(
              "PRDPAV_OPEN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "sideArray":
            selectedRows[i].setDataValue(
              "PRDSIDE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "sideBlackArray":
            selectedRows[i].setDataValue(
              "PRDSIDE_BLACK",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "sideOpenArray":
            selectedRows[i].setDataValue(
              "PRDSIDE_OPEN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "tableArray":
            selectedRows[i].setDataValue(
              "PRDTABLE",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "tableBlackArray":
            selectedRows[i].setDataValue(
              "PRDTABLE_BLACK",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          case "tableOpenArray":
            selectedRows[i].setDataValue(
              "PRDTABLE_OPEN",
              this[Mast].filter((x) => x.selected == true)[0].code
            );
            break;
          default:
            break;
        }
      }
    }
    this.findRap();
  }

  // checkplus(e) {
  //   let tempData = 0;
  //   let Rowdata = this.MaingridApi.getSelectedRows()[0]
  //   if (Rowdata.ISLOCK) {
  //     this.oldGridData.map((it) => {
  //       it.map((pb) => {

  //         if (pb.PTAG == Rowdata.PTAG) {
  //           tempData = pb.PRDQ_CODE
  //         }
  //       })
  //     })
  //     if (tempData < e.code) {
  //       // let claData = {
  //       //   code: tempData,
  //       //   name: this.clarityArray.find((t) => t.code == tempData).name,
  //       //   selected: true,
  //       // }
  //       // this.SelectItem(claData, 'clarityArray')
  //       // e.code = tempData ;
  //       // e.name = this.clarityArray.find((t) => t.code == tempData).name ;
  //       // e.selected = false;
  //       this.toastr.warning(`You Can't Select`)

  //     }
  //   }
  // }

  //FOR LB & LC SELECT
  SELECTRAPTITEM(Data: any, Mast: any) {

    this[Mast] = this[Mast].map((item) =>
      item.name == Data.name
        ? {
          code: item.code,
          name: item.name,
          selected: true,
        }
        : {
          code: item.code,
          name: item.name,
          selected: false,
        }
    );
    this.RAPTYPE = this[Mast].filter((x) => x.selected == true)[0].name;

    let selectedRows = this.MaingridApi.getSelectedNodes();
    for (let i = 0; i < this.MaingridApi.getSelectedRows().length; i++) {
      selectedRows[i].setDataValue(
        "RAPTYPE",
        this[Mast].filter((x) => x.selected == true)[0].code
      );
    }
    if (this.MaingridApi.getSelectedRows().length == 1) {
      this.findRap();
    }
  }

  SelectRap(Data: any, Mast: any){
    if(Mast == 'shadeArray'){
      let RapType = this.shadeArray1.filter((it) => it.code == Data.code )[0].RAP_TYPE;
      let rt =  this.RAPTArray.filter((it) => it.code == RapType)
      this.SELECTRAPTITEM(rt[0], 'RAPTArray')
    }
  }

  //ADD EMPTY ROW
  AddRow() {
    const newItems = [
      {
        PLNSEL: false,
        PLANNO: 0,
        PTAG: this.CAT_P && this.TEN_DISP_TAG ? 'A' : '',
        EMP_CODE: this.EMP_CODE,
        PRDS_CODE: "",
        PRDQ_CODE: 0,
        Q_NAME: "",
        PRDC_CODE: 0,
        C_NAME: "",
        PRDCARAT: 0,
        PRDCUT_CODE: 1,
        CUT_NAME: "EX",
        PRDMC_CODE: 0,
        PRDMFL_CODE: 0,
        PRDPOL_CODE: 1,
        POL_NAME: "EX",
        PRDSYM_CODE: 1,
        SYM_NAME: "EX",
        PRDFL_CODE: 1,
        FL_NAME: "N",
        PRDIN_CODE: 1,
        IN_NAME: "NONE",
        PRDSH_CODE: 1,
        SH_NAME: "NONE",
        RATE: 0,
        AMT: 0,
        SRATE: 0,
        IGIRATE: 0,
        SAMT: 0,
        IGIAMT: 0,
        RRATE: 0,
        RAMT: 0,
        CPAMT: 0,
        CMAMT: 0,
        QPAMT: 0,
        QMAMT: 0,
        PRDTABLE: 0,
        PRDTABLE_BLACK: 0,
        PRDTABLE_OPEN: 0,
        PRDSIDE: 0,
        PRDSIDE_BLACK: 0,
        PRDSIDE_OPEN: 0,
        PRDCROWN_OPEN: 0,
        PRDGIRDLE_OPEN: 0,
        PRDPAV_OPEN: 0,
        PRDCULET: 0,
        PRDEXTFACET: 0,
        PRDEYECLEAN: 0,
        PRDGRAINING: 1,
        PRDGRAINING_NAME: 'NONE',
        PRDWHINC: 1, 
        PRDWHINC_NAME: 'NONE',
        PRDLUSTER: 0,
        PRDMILKY: 1,
        PRDMILKY_NAME: "NONE",
        PRDNATURAL: 0,
        PRDREDSPOT: 1,
        PRDREDSPOT_NAME: "NONE",
        TYP: "",
        ISLOCK: false,
        PRDDIA_CODE: 0,
        PRDDEPTH_CODE: 0,
        PRDTAB_CODE: 0,
        PRDRAT_CODE: 0,
        CMAMTCOL: "",
        CPAMTCOL: "",
        QMAMTCOL: "",
        QPAMTCOL: "",
        RAPTYPE: "LC",
        V_CODE: 0,
        REM: { code: "" },
        TEN_NAME: { code: "" },
        MC_NAME: { code: "" },
        ADIS: 0,
        COL_REM: "",
        QUA_REM: "",
        I_PCS: 1
      },
    ];
    let GridRowData = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    const res = this.MaingridApi.applyTransaction({
      add: newItems,
      addIndex: GridRowData.length + 1,
    });
    this.claritytrue = false;
    // this.gridApi.ensureIndexVisible(GridRowData.length + 1, null);
    this.MaingridApi.getRowNode(GridRowData.length).setSelected(true, true);
    if (this.CAT_P && this.TEN_DISP_TAG) {
      if (GridRowData.length >= 2) {
        let data = GridRowData[GridRowData.length - 1];
        let selectedData = this.MaingridApi.getSelectedRows();
        this.MaingridApi.getSelectedRows().map((it) => {
          let tagindex = this.getIndexInAlphabet(data.PTAG)[0];
          it.PTAG = this.autocomplete.tagFunction(tagindex + 1);
        });
        this.MaingridApi.redrawRows();
      }
    }

    this.PARAMBTNDIACOL = false;
    this.PARAMBTNDEPTHCOL = false;
    this.PARAMBTNTABCOL = false;
    this.PARAMBTNRATCOL = false;
    this.changeBackground("#f8f8ff", "#33372b");
    this.changeBackground1("#f8f8ff", "#33372b");
    this.changeBackground2("#f8f8ff", "#33372b");
    this.changeBackground3("#f8f8ff", "#33372b");
    this.PRDDIA = "";
  }

  //CLICK ON MAIN GRID ROW
  fg: boolean = false;
  onGridRowClicked(eve: any) {
    if(!this.ShOWGRD){
    let actionType = eve.event.target.getAttribute("data-action-type");

    if (actionType == 'ISIGI') {
      let dataObj = eve.data;
      dataObj.ISIGI = !dataObj.ISIGI;
      eve.node.setData(dataObj)
      eve.api.refreshCells({ force: true })
    }

    if (actionType == "IS_VIW") {
      let GridRowData = [];
      this.MaingridApi.forEachNode(function (rowNode, index) {
        GridRowData.push(rowNode.data);
      });
      let dataObj = eve.data;
      dataObj.PLNSEL = !dataObj.PLNSEL;
      this.MaingridApi.forEachNode(function (rowNode, index) {
        if (rowNode.data.PLANNO == dataObj.PLANNO) {
          rowNode.data.PLNSEL = dataObj.PLNSEL;
        } else {
          rowNode.data.PLNSEL = false;
        }
        rowNode.setData(rowNode.data);
      });
    } else if (actionType == "RELOCK") {
      let dataObj = eve.data;
      dataObj.RELOCK = !dataObj.RELOCK;
      eve.node.setData(dataObj);
      eve.api.refreshCells({ force: true });

      // if (this.decodedTkn.U_CAT == 'S' || this.decodedTkn.U_CAT == 'SA') {
      // let dataObj = eve.data;
      // dataObj.RELOCK = !dataObj.RELOCK;
      // eve.node.setData(dataObj)
      // eve.api.refreshCells({ force: true })
      // } else {
      // let dataObj = eve.data;
      // if (dataObj.RELOCK == true) {
      //   dataObj.RELOCK = true;
      //   eve.node.setData(dataObj)
      //   eve.api.refreshCells({ force: true })
      // } else {
      //   dataObj.RELOCK = !dataObj.RELOCK;
      //   eve.node.setData(dataObj)
      //   eve.api.refreshCells({ force: true })
      // }
      // }

      // let dataObj = eve.data;
      // dataObj.RELOCK = !dataObj.RELOCK;
      // eve.node.setData(dataObj)
      // eve.api.refreshCells({ force: true })
    } else if (actionType == "ISCOMMON") {
      if (this.decodedTkn.U_CAT == "S" || this.decodedTkn.U_CAT == "SA") {
        let dataObj = eve.data;
        dataObj.ISCOMMON = !dataObj.ISCOMMON;
        eve.node.setData(dataObj);
        eve.api.refreshCells({ force: true });
        return;
      }
      if (eve.data.ISCOMMON) {
        if (eve.data.CUSER === this.decodedTkn.UserId) {
          let dataObj = eve.data;
          dataObj.ISCOMMON = !dataObj.ISCOMMON;
          eve.node.setData(dataObj);
          eve.api.refreshCells({ force: true });
        } else if (eve.data.CUSER == "") {
          // this.fg = false
          let dataObj = eve.data;
          dataObj.ISCOMMON = !dataObj.ISCOMMON;
          eve.node.setData(dataObj);
          eve.api.refreshCells({ force: true });
        }
        // else {
        //   this.fg = false;
        // }
      } else {
        let dataObj = eve.data;
        dataObj.ISCOMMON = !dataObj.ISCOMMON;
        eve.node.setData(dataObj);
        eve.api.refreshCells({ force: true });
      }
      // else  {
      //   this.fg = true;

      //   let dataObj = eve.data;
      //   dataObj.ISCOMMON = !dataObj.ISCOMMON;
      //   eve.node.setData(dataObj)
      //   eve.api.refreshCells({ force: true })
      //   // this.fg = false;

      // }
      // else {
      //   this.fg = true;

      //   let dataObj = eve.data;
      //   dataObj.ISCOMMON = !dataObj.ISCOMMON;
      //   eve.node.setData(dataObj)
      //   eve.api.refreshCells({ force: true })
      // }
      //  else if(this.fg){
      //     if(eve.data.CUSER === this.decodedTkn.UserId){
      //       let dataObj = eve.data;
      //       dataObj.ISCOMMON = !dataObj.ISCOMMON;
      //       eve.node.setData(dataObj)
      //       eve.api.refreshCells({ force: true })
      //       this.fg = false;
      //     }
      //   }
    } else if (actionType == "DeleteData") {
      if (this.decodedTkn.U_CAT === "P") {
        this.TENDERDELETE(eve);
        return;
      }
      // if (this.decodedTkn.PROC_CODE == 2 || this.decodedTkn.PROC_CODE == 5 || this.decodedTkn.PROC_CODE == 23) {

      // }
      let DelObj = {
        L_CODE: this.L_CODE ? this.L_CODE : "",
        SRNO: this.SRNO ? this.SRNO : "",
        TAG: this.TAG ? this.TAG : "",
        PRDTYPE: eve.data.PLNSEL === true ? "O" : "OP",
        PLANNO: eve.data.PLANNO ? eve.data.PLANNO : "",
        EMP_CODE: this.EMP_CODE ? this.EMP_CODE : "",
        PTAG: eve.data.PTAG ? eve.data.PTAG : "",
        IUSER: this.decodedTkn.UserId,
        PROC_CODE: this.decodedTkn.PROC_CODE ? this.decodedTkn.PROC_CODE : "",
        // IP: window.location.hostname
        OTAG: eve.data.OTAG,
      };

      this.RapCalcServ.RapCalPrdDel(DelObj).subscribe((DelRes) => {
        try {
          if (DelRes.success == true) {
            let GridRowData = [];
            this.MaingridApi.forEachNode(function (rowNode, index) {
              GridRowData.push(rowNode.data);
            });

            if (
              eve.data.PLANNO === DelObj.PLANNO &&
              eve.data.PTAG === DelObj.PTAG
            ) {
              GridRowData.splice(eve.rowIndex, 1);
            }

            this.MaingridApi.setRowData(GridRowData);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(DelRes.data.originalError.info.message),
            });
          }
        } catch (error) {
          console.log(error);

          this.toastr.error(error);
        }
      });
    } else if (actionType == "TenderData") {
      const rowNodeId = eve.node.id;
      const rowNode = this.MaingridApi.getRowNode(rowNodeId);
      const PRF = this.dialog.open(RapCalcTenderEntryComponent, {
        panelClass: "rap-calc-tender-ent",
        autoFocus: false,
        width: "70vw",
        height: "auto",
        data: rowNode.data,
        disableClose: true,
      });
      $("#Close").click();
      PRF.afterClosed().subscribe((result) => {
        rowNode.setData(result);
      });
    }

    if (eve.event.target.getAttribute("col-id") == "PLANNO") {
      document.getElementById("planDropdown").click();
    }
    if (eve.event.target.getAttribute("col-id") == "PTAG") {
      document.getElementById("tagDropdown").click();
      this.ShowTag = false;
      // this.ShowTag = false;
    }

    if (
      eve.event.target.getAttribute("col-id") == "REM" ||
      eve.event.target.getAttribute("col-id") == "MC_NAME" ||
      eve.event.target.getAttribute("col-id") == "TEN_NAME" ||
      eve.event.target.getAttribute("col-id") == "RELOCK"
    ) {
      this.ENABLEREMARK = true;
    } else {
      this.MaingridApi.redrawRows();
      this.ENABLEREMARK = false;
    }
  }
  }

  //GEID ROW SELECT CHANGE ACTIVE CHIP AS PER CODE
  COLORDATACODE(Data: any, Mast: any) {
    this[Mast] = this[Mast].map((item) =>
      item.code == Data
        ? {
          name: item.name,
          code: item.code,
          selected: true,
        }
        : {
          name: item.name,
          code: item.code,
          selected: false,
        }
    );
    
  }

  //GEID ROW SELECT CHANGE ACTIVE CHIP AS PER NAME
  COLORDATA(Data: any, Mast: any) {
    if (typeof Data == "string" && Mast == "clarityArray") {
      if (this.clarityDisabled && this.calcDisabled && this.Makok != "MakOK") {
        this.clarityDisabled = false;
        this.calcDisabled = false;
        this.clarityCheck = true;
      } else {
        this.clarityDisabled = this.clarityDisabled;
        this.calcDisabled = this.clarityDisabled;
        this.clarityCheck = false;
      }
    }

    this[Mast] = this[Mast].map((item) =>
      item.name == Data
        ? {
          name: item.name,
          code: item.code,
          selected: true,
        }
        : {
          name: item.name,
          code: item.code,
          selected: false,
        }
    );
  }
  //TRIGGER ON ROW SELECTION CHANGE
  async onSelectionChanged(eve: any) {
    if(!this.ShOWGRD){
    // if (this.ENABLEREMARK === true) {
    //   this.ENABLEREMARK = false
    // } else {
    let RowData = eve.api.getSelectedRows()[0];
    if (
      this.decodedTkn.U_CAT != "S" &&
      this.decodedTkn.U_CAT != "SA" &&
      RowData.ISLOCK == true
    ) {
      this.colordisabled = true;
    } else {
      this.colordisabled = false;
    }
    if (
      this.decodedTkn.U_CAT == "S" ||
      this.decodedTkn.U_CAT == "SA" ||
      this.decodedTkn.PROC_CODE == 2 ||
      this.decodedTkn.PROC_CODE == 5 ||
      this.decodedTkn.PROC_CODE == 22 ||
      this.decodedTkn.PROC_CODE == 23
    ) {
      this.disabled = false;
      this.calcDisabled = false;
      this.clarityDisabled = false;

      this.cutDisabled = false;
      this.depthCtrl.enable();
      this.tableCtrl.enable();
      this.ratioCtrl.enable();
      this.diameterCtrl.enable();
      if (
        this.decodedTkn.PROC_CODE == 2 ||
        this.decodedTkn.PROC_CODE == 5 ||
        this.decodedTkn.PROC_CODE == 22 ||
        this.decodedTkn.PROC_CODE == 23
      ) {
        if (RowData.PTAG != "") {
          if (RowData.MAKVW == "MakOK") {
            this.disabled = true;
            this.calcDisabled = true;
            this.clarityDisabled = true;

            this.cutDisabled = true;
            this.clarityCheck = true;
            this.depthCtrl.disable();
            this.tableCtrl.disable();
            this.ratioCtrl.disable();
            this.diameterCtrl.disable();
          } else {
            let R_CODE =
              RowData.REM.code || RowData.REM.code == ""
                ? RowData.REM.code
                : RowData.REM;
            if (R_CODE) {
              this.disabled = false;
              this.calcDisabled = false;
              this.clarityDisabled = false;

              this.cutDisabled = false;
              this.clarityCheck = false;

              this.depthCtrl.enable();
              this.tableCtrl.enable();
              this.ratioCtrl.enable();
              this.diameterCtrl.enable();
            } else {
              if (RowData.ISLOCK == false) {
                this.disabled = false;
                this.calcDisabled = false;
                this.clarityDisabled = false;
                this.cutDisabled = false;
                this.clarityCheck = false;

                this.depthCtrl.enable();
                this.tableCtrl.enable();
                this.ratioCtrl.enable();
                this.diameterCtrl.enable();
              } else {
                this.disabled = true;
                this.calcDisabled = true;
                this.clarityDisabled = true;
                this.cutDisabled = true;
                this.clarityCheck = true;

                this.depthCtrl.disable();
                this.tableCtrl.disable();
                this.ratioCtrl.disable();
                this.diameterCtrl.disable();
              }
            }
          }
        } else {
          this.disabled = false;
          this.calcDisabled = false;
          this.clarityDisabled = false;
          this.cutDisabled = false;
          this.clarityCheck = false;

          this.depthCtrl.enable();
          this.tableCtrl.enable();
          this.ratioCtrl.enable();
          this.diameterCtrl.enable();
        }
      }
    } else {
      if (RowData.ISLOCK == true) {
        this.disabled = true;
        this.calcDisabled = true;
        this.clarityDisabled = true;
        this.cutDisabled = true;
        this.clarityCheck = true;

        this.depthCtrl.disable();
        this.tableCtrl.disable();
        this.ratioCtrl.disable();
        this.diameterCtrl.disable();
      } else {
        if (this.decodedTkn.PROC_CODE == 1) {
          if (
            RowData.EMP_CODE != "" &&
            this.EMP_CODE != RowData.EMP_CODE &&
            RowData.PTAG != ""
          ) {
            this.disabled = true;
            this.calcDisabled = true;
            this.clarityDisabled = true;
            this.clarityCheck = true;
            this.cutDisabled = true;

            this.depthCtrl.disable();
            this.tableCtrl.disable();
            this.ratioCtrl.disable();
            this.diameterCtrl.disable();
          } else {
            this.disabled = false;
            this.calcDisabled = false;
            this.clarityDisabled = false;
            this.cutDisabled = false;
            this.clarityCheck = false;

            this.depthCtrl.enable();
            this.tableCtrl.enable();
            this.ratioCtrl.enable();
            this.diameterCtrl.enable();
          }
        }
      }
    }

    if (this.decodedTkn.PROC_CODE == 2 || this.decodedTkn.PROC_CODE == 23) {
      if (this.ALLOWUPD == true) {
        // this.disabled = false
        this.calcDisabled = false;
        this.clarityDisabled = false;
        this.cutDisabled = false;
        this.clarityCheck = false;

        // this.depthCtrl.enable()
        // this.tableCtrl.enable()
        // this.ratioCtrl.enable()
        // this.diameterCtrl.enable()
      } else {
        if (RowData.FPLNSEL == true) {
          // this.disabled = true
          this.calcDisabled = true;
          this.clarityDisabled = true;
          this.cutDisabled = true;
          this.clarityCheck = true;

          // this.depthCtrl.disable()
          // this.tableCtrl.disable()
          // this.ratioCtrl.disable()
          // this.diameterCtrl.disable()
        }
      }
    }
    this.Makok = RowData.MAKVW;

    if (
      this.decodedTkn.U_CAT != "S" &&
      this.decodedTkn.U_CAT != "SA" &&
      RowData.MAKVW == "MakOK"
    ) {
      this.colordisabled = true;
      this.clarityDisabled = true;
      this.calcDisabled = true;
      this.disabled = true;
      this.cutDisabled = true;
    }

    if (
      this.L_CODE != "" &&
      this.SRNO != 0 &&
      RowData.PTAG != "" &&
      RowData.PLANNO != 0
    ) {
      //CALL RAP CAL SELECTION VALIDATION
      let Obj = {
        L_CODE: this.L_CODE,
        SRNO: this.SRNO,
        PTAG: RowData.PTAG,
        EMP_CODE: this.EMP_CODE,
        PLANNO: RowData.PLANNO,
        IUSER: this.decodedTkn.UserId,
      };

      await this.RapCalcServ.RapCalcSelectValidation(Obj).then((RAPVAL) => {
        try {
          if (RAPVAL.success == 1) {
            if (RAPVAL.data == "TRUE") {
              this.tagdisabled = false;
              // this.disabled = false
            } else {
              this.toastr.warning(RAPVAL.data);
              this.tagdisabled = true;
              // this.disabled = true
            }
          } else {
            this.toastr.warning(RAPVAL.data.originalError.info.message);
            this.tagdisabled = false;
            // this.disabled = false
          }
        } catch (error) {
          console.log(error);

          this.toastr.error(error);
          this.tagdisabled = false;
          // this.disabled = false
        }
      });
    } else {
      this.tagdisabled = false;
      // this.disabled = false
    }
    // COLORDATACODE && COLORDATA THIS TWO METHOD FOR SELECT CHIP
    this.COLORDATACODE(RowData.PRDS_CODE, "shapeArray");
    this.COLORDATA(RowData.PLANNO, "PlanArray");
    this.COLORDATA(RowData.PTAG, "TagArray");
    this.COLORDATA(RowData.Q_NAME, "clarityArray");
    this.COLORDATA(RowData.C_NAME, "colorArray");
    this.COLORDATA(RowData.CUT_NAME, "cutArray");
    this.COLORDATA(RowData.POL_NAME, "polArray");
    this.COLORDATA(RowData.SYM_NAME, "symArray");
    this.COLORDATA(RowData.FL_NAME, "floArray");
    this.COLORDATA(RowData.SH_NAME, "shadeArray");
    this.COLORDATACODE(RowData.PRDIN_CODE, "RegArray");
    this.COLORDATACODE(RowData.PRDCROWN_OPEN, "crownOpenArray");
    this.COLORDATACODE(RowData.PRDCULET, "culetArray");
    this.COLORDATACODE(RowData.PRDEXTFACET, "extraFacetArray");
    this.COLORDATACODE(RowData.PRDEYECLEAN, "eyeCleanArray");
    this.COLORDATACODE(RowData.PRDGIRDLE_OPEN, "gridleOpenArray");
    this.COLORDATACODE(RowData.PRDGRAINING, "grainingArray");
    this.COLORDATACODE(RowData.PRDLUSTER, "lusterArray");
    this.COLORDATACODE(RowData.PRDMILKY, "milkyArray");
    this.COLORDATACODE(RowData.PRDNATURAL, "naturalArray");
    this.COLORDATACODE(RowData.PRDPAV_OPEN, "pavOpenArray");
    this.COLORDATACODE(RowData.PRDSIDE, "sideArray");
    this.COLORDATACODE(RowData.PRDSIDE_BLACK, "sideBlackArray");
    this.COLORDATACODE(RowData.PRDSIDE_OPEN, "sideOpenArray");
    this.COLORDATACODE(RowData.PRDTABLE, "tableArray");
    this.COLORDATACODE(RowData.PRDTABLE_BLACK, "tableBlackArray");
    this.COLORDATACODE(RowData.PRDTABLE_OPEN, "tableOpenArray");
    this.COLORDATACODE(RowData.PRDREDSPOT, "RSpotArray");
    this.COLORDATACODE(RowData.RAPTYPE, "RAPTArray");
    this.COLORDATACODE(RowData.PRDWHINC, "WHincArr");
    this.input = RowData.PRDCARAT;

    this.ADIS = RowData.ADIS;
    this.COL_REMP = RowData.COL_REM == "+" ? true : false;
    this.COL_REMM = RowData.COL_REM == "-" ? true : false;
    this.QUA_REMM = RowData.QUA_REM == "-" ? true : false;
    this.QUA_REMP = RowData.QUA_REM == "+" ? true : false;
    this.COLREM = RowData.COL_REM;
    this.QUAREM = RowData.QUA_REM;
    this.claritytrue = this.QUAREM == "+" ? true : false;
    this.claritytrue1 = this.QUAREM == "-" ? true : false;
    this.colortrue = this.COLREM == "+" ? true : false;
    this.colortrue1 = this.COLREM == "-" ? true : false;

    this.PRDDIA = RowData.PRDDIA ? RowData.PRDDIA : "";
    this.PRDDEPTH = RowData.PRDDEPTH ? RowData.PRDDEPTH : "";
    this.PRDRAT = RowData.PRDRAT ? RowData.PRDRAT : "";
    this.PRDTAB = RowData.PRDTAB ? RowData.PRDTAB : "";
    setTimeout(() => {

      this.I_PCS = RowData.I_PCS ? RowData.I_PCS : 1
      this.R_CARAT = RowData.R_CARAT ? RowData.R_CARAT : 0
    }, 100);

    if (this.PRDDIA != 0) {
      this.PARAMBTNDIACOL = true;
      this.changeBackground("#33372b", "#fff");
    } else {
      this.PARAMBTNDIACOL = false;
      this.changeBackground("#f8f8ff", "#33372b");
    }

    if (this.PRDDEPTH != 0) {
      this.PARAMBTNDEPTHCOL = true;
      this.changeBackground1("#33372b", "#fff");
    } else {
      this.PARAMBTNDEPTHCOL = false;
      this.changeBackground1("#f8f8ff", "#33372b");
    }

    if (this.PRDTAB != 0) {
      this.PARAMBTNTABCOL = true;
      this.changeBackground2("#33372b", "#fff");
    } else {
      this.PARAMBTNTABCOL = false;
      this.changeBackground2("#f8f8ff", "#33372b");
    }

    if (this.PRDRAT != 0) {
      this.PARAMBTNRATCOL = true;
      this.changeBackground3("#33372b", "#fff");
    } else {
      this.PARAMBTNRATCOL = false;
      this.changeBackground3("#f8f8ff", "#33372b");
    }

    // this.COL_REMP
    // this.QUA_REMP

    if (
      this.deptharray.filter((x) => x.code == RowData.PRDDEPTH_CODE).length != 0
    ) {
      this.depthCtrl.setValue(
        this.deptharray.filter((x) => x.code == RowData.PRDDEPTH_CODE)[0].name
      );
      this.DEPTH = this.deptharray.filter(
        (x) => x.code == RowData.PRDDEPTH_CODE
      )[0].name;
    } else {
      this.depthCtrl.setValue(0);
      this.DEPTH = 0;
    }

    if (
      this.diameterarray.filter((x) => x.code == RowData.PRDDIA_CODE).length !=
      0
    ) {
      this.diameterCtrl.setValue(
        this.diameterarray.filter((x) => x.code == RowData.PRDDIA_CODE)[0].name
      );
      this.DIAMETER = this.diameterarray.filter(
        (x) => x.code == RowData.PRDDIA_CODE
      )[0].name;
    } else {
      this.diameterCtrl.setValue(0);
      this.DIAMETER = 0;
    }

    if (
      this.tablearray.filter((x) => x.code == RowData.PRDTAB_CODE).length != 0
    ) {
      this.tableCtrl.setValue(
        this.tablearray.filter((x) => x.code == RowData.PRDTAB_CODE)[0].name
      );
      this.TABLE = this.tablearray.filter(
        (x) => x.code == RowData.PRDTAB_CODE
      )[0].name;
    } else {
      this.tableCtrl.setValue(0);
      this.TABLE = 0;
    }

    if (
      this.ratioarray.filter((x) => x.code == RowData.PRDRAT_CODE).length != 0
    ) {
      this.ratioCtrl.setValue(
        this.ratioarray.filter((x) => x.code == RowData.PRDRAT_CODE)[0].name
      );
      this.RATIO = this.ratioarray.filter(
        (x) => x.code == RowData.PRDRAT_CODE
      )[0].name;
    } else {
      this.ratioCtrl.setValue(0);
      this.RATIO = 0;
    }
    this.findRap();
    }
  }

  onCellValueChanged(params) {
    if (params.column.colId === "REM") {
      let RowData = params.data;
      // if (this.decodedTkn.PROC_CODE == 2 || this.decodedTkn.PROC_CODE == 5 || this.decodedTkn.PROC_CODE == 22 || this.decodedTkn.PROC_CODE == 23) {
      //   let R_CODE = RowData.REM.code || RowData.REM.code == '' ? RowData.REM.code : RowData.REM
      //   if (R_CODE) {
      //     this.disabled = false
      //     this.calcDisabled = false
      //     this.clarityDisabled = false
      //     this.depthCtrl.enable()
      //     this.tableCtrl.enable()
      //     this.ratioCtrl.enable()
      //     this.diameterCtrl.enable()
      //   }
      // }
      if (
        this.decodedTkn.PROC_CODE == 2 ||
        this.decodedTkn.PROC_CODE == 5 ||
        this.decodedTkn.PROC_CODE == 22 ||
        this.decodedTkn.PROC_CODE == 23
      ) {
        if (RowData.PTAG != "") {
          if (RowData.MAKVW == "MakOK") {
            this.disabled = true;
            this.calcDisabled = true;
            this.clarityDisabled = true;
            this.cutDisabled = true;
            this.clarityCheck = false;

            this.depthCtrl.disable();
            this.tableCtrl.disable();
            this.ratioCtrl.disable();
            this.diameterCtrl.disable();
          } else {
            let R_CODE =
              RowData.REM.code || RowData.REM.code == ""
                ? RowData.REM.code
                : RowData.REM;
            if (R_CODE) {
              this.disabled = false;
              this.calcDisabled = false;
              this.cutDisabled = false;
              this.clarityDisabled = false;
              this.clarityCheck = true;

              this.depthCtrl.enable();
              this.tableCtrl.enable();
              this.ratioCtrl.enable();
              this.diameterCtrl.enable();
            } else {
              if (RowData.ISLOCK == false) {
                this.disabled = false;
                this.cutDisabled = false;
                this.calcDisabled = false;
                this.clarityDisabled = false;
                this.clarityCheck = true;

                this.depthCtrl.enable();
                this.tableCtrl.enable();
                this.ratioCtrl.enable();
                this.diameterCtrl.enable();
              } else {
                this.disabled = true;
                this.calcDisabled = true;
                this.clarityDisabled = true;
                this.cutDisabled = true;
                this.clarityCheck = false;

                this.depthCtrl.disable();
                this.tableCtrl.disable();
                this.ratioCtrl.disable();
                this.diameterCtrl.disable();
              }
            }
          }
        } else {
          this.disabled = false;
          this.calcDisabled = false;
          this.clarityDisabled = false;
          this.cutDisabled = false;
          this.clarityCheck = true;

          this.depthCtrl.enable();
          this.tableCtrl.enable();
          this.ratioCtrl.enable();
          this.diameterCtrl.enable();
        }
      }
      if (this.decodedTkn.PROC_CODE == 2 || this.decodedTkn.PROC_CODE == 23) {
        if (this.ALLOWUPD == true) {
          // this.disabled = false
          this.calcDisabled = false;
          this.clarityDisabled = false;
          this.cutDisabled = false;
          this.clarityCheck = true;

          // this.depthCtrl.enable()
          // this.tableCtrl.enable()
          // this.ratioCtrl.enable()
          // this.diameterCtrl.enable()
        } else {
          if (RowData.FPLNSEL == true) {
            // this.disabled = true
            this.calcDisabled = true;
            this.clarityDisabled = true;
            this.cutDisabled = true;
            this.clarityCheck = false;

            // this.depthCtrl.disable()
            // this.tableCtrl.disable()
            // this.ratioCtrl.disable()
            // this.diameterCtrl.disable()
          }
        }
      }
    }

    if (this.CAT_P && this.TEN_DISP_TAG) {
      let GridRowData = [];
      this.MaingridApi.forEachNode(function (rowNode, index) {
        GridRowData.push(rowNode.data);
      });
      if (params.colDef.field == "PLANNO") {
        let PTAG = GridRowData[0];
        for (let i = 0; i < GridRowData.length; i++) {
          let temp = 0;
          // params.data.PTAG = this.autocomplete.tagFunction(GridRowData[0])
          // if(GridRowData[i].PTAG == params.data.PTAG && GridRowData[i].PLANNO == params.data.PLANNO){
          //   if(i != 0){
          //       params.data.PTAG = this.autocomplete.tagFunction(PTAG.PLANNO+1)
          //     } else {
          //       params.data.PTAG = this.autocomplete.tagFunction(GridRowData[0].PLANNO)
          //     }
          //   } else {
          //       params.data.PTAG = this.autocomplete.tagFunction(GridRowData[0].PLANNO)
          //       break;
          //     }
          for (let j = 0; j < GridRowData.length; j++) {
            if (GridRowData[i].PLANNO == GridRowData[j].PLANNO) {
              temp = temp + 1;
              let tag = this.autocomplete.tagFunction(temp);
              if (GridRowData[j].PTAG != tag) {
                GridRowData[j].PTAG = tag;
              }
            }
          }
        }
        this.MaingridApi.setRowData(GridRowData);
        params.api.refreshCells();

        this.gridApi.redrawRows();
      }
    }
  }

  //FILL BY EMPLOYEE
  UPDATEGRID() {
    let EMP = this.EMP_CODE;
    if (this.MaingridApi) {
      this.MaingridApi.forEachNode(function (rowNode, index) {
        rowNode.data.EMP_CODE = EMP;
        rowNode.setData(rowNode.data);
      });
    }
  }

  //COPY ROW AS PER NEW ITEM ARRY
  COPY() {
    if (this.MaingridApi.getSelectedRows().length == 1) {
      let oldplan = this.MaingridApi.getSelectedRows();
      // oldplan.map((it) => {
      //   it.PTAG = this.autocomplete.tagFunction(it.PLANNO +1)
      // })

      const newItems = [
        {
          PLNSEL: false,
          PLANNO: oldplan[0].PLANNO,
          PTAG: this.CAT_P && this.TEN_DISP_TAG ? oldplan[0].PTAG : "",
          EMP_CODE: oldplan[0].EMP_CODE,
          PRDS_CODE: oldplan[0].PRDS_CODE,
          PRDQ_CODE: oldplan[0].PRDQ_CODE,
          Q_NAME: oldplan[0].Q_NAME,
          PRDC_CODE: oldplan[0].PRDC_CODE,
          C_NAME: oldplan[0].C_NAME,
          PRDCARAT: oldplan[0].PRDCARAT,
          PRDCUT_CODE: oldplan[0].PRDCUT_CODE,
          CUT_NAME: oldplan[0].CUT_NAME,
          PRDMC_CODE: oldplan[0].PRDMC_CODE,
          PRDMFL_CODE: oldplan[0].PRDMFL_CODE,
          PRDPOL_CODE: oldplan[0].PRDPOL_CODE,
          POL_NAME: oldplan[0].POL_NAME,
          PRDSYM_CODE: oldplan[0].PRDSYM_CODE,
          SYM_NAME: oldplan[0].SYM_NAME,
          PRDFL_CODE: oldplan[0].PRDFL_CODE,
          FL_NAME: oldplan[0].FL_NAME,
          PRDIN_CODE: oldplan[0].PRDIN_CODE,
          IN_NAME: oldplan[0].IN_NAME,
          PRDSH_CODE: oldplan[0].PRDSH_CODE,
          SH_NAME: oldplan[0].SH_NAME,
          RATE: oldplan[0].RATE,
          AMT: oldplan[0].AMT ? oldplan[0].AMT : 0,
          SRATE: oldplan[0].SRATE,
          IGIRATE: oldplan[0].IGIRATE,
          SAMT: oldplan[0].SAMT,
          IGIAMT: oldplan[0].IGIAMT,
          RRATE: oldplan[0].RRATE,
          RAMT: oldplan[0].RAMT,
          CPAMT: oldplan[0].CPAMT,
          CMAMT: oldplan[0].CMAMT,
          QPAMT: oldplan[0].QPAMT,
          QMAMT: oldplan[0].QMAMT,
          PRDTABLE: oldplan[0].PRDTABLE,
          PRDTABLE_BLACK: oldplan[0].PRDTABLE_BLACK,
          PRDTABLE_OPEN: oldplan[0].PRDTABLE_OPEN,
          PRDSIDE: oldplan[0].PRDSIDE,
          PRDSIDE_BLACK: oldplan[0].PRDSIDE_BLACK,
          PRDSIDE_OPEN: oldplan[0].PRDSIDE_OPEN,
          PRDCROWN_OPEN: oldplan[0].PRDCROWN_OPEN,
          PRDGIRDLE_OPEN: oldplan[0].PRDGIRDLE_OPEN,
          PRDPAV_OPEN: oldplan[0].PRDPAV_OPEN,
          PRDCULET: oldplan[0].PRDCULET,
          PRDEXTFACET: oldplan[0].PRDEXTFACET,
          PRDEYECLEAN: oldplan[0].PRDEYECLEAN,
          PRDGRAINING: oldplan[0].PRDGRAINING,
          PRDGRAINING_NAME: oldplan[0].PRDGRAINING_NAME,
          PRDLUSTER: oldplan[0].PRDLUSTER,
          PRDMILKY: oldplan[0].PRDMILKY,
          PRDMILKY_NAME: oldplan[0].PRDMILKY_NAME,
          PRDNATURAL: oldplan[0].PRDNATURAL,
          PRDREDSPOT: oldplan[0].PRDREDSPOT,
          PRDREDSPOT_NAME: oldplan[0].PRDREDSPOT_NAME,
          TYP: oldplan[0].TYP,
          ISLOCK: false,
          PRDDIA_CODE: oldplan[0].PRDDIA_CODE,
          PRDDEPTH_CODE: oldplan[0].PRDDEPTH_CODE,
          PRDTAB_CODE: oldplan[0].PRDTAB_CODE,
          PRDRAT_CODE: oldplan[0].PRDRAT_CODE,
          CMAMTCOL: oldplan[0].CMAMTCOL,
          CPAMTCOL: oldplan[0].CPAMTCOL,
          QMAMTCOL: oldplan[0].QMAMTCOL,
          QPAMTCOL: oldplan[0].QPAMTCOL,
          RAPTYPE: oldplan[0].RAPTYPE,
          V_CODE: oldplan[0].V_CODE,
          REM: { code: "" },
          TEN_NAME: { code: "" },
          MC_NAME: { code: "" },
          ADIS: 0,
          I_PCS: oldplan[0].I_PCS ? oldplan[0].I_PCS : 1,
          PRDWHINC: oldplan[0].PRDWHINC,
          PRDWHINC_NAME: oldplan[0].PRDWHINC_NAME
          
        },
      ];
      let GridRowData = [];
      this.MaingridApi.forEachNode(function (rowNode, index) {
        GridRowData.push(rowNode.data);
      });
      const res = this.MaingridApi.applyTransaction({
        add: newItems,
        addIndex: GridRowData.length + 1,
      });

      this.MaingridApi.getRowNode(GridRowData.length).setSelected(true, true);

      if (this.CAT_P && this.TEN_DISP_TAG) {
        let selectedData = this.MaingridApi.getSelectedRows();
        selectedData.map((it) => {
          let tagindex = this.getIndexInAlphabet(it.PTAG)[0];
          it.PTAG = this.autocomplete.tagFunction(tagindex + 1);
        });
        this.MaingridApi.redrawRows();
      }

      this.PARAMBTNDIACOL = false;
      this.PARAMBTNDEPTHCOL = false;
      this.PARAMBTNTABCOL = false;
      this.PARAMBTNRATCOL = false;
      this.changeBackground("#f8f8ff", "#33372b");
      this.changeBackground1("#f8f8ff", "#33372b");
      this.changeBackground2("#f8f8ff", "#33372b");
      this.changeBackground3("#f8f8ff", "#33372b");
      this.PRDDIA = "";
    } else {
      this.toastr.warning("Please Select Only One Plan");
    }
  }

  getIndexInAlphabet(chars) {
    var alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    if (!Array.isArray(chars)) {
      if (typeof chars === "string") {
        let tmp = [];
        tmp.push(chars);

        chars = tmp;
      } else {
        throw new Error("Parameter invalid because not of type string.");
      }
    }

    chars.forEach(function (item, i) {
      if (typeof item !== "string") {
        throw new Error(
          "Element " + i + " invalid because not of type string."
        );
      }
    });

    return chars.map(function (char, i) {
      var ret = alphabet.indexOf(char.toLowerCase()) + 1;

      if (ret === 0) {
        throw new Error(
          "Element " + i + " invalid because" + " not an alphabetic character."
        );
      }

      return ret;
    });
  }

  async findRap() {
    let selectedRows = this.MaingridApi.getSelectedNodes();
    let oldplan = this.MaingridApi.getSelectedRows();
    // for(let k = 0; k < oldplan.length; k++){
    //     selectedRows[k].setDataValue('COL_REM', this.COL_REMP ? '+' : this.COL_REMM ? '-' : '' ,)
    //     selectedRows[k].setDataValue('QUA_REM', this.QUA_REMP ? '+' : this.QUA_REMM ? '-' : '' ,)
    // }

    for (let i = 0; i < oldplan.length; i++) {
      if (oldplan[i].S_CODE == "") {
        return;
      }
      if (oldplan[i].Q_CODE == "") {
        return;
      }
      if (oldplan[i].C_CODE == "") {
        return;
      }
      if (oldplan[i].CARAT == '') {
        return;
      }
      if (oldplan[i].CUT_CODE == "") {
        return;
      }
      if (oldplan[i].POL_CODE == "") {
        return;
      }
      if (oldplan[i].SYM_CODE == "") {
        return;
      }
      if (oldplan[i].SH_CODE == "") {
        return;
      }
      await this.TendarEstServ.FindRap({
        S_CODE: oldplan[i].PRDS_CODE,
        Q_CODE: oldplan[i].PRDQ_CODE,
        C_CODE: oldplan[i].PRDC_CODE,
        CARAT: oldplan[i].PRDCARAT,
        CUT_CODE: oldplan[i].PRDCUT_CODE,
        POL_CODE: oldplan[i].PRDPOL_CODE,
        SYM_CODE: oldplan[i].PRDSYM_CODE,
        FL_CODE: oldplan[i].PRDFL_CODE,
        IN_CODE: oldplan[i].PRDIN_CODE,
        SH_CODE: oldplan[i].PRDSH_CODE,
        ML_CODE: oldplan[i].PRDMILKY,
        REF_CODE: oldplan[i].PRDREDSPOT,
        RAPTYPE: oldplan[i].RAPTYPE,
        RTYPE: oldplan[i].TYP ? this.decodedMast[14].find((it) => it.RTYPE == oldplan[i].TYP).ISAUTO ? "S" : oldplan[i].TYP: "S",
      }).then((PCRes) => {
        try {
          if (PCRes.success == true) {
            if (PCRes.data.length != 0) {
              if(PCRes.data[2][0][''] === 'S'){
                this.MANPRICEGIAARR = PCRes.data[0];
              }else if(PCRes.data[2][0][''] === 'R'){
                this.MANPRICELOOSEARR = PCRes.data[0];
              }

              // selectedRows[i].setDataValue("QPAMTCOL", PCRes.data[8][0][""]);
              // selectedRows[i].setDataValue("QMAMTCOL", PCRes.data[10][0][""]);
              // selectedRows[i].setDataValue("CPAMTCOL", PCRes.data[12][0][""]);
              // selectedRows[i].setDataValue("CMAMTCOL", PCRes.data[14][0][""]);
              // selectedRows[i].setDataValue("ORDNO", PCRes.data[15][0]["ORDNO"]);

              // if (this.CUTBUTTONVIS == false) {
              //   this.PRDDIA =
              //     PCRes.data[16][0]["DIA"] == 0 ||
              //       PCRes.data[16][0]["DIA"] == 0.0 ||
              //       PCRes.data[16][0]["DIA"] == "( 0.000+)"
              //       ? ""
              //       : PCRes.data[16][0]["DIA"];
              //   this.PRDDEPTH =
              //     PCRes.data[16][0]["DEP"] == 0 ||
              //       PCRes.data[16][0]["DEP"] == 0.0 ||
              //       PCRes.data[16][0]["DEP"] == "( 0.000+)"
              //       ? ""
              //       : PCRes.data[16][0]["DEP"];
              //   this.PRDTAB =
              //     PCRes.data[16][0]["TAB"] == 0 ||
              //       PCRes.data[16][0]["TAB"] == 0.0 ||
              //       PCRes.data[16][0]["TAB"] == "( 0.000+)"
              //       ? ""
              //       : PCRes.data[16][0]["TAB"];
              //   this.PRDRAT =
              //     PCRes.data[16][0]["RAT"] == 0 ||
              //       PCRes.data[16][0]["RAT"] == 0.0 ||
              //       PCRes.data[16][0]["RAT"] == "( 0.000+)"
              //       ? ""
              //       : PCRes.data[16][0]["RAT"];
              // }
              

              // let netRate = this.ADIS && this.ADIS != 0 ? this.getAdditonalDiscount() : PCRes.data[1][0][''];

              // // selectedRows[i].setDataValue('RATE', PCRes.data[1][0][''])
              // // selectedRows[i].setDataValue('AMT', (PCRes.data[1][0][''] * oldplan[i].PRDCARAT))
              // selectedRows[i].setDataValue('RATE', netRate)
              // selectedRows[i].setDataValue('AMT', (netRate * oldplan[i].PRDCARAT))
              // if (this.CAT_P) {
              //   selectedRows[i].setDataValue("SRATE", PCRes.data[4][0][""]);
              //   selectedRows[i].setDataValue(
              //     "SAMT",
              //     PCRes.data[4][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue("IGIRATE", PCRes.data[17][0][""]);
              //   selectedRows[i].setDataValue(
              //     "IGIAMT",
              //     PCRes.data[17][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue("RRATE", PCRes.data[6][0][""]);
              //   selectedRows[i].setDataValue(
              //     "RAMT",
              //     PCRes.data[6][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue(
              //     "QPAMT",
              //     PCRes.data[7][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue(
              //     "QMAMT",
              //     PCRes.data[9][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue(
              //     "CPAMT",
              //     PCRes.data[11][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              //   selectedRows[i].setDataValue(
              //     "CMAMT",
              //     PCRes.data[13][0][""] * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              // } else {
              //   selectedRows[i].setDataValue(
              //     "SAMT",
              //     PCRes.data[4][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue("RRATE", PCRes.data[6][0][""]);
              //   selectedRows[i].setDataValue(
              //     "RAMT",
              //     PCRes.data[6][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue(
              //     "QPAMT",
              //     PCRes.data[7][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue(
              //     "QMAMT",
              //     PCRes.data[9][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue(
              //     "CPAMT",
              //     PCRes.data[11][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue(
              //     "CMAMT",
              //     PCRes.data[13][0][""] * oldplan[i].PRDCARAT
              //   );
              //   selectedRows[i].setDataValue(
              //     "IGIAMT",
              //     PCRes.data[17][0][""] * oldplan[i].PRDCARAT
              //   );
              // }
              // selectedRows[i].setDataValue(
              //   "COL_REM",
              //   this.COL_REMP ? "+" : this.COL_REMM ? "-" : ""
              // );
              // selectedRows[i].setDataValue(
              //   "QUA_REM",
              //   this.QUA_REMP ? "+" : this.QUA_REMM ? "-" : ""
              // );

              if (PCRes.data[2][0][""] == "S" || PCRes.data[2][0][""] == "OG") {
                this.RAPARR = "GIA";
                this.PriceLoadGridData(PCRes.data[0]);
              } else if (
                PCRes.data[2][0][""] == "R" ||
                PCRes.data[2][0][""] == "OL"
              ) {
                this.RAPARR = "LOOSE";
                this.PriceLoadGridData(PCRes.data[0]);
              } else if (PCRes.data[2][0][""] == "I") {
                this.RAPARR = "IGI";
                this.MANPRICEIGIARR = PCRes.data[3];
                this.PriceLoadGridData(PCRes.data[0]);
              }

              let netRate = PCRes.data[1][0][""]

              // if (RAPTYP.success == 1) {
                selectedRows[i].setDataValue("TYP", PCRes.data[2][0]['']);
                this.MaingridApi.redrawRows();
                  this.ISAUTO = this.decodedMast[14].find((it) => it.RTYPE == PCRes.data[2][0]['']).ISAUTO
                // this.ADIS && this.ADIS != 0
                //   ? this.getAdditonalDiscount()
                //   : PCRes.data[1][0][""];

              // if (this.CAT_P) {
              //   selectedRows[i].setDataValue("RATE", netRate);
              //   selectedRows[i].setDataValue(
              //     "AMT",
              //     netRate * oldplan[i].PRDCARAT * this.I_PCS
              //   );
              // } else {
                selectedRows[i].setDataValue("RATE", netRate);
                selectedRows[i].setDataValue(
                  "AMT",
                  netRate * oldplan[i].PRDCARAT
                );
              // }

              let GridRowData = [];
              this.MaingridApi.forEachNode(function (rowNode, index) {
                GridRowData.push(rowNode.data);
              });
              let planarrys = GridRowData.map((item) => {
                return {
                  PLANNO: item.PLANNO,
                  AMT: item.AMT,
                  CARAT: item.PRDCARAT,
                  PLNSEL: item.PLNSEL,
                };
              });
              const a = (data) =>
                data.reduce((acc, { PLANNO, AMT, CARAT, PLNSEL }) => {
                  const item = acc.find((el) => el.PLANNO === PLANNO);
                  if (item) item.AMT += AMT;
                  if (item)
                    item.CARAT = parseFloat(item.CARAT) + parseFloat(CARAT);
                  if (item) item.PLNSEL = PLNSEL;
                  else acc.push({ PLANNO, AMT, CARAT, PLNSEL });
                  return acc;
                }, []);
              this.PLANGRIDARR = a(planarrys);
              this.PLANGRIDARR = this.PLANGRIDARR.map((item) => {
                return {
                  PLANNO: item.PLANNO,
                  AMT: item.AMT,
                  CARAT: item.CARAT,
                  PLNSEL: item.PLNSEL,
                  PCARAT: item.AMT / this.ROUCARAT,
                };
              });
              this.LoadGridData(this.PLANGRIDARR);
              let POL = 0;
              for (let m = 0; m < GridRowData.length; m++) {
                if (GridRowData[m].PLANNO == oldplan[i].PLANNO) {
                  POL += parseFloat(GridRowData[m].PRDCARAT);
                }
              }

              this.POLCARAT = POL.toFixed(3);
              let findAmt = this.PLANGRIDARR.filter(
                (x) => x.PLANNO == oldplan[i].PLANNO
              );
              if (findAmt.length != 0) {
                this.TOTAMT = parseInt(findAmt[0].AMT);
              } else {
                this.TOTAMT = 0.0;
              }
            } else {
              this.MANPRICEGIAARR = [];
              this.MANPRICELOOSEARR = [];
              this.MANPRICEIGIARR = [];
              this.PLANGRIDARR = [];

              selectedRows[i].setDataValue("QPAMTCOL", 0);
              selectedRows[i].setDataValue("QMAMTCOL", 0);
              selectedRows[i].setDataValue("CPAMTCOL", 0);
              selectedRows[i].setDataValue("CMAMTCOL", 0);
              selectedRows[i].setDataValue("ORDNO", 0);

              // let netRate = this.ADIS && this.ADIS != 0 ? this.getAdditonalDiscount() : PCRes.data[1][0][''];

              // // selectedRows[i].setDataValue('RATE', PCRes.data[1][0][''])
              // // selectedRows[i].setDataValue('AMT', (PCRes.data[1][0][''] * oldplan[i].PRDCARAT))
              // selectedRows[i].setDataValue('RATE', netRate)
              // selectedRows[i].setDataValue('AMT', (netRate * oldplan[i].PRDCARAT))
              selectedRows[i].setDataValue("SRATE", 0);
              selectedRows[i].setDataValue("IGIRATE", 0);
              selectedRows[i].setDataValue("SAMT", 0);
              selectedRows[i].setDataValue("IGIAMT", 0);
              selectedRows[i].setDataValue("RRATE", 0);
              selectedRows[i].setDataValue("RAMT", 0);
              selectedRows[i].setDataValue("QPAMT", 0);
              selectedRows[i].setDataValue("QMAMT", 0);
              selectedRows[i].setDataValue("CPAMT", 0);
              selectedRows[i].setDataValue("CMAMT", 0);
              this.PricegridApi.setRowData([]);

              selectedRows[i].setDataValue("COL_REM", "");
              selectedRows[i].setDataValue("QUA_REM", "");

              selectedRows[i].setDataValue("RATE", 0);
              selectedRows[i].setDataValue("AMT", 0);

              this.MaingridApi.refreshCells({ force: true });
              this.PricegridApi.refreshCells({ force: true });
            }

            // this.COL_REMP = false;
            // this.QUA_REMP = false;

            this.NETPER = (
              (parseFloat(this.POLCARAT) / parseFloat(this.ROUCARAT)) *
              100
            ).toFixed(2);
            this.PERCARAT = (
              parseFloat(this.TOTAMT) / parseFloat(this.ROUCARAT)
            ).toFixed(2);

            // this.RapCalcServ.FindRapType({
            //   S_CODE: oldplan[i].PRDS_CODE,
            //   Q_CODE: oldplan[i].PRDQ_CODE,
            //   C_CODE: oldplan[i].PRDC_CODE,
            //   CARAT: oldplan[i].PRDCARAT,
            //   CUT_CODE: oldplan[i].PRDCUT_CODE,
            //   POL_CODE: oldplan[i].PRDPOL_CODE,
            //   SYM_CODE: oldplan[i].PRDSYM_CODE,
            //   FL_CODE: oldplan[i].PRDFL_CODE,
            //   IN_CODE: oldplan[i].PRDIN_CODE,
            //   SH_CODE: oldplan[i].PRDSH_CODE,
            //   TABLE: oldplan[i].PRDTABLE_CODE,
            //   TABLE_BLACK: oldplan[i].PRDTABLE_BLACK,
            //   TABLE_OPEN: oldplan[i].PRDTABLE_OPEN,
            //   SIDE: oldplan[i].PRDSIDE,
            //   SIDE_BLACK: oldplan[i].PRDSIDE_BLACK,
            //   SIDE_OPEN: oldplan[i].PRDSIDE_OPEN,
            //   CROWN_OPEN: oldplan[i].PRDCROWN_OPEN,
            //   GIRDLE_OPEN: oldplan[i].PRDGIRDLE_OPEN,
            //   PAV_OPEN: oldplan[i].PRDPAV_OPEN,
            //   CULET: oldplan[i].PRDCULET,
            //   EXTFACET: oldplan[i].PRDEXTFACET,
            //   EYECLAEN: oldplan[i].PRDEYECLEAN,
            //   GRAINING: oldplan[i].PRDGRAINING,
            //   LUSTER: oldplan[i].PRDLUSTER,
            //   MILKY: oldplan[i].PRDMILKY,
            //   NATURAL: oldplan[i].PRDNATURAL,
            //   REDSPOT: oldplan[i].PRDREDSPOT,
            //   V_CODE: this.V_CODE == null ? 0 : this.V_CODE,
            //   RAPTYPE: oldplan[i].RAPTYPE,
            //   DIA: oldplan[i].PRDDIA_CODE,
            //   DEPTH: oldplan[i].PRDDEPTH_CODE,
            //   RATIO: oldplan[i].PRDRAT_CODE,
            //   TAB: oldplan[i].PRDTAB_CODE,
            //   ISORD: true,
            //   // RTYPE: oldplan[i].TYP != 'OG' || oldplan[i].TYP != 'OL' || oldplan[i].TYP != ''? this.rapArray.find((it) => it.code == oldplan[i].TYP).ISAUTO ? '' : oldplan[i].TYP : '',
            //   RTYPE: oldplan[i].TYP
            //     ? this.decodedMast[14].find((it) => it.RTYPE == oldplan[i].TYP)
            //       .ISAUTO
            //       ? ""
            //       : oldplan[i].TYP
            //     : "",
            //   COL_REM: this.COL_REMP ? "+" : this.COL_REMM ? "-" : "",
            //   QUA_REM: this.QUA_REMP ? "+" : this.QUA_REMM ? "-" : "",
            //   ODIA: oldplan[i].PRDDIA,
            //   ODEPTH: oldplan[i].PRDDEPTH,
            //   ORATIO: oldplan[i].PRDRAT,
            //   OTAB: oldplan[i].PRDTAB,
            //   ISMFG: false,
            // }).then((RAPTYP) => {
            //   try {
            //     if (RAPTYP.success == 1) {
            //       selectedRows[i].setDataValue("TYP", RAPTYP.data);
            //       this.MaingridApi.redrawRows();
            //       if(RAPTYP.data){
            //         this.ISAUTO = this.decodedMast[14].find((it) => it.RTYPE == RAPTYP.data).ISAUTO
            //       }
            //       // if (RAPTYP.data == 'S'  || 'OG') {
            //       //   return { background: '#b4ffb4' };
            //       // } else {
            //       //   return { background: '#FFFFFF' };
            //       // }
            //     }
            //   } catch (error) {
            //     console.log(error);
            //     this.toastr.error(error);
            //   }
            // });
          } else {
          }
        } catch (error) {
          console.log(error);
          // this.clear();
          // this.CLEAR('')
          this.toastr.error(error);
        }
      });
    }
    this.MaingridApi.redrawRows();
  }

  async findRapNoEmp(data) {
    for (let i = 0; i < data.length; i++) {
      // if (data[i].PRDS_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDQ_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDC_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDCARAT == "") {
      //   return;
      // }
      // if (data[i].PRDCUT_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDPOL_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDSYM_CODE == "") {
      //   return;
      // }
      // if (data[i].PRDSH_CODE == "") {
      //   return;
      // }

      if (data[i].PRDS_CODE != "" && data[i].PRDQ_CODE != "" && data[i].PRDC_CODE != "" && data[i].PRDCARAT != "" && data[i].PRDCUT_CODE != "" && data[i].PRDPOL_CODE != "" && data[i].PRDSYM_CODE != "" && data[i].PRDSH_CODE != "") {
        await this.RapCalcServ.FindRap({
          S_CODE: data[i].PRDS_CODE,
          Q_CODE: data[i].PRDQ_CODE,
          C_CODE: data[i].PRDC_CODE,
          CARAT: data[i].PRDCARAT,
          CUT_CODE: data[i].PRDCUT_CODE,
          POL_CODE: data[i].PRDPOL_CODE,
          SYM_CODE: data[i].PRDSYM_CODE,
          FL_CODE: data[i].PRDFL_CODE,
          IN_CODE: data[i].PRDIN_CODE,
          SH_CODE: data[i].PRDSH_CODE,
          TABLE: data[i].PRDTABLE_CODE,
          TABLE_BLACK: data[i].PRDTABLE_BLACK,
          TABLE_OPEN: data[i].PRDTABLE_OPEN,
          SIDE: data[i].PRDSIDE,
          SIDE_BLACK: data[i].PRDSIDE_BLACK,
          SIDE_OPEN: data[i].PRDSIDE_OPEN,
          CROWN_OPEN: data[i].PRDCROWN_OPEN,
          GIRDLE_OPEN: data[i].PRDGIRDLE_OPEN,
          PAV_OPEN: data[i].PRDPAV_OPEN,
          CULET: data[i].PRDCULET,
          EXTFACET: data[i].PRDEXTFACET,
          EYECLAEN: data[i].PRDEYECLEAN,
          GRAINING: data[i].PRDGRAINING,
          LUSTER: data[i].PRDLUSTER,
          MILKY: data[i].PRDMILKY,
          NATURAL: data[i].PRDNATURAL,
          REDSPOT: data[i].PRDREDSPOT,
          V_CODE: this.V_CODE ? this.V_CODE : 0,
          RAPTYPE: this.RAPTYPE,
          DIA: data[i].PRDDIA_CODE,
          DEPTH: data[i].PRDDEPTH_CODE,
          RATIO: data[i].PRDRAT_CODE,
          TAB: data[i].PRDTAB_CODE,
          ISORD: true,
          RTYPE: data[i].TYP
            ? this.decodedMast[14].find((it) => it.RTYPE == data[i].TYP).ISAUTO
              ? ""
              : data[i].TYP
            : "",
          COL_REM: this.COL_REMP ? "+" : this.COL_REMM ? "-" : "",
          QUA_REM: this.QUA_REMP ? "+" : this.QUA_REMM ? "-" : "",
          ODIA: data[i].PRDDIA,
          ODEPTH: data[i].PRDDEPTH,
          ORATIO: data[i].PRDRAT,
          OTAB: data[i].PRDTAB,
          ISMFG: false,
        }).then((PCRes) => {
          try {
            if (PCRes.success == true) {
              if (PCRes.data.length != 0) {
                this.MANPRICEGIAARR = PCRes.data[3];
                this.MANPRICELOOSEARR = PCRes.data[5];

                data[i].QPAMTCOL = PCRes.data[8][0][""];
                data[i].QMAMTCOL = PCRes.data[10][0][""];
                data[i].CPAMTCOL = PCRes.data[12][0][""];
                data[i].CMAMTCOL = PCRes.data[14][0][""];
                data[i].ORDNO = PCRes.data[15][0]["ORDNO"];

                data[i].RATE = PCRes.data[1][0][""];
                data[i].AMT = PCRes.data[1][0][""] * data[i].PRDCARAT;
                data[i].SRATE = PCRes.data[4][0][""];
                data[i].IGIRATE = PCRes.data[17][0][""];
                data[i].SAMT = PCRes.data[4][0][""] * data[i].PRDCARAT;
                data[i].IGIAMT = PCRes.data[17][0][""] * data[i].PRDCARAT;
                data[i].RRATE = PCRes.data[6][0][""];
                data[i].RAMT = PCRes.data[6][0][""] * data[i].PRDCARAT;
                data[i].QPAMT = PCRes.data[7][0][""] * data[i].PRDCARAT;
                data[i].QMAMT = PCRes.data[9][0][""] * data[i].PRDCARAT;
                data[i].CPAMT = PCRes.data[11][0][""] * data[i].PRDCARAT;
                data[i].CMAMT = PCRes.data[13][0][""] * data[i].PRDCARAT;
                if (PCRes.data[2][0][""] == "S" || PCRes.data[2][0][""] == "OG") {
                  this.RAPARR = "GIA";
                  this.PriceLoadGridData(PCRes.data[0]);
                } else if (
                  PCRes.data[2][0][""] == "R" ||
                  PCRes.data[2][0][""] == "OL"
                ) {
                  this.RAPARR = "LOOSE";
                  this.PriceLoadGridData(PCRes.data[0]);
                } else if (PCRes.data[2][0][""] == "I") {
                  this.RAPARR = "IGI";
                  this.PriceLoadGridData(PCRes.data[0]);
                }
                let GridRowData = [];
                this.MaingridApi.forEachNode(function (rowNode, index) {
                  GridRowData.push(rowNode.data);
                });
                let planarrys = GridRowData.map((item) => {
                  return {
                    PLANNO: item.PLANNO,
                    AMT: item.AMT,
                    CARAT: item.PRDCARAT,
                    PLNSEL: item.PLNSEL,
                  };
                });
                const a = (data) =>
                  data.reduce((acc, { PLANNO, AMT, CARAT, PLNSEL }) => {
                    const item = acc.find((el) => el.PLANNO === PLANNO);
                    if (item) item.AMT += AMT;
                    if (item)
                      item.CARAT = parseFloat(item.CARAT) + parseFloat(CARAT);
                    if (item) item.PLNSEL = PLNSEL;
                    else acc.push({ PLANNO, AMT, CARAT, PLNSEL });
                    return acc;
                  }, []);
                this.PLANGRIDARR = a(planarrys);
                this.PLANGRIDARR = this.PLANGRIDARR.map((item) => {
                  return {
                    PLANNO: item.PLANNO,
                    AMT: item.AMT,
                    CARAT: item.CARAT,
                    PLNSEL: item.PLNSEL,
                    PCARAT: item.AMT / this.ROUCARAT,
                  };
                });
                this.LoadGridData(this.PLANGRIDARR);
                let POL = 0;
                for (let m = 0; m < GridRowData.length; m++) {
                  if (GridRowData[m].PLANNO == data[i].PLANNO) {
                    POL += parseFloat(GridRowData[m].PRDCARAT);
                  }
                }
                this.POLCARAT = POL.toFixed(3);
                this.TOTAMT = parseInt(
                  this.PLANGRIDARR.filter((x) => x.PLANNO == data[i].PLANNO)[0]
                    .AMT
                )
                  ? parseInt(
                    this.PLANGRIDARR.filter(
                      (x) => x.PLANNO == data[i].PLANNO
                    )[0].AMT
                  )
                  : 0;
                this.NETPER = (
                  (parseFloat(this.POLCARAT) / parseFloat(this.ROUCARAT)) *
                  100
                ).toFixed(2);
                this.PERCARAT = (
                  parseFloat(this.TOTAMT) / parseFloat(this.ROUCARAT)
                ).toFixed(2);
              } else {
                this.MANPRICEGIAARR = [];
                this.MANPRICELOOSEARR = [];
                this.MANPRICEIGIARR = [];
                this.PLANGRIDARR = [];

                data[i].QPAMTCOL = 0;
                data[i].QMAMTCOL = 0;
                data[i].CPAMTCOL = 0;
                data[i].CMAMTCOL = 0;
                data[i].ORDNO = 0;
                data[i].RATE = 0;
                data[i].AMT = 0;
                data[i].SRATE = 0;
                data[i].IGIRATE = 0;
                data[i].SAMT = 0;
                data[i].IGIAMT = 0;
                data[i].RRATE = 0;
                data[i].RAMT = 0;
                data[i].QPAMT = 0;
                data[i].QMAMT = 0;
                data[i].CPAMT = 0;
                data[i].CMAMT = 0;

                this.PricegridApi.setRowData([]);
                this.MaingridApi.refreshCells({ force: true });
                this.PricegridApi.refreshCells({ force: true });
              }

              this.RapCalcServ.FindRapType({
                S_CODE: data[i].PRDS_CODE,
                Q_CODE: data[i].PRDQ_CODE,
                C_CODE: data[i].PRDC_CODE,
                CARAT: data[i].PRDCARAT,
                CUT_CODE: data[i].PRDCUT_CODE,
                POL_CODE: data[i].PRDPOL_CODE,
                SYM_CODE: data[i].PRDSYM_CODE,
                FL_CODE: data[i].PRDFL_CODE,
                IN_CODE: data[i].PRDIN_CODE,
                SH_CODE: data[i].PRDSH_CODE,
                TABLE: data[i].PRDTABLE_CODE,
                TABLE_BLACK: data[i].PRDTABLE_BLACK,
                TABLE_OPEN: data[i].PRDTABLE_OPEN,
                SIDE: data[i].PRDSIDE,
                SIDE_BLACK: data[i].PRDSIDE_BLACK,
                SIDE_OPEN: data[i].PRDSIDE_OPEN,
                CROWN_OPEN: data[i].PRDCROWN_OPEN,
                GIRDLE_OPEN: data[i].PRDGIRDLE_OPEN,
                PAV_OPEN: data[i].PRDPAV_OPEN,
                CULET: data[i].PRDCULET,
                EXTFACET: data[i].PRDEXTFACET,
                EYECLAEN: data[i].PRDEYECLEAN,
                GRAINING: data[i].PRDGRAINING,
                LUSTER: data[i].PRDLUSTER,
                MILKY: data[i].PRDMILKY,
                NATURAL: data[i].PRDNATURAL,
                REDSPOT: data[i].PRDREDSPOT,
                V_CODE: this.V_CODE == null ? 0 : this.V_CODE,
                RAPTYPE: data[i].RAPTYPE,
                DIA: data[i].PRDDIA_CODE,
                DEPTH: data[i].PRDDEPTH_CODE,
                RATIO: data[i].PRDRAT_CODE,
                TAB: data[i].PRDTAB_CODE,
                ISORD: true,
                RTYPE: data[i].TYP
                  ? this.decodedMast[14].find((it) => it.RTYPE == data[i].TYP)
                    .ISAUTO
                    ? ""
                    : data[i].TYP
                  : "",
                COL_REM: this.COL_REMP ? "+" : this.COL_REMM ? "-" : "",
                QUA_REM: this.QUA_REMP ? "+" : this.QUA_REMM ? "-" : "",
                ODIA: data[i].PRDDIA,
                ODEPTH: data[i].PRDDEPTH,
                ORATIO: data[i].PRDRAT,
                OTAB: data[i].PRDTAB,
                ISMFG: false,
              }).then((RAPTYP) => {
                try {
                  if (RAPTYP.success == 1) {
                    data[i].TYP = RAPTYP.data;
                    this.MaingridApi.redrawRows();
                  }
                } catch (error) {
                  console.log(error);
                  this.toastr.error(error);
                }
              });
            } else {
            }
          } catch (error) {
            console.log(error);
            this.toastr.error(error);
          }
        });
      }
    }
    this.MaingridApi.redrawRows();
  }

  onClick() {
    let tempColumnDefs = this.MaincolumnDefs;
    if (this.ISCOMM) {
      tempColumnDefs.map((it) => {
        if (it.field == "ISCOMMON") {
          it.hide = true;
        }
      });
    } else {
      tempColumnDefs.map((it) => {
        if (it.field == "ISCOMMON") {
          it.hide = false;
        }
      });
    }
    // else {
    //   tempColumnDefs.map((it) => {
    //     if(it.field == 'ISCOMMON'){
    //       it.hide = !it.hide
    //     }
    //   })

    // }
    this.MaingridApi.setColumnDefs(tempColumnDefs);
    this.MaingridApi.redrawRows();
  }

  // PRDPrint() {
  //   let PObj = {
  //     L_CODE: this.L_CODE,
  //     SRNO: this.SRNO,
  //     TAG: this.TAG,
  //     TYP: "A",
  //     F_CARAT: 0,
  //     T_CARAT: 0,
  //     S_CODE: "",
  //     GRP: "",
  //     PRDTYPE: "",
  //     PNT: 0,
  //     EMP_CODE: "",
  //   };
  //   this.ViewServ.PrdViewPrint(PObj).subscribe((PRes) => {
  //     try {
  //       if (PRes.success == true) {
  //         var mapForm = document.createElement("form");
  //         mapForm.target = "_blank";
  //         mapForm.method = "POST";

  //         mapForm.action = `http://${this.url}:${this.port}/api/Report/ReportPrint`;

  //         let obj = {
  //           Data: JSON.stringify(PRes.data),
  //           mrtname: "PrdViewPrint",
  //         };
  //         Object.keys(obj).forEach(function (param) {
  //           if (obj[param]) {
  //             var mapInput = document.createElement("input");
  //             mapInput.type = "hidden";
  //             mapInput.name = param;
  //             mapInput.setAttribute("value", obj[param]);
  //             mapForm.appendChild(mapInput);
  //           }
  //         });
  //         document.body.appendChild(mapForm);
  //         mapForm.submit();
  //         document.body.removeChild(mapForm);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

  radioChange(e: any) {
    let selectedRows = this.MaingridApi.getSelectedNodes();
    let oldplan = this.MaingridApi.getSelectedRows();

    // if (e.value == "GIA") {
    //   this.PriceLoadGridData(this.MANPRICEGIAARR);
    // } else if (e.value == "LOOSE") {
    //   this.PriceLoadGridData(this.MANPRICELOOSEARR);
    // } else if (e.value == "IGI") {
      if (!this.decodedMast[14].find((it) => it.RAPNAME == e.value).ISAUTO) {
        for (let i = 0; i < oldplan.length; i++) {
          if(e.value === 'GIA'){
            selectedRows[i].setDataValue("TYP", "S");
          }else if(e.value == "LOOSE"){
            selectedRows[i].setDataValue("TYP", "R");
          }else if(e.value == "IGI"){
            selectedRows[i].setDataValue("TYP", "I");
          }
        }
        this.ISAUTO = this.decodedMast[14].find((it) => it.RAPNAME == e.value).ISAUTO;
        // this.findRap();
      }
      this.PriceLoadGridData(this.MANPRICEIGIARR);
    
    if (this.ISAUTO != this.decodedMast[14].find((it) => it.RAPNAME == e.value).ISAUTO) {
      for (let i = 0; i < oldplan.length; i++) {
        selectedRows[i].setDataValue("TYP", "");
      }
      // this.findRap();
      this.PriceLoadGridData(this.MANPRICEIGIARR);
    }
    this.ISAUTO = this.decodedMast[14].find((it) => it.RAPNAME == e.value).ISAUTO;
    this.findRap();
  }

  PARAMCOMBO(e: any) {
    this.PARAMCHIP = "";
    this.PARAMCHIP = e;

    let Size = [];
    Size = this.SizegridApi.getSelectedNodes();
    if (Size.length != 0) {
      let a = this.decodedMast[40].filter(
        (x) =>
          x.PARAM_NAME == "DEPTH" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.deptharray = a.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddepths = this.depthCtrl.valueChanges.pipe(
        startWith(""),
        map((depth) => (depth ? this.filterdepths(depth) : this.deptharray))
      );
    } else {
      let a = this.decodedMast[40].filter(
        (x) => x.PARAM_NAME == "DEPTH" && x.S_CODE == e
      );
      this.deptharray = a.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddepths = this.depthCtrl.valueChanges.pipe(
        startWith(""),
        map((depth) => (depth ? this.filterdepths(depth) : this.deptharray))
      );
    }

    if (Size.length != 0) {
      let b = this.decodedMast[40].filter(
        (x) =>
          x.PARAM_NAME == "DIAMETER" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.diameterarray = b.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddiameters = this.diameterCtrl.valueChanges.pipe(
        startWith(""),
        map((diameter) =>
          diameter ? this.filterdiameters(diameter) : this.diameterarray
        )
      );
    } else {
      let b = this.decodedMast[40].filter(
        (x) => x.PARAM_NAME == "DIAMETER" && x.S_CODE == e
      );
      this.diameterarray = b.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filtereddiameters = this.diameterCtrl.valueChanges.pipe(
        startWith(""),
        map((diameter) =>
          diameter ? this.filterdiameters(diameter) : this.diameterarray
        )
      );
    }

    if (Size.length != 0) {
      let c = this.decodedMast[40].filter(
        (x) =>
          x.PARAM_NAME == "TABLE" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.tablearray = c.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredtables = this.tableCtrl.valueChanges.pipe(
        startWith(""),
        map((table) => (table ? this.filtertables(table) : this.tablearray))
      );
    } else {
      let c = this.decodedMast[40].filter(
        (x) => x.PARAM_NAME == "TABLE" && x.S_CODE == e
      );
      this.tablearray = c.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredtables = this.tableCtrl.valueChanges.pipe(
        startWith(""),
        map((table) => (table ? this.filtertables(table) : this.tablearray))
      );
    }

    if (Size.length != 0) {
      let d = this.decodedMast[40].filter(
        (x) =>
          x.PARAM_NAME == "RATIO" &&
          x.S_CODE == e &&
          x.SZ_CODE == Size[0].data.SZ_CODE
      );
      this.ratioarray = d.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredratios = this.ratioCtrl.valueChanges.pipe(
        startWith(""),
        map((ratio) => (ratio ? this.filterratios(ratio) : this.ratioarray))
      );
    } else {
      let d = this.decodedMast[40].filter(
        (x) => x.PARAM_NAME == "RATIO" && x.S_CODE == e
      );
      this.ratioarray = d.map((item) => {
        return {
          code: item.PARAM_CODE,
          name: "" + item.FMETER + "" + " - " + "" + item.TMETER + "",
        };
      });
      this.filteredratios = this.ratioCtrl.valueChanges.pipe(
        startWith(""),
        map((ratio) => (ratio ? this.filterratios(ratio) : this.ratioarray))
      );
    }
  }

  filterdepths(code: string) {
    return this.deptharray.filter(
      (depth) => depth.name.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  filterdiameters(code: string) {
    return this.diameterarray.filter(
      (diameter) =>
        diameter.name.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  filtertables(code: string) {
    return this.tablearray.filter(
      (table) => table.name.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  filterratios(code: string) {
    return this.ratioarray.filter(
      (ratio) => ratio.name.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  GETDEPTHNAME() {
    if (this.MaingridApi) {
      if (this.deptharray.filter((x) => x.name == this.DEPTH).length != 0) {
        this.DEPTHNAME = this.deptharray.filter(
          (x) => x.name == this.DEPTH
        )[0].code;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue(
            "PRDDEPTH_CODE",
            this.deptharray.filter((x) => x.name == this.DEPTH)[0].code
          );
        }
      } else {
        this.DEPTHNAME = 0;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue("PRDDEPTH_CODE", 0);
        }
      }
      if (this.DEPTH != 0) {
        this.findRap();
      }
    }
  }

  GETDIAMETERNAME() {
    if (this.MaingridApi) {
      if (
        this.diameterarray.filter((x) => x.name == this.DIAMETER).length != 0
      ) {
        this.DIAMETERNAME = this.diameterarray.filter(
          (x) => x.name == this.DIAMETER
        )[0].code;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue(
            "PRDDIA_CODE",
            this.diameterarray.filter((x) => x.name == this.DIAMETER)[0].code
          );
        }
      } else {
        this.DIAMETERNAME = 0;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue("PRDDIA_CODE", 0);
        }
      }
      if (this.DIAMETER != 0) {
        this.findRap();
      }
    }
  }

  GETTABLENAME() {
    if (this.MaingridApi) {
      if (this.tablearray.filter((x) => x.name == this.TABLE).length != 0) {
        this.TABLENAME = this.tablearray.filter(
          (x) => x.name == this.TABLE
        )[0].code;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue(
            "PRDTAB_CODE",
            this.tablearray.filter((x) => x.name == this.TABLE)[0].code
          );
        }
      } else {
        this.TABLENAME = 0;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue("PRDTAB_CODE", 0);
        }
      }
      if (this.TABLE != 0) {
        this.findRap();
      }
    }
  }

  GETRATIONAME() {
    if (this.MaingridApi) {
      if (this.ratioarray.filter((x) => x.name == this.RATIO).length != 0) {
        this.RATIONAME = this.ratioarray.filter(
          (x) => x.name == this.RATIO
        )[0].code;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue(
            "PRDRAT_CODE",
            this.ratioarray.filter((x) => x.name == this.RATIO)[0].code
          );
        }
      } else {
        this.RATIONAME = 0;
        let selectedRows = this.MaingridApi.getSelectedNodes();
        let oldplan = this.MaingridApi.getSelectedRows();
        for (let i = 0; i < oldplan.length; i++) {
          selectedRows[i].setDataValue("PRDRAT_CODE", 0);
        }
      }
      if (this.RATIO != 0) {
        this.findRap();
      }
    }
  }

  isJsonValid(json: any[]): boolean {
    // Step 1: Check if there is no object with PLANNO set to 0
    for (const obj of json) {
      if (obj.PLANNO === 0) {
        this.toastr.warning("Error: PLANNO can not be 0.");
        return false;
      }
    }

    // Step 2: Create a dictionary to store the unique PLANNO values
    const plans: { [planNo: number]: any[] } = {};
    for (const obj of json) {
      if (!plans[obj.PLANNO]) {
        plans[obj.PLANNO] = [];
      }
      plans[obj.PLANNO].push(obj);
    }

    // Step 3: Check if there is an object with PTAG set to "A" for each unique PLANNO
    for (const [planNo, objs] of Object.entries(plans)) {
      let aExists = false;
      for (const obj of objs) {
        if (obj.PTAG === "A") {
          aExists = true;
          break;
        }
      }
      if (!aExists) {
        if (this.CAT_P) {
          if (!this.TEN_DISP_TAG)
            this.toastr.warning(
              `Error: For plan ${planNo}, there must be one entry which has PTAG value set to 'A'`
            );
          return false;
        } else {
          this.toastr.warning(
            `Error: For plan ${planNo}, there must be one entry which has PTAG value set to 'A'`
          );
          return false;
        }
      }
    }
    return true;
  }

  async SAVE() {
    let PLANGRIDARR = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      PLANGRIDARR.push(rowNode.data);
    });
    if (!this.isJsonValid(PLANGRIDARR)) {
      return;
    }
    this.DISABLELOTSRNO = false;
    this.validationrap = true;
    for (let i = 0; i < PLANGRIDARR.length; i++) {
      if (PLANGRIDARR[i].PRDCARAT > this.ROUCARAT) {
        this.toastr.warning("Pol Carat is higher than rough carat");
        return;
      }
      if (PLANGRIDARR[i].PTAG == "") {
        this.toastr.error("Tag is Missing");
        return;
      }
      if (PLANGRIDARR[i].ISCOMMON == true) {
        if (!PLANGRIDARR[i].REM.code) {
          this.toastr.error('Remark is Missing')
          return;
        }
      }
      // if (PLANGRIDARR[i].PRDS_CODE == 'R' && PLANGRIDARR[i].PRDCARAT < '0.03') {
      //   this.toastr.warning(`Polish Carat ${PLANGRIDARR[i].PRDCARAT} is not Allowed`)
      //   return;
      // }
      // if (PLANGRIDARR[i].PRDS_CODE != 'R' && PLANGRIDARR[i].PRDCARAT < '0.05') {
      //   this.toastr.warning(`Polish Carat ${PLANGRIDARR[i].PRDCARAT} is not Allowed`)
      //   return;
      // }
    }
    let newData = this.groupByArray(PLANGRIDARR, "PLANNO");
    let FinalData = [];
    for (let i = 0; i < newData.length; i++) {
      const temp = newData[i].Data.map((item) => item.PTAG);
      let GetDuplicates = temp.reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
        return acc;
      }, []);
      FinalData.push(GetDuplicates);
    }
    if (FinalData[0].length > 0) {
      this.toastr.warning("Tag must be different for all plan no.");
      return;
    }

    const selectedPlans = PLANGRIDARR.filter((x) => x.PLNSEL).map(
      (x) => x.PLANNO
    );

    const selectedPlanNo = selectedPlans[0];

    if (selectedPlans.length === 0) {
      this.toastr.error("No plan selected.");
      return;
    }

    const selectedPlanByPlanNo = PLANGRIDARR.filter(
      (x) => x.PLANNO == selectedPlanNo
    );

    const selectedPlanNoLength = PLANGRIDARR.filter(
      (x) => x.PLANNO == selectedPlanNo
    ).filter((x) => x.PLNSEL === true).length;

    const notSelectedPlanNoLength = PLANGRIDARR.filter(
      (x) => x.PLANNO == selectedPlanNo
    ).filter((x) => x.PLNSEL === false).length;

    if (selectedPlanNoLength !== selectedPlanByPlanNo.length) {
      this.toastr.warning(
        `${notSelectedPlanNoLength} plan not selected for Plan No. ${selectedPlanNo}`
      );
      return;
    }

    if (!this.L_CODE) {
      this.toastr.warning("Lot is required");
      return;
    } else if (!this.SRNO) {
      this.toastr.warning("Srno is required");
      return;
    }

    let GridRowData = [];
    let RapSaveArr = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      if (
        rowNode.data.PLANNO != 0 &&
        rowNode.data.PTAG != "" &&
        rowNode.data.PRDCARAT != 0
      ) {
        GridRowData.push(rowNode.data);
      }
    });
    for (let i = 0; i < GridRowData.length; i++) {
      if (
        !GridRowData[i].PTAG ||
        !GridRowData[i].PRDS_CODE ||
        !GridRowData[i].PRDC_CODE ||
        !GridRowData[i].PRDQ_CODE ||
        !GridRowData[i].PRDCUT_CODE ||
        !GridRowData[i].PRDPOL_CODE ||
        !GridRowData[i].PRDSYM_CODE ||
        !GridRowData[i].PRDFL_CODE ||
        !GridRowData[i].PRDCARAT
      ) {
        this.toastr.error("SomeData is Missing");
        this.validationrap = false;
        return;
      }
      if (GridRowData[i].TYP == "") {
        this.toastr.warning("RapTyp is Missing");
        return;
      }

      if (GridRowData[i].PLNSEL === true) {
        await this.RapCalcServ.RapCalcSaveValidation({
          L_CODE: this.L_CODE,
          SRNO: this.SRNO,
          TAG: this.TAG,
          EMP_CODE: this.EMP_CODE,
          PLANNO: GridRowData[i].PLANNO,
          IUSER: this.decodedTkn.UserId,
        }).then((RAPTYP) => {
          try {
            if (RAPTYP.success == 1) {
              if (RAPTYP.data.includes("=")) {
                this.toastr.warning(RAPTYP.data);
                GridRowData[i].PLANNO = RAPTYP.data.split("=")[1];
                this.MaingridApi.forEachNode(function (rowNode, index) {
                  rowNode.data.PLANNO = RAPTYP.data.split("=")[1];
                });
                this.validationrap = true;
                return;
              } else if (RAPTYP.data != "TRUE") {
                this.toastr.warning(RAPTYP.data);
                this.validationrap = false;
                return;
              }
            } else {
              this.toastr.warning(RAPTYP.data);
              this.validationrap = false;
              return;
            }
          } catch (error) {
            console.log(error);
            this.toastr.error(error);
          }
        });
      }

      const REM =
        GridRowData[i].REM.code || GridRowData[i].REM.code == ""
          ? GridRowData[i].REM.code
          : GridRowData[i].REM;
      const R_CODE = REM
        ? this.RemarkArray.find((item) => item.name === REM).code
        : "";
      const TEN_NAME =
        GridRowData[i].TEN_NAME.code || GridRowData[i].TEN_NAME.code == ""
          ? GridRowData[i].TEN_NAME.code
          : GridRowData[i].TEN_NAME;
      const T_CODE = TEN_NAME
        ? this.TensionArray.find((item) => item.name === TEN_NAME).code
        : "";
      const MC_NAME =
        GridRowData[i].MC_NAME.code || GridRowData[i].MC_NAME.code == ""
          ? GridRowData[i].MC_NAME.code
          : GridRowData[i].MC_NAME;
      const PRDMC_CODE = MC_NAME
        ? this.MCColorArray.find((item) => item.name === MC_NAME).code
        : "";

      GridRowData[i].REM = REM;
      GridRowData[i].R_CODE = R_CODE;
      GridRowData[i].TEN_NAME = TEN_NAME;
      GridRowData[i].T_CODE = T_CODE;
      GridRowData[i].MC_NAME = MC_NAME;
      GridRowData[i].PRDMC_CODE = PRDMC_CODE;

      let SaveObj = {
        L_CODE: this.L_CODE,
        SRNO: this.SRNO,
        TAG: this.TAG,
        PRDTYPE: GridRowData[i].PLNSEL == true ? "O" : "OP",
        PLANNO: GridRowData[i].PLANNO,
        EMP_CODE: this.EMP_CODE,
        PTAG: GridRowData[i].PTAG,
        I_CARAT: this.ROUCARAT,
        PRDS_CODE: GridRowData[i].PRDS_CODE,
        PRDQ_CODE: GridRowData[i].PRDQ_CODE,
        PRDC_CODE: GridRowData[i].PRDC_CODE,
        PRDCARAT: GridRowData[i].PRDCARAT,
        PRDMC_CODE: GridRowData[i].PRDMC_CODE,
        // PRDMC_CODE: GridRowData[i].MC_NAME ? this.MCColorArray.filter(item => item.name == GridRowData[i].MC_NAME.code).map(item => item.code)[0] : '',
        PRDCUT_CODE: GridRowData[i].PRDCUT_CODE,
        PRDPOL_CODE: GridRowData[i].PRDPOL_CODE,
        PRDSYM_CODE: GridRowData[i].PRDSYM_CODE,
        PRDFL_CODE: GridRowData[i].PRDFL_CODE,
        PRDMFL_CODE: GridRowData[i].PRDMFL_CODE,
        PRDIN_CODE: GridRowData[i].PRDIN_CODE,
        PRDSH_CODE: GridRowData[i].PRDSH_CODE,
        PRDTABLE: GridRowData[i].PRDTABLE,
        PRDTABLE_BLACK: GridRowData[i].PRDTABLE_BLACK,
        PRDTABLE_OPEN: GridRowData[i].PRDTABLE_OPEN,
        PRDSIDE: GridRowData[i].PRDSIDE,
        PRDSIDE_BLACK: GridRowData[i].PRDSIDE_BLACK,
        PRDSIDE_OPEN: GridRowData[i].PRDSIDE_OPEN,
        PRDCROWN_OPEN: GridRowData[i].PRDCROWN_OPEN,
        PRDGIRDLE_OPEN: GridRowData[i].PRDGIRDLE_OPEN,
        PRDPAV_OPEN: GridRowData[i].PRDPAV_OPEN,
        PRDCULET: GridRowData[i].PRDCULET,
        PRDEXTFACET: GridRowData[i].PRDEXTFACET,
        PRDEYECLEAN: GridRowData[i].PRDEYECLEAN,
        PRDGRAINING: GridRowData[i].PRDGRAINING,
        PRDLUSTER: GridRowData[i].PRDLUSTER,
        PRDMILKY: GridRowData[i].PRDMILKY,
        PRDNATURAL: GridRowData[i].PRDNATURAL,
        PRDREDSPOT: GridRowData[i].PRDREDSPOT,
        PRDDIA_CODE: GridRowData[i].PRDDIA_CODE,
        PRDRAT_CODE: GridRowData[i].PRDRAT_CODE,
        PRDDEPTH_CODE: GridRowData[i].PRDDEPTH_CODE,
        PRDTAB_CODE: GridRowData[i].PRDTAB_CODE,
        RATE: GridRowData[i].RATE,
        CPRATE: GridRowData[i].CPAMT / GridRowData[i].PRDCARAT,
        CMRATE: GridRowData[i].CMAMT / GridRowData[i].PRDCARAT,
        QPRATE: GridRowData[i].QPAMT / GridRowData[i].PRDCARAT,
        QMRATE: GridRowData[i].QMAMT / GridRowData[i].PRDCARAT,
        PLNSEL: GridRowData[i].PLNSEL,
        FPLNSEL: GridRowData[i].FPLNSEL,
        IUSER: this.decodedTkn.UserId,
        ICOMP: this.decodedTkn.UserId,
        TYP: GridRowData[i].TYP,
        ISSEL:
          GridRowData[i].TYP == "S" || GridRowData[i].TYP == "OG"
            ? true
            : false,
        V_CODE: this.V_CODE ? this.V_CODE : 0,
        RAPTYPE: GridRowData[i].RAPTYPE,
        R_CODE: GridRowData[i].R_CODE,
        // R_CODE: GridRowData[i].REM ? this.RemarkArray.filter(item => item.name == GridRowData[i].REM.code).map(item => item.code)[0] : '',
        T_CODE: GridRowData[i].T_CODE,
        // T_CODE: GridRowData[i].TEN_NAME ? this.TensionArray.filter(item => item.name == GridRowData[i].TEN_NAME.code).map(item => item.code)[0] : '',
        OTAG: GridRowData[i].OTAG,
        // RELOCK: GridRowData[i].RELOCK ? GridRowData[i].RELOCK : 0,
        RELOCK: GridRowData[i].RELOCK,
        ORDNO: GridRowData[i].ORDNO,
        ISCOMMON: GridRowData[i].ISCOMMON,
        ODIA: GridRowData[i].PRDDIA,
        ODEPTH: GridRowData[i].PRDDEPTH,
        ORATIO: GridRowData[i].PRDRAT,
        OTAB: GridRowData[i].PRDTAB,
        PRDGIRDLE: GridRowData[i].PRDGIRDLE,
        MC1: GridRowData[i].MC1,
        MC2: GridRowData[i].MC2,
        MC3: GridRowData[i].MC3,
        TENC_CODE: GridRowData[i].TENC_CODE ? GridRowData[i].TENC_CODE : '',
        YAHUC_CODE: GridRowData[i].YAHUC_CODE ? GridRowData[i].YAHUC_CODE : '',
        SPEC_CODE: GridRowData[i].SPEC_CODE ? GridRowData[i].SPEC_CODE : '',
        NDC_CODE: GridRowData[i].NDC_CODE ? GridRowData[i].NDC_CODE : '',
        YAHUFL_CODE: GridRowData[i].YAHUFL_CODE ? GridRowData[i].YAHUFL_CODE : '',
        TENFL_CODE: GridRowData[i].TENFL_CODE ? GridRowData[i].TENFL_CODE : '',
        NDFL_CODE: GridRowData[i].NDFL_CODE ? GridRowData[i].NDFL_CODE : '',
        TENQ_CODE: GridRowData[i].TENQ_CODE ? GridRowData[i].TENQ_CODE : '',
        NDQ_CODE: GridRowData[i].NDQ_CODE ? GridRowData[i].NDQ_CODE : '',
        MBOXQ_CODE: GridRowData[i].MBOXQ_CODE ? GridRowData[i].MBOXQ_CODE : '',
        PRDWHINC: GridRowData[i].PRDWHINC ? GridRowData[i].PRDWHINC : '',

      };

      RapSaveArr.push(SaveObj);
    }
    if (RapSaveArr.length != 0 && this.validationrap == true) {
      this.RapCalcServ.RapSave(RapSaveArr).subscribe((SaveRes) => {
        this.spinner.hide();
        try {
          if (SaveRes.success == true) {
            this.toastr.success("Prediction Save");
            this.RapCalcServ.PrdTagUpd({
              L_CODE: this.L_CODE,
              SRNO: this.SRNO,
              TAG: this.TAG,
            }).subscribe((PCRes) => {
              try {
                if (PCRes.success == true) {
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(PCRes.data.originalError.info.message),
                  });
                }
              } catch (error) {
                console.log(error);

                this.toastr.error(error);
              }
            });
            let columns = this.MaincolumnDefs;
            this.ISCOMM = false;
            if (!this.ISCOMM) {
              columns.map((it) => {
                if (it.field == "ISCOMMON") {
                  it.hide = true;
                }
              });
            }

            this.MaingridApi.setColumnDefs(columns);
            this.fg = false;

            this.CLEAR("BASIC");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                "Something went Wrong :" +
                SaveRes.data[0].originalError.info.message,
            });
          }
        } catch (error) {
          console.log(error);

          this.toastr.error(error);
        }
      });
    }
  }

  async CLEAR(TYPE: string) {
    if (TYPE === "BASIC") {
      this.L_CODE = "";
      this.SRNO = 0;
      let columns = this.MaincolumnDefs;
      this.ISCOMM = false;
      if (!this.ISCOMM) {
        columns.map((it) => {
          if (it.field == "ISCOMMON" || it.field == 'CUSER') {
            it.hide = true;
          }
        });
      }

      this.MaingridApi.setColumnDefs(columns);
      // this.MaingridApi.redrawRows();
    }
    this.SRNO = 0;
    this.COL_REMP = false;
    this.COL_REMM = false;
    this.QUA_REMP = false;
    this.QUA_REMM = false;
    this.COLREM = "";
    this.QUAREM = "";
    this.I_PCS = 1;
    this.R_CARAT = 0;
    this.SIZE_P = 0;
    // this.findRap();
    this.DISABLELOTSRNO = false;
    this.MaingridApi.setRowData();
    this.PricegridApi.setRowData();
    this.gridApi.setRowData();
    await this.MainLoadGridData();
    this.QPAMTCOL = "";
    this.QMAMTCOL = "";
    this.CPAMTCOL = "";
    this.CMAMTCOL = "";
    this.EMP_CODE = "";
    this.ROUCARAT = 0;
    this.POLCARAT = 0;
    this.TOTAMT = 0;
    this.PERCARAT = 0;
    this.NETPER = 0;
    this.DEPTH = "";
    this.DEPTHNAME = "";
    this.depthCtrl.setValue("");
    this.RATIO = "";
    this.RATIONAME = "";
    this.ratioCtrl.setValue("");
    this.TABLE = "";
    this.TABLENAME = "";
    this.tableCtrl.setValue("");
    this.DIAMETER = "";
    this.DIAMETERNAME = "";
    this.diameterCtrl.setValue("");
    this.MaingridApi.redrawRows({});
    this.MaingridApi.redrawRows();
    this.validationrap = true;
    this.ISCOMM = false;
    this.L_NAME = "";
    this.PARAMBTNDIACOL = false;
    this.PARAMBTNDEPTHCOL = false;
    this.PARAMBTNTABCOL = false;
    this.PARAMBTNRATCOL = false;
    this.changeBackground("#f8f8ff", "#33372b");
    this.changeBackground1("#f8f8ff", "#33372b");
    this.changeBackground2("#f8f8ff", "#33372b");
    this.changeBackground3("#f8f8ff", "#33372b");
    this.PRDDIA = "";
    this.PRDRAT = "";
    this.PRDDEPTH = "";
    this.PRDTAB = "";
    this.showGRDBtn = false;
    this.TENDER_COL = ''
    this.TENCOLNAME = ''
    this.YAHU_COL = ''
    this.YAHU_NAME = ''
    this.SPECTREM_COL = ''
    this.SPECTREMNAME = ''
    this.ND_COL = ''
    this.NDNAME = ''
    this.YAHUDA_FLO = ''
    this.YAHUDA_FLONAME = ''
    this.TEN_FLO = ''
    this.TEN_FLO_NAME = ''
    this.ND_FLO = ''
    this.NDFLONAME = ''
    this.TEN_QUA = ''
    this.TENQUANAME = ''
    this.ND_QUA = ''
    this.NDQUANAME = ''
    this.MBOX_QUA = ''
    this.MBOXQUANAME = ''
  }

  // BREAKINGENTRY() {
  //   const PRF = this.dialog.open(BrkEntComponent, {
  //     panelClass: "brk-ent-dialog",
  //     autoFocus: false,
  //     minWidth: "90vw",
  //     width: "100%",
  //     height: "90%",
  //     data: { L_CODE: this.L_CODE, SRNO: this.SRNO, TAG: this.TAG },
  //     disableClose: true,
  //   });
  //   $("#Close").click();
  //   PRF.afterClosed().subscribe((result) => { });
  // }

  CHECKPER(e: any): boolean {
    if (!this.TAG) {
      return false;
    }
    if (!this.SRNO) {
      return false;
    }
    if (this.VIEWPERARR.filter((x) => x == e).length == 0) {
      return false;
    } else {
      return true;
    }
  }

  async FPrint() {
    this.RapCalcServ.RapPrint({
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
      EMP_CODE: this.EMP_CODE,
    }).then((SaveRes) => {
      this.spinner.hide();
      try {
        if (SaveRes.success == true) {
          var mapForm = document.createElement("form");
          mapForm.target = "_blank";
          mapForm.method = "POST";

          mapForm.action = `http://${this.url}:${this.port}/api/Report/ReportPrint`;

          let obj = {
            Data: JSON.stringify(SaveRes.data),
            mrtname: "RapPrint",
          };
          Object.keys(obj).forEach(function (param) {
            if (obj[param]) {
              var mapInput = document.createElement("input");
              mapInput.type = "hidden";
              mapInput.name = param;
              mapInput.setAttribute("value", obj[param]);
              mapForm.appendChild(mapInput);
            }
          });
          document.body.appendChild(mapForm);
          mapForm.submit();
          document.body.removeChild(mapForm);
        } else {
          this.toastr.warning(SaveRes.data);
        }
      } catch (error) {
        console.log(error);

        this.toastr.error(error);
      }
    });
  }

  onRangeSelectionChanged(params) {
    setTimeout(() => {
      
      const startIndex = this.MaingridApi.getCellRanges()[0].startRow.rowIndex
      const endIndex = this.MaingridApi.getCellRanges()[0].endRow.rowIndex
      for (let rowIndex = startIndex; rowIndex <= endIndex; rowIndex++) {
        const rowNode = params.api.getDisplayedRowAtIndex(rowIndex);
        if (rowNode) {
          rowNode.setSelected(true, false);
          this.selectedRows.push(rowNode.data)
        }
      }
    }, 100);
    // if (!this.clarityCheck) {

    //   this.MaingridApi.forEachNode(function (rowNode, index) {

    //     if (startIndex <= index && endIndex >= index) {
    //       rowNode.setSelected(true);
    //     }
    //   });
    // } else {
    //   this.enableRangeSelection = false;
    // }

    // for(let i = startIndex; i <= endIndex; i++){

    //   this.MaingridApi.getRowNode(i).setSelected(true, true)
    // }
    // this.MaingridApi.redrawRows();
  }

  onDragEnter(params){
  }

  FOCUSNEXT(ele) {
    if (ele === "SRNO") this.RAPCALCSRNO.nativeElement.focus();
    if (ele === "TAG") this.RAPCALCTAG.nativeElement.focus();
  }

  nextenter(id: any) {
    $("#srno").focus();
  }

  async PPrint() {
    this.RapCalcServ.RapPrintOP({
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
      EMP_CODE: this.EMP_CODE,
    }).then((SaveRes) => {
      this.spinner.hide();
      try {
        if (SaveRes.success == true) {
          var mapForm = document.createElement("form");
          mapForm.target = "_blank";
          mapForm.method = "POST";

          mapForm.action = `http://${this.url}:${this.port}/api/Report/ReportPrint`;

          let obj = {
            Data: JSON.stringify(SaveRes.data),
            mrtname: "RapPrintOP",
          };
          Object.keys(obj).forEach(function (param) {
            if (obj[param]) {
              var mapInput = document.createElement("input");
              mapInput.type = "hidden";
              mapInput.name = param;
              mapInput.setAttribute("value", obj[param]);
              mapForm.appendChild(mapInput);
            }
          });
          document.body.appendChild(mapForm);
          mapForm.submit();
          document.body.removeChild(mapForm);
        } else {
          this.toastr.warning(SaveRes.data);
        }
      } catch (error) {
        console.log(error);

        this.toastr.error(error);
      }
    });
  }

  RapCalExport() {
    const C_DATE = this.datepipe.transform(new Date(), "dd/MM/yyyy");
    const ExcelHeader =
      this.L_CODE +
      "-" +
      this.SRNO +
      "-" +
      this.TAG +
      "-(" +
      this.ROUCARAT +
      ") " +
      C_DATE;

    let ExcelObj = {
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
      EMP_CODE: this.EMP_CODE,
      HEADER: ExcelHeader,
    };
    try {
      var mapForm = document.createElement("form");
      mapForm.target = "_blank";
      mapForm.method = "POST";
      mapForm.action = `http://${this.url}:${this.port}/api/RapCalc/RapCalExport`;

      let obj = {
        SheetName: "Plan",
      };

      Object.keys(ExcelObj).forEach(function (param) {
        if (ExcelObj[param]) {
          var mapInput = document.createElement("input");
          mapInput.type = "hidden";
          mapInput.name = param;
          mapInput.setAttribute("value", ExcelObj[param]);
          mapForm.appendChild(mapInput);
        }
      });
      document.body.appendChild(mapForm);
      mapForm.submit();
    } catch (err) {
      this.toastr.warning(err);
    }
  }

  TENDERDISPLAY() {
    this.RapCalcServ.TendarRapCalDisp({
      L_CODE: this.L_CODE,
      SRNO: this.SRNO,
      TAG: this.TAG,
    }).subscribe(async (PCRes) => {
      try {
        if (PCRes.success == true) {
          if (PCRes.data.length != 0) {
            this.L_NAME = PCRes.data[0].L_NAME ? PCRes.data[0].L_NAME : "";
          }
          this.ROUCARAT = PCRes.data.length != 0 && PCRes.data[0].I_CARAT ? PCRes.data[0].I_CARAT : 0
          this.I_PCS = PCRes.data.length != 0 && PCRes.data[0].I_PCS ? PCRes.data[0].I_PCS : 1
          this.R_CARAT = PCRes.data.length != 0 && PCRes.data[0].R_CARAT ? PCRes.data[0].R_CARAT : 0
          this.SIZE_P = (this.R_CARAT / this.I_PCS)
          let a = PCRes.data.map(item => {
            return {
              PLNSEL: item.PLNSEL,
              PLANNO: item.PLANNO,
              PTAG: item.PTAG,
              EMP_CODE: item.EMP_CODE,
              MAKVW: item.MAKVW,
              PRDS_CODE: item.PRDS_CODE,
              PRDQ_CODE: item.PRDQ_CODE,
              DIA: item.DIA,
              Q_NAME:
                this.clarityArray.filter((x) => x.code == item.PRDQ_CODE)
                  .length != 0
                  ? this.clarityArray.filter((x) => x.code == item.PRDQ_CODE)[0]
                    .name
                  : "",
              PRDC_CODE: item.PRDC_CODE,
              C_NAME:
                this.colorArray.filter((x) => x.code == item.PRDC_CODE)
                  .length != 0
                  ? this.colorArray.filter((x) => x.code == item.PRDC_CODE)[0]
                    .name
                  : "",
              PRDCARAT: item.PRDCARAT,
              PRDCUT_CODE: item.PRDCUT_CODE,
              CUT_NAME:
                this.cutArray.filter((x) => x.code == item.PRDCUT_CODE)
                  .length != 0
                  ? this.cutArray.filter((x) => x.code == item.PRDCUT_CODE)[0]
                    .name
                  : "",
              PRDMC_CODE: item.PRDMC_CODE,
              PRDMFL_CODE: item.PRDMFL_CODE,
              PRDPOL_CODE: item.PRDPOL_CODE,
              POL_NAME: this.polArray.filter(
                (x) => x.code == item.PRDPOL_CODE
              )[0].name,
              PRDSYM_CODE: item.PRDSYM_CODE,
              SYM_NAME: this.symArray.filter(
                (x) => x.code == item.PRDSYM_CODE
              )[0].name,
              PRDFL_CODE: item.PRDFL_CODE,
              FL_NAME: this.floArray.filter((x) => x.code == item.PRDFL_CODE)[0]
                .name,
              PRDIN_CODE: item.PRDIN_CODE,
              IN_NAME: this.RegArray.filter((x) => x.code == item.PRDIN_CODE)[0]
                .name,
              PRDSH_CODE: item.PRDSH_CODE,
              SH_NAME: this.shadeArray.filter(
                (x) => x.code == item.PRDSH_CODE
              )[0].name,
              RATE: item.RATE,
              AMT: item.AMT,
              SRATE: item.SRATE,
              IGIRATE: item.IGIRATE,
              SAMT: item.SAMT,
              IGIAMT: item.IGIAMT,
              RRATE: item.RRATE,
              RAMT: item.RAMT,
              CPAMT: item.CPAMT,
              CMAMT: item.CMAMT,
              QPAMT: item.QPAMT,
              QMAMT: item.QMAMT,
              PRDTABLE: item.PRDTABLE,
              PRDTABLE_BLACK: item.PRDTABLE_BLACK,
              PRDTABLE_OPEN: item.PRDTABLE_OPEN,
              PRDSIDE: item.PRDSIDE,
              PRDSIDE_BLACK: item.PRDSIDE_BLACK,
              PRDSIDE_OPEN: item.PRDSIDE_OPEN,
              PRDCROWN_OPEN: item.PRDCROWN_OPEN,
              PRDGIRDLE_OPEN: item.PRDGIRDLE_OPEN,
              PRDPAV_OPEN: item.PRDPAV_OPEN,
              PRDCULET: item.PRDCULET,
              PRDEXTFACET: item.PRDEXTFACET,
              PRDEYECLEAN: item.PRDEYECLEAN,
              PRDGRAINING: item.PRDGRAINING,
              PRDLUSTER: item.PRDLUSTER,
              PRDMILKY: item.PRDMILKY,
              PRDMILKY_NAME: item.PRDMILKY
                ? this.milkyArray.filter((x) => x.code == item.PRDMILKY)[0].name
                : "",
              PRDNATURAL: item.PRDNATURAL,
              PRDREDSPOT: item.PRDREDSPOT,
              PRDREDSPOT_NAME: item.PRDREDSPOT
                ? this.RSpotArray.filter((x) => x.code == item.PRDREDSPOT)[0]
                  .name
                : "",
              TYP: item.TYP,
              ISLOCK: item.ISLOCK,
              PRDDIA_CODE: item.PRDDIA_CODE,
              PRDDEPTH_CODE: item.PRDDEPTH_CODE,
              PRDTAB_CODE: item.PRDTAB_CODE,
              PRDRAT_CODE: item.PRDRAT_CODE,
              CMAMTCOL: "",
              CPAMTCOL: "",
              QMAMTCOL: "",
              QPAMTCOL: "",
              RAPTYPE: item.RAPTYPE,
              V_CODE: item.V_CODE,
              MC1: item.MC1,
              MC2: item.MC2,
              MC3: item.MC3,
              DN: item.DN,
              E1: item.E1,
              E2: item.E2,
              E3: item.E3,
              REM: item.R_CODE
                ? this.RemarkArray.filter((x) => x.code == item.R_CODE).map(
                  (item) => {
                    return { code: item.name };
                  }
                )[0]
                : { code: "" },
              TEN_NAME: item.T_CODE
                ? this.TensionArray.filter((x) => x.code == item.T_CODE).map(
                  (item) => {
                    return { code: item.name };
                  }
                )[0]
                : { code: "" },
              MC_NAME: item.PRDMC_CODE
                ? this.MCColorArray.filter(
                  (x) => x.code == item.PRDMC_CODE
                ).map((item) => {
                  return { code: item.name };
                })[0]
                : { code: "" },
              DEP: item.DEP,
              RAT: item.RAT,
              COMENT: item.COMENT,
              ADIS: item.ADIS,
              COL_REM: item.COL_REM,
              QUA_REM: item.QUA_REM,
              PRDGIRDLE: item.PRDGIRDLE,
              I_PCS: item.I_PCS,
              R_CARAT: item.R_CARAT
            };
          });
          //SET DATE AS PER API RES
          this.MaingridApi.setRowData(a);
          if (a.length == 0) {
            this.MainLoadGridData();
            this.UPDATEGRID();
            this.MaingridApi.redrawRows();
          } else {
            if (a[0].EMP_CODE != "") {
              this.MaingridApi.getRowNode(0).setSelected(true);
              await this.findRap();
              //FOR APPLY COLOR EFFET
              this.MaingridApi.redrawRows({ rowNodes: a });
              this.MaingridApi.redrawRows();
            } else {
              for (let i = 0; i < a.length; i++) {
                this.MaingridApi.getRowNode(i).setSelected(true);
                await this.findRap();
                this.MaingridApi.redrawRows({ rowNodes: a });
                this.MaingridApi.redrawRows();
                this.MaingridApi.getRowNode(i).setSelected(false);
              }
              this.MaingridApi.getRowNode(0).setSelected(true);
            }
          }
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
        } else {
        }
      } catch (error) {
        console.log(error);

        this.toastr.error(error);
      }
    });
  }

  async TENDERSAVE() {
    let PLANGRIDARR = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      PLANGRIDARR.push(rowNode.data);
    });
    if (!this.isJsonValid(PLANGRIDARR)) {
      return;
    }
    this.validationrap = true;

    // const selectedPlans = PLANGRIDARR.filter(x => x.PLNSEL).map(x => x.PLANNO)

    // const selectedPlanNo = selectedPlans[0]

    // if (selectedPlans.length === 0) {
    //   this.toastr.error("No plan selected.")
    //   return
    // }

    // const selectedPlanByPlanNo = PLANGRIDARR.filter(x => x.PLANNO == selectedPlanNo)

    // const selectedPlanNoLength = PLANGRIDARR.filter(x => x.PLANNO == selectedPlanNo).filter(x => x.PLNSEL === true).length

    // const notSelectedPlanNoLength = PLANGRIDARR.filter(x => x.PLANNO == selectedPlanNo).filter(x => x.PLNSEL === false).length

    // if (selectedPlanNoLength !== selectedPlanByPlanNo.length) {
    //   this.toastr.warning(`${notSelectedPlanNoLength} plan not selected for Plan No. ${selectedPlanNo}`)
    //   return;
    // }

    if (!this.L_CODE) {
      this.toastr.warning("Lot is required");
      return;
    } else if (!this.SRNO) {
      this.toastr.warning("Srno is required");
      return;
    } else if (!this.TAG) {
      this.toastr.warning("Tag is required");
      return;
    } else if (this.ROUCARAT == 0 || this.ROUCARAT == "") {
      this.toastr.warning("Please enter Rough Carat.");
      return;
    }

    let GridRowData = [];
    let RapSaveArr = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      if (
        rowNode.data.PLANNNO != 0 &&
        rowNode.data.PTAG != "" &&
        rowNode.data.PRDCARAT != 0
      ) {
        GridRowData.push(rowNode.data);
      }
    });
    for (let i = 0; i < GridRowData.length; i++) {
      if (
        !GridRowData[i].PTAG ||
        !GridRowData[i].PRDS_CODE ||
        !GridRowData[i].PRDC_CODE ||
        !GridRowData[i].PRDQ_CODE ||
        !GridRowData[i].PRDCUT_CODE ||
        !GridRowData[i].PRDPOL_CODE ||
        !GridRowData[i].PRDSYM_CODE ||
        !GridRowData[i].PRDFL_CODE ||
        !GridRowData[i].PRDCARAT
      ) {
        this.toastr.error("SomeData is Missing");
        this.validationrap = false;
        return;
      }
      const REM =
        GridRowData[i].REM.code || GridRowData[i].REM.code == ""
          ? GridRowData[i].REM.code
          : GridRowData[i].REM;
      const R_CODE = REM
        ? this.RemarkArray.find((item) => item.name === REM).code
        : "";
      const TEN_NAME =
        GridRowData[i].TEN_NAME.code || GridRowData[i].TEN_NAME.code == ""
          ? GridRowData[i].TEN_NAME.code
          : GridRowData[i].TEN_NAME;
      const T_CODE = TEN_NAME
        ? this.TensionArray.find((item) => item.name === TEN_NAME).code
        : "";
      const MC_NAME =
        GridRowData[i].MC_NAME.code || GridRowData[i].MC_NAME.code == ""
          ? GridRowData[i].MC_NAME.code
          : GridRowData[i].MC_NAME;
      const PRDMC_CODE = MC_NAME
        ? this.MCColorArray.find((item) => item.name === MC_NAME).code
        : "";

      GridRowData[i].REM = REM;
      GridRowData[i].R_CODE = R_CODE;
      GridRowData[i].TEN_NAME = TEN_NAME;
      GridRowData[i].T_CODE = T_CODE;
      GridRowData[i].MC_NAME = MC_NAME;
      GridRowData[i].PRDMC_CODE = PRDMC_CODE;

      let SaveObj = {
        L_CODE: this.L_CODE,
        SRNO: this.SRNO,
        TAG: this.TAG,
        PRDTYPE: GridRowData[i].PLNSEL == true ? "O" : "OP",
        PLANNO: GridRowData[i].PLANNO,
        EMP_CODE: this.decodedTkn.UserId,
        PTAG: GridRowData[i].PTAG,
        ADNO: 0,
        I_CARAT: this.ROUCARAT,
        I_PCS: GridRowData[i].I_PCS ? GridRowData[i].I_PCS : 1,
        DIA: GridRowData[i].DIA ? GridRowData[i].DIA : "",
        PRDS_CODE: GridRowData[i].PRDS_CODE,
        PRDQ_CODE: GridRowData[i].PRDQ_CODE,
        PRDC_CODE: GridRowData[i].PRDC_CODE,
        PRDCARAT: GridRowData[i].PRDCARAT,
        PRDMC_CODE: GridRowData[i].PRDMC_CODE,
        // PRDMC_CODE: GridRowData[i].MC_NAME ? this.MCColorArray.filter(item => item.name == GridRowData[i].MC_NAME.code).map(item => item.code)[0] : '',
        PRDCUT_CODE: GridRowData[i].PRDCUT_CODE,
        PRDPOL_CODE: GridRowData[i].PRDPOL_CODE,
        PRDSYM_CODE: GridRowData[i].PRDSYM_CODE,
        PRDFL_CODE: GridRowData[i].PRDFL_CODE,
        PRDMFL_CODE: GridRowData[i].PRDMFL_CODE,
        PRDIN_CODE: GridRowData[i].PRDIN_CODE,
        PRDSH_CODE: GridRowData[i].PRDSH_CODE,
        PRDTABLE: GridRowData[i].PRDTABLE,
        PRDTABLE_BLACK: GridRowData[i].PRDTABLE_BLACK,
        PRDTABLE_OPEN: GridRowData[i].PRDTABLE_OPEN,
        PRDSIDE: GridRowData[i].PRDSIDE,
        PRDSIDE_BLACK: GridRowData[i].PRDSIDE_BLACK,
        PRDSIDE_OPEN: GridRowData[i].PRDSIDE_OPEN,
        PRDCROWN_OPEN: GridRowData[i].PRDCROWN_OPEN,
        PRDGIRDLE_OPEN: GridRowData[i].PRDGIRDLE_OPEN,
        PRDPAV_OPEN: GridRowData[i].PRDPAV_OPEN,
        PRDCULET: GridRowData[i].PRDCULET,
        PRDEXTFACET: GridRowData[i].PRDEXTFACET,
        PRDEYECLEAN: GridRowData[i].PRDEYECLEAN,
        PRDGRAINING: GridRowData[i].PRDGRAINING,
        PRDLUSTER: GridRowData[i].PRDLUSTER,
        PRDMILKY: GridRowData[i].PRDMILKY,
        PRDNATURAL: GridRowData[i].PRDNATURAL,
        PRDREDSPOT: GridRowData[i].PRDREDSPOT,
        PRDDIA_CODE: GridRowData[i].PRDDIA_CODE,
        PRDRAT_CODE: GridRowData[i].PRDRAT_CODE,
        PRDDEPTH_CODE: GridRowData[i].PRDDEPTH_CODE,
        PRDTAB_CODE: GridRowData[i].PRDTAB_CODE,
        RATE: GridRowData[i].RATE,
        CPRATE: GridRowData[i].CPAMT / GridRowData[i].PRDCARAT,
        CMRATE: GridRowData[i].CMAMT / GridRowData[i].PRDCARAT,
        QPRATE: GridRowData[i].QPAMT / GridRowData[i].PRDCARAT,
        QMRATE: GridRowData[i].QMAMT / GridRowData[i].PRDCARAT,
        PLNSEL: GridRowData[i].PLNSEL,
        FPLNSEL: GridRowData[i].FPLNSEL,
        IUSER: this.decodedTkn.UserId,
        ICOMP: this.decodedTkn.UserId,
        TYP: GridRowData[i].TYP,
        ISSEL:
          GridRowData[i].TYP == "S" || GridRowData[i].TYP == "OG"
            ? true
            : false,
        RAPTYPE: GridRowData[i].RAPTYPE,
        V_CODE: this.V_CODE ? this.V_CODE : 0,
        DEP: GridRowData[i].DEP,
        RAT: GridRowData[i].RAT,
        COMENT: GridRowData[i].COMENT,
        // R_CODE: GridRowData[i].REM ? this.RemarkArray.filter(item => item.name == GridRowData[i].REM.code).map(item => item.code)[0] : '',
        R_CODE: GridRowData[i].R_CODE,
        MC1: GridRowData[i].MC1,
        MC2: GridRowData[i].MC2,
        MC3: GridRowData[i].MC3,
        DN: GridRowData[i].DN,
        E1: GridRowData[i].E1,
        E2: GridRowData[i].E2,
        E3: GridRowData[i].E3,
        T_CODE: GridRowData[i].T_CODE,
        COL_REM: GridRowData[i].COL_REM ? GridRowData[i].COL_REM : "",
        QUA_REM: GridRowData[i].QUA_REM ? GridRowData[i].QUA_REM : "",
        ADIS: GridRowData[i].ADIS
          ? parseFloat(GridRowData[i].ADIS).toFixed(2)
          : 0.0,
        L_NAME: this.L_NAME ? this.L_NAME : "",
        R_CARAT: GridRowData[i].R_CARAT ? GridRowData[i].R_CARAT : 0,
        ISIGI: GridRowData[i].ISIGI
        // let R_CODE = RowData.REM.code || RowData.REM.code == '' ? RowData.REM.code : RowData.REM
      };

      RapSaveArr.push(SaveObj);
    }
    if (RapSaveArr.length != 0 && this.validationrap == true) {
      this.RapCalcServ.TendarRapCalPrdSave(RapSaveArr).subscribe((SaveRes) => {
        this.spinner.hide();
        try {
          if (SaveRes.success == true) {
            this.toastr.success("Save successfully.");
            this.CLEAR("TENDER");
          } else {
            this.toastr.warning(JSON.stringify(SaveRes.data[0]));
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Oops...',
            //   text: 'Something went Wrong :' + JSON.stringify(SaveRes.data[0])
            // });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      });
    }
  }

  openGRD() {
    const temp = this.MaingridApi.getSelectedRows();
    this.TENDER_COL = temp[0].TENC_CODE ? temp[0].TENC_CODE : ''
    this.TENCOLNAME = temp[0].TENC_NAME ? temp[0].TENC_NAME : ''
    this.YAHU_COL = temp[0].YAHUC_CODE ? temp[0].YAHUC_CODE : ''
    this.YAHU_NAME = temp[0].YAHUC_NAME ? temp[0].YAHUC_NAME : ''
    this.SPECTREM_COL = temp[0].SPEC_CODE ? temp[0].SPEC_CODE : ''
    this.SPECTREMNAME = temp[0].SPEC_NAME ? temp[0].SPEC_NAME : ''
    this.ND_COL = temp[0].NDC_CODE ? temp[0].NDC_CODE : ''
    this.NDNAME = temp[0].NDC_NAME ? temp[0].NDC_NAME : ''
    this.YAHUDA_FLO = temp[0].YAHUFL_CODE ? temp[0].YAHUFL_CODE : ''
    this.YAHUDA_FLONAME = temp[0].YAHUFL_NAME ? temp[0].YAHUFL_NAME : ''
    this.TEN_FLO = temp[0].TENFL_CODE ? temp[0].TENFL_CODE : ''
    this.TEN_FLO_NAME = temp[0].TENFL_NAME ? temp[0].TENFL_NAME : ''
    this.ND_FLO = temp[0].NDFL_CODE ? temp[0].NDFL_CODE : ''
    this.NDFLONAME = temp[0].NDFL_NAME ? temp[0].NDFL_NAME : ''
    this.TEN_QUA = temp[0].TENQ_CODE ? temp[0].TENQ_CODE : ''
    this.TENQUANAME = temp[0].TENQ_NAME ? temp[0].TENQ_NAME : ''
    this.ND_QUA = temp[0].NDQ_CODE ? temp[0].NDQ_CODE : ''
    this.NDQUANAME = temp[0].NDQ_NAME ? temp[0].NDQ_NAME : ''
    this.MBOX_QUA = temp[0].MBOXQ_CODE ? temp[0].MBOXQ_CODE : ''
    this.MBOXQUANAME = temp[0].MBOXQ_NAME ? temp[0].MBOXQ_NAME : ''
    this.ShOWGRD = true;
    this.disabled = true;
    this.clarityDisabled = true;
    this.calcDisabled = true;
    this.colordisabled = true;
    this.cutDisabled = true;
  }

  TENDERDELETE(eve) {
    let DelObj = {
      L_CODE: this.L_CODE ? this.L_CODE : "",
      SRNO: this.SRNO ? this.SRNO : "",
      TAG: this.TAG ? this.TAG : "",
      PRDTYPE: eve.data.PLNSEL === true ? "O" : "OP",
      PLANNO: eve.data.PLANNO ? eve.data.PLANNO : "",
      EMP_CODE: this.decodedTkn.UserId,
      PTAG: eve.data.PTAG ? eve.data.PTAG : "",
      IUSER: this.decodedTkn.UserId,
      // IP: window.location.hostname,
      PROC_CODE: this.decodedTkn.PROC_CODE ? this.decodedTkn.PROC_CODE : "",
    };

    this.RapCalcServ.RapCalcTendarDel(DelObj).subscribe((DelRes) => {
      try {
        if (DelRes.success == true) {
          let GridRowData = [];
          this.MaingridApi.forEachNode(function (rowNode, index) {
            GridRowData.push(rowNode.data);
          });

          if (
            eve.data.PLANNO === DelObj.PLANNO &&
            eve.data.PTAG === DelObj.PTAG
          ) {
            GridRowData.splice(eve.rowIndex, 1);
          }

          this.MaingridApi.setRowData(GridRowData);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(DelRes.data.originalError.info.message),
          });
        }
      } catch (error) {
        console.log(error);
        this.toastr.error(error);
      }
    });
  }

  TENDERREPORT() {
    let ExcelObj = {
      L_CODE: this.L_CODE,
      FSRNO: 0,
      TSRNO: 0,
      F_DATE: "",
      T_DATE: "",
      TYPE: "LOT",
    };

    // this.RapCalcServ.TendarExcel(ExcelObj).subscribe((ExcelRes) => {
    try {
      // if (ExcelRes.success == true) {
      // let ExcelData = ExcelRes.data
      const PRF = this.dialog.open(RapExcelComponent, {
        panelClass: "rap-excel",
        autoFocus: false,
        minWidth: "70vw",
        width: "100%",
        height: "80%",
        // data: { ExcelData }
      });
      $("#Close").click();
      PRF.afterClosed().subscribe((result) => { });
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: JSON.stringify(ExcelRes.data.originalError.info.message),
      //   })
      // }
    } catch (error) {
      console.log(error);

      this.toastr.error(error);
    }
    // })
  }

  onFileChange() {
    const fileInput = this.fileInput.nativeElement;

    if (!this.L_CODE) {
      fileInput.value = "";
      this.toastr.warning("Enter L Code.");
      return;
    } else if (!this.SRNO || this.SRNO == 0) {
      fileInput.value = "";
      this.toastr.warning("Enter SrNo.");
      return;
    }

    if (
      fileInput.files[0].type !== "video/mp4" &&
      fileInput.files[0].type !== "video/quicktime"
    ) {
      fileInput.value = "";
      this.toastr.warning("Only MP4 or MOV files are allowed.");
      return;
    }

    this.spinner.show();
    if (fileInput.files && fileInput.files[0]) {
      this.spinner.show();
      const file = fileInput.files[0];
      const blob = new Blob([file], { type: "video/mp4" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.addEventListener("load", () => {
        let base64String = fileReader.result;
        let FileObj = {
          FileName: `${this.L_CODE}-${this.SRNO}`,
          base64File: base64String,
        };
        if (typeof base64String === "string") {
          this.uploadVideo(FileObj);
        } else {
          const bytes = new Uint8Array(base64String);
          base64String = String.fromCharCode.apply(null, bytes);
          this.uploadVideo(FileObj);
        }

        this.uploadVideo(FileObj).subscribe((response) => {
          try {
            let Obj = {
              L_CODE: this.L_CODE.trim() ? this.L_CODE.trim() : "",
              SRNO: this.SRNO ? this.SRNO : 0,
              SECURE_URL: response.data.secure_url,
              URL: response.data.url,
              CLOUDID: response.data.cloudid,
              PUBLICID: response.data.public_id,
            };
            this.RapCalcServ.RapCalcTendarVidUpload(Obj).subscribe((Res) => {
              try {
                if (Res.success == true) {
                  this.spinner.hide();
                  this.toastr.success("File uploaded succesfully.");
                } else {
                  this.spinner.hide();
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(Res.data),
                  });
                }
              } catch (error) {
                this.spinner.hide();
                console.log(error);

                this.toastr.error(error);
              }
            });
          } catch (error) {
            this.spinner.hide();
            console.log(error);

            this.toastr.error(error);
          }
        });
      });
    }
  }

  uploadVideo(FileObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        projectId: "63ab279447964464e2194563",
        companyId: "63ab2411a95148bc211212fc",
      }),
    };

    return this.http.post(
      "https://cloud.peacocktech.in/api/PublicAPI/uploadFileOnCloud",
      FileObj,
      httpOptions
    );
  }

  openVideoDelete() {
    this.toggleVideoDelete = true;
    let ExcelObj = {
      L_CODE: this.L_CODE,
      FSRNO: 0,
      TSRNO: 0,
      F_DATE: "",
      T_DATE: "",
      TYPE: "LOT",
    };

    this.RapCalcServ.TendarExcel(ExcelObj).subscribe((ExcelRes) => {
      try {
        if (ExcelRes.success == true) {
          this.lotDeleteArray = ExcelRes.data.map((item) => {
            return { CODE: item.L_CODE };
          });
          this.filteredDeleteLots = this.lotDeleteCtrl.valueChanges.pipe(
            startWith(""),
            map((lot) => (lot ? this.filterLots(lot) : this.lotDeleteArray))
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(ExcelRes.data.originalError.info.message),
          });
        }
      } catch (error) {
        console.log(error);

        this.toastr.error(error);
      }
    });
  }

  closeVideoDelete() {
    this.toggleVideoDelete = false;
    this.DELETE_L_CODE = "";
    this.FSRNO = 0;
    this.TSRNO = 0;
    this.PASSWORD = "";
  }

  CHANGEPASSWORD() {
    if (!this.PASS) {
      this.toggleVideoDeleteButton = true;
      return;
    }
    if (this.PASS) this.toggleVideoDeleteButton = false;
  }

  LOTCHANGEPASSWORD() {
    if (!this.PASS) return;
    if (this.CAT_P) {
      if (this.PASS == this.PASSWORD) {
        if (this.ALLOWDEL) {
          this.deleteEnable = true;
        }
      } else {
        this.deleteEnable = false;
      }
    }
  }

  TenderLotDelete() {
    if (this.L_CODE) {
      Swal.fire({
        title: `Are you Sure Want to Delete ${this.L_CODE}`,
        icon: "warning",
        cancelButtonText: "No",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.ALLOWDEL) {
            this.RapCalcServ.TenderLotDelete({ L_CODE: this.L_CODE }).subscribe(
              (TRes) => {
                if (TRes.success == true) {
                  this.toastr.success(`${this.L_CODE} Delete Successfully`);
                } else {
                  this.toastr.warning(TRes.data.originalError.info.message);
                }
              }
            );
          }
        }
      });
    } else {
      this.toastr.warning("Enter Lot Code");
    }
  }

  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30%",
      data: {
        arr: this.lotDeleteArray,
        CODE: this.DELETE_L_CODE,
        TYPE: "DELETEVIDEO",
      },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.DELETE_L_CODE = result;
    });
  }

  async videoDelete() {
    if (this.PASS == this.PASSWORD) {
      let Obj = {
        L_CODE: this.DELETE_L_CODE.trim() ? this.DELETE_L_CODE.trim() : "",
        FSRNO: this.FSRNO ? this.FSRNO : 0,
        TSRNO: this.TSRNO ? this.TSRNO : 0,
      };
      await this.RapCalcServ.RapCalcTendarVidDisp(Obj).subscribe((Res) => {
        try {
          if (Res.success == true) {
            this.spinner.hide();

            //get file names from database
            const videos = Res.data.map((item) => item.PUBLICID);
            //delete files from cloud first then delete from database
            this.deleteTenderVideoFromCloud(videos);
            // await this.deleteTenderVideoFromDatabase(Obj)
          } else {
            this.toastr.warning("Cannot get video upload data.");
          }
        } catch (error) {
          console.log(error);

          this.spinner.hide();
          this.toastr.error(error);
        }
      });
    } else {
      this.toastr.warning("Enter correct password.");
    }
  }

  async deleteTenderVideoFromCloud(videos) {
    // for (const video of videos) {
    for (let i = 0; i < videos.length; i++) {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          projectId: "63ab279447964464e2194563",
          companyId: "63ab2411a95148bc211212fc",
          cloudid: "63abee53a3d3a783c330d74d",
        }),
        body: {
          FileName: videos[i],
          resource_type: "video",
        },
      };

      await this.http
        .request(
          "DELETE",
          "https://cloud.peacocktech.in/api/PublicAPI/uploadedFileDeleteOnCloud",
          httpOptions
        )
        .subscribe((Res) => {
          if (i === videos.length - 1) this.deleteTenderVideoFromDatabase();
        });
    }
  }

  async deleteTenderVideoFromDatabase() {
    let Obj = {
      L_CODE: this.DELETE_L_CODE.trim() ? this.DELETE_L_CODE.trim() : "",
      FSRNO: this.FSRNO ? this.FSRNO : 0,
      TSRNO: this.TSRNO ? this.TSRNO : 0,
    };

    await this.RapCalcServ.RapCalcTendarVidDelete(Obj).subscribe((Res) => {
      try {
        if (Res.success == true) {
          this.spinner.hide();
          this.toastr.success("Video deleted successfully.");
        } else {
          this.spinner.hide();
          this.toastr.warning("Something went wrong while deleting video.");
        }
      } catch (error) {
        console.log(error);

        this.spinner.hide();
        this.toastr.error(error);
      }
    });
  }

  async Query() {
    let GridRowData = [];
    let QuerySaveArr = [];
    this.MaingridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    for (let i = 0; i < GridRowData.length; i++) {
      let SaveObj = {
        L_CODE: this.L_CODE,
        SRNO: this.SRNO,
        TAG: this.TAG,
        I_DATE: new Date(),
        I_TIME: new Date(),
        EMP_CODE: this.decodedTkn.UserId,
        S_CODE: GridRowData[i].PRDS_CODE,
        Q_CODE: GridRowData[i].PRDQ_CODE,
        C_CODE: GridRowData[i].PRDC_CODE,
        CARAT: GridRowData[i].PRDCARAT,
        CUT_CODE: GridRowData[i].PRDCUT_CODE,
        POL_CODE: GridRowData[i].PRDPOL_CODE,
        SYM_CODE: GridRowData[i].PRDSYM_CODE,
        FL_CODE: GridRowData[i].PRDFL_CODE,
        IN_CODE: GridRowData[i].PRDIN_CODE,
        SH_CODE: GridRowData[i].PRDSH_CODE,
        RAPTYPE: GridRowData[i].RAPTYPE,
        RATE: GridRowData[i].RATE,
        RTYPE: GridRowData[i].TYP,
      };
      QuerySaveArr.push(SaveObj);
    }
    await this.RapCalcServ.RapCalcPrdQuery(QuerySaveArr).subscribe(
      (ExcelRes) => {
        try {
          if (ExcelRes.success == true) {
            this.toastr.success("Successfully Query!!!");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(ExcelRes.data.originalError.info.message),
            });
          }
        } catch (error) {
          console.log(error);

          this.toastr.error(error);
        }
      }
    );
  }

  getAdditonalDiscount() {
    let selectedRows = this.MaingridApi.getSelectedNodes();
    for (let i = 0; i < this.MaingridApi.getSelectedRows().length; i++) {
      selectedRows[i].setDataValue("ADIS", this.ADIS);
    }
    let GridRowData = [];
    this.PricegridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    let newPer =
      GridRowData.find((item) => item.DESCR === "NET RATE").PER + this.ADIS;
    let oldAmt = GridRowData.find((item) => item.DESCR === "ORG. RATE").AMT
      ? GridRowData.find((item) => item.DESCR === "ORG. RATE").AMT
      : 0;
    let discount = (1 - newPer / 100) * oldAmt;
    return discount;
  }

  autocompleteEmpCode(code) {
    for (let i = 0; i < this.emps.length; i++) {
      if (code == this.emps[i].code) {
        this.EMP_CODE = this.emps[i].code;
        return;
      } else {
        this.EMP_CODE = "";
      }
    }
  }

  groupByArray(xs, PLANNO) {
    return xs.reduce(function (rv, x) {
      let _PLANNO = PLANNO instanceof Function ? PLANNO(x) : x[PLANNO];

      let el = rv.find((r) => r && r.PLANNO === _PLANNO);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          PLANNO: _PLANNO,
          Data: [x],
        });
      }

      return rv;
    }, []);
  }

  autocompleteFun(code, ngmodel, array) {
    let Res = this.autocomplete.autocompleteCode(code, array);
    this[ngmodel] = Res;
  }

  getActionColumnWidth() {
    if (this.decodedTkn.U_CAT === "P") {
      return "80";
    } else {
      return "50";
    }
  }

  
  AddFILE(){
    this.FILEOPEN = true
  }

  FILEFOUND(){
    let obj ={
      FILENAME:this.FILENAME
    }
    this.BioDataMastServ.FileSearch(obj).subscribe((FRes) => {
      try {
        if (FRes.success == 1) {
          this.searchgridApi.setRowData(FRes.data)
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  CloseFILe(){
    this.FILEOPEN =false
    this.FILENAME = ''
  }

  onCellDoubleClicked(eve){
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST";

    mapForm.action = `http://${this.url}:${this.port}/api/BioDataMast/FileExploreropen`;

    let obj = {
      F_NAME: eve.data.Path,
      FILE:eve.data.FileName
    }

    Object.keys(obj).forEach(function (param) {
      if (obj[param]) {
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = param;
        mapInput.setAttribute("value", obj[param]);
        mapForm.appendChild(mapInput);
      }
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }
}
