import { Component, ElementRef, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import PerfectScrollbar from "perfect-scrollbar";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import { TendatMastService } from "src/app/Service/Transaction/tendat-mast.service";
import Swal from "sweetalert2";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { GridFunctions } from "../../_helpers/functions/GridFunctions";
import { DatePipe } from "@angular/common";
import { TendarEstService } from "src/app/Service/Rap/tendar-est.service";
import { newArray } from "@angular/compiler/src/util";
import { FrmOpePer } from "../../_helpers/frm-ope-per";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { MiniPaintComponent } from "./mini-paint/mini-paint.component";
import { MatDialog } from "@angular/material/dialog";
import { WebCamComponent } from "./web-cam/web-cam.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { VideoShowComponent } from "./video-show/video-show.component";
declare let $: any;

@Component({
  selector: "app-tendar-est",
  templateUrl: "./tendar-est.component.html",
  styleUrls: ["./tendar-est.component.css"],
})
export class TendarEstComponent implements OnInit {
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  ADIS: any = "";
  T_DATE: any = null;

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public detailCellRendererParams;
  public gridOptions;
  public detailRowHeight = "300px !important";

  public columnDefs1;
  public gridApi1;
  public gridColumnApi1;
  public defaultColDef1;
  public getRowStyle

  HIDEGRID: boolean = true
  ALLOWINS: boolean = false;
  ALLOWDEL: boolean = false;
  ALLOWUPD: boolean = false;
  PASS: any = "";
  PER = [];

  disabledata: boolean = false
  disabledataArray: any = []

  GridHeader = [];
  FooterKey = [];
  FooterValue = [];
  GridFooter: any[] = [];
  ADISDISABLE:boolean = false

  S_CODE: any = [];
  C_NAME: any = [];
  Q_NAME: any = [];
  CT_NAME: any = [];
  FL_NAME: any = [];
  LB_NAME: any = [];
  IN_NAME: any = [];

  allSzs: any[] = []
  filteredSzs: Observable<any[]>;
  szControl: FormControl;
  selectedSz: any = ''

  LS: boolean = false
  R1: any = ''
  R2: any = ''
  F1: any = ''
  F2: any = ''
  DN: any = ''
  USER1: any = ''
  USER2: any = ''
  USER3: any = ''
  FANCY1: any = ''
  ROUNDC1: any = ''
  COLORArr = []
  filteredColor: Observable<any[]>;
  ColControl: FormControl;
  FINALBID: any = ''
  FLOCODE: any = ''

  FLOCODEDIS: boolean = false
  butDisabled: any = ''

  MacColControl: FormControl;
  MacColor: any = []
  filteredMacColor: Observable<any[]>;
  FINAL1: any = ''
  FINAL2: any = ''
  FINALME: any = ''
  FINALHE: any = ''
  RESULT1: any = ''
  RESULT2: any = ''
  RESULTME: any = ''
  RESULTHE: any = ''

  FloControl: FormControl;
  FLONO: any = []
  filteredFLO: Observable<any[]>;
  FLO1: any = ''
  FLO2: any = ''
  FLOME: any = ''
  FLOHE: any = ''

  MacFloControl: FormControl;
  MacFLONO: any = []
  filteredMacFLO: Observable<any[]>;
  MacFLO1: any = ''
  MacFLO2: any = ''
  MacFLOME: any = ''
  MacFLOHE: any = ''

  MacComControl: FormControl;
  MacComm: any = []
  filteredMacCom: Observable<any[]>;
  MacCom1: any = ''
  MacCom2: any = ''
  MacComME: any = ''
  MacComHE: any = ''

  DEP_NAME: any = [];
  RAT_NAME: any = []
  GRD_NAME: any = []
  ML_NAME: any = []

  PKTNAME: any = ''
  PKTSRNO: any = ''
  PKTWEIGHT: any = ''
  PKTRESERVE: any = ''
  PKTPER: any = ''
  PKTSRW: any = ''
  PKTSRW1: any = ''
  FLAT1: any = ''
  FLAT2: any = ''

  TensionControl: FormControl;
  TenArr: any = []
  filteredTension: Observable<any[]>;
  TENSION: any = ''
  DOCKData: any[] = []

  TENDAR_NAME: any = ''

  SRNO: any = "";

  rowData: any[] = [];
  SECONDDATA: any[] = [];
  MAinGridData: any[] = [];

  PLANCHANGEVALUE:any=''
  CliCKEDDATA:any=''

  agGridWidth: number = 0;
  agGridStyles: string = `width: 100%;height: 58vh; margin-bottom: 9%;`;
  DOCKON:boolean = false

  dummay_variable:any='newdivadd_variable'

  dummay1_variable:any='finalname_variable'
  dummay2_variable:any='finalinput_variable'


  dummay3_variable:any='finalfooter_variable'


  GRIDDATA:any[] =[]

  style = {
    width: '100%',
    height: 'calc(95vh - 130px)'
  };

  DOCKstyle = {
    width: '100%',
    height: 'calc(95vh - 130px)',
    position: 'absolute',
    background: '#0000008a',
    display: 'grid',
  };

  CANAVASOPEN:boolean =false 
  TendarStyle:string=`width: calc(100% - 150px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
  AreaBoxStyle:string=`border:1px solid black;width: 100%;resize: none;`;
  ContainWidth:string=`width:100%`;
  BlankBoxStyle:string=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;`;
  HearderBoxStyle:string=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none`;

  dummay_class:any="abhishek"

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private TendarEstServ: TendarEstService,
    private ViewParaMastServ: ViewParaMastService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private _FrmOpePer: FrmOpePer,
    private dialog: MatDialog,
    private http: HttpClient,
  ) {
    this.szControl = new FormControl();
    this.ColControl = new FormControl();
    this.MacColControl = new FormControl();
    this.FloControl = new FormControl();
    this.MacFloControl = new FormControl();
    this.MacComControl = new FormControl();
    this.TensionControl = new FormControl();
    // this.columnDefs = [
    //   {
    //     headerName: "SRNO",
    //     field: "RES",
    //     // cellRenderer: "agGroupCellRenderer",
    //     headerClass: "text-center",
    //     width: 389,
    //   },
    // ];
    let op=this
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
    this.gridOptions = {
      sortingOrder: ["asc", "desc"],
      enableRangeSelection: true,
      enableRtl: false,
      enableMultiRowDragging: true,
    };

    this.defaultColDef1 = {
      resizable: true,
      sortable: false,
      filter: false,
    };

    this.getRowStyle = function (params) {
      for (let i = 0; i < op.SECONDDATA.length; i++) {
        if (op.SECONDDATA[i].PLANNO == params.data.PLANNO && op.SECONDDATA[i].SRNO == params.data.SRNO) {
          if (params.data.PTAG == "Total") {
            return { background: "#c0ffc0" };
          }
        }
      }
      if (params.data.PTAG === "Total") {
        return { background: "#FFE0C0" };
      }
      return {};
    }

  }

  private _filter(value: string): any[] {
    return this.allSzs[0].filter(sz => sz.name);
  }

  private _Colfilter(value: string): any[] {
    return this.COLORArr[0].filter(sz => sz.name);
  }
  private _MacColfilter(value: string): any[] {
    return this.MacColor[0].filter(sz => sz.name);
  }
  private _FLOfilter(value: string): any[] {
    return this.FLONO[0].filter(sz => sz.name);
  }
  private _MacFLOfilter(value: string): any[] {
    return this.MacFLONO[0].filter(sz => sz.name);
  }
  private _MacComfilter(value: string): any[] {
    return this.MacComm[0].filter(sz => sz.code);
  }
  private _Tensionfilter(value: string): any[] {
    return this.TenArr[0].filter(sz => sz.name);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onGridReady1(params) {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
    // this.LoadGridData();
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({
      FORMNAME: "TendarPrddetDisp",
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
                cellRenderer: (params) => {
                  if (params.data) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.data[VPRes.data[i].FIELDNAME] == 1) {
                        if (this.decodedTkn.UserId === 'DN') {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" checked>'
                          );
                        } else {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" checked disabled>'
                          );
                        }
                      } else {
                        if (this.decodedTkn.UserId === 'DN') {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" >'
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
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerClass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: {
                  "text-align": VPRes.data[i].CELLALIGN,
                },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
              });
            }
            if (VPRes.data[i].FIELDNAME == 'S_CODE') {
              temp[i].cellRenderer = this.ShapeFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'CARAT') {
              temp[i].editable = this.CARATEDITABLE.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'MPER') {
              temp[i].editable = this.MPERDISABLE.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'C_NAME') {
              temp[i].cellRenderer = this.ColorFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'Q_NAME') {
              temp[i].cellRenderer = this.QuaFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'CT_NAME') {
              temp[i].cellRenderer = this.CutFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'FL_NAME') {
              temp[i].cellRenderer = this.FloFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'LB_NAME') {
              temp[i].cellRenderer = this.LabFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'IN_NAME') {
              temp[i].cellRenderer = this.IncFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'ML_NAME') {
              temp[i].cellRenderer = this.MilkyFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'DEP_CODE') {
              temp[i].cellRenderer = this.DepFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'RAT_CODE') {
              temp[i].cellRenderer = this.RatFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'GRD_CODE') {
              temp[i].cellRenderer = this.GrdFill.bind(this)
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
            this._gridFunction.FooterKey = this.FooterKey;
            // delete temp[i].cellStyle
            // temp[i].cellStyle = this.ColColor.bind(this)
          }
          this.columnDefs1 = temp

          for (let i = 0; i < this.columnDefs1.length; i++) {
            if (this.columnDefs1[i].headername == "Date") {
              this.columnDefs1[i].cellRenderer =
                this._convFunction.DateFormat.bind(this);
            }
            if (this.columnDefs1[i].headername == "Time") {
              this.columnDefs1[i].cellRenderer =
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
  MPERDISABLE(params) {
    if (this.decodedTkn.UserId === 'DN') {
      return true
    } else {
      return false
    }
  }

  CARATEDITABLE(params) {

    if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
      this.FLOCODEDIS = true
      return false
    } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER && params.data.PTAG !== "Total") {
      return true
    } else {
      this.FLOCODEDIS = false
      return false
    }
  }

  ShapeFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
                        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
                        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                          <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                          <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                          <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                          <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                          <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                          <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                          <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                          <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                          <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                          <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                          <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                          <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                          <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                          <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
        template += '<select class="ShapeList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.S_CODE.length; i++) {

          if (this.S_CODE[i].code == params.data.S_CODE) {
            template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
          } else {
            template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else
        if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
          let template = `
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                  <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                  <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                  <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                  <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                  <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
          template += '<select class="ShapeList">'
          template += '<option value="">---</option>';
          for (let i = 0; i < this.S_CODE.length; i++) {

            if (this.S_CODE[i].code == params.data.S_CODE) {
              template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            } else {
              template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            }

          }
          template += '</select>';
          return template;
        } else {
          let template = `
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
              <input id="MPER" type="hidden" value=${params.data.MPER} / >
                        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                          <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                          <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                          <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                          <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                          <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                          <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                          <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                          <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                          <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                          <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                          <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                          <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                          <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                          <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
          template += '<select class="ShapeList" disabled>'
          template += '<option value="">---</option>';
          for (let i = 0; i < this.S_CODE.length; i++) {

            if (this.S_CODE[i].code == params.data.S_CODE) {
              template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            } else {
              template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            }

          }
          template += '</select>';
          return template;
        }
    }
  }
  ColorFill(params) {
    if (params.data.PTAG !== "Total") {

      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  QuaFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
        <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
        <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
        <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
        <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
        <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
        <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
        <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
        <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
        <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
        <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
        <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
        <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
        <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
        <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  CutFill(params) {
    if (params.data.PTAG !== "Total") {

      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  FloFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  LabFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  IncFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  MilkyFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  DepFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  RatFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  GrdFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if (params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER) {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  previouslyOpenedRow: any;

  PlannoClicked(params) {
    if (!this.PLANCHANGEVALUE) {
      const node = params.node;

      if (node && node.master) {
        if (this.previouslyOpenedRow && this.previouslyOpenedRow !== node) {
          params.api.forEachNode((rowNode: any) => {
            if (rowNode !== node && rowNode.expanded) {
              rowNode.setExpanded(false);
            }
          });
        }

        node.setExpanded(!node.expanded);
        this.previouslyOpenedRow = node;
      }
    }
    if (!this.PLANCHANGEVALUE) {
      return
    }
    if (typeof (params.data.SUBGROUPKEY) !== 'number') {
      params.data.SUBGROUPKEY = params.data.SUBGROUPKEY.split('-')[0]
    }
    for (let i = 0; i < params.data.Data.length; i++) {
      if (params.data.Data[i].PLANNO === parseInt(params.data.SUBGROUPKEY)) {
        params.api.refreshCells({ force: true })
        params.data.SUBGROUPKEY = this.PLANCHANGEVALUE
        this.PLANCHANGEVALUE = ''
        return params
      } else {
        params
      }

    }

  }
  MainGridOpen: any;
  async onGridRowClicked(eve) {
    const target = eve.event.target;
    let op = this

    if (target !== undefined) {
      const actionType = target.getAttribute("data-action-type");
      if (actionType !== "ISAPPROVE" && actionType !== 'Savedata' && actionType !== "DeleteData" && this.decodedTkn.U_CAT !== "C" && this.decodedTkn.U_CAT !== "S") {
        let ApproveObj = {
          COMP_CODE: this.COMP_CODE,
          DETID: this.DETID,
          SRNO: eve.data.SRNO,
          TEN_NAME: this.T_NAME,
          ISAPPROVE: true,
          AUSER: this.decodedTkn.UserId
        }
        this.TendarEstServ.TendarApprove(ApproveObj).subscribe((SaveRes) => {
          try {
            if (SaveRes.success == true) {
              this.spinner.hide();
              let NewObj = eve.data
              NewObj.ISAPPROVE = true
              NewObj.AUSER = this.decodedTkn.UserId
              eve.node.setData(NewObj)
              eve.api.refreshCells({ force: true })
            } else {
              this.spinner.hide();
              // Swal.fire({
              //   icon: "error",
              //   title: "Oops...",
              //   text: JSON.stringify(SaveRes.data),
              // });
              return;
              // return;
            }
            
          }catch{
              
          }
        });
      }
      if (actionType == "ISAPPROVE") {
        if (this.decodedTkn.U_CAT !== "C" && this.decodedTkn.U_CAT !== "S") {
          let dataObj = eve.data;
          dataObj.ISAPPROVE = !dataObj.ISAPPROVE;
          dataObj.AUSER = ''
          eve.node.setData(dataObj)
          eve.api.refreshCells({ force: true })

          let ApproveObj = {
            COMP_CODE: this.COMP_CODE,
            DETID: this.DETID,
            SRNO: eve.data.SRNO,
            TEN_NAME: this.T_NAME,
            ISAPPROVE: eve.data.ISAPPROVE,
            AUSER: this.decodedTkn.UserId
          }
          this.TendarEstServ.TendarApprove(ApproveObj).subscribe((SaveRes) => {
            try {
              if (SaveRes.success == true) {
                this.spinner.hide();

              } else {
                this.spinner.hide();
                // Swal.fire({
                //   icon: "error",
                //   title: "Oops...",
                //   text: JSON.stringify(SaveRes.data),
                // });
                // return;
              }
            } catch (err) {
              this.spinner.hide();
              this.toastr.error(err);
              return;
            }
          });
        } else {
          return
        }
      }

      if (actionType === "Savedata") {
        let selectedFile
        const inputFile = target.closest(".file-input-label").querySelector("input[type='file']");
        inputFile.addEventListener("change", function (event) {
          selectedFile = event.target.files[0];
          if (selectedFile) {
            const file = selectedFile
            const blob = new Blob([file], { type: "video/mp4" });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.addEventListener("load", () => {
              let base64String = fileReader.result;
              let FileObj = {
                FileName: `${op.COMP_CODE}-${op.DETID}`,
                base64File: base64String,
              };
              if (typeof base64String === "string") {
                op.uploadVideo(FileObj);
              } else {
                const bytes = new Uint8Array(base64String);
                base64String = String.fromCharCode.apply(null, bytes);
                op.uploadVideo(FileObj);
              }
              op.uploadVideo(FileObj).subscribe((response) => {
                try {
                  let Obj = {
                    COMP_CODE: op.COMP_CODE,
                    DETID: eve.data.DETID,
                    SRNO: eve.data.SRNO,
                    SECURE_URL: response.data.secure_url,
                    URL: response.data.url,
                    CLOUDID: response.data.cloudid,
                    PUBLICID: response.data.public_id,
                    I_TYPE: 'Print'
                  };op.TendarEstServ.TendarVidUpload(Obj).subscribe((Res) => {
                    try {
                      if (Res.success == true) {
                        op.spinner.hide();
                        op.toastr.success("File uploaded succesfully.");
                      } else {
                        op.spinner.hide();
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: JSON.stringify(Res.data),
                        });
                      }
                    } catch (error) {
                      op.spinner.hide();
                      console.log(error);
                      op.toastr.error(error);
                    }
                  });
                } catch (error) {
                  op.spinner.hide();
                  console.log(error);
                  op.toastr.error(error);
                }
              });
            });
          }
        });
      }
      if (actionType == "OpenVideo") {
        if (eve.data.LINK) {
          const videoUrl = eve.data.LINK;
          window.open(videoUrl, '_blank');
        }
      }
      if (actionType === "DeleteData") {

        let Obj = {
          COMP_CODE: this.COMP_CODE,
          DETID: eve.data.DETID,
          FSRNO: eve.data.SRNO,
          TSRNO: eve.data.SRNO,
        };
        await this.TendarEstServ.TendarVidDisp(Obj).subscribe((Res) => {
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

        await this.TendarEstServ.TendarVidDelete(Obj).subscribe((Res) => {
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
    }
  }

  DockON() {
    if(this.DOCKON == false){
      this.DOCKON = true
      this.agGridStyles =`width: 100%; height: 58vh ; margin-bottom: 9%;`
      this.TendarStyle=`width: calc(100% - 128px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
      this.AreaBoxStyle=`border:1px solid black;width: 100%;resize: none;`;
      this.BlankBoxStyle=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;`;
      this.HearderBoxStyle=`border:1px solid black;width:100%;padding: 2px 3px; text-align: center;border-bottom:none`;
      // this.ContainWidth=`width:145%`;
    }else{
      this.DOCKON = false
      this.agGridStyles =`width: 100%; height: 58vh; margin-bottom: 9%;`
      this.TendarStyle=`width: calc(100% - 128px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
      this.AreaBoxStyle=`border:1px solid black;width: 100%;resize: none;`;
      this.BlankBoxStyle=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;`;
      this.HearderBoxStyle=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none`;
      this.ContainWidth=`width:100%`;
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
          // if (i === videos.length - 1) this.deleteTenderVideoFromDatabase();
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

  SUBvalue(params) {
    let newvalue = 0;
    let AMTvalue = 0;
    for (let i = 0; i < params.data.Data.length; i++) {
      newvalue += parseFloat(params.data.Data[i].CARAT);
      AMTvalue += params.data.Data[i].AMT;
    }
    let PerCRT;
    if (AMTvalue / newvalue) {
      PerCRT = (AMTvalue / newvalue).toFixed(2);
    } else {
      PerCRT = 0;
    }
    let finalvalue =
      params.data.SUBGROUPKEY +
      "-" +
      "PolCrt=" +
      newvalue.toFixed(2) +
      " " +
      "Amt=" +
      AMTvalue.toFixed(2) +
      " " +
      "PerCrt=" +
      PerCRT;
    return finalvalue;
  }


  arrayCode(arrayname, viewdata) {
    let code = "";
    let name = "";
    name = viewdata.FIELDNAME.split("_")[0];
    code = name.concat("", "_CODE");

    return {
      headerName: viewdata.DISPNAME,
      headerClass: viewdata.HEADERALIGN,
      field: viewdata.FIELDNAME,
      width: viewdata.COLWIDTH,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: arrayname.map((item) => item.name),
        cellHeight: 20,
        formatValue: (value) => {
          if (value) {
            const code = arrayname.find((item) => value == item.name).code;
            return `${code}-${value}`;
          }
        },
      },
      onCellValueChanged: (params: any) => {
        arrayname.find((item) => item.name == params.data[viewdata.FIELDNAME] ? (params.data[code] = item.code) : "");
        arrayname.find((item) => item.code == params.data[code] ? (params.data[viewdata.FIELDNAME] = item.name) : "");
        params.api.refreshCells({ force: true });
      },
      cellStyle: {
        "text-align": viewdata.CELLALIGN,
        "background-color": viewdata.BACKCOLOR,
      },
      editable: true,
      resizable: viewdata.ISRESIZE,
      GROUPKEY: viewdata.GROUPKEY,
      hide: viewdata.DISP == false ? true : false,
      pinned: viewdata.ISFREEZE == true ? "left" : null,
    };
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

  LoadGridData() {
    this.spinner.show();
    this.TendarEstServ.TendarPrdDetDock({
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.GRIDDATA = FillRes.data
          this.SECONDDATA = FillRes.data
          // const agBodyViewport: HTMLElement =
          //   this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          // const agBodyHorizontalViewport: HTMLElement =
          //   this.elementRef.nativeElement.querySelector(
          //     ".ag-body-horizontal-scroll-viewport"
          //   );
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
        console.log(error)
        this.toastr.error(error);
      }
    });
  }

  RowClicked(params) {
    let actionType = params.event.target.getAttribute("data-action-type");

    if (actionType == "PLNSEL") {
      let dataObj = params.data;

      let SubData = [];
      this.gridApi1.forEachNode(function (rowNode, index) {
        SubData.push(rowNode.data);
      });
      let newdata =[]
      let highestRate = 0;
      let highAmt = -Infinity
      for (let i = 0; i < SubData.length; i++) {
        if (params.data.SRNO === SubData[i].SRNO) {
          if (params.data.PLANNO === SubData[i].PLANNO && SubData[i].PTAG !== "Total") {
            if (SubData[i].PLNSEL != true) {
              SubData[i].PLNSEL = true;
            } else {
              SubData[i].PLNSEL = false;
            }
          } else {
            SubData[i].PLNSEL = false;
          }
        }

        if(params.data.SRNO ===SubData[i].SRNO && SubData[i].PTAG === 'Total' && params.data.PLANNO === SubData[i].PLANNO){
          newdata.push(SubData[i])
        }

      }

      let FinalGrid = SubData;

      let newArray = 0
      let carat = 0
      let orap = 0
      let MperValue = 0
      newArray = 0

      let FinalValue =0
      let NewSum = 0

      let LastSum = 0
      // for (let i = 0; i < FinalGrid.length; i++) {
      //   if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG) {
      //     FinalGrid[i].AMT = NewSum
      //   }
      //   if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total') {
      //     LastSum += FinalGrid[i].AMT
      //   }
      // }
      for(let i=0;i<SubData.length;i++){
      if(params.data.SRNO ===SubData[i].SRNO && SubData[i].PTAG !== 'Total' && params.data.PLANNO === SubData[i].PLANNO){
        carat = SubData[i].CARAT
        orap = SubData[i].ORAP
        MperValue = SubData[i].MPER 
        newArray = (MperValue / 100) * orap

        FinalValue = orap - newArray
        NewSum = FinalValue * carat

        SubData[i].AMT = NewSum
        }
        if(params.data.SRNO ===SubData[i].SRNO && SubData[i].PTAG == 'Total' && params.data.PLANNO === SubData[i].PLANNO){
          this.PKTPER = SubData[i].AMT
        }
      }
      

      for(let i=0;i<SubData.length;i++){
      if(params.data.PLNSEL === false){

        carat = SubData[i].CARAT
        orap = SubData[i].ORAP
        MperValue = SubData[i].MPER 
        newArray = (MperValue / 100) * orap

        FinalValue = orap - newArray
        NewSum = FinalValue * carat

        SubData[i].AMT = NewSum

        if(SubData[i].PTAG === 'Total' && SubData[i].PLNSEL == true){
          break
        }else if (SubData[i].AMT > highAmt) {
          highAmt = SubData[i].AMT
          highestRate = SubData[i].AMT / SubData[i].CARAT
        }
        this.PKTPER = highestRate.toFixed(2)
      }
    }

      let NewValue = (this.ADIS/100)*this.PKTPER
      let FinalValue1 = parseFloat(this.PKTPER) + NewValue
      this.FINALBID =FinalValue1.toFixed(2)
      params.node.setData(dataObj);
      params.api.refreshCells({ force: true });
    }
  }

  
  ADISCHANGE(params){
    let NewValue = (params/100)*this.PKTPER
    let FinalValue = this.PKTPER + NewValue
    this.FINALBID =FinalValue
  }

  async FindRap(params) {
    let _GridRowData1 = []
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData1.push(rowNode.data);
    });

    let FinalGrid = this.GridTempData;

    if (params.colDef.field === 'MPER') {
      let newArray = 0
      let carat = params.data.CARAT
      let orap = params.data.ORAP
      let MperValue = parseInt(params.data.MPER)
      newArray = (MperValue / 100) * orap

      let FinalValue = orap - newArray
      let NewSum = FinalValue * carat

      let LastSum = 0
      for (let i = 0; i < FinalGrid.length; i++) {
        if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG) {
          FinalGrid[i].AMT = NewSum
        }
        if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total') {
          LastSum += FinalGrid[i].AMT
        }
      }

      let highestRate = 0;
      let highAmt = -Infinity
        for (let i = 0; i < FinalGrid.length; i++) {
          if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO == params.data.SRNO && FinalGrid[i].PTAG === 'Total') {
            FinalGrid[i].AMT = LastSum
          }

          if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO == params.data.SRNO && FinalGrid[i].PTAG === 'Total' && params.data.PLNSEL == true){
              highAmt = FinalGrid[i].AMT
              highestRate = FinalGrid[i].AMT / FinalGrid[i].CARAT
              break
          }else{
           if (FinalGrid[i].AMT > highAmt) {
              highAmt = FinalGrid[i].AMT
              highestRate = FinalGrid[i].AMT / FinalGrid[i].CARAT
          }
        }
      }
      this.PKTPER = highestRate.toFixed(2)
      let NewValue = (this.ADIS/100)*this.PKTPER
      let FinalValue1 = parseFloat(this.PKTPER) + NewValue
      this.FINALBID =FinalValue1.toFixed(2)

    } else {

      for (let i = 0; i < _GridRowData1.length; i++) {
        if (_GridRowData1[i].PLANNO === params.data.PLANNO && _GridRowData1[i].SRNO == params.data.SRNO && _GridRowData1[i].PTAG === params.data.PTAG) {
          _GridRowData1[i].CARAT = params.data.CARAT
        }
      }
      this.gridApi1.refreshCells({ force: true });

      let _GridRowData = [];

      if (!params.data.S_CODE) {
        return;
      }
      if (!params.data.Q_CODE) {
        return;
      }
      if (!params.data.C_CODE) {
        return;
      }
      if (!params.data.CARAT) {
        return;
      }
      if (!params.data.CT_CODE) {
        return;
      }
      if (!params.data.FL_CODE) {
        return;
      }
      if (!params.data.LB_CODE) {
        return;
      }
      if (!params.data.IN_CODE) {
        return;
      }

      let RapObj = {
        S_CODE: params.data.S_CODE,
        Q_CODE: params.data.Q_CODE,
        C_CODE: params.data.C_CODE,
        CARAT: params.data.CARAT,
        CUT_CODE: params.data.CT_CODE,
        FL_CODE: params.data.FL_CODE,
        IN_CODE: params.data.IN_CODE,
        RTYPE: params.data.LB_CODE,
        // MPER:params.data.MPER
      };
      this.TendarEstServ.FindRap(RapObj).then((RapRes) => {
        try {
          if (RapRes.success == true) {
            params.data.ORAP = RapRes.data[0][0].AMT;
            params.data.RATE = RapRes.data[1][0][""];
            params.data.RTYPE = RapRes.data[2][0][""];
            params.data.AMT = params.data.RATE * params.data.CARAT;
            params.data.PER = 100 - (params.data.RATE / params.data.ORAP) * 100;

            params.api.refreshCells({ force: true });

            this.gridApi1.forEachNode(function (rowNode, index) {
              _GridRowData.push(rowNode.data);
            });

            let CARATSUM = 0
            let ORAPSUM = 0
            let RATESUM = 0
            let AMTSUM = 0
            let PERSUM = 0
            let PERMUL = 0
            let CrtSUM = 0
            let NewCrtSUM = 0
            let PTAGROW = []
            for (let i = 0; i < _GridRowData.length; i++) {
              if (_GridRowData[i].SRNO == params.data.SRNO && _GridRowData[i].PLANNO === params.data.PLANNO && _GridRowData[i].PTAG !== 'Total') {
                NewCrtSUM += parseFloat(_GridRowData[i].CARAT)
                if (_GridRowData[i].SRNO === params.data.SRNO && _GridRowData[i].PLANNO === params.data.PLANNO && _GridRowData[i].PTAG === params.data.PTAG) {
                  if (NewCrtSUM > this.PKTWEIGHT) {
                    params.data.CARAT = 0.000
                    params.data.S_CODE = 0
                    params.data.C_CODE = 0
                    params.data.Q_CODE = 0
                    params.data.LB_CODE = 0
                    params.data.ML_CODE = 0
                    params.data.AMT_CODE = 0.000
                    params.data.RAT_CODE = 0
                    params.data.GRD_CODE = 0
                    _GridRowData[i].ORAP = 0
                    _GridRowData[i].RATE = 0
                    _GridRowData[i].AMT = 0
                    _GridRowData[i].PER = 0
                    params.data.ORAP = 0
                    params.data.RATE = 0
                    params.data.AMT = 0
                    params.data.PER = 0
                    _GridRowData[i].CARAT = 0.00
                  }
                }
                CARATSUM += _GridRowData[i].ORAP
                AMTSUM += _GridRowData[i].AMT
                CrtSUM += parseFloat(_GridRowData[i].CARAT)
                RATESUM += (AMTSUM / CrtSUM)
                PERMUL += (_GridRowData[i].ORAP * parseFloat(_GridRowData[i].CARAT))
                // ORAPSUM +=  
              }

              if (_GridRowData[i].SRNO === params.data.SRNO && _GridRowData[i].PLANNO === params.data.PLANNO && _GridRowData[i].PTAG === 'Total') {
                _GridRowData[i].ORAP = (PERMUL / CrtSUM)
                _GridRowData[i].RATE = (AMTSUM / CrtSUM)
                _GridRowData[i].AMT = AMTSUM
                _GridRowData[i].PER = 100 - (_GridRowData[i].RATE / _GridRowData[i].ORAP) * 100;
                _GridRowData[i].CARAT = CrtSUM
              }
              if (_GridRowData[i].PTAG == "Total") {
                PTAGROW.push(_GridRowData[i])
              }
            }

            let newArray = 0
        let carat = params.data.CARAT
        let orap = params.data.ORAP
        let MperValue = parseInt(params.data.MPER)
        newArray = (MperValue / 100) * orap

        let FinalValue = orap - newArray
        let NewSum = FinalValue * carat

        let LastSum = 0
        for (let i = 0; i < FinalGrid.length; i++) {
          if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG) {
            FinalGrid[i].AMT = NewSum
          }
          if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total') {
            LastSum += FinalGrid[i].AMT
          }
        }

        let highestRate = 0;
        let highAmt = -Infinity
          for (let i = 0; i < FinalGrid.length; i++) {
            if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO == params.data.SRNO && FinalGrid[i].PTAG === 'Total') {
              FinalGrid[i].AMT = LastSum
            }

            if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO == params.data.SRNO && FinalGrid[i].PTAG === 'Total' && params.data.PLNSEL == true){
                highAmt = FinalGrid[i].AMT
                highestRate = FinalGrid[i].AMT / FinalGrid[i].CARAT
                break
            }else{
             if (FinalGrid[i].AMT > highAmt) {
                highAmt = FinalGrid[i].AMT
                highestRate = FinalGrid[i].AMT / FinalGrid[i].CARAT
            }
          }
        }
        this.PKTPER = highestRate.toFixed(2)
        let NewValue = (this.ADIS/100)*this.PKTPER
        let FinalValue1 = parseFloat(this.PKTPER) + NewValue
        this.FINALBID =FinalValue1.toFixed(2)

            // let highestRate = 0;
            // let highAmt = -Infinity
            // for (let i = 0; i < PTAGROW.length; i++) {
            //   if (PTAGROW[i].AMT > highAmt) {
            //     highAmt = PTAGROW[i].AMT
            //     highestRate = PTAGROW[i].RATE
            //   }
            // }
            // this.PKTPER = highestRate.toFixed(2)
            // let NewValue = (this.ADIS/100)*this.PKTPER
            // let FinalValue1 = this.PKTPER + NewValue
            // this.FINALBID =FinalValue1
            this.gridApi1.refreshCells({ force: true });

          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  Save() {

    let saveOBJ1 = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
      SRNO: this.PKTSRNO ? this.PKTSRNO : 0,
      RESRVE: this.PKTRESERVE ? this.PKTRESERVE : 0,
      PERCTS: this.PKTPER ? this.PKTPER : 0,
      SRW: this.PKTSRW ? this.PKTSRW : '',
      FL_CODE: this.FLOCODE ? this.FLOCODE : 0,
      FBID: this.FINALBID ? this.FINALBID : 0,
      T_CODE: this.TENSION ? this.TENSION : '',
      LS: this.LS ? this.LS : 0,
      FFLAT1: this.FINAL1 ? this.FINAL1 : '',
      FFLAT2: this.FINAL2 ? this.FINAL2 : '',
      FMED: this.FINALME ? this.FINALME : '',
      FHIGH: this.FINALHE ? this.FINALHE : '',
      RFLAT1: this.RESULT1 ? this.RESULT1 : '',
      RFLAT2: this.RESULT2 ? this.RESULT2 : '',
      RMED: this.RESULTME ? this.RESULTME : '',
      RHIGH: this.RESULTHE ? this.RESULTHE : '',
      MFLFLAT1: this.MacFLO1 ? this.MacFLO1 : '',
      MFLFLAT2: this.MacFLO2 ? this.MacFLO2 : '',
      MFLMED: this.MacFLOME ? this.MacFLOME : '',
      MFLHIGH: this.MacFLOHE ? this.MacFLOHE : '',
      FLNFLAT1: this.FLO1 ? this.FLO1 : '',
      FLNFLAT2: this.FLO2 ? this.FLO2 : '',
      FLNMED: this.FLOME ? this.FLOME : '',
      FLNHIGH: this.FLOHE ? this.FLOHE : '',
      CFLAT1: this.MacCom1 ? this.MacCom1 : '',
      CFLAT2: this.MacCom2 ? this.MacCom2 : '',
      CMED: this.MacComME ? this.MacComME : '',
      CHIGH: this.MacComHE ? this.MacComHE : '',
      DNC_CODE: this.DN ? this.DN : 0,
      I1C_CODE: this.USER1 ? this.USER1 : 0,
      I2C_CODE: this.USER2 ? this.USER2 : 0,
      I3C_CODE: this.USER3 ? this.USER3 : 0,
      RC_CODE: this.ROUNDC1 ? this.ROUNDC1 : 0,
      R1C_CODE: this.R1 ? this.R1 : 0,
      R2C_CODE: this.R2 ? this.R2 : 0,
      FC_CODE: this.FANCY1 ? this.FANCY1 : 0,
      F1C_CODE: this.F1 ? this.F1 : 0,
      F2C_CODE: this.F2 ? this.F2 : 0,
      PUSER: this.decodedTkn.UserId,
      TEN_NAME: this.T_NAME,
      ADIS:this.ADIS ? this.ADIS:0
    }
    this.TendarEstServ.TendarResSave(saveOBJ1).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          // this.toastr.success("Save successfully.");
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

    let _GridRowData = [];

    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let SubData = [];
    let TotalData = [];

    for (let i = 0; i < _GridRowData.length; i++) {
      if (_GridRowData[i].PTAG !== "Total") {
        SubData.push(_GridRowData[i])
      } else {
        TotalData.push(_GridRowData[i])
      }
    }

    for (let i = 0; i < TotalData.length; i++) {
      if (TotalData[i].CARAT > this.PKTWEIGHT) {
        return this.toastr.warning('Your Carat Was Greater Than Weight')
      }
    }


    let PerArr = [];
    for (let i = 0; i < SubData.length; i++) {
      let SaveObj = {
        COMP_CODE: SubData[i].COMP_CODE ? SubData[i].COMP_CODE : "",
        DETID: SubData[i].DETID ? SubData[i].DETID : 0,
        T_DATE: SubData[i].T_DATE ? SubData[i].T_DATE : null,
        SRNO: SubData[i].SRNO ? SubData[i].SRNO : 0,
        PLANNO: SubData[i].PLANNO ? SubData[i].PLANNO : 0,
        PTAG: SubData[i].PTAG ? SubData[i].PTAG : "",
        I_CARAT: SubData[i].I_CARAT ? SubData[i].I_CARAT : 0,
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
        IUSER: SubData[i].IUSER ? SubData[i].IUSER : '',
        ML_CODE: SubData[i].ML_CODE ? SubData[i].ML_CODE : 0,
        DEP_CODE: SubData[i].DEP_CODE ? SubData[i].DEP_CODE : 0,
        RAT_CODE: SubData[i].RAT_CODE ? SubData[i].RAT_CODE : 0,
        GRD_CODE: SubData[i].GRD_CODE ? SubData[i].GRD_CODE : 0,
        MPER: SubData[i].MPER ? SubData[i].MPER : 0,
      };
      PerArr.push(SaveObj);
    }
    
    this.TendarEstServ.TendarPrdDetSave(PerArr).subscribe((SaveRes) => {
      try{
        if(SaveRes.success == true){
          this.spinner.hide()
          this.toastr.success("Save sucesfully")
        }else{
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

  groupSubByArray(xs, GROUPKEY, SUBGROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];
      let _SUBGROUPKEY =
        SUBGROUPKEY instanceof Function ? SUBGROUPKEY(x) : x[SUBGROUPKEY];

      let el = rv.find(
        (r) => r && r.GROUPKEY === _GROUPKEY && r.SUBGROUPKEY === _SUBGROUPKEY
      );

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          SUBGROUPKEY: _SUBGROUPKEY,
          Data: [x],
        });
      }

      return rv;
    }, []);
  }

  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY);

      if (el) {
        el.Data.push(x);
      } else {
        // for(let i=0;i<s2.length;i++){
        // if(s2[i].SRNO === _GROUPKEY){
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        });
        //   }
        // }
      }

      return rv;
    }, []);
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

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
 w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
  async ngOnInit() {
    if(this.decodedTkn.UserId === 'DN'){
      this.ADISDISABLE = false
    }else {
      this.ADISDISABLE = true
    }
    this.FillViewPara1()
    this.FillViewPara();
    this.PER = await this._FrmOpePer.UserFrmOpePer("TendarMastComponent");
    this.ALLOWDEL = this.PER[0].DEL;
    this.ALLOWINS = this.PER[0].INS;
    this.ALLOWUPD = this.PER[0].UPD;
    this.PASS = this.PER[0].PASS;
    this.C_NAME = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    let C_arr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    this.COLORArr = [[{ code: 0, name: '---' }, ...C_arr]]

    let MC_arr = this.decodedMast[17].map((item) => {
      return { code: item.MC_CODE, name: item.MC_NAME };
    });

    this.MacColor = [[{ code: 0, name: '---' }, ...MC_arr]]

    this.Q_NAME = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });
    this.CT_NAME = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME };
    });
    this.FL_NAME = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });

    let FLO_arr = this.decodedMast[19].map((item) => {
      return { code: item.NFL_CODE, name: item.NFL_NAME };
    });
    this.FLONO = [[{ code: 0, name: '---' }, ...FLO_arr]]

    let MacFLO_arr = this.decodedMast[18].map((item) => {
      return { code: item.MFL_CODE, name: item.MFL_NAME };
    });
    this.MacFLONO = [[{ code: 0, name: '---' }, ...MacFLO_arr]]

    let F_arr = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });
    this.allSzs = [[{ code: 0, name: '---' }, ...F_arr]]
    this.LB_NAME = this.decodedMast[4].map((item) => {
      return { code: item.LAB_CODE, name: item.LAB_NAME };
    });
    this.IN_NAME = this.decodedMast[6].map((item) => {
      return { code: item.IN_CODE, name: item.IN_NAME };
    });
    this.S_CODE = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME };
    });
    this.ML_NAME = this.decodedMast[24].map((item) => {
      return { code: item.ML_CODE, name: item.ML_NAME };
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

    let Com_arr = this.decodedMast[20].map((item) => {
      return { code: item.MCOM_NAME };
    });

    this.MacComm = [[{ code: 0 }, ...Com_arr]]

    let Tension_arr = this.decodedMast[16].map((item) => {
      return { code: item.T_CODE, name: item.T_NAME };
    });
    this.TenArr = [[{ code: 0 }, ...Tension_arr]]
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });

    this.filteredSzs = this.szControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredColor = this.ColControl.valueChanges.pipe(
      startWith(''),
      map(value => this._Colfilter(value))
    );
    this.filteredMacColor = this.MacColControl.valueChanges.pipe(
      startWith(''),
      map(value => this._MacColfilter(value))
    );
    this.filteredFLO = this.FloControl.valueChanges.pipe(
      startWith(''),
      map(value => this._FLOfilter(value))
    );
    this.filteredMacFLO = this.MacFloControl.valueChanges.pipe(
      startWith(''),
      map(value => this._MacFLOfilter(value))
    );
    this.filteredMacCom = this.MacComControl.valueChanges.pipe(
      startWith(''),
      map(value => this._MacComfilter(value))
    );
    this.filteredTension = this.TensionControl.valueChanges.pipe(
      startWith(''),
      map(value => this._Tensionfilter(value))
    );

    let op = this



    $('body').on('focusin', 'select.ShapeList', function (this) {
      $(this).data('val', $(this).val());
    });


    $('body').on('change', 'select.ShapeList', function (this) {
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
      let S_CODE = $(this).val()

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
        MPER
      }
      op.findrap1(NewCode)

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].S_CODE = S_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });
    });

    $('body').on('focusin', 'select.ColorList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.ColorList', function (this) {
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
      let C_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].C_CODE = C_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

      op.findrap1(NewCode)

    })

    $('body').on('focusin', 'select.QuaList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.QuaList', function (this) {
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
      let Q_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].Q_CODE = Q_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });
      op.findrap1(NewCode)

    })

    $('body').on('focusin', 'select.CutList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.CutList', function (this) {
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
      let CT_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].CT_CODE = CT_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

      op.findrap1(NewCode)

    })

    $('body').on('focusin', 'select.FloList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.FloList', function (this) {
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
      let FL_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].FL_CODE = FL_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

      op.findrap1(NewCode)

    })
    $('body').on('focusin', 'select.LabList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.LabList', function (this) {
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
      let LB_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].LB_CODE = LB_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

      op.findrap1(NewCode)

    })
    $('body').on('focusin', 'select.IncList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.IncList', function (this) {
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
      let IN_CODE = $(this).val()

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
        MPER
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].IN_CODE = IN_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });
      op.findrap1(NewCode)

    })

    $('body').on('focusin', 'select.MilkyLIST', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.MilkyLIST', function (this) {
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
      let ML_CODE = $(this).val()


      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].ML_CODE = ML_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

    })

    $('body').on('focusin', 'select.DepList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.DepList', function (this) {
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
      let DEP_CODE = $(this).val()


      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].DEP_CODE = DEP_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

    })

    $('body').on('focusin', 'select.RatList', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.RatList', function (this) {
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
      let RAT_CODE = $(this).val()


      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].RAT_CODE = RAT_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

    })

    $('body').on('focusin', 'select.GRDFill', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.GRDFill', function (this) {
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
      let GRD_CODE = $(this).val()


      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].GRD_CODE = GRD_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });

    })
  }

  FillViewPara1() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'TendarPrddet' }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          let temp = [];
          let op = this;
          for (let i = 0; i < VPRes.data.length; i++) {
            if (VPRes.data[i].COLUMNSTYLE == "CheckBox") {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerClass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
                cellRenderer: (params) => {
                  if (params.data && params.data[VPRes.data[i].FIELDNAME] == 1) {
                    if (params.node.rowPinned !== "bottom") {
                      if (params.data['DISBLE'] == true || this.decodedTkn.U_CAT !== "U") {
                        return (
                          '<input type="checkbox" data-action-type="ISAPPROVE" checked disabled>'
                        );
                      } else {
                        return (
                          '<input type="checkbox" data-action-type="ISAPPROVE" checked>'
                        );
                      }
                      //   if(this.disabledataArray.SRNO){
                      //   if (params.data['AUSER'] === this.decodedTkn.UserId && this.disabledataArray.SRNO == params.data.SRNO) { 
                      //     return (
                      //       '<input type="checkbox" data-action-type="ISAPPROVE" checked disabled>'
                      //     );
                      //   } else if(params.data['AUSER'] === this.decodedTkn.UserId){
                      //     return (
                      //       '<input type="checkbox" data-action-type="ISAPPROVE" checked>'
                      //     );
                      //   } else if(params.data['AUSER']){
                      //     return (
                      //       '<input type="checkbox" data-action-type="ISAPPROVE" checked disabled>'
                      //     );
                      //   } else {
                      //     return (
                      //       '<input type="checkbox" data-action-type="ISAPPROVE" checked>'
                      //     );
                      //   }
                      // }else{
                      //   return (
                      //     '<input type="checkbox" data-action-type="ISAPPROVE" checked>'
                      //   );
                      // }
                    }
                  } else {
                    return (
                      '<input type="checkbox" data-action-type="ISAPPROVE">'
                    );
                  }
                },
              });
            } else if (VPRes.data[i].FIELDNAME == 'LINK') {
              temp.push({
                headerName: 'Link',
                cellStyle: { 'text-align': 'center' },
                suppressMenu: false,
                cellRenderer: function (params) {
                  if (params.node.rowPinned != "bottom") {
                    if (!params.data.LINK) {
                      return null;
                    }
                    return '<i class="icon-video grid-icon" data-action-type="OpenVideo" style="cursor: pointer;" ></i>';
                  }
                },
                headerClass: "text-center",
                editable: false,
                width: 50,
                filter: false,
              })
            } else {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerClass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
              });
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
          this.columnDefs = temp

          // this.columnDefs.unshift({
          //   // children: [
          //     // {
          //       field: 'action',
          //       width: 80,
          //       suppressMenu: true,
          //       cellRenderer: function (params) {
          //         if (params.node.rowPinned != 'bottom') {
          //           let a = '<span class="det_val">'
          //             if (op.ALLOWUPD) {
          //               a += '<input type="file" style="display: none;" data-action-type="Savedata">'
          //             if (op.ALLOWDEL) {
          //               a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use  data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
          //             }
          //           a = a + "</span>"
          //           return a
          //         }
          //       },
          //       headerClass: "text-center",
          //   //   },
          //   // ]
          // })
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

  IMAGE() {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      panelClass: "saw-mac-pro-det-dialog",
      autoFocus: false,
      minWidth: "30%",
      width: "50%",
      height: "98%",
      data: this.DOCKData
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { })
  }


  UPLOAD() {
    // Swal.fire({
    //   // title:,
    //   icon: "warning",
    //   cancelButtonText: "Upload Video",
    //   showCancelButton: true,
    //   showConfirmButton: true,
    //   confirmButtonText: "Camera Open",
    // }).then((result) => {
    //   if (result.value) {
    const dialogRef = this.dialog.open(WebCamComponent, {
      panelClass: "saw-mac-pro-det-dialog",
      autoFocus: false,
      minWidth: "30%",
      width: "35%",
      height: "55%",
      disableClose: true,
      data: this.DOCKData
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { })
    // }else if(result.dismiss == Swal.DismissReason.cancel){
    //   const fileInput = document.getElementById('fileInput');
    //   if (fileInput) {
    //     fileInput.click();
    //   }
    // }
    // })
  }
  UploadDirect() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  ShowVideo() {
    const dialogRef = this.dialog.open(VideoShowComponent, {
      panelClass: "saw-mac-pro-det-dialog",
      autoFocus: false,
      minWidth: "30%",
      width: "35%",
      height: "55%",
      disableClose: true,
      data: this.DOCKData
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { })
  }

  onFileInputChange(event: Event) {

    let op = this

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];

    if (selectedFile) {
      const file = selectedFile
      const blob = new Blob([file], { type: "video/mp4" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.addEventListener("load", () => {
        let base64String = fileReader.result;
        let FileObj = {
          FileName: `${op.COMP_CODE}-${op.DETID}-${op.SRNO}`,
          base64File: base64String,
        };
        if (typeof base64String === "string") {
          op.uploadVideo(FileObj);
        } else {
          const bytes = new Uint8Array(base64String);
          base64String = String.fromCharCode.apply(null, bytes);
          op.uploadVideo(FileObj);
        }
        op.spinner.show()
        op.uploadVideo(FileObj).subscribe((response) => {
          try {
            let Obj = {
              COMP_CODE: op.COMP_CODE,
              DETID: this.DOCKData['DETID'],
              SRNO: this.DOCKData['SRNO'],
              SECURE_URL: response.data.secure_url,
              URL: response.data.url,
              CLOUDID: response.data.cloudid,
              PUBLICID: response.data.public_id,
              I_TYPE: 'VIDEO'
            };
            op.TendarEstServ.TendarVidUpload(Obj).subscribe((Res) => {
              try {
                if (Res.success == true) {
                  op.spinner.hide();
                  op.toastr.success("File uploaded succesfully.");
                } else {
                  op.spinner.hide();
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(Res.data),
                  });
                }
              } catch (error) {
                op.spinner.hide();
                console.log(error);

                op.toastr.error(error);
              }
            });
          } catch (error) {
            op.spinner.hide();
            console.log(error);

            op.toastr.error(error);
          }
        });
      });
    }
  }

  DRAW() {

    const dialogRef = this.dialog.open(MiniPaintComponent, {
      panelClass: "saw-mac-pro-det-dialog",
      autoFocus: false,
      minWidth: "30%",
      width: "67%",
      height: "81%",
      data: this.DOCKData
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { })
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

  GETDETID() {
    this.DETID = ''
    this.T_DATE = null
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            for (let i = 0; i < FillRes.data.length; i++) {
              if (FillRes.data[i].ISACTIVE == true) {
                this.DETIDarr.push({
                  code: FillRes.data[i].DETID,
                  date: FillRes.data[i].T_DATE,
                  name: FillRes.data[i].T_NAME
                });
              }
            }
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


  findrap1(RapObj) {
    let _GridRowData = [];
    let SubData = [];
    let FinalGrid = [];

    if (!RapObj.S_CODE) {
      return;
    }
    if (!RapObj.Q_CODE) {
      return;
    }
    if (!RapObj.C_CODE) {
      return;
    }
    if (!RapObj.CARAT) {
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
    let RapObj1 = {
      S_CODE: RapObj.S_CODE,
      Q_CODE: RapObj.Q_CODE,
      C_CODE: RapObj.C_CODE,
      CARAT: RapObj.CARAT,
      CUT_CODE: RapObj.CT_CODE,
      FL_CODE: RapObj.FL_CODE,
      IN_CODE: RapObj.IN_CODE,
      RTYPE: RapObj.LB_CODE,
      MPER: RapObj.MPER
    };

    this.TendarEstServ.FindRap(RapObj1).then((RapRes) => {
      try {
        if (RapRes.success == true) {


          let oldRapObj = JSON.parse(RapObj.DATA);

          let _GridRowData = []
          this.gridApi1.forEachNode(function (rowNode, index) {
            _GridRowData.push(rowNode.data);
          });

          let newdata = []
          let CARATSUM = 0
          let RATESUM = 0
          let AMTSUM = 0
          let PERMUL = 0
          let CrtSUM = 0
          let NewCrtSUM = 0
          let PTAGROW = []
          for (let i = 0; i < _GridRowData.length; i++) {
            if (_GridRowData[i].SRNO === oldRapObj.SRNO && _GridRowData[i].PLANNO === oldRapObj.PLANNO && _GridRowData[i].PTAG === oldRapObj.PTAG) {
              _GridRowData[i].ORAP = RapRes.data[0][0].AMT;
              _GridRowData[i].RATE = RapRes.data[1][0][''];
              _GridRowData[i].RTYPE = RapRes.data[2][0][""];
              _GridRowData[i].AMT = _GridRowData[i].RATE * _GridRowData[i].CARAT;
              _GridRowData[i].PER = 100 - (_GridRowData[i].RATE / _GridRowData[i].ORAP) * 100;
              _GridRowData[i].S_CODE = RapObj.S_CODE;
              _GridRowData[i].Q_CODE = RapObj.Q_CODE;
              _GridRowData[i].C_CODE = RapObj.C_CODE;
              _GridRowData[i].CT_CODE = RapObj.CT_CODE;
              _GridRowData[i].FL_CODE = RapObj.FL_CODE;
              _GridRowData[i].LB_CODE = RapObj.LB_CODE;
              _GridRowData[i].IN_CODE = RapObj.IN_CODE;
            } if (_GridRowData[i].SRNO === oldRapObj.SRNO && _GridRowData[i].PLANNO === oldRapObj.PLANNO && _GridRowData[i].PTAG !== 'Total') {
              NewCrtSUM += parseFloat(_GridRowData[i].CARAT)
              if (_GridRowData[i].SRNO === oldRapObj.SRNO && _GridRowData[i].PLANNO === oldRapObj.PLANNO && _GridRowData[i].PTAG === oldRapObj.PTAG) {
                if (NewCrtSUM > this.PKTWEIGHT) {
                  _GridRowData[i].CARAT = 0.000
                  _GridRowData[i].S_CODE = 0
                  _GridRowData[i].C_CODE = 0
                  _GridRowData[i].Q_CODE = 0
                  _GridRowData[i].LB_CODE = 0
                  _GridRowData[i].ML_CODE = 0
                  _GridRowData[i].RAT_CODE = 0
                  _GridRowData[i].GRD_CODE = 0
                  _GridRowData[i].ORAP = 0
                  _GridRowData[i].RATE = 0
                  _GridRowData[i].AMT = 0
                  _GridRowData[i].PER = 0
                  _GridRowData[i].ORAP = 0
                  _GridRowData[i].RATE = 0
                  _GridRowData[i].AMT = 0
                  _GridRowData[i].PER = 0
                  _GridRowData[i].CARAT = 0.00
                }
              }

              CARATSUM += _GridRowData[i].ORAP
              AMTSUM += _GridRowData[i].AMT
              CrtSUM += parseFloat(_GridRowData[i].CARAT)
              RATESUM += (AMTSUM / CrtSUM)
              PERMUL += (_GridRowData[i].ORAP * parseFloat(_GridRowData[i].CARAT))
              _GridRowData[i].IUSER = this.decodedTkn.UserId
            }

            let Total = ''
            if (_GridRowData[i].SRNO === oldRapObj.SRNO && _GridRowData[i].PLANNO === oldRapObj.PLANNO && _GridRowData[i].PTAG === 'Total') {
              _GridRowData[i].ORAP = (PERMUL / CrtSUM)
              _GridRowData[i].RATE = (AMTSUM / CrtSUM)
              _GridRowData[i].AMT = AMTSUM
              _GridRowData[i].PER = 100 - (_GridRowData[i].RATE / _GridRowData[i].ORAP) * 100;
              _GridRowData[i].CARAT = CrtSUM
              Total = _GridRowData[i].CARAT
            }
            if (_GridRowData[i].PTAG == "Total") {
              PTAGROW.push(_GridRowData[i])
            }
          }
          this.gridApi1.refreshCells({ force: true })
          
          let newArray = 0
          let carat = 0
          let orap = 0
          let MperValue = 0
          // newArray = (MperValue / 100) * orap
              
          let FinalValue = 0
          let NewSum = 0
              
          let LastSum = 0
          for (let i = 0; i < _GridRowData.length; i++) {
            if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO === parseInt(RapObj.SRNO) && _GridRowData[i].PTAG === RapObj.PTAG) {
              carat =_GridRowData[i].CARAT
              orap = _GridRowData[i].ORAP
              MperValue = parseFloat(_GridRowData[i].MPER)
              newArray = (MperValue / 100) * orap
              FinalValue = orap - newArray
              NewSum = FinalValue * carat
              _GridRowData[i].AMT = NewSum
            }
            if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO === parseInt(RapObj.SRNO) && _GridRowData[i].PTAG !== 'Total') {
              LastSum += _GridRowData[i].AMT
            }
          }
        
          let highestRate = 0;
          let highAmt = -Infinity
            for (let i = 0; i < _GridRowData.length; i++) {
              if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO == parseInt(RapObj.SRNO) && _GridRowData[i].PTAG === 'Total') {
                _GridRowData[i].AMT = LastSum
              }
            
              if(_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO == parseInt(RapObj.SRNO) && _GridRowData[i].PTAG === 'Total' && RapObj.PLNSEL == 'true'){
                  highAmt = _GridRowData[i].AMT
                  highestRate = _GridRowData[i].AMT / _GridRowData[i].CARAT
                  break
              }else{
               if (_GridRowData[i].AMT > highAmt) {
                  highAmt = _GridRowData[i].AMT
                  highestRate = _GridRowData[i].AMT / _GridRowData[i].CARAT
              }
            }
          }
          this.PKTPER = highestRate.toFixed(2)
          let NewValue = (this.ADIS/100)*this.PKTPER
          let FinalValue1 = parseFloat(this.PKTPER) + NewValue
          this.FINALBID =FinalValue1.toFixed(2)

          this.gridApi1.refreshCells({ force: true })
          // let highestRate = 0;
          // let highAmt = -Infinity
          // for (let i = 0; i < PTAGROW.length; i++) {
          //   if (PTAGROW[i].AMT > highAmt) {
          //     highAmt = PTAGROW[i].AMT
          //     highestRate = PTAGROW[i].RATE
          //   }
          // }
          // this.PKTPER = highestRate.toFixed(2)
          //   let NewValue = (this.ADIS/100)*this.PKTPER
          //   let FinalValue1 = this.PKTPER + NewValue
          //   this.FINALBID =FinalValue1
        }
      } catch (err) {
        console.log(err);
      }
    });

  }

  GridClear() {
    this.TENSION = ''
    this.TENDAR_NAME = ''
    this.PKTSRNO = ''
    this.PKTNAME = ''
    this.PKTWEIGHT = ''
    this.PKTRESERVE = ''
    this.PKTPER = ''
    this.PKTPER = ''
    this.PKTSRW = ''
    this.FINAL1 = ''
    this.FINAL2 = ''
    this.FINALME = ''
    this.FINALHE = ''
    this.DN = ''
    this.USER1 = ''
    this.USER2 = ''
    this.USER3 = ''
    this.RESULT1 = ''
    this.RESULT2 = ''
    this.RESULTME = ''
    this.RESULTHE = ''
    this.FLO1 = ''
    this.FLO2 = ''
    this.FLOME = ''
    this.FLOHE = ''
    this.MacFLO1 = ''
    this.MacFLO2 = ''
    this.MacFLOME = ''
    this.MacFLOHE = ''
    this.MacCom1 = ''
    this.MacCom2 = ''
    this.MacComME = ''
    this.MacComHE = ''
    this.ROUNDC1 = ''
    this.R1 = ''
    this.R2 = ''
    this.FANCY1 = ''
    this.F1 = ''
    this.F2 = ''
    this.LS = false
    this.FINALBID = ''
    this.FLOCODE = ''
    this.FLOCODEDIS = false
    this.gridApi1.setRowData()
  }

  GridTempData = [];
  onCellDoubleClicked(eve) {
    if (eve.colDef.field !== "ISAPPROVE") {
      this.FLOCODEDIS = false
      this.TendarEstServ.TendarPrdDetDisp({
        COMP_CODE: this.COMP_CODE,
        DETID: eve.data.DETID,
        SRNO: eve.data.SRNO
      }).subscribe((FillRes) => {
        try {
          if (FillRes.success == true) {
            this.HIDEGRID = false
            this.spinner.hide();
            this.DOCKData = FillRes.data[0][0]
            this.TENSION = FillRes.data[0][0].T_CODE
            this.TENDAR_NAME = FillRes.data[0][0].TEN_NAME
            this.PKTSRNO = FillRes.data[0][0].SRNO
            this.PKTNAME = this.decodedTkn.UserId
            this.PKTWEIGHT = FillRes.data[0][0].I_CARAT
            this.PKTRESERVE = FillRes.data[0][0].RESRVE
            this.PKTPER = FillRes.data[0][0].PERCTS
            this.PKTPER = FillRes.data[0][0].PERCTS
            this.PKTSRW = FillRes.data[0][0].SRW
            this.FINAL1 = FillRes.data[0][0].FFLAT1
            this.FINAL2 = FillRes.data[0][0].FFLAT2
            this.FINALME = FillRes.data[0][0].FMED
            this.FINALHE = FillRes.data[0][0].FHIGH
            this.DN = FillRes.data[0][0].DNC_CODE
            this.USER1 = FillRes.data[0][0].I1C_CODE
            this.USER2 = FillRes.data[0][0].I2C_CODE
            this.USER3 = FillRes.data[0][0].I3C_CODE
            this.RESULT1 = FillRes.data[0][0].RFLAT1
            this.RESULT2 = FillRes.data[0][0].RFLAT2
            this.RESULTME = FillRes.data[0][0].RMED
            this.RESULTHE = FillRes.data[0][0].RHIGH
            this.FLO1 = FillRes.data[0][0].FLNFLAT1
            this.FLO2 = FillRes.data[0][0].FLNFLAT2
            this.FLOME = FillRes.data[0][0].FLNMED
            this.FLOHE = FillRes.data[0][0].FLNHIGH
            this.MacFLO1 = FillRes.data[0][0].MFLFLAT1
            this.MacFLO2 = FillRes.data[0][0].MFLFLAT2
            this.MacFLOME = FillRes.data[0][0].MFLMED
            this.MacFLOHE = FillRes.data[0][0].MFLHIGH
            this.MacCom1 = FillRes.data[0][0].CFLAT1
            this.MacCom2 = FillRes.data[0][0].CFLAT2
            this.MacComME = FillRes.data[0][0].CMED
            this.MacComHE = FillRes.data[0][0].CHIGH
            this.ROUNDC1 = FillRes.data[0][0].RC_CODE
            this.R1 = FillRes.data[0][0].R1C_CODE
            this.R2 = FillRes.data[0][0].R2C_CODE
            this.FANCY1 = FillRes.data[0][0].FC_CODE
            this.F1 = FillRes.data[0][0].F1C_CODE
            this.F2 = FillRes.data[0][0].F2C_CODE
            this.LS = FillRes.data[0][0].LS
            this.FINALBID = FillRes.data[0][0].FBID
            this.FLOCODE = FillRes.data[0][0].FL_CODE
            this.ADIS = FillRes.data[0][0].ADIS

            this.gridApi1.setRowData(FillRes.data[1])
            this.GridTempData = FillRes.data[1]

            let newdata = []
            this.gridApi1.forEachNode(function (rowNode, index) {
              newdata.push(rowNode.data);
            });

            this.disabledata = false
            for (let i = 0; i < newdata.length; i++) {
              if (newdata[i].IUSER) {
                if (newdata[i].IUSER === this.DOCKData['AUSER']) {
                  this.disabledataArray = ''
                  this.disabledata = true
                  this.disabledataArray = this.DOCKData
                  if (this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
                    this.FLOCODEDIS = true
                  }
                }
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
            if (agBodyViewport) {
              const ps = new PerfectScrollbar(agBodyViewport);
              const container = document.querySelector(".ag-body-viewport");
              ps.update();
            }
            this.DOCKON = false
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
          console.log(error)
          this.toastr.error(error);
        }
      });
    }
  }
}
