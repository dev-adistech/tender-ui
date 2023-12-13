import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import { ViewService } from 'src/app/Service/View/view.service';
import Swal from 'sweetalert2';
import { GridFunctions } from '../../_helpers/functions/GridFunctions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bid-data',
  templateUrl: './bid-data.component.html',
  styleUrls: ['./bid-data.component.css']
})
export class BidDataComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";
  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;

  FooterKey = []


  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public gridOptions;
  public pinnedBottomRowData
  public getRowStyle

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private ViewServ :ViewService,
    private datePipe: DatePipe,
    private _gridFunction: GridFunctions,
    private ViewParaMastServ : ViewParaMastService
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
    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this }
    }
    this.getRowStyle = function (params) {
      if (params.data) {
        if (params.node.rowPinned === 'bottom') {
          return { 'background': '#FFE0C0', 'font-weight': 'bold' };
        }
      }
    };
    this.FillViewPara()
   }

  ngOnInit(): void {
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
  }

  GETDETID() {
    this.DETID=''
    this.T_DATE=null
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.DETIDarr = FillRes.data.filter(item => item.ISACTIVE == true).map(item => {
              return { code: item.DETID, date: this.datePipe.transform(item.T_DATE,'yyyy-MM-dd'), name: item.T_NAME };
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(FillRes.data),
            });
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );
  }

  GETNAME() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.COMP_NAME = this.DEPTArr.filter(
          (x) => x.code == this.COMP_CODE
        )[0].name;
      } else {
        this.COMP_NAME = "";
      }
    } else {
      this.COMP_NAME = "";
    }
  }
  GETDATE() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_DATE = this.DETIDarr.filter((x) => x.code == this.DETID)[0].date;
      } else {
        this.DETID = "";
      }
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_NAME = this.DETIDarr.filter((x) => x.code == this.DETID)[0].name;
      }
    } else {
      this.DETID = "";
    }
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'BidDataView' }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          let GroupData = this.groupByArray(VPRes.data, "GROUPKEY")
          let ViewParaRowData = []
          for (let i = 0; i < GroupData.length; i++) {
            let jsonData = {}
            jsonData["headerName"] = GroupData[i].GROUPKEY
            jsonData["headerClass"] = "header-align-center"
            let tempData = []

            for (let j = 0; j < GroupData[i].Data.length; j++) {
              tempData.push({
                headerName: GroupData[i].Data[j].DISPNAME,
                headerClass: GroupData[i].Data[j].HEADERALIGN,
                field: GroupData[i].Data[j].FIELDNAME,
                width: GroupData[i].Data[j].COLWIDTH,
                cellStyle: {
                  "text-align": GroupData[i].Data[j].CELLALIGN,
                  "background-color": GroupData[i].Data[j].BACKCOLOR,
                  "color":GroupData[i].Data[j].FONTCOLOR,
                  "font-weight":GroupData[i].Data[j].ISBOLD ===true? 'bold':''
                },
                resizable: GroupData[i].Data[j].ISRESIZE,
                
                GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                hide: GroupData[i].Data[j].DISP == false ? true : false,
                pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                suppressMenu: true,
              })

              if (GroupData[i].Data[j].FIELDNAME === 'SRNO' || GroupData[i].Data[j].FIELDNAME === 'I_CARAT' || GroupData[i].Data[j].FIELDNAME === 'FAMT') {
                this.FooterKey.push(GroupData[i].Data[j].FIELDNAME)
              }
            }

            jsonData["children"] = tempData
            tempData = []
            ViewParaRowData.push(jsonData)
          }

          this.columnDefs = ViewParaRowData
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.stringify(VPRes.data),
          })
        }
      } catch (error) {
        console.log(error)
        this.toastr.error(error)
      }
    })
  }
  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY]

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY)

      if (el) {
        el.Data.push(x)
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        })
      }

      return rv
    }, [])
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  LoadGridData(){
    let FillObj ={
      COMP_CODE:this.COMP_CODE ? this.COMP_CODE:'',
      DETID:this.DETID ? this.DETID:0
    }
    this.spinner.show();
    this.ViewServ.BidDataView(FillObj).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.gridApi.setRowData(FillRes.data)
            const agBodyViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(".ag-body-viewport");
            const agBodyHorizontalViewport: HTMLElement =
              this.elementRef.nativeElement.querySelector(
                ".ag-body-horizontal-scroll-viewport"
              );
            if (agBodyViewport) {
              const psV = new PerfectScrollbar(agBodyViewport);
              psV.update();
            }
            if (agBodyHorizontalViewport) {
              const psH = new PerfectScrollbar(agBodyHorizontalViewport);
              psH.update();
            }
            if (agBodyViewport) {
              const ps = new PerfectScrollbar(agBodyViewport);
              const container = document.querySelector(".ag-body-viewport");
              ps.update();
            }
            this._gridFunction.FooterKey = this.FooterKey
            this.pinnedBottomRowData = this._gridFunction.footerCal(FillRes.data)
            this.spinner.hide()
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(FillRes.data),
            });
          }
        } catch (error) {
          this.spinner.hide();
          this.toastr.error(error);
        }
      }
    );
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
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu
            })
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
