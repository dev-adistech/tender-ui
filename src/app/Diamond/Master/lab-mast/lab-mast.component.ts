import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { LabMastService } from 'src/app/Service/Master/lab-mast.service';

@Component({
  selector: 'app-lab-mast',
  templateUrl: './lab-mast.component.html',
  styleUrls: ['./lab-mast.component.css']
})
export class LabMastComponent implements OnInit {

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  LAB_CODE:any=''  
  LAB_NAME:any=''  
  ORD:any=''  

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []
  hide = true
  PASSWORD: any = ''

  agGridWidth: number = 0
	agGridStyles: string = ""

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private _FrmOpePer: FrmOpePer,
    private LabMastserv: LabMastService
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
              a = a + '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>'
            }
            if (op.ALLOWDEL) {
              a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
            }
          }
          a = a + '</span>';
          return a;
        },
        headerClass: "text-center",
        width:117,
      },
      {
        headerName: 'Code',
        field: 'LAB_CODE',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width:85
      },
      {
        headerName: 'Name',
        field: 'LAB_NAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width:200
      },
      {
        headerName: 'ORD',
        field: 'ORD',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:85
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

    this.PER = await this._FrmOpePer.UserFrmOpePer('LabMastComponent')
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

  Clear() {
   this.LAB_CODE=''
   this.LAB_NAME=''
   this.ORD = 0
  }

  Save() {
    if (this.PASSWORD != this.PASS) {
      this.toastr.warning('Enter valid Password');
      return;
    }
    if (!this.ALLOWINS) {
      this.toastr.warning("Insert Permission was not set!!", "Constact Administrator!!!!!")
      return
    } else if (this.PASS != this.PASSWORD) {
      this.toastr.warning("Password Not Match")
      return
    } else if (this.LAB_CODE.trim() == '') {
      this.toastr.warning('Enter Lab Code')
      return
    } else if (!this.LAB_NAME) {
      this.toastr.warning('Enter Lab Name')
      return
    } else if (!this.ORD) {
      this.toastr.warning('Enter Ord ')
      return
    }

    let SaveObj = {
      LAB_CODE: this.LAB_CODE ? this.LAB_CODE:'',
      LAB_NAME: this.LAB_NAME ? this.LAB_NAME:'',
      ORD:this.ORD ? this.ORD :0
    }
    this.spinner.show()
    this.LabMastserv.LabMastSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          this.toastr.success('Save successfully.')
          this.LoadGridData()
          this.Clear()
        } else {
          this.spinner.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
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
    this.LabMastserv.LabMastFill({}).subscribe((FillRes) => {
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
          this.spinner.hide()
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

  onGridRowClicked(eve: any) {
    if (eve.event.target !== undefined) {
      let actionType = eve.event.target.getAttribute("data-action-type");

      if (actionType == 'DeleteData') {
        if (this.PASS != this.PASSWORD) {
          this.toastr.warning("Password Not Match")
          return
        }
        if (!this.ALLOWDEL) {
          this.toastr.warning("Delete Permission was not set!!", "Constact Administrator!!!!!")
          return
        }
        Swal.fire({
          title: "Are you sure you want to delete Lab code " + eve.data.LAB_CODE + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            this.spinner.show()
            this.LabMastserv.LabMastDelete({ LAB_CODE: eve.data.LAB_CODE}).subscribe((DelRes) => {
              try {
                if (DelRes.success == true) {
                  this.spinner.hide()
                  this.toastr.success('Delete successfully.')
                  this.LoadGridData()
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
          } else {
            return
          }
        })
      } else if (actionType == 'EditData') {
        if (this.PASS != this.PASSWORD) {
          this.toastr.warning("Password Not Match")
          return
        }
        if (!this.ALLOWUPD) {
          this.toastr.warning("Update Permission was not set!!", "Constact Administrator!!!!!")
          return
        }
        this.LAB_CODE = eve.data.LAB_CODE ? eve.data.LAB_CODE : ''
        this.LAB_NAME = eve.data.LAB_NAME ? eve.data.LAB_NAME:''
        this.ORD = eve.data.ORD ? eve.data.ORD:0
      }
    }
  }

}
