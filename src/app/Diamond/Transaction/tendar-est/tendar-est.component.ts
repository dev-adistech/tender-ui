import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { WebCamComponent } from "./web-cam/web-cam.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { VideoShowComponent } from "./video-show/video-show.component";
import { ActivatedRoute } from "@angular/router";
import { BvViewDetComponent } from "../../View/b-v-view/bv-view-det/bv-view-det.component";
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
  BUTTONHIDE:boolean = true
  BVDATA:any = []

  VIDEOON:boolean=false

  @ViewChild(BvViewDetComponent) BvViewDetComponent: any;

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
  ALLGRIDDISABLE:boolean = false

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
  FINALAMT: any = ''
  FLOCODE: any = ''
  FINALAMT1:any = ''
  FLOCODEDIS: boolean = false
  SRNODIS: boolean = false
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
  SHD_NAME: any = []
  REF_NAME: any = []
  RAPNAME: any = []
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
  videoSrc: any = ''

  TENDAR_NAME: any = ''

  SRNO: any = "";

  rowData: any[] = [];
  SECONDDATA: any[] = [];
  MAinGridData: any[] = [];

  PLANCHANGEVALUE:any=''
  CliCKEDDATA:any=''

  agGridWidth: number = 0;
  agGridStyles: string = `width: 100%;height: calc(100vh - 70vh); margin-bottom: 9%;`;
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

  @ViewChild('lienzo1') lienzo1: any;

  CANAVASOPEN:boolean =false 
  TendarStyle:string=`width: calc(100% - 150px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
  AreaBoxStyle:string=`border:1px solid black;width: 100%;resize: none;height:100%`;
  ContainWidth:string=`width:100%`;
  BlankBoxStyle:string=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;height: 100%;`;
  HearderBoxStyle:string=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none`;
  HearderBoxStyle1:string=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none;border-top:none`;

  dummay_class:any="abhishek"

  NEWIMAGE:any = ''

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
    private route: ActivatedRoute
    // @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) {
    // console.log("245",dataMain)
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
    const MakHistoryData = JSON.parse(localStorage.getItem('TendarEstComponent'))
    if (MakHistoryData) {
      this.COMP_CODE = MakHistoryData[0][0].COMP_CODE
      this.COMP_NAME = MakHistoryData[0][0].TEN_NAME
      this.DETID = MakHistoryData[0][0].DETID
      this.DOCKData = MakHistoryData[0][0]
          this.TENSION = MakHistoryData[0][0].T_CODE
          this.TENDAR_NAME = MakHistoryData[0][0].TEN_NAME
          this.PKTSRNO = MakHistoryData[0][0].SRNO
          if(MakHistoryData[0][0].PUSER){
            this.PKTNAME = MakHistoryData[0][0].PUSER
          }else{
            this.PKTNAME = this.decodedTkn.UserId
          }
          this.PKTWEIGHT = MakHistoryData[0][0].I_CARAT
          this.PKTRESERVE = MakHistoryData[0][0].RESRVE
          this.PKTPER = MakHistoryData[0][0].PERCTS
          this.PKTPER = MakHistoryData[0][0].PERCTS
          this.PKTSRW = MakHistoryData[0][0].SRW
          this.FINAL1 = MakHistoryData[0][0].FFLAT1
          this.FINAL2 = MakHistoryData[0][0].FFLAT2
          this.FINALME = MakHistoryData[0][0].FMED
          this.FINALHE = MakHistoryData[0][0].FHIGH
          this.DN = MakHistoryData[0][0].DNC_CODE
          this.USER1 = MakHistoryData[0][0].I1C_CODE
          this.USER2 = MakHistoryData[0][0].I2C_CODE
          this.USER3 = MakHistoryData[0][0].I3C_CODE
          this.RESULT1 = MakHistoryData[0][0].RFLAT1
          this.RESULT2 = MakHistoryData[0][0].RFLAT2
          this.RESULTME = MakHistoryData[0][0].RMED
          this.RESULTHE = MakHistoryData[0][0].RHIGH
          this.FLO1 = MakHistoryData[0][0].FLNFLAT1
          this.FLO2 = MakHistoryData[0][0].FLNFLAT2
          this.FLOME = MakHistoryData[0][0].FLNMED
          this.FLOHE = MakHistoryData[0][0].FLNHIGH
          this.MacFLO1 = MakHistoryData[0][0].MFLFLAT1
          this.MacFLO2 = MakHistoryData[0][0].MFLFLAT2
          this.MacFLOME = MakHistoryData[0][0].MFLMED
          this.MacFLOHE = MakHistoryData[0][0].MFLHIGH
          this.MacCom1 = MakHistoryData[0][0].CFLAT1
          this.MacCom2 = MakHistoryData[0][0].CFLAT2
          this.MacComME = MakHistoryData[0][0].CMED
          this.MacComHE = MakHistoryData[0][0].CHIGH
          this.ROUNDC1 = MakHistoryData[0][0].RC_CODE
          this.R1 = MakHistoryData[0][0].R1C_CODE
          this.R2 = MakHistoryData[0][0].R2C_CODE
          this.FANCY1 = MakHistoryData[0][0].FC_CODE
          this.F1 = MakHistoryData[0][0].F1C_CODE
          this.F2 = MakHistoryData[0][0].F2C_CODE
          this.FINALAMT = MakHistoryData[0][0].FAMT
          this.FINALAMT1 = MakHistoryData[0][0].FAMT
          this.LS = MakHistoryData[0][0].LS
          this.FINALBID = MakHistoryData[0][0].FBID
          this.FLOCODE = MakHistoryData[0][0].FL_CODE
          this.ADIS = MakHistoryData[0][0].ADIS
          this.BVDATA = MakHistoryData[1]
          // this.gridApi.setRowData(MakHistoryData[1])
          let NewObj = {
            COMP_CODE: this.COMP_CODE,
            DETID:this.DETID,
            SRNO: this.PKTSRNO,
          }
          this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
            try{
              if(NewRes.success == true){
                this.NEWIMAGE = NewRes.data[0].PRN
                const imageUrl = this.NEWIMAGE;
    
              fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => createImageBitmap(blob))
            .then(imageBitmap => {
              // Draw the ImageBitmap on the canvas
              const canvas = document.getElementById('lienzo1') as HTMLCanvasElement;
              const context = canvas.getContext('2d');
              canvas.width = imageBitmap.width;
              canvas.height = imageBitmap.height;
              context.drawImage(imageBitmap, 0, 0);
            })
            .catch(error => {
              console.error('Error fetching or drawing image:', error);
            });
              }
            } catch (error){
              this.spinner.hide()
            }
          })
      this.BUTTONHIDE = false
    }

    localStorage.removeItem('TendarEstComponent')
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
    return this.MacComm[0].filter(sz => sz.name);
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
    this.gridApi1.setRowData(this.BVDATA)
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
                      if(params.data['PTAG'] !== 'Total'){
                      if (params.data[VPRes.data[i].FIELDNAME] == 1) {
                        if ((this.decodedTkn.UserId === 'DN' || this.decodedTkn.U_CAT === 'S')&& this.ALLGRIDDISABLE == false) {
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
                        if ((this.decodedTkn.UserId === 'DN' || this.decodedTkn.U_CAT === 'S')&& this.ALLGRIDDISABLE == false) {
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
                  "background-color": VPRes.data[i].BACKCOLOR,
                  "color":VPRes.data[i].FONTCOLOR
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

            if (VPRes.data[i].FIELDNAME == 'SH_NAME') {
              temp[i].cellRenderer = this.SHADESFill.bind(this)
            }

            if (VPRes.data[i].FIELDNAME == 'REF_NAME') {
              temp[i].cellRenderer = this.REFFill.bind(this)
            }

            if (VPRes.data[i].FIELDNAME == 'RAPTYPE') {
              temp[i].cellRenderer = this.RAPTYPEFill.bind(this)
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
    if ((this.decodedTkn.UserId === 'DN' || this.decodedTkn.U_CAT === 'S') && this.ALLGRIDDISABLE == false && params.data.PTAG !== "Total") {
      return true
    } else {
      return false
    }
  }

  CARATEDITABLE(params) {

    if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
      this.FLOCODEDIS = true
      return false
    } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false && params.data.PTAG !== "Total") {
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
                        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
                        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
                        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
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
          <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
          <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
          <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
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

  SHADESFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="ShdFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="ShdFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="ShdFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  REFFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RefFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RefFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RefFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  RAPTYPEFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RapTypeFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RapTypeFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
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
        template += '<select class="RapTypeFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
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
  SRNOADD(){
    this.TendarEstServ.TendarPrdDetDisp({
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
      SRNO: this.PKTSRNO,
      TYPE:'EST'
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.HIDEGRID = false

          let ApproveObj = {
            COMP_CODE: this.COMP_CODE,
            DETID: this.DETID,
            SRNO: this.PKTSRNO,
            TEN_NAME: this.T_NAME,
            ISAPPROVE: true,
            AUSER: this.decodedTkn.UserId
          }
          this.TendarEstServ.TendarApprove(ApproveObj).subscribe((SaveRes) => {
            try {
              if (SaveRes.success == true) {
                this.spinner.hide();
                let NewObj = FillRes.data
                NewObj.ISAPPROVE = true
                NewObj.AUSER = this.decodedTkn.UserId
                this.gridApi.setData(NewObj)
                this.gridApi.refreshCells({ force: true })
              } else {
                this.spinner.hide();
                return;
              }
              
            }catch{
                
            }
          });
        

          this.spinner.hide();
          this.DOCKData = FillRes.data[0][0]
          this.TENSION = FillRes.data[0][0].T_CODE
          this.TENDAR_NAME = FillRes.data[0][0].TEN_NAME
          this.PKTSRNO = FillRes.data[0][0].SRNO
          if(FillRes.data[0][0].PUSER){
            this.PKTNAME = FillRes.data[0][0].PUSER
          }else{
            this.PKTNAME = this.decodedTkn.UserId
          }
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
          this.FINALAMT = FillRes.data[0][0].FAMT
          this.FINALAMT1 = FillRes.data[0][0].FAMT
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

    let li = this.lienzo1.nativeElement;
    li.width = window.innerWidth - 400;
    // this.CliCKEDDATA = eve.data
    let NewObj = {
      COMP_CODE: this.COMP_CODE,
      DETID:this.DETID,
      SRNO: this.PKTSRNO,
    }
    this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
      try{
        if(NewRes.success == true){
          this.NEWIMAGE = NewRes.data[0].PRN
          const imageUrl = this.NEWIMAGE;

        fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        // Draw the ImageBitmap on the canvas
        const canvas = document.getElementById('lienzo1') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        context.drawImage(imageBitmap, 0, 0);
      })
      .catch(error => {
        console.error('Error fetching or drawing image:', error);
      });
        }
      } catch (error){
        this.spinner.hide()
      }
    })

          if(this.DOCKData['AUSER'] !== this.decodedTkn.UserId && this.decodedTkn.U_CAT == 'U'){
            this.disabledata = true
            this.FLOCODEDIS = true
          }

          if(this.decodedTkn.UserId == 'DN' || this.decodedTkn.U_CAT === 'S'){
            this.disabledata = false 
            this.FLOCODEDIS = false
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
            text: JSON.stringify(FillRes.data.originalError.info.message),
          });
          this.GridClear()
        }
      } catch (error) {
        this.spinner.hide();
        console.log(error)
        this.toastr.error(error);
      }
    });
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
      this.agGridStyles =`width: 100%; height: calc(100vh - 469px); margin-bottom: 9%;`
      this.TendarStyle=`width: calc(100% - 128px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
      this.AreaBoxStyle=`border:1px solid black;width: 100%;resize: none;height:100%`;
      this.BlankBoxStyle=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;height: 100%;`;
      this.HearderBoxStyle=`border:1px solid black;width:100%;padding: 2px 3px; text-align: center;border-bottom:none`;
      // this.ContainWidth=`width:145%`;
    }else{
      this.DOCKON = false
      this.agGridStyles =`width: 100%; height: calc(100vh - 469px); margin-bottom: 9%;`
      this.TendarStyle=`width: calc(100% - 128px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
      this.AreaBoxStyle=`border:1px solid black;width: 100%;resize: none;height:100%`;
      this.BlankBoxStyle=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;height: 100%;`;
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
          if (params.data.PLANNO === SubData[i].PLANNO) {
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

      let newArray = 0
      let carat = 0
      let orap = 0
      let MperValue = 0
      newArray = 0

      let FinalValue =0
      let NewSum = 0
      let Final =0
      if(params.data.PLNSEL === true){
        let NewSumValue=0
        let LatestSum =[]
      for(let i=0;i<SubData.length;i++){
        if(params.data.PLANNO == SubData[i].PLANNO && params.data.SRNO === SubData[i].SRNO && SubData[i].PTAG == params.data.PTAG){
          carat = SubData[i].CARAT
          orap = SubData[i].ORAP
          if(parseFloat(SubData[i].MPER) !== 0 && parseFloat(params.data.MPER) !== 100){
            MperValue = SubData[i].MPER
          }else {
            MperValue = SubData[i].PER
          }
          newArray = (MperValue / 100) * orap
          FinalValue = orap - newArray
          NewSum = FinalValue * carat
          NewSumValue += NewSum
        }else if(params.data.PLANNO == SubData[i].PLANNO && params.data.SRNO === SubData[i].SRNO && SubData[i].PTAG !== 'Total'){
          let carat1 = SubData[i].CARAT
          let orap1 = SubData[i].ORAP
          let MperValue1
          if(parseFloat(SubData[i].MPER) !== 0 && parseFloat(SubData[i].MPER) !== 100){
           MperValue1 = SubData[i].MPER
          }else {
            MperValue1 = SubData[i].PER
          }
          let newArray1 = (MperValue1 / 100) * orap1
          let FinalValue1 = orap1 - newArray1
          let NewSum1 = FinalValue1 * carat1
          NewSumValue += NewSum1
        }
      }
        let TotalLine =[]
        for(let i=0;i<SubData.length;i++){
          if(params.data.PLANNO == SubData[i].PLANNO && params.data.SRNO === SubData[i].SRNO && SubData[i].PTAG == 'Total'){
            LatestSum.push(NewSumValue)
          }else if(SubData[i].PTAG == 'Total') {
            LatestSum.push(SubData[i].AMT)
          }
        }

        for(let i=0;i<SubData.length;i++){
          if(SubData[i].PTAG === 'Total'){
            TotalLine.push(SubData[i])
          }
        }

        for(let i =0;i<TotalLine.length;i++){
            if(LatestSum[i] > highAmt && params.data.PLANNO == TotalLine[i].PLANNO && params.data.SRNO === TotalLine[i].SRNO){
              highAmt = LatestSum[i]
              highestRate = LatestSum[i] / TotalLine[i].CARAT
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = highAmt
              this.FINALAMT1 =highAmt
          }
        }
    }else{
      if(params.data.PLNSEL === false){
        let newArray = 0
        let FinalValue
        let NewSum
        let carat = params.data.CARAT
        let orap = params.data.ORAP
        let MperValue
        if(parseFloat(params.data.MPER) !== 0 && parseFloat(params.data.MPER) !== 100){
          MperValue = parseFloat(params.data.MPER)
        }else {
          MperValue = parseFloat(params.data.PER)
        }
        newArray = (MperValue / 100) * orap
        FinalValue = orap - newArray
        NewSum = FinalValue * carat
  
        let LastSum = 0
        let OtherLine = 0
  
        for(let i=0;i< SubData.length;i++){
          if(SubData[i].PLANNO === params.data.PLANNO && SubData[i].SRNO === params.data.SRNO && SubData[i].PTAG === params.data.PTAG){
            LastSum += NewSum
          }else if (SubData[i].PLANNO === params.data.PLANNO && SubData[i].SRNO === params.data.SRNO && SubData[i].PTAG !== 'Total'){
            let carat1 = SubData[i].CARAT
            let orap1 = SubData[i].ORAP
            let MperValue1
            if(parseFloat(SubData[i].MPER)!== 0 && parseFloat(SubData[i].MPER) !== 100){
              MperValue1 = SubData[i].MPER
            }else {
              MperValue1 = SubData[i].PER
            }
            let newArray1 = (MperValue1 / 100) * orap1
            let FinalValue1 = orap1 - newArray1
            let NewSum1 = FinalValue1 * carat1
            LastSum += NewSum1
          }
        }
        let TotalValue = []
        for(let i=0;i<SubData.length;i++){
          if(SubData[i].PLANNO === params.data.PLANNO && SubData[i].SRNO === params.data.SRNO && SubData[i].PTAG == 'Total'){
            TotalValue.push({NEWAMT:LastSum,data:SubData[i]})
          }else if(SubData[i].PTAG === 'Total') {
            TotalValue.push({NEWAMT:SubData[i].AMT,data:SubData[i]})
          }
        }
        let NewArray = []
        let LastSum1 = 0
        for(let i=0; i<SubData.length;i++){
          for(let j=0;j<TotalValue.length;j++){
            if(TotalValue[j].data['PLANNO']===SubData[i].PLANNO  && SubData[i].PTAG !== TotalValue[j].data['PTAG'] && SubData[i].PLANNO !== params.data.PLANNO){
              let carat1 = SubData[i].CARAT
            let orap1 = SubData[i].ORAP
            let MperValue1
            if(parseFloat(SubData[i].MPER)!== 0){
              MperValue1 = SubData[i].MPER
            }else {
              MperValue1 = SubData[i].PER
            }
            let newArray1 = (MperValue1 / 100) * orap1
            let FinalValue1 = orap1 - newArray1
            let NewSum1 = FinalValue1 * carat1
            LastSum1 += NewSum1
            } else if (TotalValue[j].data['PLANNO']===SubData[i].PLANNO && SubData[i].PLANNO !== params.data.PLANNO){
              TotalValue[j].NEWAMT = LastSum1
              TotalValue[j].data['PLNSEL'] = SubData[i].PLNSEL
              LastSum1 =0
            }
          }
        }
        let highestRate = 0;
        let highAmt = -Infinity
        if(params.data.PLNSEL == true){
          for(let i=0;i<TotalValue.length;i++){
            if(TotalValue[i].data['PLANNO'] === params.data.PLANNO && TotalValue[i].data['SRNO'] === params.data.SRNO){
              highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = TotalValue[i].NEWAMT
              this.FINALAMT1 = TotalValue[i].NEWAMT
            }
          }
        } else {
          for(let i=0;i<TotalValue.length;i++){
            if(TotalValue[i].data['PLNSEL'] === true){
              highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = TotalValue[i].NEWAMT
              this.FINALAMT1 = TotalValue[i].NEWAMT
              break
            }else{
              if (TotalValue[i].NEWAMT > highAmt) {
                highAmt = TotalValue[i].NEWAMT
                highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
                this.PKTPER = highestRate.toFixed(2)
                this.FINALAMT = TotalValue[i].NEWAMT
                this.FINALAMT1 = TotalValue[i].NEWAMT
              }
            }
          }
        }
      }
    }

    let NewValue = (this.ADIS/100)*this.FINALAMT
    let FinalValue1 = 0
    // if(`${this.ADIS}`.includes('+')){
      FinalValue1 = parseFloat(this.FINALAMT) + NewValue
    // }else{
      // FinalValue1 = parseFloat(this.FINALAMT) - NewValue
    // }
    this.FINALAMT = FinalValue1.toFixed(2)

      let NewBid = this.FINALAMT / this.PKTWEIGHT
      this.FINALBID =NewBid.toFixed(2)
      params.node.setData(dataObj);
      params.api.refreshCells({ force: true });
    }
  }

  
  ADISCHANGE(params){
    if(parseFloat(params)){
    let FinalValue = 0
    let NewValue = (parseFloat(params)/100)*parseFloat(this.FINALAMT1)
    // if(params.includes('+')){
      FinalValue = parseFloat(this.FINALAMT1) + NewValue
    // }else{
      // FinalValue = parseFloat(this.FINALAMT1) - NewValue
    // }
    this.FINALAMT = FinalValue
    let FinalBidAMT =  this.FINALAMT / this.PKTWEIGHT
    this.FINALBID =FinalBidAMT.toFixed(2)
    }else {
      this.FINALAMT = this.FINALAMT1
      let FinalBidAMT =  this.FINALAMT / this.PKTWEIGHT
      this.FINALBID =FinalBidAMT.toFixed(2)
    }
  }

  async FindRap(params) {
    let _GridRowData1 = []
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData1.push(rowNode.data);
    });

    let FinalGrid = this.GridTempData;

    if (params.colDef.field === 'MPER') {
      if(parseFloat(params.newValue) !== 100 && parseFloat(params.newValue) !== 0 ){
      let newArray = 0
      let FinalValue
      let NewSum
      let carat = params.data.CARAT
      let orap = params.data.ORAP
      let MperValue
      if(parseFloat(params.data.MPER) !== 0&& parseFloat(params.data.MPER) !== 100){
        MperValue = parseFloat(params.data.MPER)
      }else {
        MperValue = parseFloat(params.data.PER)
      }
      newArray = (MperValue / 100) * orap
      FinalValue = orap - newArray
      NewSum = FinalValue * carat

      let LastSum = 0
      let OtherLine = 0

      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG){
          FinalGrid[i].AMT = NewSum
          FinalGrid[i].RATE = FinalValue
          LastSum += NewSum
        }else if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total'){
          let carat1 = FinalGrid[i].CARAT
          let orap1 = FinalGrid[i].ORAP
          let MperValue1
          if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
            MperValue1 = FinalGrid[i].MPER
          }else {
            MperValue1 = FinalGrid[i].PER
          }
          let newArray1 = (MperValue1 / 100) * orap1
          let FinalValue1 = orap1 - newArray1
          let NewSum1 = FinalValue1 * carat1
          LastSum += NewSum1
        }
      }
      let TotalValue = []
      for(let i=0;i<FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG == 'Total'){
          TotalValue.push({NEWAMT:LastSum,data:FinalGrid[i]})
        }else if(FinalGrid[i].PTAG === 'Total') {
          TotalValue.push({NEWAMT:FinalGrid[i].AMT,data:FinalGrid[i]})
        }
      }
      let NewArray = []
      let LastSum1 = 0
      for(let i=0; i<FinalGrid.length;i++){
        for(let j=0;j<TotalValue.length;j++){
          if(TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO  && FinalGrid[i].PTAG !== TotalValue[j].data['PTAG'] && FinalGrid[i].PLANNO !== params.data.PLANNO){
          let carat1 = FinalGrid[i].CARAT
          let orap1 = FinalGrid[i].ORAP
          let MperValue1
          if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
            MperValue1 = FinalGrid[i].MPER
          }else {
            MperValue1 = FinalGrid[i].PER
          }
          let newArray1 = (MperValue1 / 100) * orap1
          let FinalValue1 = orap1 - newArray1
          let NewSum1 = FinalValue1 * carat1
          LastSum1 += NewSum1
          } else if (TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO && FinalGrid[i].PLANNO !== params.data.PLANNO){
            TotalValue[j].NEWAMT = LastSum1
            TotalValue[j].data['PLNSEL'] = FinalGrid[i].PLNSEL
            LastSum1 =0
          }
        }
      }
      let highestRate = 0;
      let highAmt = -Infinity
      if(params.data.PLNSEL == true){
        for(let i=0;i<TotalValue.length;i++){
          if(TotalValue[i].data['PLANNO'] === params.data.PLANNO && TotalValue[i].data['SRNO'] === params.data.SRNO){
            highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = TotalValue[i].NEWAMT
            this.FINALAMT1 = TotalValue[i].NEWAMT
          }
        }
      } else {
        for(let i=0;i<TotalValue.length;i++){
          if(TotalValue[i].data['PLNSEL'] === true){
            highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = TotalValue[i].NEWAMT
            this.FINALAMT1 = TotalValue[i].NEWAMT
            break
          }else{
            if (TotalValue[i].NEWAMT > highAmt) {
              highAmt = TotalValue[i].NEWAMT
              highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = highAmt.toFixed(2)
              this.FINALAMT1 = highAmt.toFixed(2)
            }
          }
        }
      }
      let TotalSumAmt = 0
      let TotalSumRate = 0
      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG !== "Total"){
          TotalSumAmt += FinalGrid[i].AMT
          TotalSumRate += FinalGrid[i].RATE
        }
      } 
      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG === "Total"){
          FinalGrid[i].AMT = TotalSumAmt
          FinalGrid[i].RATE = TotalSumAmt / FinalGrid[i].CARAT
        }
      } 
      let NewValue = (this.ADIS/100)*this.FINALAMT
      // let FinalValue1 = parseFloat(this.FINALAMT) - NewValue
      let FinalValue1 = 0
      // if(`${this.ADIS}`.includes('+')){
        FinalValue1 = parseFloat(this.FINALAMT) + NewValue
      // }else{
        // FinalValue1 = parseFloat(this.FINALAMT) - NewValue
      // }
      this.FINALAMT = FinalValue1.toFixed(2)

      let NewBid = this.FINALAMT / this.PKTWEIGHT
      this.FINALBID =NewBid.toFixed(2)
      // let NewValue = (this.ADIS/100)*this.PKTPER
      // let FinalValue1 = parseFloat(this.PKTPER) + NewValue
      // this.FINALBID =FinalValue1.toFixed(2)
      this.gridApi1.refreshCells({ force: true });
    }else {
      let newArray = 0
      let FinalValue
      let NewSum
      let carat = params.data.CARAT
      let orap = params.data.ORAP
      let MperValue = parseFloat(params.data.PER)
      newArray = (MperValue / 100) * orap
      FinalValue = orap - newArray
      NewSum = FinalValue * carat

      let LastSum = 0
      let OtherLine = 0

      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG){
          FinalGrid[i].AMT = NewSum
          FinalGrid[i].RATE = FinalValue
          LastSum += NewSum
        }else if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total'){
          let carat1 = FinalGrid[i].CARAT
          let orap1 = FinalGrid[i].ORAP
          let MperValue1
          if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
            MperValue1 = FinalGrid[i].MPER
          }else {
            MperValue1 = FinalGrid[i].PER
          }
          let newArray1 = (MperValue1 / 100) * orap1
          let FinalValue1 = orap1 - newArray1
          let NewSum1 = FinalValue1 * carat1
          LastSum += NewSum1
        }
      }
      let TotalValue = []
      for(let i=0;i<FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG == 'Total'){
          TotalValue.push({NEWAMT:LastSum,data:FinalGrid[i]})
        }else if(FinalGrid[i].PTAG === 'Total') {
          TotalValue.push({NEWAMT:FinalGrid[i].AMT,data:FinalGrid[i]})
        }
      }
      let NewArray = []
      let LastSum1 = 0
      for(let i=0; i<FinalGrid.length;i++){
        for(let j=0;j<TotalValue.length;j++){
          if(TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO  && FinalGrid[i].PTAG !== TotalValue[j].data['PTAG'] && FinalGrid[i].PLANNO !== params.data.PLANNO){
            let carat1 = FinalGrid[i].CARAT
          let orap1 = FinalGrid[i].ORAP
          let MperValue1
          if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
            MperValue1 = FinalGrid[i].MPER
          }else {
            MperValue1 = FinalGrid[i].PER
          }
          let newArray1 = (MperValue1 / 100) * orap1
          let FinalValue1 = orap1 - newArray1
          let NewSum1 = FinalValue1 * carat1
          LastSum1 += NewSum1
          } else if (TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO && FinalGrid[i].PLANNO !== params.data.PLANNO){
            TotalValue[j].NEWAMT = LastSum1
            TotalValue[j].data['PLNSEL'] = FinalGrid[i].PLNSEL
            LastSum1 =0
          }
        }
      }
      let highestRate = 0;
      let highAmt = -Infinity
      if(params.data.PLNSEL == true){
        for(let i=0;i<TotalValue.length;i++){
          if(TotalValue[i].data['PLANNO'] === params.data.PLANNO && TotalValue[i].data['SRNO'] === params.data.SRNO){
            highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = TotalValue[i].NEWAMT
            this.FINALAMT1 = TotalValue[i].NEWAMT
          }
        }
      } else {
        for(let i=0;i<TotalValue.length;i++){
          if(TotalValue[i].data['PLNSEL'] === true){
            highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = TotalValue[i].NEWAMT
            this.FINALAMT1 = TotalValue[i].NEWAMT
            break
          }else{
            if (TotalValue[i].NEWAMT > highAmt) {
              highAmt = TotalValue[i].NEWAMT
              highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = highAmt
              this.FINALAMT1 = highAmt
            }
          }
        }
      }
      let NewValue = (this.ADIS/100)*this.FINALAMT
      // let FinalValue1 = parseFloat(this.FINALAMT) - NewValue
      let FinalValue1 = 0
      // if(`${this.ADIS}`.includes('+')){
        FinalValue1 = parseFloat(this.FINALAMT) + NewValue
      // }else{
        // FinalValue1 = parseFloat(this.FINALAMT) - NewValue
      // }
      this.FINALAMT = FinalValue1.toFixed(2)

      let NewBid = this.FINALAMT / this.PKTWEIGHT
      this.FINALBID =NewBid.toFixed(2)
      // let NewValue = (this.ADIS/100)*this.PKTPER
      // let FinalValue1 = parseFloat(this.PKTPER) + NewValue
      // this.FINALBID =FinalValue1.toFixed(2)
      let TotalSumAmt = 0
      let TotalSumRate = 0
      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG !== "Total"){
          TotalSumAmt += FinalGrid[i].AMT
          TotalSumRate += FinalGrid[i].RATE
        }
      } 
      for(let i=0;i< FinalGrid.length;i++){
        if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG === "Total"){
          FinalGrid[i].AMT = TotalSumAmt
          FinalGrid[i].RATE = TotalSumAmt / FinalGrid[i].CARAT
        }
      }
      this.gridApi1.refreshCells({ force: true });
    }
      return
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
      if (!params.data.ML_CODE) {
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
        ML_CODE: params.data.ML_CODE,
        SH_CODE: params.data.SH_CODE,
        REF_CODE: params.data.REF_CODE,
        RAPTYPE: params.data.RAPTYPE,
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
            let RATESUM = 0
            let AMTSUM = 0
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
            let FinalValue
            let NewSum
            let carat = params.data.CARAT
            let orap = params.data.ORAP
            let MperValue
            if(parseFloat(params.data.MPER) !== 0 && parseFloat(params.data.MPER) !== 100){
              MperValue = params.data.MPER
            }else {
              MperValue = params.data.PER
            }
            newArray = (MperValue / 100) * orap
            FinalValue = orap - newArray
            NewSum = FinalValue * carat
      
            let LastSum = 0
            let OtherLine = 0
      
            for(let i=0;i< FinalGrid.length;i++){
              if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG === params.data.PTAG){
                _GridRowData[i].AMT = NewSum
                _GridRowData[i].RATE = FinalValue
                LastSum += NewSum
              }else if (FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG !== 'Total'){
                let carat1 = FinalGrid[i].CARAT
                let orap1 = FinalGrid[i].ORAP
                let MperValue1
                if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
                  MperValue1 = FinalGrid[i].MPER
                }else {
                  MperValue1 = FinalGrid[i].PER
                }
                let newArray1 = (MperValue1 / 100) * orap1
                let FinalValue1 = orap1 - newArray1
                let NewSum1 = FinalValue1 * carat1
                LastSum += NewSum1
              }
            }
            let TotalValue = []
            for(let i=0;i<FinalGrid.length;i++){
              if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].SRNO === params.data.SRNO && FinalGrid[i].PTAG == 'Total'){
                TotalValue.push({NEWAMT:LastSum,data:FinalGrid[i]})
              }else if(FinalGrid[i].PTAG === 'Total') {
                TotalValue.push({NEWAMT:FinalGrid[i].AMT,data:FinalGrid[i]})
              }
            }
            let NewArray = []
            let LastSum1 = 0
            for(let i=0; i<FinalGrid.length;i++){
              for(let j=0;j<TotalValue.length;j++){
                if(TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO  && FinalGrid[i].PTAG !== TotalValue[j].data['PTAG'] && FinalGrid[i].PLANNO !== params.data.PLANNO){
                  let carat1 = FinalGrid[i].CARAT
                let orap1 = FinalGrid[i].ORAP
                let MperValue1
                if(parseFloat(FinalGrid[i].MPER)!== 0 && parseFloat(FinalGrid[i].MPER) !== 100){
                  MperValue1 = FinalGrid[i].MPER
                }else {
                  MperValue1 = FinalGrid[i].PER
                }
                let newArray1 = (MperValue1 / 100) * orap1
                let FinalValue1 = orap1 - newArray1
                let NewSum1 = FinalValue1 * carat1
                LastSum1 += NewSum1
                } else if (TotalValue[j].data['PLANNO']===FinalGrid[i].PLANNO && FinalGrid[i].PLANNO !== params.data.PLANNO){
                  TotalValue[j].NEWAMT = LastSum1
                  TotalValue[j].data['PLNSEL'] = FinalGrid[i].PLNSEL
                  LastSum1 =0
                }
              }
            }
            let highestRate = 0;
            let highAmt = -Infinity
            if(params.data.PLNSEL == true){
              for(let i=0;i<TotalValue.length;i++){
                if(TotalValue[i].data['PLANNO'] === params.data.PLANNO && TotalValue[i].data['SRNO'] === params.data.SRNO){
                  highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
                  this.PKTPER = highestRate.toFixed(2)
                  this.FINALAMT = TotalValue[i].NEWAMT
                  this.FINALAMT1 = TotalValue[i].NEWAMT
                }
              }
            } else {
              for(let i=0;i<TotalValue.length;i++){
                if(TotalValue[i].data['PLNSEL'] === true){
                  highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
                  this.PKTPER = highestRate.toFixed(2)
                  this.FINALAMT = TotalValue[i].NEWAMT
                  this.FINALAMT1 = TotalValue[i].NEWAMT
                  break
                }else{
                  if (TotalValue[i].NEWAMT > highAmt) {
                    highAmt = TotalValue[i].NEWAMT
                    highestRate = TotalValue[i].NEWAMT / TotalValue[i].data['CARAT']
                    this.PKTPER = highestRate.toFixed(2)
                    this.FINALAMT = highAmt
                    this.FINALAMT1 = highAmt
                  }
                }
              }
            }
            this.PKTPER = highestRate.toFixed(2)
            let NewValue = (this.ADIS/100)*this.FINALAMT
            // let FinalValue1 = parseFloat(this.FINALAMT) - NewValue
            let FinalValue1 = 0
            // if(`${this.ADIS}`.includes('+')){
              FinalValue1 = parseFloat(this.FINALAMT) + NewValue
            // }else{
              // FinalValue1 = parseFloat(this.FINALAMT) - NewValue
            // }
            this.FINALAMT = FinalValue1.toFixed(2)
  
            let NewBid = this.FINALAMT / this.PKTWEIGHT
            this.FINALBID =NewBid.toFixed(2)
            // let NewValue = (this.ADIS/100)*this.PKTPER
            // let FinalValue1 = parseFloat(this.PKTPER) + NewValue
            // this.FINALBID =FinalValue1.toFixed(2)
            let TotalSumAmt = 0
            let TotalSumRate = 0
            for(let i=0;i< FinalGrid.length;i++){
              if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG !== "Total"){
                TotalSumAmt += FinalGrid[i].AMT
                TotalSumRate += FinalGrid[i].RATE
              }
            } 
            for(let i=0;i< FinalGrid.length;i++){
              if(FinalGrid[i].PLANNO === params.data.PLANNO && FinalGrid[i].PTAG === "Total"){
                FinalGrid[i].AMT = TotalSumAmt
                FinalGrid[i].RATE = TotalSumAmt / FinalGrid[i].CARAT
              }
            } 
            this.gridApi1.refreshCells({ force: true });

          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  OUTSIDECLICK(eve){
    if(this.DOCKON === true){
      this.DOCKON = false
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
      ADIS:this.ADIS ? this.ADIS:0,
      FAMT:this.FINALAMT ? this.FINALAMT:0
    }
    this.TendarEstServ.TendarResSave(saveOBJ1).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.SRNODIS = true
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
    let ConditionArray =[]
    for (let i = 0; i < SubData.length; i++) {
      if (
        SubData[i].S_CODE ||
        SubData[i].C_CODE ||
        SubData[i].Q_CODE ||
        parseFloat(SubData[i].CARAT) ||
        SubData[i].LB_CODE
      ) {
        if(
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
        ){
          if(!SubData[i].S_CODE){
            ConditionArray.push('Shape')
          }else if(!SubData[i].C_CODE){
            ConditionArray.push('Color')
          }else if(!SubData[i].Q_CODE){
            ConditionArray.push('Clarity')
          }else if(!parseFloat(SubData[i].CARAT)){
            ConditionArray.push('Carat')
          }else if(!SubData[i].CT_CODE){
            ConditionArray.push('Cut')
          }else if(!SubData[i].FL_CODE){
            ConditionArray.push('Fluorescence')
          }else if(!SubData[i].LB_CODE){
            ConditionArray.push('Lab')
          }else if(!SubData[i].IN_CODE){
            ConditionArray.push('Inclusion')
          }else if(!SubData[i].ML_CODE){
            ConditionArray.push('Milky')
          }else if(!SubData[i].SH_CODE){
            ConditionArray.push('Shades')
          }else if(!SubData[i].RAPTYPE){
            ConditionArray.push('Raptype')
          }else if(!SubData[i].REF_CODE){
            ConditionArray.push('Reflection')
          }
        return this.toastr.warning(ConditionArray[0] + ' ' +'is Missing');
        }
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
        SH_CODE: SubData[i].SH_CODE ? SubData[i].SH_CODE : 0,
        REF_CODE: SubData[i].REF_CODE ? SubData[i].REF_CODE : 0,
        RAPTYPE: SubData[i].RAPTYPE ? SubData[i].RAPTYPE : '',
      };
      PerArr.push(SaveObj);
    }
    
    this.TendarEstServ.TendarPrdDetSave(PerArr).subscribe((SaveRes) => {
      try{
        if(SaveRes.success == true){
          this.spinner.hide()
          this.toastr.success("Save sucesfully")
          this.SRNODIS = true
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
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        });
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

    let Com_arr = this.decodedMast[20].map((item) => {
      return { code: item.MCOM_NAME, name:item.MCOM_NAME };
    });

    this.MacComm = [[{ code: 0 ,name: '---'  }, ...Com_arr]]

    let Tension_arr = this.decodedMast[16].map((item) => {
      return { code: item.T_CODE, name: item.T_NAME };
    });
    this.TenArr = [[{ code: 0 ,name: '---' }, ...Tension_arr]]
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

    this.FillViewPara1()
    this.FillViewPara();
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
      }
      
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
      op.findrap1(NewCode)
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
        MPER,
        SH_CODE,
        REF_CODE,
        RAPTYPE
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
      let ML_CODE = $(this).val()

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
        RAPTYPE
      }

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
      op.findrap1(NewCode)
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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
      let SH_CODE = $(inputData[21]).val();
      let REF_CODE = $(inputData[22]).val();
      let RAPTYPE = $(inputData[23]).val();
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

    $('body').on('focusin', 'select.ShdFill', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.ShdFill', function (this) {
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
      let SH_CODE = $(this).val()

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
        RAPTYPE
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].SH_CODE = SH_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });
      op.findrap1(NewCode)
    })
    $('body').on('focusin', 'select.RefFill', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.RefFill', function (this) {
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
      let REF_CODE = $(this).val()

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
        RAPTYPE
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].REF_CODE = REF_CODE
        }
      }
      op.gridApi1.refreshCells({ force: true });
      op.findrap1(NewCode)
    })

    $('body').on('focusin', 'select.RapTypeFill', function (this) {
      $(this).data('val', $(this).val());
    });

    $('body').on('change', 'select.RapTypeFill', function (this) {
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
      let RAPTYPE = $(this).val()

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
        RAPTYPE
      }

      let _GridRowData = []
      op.gridApi1.forEachNode(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      for (let i = 0; i < _GridRowData.length; i++) {
        if (_GridRowData[i].PLANNO === parseInt(PLANNO) && _GridRowData[i].SRNO == parseInt(SRNO) && _GridRowData[i].PTAG === PTAG) {
          _GridRowData[i].RAPTYPE = RAPTYPE
        }
      }
      op.gridApi1.refreshCells({ force: true });
      op.findrap1(NewCode)
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
                cellStyle: { 
                            "text-align": VPRes.data[i].CELLALIGN,
                            "background-color": VPRes.data[i].BACKCOLOR,
                            "color":VPRes.data[i].FONTCOLOR
                            },
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

  CapClick(){
    const capInput = document.getElementById('capInput');
    if (capInput) {
      capInput.click();
    }
  }

  onCapInputChange(eve){
    let op = this

    const inputElement = eve.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];

    if (selectedFile) {
      let formData:FormData = new FormData();
    if(selectedFile) {
      formData.append('Pic', selectedFile, selectedFile.name)
    }
      let uploadedPicName = null;
      let uploadedPicExt = null;
    this.spinner.show()
      this.TendarEstServ.fileUpload(formData).subscribe(uploadImageRes => {
        
        if(uploadImageRes.length != 0){
          uploadedPicName = uploadImageRes[0];
          uploadedPicExt = uploadedPicName.split('.').pop();

          let Obj = {
              uploadedPicName:uploadedPicName,
              uploadedPicExt:uploadedPicExt,
              COMP_CODE: op.COMP_CODE,
              DETID: this.DOCKData['DETID'],
              SRNO: this.DOCKData['SRNO'],
              SECURE_URL: 'https://pcknstg.blob.core.windows.net/hdfile/Sarine/'+uploadedPicName,
              URL: '',
              CLOUDID: '',
              PUBLICID: '',
              I_TYPE: 'FILE'
          }
          this.TendarEstServ.TendarVidUpload(Obj).subscribe((SaveRes) => {
            try{
              if(SaveRes.success){
                  this.spinner.hide()
                  this.toastr.success('File Upload SucessFully')
                }
              else{
                this.spinner.hide()
                this.toastr.warning('Something want Wrong While File Upload')
                };
            }catch(err){
              this.spinner.hide()
              this.toastr.warning(err)
            }
          })
        }else {
          this.spinner.hide()
          this.toastr.error('Something want Wrong While File Upload')
        }
    })
    }
  }

  Download(){
    let Obj = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
      FSRNO: this.DOCKData['SRNO'],
      TSRNO: this.DOCKData['SRNO'],
      I_TYPE:'FILE'
    };
    this.TendarEstServ.TendarVidDisp(Obj).subscribe((Res) => {
      try {
        if (Res.success == true) {
          let newurl = Res.data[0].SECURE_URL
          window.open(newurl, '_blank');
        }
      } catch{

      }
    })
  }

  ShowVideo() {
    let NewObj = {
      COMP_CODE: this.DOCKData['COMP_CODE'],
      DETID:this.DOCKData['DETID'],
      SRNO: this.DOCKData['SRNO'],
    }
    this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
      try{
        if(NewRes.success == true){
        this.VIDEOON = true
        this.videoSrc = NewRes.data[0]['VID'];
        }
      } catch (error){
        this.spinner.hide()
      }
    })
  }
  CLOSE(){
    this.videoSrc = ''
    this.VIDEOON = false
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
          FileName: `${op.COMP_CODE}-${op.DETID}-${this.DOCKData['SRNO']}`,
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
      disableClose: true,
      data: this.DOCKData
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { 
      let NewObj = {
        COMP_CODE: this.COMP_CODE,
        DETID:this.CliCKEDDATA.DETID,
        SRNO: this.CliCKEDDATA.SRNO,
      }
      this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
        try{
          if(NewRes.success == true){
            this.NEWIMAGE = NewRes.data[0].PRN
            const imageUrl = this.NEWIMAGE;

          fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
          // Draw the ImageBitmap on the canvas
          const canvas = document.getElementById('lienzo1') as HTMLCanvasElement;
          const context = canvas.getContext('2d');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
          context.drawImage(imageBitmap, 0, 0);
        })
        .catch(error => {
          console.error('Error fetching or drawing image:', error);
        });
          }
        } catch (error){
          this.spinner.hide()
        }
      })
    })
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
      SH_CODE:RapObj.SH_CODE,
      REF_CODE:RapObj.REF_CODE,
      RAPTYPE:RapObj.RAPTYPE,
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
          let FinalValue = 0
          let NewSum = 0

          let LastSum = 0
          for (let i = 0; i < _GridRowData.length; i++) {
            if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO === parseInt(RapObj.SRNO) && _GridRowData[i].PTAG === RapObj.PTAG) {
              carat =_GridRowData[i].CARAT
              orap = _GridRowData[i].ORAP
              if(parseFloat(_GridRowData[i].MPER) !== 0 && parseFloat(_GridRowData[i].MPER) !== 100){
                MperValue = _GridRowData[i].MPER
              }else {
                MperValue = _GridRowData[i].PER
              }
              newArray = (MperValue / 100) * orap
              FinalValue = orap - newArray
              NewSum = FinalValue * carat
              
            }
            if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO === parseInt(RapObj.SRNO) && _GridRowData[i].PTAG == RapObj.PTAG) {
              _GridRowData[i].AMT = NewSum
              _GridRowData[i].RATE = FinalValue
              LastSum += NewSum
            }else if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO === parseInt(RapObj.SRNO) && _GridRowData[i].PTAG !== 'Total'){
              let carat1 =_GridRowData[i].CARAT
              let orap1 = _GridRowData[i].ORAP
              let MperValue1
              if(parseFloat(_GridRowData[i].MPER) !== 0 && parseFloat(_GridRowData[i].MPER) !== 100){
                MperValue1 = _GridRowData[i].MPER
              }else {
                MperValue1 = _GridRowData[i].PER
              }
               let newArray1 = (MperValue1 / 100) * orap1
              let FinalValue1 = orap1- newArray1
              let NewSum1 = FinalValue1 * carat1
              LastSum += NewSum1
            }
          }
          
          let totalSum =[]
          let FINALAMT=0
          for(let i=0;i<_GridRowData.length;i++){
            if (_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].SRNO == parseInt(RapObj.SRNO) && _GridRowData[i].PTAG === 'Total') {
              totalSum.push({NEWAMT:LastSum,data:_GridRowData[i]})
            } else if(_GridRowData[i].PTAG === 'Total'){
              totalSum.push({NEWAMT:_GridRowData[i].AMT,data:_GridRowData[i]})
            }
          }
          let LastSum1 =0
          for(let i=0; i<_GridRowData.length;i++){
            for(let j=0;j<totalSum.length;j++){
              if(totalSum[j].data['PLANNO']===_GridRowData[i].PLANNO  && _GridRowData[i].PTAG !== totalSum[j].data['PTAG'] && _GridRowData[i].PLANNO !== RapObj.PLANNO){
                let carat1 = _GridRowData[i].CARAT
              let orap1 = _GridRowData[i].ORAP
              let MperValue1
              if(parseFloat(_GridRowData[i].MPER)!== 0 && parseFloat(_GridRowData[i].MPER) !== 100){
                MperValue1 = _GridRowData[i].MPER
              }else {
                MperValue1 = _GridRowData[i].PER
              }
              let newArray1 = (MperValue1 / 100) * orap1
              let FinalValue1 = orap1 - newArray1
              let NewSum1 = FinalValue1 * carat1
              LastSum1 += NewSum1
              } else if (totalSum[j].data['PLANNO']===_GridRowData[i].PLANNO && _GridRowData[i].PLANNO !== RapObj.PLANNO){
                totalSum[j].NEWAMT = LastSum1
                totalSum[j].data['PLNSEL'] = _GridRowData[i].PLNSEL
                LastSum1 =0
              }
            }
          }

          let highestRate = 0;
      let highAmt = -Infinity
      if(RapObj.PLNSEL == 'true'){
        for(let i=0;i<totalSum.length;i++){
          if(totalSum[i].data['PLANNO'] === parseInt(RapObj.PLANNO) && totalSum[i].data['SRNO'] === parseInt(RapObj.SRNO)){
            highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = totalSum[i].NEWAMT.toFixed(2)
            this.FINALAMT1 = totalSum[i].NEWAMT.toFixed(2)
          }
        }
      } else {
        for(let i=0;i<totalSum.length;i++){
          if(totalSum[i].data['PLNSEL'] === true){
            highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
            this.PKTPER = highestRate.toFixed(2)
            this.FINALAMT = totalSum[i].NEWAMT.toFixed(2)
            this.FINALAMT1 = totalSum[i].NEWAMT.toFixed(2)
            break
          }else{
            if (totalSum[i].NEWAMT > highAmt) {
              highAmt = totalSum[i].NEWAMT
              highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
              this.PKTPER = highestRate.toFixed(2)
              this.FINALAMT = highAmt.toFixed(2)
              this.FINALAMT1 = highAmt.toFixed(2)
            }
          }
        }
      }

          let NewValue = (this.ADIS/100)*this.FINALAMT
          let FinalValue1 = 0
          // if(`${this.ADIS}`.includes('+')){
            FinalValue1 = parseFloat(this.FINALAMT) + NewValue
          // }else{
            // FinalValue1 = parseFloat(this.FINALAMT) - NewValue
          // }
          // let FinalValue1 = parseFloat(this.FINALAMT) - NewValue
          this.FINALAMT = FinalValue1.toFixed(2)

          let NewBid = this.FINALAMT / this.PKTWEIGHT
          this.FINALBID =NewBid.toFixed(2)

          let TotalSumAmt = 0
      let TotalSumRate = 0
      for(let i=0;i< _GridRowData.length;i++){
        if(_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].PTAG !== 'Total'){
          TotalSumAmt += _GridRowData[i].AMT
          TotalSumRate += _GridRowData[i].RATE
        }
      } 
      for(let i=0;i< _GridRowData.length;i++){
        if(_GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && _GridRowData[i].PTAG === 'Total'){
          _GridRowData[i].AMT = TotalSumAmt
          _GridRowData[i].RATE = TotalSumAmt / _GridRowData[i].CARAT
        }
      } 

          this.gridApi1.refreshCells({ force: true })
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
    this.FINALAMT = ''
    this.gridApi1.setRowData()
  }

  OnCellCLICK(eve){
    this.gridApi1.startEditingCell({
      rowIndex: eve.rowIndex,
      colKey: eve.colDef.field,
    })
  }
  GridTempData = [];
  onCellDoubleClicked(eve) {
    if (eve.colDef.field !== "ISAPPROVE") {
      this.FLOCODEDIS = false
      this.TendarEstServ.TendarPrdDetDisp({
        COMP_CODE: this.COMP_CODE,
        DETID: eve.data.DETID,
        SRNO: eve.data.SRNO,
        TYPE:'DOCK'
      }).subscribe((FillRes) => {
        try {
          if (FillRes.success == true) {
            this.HIDEGRID = false
            this.spinner.hide();
            this.DOCKData = FillRes.data[0][0]
            this.TENSION = FillRes.data[0][0].T_CODE
            this.TENDAR_NAME = FillRes.data[0][0].TEN_NAME
            this.PKTSRNO = FillRes.data[0][0].SRNO
            if(FillRes.data[0][0].PUSER){
              this.PKTNAME = FillRes.data[0][0].PUSER
            }else{
              this.PKTNAME = this.decodedTkn.UserId
            }
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
            this.FINALAMT = FillRes.data[0][0].FAMT
            this.FINALAMT1 = FillRes.data[0][0].FAMT
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

      let li = this.lienzo1.nativeElement;
      li.width = window.innerWidth - 400;
      this.CliCKEDDATA = eve.data
      let NewObj = {
        COMP_CODE: this.COMP_CODE,
        DETID:eve.data.DETID,
        SRNO: eve.data.SRNO,
      }
      this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
        try{
          if(NewRes.success == true){
            this.NEWIMAGE = NewRes.data[0].PRN
            const imageUrl = this.NEWIMAGE;

          fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
          // Draw the ImageBitmap on the canvas
          const canvas = document.getElementById('lienzo1') as HTMLCanvasElement;
          const context = canvas.getContext('2d');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
          context.drawImage(imageBitmap, 0, 0);
        })
        .catch(error => {
          console.error('Error fetching or drawing image:', error);
        });
          }
        } catch (error){
          this.spinner.hide()
        }
      })

            if(eve.data.AUSER !== this.decodedTkn.UserId && this.decodedTkn.U_CAT == 'U'){
              this.disabledata = true
              this.FLOCODEDIS = true
            }

            if(this.decodedTkn.UserId == 'DN' || this.decodedTkn.U_CAT === 'S'){
              this.disabledata = false 
              this.FLOCODEDIS = false
            }

            for(let i=0;i<newdata.length;i++){
              if(newdata[i].PLNSEL === true && this.decodedTkn.UserId !== 'DN'){
                this.ALLGRIDDISABLE = true
                break
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
              text: JSON.stringify(FillRes.data.originalError.info.message),
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
