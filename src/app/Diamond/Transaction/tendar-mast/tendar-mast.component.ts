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
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;
  ISACTIVE: boolean = false;

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

  DETID2: any = "";

  EVEDATA:any=[]

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  public columnDefs1;
  public gridApi1;
  public gridColumnApi1;
  public defaultColDef1;

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
    private datepipe: DatePipe
  ) {
    this.Tendar = new FormControl();
    this.TendarNumber = new FormControl();
    this.TendarDate = new FormControl();
    this.SRNOForm = new FormControl();
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
    ];

    this.defaultColDef1 = {
      resizable: true,
      sortable: true,
      filter: true,
    };
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
    // this.LoadGridData1();
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
    if(this.PASS !== this.PASSWORD){
      return;
    }
    this.EVEDATA=eve.data
	  this.HIDEPOPUP=true
	  console.log(eve)
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
    console.log(this.EVEDATA)
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
            text: JSON.stringify(SaveRes.data),
          });
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
      T_DATE: this.T_DATE,
      DETID: this.DETID ? this.DETID : "",
      IUSER: this.decodedTkn.UserId,
      T_NAME:this.T_NAME,
      ISACTIVE:this.ISACTIVE ? this.ISACTIVE :false
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

  onGridRowClicked1(eve: any) {
    if (eve.event.target !== undefined) {
      let actionType = eve.event.target.getAttribute("data-action-type");
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
                  this.toastr.warning(
                    "Something went to wrong while delete SRNO"
                  );
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
                  this.toastr.warning(
                    "Something went to wrong while delete color code"
                  );
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
        this.COMP_CODE = eve.data.COMP_CODE ? eve.data.COMP_CODE : "";
        (this.T_DATE = eve.data.T_DATE ? eve.data.T_DATE : null),
        (this.T_NAME = eve.data.T_NAME ? eve.data.T_NAME : ""),
        (this.DETID = eve.data.DETID ? eve.data.DETID : 0);
        this.ISACTIVE = eve.data.ISACTIVE ? eve.data.ISACTIVE:false
        this.Tendar.disable()
        setTimeout(() => { this.TName.nativeElement.focus() }, 0)
      }
    }
  }
}
