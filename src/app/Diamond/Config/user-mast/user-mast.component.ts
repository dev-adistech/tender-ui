import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { DeptMastService } from 'src/app/Service/Master/dept-mast.service';
import { ProcMastService } from 'src/app/Service/Master/proc-mast.service';
import Swal from "sweetalert2";
import { EncrDecrService } from '../../../Service/Common/encr-decr.service';
import { UserCatService } from '../../../Service/Config/user-cat.service';
import { UserMastService } from '../../../Service/Config/user-mast.service';
import { AutocompleteFunctions } from '../../_helpers/functions/AutocompleteFunction';
@Component({
  selector: 'app-user-mast',
  templateUrl: './user-mast.component.html',
  styleUrls: ['./user-mast.component.css']
})

export class UserMastComponent implements OnInit {

  USERID: any = ''
  USER_FULLNAME: any = ''
  U_PASS: any = ''
  U_CAT: any = ''
  IP: any = ''
  EMAIL: any = ''

  isAccess: boolean = false;
  NEWFILTERARR: any = ''

  CatList: any = []


  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private UserCatServ: UserCatService,
    private UserMastServ: UserMastService,
    private ProcMastServ: ProcMastService,
    private DeptMastServ: DeptMastService,
    private EncrDecrServ: EncrDecrService,
    private elementRef: ElementRef,
    private autocomplete: AutocompleteFunctions
  ) {
    this.columnDefs = [
      {
        headerName: 'Action',
        cellStyle: { 'text-align': 'center' },
        cellRenderer: function (params) {
          return '<span class="det_val"><i class="icon-edit grid-icon" data-action-type="EditData" style="cursor: pointer;margin-right: 5px;" ></i>  <i class="icon-delete grid-icon" data-action-type="DeleteData" style="cursor: pointer;margin-left: 5px;"></i> </span>  ';
        },
        headerClass: "text-center",
        width: 82,
      },
      {
        headerName: 'UserId',
        field: 'USERID',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 110,
      },
      {
        headerName: 'Full Name',
        field: 'USER_FULLNAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 176,
      },
      {
        headerName: 'IP',
        field: 'IP',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 82,
      },
      // {
      //   headerName: 'Email',
      //   field: 'EMAIL',
      //   cellStyle: { 'text-align': 'center' },
      //   headerClass: "text-center",
      //   width: 82,
      // },
      {
        headerName: 'Access',
        field: 'ISACCESS',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        width: 70,
        cellRenderer: (params) => {
          if (params.data.ISACCESS == true) {
            return '<input type="checkbox" data-action-type="isAccess" checked disabled>';
          } else {

            return '<input type="checkbox" data-action-type="isAccess" disabled >';
          }

        }
      }
    ]

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    }
  }

  ngOnInit(): void {
    this.spinner.hide()

    this.UserCatServ.UserCatMastFill({}).subscribe((CatRes) => {
      try {
        if (CatRes.success == true) {
          this.CatList = CatRes.data.map((item) => {
            return { code: item.U_CAT, name: item.U_CATNAME }
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(CatRes.data),
          })
        }
      } catch (err) {
        this.toastr.error(err)
      }
    })

    

  }

  onFilterChanged(event) {
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
    if (agBodyViewport) {
      const ps = new PerfectScrollbar(agBodyViewport);
      const container = document.querySelector('.ag-body-viewport');
      container.scrollTop = 0;
      ps.update();
    }

  }

  filterCats(code: string) {
    return this.CatList.filter(cat =>
      cat.code.toLowerCase().indexOf(code.toLowerCase()) === 0);
  }
  Save() {

    if (this.USERID == '') {
      this.toastr.warning('Enter Id')
      return
    };
    if (this.U_PASS == '') {
      this.toastr.warning('Enter Password')
      return
    };
    if (this.U_CAT == '') {
      this.toastr.warning('Enter Catagory')
      return
    }
    // if (!this.EMAIL) {
    //   this.toastr.warning('Enter Email Id')
    //   return
    // }

    let GridData = []
    this.gridApi.forEachNode(node => {
      GridData.push(node)
    })

    let SaveObj = {
      USERID: this.USERID.trim(),
      USER_FULLNAME: this.USER_FULLNAME ? this.USER_FULLNAME : '',
      U_PASS: this.U_PASS,
      U_CAT: this.U_CAT ? this.U_CAT : '',
      IP: this.IP ? this.IP : '',
      ISACCESS: this.isAccess,
      EMAIL: this.EMAIL,
    }
    this.UserMastServ.UserMastSave(SaveObj).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          this.toastr.success('save successfully')
          this.Clear()
          this.gridApi.refreshCells()
          // this.LoadGridData()
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

  Clear() {
    this.USERID = ''
    this.U_PASS = ''
    this.USER_FULLNAME = ''
    this.U_CAT = ''
    this.IP = ''
    this.EMAIL = ''
    this.isAccess = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    return filterModel;
  }

  LoadGridData() {
    this.spinner.show()
    this.UserMastServ.UserMastFill({ USERID: '' }).subscribe((FillRes) => {

      try {
        if (FillRes.success == true) {
          this.spinner.hide()
          this.gridApi.setRowData(FillRes.data);


          this.gridApi.setFilterModel(this.NEWFILTERARR);

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
        Swal.fire({
          title: "Are you sure you want to delete userID " + eve.data.USERID + "?",
          icon: "warning",
          cancelButtonText: "No",
          showCancelButton: true,
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            this.spinner.show()
            this.UserMastServ.UserMastDelete({ USERID: eve.data.USERID }).subscribe((DelRes) => {
              try {
                if (DelRes.success == true) {
                  this.spinner.hide()
                  this.toastr.success('Delete successfully.')
                  let gridFilter = this.printFilterModel()
                  if (gridFilter) {
                    this.NEWFILTERARR = gridFilter
                  }
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
        this.USERID = eve.data.USERID
        this.U_PASS = this.EncrDecrServ.decryptPassword(eve.data.U_PASS)
        this.USER_FULLNAME = eve.data.USER_FULLNAME
        this.U_CAT = eve.data.U_CAT
        this.IP = eve.data.IP
        this.isAccess = eve.data.ISACCESS
        // this.EMAIL = eve.data.EMAIL
      }

    }
  }

  autocompleteFun(code, ngmodel, array) {
    let Res = this.autocomplete.autocompleteCode(code, array);
    this[ngmodel] = Res
  }

}
