import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { FrmOpePer } from "../../_helpers/frm-ope-per";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { TendatMastService } from "src/app/Service/Transaction/tendat-mast.service";
import { DatePipe } from "@angular/common";
import { FormControl } from "@angular/forms";
import { TendarEstService } from "src/app/Service/Rap/tendar-est.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, startWith } from "rxjs/operators";
declare var $: any;

@Component({
  selector: "app-tendar-mast",
  templateUrl: "./tendar-mast.component.html",
  styleUrls: ["./tendar-mast.component.css"],
})
export class TendarMastComponent implements OnInit {

  @ViewChild("TNumber") TNumber: ElementRef;
  @ViewChild("TName") TName: ElementRef;
  @ViewChild("Srno") Srno: ElementRef;
  @ViewChild("CRATE") CRATE: ElementRef;

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

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
  ADIS: any = ''
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

  allSzs: any[] = []
  filteredSzs: Observable<any[]>;
  szControl: FormControl;
  selectedSz: any = ''


  TendarStyle:string=`width: calc(100% - 150px);height: 22px;font-size: 17px;border:1px solid black;border-bottom:none;`;
  AreaBoxStyle:string=`border:1px solid black;width: 100%;resize: none;height:100%`;
  ContainWidth:string=`width:100%`;
  BlankBoxStyle:string=`border:1px solid black;padding: 10px 0px; width: 100%; text-align: center;border-top:none;height: 100%;`;
  HearderBoxStyle:string=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none`;
  HearderBoxStyle1:string=`border:1px solid black; width:100%; padding: 2px 3px; text-align: center;border-bottom:none;border-top:none`;

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;
  ISACTIVE: boolean = false;
  ISMIX: boolean = false;

  ALLOWINS: boolean = false;
  ALLOWDEL: boolean = false;
  ALLOWUPD: boolean = false;
  PASS: any = "";
  PER = [];
  hide = true;
  PASSWORD: any = "";

  SRNO: any = "";
  CRT: any = "";
  COMMENT: any = "";

  HIDEPOPUP:boolean=false

  ComBO:boolean=false

  DETID2: any = "";

  EVEDATA:any=[]

  PKTRESERVEDIS:boolean=false
  FINAL2DIS:boolean=false
  FINAL1DIS:boolean=false
  DNDIS:boolean=false
  FINALHEDIS:boolean=false
  FINALMEDIS:boolean=false
  USER1DIS:boolean=false
  USER2DIS:boolean=false
  USER3DIS:boolean=false
  RESULT1DIS:boolean=false
  RESULT2DIS:boolean=false
  RESULTMEDIS:boolean=false
  RESULTHEDIS:boolean=false
  FLO1DIS:boolean=false
  FLO2DIS:boolean=false
  FLOMEDIS:boolean=false
  FLOHEDIS:boolean=false
  R1DIS:boolean=false
  R2DIS:boolean=false
  ROUNDC1DIS:boolean=false
  FANCY1DIS:boolean=false
  MacComMEDIS:boolean=false
  MacComHEDIS:boolean=false
  MacCom1DIS:boolean=false
  MacCom2DIS:boolean=false
  MacFLOMEDIS:boolean=false
  MacFLOHEDIS:boolean=false
  MacFLO1DIS:boolean=false
  MacFLO2DIS:boolean=false
  FLOCODEDIS1:boolean=false
  F1DIS:boolean=false
  F2DIS:boolean=false
  FINALAMTDIS:boolean=false
  TENSIONDIS:boolean=false
  PKTSRWDIS:boolean=false
  TENDARDIS:boolean=false

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  public columnDefs1;
  public gridApi1;
  public rowSelection
  public gridColumnApi1;
  public defaultColDef1;
  public gridOptions1;

  agGridWidth: number = 0;
  agGridStyles: string = "";

  agGridWidth1: number = 0;
  agGridStyles1: string = "";

  Tendar: FormControl;
  TendarNumber: FormControl;
  TendarDate: FormControl;
  SRNOForm: FormControl;

  constructor(
    private EncrDecrServ: EncrDecrService,
    private _FrmOpePer: FrmOpePer,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private TendarEstServ: TendarEstService,
    private http: HttpClient,
    private datepipe: DatePipe
  ) {
    this.Tendar = new FormControl();
    this.TendarNumber = new FormControl();
    this.TendarDate = new FormControl();
    this.SRNOForm = new FormControl();
    this.szControl = new FormControl();
    this.ColControl = new FormControl();
    this.MacColControl = new FormControl();
    this.FloControl = new FormControl();
    this.MacFloControl = new FormControl();
    this.MacComControl = new FormControl();
    this.TensionControl = new FormControl();
    let op = this;
    this.columnDefs = [
      {
        headerName: "Action",
        cellStyle: { "text-align": "center" },
        cellRenderer: function (params) {
          let a = '<span class="det_val">';
          if (op.PASS == op.PASSWORD) {
            if (op.ALLOWUPD) {
              // a = a + '<i class="icon-edit grid-icon" data-action-type="EditData" style="cursor: pointer;margin-right: 5px;" ></i>';
              a =
                a +
                '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>';
            }
            if (op.ALLOWDEL) {
              // a = a + '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i>';
              a =
                a +
                '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>';
            }
          }
          a = a + "</span>";
          return a;
        },
        headerClass: "text-center",
        width: 96,
      },
      {
        headerName: "Tendar Number",
        field: "DETID",
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        width: 113,
      },
      {
        headerName: "Tendar Name",
        field: "T_NAME",
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        width: 110,
      },
      {
        headerName: "Tendar Date",
        field: "T_DATE",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 150,
        cellRenderer: this.DateFormat.bind(this),
      },
      {
        headerName: "Active",
        field: "ISACTIVE",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 65,
        cellRenderer: (params)=>{
          if (params.data.ISACTIVE == true) {
            return '<input type="checkbox" data-action-type="COVER" checked  disabled>';
          } else {
            return '<input type="checkbox" data-action-type="COVER" disabled>';
          }
        }
      },
      {
        headerName: "Mix",
        field: "ISMIX",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 65,
        cellRenderer: (params)=>{
          if (params.data.ISMIX == true) {
            return '<input type="checkbox" data-action-type="MIX" checked  disabled>';
          } else {
            return '<input type="checkbox" data-action-type="MIX" disabled>';
          }
        }
      },
    ];
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
    };

    this.columnDefs1 = [
      {
        headerName: "Action",
        cellStyle: { "text-align": "center" },
        cellRenderer: function (params) {
          let a = '<span class="det_val">';
          if (op.PASS == op.PASSWORD) {
            if (op.ALLOWUPD) {
              a =
                a +
                '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>';
            }
            if (op.ALLOWDEL) {
              a =
                a +
                '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>';
            }
          }
          a = a + "</span>";
          return a;
        },
        headerClass: "text-center",
        width: 96,
      },
      {
        headerName: "Srno",
        field: "SRNO",
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        width: 90,
      },
      {
        headerName: "Carat",
        field: "I_CARAT",
        cellStyle: { "text-align": "right" },
        headerClass: "text-center",
        width: 90,
      },
      {
        headerName: "Comment",
        field: "COMMENT",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        width: 150,
      },
      {
        headerName: "Video",
        field: "VIDEO",
        cellStyle: { "text-align": "center" },
        headerClass: "text-center",
        cellRenderer: (params) => {
          if (params.node.rowPinned != 'bottom') {
            if (params.data.VIDEO == true) {
            return '<input type="checkbox" data-action-type="VIDEO"  checked (keydown.space)="checked">';
            }else {
              return '<input type="checkbox" data-action-type="VIDEO" (keydown.space)="checked">';
            }
          }
        },
        width: 150,
      },
    ];

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
      context: { thisComponent: this },
    }
  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }

  async ngOnInit() {
    this.Tendar.disable()
    this.TendarNumber.disable()
    this.TendarDate.disable()
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
    this.spinner.hide();

    this.PER = await this._FrmOpePer.UserFrmOpePer("TendarMastComponent");
    this.ALLOWDEL = this.PER[0].DEL;
    this.ALLOWINS = this.PER[0].INS;
    this.ALLOWUPD = this.PER[0].UPD;
    this.PASS = this.PER[0].PASS;

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

    let Com_arr = this.decodedMast[20].map((item) => {
      return { code: item.MCOM_NAME, name:item.MCOM_NAME };
    });

    this.MacComm = [[{ code: 0 ,name: '---'  }, ...Com_arr]]

    let Tension_arr = this.decodedMast[16].map((item) => {
      return { code: item.T_CODE, name: item.T_NAME };
    });
    this.TenArr = [[{ code: 0 ,name: '---' }, ...Tension_arr]]

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
    return this.MacComm[0].filter(sz => sz.name);
  }
  private _Tensionfilter(value: string): any[] {
    return this.TenArr[0].filter(sz => sz.name);
  }

  GETNAME() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.COMP_NAME = this.DEPTArr.filter(
          (x) => x.code == this.COMP_CODE
        )[0].name;
      } else {
        this.COMP_CODE = "";
      }
    } else {
      this.COMP_NAME = "";
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData();
  }

  onGridReady1(params) {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
  }

  UploadDirect(){
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileInputChange(event: Event){
    let SubData =[]
    this.gridApi1.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });
    let selected =[]
    for(let i=0;i<SubData.length;i++){
      if(SubData[i].VIDEO == true){
        selected.push(SubData[i])
      }
    }
    console.log(selected)

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files;

    console.log(selectedFile)
    let NewName
    for(let i=0;i<selectedFile.length;i++){
      for(let j=0;j<selected.length;j++){
        NewName = selected[j].COMP_CODE + '-' + selected[j].DETID + '-' + selected[j].SRNO
        let name = selectedFile[i].name.split('.')[0]
        if(NewName == name){
          let op = this

    if (selectedFile) {
      const file = selectedFile[i]
      const blob = new Blob([file], { type: "video/mp4" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.addEventListener("load", () => {
        let base64String = fileReader.result;
        let FileObj = {
          FileName: `${selected[i].COMP_CODE}-${selected[i].DETID}-${selected[i].SRNO}`,
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
              DETID: selected[i].DETID,
              SRNO: selected[i].SRNO,
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
      }
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

  CHANGEPASSWORD() {
    if (!this.PASS) return;
    this.gridApi.redrawRows();
    if(this.PASS === this.PASSWORD){
      this.Tendar.enable()
      this.TendarNumber.enable()
      this.TendarDate.enable()
    }else{
      this.Tendar.disable()
      this.TendarNumber.disable()
      this.TendarDate.disable()
    }
  }

  Clear() {
    this.DETID = 0;
    this.T_DATE = null;
    this.T_NAME='';
    this.ISACTIVE =false
    this.Tendar.enable()
  }

  ClearPop() {
    this.CRT = 0.00;
    this.SRNO = 0;
    this.COMMENT = '';
    this.SRNOForm.enable()
  }

  closeChild(){
    this.HIDEPOPUP = false
    this.ClearPop()
  }

  BlurSrno(){
    let SaveObj = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID2,
      SRNO:this.SRNO
    };

    this.spinner.show();
    this.TendarMastser.ChkTendarPktEnt(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          if(SaveRes.data[''] !== 'TRUE'){
            setTimeout(() => { this.Srno.nativeElement.focus() }, 0)
            this.toastr.warning(SaveRes.data[''])
          }
        }else{
          this.spinner.hide()
          this.toastr.warning(SaveRes.data)
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    })
  }

  GetSrno(eve){
    this.DETID2 = eve.data.DETID
    let SaveObj = {
      COMP_CODE: eve.data.COMP_CODE,
      DETID: eve.data.DETID,
    };

    this.spinner.show();
    this.TendarMastser.GetTendarPktNumber(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          this.SRNO = SaveRes.data[0]['']
        }else{
          this.spinner.hide()
          this.toastr.warning(SaveRes.data)
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    })
  }

  onCellDoubleClicked(eve){
    if(eve.colDef.headerName == 'Action' || eve.colDef.field == "ISACTIVE"){
      return;
    }
    if(this.PASS !== this.PASSWORD){
      return;
    }
    this.EVEDATA=eve.data
	  this.HIDEPOPUP=true
    this.ClearPop()
    this.LoadGridData1();
    }
    async LoadGridData1(){
      let Fillobj={
        COMP_CODE:this.EVEDATA.COMP_CODE,
        DETID:this.EVEDATA.DETID,
        T_DATE:this.EVEDATA.T_DATE,
      }
     await this.TendarMastser.TendarPktEntFill(Fillobj).subscribe(
        (FillRes) => {
          try {
          if (FillRes.success == true) {
            this.spinner.hide();
            setTimeout(() => {
            this.gridApi1.setRowData(FillRes.data);
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
            this.agGridWidth1 = 10 + this.agGridWidth1;
            this.agGridStyles1 = `width: ${this.agGridWidth1}px; height: 70vh`;
          },1)
          } else {
            this.spinner.hide();
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(FillRes.data),
            });
          }
          } catch (error) {
            console.log(error)
          this.spinner.hide();
          this.toastr.error(error);
          }
        })
  }

  BlurTendar(){
    let SaveObj = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.DETID,
    };

    this.spinner.show();
    this.TendarMastser.ChkTendarNumber(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          if(SaveRes.data[''] !== 'TRUE'){
            setTimeout(() => { this.TNumber.nativeElement.focus() }, 0)
            this.toastr.warning(SaveRes.data[''])
          }
        }else{
          this.spinner.hide()
          this.toastr.warning(SaveRes.data)
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    })
  }

  GetTendarNumder(){
    let SaveObj = {
      COMP_CODE: this.COMP_CODE,
    };

    this.spinner.show();
    this.TendarMastser.GetTendarNumber(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          this.DETID = SaveRes.data[0]['']
        }else{
          this.spinner.hide()
          this.toastr.warning(SaveRes.data)
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    })
  }

  SavePop() {
    if (!this.ALLOWINS) {
      this.toastr.warning(
        "Insert Permission was not set!!",
        "Contact Administrator!!!!!"
      );
      return;
    }

    if (!this.CRT) {
      this.toastr.warning("Enter Carat");
      return;
    }

    if (!this.SRNO) {
      this.toastr.warning("Enter Valid Srno");
      return;
    }

    let SaveObj = {
      COMP_CODE: this.EVEDATA.COMP_CODE,
      DETID: this.EVEDATA.DETID,
      T_DATE:this.EVEDATA.T_DATE,
      SRNO:this.SRNO,
      I_CARAT:this.CRT,
      COMMENT:this.COMMENT,
      IUSER: this.decodedTkn.UserId,
    };

    this.spinner.show();
    this.TendarMastser.TendarPktEntSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save successfully.");
          this.SRNOForm.enable()
          this.LoadGridData1();
          
          let SubData =[]
          this.gridApi1.forEachNode(function (rowNode, index) {
            SubData.push(rowNode.data);
          });
          this.SRNO +=1
          this.CRT =0
          this.COMMENT = ''

          for(let i =0;i<SubData.length;i++){
            if(SubData[i].SRNO === this.SRNO){
              this.CRT = SubData[i].I_CARAT
              this.COMMENT = SubData[i].COMMENT
            }
          }
          setTimeout(() => { this.CRATE.nativeElement.focus() }, 0)
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(SaveRes.data.originalError.info.message),
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showDenyButton: true,
            focusDeny: true,
            showConfirmButton: false,
            returnFocus: false,
          }).then((result) => {
            
          })
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    });
  }


  Save() {
    if (this.PASS != this.PASSWORD) {
      this.toastr.warning("Incorrect Password");
      return;
    }

    if (!this.ALLOWINS) {
      this.toastr.warning(
        "Insert Permission was not set!!",
        "Contact Administrator!!!!!"
      );
      return;
    }

    if (!this.COMP_CODE) {
      this.toastr.warning("Enter Valid Code");
      return;
    }

    if (!this.DETID) {
      this.toastr.warning("Enter Valid Tendar Number");
      return;
    }

    if (!this.T_DATE) {
      this.toastr.warning("enter Valid DATE");
      return;
    }
    if (!this.T_NAME) {
      this.toastr.warning("enter Valid Tendar Name");
      return;
    }

    let SaveObj = {
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : 0,
      T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE,'yyyy-MM-dd'):null,
      DETID: this.DETID ? this.DETID : "",
      IUSER: this.decodedTkn.UserId,
      T_NAME:this.T_NAME,
      ISACTIVE:this.ISACTIVE ? this.ISACTIVE :false,
      ISMIX:this.ISMIX ? this.ISMIX :false
    };

    this.spinner.show();
    this.TendarMastser.TendarMastSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save successfully.");
          this.Tendar.enable()
          this.LoadGridData();
          this.DETID +=1
          let SubData =[]
          this.gridApi.forEachNode(function (rowNode, index) {
            SubData.push(rowNode.data);
          });

          this.T_DATE = null
          this.ISACTIVE = false
          this.T_NAME = ''

          for(let i =0;i<SubData.length;i++){
            if(SubData[i].DETID === this.DETID){
              this.T_DATE = SubData[i].T_DATE
              this.ISACTIVE = SubData[i].ISACTIVE
              this.T_NAME = SubData[i].T_NAME
            }
          }
          setTimeout(() => { this.TName.nativeElement.focus() }, 0)
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

  COMBOSAVE(){

    let saveOBJ1 = {
      COMP_CODE: this.COMP_CODE,
      DETID: this.EVEDATA.DETID,
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
    console.log(saveOBJ1)
    this.TendarEstServ.TendarResSave(saveOBJ1).subscribe((SaveRes) => {
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
          return;
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
        return;
      }
    });
  }

  COMBOCLOSE(){
    this.ComBO = false

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
    this.FINALAMT = ''

    this.PKTRESERVEDIS = false
    this.FINAL2DIS = false
    this.FINAL1DIS = false
    this.DNDIS = false
    this.FINALHEDIS = false
    this.FINALMEDIS = false
    this.USER1DIS = false
    this.USER2DIS = false
    this.USER3DIS = false
    this.RESULT1DIS = false
    this.RESULT2DIS = false
    this.RESULTMEDIS = false
    this.RESULTHEDIS = false
    this.FLO1DIS = false
    this.FLO2DIS = false
    this.FLOMEDIS = false
    this.FLOHEDIS = false
    this.R1DIS = false
    this.R2DIS = false
    this.ROUNDC1DIS = false
    this.FANCY1DIS = false
    this.MacComMEDIS = false
    this.MacComHEDIS = false
    this.MacCom1DIS = false
    this.MacCom2DIS = false
    this.MacFLOMEDIS = false
    this.MacFLOHEDIS = false
    this.MacFLO1DIS = false
    this.MacFLO2DIS = false
    this.FLOCODEDIS1 = false
    this.F1DIS = false
    this.F2DIS = false
    this.FINALAMTDIS = false
    this.TENSIONDIS = false
    this.PKTSRWDIS = false
    this.TENDARDIS = false

  }

  onCellDoubleClicked1(eve){
    console.log(eve)
    this.ComBO = true

    if(eve.data.TEN_NAME){
      this.TENDAR_NAME = eve.data.TEN_NAME
      this.TENDARDIS = true
    }
    if(eve.data.T_CODE){
      this.TENSION = eve.data.T_CODE
      this.TENSIONDIS = true
    }
    this.PKTSRNO = eve.data.SRNO
    if(eve.data.PUSER){
      this.PKTNAME = eve.data.PUSER
    }else{
      this.PKTNAME = this.decodedTkn.UserId
    }
    this.PKTWEIGHT = eve.data.I_CARAT
    if(eve.data.RESRVE){
      this.PKTRESERVE = eve.data.RESRVE
      this.PKTRESERVEDIS= true
    }
    this.PKTPER = eve.data.PERCTS
    this.PKTPER = eve.data.PERCTS
    if(eve.data.SRW){
      this.PKTSRW = eve.data.SRW
      this.PKTSRWDIS = true
    }
    if(eve.data.FFLAT1){
      this.FINAL1 = eve.data.FFLAT1
      this.FINAL1DIS = true
    }
    if(eve.data.FFLAT2){
      this.FINAL2 = eve.data.FFLAT2
      this.FINAL2DIS= true
    }
    if(eve.data.FMED){
      this.FINALME = eve.data.FMED
      this.FINALMEDIS = true
    }
    if(eve.data.FHIGH){
      this.FINALHE = eve.data.FHIGH
      this.FINALHEDIS = true
    }
    if(eve.data.DNC_CODE){
      this.DN = eve.data.DNC_CODE
      this.DNDIS = true
    }
    if(eve.data.I1C_CODE){
      this.USER1 = eve.data.I1C_CODE
      this.USER1DIS = true
    }
    if(eve.data.I2C_CODE){
      this.USER2 = eve.data.I2C_CODE
      this.USER2DIS = true
    }
    if(eve.data.I3C_CODE){
      this.USER3 = eve.data.I3C_CODE
      this.USER3DIS = true
    }
    if(eve.data.RFLAT1){
      this.RESULT1 = eve.data.RFLAT1
      this.RESULT1DIS = true
    }
    if(eve.data.RFLAT2){
      this.RESULT2 = eve.data.RFLAT2
      this.RESULT2DIS = true
    }
    if(eve.data.RMED){
      this.RESULTME = eve.data.RMED
      this.RESULTMEDIS = true
    }
    if(eve.data.RHIGH){
      this.RESULTHE = eve.data.RHIGH
      this.RESULTHEDIS = true
    }
    if(eve.data.FLNFLAT1){
      this.FLO1 = eve.data.FLNFLAT1
      this.FLO1DIS = true
    }
    if(eve.data.FLNFLAT2){
      this.FLO2 = eve.data.FLNFLAT2
      this.FLO2DIS = true
    }
    if(eve.data.FLNMED){
      this.FLOME = eve.data.FLNMED
      this.FLOMEDIS = true
    }
    if(eve.data.FLNHIGH){
      this.FLOHE = eve.data.FLNHIGH
      this.FLOHEDIS = true
    }
    if(eve.data.MFLFLAT1){
      this.MacFLO1 = eve.data.MFLFLAT1
      this.MacFLO1DIS = true
    }
    if(eve.data.MFLFLAT2){
      this.MacFLO2 = eve.data.MFLFLAT2
      this.MacFLO2DIS = true
    }
    if(eve.data.MFLMED){
      this.MacFLOME = eve.data.MFLMED
      this.MacFLOMEDIS = true
    }
    if(eve.data.MFLHIGH){
      this.MacFLOHE = eve.data.MFLHIGH
      this.MacFLOHEDIS = true
    }
    if(eve.data.CFLAT1){
      this.MacCom1 = eve.data.CFLAT1
      this.MacCom1DIS = true
    }
    if(eve.data.CFLAT2){
      this.MacCom2 = eve.data.CFLAT2
      this.MacCom2DIS = true
    }
    if(eve.data.CMED){
      this.MacComME = eve.data.CMED
      this.MacComMEDIS = true
    }
    if(eve.data.CHIGH){
      this.MacComHE = eve.data.CHIGH
      this.MacComHEDIS = true
    }
    if(eve.data.RC_CODE){
      this.ROUNDC1 = eve.data.RC_CODE
      this.ROUNDC1DIS = true
    }
    if(eve.data.R1C_CODE){
      this.R1 = eve.data.R1C_CODE
      this.R1DIS = true
    }
    if(eve.data.R2C_CODE){
      this.R2 = eve.data.R2C_CODE
      this.R2DIS = true
    }
    if(eve.data.FC_CODE){
      this.FANCY1 = eve.data.FC_CODE
      this.FANCY1DIS = true
    }
    if(eve.data.F1C_CODE){
      this.F1 = eve.data.F1C_CODE
      this.F1DIS = true
    }
    if(eve.data.F2C_CODE){
      this.F2 = eve.data.F2C_CODE
      this.F2DIS = true
    }
    if(eve.data.FAMT){
      this.FINALAMT = eve.data.FAMT
      this.FINALAMTDIS = true
    }
    if(eve.data.FAMT){
      this.FINALAMT1 = eve.data.FAMT
      this.FINALAMT1 = true
    }
    if(eve.data.LS){
      this.LS = eve.data.LS
      
    }
    if(eve.data.FL_CODE){
      this.FLOCODE = eve.data.FL_CODE
      this.FLOCODEDIS = true
    }
    this.ADIS = eve.data.ADIS
    this.FINALBID = eve.data.FBID
  }

  onGridRowClicked1(eve: any) {
    if (eve.event.target !== undefined) {
      let dataObj = eve.data;
      let actionType = eve.event.target.getAttribute("data-action-type");
      if(actionType == 'VIDEO'){
        dataObj.VIDEO = !dataObj.VIDEO;
        eve.node.setData(dataObj)
        eve.api.refreshCells({ force: true })
      }
      if (actionType == "DeleteData") {
        Swal.fire({
          title:
            "Are you sure you want to srno " + eve.data.SRNO + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            this.spinner.show();
            this.TendarMastser.TendarPktEntDelete({
              COMP_CODE: eve.data.COMP_CODE,
              DETID: eve.data.DETID,
              T_DATE: eve.data.T_DATE,
              SRNO:eve.data.SRNO
            }).subscribe((ColDelRes) => {
              try {
                if (ColDelRes.success == true) {
                  this.spinner.hide();
                  this.toastr.success("Delete successfully.");
                  this.LoadGridData1();
                } else {
                  this.spinner.hide();
                   Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(ColDelRes.data.originalError.info.message),
                    allowEnterKey: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showDenyButton: true,
                    focusDeny: true,
                    showConfirmButton: false,
                    returnFocus: false,
                  }).then((result) => {
                    
                  })
                }
              } catch (err) {
                this.spinner.hide();
                this.toastr.error(err);
              }
            });
          } else {
            return;
          }
        });
      } else if (actionType == "EditData") {
        this.spinner.hide()
        this.SRNO = eve.data.SRNO ? eve.data.SRNO : "";
        this.CRT = eve.data.I_CARAT ? eve.data.I_CARAT : 0.000,
        this.COMMENT = eve.data.COMMENT ? eve.data.COMMENT : '';
        this.SRNOForm.disable()
        setTimeout(() => { this.CRATE.nativeElement.focus() }, 0)
      }
    }
  }

  LoadGridData() {
    this.spinner.show();
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
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
              this.gridColumnApi.columnController.displayedColumns.map(
                (item) => item.actualWidth
              );
            this.agGridWidth = widthsArray.reduce(function (
              previousValue,
              currentValue
            ) {
              return previousValue + currentValue;
            });
            this.agGridWidth = 200 + this.agGridWidth;
            this.agGridStyles = `width: ${this.agGridWidth}px; height: 70vh`;
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

  onGridRowClicked(eve: any) {
    if (eve.event.target !== undefined) {
      let actionType = eve.event.target.getAttribute("data-action-type");
      if (actionType == "DeleteData") {
        Swal.fire({
          title:
            "Are you sure you want to delete DETID " + eve.data.DETID + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            this.spinner.show();
            this.TendarMastser.TendarMastDelete({
              COMP_CODE: eve.data.COMP_CODE,
              DETID: eve.data.DETID,
            }).subscribe((ColDelRes) => {
              try {
                if (ColDelRes.success == true) {
                  this.spinner.hide();
                  this.toastr.success("Delete successfully.");
                  this.LoadGridData();
                } else {
                  this.spinner.hide();
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(ColDelRes.data.originalError.info.message),
                    allowEnterKey: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showDenyButton: true,
                    focusDeny: true,
                    showConfirmButton: false,
                    returnFocus: false,
                  }).then((result) => {
                    
                  })
                }
              } catch (err) {
                this.spinner.hide();
                this.toastr.error(err);
              }
            });
          } else {
            return;
          }
        });
      } else if (actionType == "EditData") {
        this.spinner.hide()
        this.COMP_CODE = eve.data.COMP_CODE ? eve.data.COMP_CODE : "";
        (this.T_DATE = eve.data.T_DATE ? eve.data.T_DATE : null),
        (this.T_NAME = eve.data.T_NAME ? eve.data.T_NAME : ""),
        (this.DETID = eve.data.DETID ? eve.data.DETID : 0);
        this.ISACTIVE = eve.data.ISACTIVE ? eve.data.ISACTIVE:false
        this.ISMIX = eve.data.ISMIX ? eve.data.ISMIX:false
        this.Tendar.disable()
        setTimeout(() => { this.TName.nativeElement.focus() }, 0)
      }
    }
  }

  nextenter(element: any, id: any) {
    if (element) {
      setTimeout(() => {
        this[element].closePanel();
      }, 0);
    }
    $("#" + id).focus();
    $("#" + id).select();
    // }
  }
}
