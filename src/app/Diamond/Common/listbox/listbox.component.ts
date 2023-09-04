import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {

  Selected = []
  valdata = []
  selectedRow = []
  TYPE: any = ''

  Result: any = ''
  FILTER: any = ''

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowData;
  public frameworkComponents;
  public rowSelection;
  public suppressRowClickSelection;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _mdr: MatDialogRef<ListboxComponent>, private spinner: NgxSpinnerService,
  ) {

    this.TYPE = data.TYPE

    if (data.CODE != null) {
      this.Selected = data.CODE.split(',')
    }
    else {
      this.Selected = []
    }

    if (data.TYPE == 'TALLYVIEW') {

      this.valdata = data.arr.map((item) => {
        return { CODE: item.CODE, NAME: item.NAME.toString(), PNT: item.PNT, CARAT: item.CARAT, CKB: this.userExists(item.CODE) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 30
        },
        {
          headerName: "Lot",
          field: "CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 70
        },
        {
          headerName: "Name",
          field: "NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 100
        },
        {
          headerName: "Pnt",
          field: "PNT",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 50
        },
        {
          headerName: "Carat",
          field: "CARAT",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 100
        }
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'DELETEVIDEO') {
      this.valdata = data.arr.map((item) => {
        return { CODE: item.CODE }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 30
        },
        {
          headerName: "Lot",
          field: "CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center",
          width: 70
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'EMPMAST') {
      this.valdata = data.arr.map((item) => {
        return { PRC_CODE: item.PRC_CODE, PRC_NAME: item.PRC_NAME.toString(), CKB: this.userExists(item.PRC_CODE) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 30
        },
        {
          headerName: "code",
          field: "PRC_CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "name",
          field: "PRC_NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        }
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'USERMAST') {
      this.valdata = data.arr.map((item) => {
        return { USERID: item.USERID, DEPT: item.DEPT, PRC_CODE: item.PRC_CODE }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 55
        },
        {
          headerName: "UserID",
          field: "USERID",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "Dept",
          field: "DEPT",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "Proccess",
          field: "PRC_CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        filter: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'PRCMAST') {
      this.valdata = data.arr.map((item) => {
        return { PRC_CODE: item.PRC_CODE, PRC_NAME: item.PRC_NAME, CKB: this.userExists(item.PRC_CODE) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "Process Code",
          field: "PRC_NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "Process Name",
          field: "PRC_NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'LOCKMAST') {
      this.valdata = data.arr.map((item) => {
        return { PRC_CODE: item.PRC_CODE, PRC_NAME: item.PRC_NAME, CKB: this.userExists(item.PROC_CODE) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "Process Code",
          field: "PRC_CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "Process Name",
          field: "PRC_NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "single";
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'PARTY') {
      this.valdata = data.arr.map((item) => {
        return { DEPT_CODE: item.DEPT_CODE, P_CODE: item.P_CODE }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "dept code",
          field: "DEPT_CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "Process Code",
          field: "P_CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'ORDDIS') {
      this.valdata = data.arr.map((item) => {
        return { code: item.code, name: item.name, CKB: this.userExists(item.code) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 60
        },
        {
          headerName: "CODE",
          field: "code",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "NAME",
          field: "name",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'HolidayMast') {
      this.valdata = data.arr.map((item) => {
        return { code: item.code, name: item.name, CKB: this.userExists(item.code) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "CODE",
          field: "code",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "NAME",
          field: "name",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'TrpId') {
      this.valdata = data.arr.map((item) => {
        return { CODE: item.CODE, NAME: item.NAME, TRPID: item.TRPID, GRP: item.GRP, CKB: this.userExists(item.CODE) }
      })

      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "TRPID",
          field: "TRPID",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "CODE",
          field: "CODE",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "NAME",
          field: "NAME",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "GRP",
          field: "GRP",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'TEN') {
      data.arr.map((item) => {
        this.valdata = item.map((it) => {
          return { CODE: it.L_CODE, CKB: this.userExists(it.L_CODE) }
        })
      })
      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          field: 'CODE',
          headerName: 'CODE',
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        }
      ]
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'COMPOP') {
      this.valdata = data.arr.map((item) => {
        return { code: item.code, name: item.name, CKB: this.userExists(item.name) }
      })
      // console.log(this.valdata)
      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "CODE",
          field: "code",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
        {
          headerName: "NAME",
          field: "name",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    } else if (data.TYPE == 'TYPEPOP') {
      this.valdata = data.arr.map((item) => {
        return { code: item.code, CKB: this.userExists(item.code) }
      })
      // console.log(this.valdata)
      this.columnDefs = [
        {
          field: '',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          resizable: false,
          sortable: false,
          width: 35
        },
        {
          headerName: "CODE",
          field: "code",
          cellStyle: { "text-align": "center" },
          headerClass: "text-center"
        },
      ];
      this.rowSelection = "multiple";
      this.suppressRowClickSelection = true;
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly: true
      };
    }
  }


  ngOnInit(): void {
    this.spinner.hide();
  }

  userExists(name) {
    if (this.TYPE == 'ORDDIS') {
      return this.Selected.some(function (el) {
        return parseInt(el) === name;
      });
    } else {
      return this.Selected.some(function (el) {
        return el === name;
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.TYPE == 'EMPMAST') {
      this.valdata = this.valdata.map((item) => {
        return { PRC_CODE: item.PRC_CODE, PRC_NAME: item.PRC_NAME.toString(), CKB: item.CKB }
      })
    } else if (this.TYPE == 'TALLYVIEW') {
      this.valdata = this.valdata.map((item) => {
        return { CODE: item.CODE, NAME: item.NAME.toString(), PNT: item.PNT, CARAT: item.CARAT, CKB: item.CKB }
      })
    } else if (this.TYPE == 'ORDDIS') {
      this.valdata = this.valdata.map((item) => {
        return { code: item.code, name: item.name.toString(), CKB: item.CKB }
      })
    } else if (this.TYPE == 'COMPOP') {
      this.valdata = this.valdata.map((item) => {
        return { code: item.code, name: item.name.toString(), CKB: item.CKB }
      })
    } else if (this.TYPE == 'TYPEPOP') {
      this.valdata = this.valdata.map((item) => {
        return { code: item.code, CKB: item.CKB }
      })
    } else if (this.TYPE == 'HolidayMast') {
      this.valdata = this.valdata.map((item) => {
        return { code: item.code, name: item.name.toString(), CKB: item.CKB }
      })
    } else if (this.TYPE == 'TrpId') {
      this.valdata = this.valdata.map((item) => {
        return { CODE: item.CODE, NAME: item.NAME.toString(), TRPID: item.TRPID, GRP: item.GRP, CKB: item.CKB }
      })
    } else if (this.TYPE == 'TEN') {
      this.valdata = this.valdata.map((item) => {
        return { CODE: item.CODE, CKB: item.CKB }
      })
    }
    // console.log("529", this.valdata)
    let gridFilter = this.gridApi.getFilterModel()
    this.gridApi.setRowData(this.valdata);
    this.gridApi.setFilterModel(gridFilter);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.forEachNode(function (node) {
      node.setSelected(node.data.CKB === true);
    });
  }

  FILTERDATA() {
    this.gridApi.setQuickFilter(this.FILTER);
  }

  onSelectionChanged(event: any) {
    this.selectedRow = event.api.getSelectedRows();
    if (this.TYPE == 'EMPMAST') {
      let L_CODE = this.selectedRow.map((item) => { return item.PRC_CODE })
      this.Result = L_CODE.toString()
    } else if (this.TYPE == 'TALLYVIEW') {
      let L_CODE = this.selectedRow.map((item) => { return item.CODE })
      this.Result = L_CODE.toString()
    } else if (this.TYPE == 'USERMAST') {
      let L_CODE = this.selectedRow.map((item) => { return item.USERID })
      this.Result = L_CODE.toString()
    } else if (this.TYPE == 'PARTY') {
      let P_CODE = this.selectedRow.map((item) => { return item.P_CODE })
      this.Result = P_CODE.toString()
    } else if (this.TYPE == 'ORDDIS') {
      let Res = this.selectedRow.map((item) => { return item.code })
      this.Result = Res.toString()
    } else if (this.TYPE == 'COMPOP') {
      let Res = this.selectedRow.map((item) => { return item.name })
      this.Result = Res.toString()
    } else if (this.TYPE == 'TYPEPOP') {
      let Res = this.selectedRow.map((item) => { return item.code })
      this.Result = Res.toString()
    } else if (this.TYPE == 'HolidayMast') {
      let Res = this.selectedRow.map((item) => { return item.code })
      this.Result = Res.toString()
    } else if (this.TYPE == 'TrpId') {
      let Res = this.selectedRow.map((item) => { return item.TRPID })
      this.Result = Res.toString()
    } else if (this.TYPE == 'TEN') {
      let Res = this.selectedRow.map((item) => { return item.CODE })
      this.Result = Res.toString()
    }
  }

  onFilterChanged(params) {
    // console.log(params)
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let GridRowData = []
    this.gridApi.forEachNode(function (rowNode, index) {
      GridRowData.push(rowNode.data);
    });
    // console.log(GridRowData)
    let selectedRows = this.gridApi.getSelectedRows()
    let nodes = this.gridApi.getSelectedNodes();
    // console.log(selectedRows)
    // nodes.map((it) => {
    //   _GridRowData.map((t, index) => {
    //     if (it.data.PRC_CODE != t.PRC_CODE) {
    //       if (it.rowIndex) {
    //         this.gridApi.getRowNode(it.rowIndex).setSelected(false, false)
    //       }
    //     }
    //   })
    // })
    // console.log(_GridRowData)
    // console.log(nodes)
  }

  Close() {
    this._mdr.close(this.Result);
  }
}
