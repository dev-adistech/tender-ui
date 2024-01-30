import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FrmMastService } from 'src/app/Service/Config/frm-mast.service';
import Swal from 'sweetalert2';
import { PerMastService } from '../../../Service/Config/per-mast.service';
import { UserMastService } from '../../../Service/Config/user-mast.service';
import { ListboxComponent } from '../../Common/listbox/listbox.component';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
declare let $: any;
@Component({
  selector: 'app-per-mast',
  templateUrl: './per-mast.component.html',
  styleUrls: ['./per-mast.component.css']
})

export class PerMastComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public gridOptions;

  SelectedUsers: any = '';

  hide = true
  PASSWORD: any = ''
  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []
  showformMaster: boolean = false;

  UserId: any = '';
  UserIdArr: any = [];

  gridShow: boolean = false;

  public rowSelection: 'single' | 'multiple' = 'single';

  FrmArray = [
    
    { FORM_GROUP: 'Configuration', FORM_NAME: 'PerMastComponent', DESCR: 'Permission Master' },
    { FORM_GROUP: 'Configuration', FORM_NAME: 'LoginPermissionComponent', DESCR: 'Login Permission' },
    { FORM_GROUP: 'Configuration', FORM_NAME: 'GetCertiResComponent', DESCR: 'Get Certi Result' },
    { FORM_GROUP: 'Configuration', FORM_NAME: 'RateUpdateComponent', DESCR: 'Rate Update' },
    { FORM_GROUP: 'Configuration', FORM_NAME: 'UserCatComponent', DESCR: 'User Category Master' },
    { FORM_GROUP: 'Configuration', FORM_NAME: 'UserMastComponent', DESCR: 'user Master' },

    { FORM_GROUP: 'Dashborad', FORM_NAME: 'Dashboard', DESCR: 'Dashboard' },
    { FORM_GROUP: 'Dashborad', FORM_NAME: 'MarkerAccDetComponent', DESCR: 'MarkerAccModel' },
    { FORM_GROUP: 'Dashborad', FORM_NAME: 'DashPrependingComponent', DESCR: 'Prediction Pending' },

    
    { FORM_GROUP: 'Master', FORM_NAME: 'QuaMastComponent', DESCR: 'Clarity Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'ColMastComponent', DESCR: 'Color Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'CutMastComponent', DESCR: 'Cut Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'FloMastComponent', DESCR: 'Fluorescence Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'IncMastComponent', DESCR: 'Inclusion Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'ShpMastComponent', DESCR: 'Shape Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'SizeMastComponent', DESCR: 'Size Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'ViewParaMastComponent', DESCR: 'ViewPara Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'LabMastComponent', DESCR: 'Lab Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'TensionMastComponent', DESCR: 'Tension Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'MachineColMastComponent', DESCR: 'Machine Color Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'FloNumMastComponent', DESCR: 'Fluorescence Number Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'MachineFloMastComponent', DESCR: 'Machine Fluorescence Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'MacComMastComponent', DESCR: 'Machine Comment Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'MilkyMastComponent', DESCR: 'Milky Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'GridleMastComponent', DESCR: 'Gridle Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'DepthMastComponent', DESCR: 'Depth Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'RatioMastComponent', DESCR: 'Ratio Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'ShdMastComponent', DESCR: 'Shade Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'RefMastComponent', DESCR: 'Reflection Master' },
    { FORM_GROUP: 'Master', FORM_NAME: 'SellDaysMastComponent', DESCR: 'Sell Days Master' },

    { FORM_GROUP: 'Transaction', FORM_NAME: 'TendarComComponent', DESCR: 'Tendar Company' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'TendarMastComponent', DESCR: 'Tendar Master' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'TendarEstComponent', DESCR: 'Tendar Estimation' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'RapCalComponent', DESCR: 'Rap Calc' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'LotMappingComponent', DESCR: 'Lot Mapping' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'ExpiryDateComponent', DESCR: 'Expiry Date' },
    { FORM_GROUP: 'Transaction', FORM_NAME: 'ParcelEntryComponent', DESCR: 'Parcel Entry' },

    { FORM_GROUP: 'View', FORM_NAME: 'PricingWrkViewComponent', DESCR: 'Pricing Work' },
    { FORM_GROUP: 'View', FORM_NAME: 'BVViewComponent', DESCR: 'B V' },
    { FORM_GROUP: 'View', FORM_NAME: 'BidDataComponent', DESCR: 'Bid Data' },
    { FORM_GROUP: 'View', FORM_NAME: 'RoughColorAnaComponent', DESCR: 'Rough Color Analysis' },
    { FORM_GROUP: 'View', FORM_NAME: 'ParcelViewComponent', DESCR: 'Parcel' },
    { FORM_GROUP: 'View', FORM_NAME: 'TendarWinComponent', DESCR: 'Tendar Win' },
    { FORM_GROUP: 'View', FORM_NAME: 'ParcelBidDataComponent', DESCR: 'Parcel Bid Data' },
    
    { FORM_GROUP: 'Pricing', FORM_NAME: 'RapCutDiscComponent', DESCR: 'Rap Cut Discount' },
    { FORM_GROUP: 'Pricing', FORM_NAME: 'RapFloDiscComponent', DESCR: 'Rap Fluorescence Discount' },
    { FORM_GROUP: 'Pricing', FORM_NAME: 'RapIncDiscComponent', DESCR: 'Rap Inclusion Discount' },
    { FORM_GROUP: 'Pricing', FORM_NAME: 'RapMastComponent', DESCR: 'Rap Master' },
    { FORM_GROUP: 'Pricing', FORM_NAME: 'RapOrgComponent', DESCR: 'Rap Org' },

    { FORM_GROUP: 'Report', FORM_NAME: 'ReportComponent', DESCR: 'Report' },


  ];



  constructor(
    private UserMastServ: UserMastService,
    private PerMastServ: PerMastService,
    private _FrmOpePer: FrmOpePer,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private FrmMastServ: FrmMastService
  ) {
    let op = this

    this.columnDefs = [
      {
        headerName: 'USER_NAME',
        field: 'USER_NAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
      {
        headerName: 'FORM_GROUP',
        field: 'FORM_GROUP',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
      {
        headerName: 'FORM_NAME',
        field: 'FORM_NAME',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
      {
        headerName: 'DESCR',
        field: 'DESCR',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center"
      },
      {
        headerName: 'DESCR1',
        field: 'DESCR1',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
      },
      {
        headerName: 'INS',
        field: 'INS',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        cellRenderer: (params) => {
          if (op.PASS == op.PASSWORD) {
            if (params.data.INS == true) {
              return '<input type="checkbox" data-action-type="IS_INS" checked  >';
            } else {
              return '<input type="checkbox" data-action-type="IS_INS" (keydown.space)="checked">';
            }
          } else {
            if (params.data.INS == true) {
              return '<input type="checkbox" data-action-type="IS_INS" checked disabled>';
            } else {
              return '<input type="checkbox" data-action-type="IS_INS" disabled>';
            }
          }
        },
      },
      {
        headerName: 'VIW',
        field: 'VIW',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        cellRenderer: (params) => {
          if (op.PASS == op.PASSWORD) {
            if (params.data.VIW == true) {
              return '<input type="checkbox" data-action-type="IS_VIW" checked >';
            } else {
              return '<input type="checkbox" data-action-type="IS_VIW" (keydown.space)="checked">';
            }
          } else {
            if (params.data.VIW == true) {
              return '<input type="checkbox" data-action-type="IS_VIW" checked disabled>';
            } else {
              return '<input type="checkbox" data-action-type="IS_VIW" disabled>';
            }
          }
        },
      },
      {
        headerName: 'UPD',
        field: 'UPD',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        cellRenderer: (params) => {
          if (op.PASS == op.PASSWORD) {
            if (params.data.UPD == true) {
              return '<input type="checkbox" data-action-type="IS_UPD" checked >';
            } else {
              return '<input type="checkbox" data-action-type="IS_UPD" (keydown.space)="checked">';
            }
          } else {
            if (params.data.UPD == true) {
              return '<input type="checkbox" data-action-type="IS_UPD" checked disabled>';
            } else {
              return '<input type="checkbox" data-action-type="IS_UPD" disabled>';
            }
          }
        },
      },
      {
        headerName: 'DEL',
        field: 'DEL',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        cellRenderer: (params) => {
          if (op.PASS == op.PASSWORD) {
            if (params.data.DEL == true) {
              return '<input type="checkbox" data-action-type="IS_DEL" checked >';
            } else {
              return '<input type="checkbox" data-action-type="IS_DEL">';
            }
          } else {
            if (params.data.DEL == true) {
              return '<input type="checkbox" data-action-type="IS_DEL" checked disabled>';
            } else {
              return '<input type="checkbox" data-action-type="IS_DEL" disabled>';
            }
          }
        },
      },

      {
        headerName: 'PASS',
        field: 'PASS',
        cellStyle: { 'text-align': 'center' },
        headerClass: "text-center",
        editable: (params) => {
          if (op.PASS == op.PASSWORD) {
            return true
          } else {
            return false;
          }
        }
      }

    ]
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true
    }

    this.gridOptions = {
      columnDefs: this.columnDefs,
      // Other grid options...
    };

  }

  async ngOnInit() {
    this.spinner.hide()

    if (!(this.decodedTkn.UserId.toLowerCase() === 'admin' && this.decodedTkn.U_CAT.toUpperCase() === 'S' || this.decodedTkn.UserId.toLowerCase() === 'sadmin' && this.decodedTkn.U_CAT.toUpperCase() === 'SA')) return


    this.PER = await this._FrmOpePer.UserFrmOpePer('PerMastComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS

    this.UserMastServ.UserMastFill({ USERID: this.UserId }).subscribe((UserIdRes) => {
      try {
        if (UserIdRes.success == true) {
          this.UserIdArr = UserIdRes.data.map((item) => {
            return { USERID: item.USERID, DEPT: item.DEPT_CODE, PRC_CODE: item.PROC_CODE }
          })
        } else {
          this.toastr.warning("Something gone wrong while get UserId")
        }
      } catch (error) {
        this.toastr.error(error)
      }
    })
    this.Rel1HIDE()
  }

  Rel1HIDE() {
    if (this.PASSWORD === this.PASS) {
      this.gridOptions.columnApi.setColumnVisible('PASS', true);
    } else {
      this.gridOptions.columnApi.setColumnVisible('PASS', false);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  LoadGrid() {
    if (this.UserId) {
      this.spinner.show()
      this.gridShow = true
      this.PerMastServ.PerMastFill({ UserId: this.UserId }).subscribe((UserIPRes) => {
        try {
          if (UserIPRes.success == true) {
            this.gridApi.setRowData(UserIPRes.data);
            this.gridApi.sizeColumnsToFit();
            this.spinner.hide();

            // const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
            // const agBodyHorizontalViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-horizontal-scroll-viewport");

            // if (agBodyViewport) {
            //   const psV = new PerfectScrollbar(agBodyViewport);
            //   psV.update();
            // }
            // if (agBodyHorizontalViewport) {
            //   const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            //   psH.update();
            // }

          } else {
            this.spinner.hide()

          }
        } catch (error) {
          this.spinner.hide()
          this.toastr.error(error)
        }
      })
    } else {
      this.gridApi.setRowData([]);
      return
    }
  }

  Save() {
    if (this.PASSWORD != this.PASS) {
      this.toastr.warning('Enter valid Password');
      return;
    }
    if (this.UserId) {
      let rowData = []
      this.gridApi.forEachNode(node => rowData.push(node.data));
      let PerArr = [];
      for (let i = 0; i < rowData.length; i++) {
        let SaveObj = {
          USER_NAME: rowData[i].USER_NAME,
          FORM_NAME: rowData[i].FORM_NAME,
          INS: rowData[i].INS,
          DEL: rowData[i].DEL,
          UPD: rowData[i].UPD,
          VIW: rowData[i].VIW,
          PASS: rowData[i].PASS
        };
        PerArr.push(SaveObj);
      }
      this.spinner.show()
      this.PerMastServ.PerMastSave(PerArr).subscribe((PerSaveRes) => {
        this.spinner.hide();
        try {
          if (PerSaveRes.success == true) {
            this.toastr.success('Permission upload successfully');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:
                'Permission not change with this criteria' +
                JSON.stringify(PerSaveRes.data)
            });
          }
        } catch (error) {
          this.toastr.error(error);
        }
      })
    } else {
      this.toastr.warning('Enter UserId');
    }
  }

  SaveFormMaster() {
    this.FrmMastServ.FrmMastSave(this.FrmArray).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide();
          this.toastr.success('Save successfully.');
          // this.LoadGrid();
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(SaveRes.data),
          });
        }
      } catch (err) {
        this.spinner.hide();
        this.toastr.error(err);
      }
    });
  }

  onSelectionChange(params) {
    let grid = this.gridApi.getSelectedRows();
    let focuscell = this.gridApi.getFocusedCell();
    if (focuscell.column.colId == 'INS') {
      grid.map((it) => {
        it.INS = !it.INS
      })
    }
    if (focuscell.column.colId == 'VIW') {
      grid.map((it) => {
        it.VIW = !it.VIW
      })
    }
    if (focuscell.column.colId == 'UPD') {
      grid.map((it) => {
        it.UPD = !it.UPD
      })
    }
    if (focuscell.column.colId == 'DEL') {
      grid.map((it) => {
        it.DEL = !it.DEL
      })
    }
    this.gridApi.refreshCells();
  }

  CHANGEPASSWORD() {
    if (!this.PASS) return;
    if (this.PASSWORD === 'Pred@c0n') {
      this.showformMaster = true;
      this.Rel1HIDE()
      this.gridApi.sizeColumnsToFit();
    } else {
      this.Rel1HIDE()
      this.showformMaster = false;
      this.gridApi.sizeColumnsToFit();
    }
    // let RowData = []
    // this.gridApi.forEachNode(function (rowNode, index) {
    //   RowData.push(rowNode.data);
    // });
    // this.gridApi.setRowData(RowData);
    this.gridApi.redrawRows();
  }

  onGridRowClicked(eve: any) {
    let actionType = eve.event.target.getAttribute("data-action-type");

    if (actionType == "IS_INS") {
      let dataObj = eve.data;
      dataObj.INS = !dataObj.INS;
      eve.node.setData(dataObj)
      eve.api.refreshCells({ force: true })
    } else if (actionType == "IS_VIW") {
      let dataObj = eve.data;
      dataObj.VIW = !dataObj.VIW;
      eve.node.setData(dataObj)
      eve.api.refreshCells({ force: true })
    } else if (actionType == "IS_UPD") {
      let dataObj = eve.data;
      dataObj.UPD = !dataObj.UPD;
      eve.node.setData(dataObj)
      eve.api.refreshCells({ force: true })
    } else if (actionType == "IS_DEL") {
      let dataObj = eve.data;
      dataObj.DEL = !dataObj.DEL;
      eve.node.setData(dataObj)
      eve.api.refreshCells({ force: true })
    }

  }

  openUserMaster() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30%', data: { arr: this.UserIdArr, USERID: this.SelectedUsers, TYPE: 'USERMAST', panelClass: 'ListboxDialog' } })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.SelectedUsers = result
    });
  }

  Copy() {
    this.PerMastServ.PerMastCopy({ USERNAME: this.UserId, USERS: this.SelectedUsers }).subscribe((Res) => {
      try {
        if (Res.success == true) {
          this.spinner.hide();
          this.toastr.success("Permissions succesfully copied.")
        } else {
          this.spinner.hide()
          this.toastr.warning("Can't copy permissions.")
        }
      } catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

}




