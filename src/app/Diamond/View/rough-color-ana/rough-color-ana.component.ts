import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { ConverterFunctions } from '../../_helpers/functions/ConverterFunctions';
import { GridFunctions } from '../../_helpers/functions/GridFunctions';
import { ViewService } from 'src/app/Service/View/view.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { MatDialog } from '@angular/material/dialog';
import { ListboxComponent } from '../../Common/listbox/listbox.component';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

export interface Code {
  code: string;
  name: string;
}
@Component({
  selector: 'app-rough-color-ana',
  templateUrl: './rough-color-ana.component.html',
  styleUrls: ['./rough-color-ana.component.css']
})
export class RoughColorAnaComponent implements OnInit {

  decodeHelper = new JwtHelperService()
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"))
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

  GridDataForMapping: any[] = []

  F_DATE:any =''
  T_DATE:any =''

  S_CODE:any=''
  Shapes: Code[] = [];
  
  LAB:any=''
  Labs: Code[] = [];
  
  C_CODE:any =''
  Colors:Code[]=[];

  Q_CODE:any=''
  Quality:Code[]=[]

  CT_CODE:any=''
  CutArr:Code[]=[]

  FINAL:any=''
  RESULT:any=''
  MacColor:Code[]=[]
  
  FLO:any=''
  FLONO:Code[]=[]

  MACFLO:any=''
  MACFLONO:Code[]=[]

  MACCOM:any=''
  Comment:Code[]=[]

  F_CARAT:any=''
  T_CARAT:any=''

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  public columnDefs;
  public pinnedBottomRowData
  public gridApi;
  public gridColumnApi;
  public getRowStyle
  public defaultColDef;
  public gridOptions;

  ContainWidth:string=`width:100%`;

  videoSrc:any=''
  VIDEOON:boolean = false

  constructor(
    public dialog: MatDialog,
    private EncrDecrServ: EncrDecrService,
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private ViewServ :ViewService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private toastr: ToastrService,
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
      if (!params.data.TAG) {
        return { background: "#FFE0C0" };
      }
    }
    this.FillViewPara()
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnInit(): void {
    this.Shapes = this.decodedMast[15].map(item => {
      return {code: item.S_CODE, name: item.S_NAME.toString(),}
    });
    this.Colors = this.decodedMast[12].map(item => {
      return {code: item.C_CODE, name: item.C_NAME.toString(),}
    });
    this.Quality = this.decodedMast[5].map(item => {
      return {code: item.Q_CODE, name: item.Q_NAME.toString(),}
    });
    this.CutArr = this.decodedMast[3].map(item => {
      return {code: item.CT_CODE, name: item.CT_NAME.toString(),}
    });
    this.MacColor = this.decodedMast[17].map(item => {
      return {code: item.MC_CODE, name: item.MC_NAME.toString(),}
    });
    this.FLONO = this.decodedMast[19].map(item => {
      return {code: item.NFL_CODE, name: item.NFL_NAME.toString(),}
    });
    this.MACFLONO = this.decodedMast[18].map(item => {
      return {code: item.MFL_CODE, name: item.MFL_NAME.toString(),}
    });
    this.Comment = this.decodedMast[20].map(item => {
      return {code: item.MCOM_NAME, name:item.MCOM_NAME.toString(),}
    });
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
    this.Labs = this.decodedMast[28].map((item) => {
      return { code: item.LAB};
    });
  }

