import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import Swal from 'sweetalert2';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { LotMapService } from 'src/app/Service/Transaction/lot-map.service';

@Component({
  selector: 'app-lot-mapping',
  templateUrl: './lot-mapping.component.html',
  styleUrls: ['./lot-mapping.component.css']
})
export class LotMappingComponent implements OnInit {

  
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

  ALLOWINS: boolean = false
	ALLOWDEL: boolean = false
	ALLOWUPD: boolean = false
	PASS: any = ""
	PER = []
	hide = true
	PASSWORD: any = ""

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
				width:65
			},
			{
				headerName: "Company Code",
				field: "COMP_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:133
			},
			{
				headerName: "Tendar No",
				field: "DETID",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:91
			},
			{
				headerName: "Srno",
				field: "SRNO",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:65
			},
			{
				headerName: "Lot",
				field: "L_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:80,
        editable: function (params) {
          return op.EDITABLE;
        },
			},
			{
				headerName: "C Srno",
				field: "C_SRNO",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:65,
        editable: function (params) {
          return op.EDITABLE;
        },
			},
		]

		this.defaultColDef = {
			resizable: true,
			sortable: true,
			filter: false,
		}
   }

  async ngOnInit() {

    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });

    this.PER = await this._FrmOpePer.UserFrmOpePer('LotMappingComponent')
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
        if(!eve.data.COMP_CODE){
          return this.toastr.warning('Company is Blank')
        }
        if(!eve.data.SRNO){
          return this.toastr.warning('Srno is Blank')
        }
        if(!eve.data.DETID){
          return this.toastr.warning('DetId is Blank')
        }
        this.spinner.show()
            this.LotMapMastServ.LotMappingSave({ 
              COMP_CODE:eve.data.COMP_CODE,
              DETID:eve.data.DETID,
              SRNO:eve.data.SRNO,
              L_CODE:eve.data.L_CODE,
              C_SRNO:eve.data.C_SRNO
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
		this.LotMapMastServ.LotMappingFill(Obj).subscribe((FillRes) => {
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

}
