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
  AreaBoxStyle:string=`border:1px solid black;width: 100%;height: 100px;resize: none;`;
  ContainWidth:string=`border:1px solid black;width: calc(100% - 10px);height: 59px;border-top:none`;
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

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private ViewServ :ViewService,
    private ViewParaMastServ : ViewParaMastService
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
                tempData[j].editable = this.decodedTkn.U_CAT === 'P' ? true : false
              }
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
            this.spinner.hide();
         
            this.populateRowData()
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

  populateRowData() {
    // this.GRIDROw = []
    // for (let item of this.rowData) {
    //   const newData = this.GetRowData(item.DETID, item.SRNO, item.COMP_CODE,this.NewRowData);
    //   this.GRIDROw.push(...newData);
    // }
  }

  GetRowData(DetId,Srno,Comp,data){
    return data.filter(row =>row.COMP_CODE === Comp && row.SRNO === Srno && row.DETID === DetId);
  }

}
