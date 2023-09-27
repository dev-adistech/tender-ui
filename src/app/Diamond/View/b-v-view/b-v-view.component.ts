import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import { ViewService } from 'src/app/Service/View/view.service';
import Swal from 'sweetalert2';
import { ConverterFunctions } from '../../_helpers/functions/ConverterFunctions';
import { DatePipe } from '@angular/common';
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
declare let $: any;

@Component({
  selector: 'app-b-v-view',
  templateUrl: './b-v-view.component.html',
  styleUrls: ['./b-v-view.component.css']
})
export class BVViewComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  tableRepeatCount = Array(1).fill(0);

  allSzs:any[]=[]
  filteredSzs: Observable<any[]>;
  szControl:FormControl;
  selectedSz:any=''

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
  RAT_NAME: any = []
  GRD_NAME: any = []
  SHD_NAME: any = []
  REF_NAME: any = []
  RAPNAME: any = []
  ML_NAME: any = []


  disabledata: boolean = false
  disabledataArray: any = []

  LS:boolean = false
  R1:any=''
  R2:any=''
  F1:any=''
  F2:any=''
  DN:any=''
  USER1:any=''
  USER2:any=''
  USER3:any=''
  FANCY1:any=''
  ROUNDC1:any=''
  COLORArr=[]
  filteredColor: Observable<any[]>;
  ColControl: FormControl;
  FINALBID:any=''
  FLOCODE:any=''

  FLOCODEDIS:boolean = false
  
  MacColControl: FormControl;
  MacColor:any=[]
  filteredMacColor: Observable<any[]>;
  FINAL1:any=''
  FINAL2:any=''
  FINALME:any=''
  FINALHE:any=''
  RESULT1:any=''
  RESULT2:any=''
  RESULTME:any=''
  RESULTHE:any=''

  FloControl: FormControl;
  FLONO:any=[]
  filteredFLO: Observable<any[]>;
  FLO1:any=''
  FLO2:any=''
  FLOME:any=''
  FLOHE:any=''

  MacFloControl: FormControl;
  MacFLONO:any=[]
  filteredMacFLO: Observable<any[]>;
  MacFLO1:any=''
  MacFLO2:any=''
  MacFLOME:any=''
  MacFLOHE:any=''

  MacComControl: FormControl;
  MacComm:any=[]
  filteredMacCom: Observable<any[]>;
  MacCom1:any=''
  MacCom2:any=''
  MacComME:any=''
  MacComHE:any=''

  PKTNAME:any=''
  PKTSRNO:any=''
  PKTWEIGHT:any=''
  PKTRESERVE:any=''
  PKTPER:any=''
  PKTSRW:any=''
  PKTSRW1:any=''
  FLAT1:any=''
  FLAT2:any=''
  
  TensionControl: FormControl;
  TenArr:any=[]
  filteredTension: Observable<any[]>;
  TENSION:any=''

  TENDAR_NAME:any=''

  TendarStyle:string=`width: 100%;height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
  AreaBoxStyle:string=`border:1px solid black;width: 100%;height: 50px;resize: none;`;
  ContainWidth:string=`border:1px solid black;width: calc(100% - 10px);height: 55px;border-top:none`;
  BlankBoxStyle:string=`border:1px solid black;padding: 21px 0px; width: 100%; text-align: center;border-top:none;`;
  HearderBoxStyle:string=`border:1px solid black; width:100%; text-align: center;border-bottom:none`;

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;
  rowData:any[]=[Array(1).fill(0)]
  GRIDROw:any[]=[]
  NewRowData:any[]=[]
  ROWData1:any[]=[]

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public getRowStyle

  SECONDDATA: any[] = [];
  _GridRowData: any[] = [];
  FINALAMT: any = ''
  FINALAMT1:any = ''
  ADIS: any = "";

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private ViewServ :ViewService,
    private ViewParaMastServ : ViewParaMastService,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private TendarEstServ: TendarEstService,
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
    }
    let op=this
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
    this.FillViewPara()
  }

  ngOnInit(): void {
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });

    let C_arr = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    this.COLORArr = [[{ code: 0, name: '---' }, ...C_arr]]

    let MC_arr = this.decodedMast[17].map((item) => {
      return { code: item.MC_CODE, name: item.MC_NAME };
    });

    this.MacColor = [[{ code: 0, name: '---' }, ...MC_arr]]

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

    let Com_arr =  this.decodedMast[20].map((item) => {
      return { code: item.MCOM_NAME};
    });
    
    this.MacComm = [[{ code: 0}, ...Com_arr]]

    let Tension_arr = this.decodedMast[16].map((item) => {
      return { code: item.T_CODE,name:item.T_NAME};
    });
    this.TenArr = [[{ code: 0}, ...Tension_arr]]


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
      
      let op=this


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
       
        // for (let i = 0; i < op._GridRowData.length; i++) {
        //   if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
        //     op._GridRowData[i].S_CODE = S_CODE
        //   }
        // }
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].S_CODE = S_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].C_CODE = C_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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

        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].Q_CODE = Q_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].CT_CODE = CT_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].FL_CODE = FL_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
        for (let j = 0; j < op.rowData.length;j++) {
        for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
          if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
            if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
              op.rowData[j].GRID_DATA[k].LB_CODE = LB_CODE
            }
          }
        }
      }
        }
        console.log(op.rowData)
        // op.gridApi.refreshCells({ force: true });
  
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].IN_CODE = IN_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].ML_CODE = ML_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].DEP_CODE = DEP_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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
  
  
        // for (let i = 0; i < op._GridRowData.length; i++) {
        //   if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
        //     op._GridRowData[i].RAT_CODE = RAT_CODE
        //   }
        // }
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].RAT_CODE = RAT_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].GRD_CODE = GRD_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
  
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].SH_CODE = SH_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].REF_CODE = REF_CODE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
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
  
        for (let i = 0; i < op._GridRowData.length; i++) {
          for (let j = 0; j < op.rowData.length;j++) {
          for (let k = 0; k < op.rowData[j].GRID_DATA.length;k++) {
            if (op._GridRowData[i].PLANNO === parseInt(PLANNO) && op._GridRowData[i].SRNO == parseInt(SRNO) && op._GridRowData[i].PTAG === PTAG) {
              if(op._GridRowData[i].PLANNO === op.rowData[j].GRID_DATA[k].PLANNO && op._GridRowData[i].SRNO && op.rowData[j].GRID_DATA[k].SRNO  && op._GridRowData[i].PTAG == op.rowData[j].GRID_DATA[k].PTAG){
                op.rowData[j].GRID_DATA[k].RAPTYPE = RAPTYPE
              }
            }
          }
        }
      }
        // op.gridApi.refreshCells({ force: true });
        op.findrap1(NewCode)
      })
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

  GETDETID() {
    this.DETID=''
    this.T_DATE=null
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            for (let i = 0; i < FillRes.data.length; i++) {
              if(FillRes.data[i].ISACTIVE == true){
              this.DETIDarr.push({
                code: FillRes.data[i].DETID,
                date: FillRes.data[i].T_DATE,
                name:FillRes.data[i].T_NAME
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
                        if (this.decodedTkn.UserId === 'DN' || this.decodedTkn.U_CAT === 'S') {
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
                        if (this.decodedTkn.UserId === 'DN' || this.decodedTkn.U_CAT === 'S') {
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
            // this._gridFunction.FooterKey = this.FooterKey;
            // delete temp[i].cellStyle
            // temp[i].cellStyle = this.ColColor.bind(this)
          }
          this.columnDefs = temp

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

  MPERDISABLE(params) {
    if (this.decodedTkn.UserId === 'DN') {
      return true
    } else {
      return false
    }
  }

  CARATEDITABLE(params) {

    if (this.decodedTkn.UserId === 'DN') {
      return true
    } else {
      return false
    }
  }

  ShapeFill(params) {
    if (params.data.PTAG !== "Total") {
        if (this.decodedTkn.UserId === 'DN') {
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
    if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
       if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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
      if (this.decodedTkn.UserId === 'DN') {
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

  // FillViewPara() {
  //   this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'BVView' }).subscribe((VPRes) => {
  //     try {
  //       if (VPRes.success == 1) {
  //         let GroupData = this.groupByArray(VPRes.data, "GROUPKEY")
  //         let ViewParaRowData = []
  //         for (let i = 0; i < GroupData.length; i++) {
  //           let jsonData = {}
  //           jsonData["headerName"] = GroupData[i].GROUPKEY
  //           jsonData["headerClass"] = "header-align-center"
  //           let tempData = []

  //           for (let j = 0; j < GroupData[i].Data.length; j++) {
  //             tempData.push({
  //               headerName: GroupData[i].Data[j].DISPNAME,
  //               headerClass: GroupData[i].Data[j].HEADERALIGN,
  //               field: GroupData[i].Data[j].FIELDNAME,
  //               width: GroupData[i].Data[j].COLWIDTH,
  //               cellStyle: {
  //                 "text-align": GroupData[i].Data[j].CELLALIGN,
  //                 "background-color": GroupData[i].Data[j].BACKCOLOR,
  //                 "color":GroupData[i].Data[j].FONTCOLOR
  //               },
  //               resizable: GroupData[i].Data[j].ISRESIZE,
  //               GROUPKEY: GroupData[i].Data[j].GROUPKEY,
  //               hide: GroupData[i].Data[j].DISP == false ? true : false,
  //               pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
  //               suppressMenu: true,
  //             })

  //             if(GroupData[i].Data[j].FIELDNAME === "MPER"){
  //               tempData[j].editable = this.decodedTkn.U_CAT === 'P' ? true : false
  //             }
  //           }

  //           jsonData["children"] = tempData
  //           tempData = []
  //           ViewParaRowData.push(jsonData)
  //         }

  //         this.columnDefs = ViewParaRowData
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: JSON.stringify(VPRes.data),
  //         })
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       this.toastr.error(error)
  //     }
  //   })
  // }
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
    let FillObj ={
      COMP_CODE:this.COMP_CODE ? this.COMP_CODE:'',
      DETID:this.DETID ? this.DETID:0
    }
    this.spinner.show();
    this.ViewServ.BVView(FillObj).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.tableRepeatCount =Array(FillRes.data[0].length).fill(0);
            this.rowData =FillRes.data[0]
            this.NewRowData = FillRes.data[1]
            
            for(let i=0; i < this.rowData.length ; i++){
              this.rowData[i].GRID_DATA = this.GetRowData(this.rowData[i].DETID, this.rowData[i].SRNO, this.rowData[i].COMP_CODE,this.NewRowData)
            }
            this.SECONDDATA = FillRes.data[1]
            this._GridRowData = FillRes.data[1]
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

  GetRowData(DetId,Srno,Comp,data){
    return data.filter(row =>row.COMP_CODE === Comp && row.SRNO === Srno && row.DETID === DetId);
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
    // let _GridRowData = [];
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

          let newdata = []
          let CARATSUM = 0
          let RATESUM = 0
          let AMTSUM = 0
          let PERMUL = 0
          let CrtSUM = 0
          let NewCrtSUM = 0
          let PTAGROW = []
          let PTAGRO = []
          for (let i = 0; i < this._GridRowData.length; i++) {
            for (let j = 0; j < this.rowData.length;j++) {
            for (let k = 0; k < this.rowData[j].GRID_DATA.length;k++) {
              if (this._GridRowData[i].PLANNO === oldRapObj.PLANNO && this._GridRowData[i].SRNO == oldRapObj.SRNO && this._GridRowData[i].PTAG === oldRapObj.PTAG) {
                if(oldRapObj.PLANNO === this.rowData[j].GRID_DATA[k].PLANNO && oldRapObj.SRNO === this.rowData[j].SRNO  && oldRapObj.PTAG == this.rowData[j].GRID_DATA[k].PTAG){
                  this.rowData[j].GRID_DATA[k].ORAP = RapRes.data[0][0].AMT;
                  this.rowData[j].GRID_DATA[k].RATE = RapRes.data[1][0][''];
                  this.rowData[j].GRID_DATA[k].RTYPE = RapRes.data[2][0][''];
                  this.rowData[j].GRID_DATA[k].AMT = this.rowData[j].GRID_DATA[k].RATE * this.rowData[j].GRID_DATA[k].CARAT;
                  this.rowData[j].GRID_DATA[k].PER = 100 - (this.rowData[j].GRID_DATA[k].RATE / this.rowData[j].GRID_DATA[k].ORAP) * 100;
                  PTAGROW.push(this.rowData[j].GRID_DATA[k])
                  PTAGRO = this.rowData[j]
                }else{
                  PTAGROW.push(this.rowData[j].GRID_DATA[k])
                }
              }
            }
          }
        }
          // for (let i = 0; i < this._GridRowData.length; i++) {
          //   if (this._GridRowData[i].SRNO === oldRapObj.SRNO && this._GridRowData[i].PLANNO === oldRapObj.PLANNO && this._GridRowData[i].PTAG === oldRapObj.PTAG) {
          //     this._GridRowData[i].ORAP = RapRes.data[0][0].AMT;
          //     this._GridRowData[i].RATE = RapRes.data[1][0][''];
          //     this._GridRowData[i].RTYPE = RapRes.data[2][0][""];
          //     this._GridRowData[i].AMT = this._GridRowData[i].RATE * this._GridRowData[i].CARAT;
          //     this._GridRowData[i].PER = 100 - (this._GridRowData[i].RATE / this._GridRowData[i].ORAP) * 100;
          //     this._GridRowData[i].S_CODE = RapObj.S_CODE;
          //     this._GridRowData[i].Q_CODE = RapObj.Q_CODE;
          //     this._GridRowData[i].C_CODE = RapObj.C_CODE;
          //     this._GridRowData[i].CT_CODE = RapObj.CT_CODE;
          //     this._GridRowData[i].FL_CODE = RapObj.FL_CODE;
          //     this._GridRowData[i].LB_CODE = RapObj.LB_CODE;
          //     this._GridRowData[i].IN_CODE = RapObj.IN_CODE;
          //   } if (this._GridRowData[i].SRNO === oldRapObj.SRNO && this._GridRowData[i].PLANNO === oldRapObj.PLANNO && this._GridRowData[i].PTAG !== 'Total') {
          //     NewCrtSUM += parseFloat(this._GridRowData[i].CARAT)
          //     if (this._GridRowData[i].SRNO === oldRapObj.SRNO && this._GridRowData[i].PLANNO === oldRapObj.PLANNO && this._GridRowData[i].PTAG === oldRapObj.PTAG) {
          //       if (NewCrtSUM > this.PKTWEIGHT) {
          //         this._GridRowData[i].CARAT = 0.000
          //         this._GridRowData[i].S_CODE = 0
          //         this._GridRowData[i].C_CODE = 0
          //         this._GridRowData[i].Q_CODE = 0
          //         this._GridRowData[i].LB_CODE = 0
          //         this._GridRowData[i].ML_CODE = 0
          //         this._GridRowData[i].RAT_CODE = 0
          //         this._GridRowData[i].GRD_CODE = 0
          //         this._GridRowData[i].ORAP = 0
          //         this._GridRowData[i].RATE = 0
          //         this._GridRowData[i].AMT = 0
          //         this._GridRowData[i].PER = 0
          //         this._GridRowData[i].ORAP = 0
          //         this._GridRowData[i].RATE = 0
          //         this._GridRowData[i].AMT = 0
          //         this._GridRowData[i].PER = 0
          //         this._GridRowData[i].CARAT = 0.00
          //       }
          //     }

          //     CARATSUM += this._GridRowData[i].ORAP
          //     AMTSUM += this._GridRowData[i].AMT
          //     CrtSUM += parseFloat(this._GridRowData[i].CARAT)
          //     RATESUM += (AMTSUM / CrtSUM)
          //     PERMUL += (this._GridRowData[i].ORAP * parseFloat(this._GridRowData[i].CARAT))
          //     this._GridRowData[i].IUSER = this.decodedTkn.UserId
          //   }

          //   let Total = ''
          //   if (this._GridRowData[i].SRNO === oldRapObj.SRNO && this._GridRowData[i].PLANNO === oldRapObj.PLANNO && this._GridRowData[i].PTAG === 'Total') {
          //     this._GridRowData[i].ORAP = (PERMUL / CrtSUM)
          //     this._GridRowData[i].RATE = (AMTSUM / CrtSUM)
          //     this._GridRowData[i].AMT = AMTSUM
          //     this._GridRowData[i].PER = 100 - (this._GridRowData[i].RATE / this._GridRowData[i].ORAP) * 100;
          //     this._GridRowData[i].CARAT = CrtSUM
          //     Total = this._GridRowData[i].CARAT
          //   }
          //   if (this._GridRowData[i].PTAG == "Total") {
          //     PTAGROW.push(this._GridRowData[i])
          //   }
          // }
      //     this.gridApi.refreshCells({ force: true })
          
      //     let newArray = 0
      //     let carat = 0
      //     let orap = 0
      //     let MperValue = 0
      //     let FinalValue = 0
      //     let NewSum = 0

      //     let LastSum = 0
      //     for (let i = 0; i < this._GridRowData.length; i++) {
      //       if (this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].SRNO === parseInt(RapObj.SRNO) && this._GridRowData[i].PTAG === RapObj.PTAG) {
      //         carat =this._GridRowData[i].CARAT
      //         orap = this._GridRowData[i].ORAP
      //         if(parseFloat(this._GridRowData[i].MPER) !== 0 && parseFloat(this._GridRowData[i].MPER) !== 100){
      //           MperValue = this._GridRowData[i].MPER
      //         }else {
      //           MperValue = this._GridRowData[i].PER
      //         }
      //         newArray = (MperValue / 100) * orap
      //         FinalValue = orap - newArray
      //         NewSum = FinalValue * carat
              
      //       }
      //       if (this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].SRNO === parseInt(RapObj.SRNO) && this._GridRowData[i].PTAG == RapObj.PTAG) {
      //         this._GridRowData[i].AMT = NewSum
      //         this._GridRowData[i].RATE = FinalValue
      //         LastSum += NewSum
      //       }else if (this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].SRNO === parseInt(RapObj.SRNO) && this._GridRowData[i].PTAG !== 'Total'){
      //         let carat1 =this._GridRowData[i].CARAT
      //         let orap1 = this._GridRowData[i].ORAP
      //         let MperValue1
      //         if(parseFloat(this._GridRowData[i].MPER) !== 0 && parseFloat(this._GridRowData[i].MPER) !== 100){
      //           MperValue1 = this._GridRowData[i].MPER
      //         }else {
      //           MperValue1 = this._GridRowData[i].PER
      //         }
      //          let newArray1 = (MperValue1 / 100) * orap1
      //         let FinalValue1 = orap1- newArray1
      //         let NewSum1 = FinalValue1 * carat1
      //         LastSum += NewSum1
      //       }
      //     }
          
      //     let totalSum =[]
      //     let FINALAMT=0
      //     for(let i=0;i<this._GridRowData.length;i++){
      //       if (this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].SRNO == parseInt(RapObj.SRNO) && this._GridRowData[i].PTAG === 'Total') {
      //         totalSum.push({NEWAMT:LastSum,data:this._GridRowData[i]})
      //       } else if(this._GridRowData[i].PTAG === 'Total'){
      //         totalSum.push({NEWAMT:this._GridRowData[i].AMT,data:this._GridRowData[i]})
      //       }
      //     }
      //     let LastSum1 =0
      //     for(let i=0; i<this._GridRowData.length;i++){
      //       for(let j=0;j<totalSum.length;j++){
      //         if(totalSum[j].data['PLANNO']===this._GridRowData[i].PLANNO  && this._GridRowData[i].PTAG !== totalSum[j].data['PTAG'] && this._GridRowData[i].PLANNO !== RapObj.PLANNO){
      //           let carat1 = this._GridRowData[i].CARAT
      //         let orap1 = this._GridRowData[i].ORAP
      //         let MperValue1
      //         if(parseFloat(this._GridRowData[i].MPER)!== 0 && parseFloat(this._GridRowData[i].MPER) !== 100){
      //           MperValue1 = this._GridRowData[i].MPER
      //         }else {
      //           MperValue1 = this._GridRowData[i].PER
      //         }
      //         let newArray1 = (MperValue1 / 100) * orap1
      //         let FinalValue1 = orap1 - newArray1
      //         let NewSum1 = FinalValue1 * carat1
      //         LastSum1 += NewSum1
      //         } else if (totalSum[j].data['PLANNO']===this._GridRowData[i].PLANNO && this._GridRowData[i].PLANNO !== RapObj.PLANNO){
      //           totalSum[j].NEWAMT = LastSum1
      //           totalSum[j].data['PLNSEL'] = this._GridRowData[i].PLNSEL
      //           LastSum1 =0
      //         }
      //       }
      //     }

      //     let highestRate = 0;
      // let highAmt = -Infinity
      // if(RapObj.PLNSEL == 'true'){
      //   for(let i=0;i<totalSum.length;i++){
      //     if(totalSum[i].data['PLANNO'] === parseInt(RapObj.PLANNO) && totalSum[i].data['SRNO'] === parseInt(RapObj.SRNO)){
      //       highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
      //       this.PKTPER = highestRate.toFixed(2)
      //       this.FINALAMT = totalSum[i].NEWAMT.toFixed(2)
      //       this.FINALAMT1 = totalSum[i].NEWAMT.toFixed(2)
      //     }
      //   }
      // } else {
      //   for(let i=0;i<totalSum.length;i++){
      //     if(totalSum[i].data['PLNSEL'] === true){
      //       highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
      //       this.PKTPER = highestRate.toFixed(2)
      //       this.FINALAMT = totalSum[i].NEWAMT.toFixed(2)
      //       this.FINALAMT1 = totalSum[i].NEWAMT.toFixed(2)
      //       break
      //     }else{
      //       if (totalSum[i].NEWAMT > highAmt) {
      //         highAmt = totalSum[i].NEWAMT
      //         highestRate = totalSum[i].NEWAMT / totalSum[i].data['CARAT']
      //         this.PKTPER = highestRate.toFixed(2)
      //         this.FINALAMT = highAmt.toFixed(2)
      //         this.FINALAMT1 = highAmt.toFixed(2)
      //       }
      //     }
      //   }
      // }

      //     let NewValue = (this.ADIS/100)*this.FINALAMT
      //     let FinalValue1 = parseFloat(this.FINALAMT) + NewValue
      //     this.FINALAMT = FinalValue1.toFixed(2)

      //     let NewBid = this.FINALAMT / this.PKTWEIGHT
      //     this.FINALBID =NewBid.toFixed(2)

      //     let TotalSumAmt = 0
      // let TotalSumRate = 0
      // for(let i=0;i< this._GridRowData.length;i++){
      //   if(this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].PTAG !== 'Total'){
      //     TotalSumAmt += this._GridRowData[i].AMT
      //     TotalSumRate += this._GridRowData[i].RATE
      //   }
      // } 
      // for(let i=0;i< this._GridRowData.length;i++){
      //   if(this._GridRowData[i].PLANNO === parseInt(RapObj.PLANNO) && this._GridRowData[i].PTAG === 'Total'){
      //     this._GridRowData[i].AMT = TotalSumAmt
      //     this._GridRowData[i].RATE = TotalSumAmt / this._GridRowData[i].CARAT
      //   }
      // }
     
      for(let i=0; i < this.rowData.length ; i++){
        this.rowData[i].GRID_DATA = this.GetRowData(PTAGRO['DETID'], PTAGRO['SRNO'], PTAGRO['COMP_CODE'],PTAGROW)
        break
      }

          // this.gridApi.refreshCells({ force: true })
        }
      } catch (err) {
        console.log(err);
      }
    });

  }
}
