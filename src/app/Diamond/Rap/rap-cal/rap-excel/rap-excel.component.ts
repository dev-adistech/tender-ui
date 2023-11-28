import { DatePipe } from "@angular/common";
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConverterFunctions } from "src/app/Diamond/_helpers/functions/ConverterFunctions";
import { GridFunctions } from "src/app/Diamond/_helpers/functions/GridFunctions";
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import { RapCalcService } from 'src/app/Service/Rap/rap-calc.service';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { RapCalComponent } from "../rap-cal.component";
export interface Emp {
  name: string;
  code: string;
}
@Component({
  selector: 'app-rap-excel',
  templateUrl: './rap-excel.component.html',
  styleUrls: ['./rap-excel.component.css']
})

export class RapExcelComponent implements OnInit {

  public url = environment.BaseUrl
  public port = environment.PORT

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

  public columnDefs
  public gridApi
  public gridColumnApi
  public defaultColDef
  public getRowStyle
  public gridOptions

  F_CARAT: any = ''
  T_CARAT: any = ''

  L_CODE: any = ''
  FSRNO: any = ''
  TSRNO: any = ''
  F_DATE: any = null
  T_DATE: any = null

  lotCtrl: FormControl;
  filteredLots: Observable<any[]>;
  lotArray: Emp[] = [];
  GridDataForMapping: any[] = []

  GridHeader = []
  FooterKey = []
  FooterValue = []
  GridFooter: any[] = []
  SKDEXCEL: boolean = false;

  ISFILTER: boolean = false

  constructor(
    private EncrDecrServ: EncrDecrService,
    private RapCalcServ: RapCalcService,
    private elementRef: ElementRef,
    private ViewParaMastServ: ViewParaMastService,
    private _convFunction: ConverterFunctions,
    private _gridFunction: GridFunctions,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mdr: MatDialogRef<RapCalComponent>,
  ) {
    this.lotCtrl = new FormControl();

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    }

    this.gridOptions = {
      // columnDefs: this.columnDefs,
      // rowData: this.rowData,
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }

    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "FRMRAPTENDAR" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            this.GridHeader = VPRes.data.map((item) => {
              return item.FIELDNAME
            })


            let temp = []

            for (let i = 0; i < VPRes.data.length; i++) {
              if (VPRes.data[i].FIELDNAME == 'LINK') {
                temp.push({
                  headerName: 'Link',
                  cellStyle: { 'text-align': 'center' },
                  // suppressMenu: true,
                  cellRenderer: function (params) {
                    if (params.node.rowPinned != "bottom") {
                      if (!params.data.LINK) {
                        return null;
                      }
                      return '<i class="icon-video grid-icon" data-action-type="OpenVideo" style="cursor: pointer;" ></i>';
                    }
                  },
                  headerClass: "text-center",
                  editable: false,
                  width: 60
                })
              } else {
                temp.push({
                  headerName: VPRes.data[i].DISPNAME,
                  headerClass: VPRes.data[i].HEADERALIGN,
                  field: VPRes.data[i].FIELDNAME,
                  width: VPRes.data[i].COLWIDTH,
                  cellStyle: { "text-align": VPRes.data[i].CELLALIGN, },
                  resizable: VPRes.data[i].ISRESIZE,
                  hide: VPRes.data[i].DISP == false ? true : false,
                  rowSpan: rowSpy.bind(this),
                  suppressMenu: true,
                  cellClass: function (params) {
                    if (params.node.rowPinned != 'bottom') {
                      if (params.colDef.field == 'TOTAL') {
                        return 'cell-span1 cell-center'
                      }
                      if (params.colDef.field == 'RCTS') {
                        return 'cell-span1 cell-center'
                      }
                    }
                  },
                })
              }
              if (i == 0) {
                this.FooterKey.push(VPRes.data[i].FIELDNAME)
              }
              if (VPRes.data[i].FORMAT == "#0") {
                this.FooterKey.push(VPRes.data[i].FIELDNAME)
                temp[i].valueFormatter = this._convFunction.NumberFormat
              } else if (VPRes.data[i].FORMAT == "#0.00") {
                this.FooterKey.push(VPRes.data[i].FIELDNAME)
                temp[i].valueFormatter = this._convFunction.TwoFloatFormat
              } else if (VPRes.data[i].FORMAT == "#0.000") {
                this.FooterKey.push(VPRes.data[i].FIELDNAME)
                temp[i].valueFormatter = this._convFunction.ThreeFloatFormat
              } else if (VPRes.data[i].FORMAT == "DateFormat") {
                temp[i].cellRenderer = this._convFunction.DateFormat.bind(this)
                delete temp[i].valueFormatter
              } else if (VPRes.data[i].FORMAT == "TimeFormat") {
                temp[i].cellRenderer = this._convFunction.TimeFormat.bind(this)
                delete temp[i].valueFormatter
              } else {
                temp[i].valueFormatter = this._convFunction.StringFormat
              }
              this._gridFunction.FooterKey = this.FooterKey
              temp[i].cellStyle = this.cellColor.bind(this)
            }

