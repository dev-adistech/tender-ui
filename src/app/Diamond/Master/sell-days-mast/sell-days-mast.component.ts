import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import Swal from 'sweetalert2';
import { SellDaysService } from 'src/app/Service/Master/sell-days.service';
import { ListboxComponent } from '../../Common/listbox/listbox.component';
import { MatDialog } from '@angular/material/dialog';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
declare let $: any;

export interface Code {
  code: string;
  name: string;
}
@Component({
  selector: 'app-sell-days-mast',
  templateUrl: './sell-days-mast.component.html',
  styleUrls: ['./sell-days-mast.component.css']
})
export class SellDaysMastComponent implements OnInit {

  
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

  Shapes: Code[] = [];
  Colors: Code[] = [];
  Cuts: Code[] = [];
  Quality: Code[] = [];
  Labs: Code[] = [];

  EDITABLEGRID:boolean = false

  constructor(
    private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private _FrmOpePer: FrmOpePer,
		private elementRef: ElementRef,
		private SellDaysServ: SellDaysService,
    public dialog: MatDialog,
    private EncrDecrServ: EncrDecrService,
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
							a = a + '<svg class="grid-icon icon-save" data-action-type="SaveData" > <use data-action-type="SaveData" xlink: href = "assets/symbol-defs.svg#icon-save" > </use> </svg>'
							//a = a + '<i class="icon-edit grid-icon" data-action-type="EditData" style="cursor: pointer;margin-right: 5px;" ></i>'
						}
						if (op.ALLOWDEL) {
							a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use  data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
							//a = a + '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i>'
						}
					}
					a = a + "</span>"
					return a
				},
				headerClass: "text-center",
				width:76
			},
			{
				headerName: "Srno",
				field: "SRNO",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:52,
        editable: function (params) {
          return op.EDITABLEGRID;
        },
			},
			{
				headerName: "Shape",
				field: "S_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:150
			},
			{
				headerName: "Color",
				field: "C_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:150
			},
			{
				headerName: "Clarity",
				field: "Q_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:150
			},
			// {
			// 	headerName: "F.Carat",
			// 	field: "F_CARAT",
			// 	cellStyle: { "text-align": "center" },
			// 	headerClass: "text-center",
			// 	width:79,
      //   editable: function (params) {
      //     return op.EDITABLEGRID;
      //   },
			// },
			// {
			// 	headerName: "T.Carat",
			// 	field: "T_CARAT",
			// 	cellStyle: { "text-align": "center" },
			// 	headerClass: "text-center",
			// 	width:79,
      //   editable: function (params) {
      //     return op.EDITABLEGRID;
      //   },
			// },
			{
				headerName: "Lab",
				field: "LAB",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:150
			},
			{
				headerName: "Days",
				field: "DD",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:85,
        editable: function (params) {
          return op.EDITABLEGRID;
        },
			},
		]

		this.defaultColDef = {
			resizable: true,
			sortable: true,
			filter: false,
      suppressMenu: true
		}
  }

  async ngOnInit() {
    this.spinner.hide()

		this.PER = await this._FrmOpePer.UserFrmOpePer('SellDaysMastComponent')
		this.ALLOWDEL = this.PER[0].DEL
		this.ALLOWINS = this.PER[0].INS
		this.ALLOWUPD = this.PER[0].UPD
		this.PASS = this.PER[0].PASS

    this.Shapes = this.decodedMast[15].map(item => {
      return {code: item.S_CODE, name: item.S_NAME.toString(),}
    });
    this.Colors = this.decodedMast[12].map(item => {
      return {code: item.C_CODE, name: item.C_NAME.toString(),}
    });
    this.Quality = this.decodedMast[5].map(item => {
      return {code: item.Q_CODE, name: item.Q_NAME.toString(),}
    });
    this.Labs = this.decodedMast[28].map(item => {
      return {code: item.LAB, name: item.LAB.toString(),}
    });
  }
  onGridReady(params) {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi
		this.LoadGridData()
	}

	CHANGEPASSWORD() {
		if (!this.PASS) return
		this.gridApi.redrawRows();
    	if (this.PASSWORD == this.PASS) {
    	  this.EDITABLEGRID = true
    	  this.gridApi.redrawRows();
    	} else {
    	  this.EDITABLEGRID = false
    	  this.gridApi.redrawRows();
    	}
	}

  LoadGridData() {
    this.spinner.show()
		this.SellDaysServ.SellDaysMastFill({}).subscribe((FillRes) => {
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
						"Are you sure you want to delete Srno " +
						eve.data.SRNO +
						"?",
					icon: "warning",
					cancelButtonText: "No",
					showCancelButton: true,
					confirmButtonText: "Yes",
				}).then((result) => {
					if (result.value) {
						this.spinner.show()
						this.SellDaysServ.SellDaysMastDelete({
							SRNO: eve.data.SRNO,
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
			} else if(actionType == "SaveData"){

        if(!eve.data.SRNO){
          return this.toastr.warning('Enter Valid Srno')
        }

        if(!eve.data.S_CODE){
          return this.toastr.warning('Enter Valid Shape')
        }

        if(!eve.data.C_CODE){
          return this.toastr.warning('Enter Valid Color')
        }

        if(!eve.data.Q_CODE){
          return this.toastr.warning('Enter Valid Clarity')
        }

        // if(!eve.data.F_CARAT){
        //   return this.toastr.warning('Enter Valid From Carat')
        // }

        // if(!eve.data.T_CARAT){
        //   return this.toastr.warning('Enter Valid To Carat')
        // }

        if(!eve.data.LAB){
          return this.toastr.warning('Enter Valid To Lab')
        }

        if(!eve.data.DD){
          return this.toastr.warning('Enter Valid Days')
        }

        let SaveObj = {
          SRNO:eve.data.SRNO ? eve.data.SRNO:0,
          S_CODE:eve.data.S_CODE ? eve.data.S_CODE:'',
          C_CODE:eve.data.C_CODE ? eve.data.C_CODE:'',
          Q_CODE:eve.data.Q_CODE ? eve.data.Q_CODE:'',
          F_CARAT:eve.data.F_CARAT ? eve.data.F_CARAT:0,
          T_CARAT:eve.data.T_CARAT ? eve.data.T_CARAT:0,
          LAB:eve.data.LAB ? eve.data.LAB:'',
          DD:eve.data.DD ? eve.data.DD:0,
        }
    
        this.spinner.show()
        this.SellDaysServ.SellDaysMastSave(SaveObj).subscribe((SaveRes) => {
          try {
            if (SaveRes.success == true) {
              this.spinner.hide()
              this.toastr.success("Save successfully.")
              this.LoadGridData()
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
    }
  }

  AddRow(){
        const newItems = [
          {
            SRNO:0,
            S_CODE:'',
            C_CODE:'',
            Q_CODE:'',
            F_CARAT:0,
            T_CARAT:0,
            LAB:'',
            DD:0,
          }
        ];
        let GridRowData = []
        this.gridApi.forEachNode(function (rowNode, index) {
          GridRowData.push(rowNode.data);
        });
        const res = this.gridApi.applyTransaction({
          add: newItems,
          addIndex: GridRowData.length + 1,
        });
    }
    onCellDoubleClicked(eve){
      if(this.EDITABLEGRID === false){
        return
      }
      if(eve.colDef.field === 'S_CODE'){
        const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Shapes, CODE: eve.data.S_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
        $("#Close").click();
        PRF.afterClosed().subscribe(result => {
          let dataObj = eve.data
          dataObj.S_CODE = result
          eve.node.setData(dataObj)
          eve.api.refreshCells({ force: true })
        });
      }else if(eve.colDef.field === 'C_CODE'){
        const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Colors, CODE: eve.data.C_CODE, TYPE: 'HolidayMast' }, panelClass: 'ListboxDialog' })
        $("#Close").click();
        PRF.afterClosed().subscribe(result => {
          let dataObj = eve.data
          dataObj.C_CODE = result
          eve.node.setData(dataObj)
          eve.api.refreshCells({ force: true })
        });
      }else if(eve.colDef.field === 'Q_CODE'){
        const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Quality, CODE: eve.data.Q_CODE, TYPE: 'HolidayMast' }, panelClass: 'ListboxDialog' })
        $("#Close").click();
        PRF.afterClosed().subscribe(result => {
          let dataObj = eve.data
          dataObj.Q_CODE = result
          eve.node.setData(dataObj)
          eve.api.refreshCells({ force: true })
        });
      }else if(eve.colDef.field === 'LAB'){
        const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Labs, CODE: eve.data.LAB, TYPE: 'HolidayMast' }, panelClass: 'ListboxDialog' })
        $("#Close").click();
        PRF.afterClosed().subscribe(result => {
          let dataObj = eve.data
          dataObj.LAB = result
          eve.node.setData(dataObj)
          eve.api.refreshCells({ force: true })
        });
      }
    }
  
}
