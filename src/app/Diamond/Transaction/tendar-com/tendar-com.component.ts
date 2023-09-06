import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FrmMastService } from 'src/app/Service/Config/frm-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { TendarComService } from 'src/app/Service/Transaction/tendar-com.service';

@Component({
  selector: 'app-tendar-com',
  templateUrl: './tendar-com.component.html',
  styleUrls: ['./tendar-com.component.css']
})
export class TendarComComponent implements OnInit {

  COMP_CODE:any=''
  COMP_NAME:any=''

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  agGridWidth: number = 0
	agGridStyles: string = ""

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []
  hide = true
  PASSWORD: any = ''

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private FrmMastServ: FrmMastService,
    private _FrmOpePer: FrmOpePer,
    private elementRef: ElementRef,
    private TendarComServ:TendarComService
  ) { 
    let op = this
    this.columnDefs = [
      {
        headerName: 'Action',
        cellStyle: { 'text-align': 'center' },
        cellRenderer: function (params) {
          let a = '<span class="det_val">';
          if (op.PASS == op.PASSWORD) {
            if (op.ALLOWUPD) {
              a = a + '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData"  xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>'
            }
            if (op.ALLOWDEL) {
              a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
            }
          }
          a = a + '</span>';
          return a;
        },
        headerClass: "text-center",
        width:117
      },
      {
        headerName: 'Company Code',
        field: 'COMP_CODE',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 100
      },
      {
        headerName: 'Company Name',
        field: 'COMP_NAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 200,
      },
    ]
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    }
  }

  async ngOnInit() {
    this.spinner.hide()

    this.PER = await this._FrmOpePer.UserFrmOpePer('TendarComComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  CHANGEPASSWORD() {
    if (!this.PASS) return;
    this.gridApi.redrawRows();
  }

  LoadGridData() {
    this.TendarComServ.TendarComMastFill({}).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide()
          this.gridApi.setRowData(FillRes.data);
          const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          const agBodyHorizontalViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-horizontal-scroll-viewport");

          if (agBodyViewport) {
            const psV = new PerfectScrollbar(agBodyViewport);
            psV.update();
          }
          if (agBodyHorizontalViewport) {
            const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            psH.update();
          }
          const widthsArray = this.gridColumnApi.columnController.displayedColumns.map((item) => item.actualWidth)
					this.agGridWidth = widthsArray.reduce(function (previousValue, currentValue) {
						return previousValue + currentValue;
					});
					this.agGridWidth = 10 + this.agGridWidth
					this.agGridStyles = `width: ${this.agGridWidth}px; height: 70vh`
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(FillRes.data),
          })
        }
      } catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

  Clear() {
    this.COMP_CODE=''
    this.COMP_NAME=''
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

		if(!this.COMP_CODE){
			this.toastr.warning('Enter Valid Code')
			return
		  }
	  
		  if(!this.COMP_NAME){
			this.toastr.warning('Enter Valid Name')
			return
		  }

		let SaveObj = {
			COMP_CODE: this.COMP_CODE ? this.COMP_CODE : '',
			COMP_NAME: this.COMP_NAME ? this.COMP_NAME:'',
		}

		this.spinner.show()
		this.TendarComServ.TendarComMastSave(SaveObj).subscribe((SaveRes) => {
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

  onGridRowClicked(eve: any) {
		if (eve.event.target !== undefined) {
			let actionType = eve.event.target.getAttribute("data-action-type")
			if (actionType == "DeleteData") {
				Swal.fire({
					title:
						"Are you sure you want to delete Tenadr Company code " +
						eve.data.COMP_CODE +
						"?",
					icon: "warning",
					cancelButtonText: "No",
					showCancelButton: true,
					confirmButtonText: "Yes",
				}).then((result) => {
					if (result.value) {
						this.spinner.show()
						this.TendarComServ.TendarComMastDelete({
							COMP_CODE: eve.data.COMP_CODE,
						}).subscribe((ColDelRes) => {
							try {
								if (ColDelRes.success == true) {
									this.spinner.hide()
									this.toastr.success("Delete successfully.")
									this.LoadGridData()
								} else {
									this.spinner.hide()
									this.toastr.warning(
										"Something went to wrong while delete color code"
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
				this.COMP_CODE = eve.data.COMP_CODE ? eve.data.COMP_CODE : ''
				this.COMP_NAME = eve.data.COMP_NAME ? eve.data.COMP_NAME : ""
			}
		}
	}
}
