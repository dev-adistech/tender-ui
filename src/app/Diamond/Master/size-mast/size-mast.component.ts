import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import Swal from "sweetalert2";
import { SizeMastService } from '../../../Service/Master/size-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
@Component({
  selector: 'app-size-mast',
  templateUrl: './size-mast.component.html',
  styleUrls: ['./size-mast.component.css']
})

export class SizeMastComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  SZ_TYPE: any = '';
  SZ_CODE: any = 0;
  F_SIZE: any = '';
  T_SIZE: any = '';
  SZ_GROUP: any = '';
  OSZ_CODE: any = '';

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []
  hide = true
  PASSWORD: any = ''

  TypeArray = [];

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private SizeMastServ: SizeMastService,
    private _FrmOpePer: FrmOpePer,
    private EncrDecrServ: EncrDecrService,
    private elementRef: ElementRef
  ) {
    console.log(this.decodedMast)
    this.TypeArray = this.decodedMast[9].map(item => {
      return item.SZ_TYPE
    });
   
    this.TypeArray = this.TypeArray.filter((element, i) => i === this.TypeArray.indexOf(element))
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
        width:96
      },
      {
        headerName: 'Type',
        field: 'SZ_TYPE',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width:90
      },
      {
        headerName: 'Code',
        field: 'SZ_CODE',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:77
      },
      {
        headerName: 'F-Size',
        field: 'F_SIZE',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:82
      },
      {
        headerName: 'T-Size',
        field: 'T_SIZE',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:82
      },
      {
        headerName: 'SZ_Group',
        field: 'SZ_GROUP',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width:105
      },
      {
        headerName: 'OSZ_Code',
        field: 'OSZ_CODE',
        cellStyle: { 'text-align': 'right' },
        headerClass: "text-center",
        width:108
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

    this.PER = await this._FrmOpePer.UserFrmOpePer('SizeMastComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.LoadGridData()
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

  Clear() {
    this.SZ_CODE = ''
    this.F_SIZE = ''
    this.T_SIZE = ''
    this.SZ_GROUP = ''
    this.OSZ_CODE = ''
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
    } else if (this.SZ_TYPE.trim() == '') {
      this.toastr.warning('Enter Type')
      return
    } else if (!this.SZ_CODE) {
      this.toastr.warning('Enter Code')
      return
    } else if (!this.F_SIZE) {
      this.toastr.warning('Enter size')
      return
    } else if (!this.T_SIZE) {
      this.toastr.warning('Enter size')
      return
    }

    let SaveObj = {
      SZ_TYPE: this.SZ_TYPE,
      SZ_CODE: this.SZ_CODE,
      F_SIZE: this.F_SIZE,
      T_SIZE: this.T_SIZE,
      SZ_GROUP: this.SZ_GROUP ? this.SZ_GROUP.trim() : this.F_SIZE + "-" + this.T_SIZE,
      OSZ_CODE: this.OSZ_CODE ? this.OSZ_CODE : this.OSZ_CODE
    }
    this.spinner.show()
    this.SizeMastServ.SizeMastSave(SaveObj).subscribe((SaveRes) => {
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
    this.SizeMastServ.SizeMastFill({ SZ_TYPE: this.SZ_TYPE ? this.SZ_TYPE : '' }).subscribe((FillRes) => {
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
          title: "Are you sure you want to delete shade code " + eve.data.SZ_CODE + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            this.spinner.show()
            this.SizeMastServ.SizeMastDelete({ SZ_TYPE: eve.data.SZ_TYPE, SZ_CODE: eve.data.SZ_CODE }).subscribe((DelRes) => {
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
        this.SZ_TYPE = eve.data.SZ_TYPE ? eve.data.SZ_TYPE : ''
        this.SZ_CODE = eve.data.SZ_CODE ? eve.data.SZ_CODE : ''
        this.F_SIZE = eve.data.F_SIZE ? eve.data.F_SIZE : ''
        this.T_SIZE = eve.data.T_SIZE ? eve.data.T_SIZE : ''
        this.SZ_GROUP = eve.data.SZ_GROUP ? eve.data.SZ_GROUP : '',
          this.OSZ_CODE = eve.data.OSZ_CODE ? eve.data.OSZ_CODE : 0
      }
    }
  }

  CODECHANGE() {
    let GridRowData = []
    this.gridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    if (GridRowData.filter(x => x.SZ_CODE == this.SZ_CODE).length > 0) {
      if (this.ALLOWUPD == false) {
        this.toastr.warning("Update Permission was not set!!", "Constact Administrator!!!!!")
        this.SZ_CODE = ''
        this.F_SIZE = ''
        this.T_SIZE = ''
        this.SZ_GROUP = ''
        this.OSZ_CODE = ''
      }
    }
  }

}
