import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { DeptMastService } from 'src/app/Service/Master/dept-mast.service';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-depth-mast',
  templateUrl: './depth-mast.component.html',
  styleUrls: ['./depth-mast.component.css']
})
export class DepthMastComponent implements OnInit {

  decodeHelper = new JwtHelperService()
	decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"))

	@HostListener('window:scroll', ['$event'])
	@HostListener('scroll', ['$event'])
	scrollHandler(event) {
		
	}
	public columnDefs
	public gridApi
	public gridColumnApi
	public defaultColDef

	DEP_CODE: any = ""
	ORD: any = ""

  ALLOWINS: boolean = false
	ALLOWDEL: boolean = false
	ALLOWUPD: boolean = false
	PASS: any = ""
	PER = []
	hide = true
	PASSWORD: any = ""

	agGridWidth: number = 0
	agGridStyles: string = ""

  constructor(
    private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private DepthMastServ: DeptMastService,
		private _FrmOpePer: FrmOpePer,
		private elementRef: ElementRef,
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
							a = a + '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>'
						}
						if (op.ALLOWDEL) {
							a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use  data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
						}
					}
					a = a + "</span>"
					return a
				},
				headerClass: "text-center",
				width:117
			},
			{
				headerName: "Code",
				field: "DEP_CODE",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:85
			},
			{
				headerName: "Order",
				field: "ORD",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:117
			},
		]

		this.defaultColDef = {
			resizable: true,
			sortable: true,
			filter: true,
		}
  }

  async ngOnInit() {
		this.spinner.hide()

		this.PER = await this._FrmOpePer.UserFrmOpePer('DepthMastComponent')
		this.ALLOWDEL = this.PER[0].DEL
		this.ALLOWINS = this.PER[0].INS
		this.ALLOWUPD = this.PER[0].UPD
		this.PASS = this.PER[0].PASS
	}

  onGridReady(params) {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi
		this.LoadGridData()
	}

	CHANGEPASSWORD() {
		if (!this.PASS) return
		this.gridApi.redrawRows();
	}

	Clear() {
		this.DEP_CODE = 0
		this.ORD = 0
	}

  Save() {

		if (this.PASS != this.PASSWORD) {
			this.toastr.warning("Incorrect Password")
			return
		}

		if (!this.ALLOWINS) {
			this.toastr.warning(
				"Insert Permission was not set!!",
				"Contact Administrator!!!!!"
			)
			return
		}

		if(!this.DEP_CODE){
			this.toastr.warning('Enter Valid Code')
			return
		  }
	  
		  if(!this.ORD){
			this.toastr.warning('enter Valid Order')
			return
		  }

		let SaveObj = {
			DEP_CODE: this.DEP_CODE ? this.DEP_CODE : 0,
			ORD: this.ORD ? this.ORD : 0,
		}

		this.spinner.show()
		this.DepthMastServ.DeptMastSave(SaveObj).subscribe((SaveRes) => {
			try {
				if (SaveRes.success == true) {
					this.spinner.hide()
					this.toastr.success("Save successfully.")
					this.LoadGridData()
					this.Clear()
				} else {
					this.spinner.hide()
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: JSON.stringify(SaveRes.data),
					})
				}
			} catch (err) {
				this.spinner.hide()
				this.toastr.error(err)
			}
		})
  }

  LoadGridData() {
		this.spinner.show()
		this.DepthMastServ.DeptMastFill({}).subscribe((FillRes) => {
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

  onGridRowClicked(eve: any) {
		if (eve.event.target !== undefined) {
			let actionType = eve.event.target.getAttribute("data-action-type")
			if (actionType == "DeleteData") {
				Swal.fire({
					title:
						"Are you sure you want to delete Depth code " +
						eve.data.DEP_CODE +
						"?",
					icon: "warning",
					cancelButtonText: "No",
					showCancelButton: true,
					confirmButtonText: "Yes",
				}).then((result) => {
					if (result.value) {
						this.spinner.show()
						this.DepthMastServ.DeptMastDelete({
							DEP_CODE: eve.data.DEP_CODE,
						}).subscribe((ColDelRes) => {
							try {
								if (ColDelRes.success == true) {
									this.spinner.hide()
									this.toastr.success("Delete successfully.")
									this.LoadGridData()
								} else {
									this.spinner.hide()
									this.toastr.warning(
										"Something went to wrong while delete Depth code"
									)
								}
							} catch (err) {
								this.spinner.hide()
								this.toastr.error(err)
							}
						})
					} else {
						return
					}
				})
			} else if (actionType == "EditData") {
				this.DEP_CODE = eve.data.DEP_CODE ? eve.data.DEP_CODE : 0
				this.ORD = eve.data.ORD ? eve.data.ORD : 0
			}
		}
	}

}
