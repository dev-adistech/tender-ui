import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { LotMapService } from 'src/app/Service/Transaction/lot-map.service';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { ExpiryDateService } from 'src/app/Service/Transaction/expiry-date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expiry-date',
  templateUrl: './expiry-date.component.html',
  styleUrls: ['./expiry-date.component.css']
})
export class ExpiryDateComponent implements OnInit {

  decodeHelper = new JwtHelperService()
	decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"))
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

	@HostListener('window:scroll', ['$event'])
	@HostListener('scroll', ['$event'])
	scrollHandler(event) {
	}
	public columnDefs
	public gridApi
	public gridColumnApi
	public defaultColDef
  public gridOptions

  ALLOWINS: boolean = false
	ALLOWDEL: boolean = false
	ALLOWUPD: boolean = false
	PASS: any = ""
	PER = []
	hide = true
	PASSWORD: any = ""

  APER:any=''

	agGridWidth: number = 0
	agGridStyles: string = ""

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;
  EDITABLE: boolean = false
  
  constructor(
    private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private _FrmOpePer: FrmOpePer,
		private elementRef: ElementRef,
    private EncrDecrServ: EncrDecrService,
    private TendarMastser: TendatMastService,
    private LotMapMastServ: LotMapService,
    private ExpDateServ: ExpiryDateService,
    private datepipe: DatePipe
  ) { 
    let op = this
		this.columnDefs = [
			{
				headerName: "Action",
				cellStyle: { "text-align": "center" },
				cellRenderer: function (params) {
					let a = '<span class="det_val">'
					if (op.PASS == op.PASSWORD) {
						if (op.ALLOWUPD) {
							a = a + '<svg class="grid-icon icon-save" data-action-type="SaveData" > <use  data-action-type="SaveData" xlink: href = "assets/symbol-defs.svg#icon-save" > </use> </svg>'
						}
					}
					a = a + "</span>"
					return a
				},
				headerClass: "text-center",
				width:47
			},
			{
				headerName: "Company Code",
				field: "COMP_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:94
			},
			{
				headerName: "Tendar No",
				field: "DETID",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:66
			},
      {
				headerName: "Date",
				field: "T_DATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:94,
        cellRenderer: this.DateFormat.bind(this),
			},
			{
				headerName: "Date Time",
				field: "TEXP_DATETIME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:162,
        cellRenderer: this.DateTimeFormat.bind(this),
        editable: function (params) {
          return op.EDITABLE;
        },
			},
		]

		this.defaultColDef = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }
  }

  async ngOnInit() {

    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });

    this.PER = await this._FrmOpePer.UserFrmOpePer('ExpiryDateComponent')
		this.ALLOWDEL = this.PER[0].DEL
		this.ALLOWINS = this.PER[0].INS
		this.ALLOWUPD = this.PER[0].UPD
		this.PASS = this.PER[0].PASS
  }

  CHANGEPASSWORD() {
		if (!this.PASS) return
    if (this.PASSWORD == this.PASS) {
      this.EDITABLE = true
      this.gridApi.redrawRows();
    }else{
      this.EDITABLE = false
      this.gridApi.redrawRows();
    }
		this.gridApi.redrawRows();
	}

  onGridReady(params) {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi
	}

  onGridRowClicked(eve){
    if (eve.event.target !== undefined) {
      let actionType = eve.event.target.getAttribute("data-action-type");
      
      if (actionType == 'SaveData') {
        this.spinner.show()
            this.ExpDateServ.TendarExpDateSave({ 
              COMP_CODE:eve.data.COMP_CODE,
              DETID:eve.data.DETID,
              T_DATE:eve.data.T_DATE,
              TEXP_DATETIME:eve.data.TEXP_DATETIME ? eve.data.TEXP_DATETIME:null,
             }).subscribe((DelRes) => {
              try {
                if (DelRes.success == true) {
                  this.spinner.hide()
                  this.toastr.success('Save successfully.')
                } else {
                  this.spinner.hide()
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: JSON.stringify(DelRes.data),
                  })
                }
              } catch (err) {
                this.spinner.hide()
                this.toastr.error(err)
              }
            })
      }
    }
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

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }

  // DateTimeFormat(params) {
  //   if (params.value) {
  //     return this.datepipe.transform(params.value, "dd-MM-yyyy hh:mm");
  //   } else {
  //     return "";
  //   }
  // }
  
  DateTimeFormat(params) {
    if (params.value) {
      if(params.value.includes('T')){
      let Data = params.value.split('T')[0]
      let Time = params.value.split('T')[1].slice(0,5)

      return `${Data}-${Time}`
      }else{
        return params.value
      }
      // return this.datepipe.transform(params.value, "dd-MM-yyyy hh:mm a", 'UTC+0');
    } else {
      return "";
    }
  }

  LoadGridData() {
    this.spinner.show()
    if(!this.COMP_CODE){
      return
    }
    if(!this.DETID){
      return
    }
    let Obj={
      COMP_CODE:this.COMP_CODE ? this.COMP_CODE:'',
      DETID:this.DETID ? this.DETID:0
    }
		this.ExpDateServ.TendarExpDateFill(Obj).subscribe((FillRes) => {
			try {
				if (FillRes.success == true) {
					this.spinner.hide()
					this.gridApi.setRowData(FillRes.data)
					const agBodyViewport: HTMLElement =
						this.elementRef.nativeElement.querySelector(".ag-body-viewport")
					const agBodyHorizontalViewport: HTMLElement =
						this.elementRef.nativeElement.querySelector(
							".ag-body-horizontal-scroll-viewport"
						)
					if (agBodyViewport) {
						const psV = new PerfectScrollbar(agBodyViewport)
						psV.update()
					}
					if (agBodyHorizontalViewport) {
						const psH = new PerfectScrollbar(agBodyHorizontalViewport)
						psH.update()
					}
					if (agBodyViewport) {
						const ps = new PerfectScrollbar(agBodyViewport)
						const container = document.querySelector(".ag-body-viewport")
						ps.update()
					}
					const widthsArray = this.gridColumnApi.columnController.displayedColumns.map((item) => item.actualWidth)
					this.agGridWidth = widthsArray.reduce(function (previousValue, currentValue) {
						return previousValue + currentValue;
					});
					this.agGridWidth = 10 + this.agGridWidth
					this.agGridStyles = `width: ${this.agGridWidth}px; height: 70vh`
				} else {
					this.spinner.hide()
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: JSON.stringify(FillRes.data),
					})
				}
			} catch (error) {
				this.spinner.hide()
				this.toastr.error(error)
			}
		})
  }

  getContextMenuItems(params) {
    let inputText = '';
    if (params.context.thisComponent.ISFILTER == true) {
    const startNumber = 1; // Starting number
    const endNumber = 6;   // Ending number

    const numbers = Array.from({ length: endNumber - startNumber + 1 }, (_, index) => (index + startNumber).toString());
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck" value="${numbers.join('-')}" checked>`;
    } else {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck">`;
    }
    var result = [
      {
        // custom item
        name: inputText,
        action: () => {
          params.context.thisComponent.ISFILTER = !params.context.thisComponent.ISFILTER
          var tempColumnDefs = params.context.thisComponent.gridApi.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.suppressMenu = !grpHeader.suppressMenu
          })
          params.context.thisComponent.columnDefs = tempColumnDefs
        }
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export"
    ];
    return result;
  }

}
