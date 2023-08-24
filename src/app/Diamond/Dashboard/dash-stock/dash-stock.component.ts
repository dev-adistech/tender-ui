import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { Subscription } from 'rxjs';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";
import { ConverterFunctions } from '../../_helpers/functions/ConverterFunctions';
import { GridFunctions } from '../../_helpers/functions/GridFunctions';
import { DashboardService } from './../../../Service/Dashboard/dashboard.service';
import { groupDashstckRenderer } from './groupdashstock.component';
@Component({
  selector: 'app-dash-stock',
  templateUrl: './dash-stock.component.html',
  styleUrls: ['./dash-stock.component.css']
})
export class DashStockComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));

  clickEventsubscription: Subscription;
  public url = environment.BaseUrl
  public port = environment.PORT


  public columnDefs
  public gridApi
  public gridColumnApi
  public defaultColDef
  public pinnedBottomRowData
  public frameworkComponents
  public rowSelection
  // public getRowStyle
  public gridOptions

  public rowGroupPanelShow = 'always';
  public autoGroupColumnDef;
  public groupDisplayType;
  public groupRowRendererParams;
  public suppressDragLeaveHidesColumns = false;
  public suppressMakeColumnVisibleAfterUnGroup = false;
  public suppressRowGroupHidesColumns = false;
  public groupIncludeFooter = true;
  public groupIncludeTotalFooter = false;
  public suppressScrollOnNewData = true;

  EMP_CODE: any = '';
  PNT: any = 0;
  GRP: any = '';
  ORDTYP: any = 'A';

  GridHeader = []
  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []
  CHECKBOX: any[] = []
  DISABLE: boolean = false

  TICKEVALUE: any[] = []

  data: any[] = []
  GlobfilteredData: any = {}

  ISFILTER: boolean = false

  sum: number = 0;
  count: number = 0;
  average: number = 0;
  summaryHeader: string = '';
  summaryToggle: boolean = false;

  selectedRow1: any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private DashboardServ: DashboardService,
    private datePipe: DatePipe,
    private ViewParaMastServ: ViewParaMastService,
    private elementRef: ElementRef,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
  ) {

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      enableRowGroup: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    }

    // this.getRowStyle = function (params) {
    //   if (params.node.rowPinned == 'bottom') {
    //     return { background: '#FFE0C0', 'font-weight': 'bold' };
    //   }
    // }

    this.autoGroupColumnDef = {
      minWidth: 900,
      headerName: 'Group',
      cellRendererParams: {
        footerValueGetter: (params: any) => {
          // this.gridApi.refreshCells({ force: true })
          // this.gridApi.redrawRows()
          return 'Total';
        },
        innerRenderer: 'groupDashstockRenderer',
        suppressCount: true,
      },
    }
    this.frameworkComponents = { groupDashstockRenderer: groupDashstckRenderer };

    this.groupRowRendererParams = {
      innerRenderer: 'groupDashstockRenderer',
      suppressCount: true,
    };


    this.gridOptions = {
      // columnDefs: this.columnDefs,
      // rowData: this.rowData,
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
    }

  }

  getRowStyle(params: any) {
    if (params.data.isSelected) {
      return { background: '#f5df', };
    }
    return null;
  }

  ngOnInit(): void {
    this.PNT = this.decodedTkn.PNT
    this.spinner.hide()
    this.FillViewPara()
  }

  closeChild(componentName) {
    this.DashboardServ.sendClickEvent(componentName);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  // FillViewPara() {
  //   this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'DashStock' }).subscribe((VPRes) => {
  //     try {
  //       if (VPRes.success == 1) {
  //         this.GridHeader = VPRes.data.map((item) => { return item.FIELDNAME })

  //         let temp = []

  //         for (let i = 0; i < VPRes.data.length; i++) {
  //           temp.push({
  //             headerName: VPRes.data[i].DISPNAME,
  //             headerClass: VPRes.data[i].HEADERALIGN,
  //             field: VPRes.data[i].FIELDNAME,
  //             width: VPRes.data[i].COLWIDTH,
  //             cellStyle: { 'text-align': VPRes.data[i].CELLALIGN },
  //             resizable: VPRes.data[i].ISRESIZE,
  //             hide: VPRes.data[i].DISP == false ? true : false,
  //             suppressMenu: true
  //           })

  //           if (i == 0) { this.FooterKey.push(VPRes.data[i].FIELDNAME) }
  //           if (VPRes.data[i].FORMAT == '#0') {
  //             this.FooterKey.push(VPRes.data[i].FIELDNAME)
  //             temp[i].valueFormatter = this._convFunction.NumberFormat
  //             temp[i].aggFunc = 'sum'
  //           } else if (VPRes.data[i].FORMAT == '#0.00') {
  //             this.FooterKey.push(VPRes.data[i].FIELDNAME)
  //             temp[i].valueFormatter = this._convFunction.TwoFloatFormat
  //             temp[i].aggFunc = 'sum'
  //           } else if (VPRes.data[i].FORMAT == '#0.000') {
  //             this.FooterKey.push(VPRes.data[i].FIELDNAME)
  //             temp[i].valueFormatter = this._convFunction.ThreeFloatFormat
  //             temp[i].aggFunc = 'sum'
  //           } else if (VPRes.data[i].FORMAT == 'DateFormat') {
  //             temp[i].cellRenderer = this._convFunction.DateFormat.bind(this)
  //             delete temp[i].valueFormatter
  //           } else if (VPRes.data[i].FORMAT == 'TimeFormat') {
  //             temp[i].cellRenderer = this._convFunction.TimeFormat.bind(this)
  //             delete temp[i].valueFormatter
  //           } else {
  //             temp[i].valueFormatter = this._convFunction.StringFormat
  //           }
  //           // console.log(this.FooterKey)
  //           this._gridFunction.FooterKey = this.FooterKey
  //         }

  //         this.columnDefs = temp
  //         this.gridOptions.columnDefs = temp
  //         temp = []

  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: JSON.stringify(VPRes.data),
  //         })
  //       }
  //     } catch (error) {
  //       this.toastr.error(error)
  //     }
  //   })
  // }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'DashStock' }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          this.GridHeader = VPRes.data.map((item) => { return item.FIELDNAME })

          let temp = []
          let op = this;
          for (let i = 0; i < VPRes.data.length; i++) {
            if (VPRes.data[i].COLUMNSTYLE == 'CheckBox') {
              this.CHECKBOX.push(VPRes.data[i].FIELDNAME)
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerclass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { 'text-align': VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
                cellRenderer: (params) => {
                  if (params.data) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.data[VPRes.data[i].FIELDNAME] == 1) {
                        return '<input type="checkbox" data-action-type="' + VPRes.data[i].FIELDNAME + '" checked>';
                      } else {
                        return '<input type="checkbox" data-action-type="' + VPRes.data[i].FIELDNAME + '" >';
                      }
                    }
                  }
                },
              })
            } else {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerclass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { 'text-align': VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true
              })
            }
            if (i == 0) { this.FooterKey.push(VPRes.data[i].FIELDNAME) }
            if (VPRes.data[i].FORMAT == '#0') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this.NumberFormat
              temp[i].aggFunc = 'sum'
            } else if (VPRes.data[i].FORMAT == '#0.00') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this.TwoFloatFormat
              temp[i].aggFunc = 'sum'

            } else if (VPRes.data[i].FORMAT == '#0.000') {
              this.FooterKey.push(VPRes.data[i].FIELDNAME)
              temp[i].valueFormatter = this.ThreeFloatFormat
              temp[i].aggFunc = 'sum'

            } else if (VPRes.data[i].FORMAT == 'DateFormat') {
              temp[i].cellRenderer = this.DateFormat.bind(this)
              delete temp[i].valueFormatter
            } else if (VPRes.data[i].FORMAT == 'TimeFormat') {
              temp[i].cellRenderer = this.TimeFormat.bind(this)
              delete temp[i].valueFormatter
            } else {
              temp[i].valueFormatter = this.StringFormat
            }
            this._gridFunction.FooterKey = this.FooterKey
          }
          // const columnIndexToPush = 15;

          // temp.splice(columnIndexToPush, 0, {
          //   headerName: 'Action',
          //   cellStyle: { 'text-align': 'center' },
          //   cellRenderer: function (params) {
          //     if (params.node.rowPinned != "bottom") {

          //       let a = '<span class="det_val">';
          //       a = a + '<svg class="grid-icon icon-save" data-action-type="SaveData" > <use data-action-type="SaveData" xlink: href = "assets/symbol-defs.svg#icon-save" > </use> </svg>'
          //       //a = a + '<i class="icon-edit grid-icon" data-action-type="EditData" style="cursor: pointer;margin-right: 5px;" ></i>'
          //       a = a + '</span>';
          //       return a;
          //     }
          //   },
          //   headerClass: "text-center",
          //   editable: false,
          //   filter: false,
          //   width: 50
          // });

          this.columnDefs = temp
          this.gridOptions.columnDefs = temp

          for (let i = 0; i < this.columnDefs.length; i++) {
            if (this.columnDefs[i].headername == 'Date') {
              this.columnDefs[i].cellRenderer = this._convFunction.DateFormat.bind(this)
            }
            if (this.columnDefs[i].headername == 'Time') {
              this.columnDefs[i].cellRenderer = this._convFunction.TimeFormat.bind(this)
            }
          }
        } else {
          this.toastr.error(JSON.stringify(VPRes.data))
        }
      } catch (error) {
        this.toastr.error(error)
      }
    })
  }

  onRowClick(eve) {
    let actionType = eve.event.target.getAttribute("data-action-type");
    if (actionType) {
      if (actionType !== "SaveData") {
        let dataObj = eve.data;
        for (let i = 0; i < this.CHECKBOX.length; i++) {
          for (let key in dataObj) {
            if (key === this.CHECKBOX[i]) {
              if (key !== actionType) {
                dataObj[key] = false;
              }
            }
          }
        }
        dataObj[actionType] = !dataObj[actionType];
        eve.node.setData(dataObj);
        eve.api.refreshCells({ force: true });
        this.TICKEVALUE.push(eve.data)
        let _GridRowData = []
        this.gridApi.forEachNode(function (rowNode, index) {
          if (eve.rowIndex === index) {
            _GridRowData.push(rowNode.data);
          }
        });

        let KEYARR1
        let newarr1 = eve.data
        for (let i = 0; i < this.CHECKBOX.length; i++) {
          for (let key in newarr1) {
            if (key === this.CHECKBOX[i]) {
              if (newarr1[key] !== false) {
                KEYARR1 = key
              }
            }
          }
        }

        let FillObj = {
          LOT: eve.data.L_CODE,
          SRNO: eve.data.SRNO,
          TAG: eve.data.TAG,
          TPROC_CODE: eve.data.TPROC_CODE,
          PRC_TYP: ""
        }

        this.spinner.show()
        this.DashboardServ.DashStkConfSave(FillObj).subscribe((FillRes) => {

          try {
            if (FillRes.success == true) {
              this.spinner.hide()
            } else {
              this.spinner.hide()
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: JSON.stringify(FillRes.data.originalError.info.message),
              })
              newarr1[KEYARR1] = false
              eve.api.refreshCells({ force: true });
            }
          } catch (error) {
            this.spinner.hide()
            this.toastr.error(error)
          }
        })
      }
    }
    if (actionType === "SaveData") {
    //   if (eve.data.hasOwnProperty("SAVED") && eve.data.SAVED) {
    //     return this.toastr.warning("Already saved")
    //   }
    //   let KEYARR
    //   let newarr = eve.data
    //   for (let i = 0; i < this.CHECKBOX.length; i++) {
    //     for (let key in newarr) {
    //       if (key === this.CHECKBOX[i]) {
    //         if (newarr[key] !== false) {
    //           KEYARR = key
    //         }
    //       }
    //     }
    //   }
    //   let SaveObj = {
    //     L_CODE: eve.data.L_CODE,
    //     SRNO: eve.data.SRNO,
    //     TAG: eve.data.TAG,
    //     DETID: eve.data.DETID,
    //     PRC_TYP: "",
    //     TPROC_CODE: KEYARR,
    //     EMP_CODE: eve.data.EMP_CODE,
    //     IUSER: this.decodedTkn.UserId,
    //     ICOMP: this.decodedTkn.UserId,
    //   };

    //   this.spinner.show()
    //   this.DashboardServ.DashStockConfSave(SaveObj).subscribe((SaveRes) => {
    //     try {
    //       if (SaveRes.success == true) {
    //         this.spinner.hide()
    //         this.toastr.success('Save successfully.')
    //         eve.data.SAVED = true;
    //         eve.api.refreshCells({ force: true });
    //         console.log(eve)
    //       } else {
    //         this.spinner.hide()
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Oops...',
    //           text: JSON.stringify(SaveRes.data.originalError.info.message),
    //         })
    //         newarr[KEYARR] = false
    //         eve.api.refreshCells({ force: true });
    //         return
    //       }
    //     } catch (err) {
    //       this.spinner.hide()
    //       this.toastr.error(err)
    //       return
    //     }
    //   })
    }
  }

  SAVE(){
    let _GridRowData = []
    this.gridApi.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    // console.log("454!@#$%^&*()",_GridRowData)

    let FinalArray = []
    let KEYARR
    for(let i=0;i<_GridRowData.length;i++){
      if(_GridRowData[i].P === true){
        FinalArray.push({..._GridRowData[i],KEYARR:"P"})
      }
      if( _GridRowData[i]['4P'] === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"4P"})
      } 
      if(_GridRowData[i].B === true){
        FinalArray.push({..._GridRowData[i],KEYARR:"B"})
      }
      if(_GridRowData[i].G === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"G"})
      }
      if(_GridRowData[i].L === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"L"})
      }
      if(_GridRowData[i].M === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"M"})
      }
      if(_GridRowData[i].MC === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"MC"})
      }
      if(_GridRowData[i].N1 === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"N1"})
      }
      if(_GridRowData[i].TC === true ) {
        FinalArray.push({..._GridRowData[i],KEYARR:"TC"})
      }
    }
    // console.log(FinalArray)
    let PerArr = [];
    for (let i = 0; i < FinalArray.length; i++) {
      let SaveObj = {
        L_CODE: FinalArray[i].L_CODE,
        SRNO: FinalArray[i].SRNO,
        TAG: FinalArray[i].TAG,
        DETID: FinalArray[i].DETID,
        PRC_TYP: "",
        TPROC_CODE: FinalArray[i].KEYARR,
        EMP_CODE: FinalArray[i].EMP_CODE,
        IUSER: this.decodedTkn.UserId,
        ICOMP: this.decodedTkn.UserId,
      };
      PerArr.push(SaveObj);
  }
    this.spinner.show()
    this.DashboardServ.DashStockConfSave(PerArr).subscribe((SaveRes) => {
      try {
        if (SaveRes.success == true) {
          this.spinner.hide()
          if (SaveRes.data.length > 0) {
            this.toastr.success('Save successfully.')
            let _GridRowData = []
            this.gridApi.forEachNode(function (rowNode, index) {
              _GridRowData.push(rowNode.data);
            });
            let fillData = []

            for (let i = 0; i < SaveRes.data.length; i++) {
              fillData.push(SaveRes.data[i][0])
            }
            for (let i = 0; i < _GridRowData.length; i++) {
              for (let j = 0; j < fillData.length; j++) {
                if (_GridRowData[i].L_CODE === fillData[j].L_CODE && _GridRowData[i].SRNO === fillData[j].SRNO && _GridRowData[i].TAG === fillData[j].TAG && _GridRowData[i].DETID === fillData[j].DETID) {
                  _GridRowData[i].NPRC_NAME = fillData[j].NPRC_NAME
                  _GridRowData[i].NPROC_CODE = fillData[j].NPROC_CODE
                  _GridRowData[i].NPRC_TYP = fillData[j].NPRC_TYP
                }
              }
            }
            this.gridApi.refreshCells({ force: true });
            this.LoadGridData();
          }
          this.gridApi.deselectAll();
          if (SaveRes.Err.length > 0) {
            let message = []
            for (let i = 0; i < SaveRes.Err.length; i++) {
              message.push(SaveRes.Err[i].originalError.info.message)
            }
            this.spinner.hide()
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: JSON.stringify(message),
            })
            return
          }
        }
      } catch (err) {
        this.spinner.hide()
        this.toastr.error(err)
        return
      }
    })
  }

  onSelectionChanged(eve : any) {
    console.log("555",eve)
    this.gridApi.setRowSelectionEnabled(true);
    const selectedRows = this.gridApi.getSelectedRows();
    (document.querySelector('#selectedRows') as any).innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }

  NumberFormat(params) {
    if (params.value != "NaN" && params.value != null) {
      return parseInt(params.value)
    } else {
      return ""
    }
  }

  TwoFloatFormat(params) {
    if (params.value != "NaN" && (params.value != null && params.value != "")) {
      return parseFloat(params.value).toFixed(2)
    } else {
      return "0.00"
    }
  }

  ThreeFloatFormat(params) {
    if (params.value != "NaN" && (params.value != null && params.value != "")) {
      return parseFloat(params.value).toFixed(3)
    } else {
      return "0.000"
    }
  }

  StringFormat(params) {
    if (params.value != "NaN" && params.value != null) {
      return params.value
    } else {
      return ""
    }
  }

  DateFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "dd-MM-yyyy")
    } else {
      return ""
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "hh:mm a", "UTC+0")
    } else {
      return ""
    }
  }

  onFilterChanged(event) {
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    this._gridFunction.FooterKey = this.FooterKey
    this.pinnedBottomRowData = this._gridFunction.footerCal(_GridRowData)
    const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
    if (agBodyViewport) {
      const ps = new PerfectScrollbar(agBodyViewport);
      const container = document.querySelector('.ag-body-viewport');
      container.scrollTop = 0;
      ps.update();
    }
  }

  PRINT() {
    let _GridRowData = []
    this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
      // console.log("444",rowNode)
      _GridRowData.push(rowNode.data);
    });
    let rowdata = []
    this.gridApi.getModel().rootNode.childrenAfterSort.forEach(node => rowdata.push(node.data))
    try {
      var mapForm = document.createElement("form");
      mapForm.target = "myIframe";
      mapForm.method = "POST";

      mapForm.action = `http://${this.url}:${this.port}/api/Report/ReportPrint`;

      let obj = {
        Data: JSON.stringify(rowdata),
        mrtname: "DashStockPrn",
      }

      Object.keys(obj).forEach(function (param) {
        if (obj[param]) {
          var mapInput = document.createElement("input");
          mapInput.type = "hidden";
          mapInput.name = param;
          mapInput.setAttribute("value", obj[param]);
          mapForm.appendChild(mapInput);
        }
      });

      document.body.appendChild(mapForm);
      mapForm.submit();
      document.body.removeChild(mapForm);
    } catch (err) {
      console.log(err)
    }
  }

  shouldDisableField() {
    if (this.decodedTkn.U_CAT === "U" && this.decodedTkn.DEPT_CODE === "POI" && this.decodedTkn.PNT !== 0) {
      return true
    }
    return false;
  }

  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    return filterModel;
  }

  LoadGridData() {
    let FillObj = {
      EMP_CODE: this.decodedTkn.UserId,
      PNT: this.PNT,
      GRP: this.GRP,
      ORDTYP: this.ORDTYP,
    }

    this.spinner.show()
    this.DashboardServ.DashStockFill(FillObj).subscribe((FillRes) => {

      try {
        if (FillRes.success == true) {
          this.spinner.hide()

          let gridFilter = this.gridApi.getFilterModel()

          this.gridApi.setRowData(FillRes.data);
          this.gridApi.setFilterModel(gridFilter); // set Filter
          this._gridFunction.FooterKey = this.FooterKey
          this.pinnedBottomRowData = this._gridFunction.footerCal(FillRes.data)

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

  closeSummary() {
    this.summaryToggle = false
  }

  onRangeSelectionChanged(eve: any) {
    if (eve.started === false && eve.finished === true) {
      // console.log(eve)
      // console.log(this.gridApi.getSelectedRows())
      // console.log(this.gridApi.getCellRanges())
      // console.log(`Start row: ${this.gridApi.getCellRanges()[0].startRow.rowIndex} - End row: ${this.gridApi.getCellRanges()[0].endRow.rowIndex}`)
      // console.log(this.gridApi)

      const colId = this.gridApi.getCellRanges()[0].startColumn.colId
      const colLength = this.gridApi.getCellRanges()[0].columns.length
      const startIndex = this.gridApi.getCellRanges()[0].startRow.rowIndex
      const endIndex = this.gridApi.getCellRanges()[0].endRow.rowIndex
      const selecteData = []


      if (startIndex < endIndex) {
        for (let index = endIndex; index >= startIndex; index--) {

          const temp = this.gridApi.getDisplayedRowAtIndex(index).data[colId];
          selecteData.push(temp)
        }
      } else {
        for (let index = endIndex; index <= startIndex; index++) {
          const temp = this.gridApi.getDisplayedRowAtIndex(index).data[colId];
          selecteData.push(temp)
        }
      }


      // console.log(`${colId}-${startIndex}-${endIndex}`)
      //  console.log(this.gridApi.getDisplayedRowAtIndex(startIndex));
      //  console.log(this.gridApi.getDisplayedRowAtIndex(endIndex));
      // for (let index = startIndex; index <= endIndex; index++) {
      //   // console.log(this.gridApi.getDisplayedRowAtIndex(index).data);
      //   const temp = this.gridApi.getDisplayedRowAtIndex(index).data[colId];
      //   selecteData.push(temp)
      // }
      // console.log(selecteData)
      // selecteData.map
      this.sum = selecteData.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      });
      // console.log(typeof this.sum)
      if (typeof this.sum === 'number' && colLength === 1) {
        this.summaryToggle = true
        this.summaryHeader = colId
        this.count = selecteData.length
        this.average = parseFloat((this.sum / this.count).toFixed(2))

        // alert(`
        //   Sum: ${this.sum}
        //   Count: ${this.count}
        //   Average: ${this.average}
        // `)
      } else {
        colLength > 1 && this.toastr.warning('Select only one column to get summary.')
        typeof this.sum !== 'number' && this.toastr.warning('Select valid column to get summary.')
      }

    }
  }

  getContextMenuItems(params) {
    let inputText = '';
    if (params.context.thisComponent.ISFILTER == true) {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck" checked>`;
    } else {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck">`;
    }
    var result = [
      {
        // custom item
        name: inputText,
        action: () => {
          params.context.thisComponent.ISFILTER = !params.context.thisComponent.ISFILTER
          var tempColumnDefs = params.context.thisComponent.gridApi.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.suppressMenu = !grpHeader.suppressMenu
          })
          params.context.thisComponent.columnDefs = tempColumnDefs
        }
        // cssClasses: ['redFont', 'bold'],
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export"
    ];
    return result;
  }

}
