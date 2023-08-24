import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import Swal from "sweetalert2";
import { CutMastService } from '../../../Service/Master/cut-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { IsBlank } from '../../_helpers/functions/isBlank';
@Component({
  selector: 'app-cut-mast',
  templateUrl: './cut-mast.component.html',
  styleUrls: ['./cut-mast.component.css']
})
export class CutMastComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  CT_CODE: any = '';
  CT_NAME: any = '';
  CT_ORD: any = '';

  hide = true
  PASSWORD: any = ''
  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []

  agGridWidth: number = 0
  agGridStyles: string = ""

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private CutMastServ: CutMastService,
    private _FrmOpePer: FrmOpePer,
    private elementRef: ElementRef,
    private _validator: IsBlank,
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
              // a = a + '<i class="icon-edit grid-icon" data-action-type="EditData" style="cursor: pointer;margin-right: 5px;" ></i>';
              a = a + '<svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg>'
            }
            if (op.ALLOWDEL) {
              // a = a + '<i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i>';
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
        headerName: 'Code',
        field: 'CT_CODE',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:85
      },
      {
        headerName: 'Name',
        field: 'CT_NAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width:200
      },
      {
        headerName: 'Order',
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

    this.PER = await this._FrmOpePer.UserFrmOpePer('CutMastComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS
  }

  CHANGEPASSWORD() {
    if (!this.PASS) return;
    // let RowData = []
    // this.gridApi.forEachNode(function (rowNode, index) {
    //   RowData.push(rowNode.data);
    // });
    // this.gridApi.setRowData(RowData);
    this.gridApi.redrawRows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  Clear() {
    this.CT_CODE = 0
    this.CT_NAME = ''
    this.CT_ORD = 0
  }

  Save() {
    if (this.PASSWORD != this.PASS) {
      this.toastr.warning("Enter valid Password")
      return;
    }
    if (!this.ALLOWINS) {
      this.toastr.warning("Insert Permission was not set!!", "Contact Administrator!!!!!")
      return
    }

    if(!this.CT_CODE){
      this.toastr.warning('Enter Valid Code')
      return
    }

    if(!this.CT_NAME){
      this.toastr.warning('Enter Valid Name')
      return
    }

    if(!this.CT_ORD){
      this.toastr.warning('enter Valid Order')
      return
    }

    let SaveObj = {
      CT_CODE: this.CT_CODE ? this.CT_CODE:0,
      CT_NAME: this.CT_NAME.trim(),
      CT_ORD: this.CT_ORD ? this.CT_ORD : 0,
    }

    this.spinner.show()
    this.CutMastServ.CutMastSave(SaveObj).subscribe((SaveRes) => {
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
    this.CutMastServ.CutMastFill({}).subscribe((FillRes) => {

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
          // this.gridColumnApi.autoSizeAllColumns(false, this.gridApi)
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
        Swal.fire({
          title: "Are you sure you want to delete Cut code " + eve.data.CT_CODE + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            this.spinner.show()
            this.CutMastServ.CutMastDelete({ CT_CODE: eve.data.CT_CODE }).subscribe((DelRes) => {
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
        this.CT_CODE = eve.data.CT_CODE ? eve.data.CT_CODE : 0
        this.CT_NAME = eve.data.CT_NAME ? eve.data.CT_NAME : ''
        this.CT_ORD = eve.data.ORD ? eve.data.ORD : 0
      }
    }
  }
}
