import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";
import { UserCatService } from '../../../Service/Config/user-cat.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';



@Component({
  selector: 'app-user-cat',
  templateUrl: './user-cat.component.html',
  styleUrls: ['./user-cat.component.css']
})
export class UserCatComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));




  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  U_CAT: any = ''
  U_CATNAME: any = ''

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private UserCatServ: UserCatService,
    private _FrmOpePer: FrmOpePer,
  ) {
    console.log(this.decodedTkn);
    this.columnDefs = [
      {
        headerName: 'Action',
        cellStyle: { 'text-align': 'center' },
        cellRenderer: function (params) {
          return '<span class="det_val"> <svg class="grid-icon icon-edit" data-action-type="EditData" > <use data-action-type="EditData" xlink: href = "assets/symbol-defs.svg#icon-edit" > </use> </svg> <svg class="grid-icon icon-delete" data-action-type="DeleteData" > <use data-action-type="DeleteData" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg> </span>  ';
        },
        headerClass: "text-center"
      },
      {
        headerName: 'Code',
        field: 'U_CAT',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
      {
        headerName: 'Name',
        field: 'U_CATNAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
    ]

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    }
  }

  async ngOnInit() {
    this.PER = await this._FrmOpePer.UserFrmOpePer('UserCatComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS
    this.spinner.hide()
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  Clear() {
    this.U_CAT = ''
    this.U_CATNAME = ''
  }

  Save() {


    if (this.U_CAT.trim() == '') {
      this.toastr.warning('Enter Code')
      return
    }
    if (this.U_CATNAME.trim() == '') {
      this.toastr.warning('Enter Name')
      return
    }

    let SaveObj = {
      U_CAT: this.U_CAT.trim(),
      U_CATNAME: this.U_CATNAME.trim(),
    }
    this.spinner.show()
    this.UserCatServ.UserCatMastSave(SaveObj).subscribe((SaveRes) => {
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
    this.UserCatServ.UserCatMastFill({}).subscribe((FillRes) => {

      try {
        if (FillRes.success == true) {
          this.spinner.hide()
          this.gridApi.setRowData(FillRes.data);
          this.gridApi.sizeColumnsToFit();
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
      if (this.ALLOWDEL) {


        if (actionType == 'DeleteData') {
          Swal.fire({
            title: "Are you sure you want to delete user category code " + eve.data.U_CAT + "?",
            icon: "warning",
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: "Yes"
          }).then(result => {
            if (result.value) {
              this.spinner.show()
              this.UserCatServ.UserCatMastDelete({ U_CAT: eve.data.U_CAT }).subscribe((DelRes) => {
                try {
                  if (DelRes.success == true) {
                    this.spinner.hide()
                    this.toastr.success('Delete successfully.')
                    this.LoadGridData()
                  } else {
                    this.spinner.hide()
                    this.toastr.warning('Something went to wrong while delete code')
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
          this.U_CAT = eve.data.U_CAT ? eve.data.U_CAT : ''
          this.U_CATNAME = eve.data.U_CATNAME ? eve.data.U_CATNAME : ''
        }
      }

    }
  }

}