            this.columnDefs = temp
            this.gridOptions.columnDefs = temp
            temp = []
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            })
          }
        } catch (error) {
          this.toastr.error(error)
        }
      }
    )

    function rowSpy(params) {
      if (this.GridDataForMapping.length != 0 && params.colDef.field == "TOTAL") {
        if (params.node.rowIndex == 0) {
          let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
          if (params.data.TOTAL == this.GridDataForMapping[params.node.rowIndex].TOTAL) {
            let mergeIndex = 0
            for (let i = params.node.rowIndex; i < this.GridDataForMapping.length; i++) {
              if (params.data.TOTAL == this.GridDataForMapping[i].TOTAL) {
                mergeIndex += 1
              } else {
                break;
              }
            }
            return mergeIndex;
          } else {
            return 0;
          }
        } else {
          let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
          if (params.data.TOTAL != this.GridDataForMapping[previousIndex].TOTAL) {
            let mergeIndex = 0
            for (let i = params.node.rowIndex; i < this.GridDataForMapping.length; i++) {
              if (params.data.TOTAL == this.GridDataForMapping[i].TOTAL) {
                mergeIndex += 1
              } else {
                break;
              }
            }
            return mergeIndex;
          } else {
            return 0;
          }
        }
      } else if (this.GridDataForMapping.length != 0 && params.colDef.field == "RCTS") {
        if (params.node.rowIndex == 0) {
          let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
          if (params.data.RCTS == this.GridDataForMapping[params.node.rowIndex].RCTS) {
            let mergeIndex = 0
            for (let i = params.node.rowIndex; i < this.GridDataForMapping.length; i++) {
              if (params.data.RCTS == this.GridDataForMapping[i].RCTS) {
                mergeIndex += 1
              } else {
                break;
              }
            }
            return mergeIndex;
          } else {
            return 0;
          }
        } else {
          let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
          if (params.data.RCTS != this.GridDataForMapping[previousIndex].RCTS) {
            let mergeIndex = 0
            for (let i = params.node.rowIndex; i < this.GridDataForMapping.length; i++) {
              if (params.data.RCTS == this.GridDataForMapping[i].RCTS) {
                mergeIndex += 1
              } else {
                break;
              }
            }
            return mergeIndex;
          } else {
            return 0;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    let temp = this.decodedMast[48].map((it) => {
      if (it.SKEY === "EXCELTYP"){
        if (it.SVALUE == 'SKD'){
          this.SKDEXCEL = true
        } else {

          this.SKDEXCEL = false;
        }
      } else {
        this.SKDEXCEL = false;
      }
    })

    let ExcelObj = {
      L_CODE: this.L_CODE,
      FSRNO: 0,
      TSRNO: 0,
      F_DATE: "",
      T_DATE: "",
      TYPE: 'LOT'
    }
    this.RapCalcServ.TendarExcel(ExcelObj).subscribe((LRes) => {
      try {
        if(LRes.success == 1) {

          this.lotArray = LRes.data.map(item => {
            return { code: item.L_CODE };
          });
          this.filteredLots = this.lotCtrl.valueChanges
            .pipe(
              startWith(''),
              map(lot => lot ? this.filterLots(lot) : this.lotArray)
            );
        }
      } catch(err) {
        console.log(err)
      }
    })
    // this.SHOW()
  }

  filterLots(code: string) {
    return this.lotArray.filter(
      shp => shp.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

  onGridReady(params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    // this.LoadGridData()
  }

  onGridRowClicked(eve: any) {
    let actionType = eve.event.target.getAttribute("data-action-type");

    if (actionType == "OpenVideo") {
      if (eve.data.LINK) {
        const videoUrl = eve.data.LINK;
        window.open(videoUrl, '_blank');
      }
    }
  }

  cellColor(params) {
    if (params.data) {
      if (!params.node.pinned) {

        if (params.colDef.field == 'SHADE') {
          if (params.data.SHADE == 'VL-BRN') {
            return { background: '#f2dcdb' }
          }
          if (params.data.SHADE == 'L-BRN') {
            return { background: '#da9694' }
          }
          if (params.data.SHADE == 'D-BRN') {
            return { background: '#963634' }
          }
          if (params.data.SHADE == 'MIX-T') {
            return { background: '#e26b0a' }
          }
        }

        if (params.colDef.field == 'CUT') {
          if (params.data.CUT == 'GD' || params.data.CUT == 'FT') {
            return { background: '#ff0000' }
          }
          if (params.data.CUT == 'VG') {
            return { background: '#92d050' }
          }
        }

        if (params.colDef.field == 'MILKY') {

          if (params.data.MILKY == 'L-MILKY') {
            return { background: '#c4bd97' }
          }
          if (params.data.MILKY == 'H-MILKY') {
            return { background: '#948a54' }
          }
        }

        if (params.colDef.field == 'FLO') {

          if (params.data.FLO == 'NONE') {
            return { background: '#dce6f1' }
          }
          if (params.data.FLO == 'FA') {
            return { background: '#c5d9f1' }
          }
          if (params.data.FLO == 'ME') {
            return { background: '#95b3d7' }
          }
          if (params.data.FLO == 'ST') {
            return { background: '#538dd5' }
          }
          if (params.data.FLO == 'VE') {
            return { background: '#366092' }
          }
        }
      }
    }
  }

  SHOW() {
    let FillObj = {
      L_CODE: this.L_CODE,
      FSRNO: this.FSRNO ? this.FSRNO : 0,
      TSRNO: this.TSRNO ? this.TSRNO : 0,
      F_DATE: this.F_DATE ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd") : "",
      T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd") : "",
      TYPE: 'SHOW',
      F_CARAT: this.F_CARAT  ? this.F_CARAT  : 0,
      T_CARAT: this.T_CARAT  ? this.T_CARAT : 0
    }

    this.RapCalcServ.TendarExcel(FillObj).subscribe(async (FillRes) => {
      try {
        if (FillRes.success == true) {

          this.GridDataForMapping = FillRes.data
          this.gridApi.setRowData(FillRes.data)

          // setTimeout(() => {
          //   this.gridApi.redrawRows();
          //   this.gridApi.refreshCells({ force: true })
          // }, 100);

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
        }
      } catch (error) {
        this.toastr.error(error)
      }
    })
  }

  TENDER() {
    let FillObj = {
      L_CODE: this.L_CODE,
      FSRNO: this.FSRNO ? this.FSRNO : 0,
      TSRNO: this.TSRNO ? this.TSRNO : 0,
      // F_DATE: this.F_DATE ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd") : "",
      // T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd") : "",
      F_DATE: this.F_DATE ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd") : null,
      T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd") : null,
      TYPE: 'EXCEL',
      SETTING: JSON.stringify(this.decodedMast[48])
    }

    // this.RapCalcServ.TendarExcelDownload(FillObj).subscribe(async (FillRes) => {
    //   try {
    // if (FillRes.success == true) {
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST";
    mapForm.action = this.SKDEXCEL ? `http://${this.url}:${this.port}/api/RapCalc/TendarExcelDownloadSKD` : `http://${this.url}:${this.port}/api/RapCalc/TendarExcelDownload`;

    let obj = {
      SheetName: 'RapTenDar',
    }

    Object.keys(FillObj).forEach(function (param) {
      if (FillObj[param]) {
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = param;
        mapInput.setAttribute("value", FillObj[param]);
        mapForm.appendChild(mapInput);
      }
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
    //     } else {
    //       this.toastr.warning('Something went wrong while downloading excel.')
    //     }
    //   } catch (error) {
    //     this.toastr.error(error)
    //   }
    // })
  }

  onFilterChanged(event) {
      let _GridRowData = []
      this.gridApi.forEachNodeAfterFilter(function (rowNode, index) {
        _GridRowData.push(rowNode.data);
      });
      // this._gridFunction.FooterKey = this.FooterKey
      // this.pinnedBottomRowData = this._gridFunction.footerCal(_GridRowData)
      const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
      if (agBodyViewport) {
        const ps = new PerfectScrollbar(agBodyViewport);
        const container = document.querySelector('.ag-body-viewport');
        container.scrollTop = 0;
        ps.update();
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
            // if(grpHeader.children){
            //   grpHeader.children.map((ClmHeader) => {
            //     ClmHeader.suppressMenu = !ClmHeader.suppressMenu
            //   })
            // }
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