  OpenLab() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Labs, CODE: this.LAB, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.LAB = result
    });
  }
  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Shapes, CODE: this.S_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.S_CODE = result
    });
  }
  OpenColor() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Colors, CODE: this.C_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.C_CODE = result
    });
  }
  OpenQua() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Quality, CODE: this.Q_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.Q_CODE = result
    });
  }
  OpenCut() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.CutArr, CODE: this.CT_CODE, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.CT_CODE = result
    });
  }
  OpenFinal() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.MacColor, CODE: this.FINAL, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.FINAL = result
    });
  }
  OpenResult() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.MacColor, CODE: this.RESULT, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.RESULT = result
    });
  }
  OpenFloNo() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.FLONO, CODE: this.FLO, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.FLO = result
    });
  }
  OpenMacFlo() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.MACFLONO, CODE: this.MACFLO, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.MACFLO = result
    });
  }
  OpenMacCom() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30% !important', data: { arr: this.Comment, CODE: this.MACCOM, TYPE: 'ORDDIS' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
      this.MACCOM = result
    });
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
  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: 'ColAnalysis' }).subscribe((VPRes) => {
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
              if (GroupData[i].Data[j].FIELDNAME == 'LINK') {
                tempData.push({
                  headerName: 'Link',
                  cellStyle: { 'text-align': 'center' },
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
                  width: 60,
                  rowSpan: this.rowSpy.bind(this),
                  suppressMenu: true,
                  cellClass: function (params) {
                      if (params.node.rowPinned != 'bottom') {
                        if (params.colDef.headerName == 'Link') {
                          return 'cell-span1 cell-center'
                        }
                      }
                    }
                })
              }else{
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    "color":GroupData[i].Data[j].FONTCOLOR
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  suppressMenu: true,
                })
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
  rowSpy(params) {
    let SubData = []
    this.gridApi.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });

    if (SubData.length != 0 && params.colDef.headerName == "Link") {
      if (params.node.rowIndex == 0) {
        let previousIndex = params.node.rowIndex != 0 ? params.node.rowIndex - 1 : params.node.rowIndex
        if (params.data.LINK == SubData[params.node.rowIndex].LINK) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.LINK == SubData[i].LINK) {
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
        if (params.data.LINK != SubData[previousIndex].LINK) {
          let mergeIndex = 0
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.LINK == SubData[i].LINK) {
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
  Clear(){
  this.S_CODE = ''
  this.C_CODE = ''
  this.Q_CODE = ''
  this.CT_CODE = ''
  this.F_CARAT = ''
  this.T_CARAT = ''
  this.FINAL = ''
  this.RESULT = ''
  this.FLO = ''
  this.MACFLO = ''
  this.MACCOM = ''
  this.COMP_CODE = ''
  this.COMP_NAME = ''
  this.LAB=''
  this.gridApi.setRowData([])
  }
  LoadGridData(){
    let FillObj ={
      COMP_CODE:this.COMP_CODE ? this.COMP_CODE:'',
      DETID:0,
      S_CODE:this.S_CODE ? this.S_CODE :'',
      C_CODE:this.C_CODE ? this.C_CODE :'',
      Q_CODE:this.Q_CODE ? this.Q_CODE :'',
      CT_CODE:this.CT_CODE ? this.CT_CODE :'',
      F_CARAT:this.F_CARAT ? this.F_CARAT :0,
      T_CARAT:this.T_CARAT ? this.T_CARAT :0,
      FINAL:this.FINAL ? this.FINAL :'',
      RESULT:this.RESULT ? this.RESULT :'',
      FLNO:this.FLO ? this.FLO :'',
      MACHFL:this.MACFLO ? this.MACFLO :'',
      COMENT:this.MACCOM ? this.MACCOM :'',
      LAB:this.LAB ? this.LAB:''
    }
    this.spinner.show();
    this.ViewServ.ColAnalysis(FillObj).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.gridApi.setRowData(FillRes.data)
            this.spinner.hide()
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
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export"
    ];
    return result;
  }
  OnCellClick(eve){
    const target = eve.event.target;
    if (target !== undefined) {
    const actionType = target.getAttribute("data-action-type");
    if(actionType === 'OpenVideo'){
      this.VIDEOON = true
      this.videoSrc = eve.data.LINK
    }
  }
  }
  CLOSE(){
    this.VIDEOON = false
    this.videoSrc = ''
  }
  Video(){
    this.VIDEOON = true
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
}
