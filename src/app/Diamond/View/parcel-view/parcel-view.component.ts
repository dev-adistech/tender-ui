import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ViewService } from "src/app/Service/View/view.service";
import { GridFunctions } from "../../_helpers/functions/GridFunctions";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { ListboxComponent } from "../../Common/listbox/listbox.component";
import { ParcelEntService } from "src/app/Service/Transaction/parcel-ent.service";
declare let $: any;

export interface Code {
  code: string;
  name: string;
}

@Component({
  selector: "app-parcel-view",
  templateUrl: "./parcel-view.component.html",
  styleUrls: ["./parcel-view.component.css"],
})
export class ParcelViewComponent implements OnInit {
  @ViewChild("agGrid", { static: true }) agGrid: ElementRef;
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowDatadock;
  public getRowStyleDock;

  public columnDefs1;
  public pinnedBottomRowData;
  public gridApi1;
  public gridColumnApi1;
  public getRowStyle;
  public defaultColDef1;
  public gridOptions1;

  public columnDefsShape;
  public gridApiShape;
  public pinnedBottomRowDataShape;
  public gridColumnApiShape;
  public defaultColDefShape;
  public gridOptionsShape;
  ShapeRowData: any[] = [];
  
  FooterKeyShape = ['NAME','CARAT','PCS','RATE', 'AMT'];
  
  public columnDefsSize;
  public gridApiSize;
  public pinnedBottomRowDataSize;
  public gridColumnApiSize;
  public defaultColDefSize;
  public gridOptionsSize;
  SizeRowData: any[] = [];
  
  public columnDefsColor;
  public gridApiColor;
  public gridColumnApiColor;
  public defaultColDefColor;
  public gridOptionsColor;
  public pinnedBottomRowDataColor;
  ColorRowData: any[] = [];
  
  public columnDefsQua;
  public gridApiQua;
  public gridColumnApiQua;
  public defaultColDefQua;
  public gridOptionsQua;
  public pinnedBottomRowDataQua;
  QuaRowData: any[] = [];
  
  public columnDefsShd;
  public gridApiShd;
  public gridColumnApiShd;
  public defaultColDefShd;
  public gridOptionsShd;
  public pinnedBottomRowDataShd;
  ShdRowData: any[] = [];
  
  public columnDefsCut;
  public gridApiCut;
  public gridColumnApiCut;
  public defaultColDefCut;
  public gridOptionsCut;
  public pinnedBottomRowDataCut;
  CutRowData: any[] = [];
  
  public columnDefsFlo;
  public gridApiFlo;
  public gridColumnApiFlo;
  public defaultColDefFlo;
  public gridOptionsFlo;
  public pinnedBottomRowDataFlo;
  FloRowData: any[] = [];
  
  public columnDefsInc;
  public gridApiInc;
  public gridColumnApiInc;
  public defaultColDefInc;
  public gridOptionsInc;
  public pinnedBottomRowDataInc;
  IncRowData: any[] = [];
  
  public columnDefsLab;
  public gridApiLab;
  public gridColumnApiLab;
  public defaultColDefLab;
  public gridOptionsLab;
  public pinnedBottomRowDataLab;
  LabRowData: any[] = [];

  GridDataForMapping: any[] = [];

  F_DATE: any = "";
  T_DATE: any = "";

  S_CODE: any = "";
  Shapes: Code[] = [];

  DockData: any = [];

  C_CODE: any = "";
  Colors: Code[] = [];

  Q_CODE: any = "";
  Quality: Code[] = [];

  F_CARAT: any = "";
  T_CARAT: any = "";

  DEPTArr: any = [];
  MonthArr: any = [
    {code:1,name:'January'},
    {code:2,name:'February'},
    {code:3,name:'March'},
    {code:4,name:'April'},
    {code:5,name:'May'},
    {code:6,name:'June'},
    {code:7,name:'July'},
    {code:8,name:'August'},
    {code:9,name:'September'},
    {code:10,name:'October'},
    {code:11,name:'November'},
    {code:12,name:'December'},
  ];
  YearArr: any = [
    {code:2023},
    {code:2024},
    {code:2025},
    {code:2026},
    {code:2027},
    {code:2028},
    {code:2029},
    {code:2030},
    {code:2031},
  ];
  MM: any = "";
  YYYY: any = "";
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  agGridWidth: number = 0;
  agGridStyles: string = "";

  agGridWidth1: number = 0;
  agGridStyles1: string = "";

  touchStartTime: number;

  FooterKey = [];
  FooterKey1 = [];
  ISFILTER: boolean = false;
  GRIDON: boolean = false;

  GRIDDATA: any = [];

  ISCHANGED: boolean = false;

  I_CARAT: any = "";
  RTOP: any = "";
  SIZE: any = "";
  AMT: any = "";
  CARAT: any = "";
  RATE: any = "";
  TDIS: any = "";
  RCTS: any = "";
  TRESRVE: any = "";
  T_PCS: any = "";

  HIDEPOL: boolean = false;
  disabledata: boolean = false;
  ADISDISABLE: boolean = true;
  SAVEBTNSHOW: boolean = true;

  ProposalHide: boolean = false;

  constructor(
    public dialog: MatDialog,
    private ParcelEntServ: ParcelEntService,
    private EncrDecrServ: EncrDecrService,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private ViewServ: ViewService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private ViewParaMastServ: ViewParaMastService
  ) {
    this.touchStartTime = 0;

    this.getRowStyle = function (params) {
      if (params.data) {
        if (params.node.rowPinned === "bottom") {
          return { background: "#FFE0C0", "font-weight": "bold" };
        }
      }
    };

    this.getRowStyleDock = function (params) {
      if (params.data) {
        if (params.node.rowPinned === "bottom") {
          return { background: "#FFE0C0", "font-weight": "bold" };
        }
      }
    };

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: false,
    };
    this.defaultColDef1 = {
      resizable: true,
      sortable: true,
      filter: true,
      enableRowGroup: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    };
    this.gridOptions1 = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
    };
    this.FillViewPara();
    this.FillViewPara1();

    let columnDefs = [];
    columnDefs.push({
      headerName: "Shape Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Shape",
				field: "NAME",
				cellStyle: { "text-align": "left" },
				headerClass: "text-center",
        width:64
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:30
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:64
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:68
			},
		]
  })
  this.columnDefsShape = columnDefs

    let columnDefs3 = [];
    columnDefs3.push({
      headerName: "Size Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Size",
				field: "NAME",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:75
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:30
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:60
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:61
			},
		]
  })
  this.columnDefsSize = columnDefs3

    let columnDefsColor = [];
    columnDefsColor.push({
      headerName: "Color Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Color",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:42
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:30
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:60
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
		]
  })
  this.columnDefsColor = columnDefsColor

    let columnDefsQua = [];
    columnDefsQua.push({
      headerName: "Clarity Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Qua",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:42
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:30
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:60
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
		]
  })
  this.columnDefsQua = columnDefsQua

    let columnDefsShd = [];
    columnDefsShd.push({
      headerName: "Shade Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Shade",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsShd = columnDefsShd

    let columnDefsCut = [];
    columnDefsCut.push({
      headerName: "Cut Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Cut",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsCut = columnDefsCut

    let columnDefsFlo = [];
    columnDefsFlo.push({
      headerName: "Fluorescence Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Flo",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:51
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsFlo = columnDefsFlo

    let columnDefsInc = [];
    columnDefsInc.push({
      headerName: "Inclusion Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Inc",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:65
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsInc = columnDefsInc

    let columnDefsLab = [];
    columnDefsLab.push({
      headerName: "Lab Proposal",
      headerClass: "header-align-center",
      width: 30,
      children: [
			{
				headerName: "Lab",
				field: "NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:65
			},
			{
				headerName: "Weight",
				field: "CARAT",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:49
			},
			{
				headerName: "Pcs",
				field: "PCS",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
        width:34
			},
			{
				headerName: "Carat%",
				field: "RATE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:67
			},
			{
				headerName: "Price%",
				field: "AMT",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
        width:74
			},
		]
  })
  this.columnDefsLab = columnDefsLab

		this.defaultColDefShape = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefSize = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefColor = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefQua = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefShd = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefCut = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefFlo = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefInc = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
		this.defaultColDefLab = {
			resizable: true,
			sortable: true,
			filter: true,
      suppressMenu: true,
		}
  }

  DateFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }
  DockClick() {
    if (this.GRIDON === false) {
      this.GRIDON = true;
    } else {
      this.GRIDON = false;
    }
  }

  ngOnInit(): void {
    if (this.decodedTkn.U_CAT == "S") {
      this.ADISDISABLE = false;
      this.SAVEBTNSHOW = true;
      this.HIDEPOL = true;
    } else {
      this.ADISDISABLE = true;
      this.HIDEPOL = false;
      this.SAVEBTNSHOW = false;
    }

    this.Shapes = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME.toString() };
    });
    this.Colors = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME.toString() };
    });
    this.Quality = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME.toString() };
    });
    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
    this.LoadGridData();
  }
  SaveMain(){
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    this.spinner.show();
    this.ParcelEntServ.TendarMastDisSave({
      COMP_CODE: _GridRowData[0].COMP_CODE,
      DETID: _GridRowData[0].DETID,
      ADIS: this.TDIS ? this.TDIS : 0,
      TRESRVE: this.TRESRVE ? this.TRESRVE : 0,
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.toastr.success("Save Successfully");
        } else {
          this.spinner.hide();
          this.toastr.error("Data Not Save");
        }
      } catch {
        this.spinner.hide();
        this.toastr.error("Data Not Save");
      }
    });
  }
  TdisChange() {
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let NewAmt = 0;
    
    for(let i=0;i<_GridRowData.length;i++){
      NewAmt += _GridRowData[i].AMT
    }

    let NewValue = (this.TDIS / 100) * NewAmt;
    let FinalValue = NewAmt + NewValue;
    this.AMT = FinalValue.toFixed(0);
    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT)*100).toFixed(2);
  }

  refresh() {
    this.gridApi1.setSortModel([]);
    this.gridOptions1.api.setFilterModel(null);
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

  Proposal() {
    this.ProposalHide = true;
  }
  CloseProposal() {
    this.ProposalHide = false;
  }

  onCellDoubleClick(eve) {
    this.DockData = eve.data;
    this.NewClear()
    let NewObj = {
      T_DATE: eve.data.T_DATE,
      F_DATE: eve.data.T_DATE,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      MM: this.MM ? this.MM : 0,
      YY: this.YYYY ? this.YYYY : 2024,
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      COMP_CODE: eve.data.COMP_CODE ? eve.data.COMP_CODE : "",
      DETID: eve.data.DETID ? eve.data.DETID : 0,
    };
    this.GRIDON = false;
    this.spinner.show()
    this.ViewServ.ParcelWrkDisp(NewObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.gridApi1.setRowData(FillRes.data[0]);
          this.GridDataForMapping = FillRes.data;
          this._gridFunction.FooterKey = this.FooterKey;
          this.pinnedBottomRowData = this._gridFunction.footerCal(
            FillRes.data[1]
          );
          this.ShapeRowData = FillRes.data[2]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShape = this._gridFunction.footerCal(
            FillRes.data[2]
          );
          this.SizeRowData = FillRes.data[3]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataSize = this._gridFunction.footerCal(
            FillRes.data[3]
          );
          this.ColorRowData = FillRes.data[4]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataColor = this._gridFunction.footerCal(
            FillRes.data[4]
          );
          this.QuaRowData = FillRes.data[5]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataQua = this._gridFunction.footerCal(
            FillRes.data[5]
          );
          this.ShdRowData = FillRes.data[6]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShd = this._gridFunction.footerCal(
            FillRes.data[6]
          );
          this.CutRowData = FillRes.data[7]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataCut = this._gridFunction.footerCal(
            FillRes.data[7]
          );
          this.FloRowData = FillRes.data[8]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataFlo = this._gridFunction.footerCal(
            FillRes.data[8]
          );
          this.IncRowData = FillRes.data[9]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataInc = this._gridFunction.footerCal(
            FillRes.data[9]
          );
          this.LabRowData = FillRes.data[10]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataLab = this._gridFunction.footerCal(
            FillRes.data[10]
          );

          if (FillRes.data[1][0]["AMT"]) {
            this.AMT = FillRes.data[1][0]["AMT"].toFixed(0);
          } else {
            this.AMT = FillRes.data[1][0]["AMT"];
          }
          this.CARAT = FillRes.data[1][0]["CARAT"];
          this.I_CARAT = FillRes.data[1][0]["I_CARAT"];
          if(FillRes.data[1][0]["RPPER"]){
            this.RTOP = FillRes.data[1][0]["RPPER"].toFixed(2);
          }
          if(FillRes.data[1][0]["SIZE"]){
          this.SIZE = FillRes.data[1][0]["SIZE"].toFixed(2);
          }
          this.RATE = FillRes.data[1][0]["RATE"];
          if (FillRes.data[1][0]["RCTS"]) {
            this.RCTS = FillRes.data[1][0]["RCTS"].toFixed(0);
          } else {
            this.RCTS = FillRes.data[1][0]["RCTS"];
          }
          this.TDIS = FillRes.data[1][0]["TDIS"];
          this.TRESRVE = FillRes.data[1][0]["TRESRVE"];
          this.T_PCS = FillRes.data[1][0]["SRNO"];

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
          const widthsArray =
            this.gridColumnApi1.columnController.displayedColumns.map(
              (item) => item.actualWidth
            );
          this.agGridWidth1 = widthsArray.reduce(function (
            previousValue,
            currentValue
          ) {
            return previousValue + currentValue;
          });
          this.agGridWidth1 = 200 + this.agGridWidth1;
          this.agGridStyles1 = `width: ${this.agGridWidth1}px; height: 70vh`;

          this.gridApi1.refreshCells({ force: true });
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
    });
  }

  LoadGridData1() {
    this.NewClear()
    let NewObj = {
      F_DATE: this.F_DATE ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd") : null,
      T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd") : null,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      MM: this.MM ? this.MM : 0,
      YY: this.YYYY ? this.YYYY : 2024,
      DETID: 0,
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
    };
    this.spinner.show()
    this.ViewServ.ParcelWrkDisp(NewObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.gridApi1.setRowData(FillRes.data[0]);
          this._gridFunction.FooterKey = this.FooterKey;
          this.pinnedBottomRowData = this._gridFunction.footerCal(
            FillRes.data[1]
          );
          this.ShapeRowData = FillRes.data[2]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShape = this._gridFunction.footerCal(
            FillRes.data[2]
          );
          this.SizeRowData = FillRes.data[3]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataSize = this._gridFunction.footerCal(
            FillRes.data[3]
          );
          this.ColorRowData = FillRes.data[4]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataColor = this._gridFunction.footerCal(
            FillRes.data[4]
          );
          this.QuaRowData = FillRes.data[5]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataQua = this._gridFunction.footerCal(
            FillRes.data[5]
          );
          this.ShdRowData = FillRes.data[6]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataShd = this._gridFunction.footerCal(
            FillRes.data[6]
          );
          this.CutRowData = FillRes.data[7]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataCut = this._gridFunction.footerCal(
            FillRes.data[7]
          );
          this.FloRowData = FillRes.data[8]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataFlo = this._gridFunction.footerCal(
            FillRes.data[8]
          );
          this.IncRowData = FillRes.data[9]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataInc = this._gridFunction.footerCal(
            FillRes.data[9]
          );
          this.LabRowData = FillRes.data[10]
          this._gridFunction.FooterKey = this.FooterKeyShape;
          this.pinnedBottomRowDataLab = this._gridFunction.footerCal(
            FillRes.data[10]
          );

          if (FillRes.data[1][0]["AMT"]) {
            this.AMT = FillRes.data[1][0]["AMT"].toFixed(0);
          } else {
            this.AMT = FillRes.data[1][0]["AMT"];
          }
          this.CARAT = FillRes.data[1][0]["CARAT"];
          this.I_CARAT = FillRes.data[1][0]["I_CARAT"];
          if(FillRes.data[1][0]["RPPER"]){
            this.RTOP = FillRes.data[1][0]["RPPER"].toFixed(2);
          }
          if(FillRes.data[1][0]["SIZE"]){
          this.SIZE = FillRes.data[1][0]["SIZE"].toFixed(2);
          }
          this.RATE = FillRes.data[1][0]["RATE"];
          if (FillRes.data[1][0]["RCTS"]) {
            this.RCTS = FillRes.data[1][0]["RCTS"].toFixed(0);
          } else {
            this.RCTS = FillRes.data[1][0]["RCTS"];
          }
          this.TDIS = FillRes.data[1][0]["TDIS"];
          this.TRESRVE = FillRes.data[1][0]["TRESRVE"];
          this.T_PCS = FillRes.data[1][0]["SRNO"];
          
          const agBodyViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          const agBodyHorizontalViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(
              ".ag-body-horizontal-scroll-viewport"
            );
          this.gridApi1.refreshCells({ force: true });
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
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
  }
  onGridReadyShape(params) {
    this.gridApiShape = params.api;
    this.gridColumnApiShape = params.columnApi;
  }

  onGridReadySize(params) {
    this.gridApiSize = params.api;
    this.gridColumnApiSize = params.columnApi;
  }
  onGridReadyColor(params) {
    this.gridApiColor = params.api;
    this.gridColumnApiColor = params.columnApi;
  }

  onGridReadyQua(params) {
    this.gridApiQua = params.api;
    this.gridColumnApiQua = params.columnApi;
  }

  onGridReadyShd(params) {
    this.gridApiShd = params.api;
    this.gridColumnApiShd = params.columnApi;
  }

  onGridReadyCut(params) {
    this.gridApiCut = params.api;
    this.gridColumnApiCut = params.columnApi;
  }

  onGridReadyFlo(params) {
    this.gridApiFlo = params.api;
    this.gridColumnApiFlo = params.columnApi;
  }

  onGridReadyInc(params) {
    this.gridApiInc = params.api;
    this.gridColumnApiInc = params.columnApi;
  }
  onGridReadyLab(params) {
    this.gridApiLab = params.api;
    this.gridColumnApiLab = params.columnApi;
  }

  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "ParcelWrkDisp" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY");
            let ViewParaRowData = [];
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {};
              jsonData["headerName"] = GroupData[i].GROUPKEY;
              jsonData["headerClass"] = "header-align-center";
              let tempData = [];

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    color: GroupData[i].Data[j].FONTCOLOR,
                    "font-weight":
                      GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  rowSpan: this.rowSpy.bind(this),
                  suppressMenu: true,
                  cellClass: function (params) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.colDef.field == "TOTAL") {
                        return "cell-span1 cell-center";
                      }
                      if (params.colDef.field == "RCTS") {
                        return "cell-span1 cell-center";
                      }
                      if (params.colDef.field == "I_CARAT") {
                        return "cell-span1 cell-center";
                      }
                    }
                  },
                });

                if (GroupData[i].Data[j].FIELDNAME === "MPER") {
                  tempData[j].editable =
                    this.decodedTkn.U_CAT === "P" ||
                    this.decodedTkn.U_CAT === "S"
                      ? true
                      : false;
                }

                if (i == 0 && j == 0) {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FIELDNAME === "SRNO") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FIELDNAME === "RPPER") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter = this._convFunction.NumberFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.TwoFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.ThreeFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer =
                    this._convFunction.DateFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer =
                    this._convFunction.TimeFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat;
                }
                this._gridFunction.FooterKey = this.FooterKey;
                if (GroupData[i].Data[j].FIELDNAME !== "MPER") {
                  tempData[j].cellStyle = this.ColColor.bind(this);
                }
              }

              jsonData["children"] = tempData;
              tempData = [];
              ViewParaRowData.push(jsonData);
            }

            this.columnDefs1 = ViewParaRowData;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      }
    );
  }

  ColColor(params) {
    if (params.node.rowPinned === "bottom") {
      return;
    }
    if (params.colDef.field === "LAB_NAME") {
      if (params.data.LAB_NAME === "IGI") {
        return { background: "#78f587" };
      } else if (params.data.LAB_NAME === "HRD") {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "S_NAME") {
      if (params.data.S_NAME !== "ROUND" && params.data.S_NAME) {
        return { background: "#ffff9e" };
      }
    } else if (params.colDef.field === "CT_NAME") {
      if (params.data.CT_NAME == "VG") {
        return { background: "#8db6fc" };
      } else if (params.data.CT_NAME == "GD") {
        return { background: "#fc6a6a" };
      } else if (params.data.CT_NAME == "FR") {
        return { background: "#f09c9c" };
      }
    } else if (params.colDef.field === "Q_NAME") {
      if (params.data.Q_NAME == "FL") {
        return { background: "#f09c9c" };
      } else if (params.data.Q_NAME == "IF") {
        return { background: "#fc6a6a" };
      }
    } else if (params.colDef.field === "FL_NAME") {
      if (params.data.FL_NAME == "FAINT") {
        return { background: "#78f587" };
      } else if (params.data.FL_NAME == "MEDIUM") {
        return { background: "#ffff9e" };
      } else if (params.data.FL_NAME == "STRONG") {
        return { background: "#8db6fc" };
      } else if (params.data.FL_NAME == "VERY STRONG") {
        return { background: "#aac0e6" };
      }
    } else if (params.colDef.field === "ML_NAME") {
      if (params.data.ML_NAME == "H-MILKY") {
        return { background: "#a3a2a2" };
      } else if (params.data.ML_NAME == "L-MILKY") {
        return { background: "#e3e3e3" };
      }
    } else if (params.colDef.field === "SH_NAME") {
      if (params.data.SH_NAME == "VL-BRN") {
        return { background: "#C4A484" };
      } else if (params.data.SH_NAME == "L-BRN") {
        return { background: "#d9c6b4" };
      } else if (params.data.SH_NAME == "MIX-T") {
        return { background: "#acfaa5" };
      }
    }
  }
  FillViewPara1() {
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "ParcelWrk" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY");
            let ViewParaRowData = [];
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {};
              jsonData["headerName"] = GroupData[i].GROUPKEY;
              jsonData["headerClass"] = "header-align-center";
              let tempData = [];

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    color: GroupData[i].Data[j].FONTCOLOR,
                    "font-weight":
                      GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  // rowSpan: this.rowSpy.bind(this),
                  suppressMenu: true,
                });

                if (i == 0 && j == 0) {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter = this._convFunction.NumberFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.TwoFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey1.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.ThreeFloatFormat;
                  tempData[j].aggFunc = "sum";
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer = this.DateFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer = this.TimeFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat;
                }
                this._gridFunction.FooterKey = this.FooterKey1;
              }

              jsonData["children"] = tempData;
              tempData = [];
              ViewParaRowData.push(jsonData);
            }

            this.columnDefs = ViewParaRowData;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      }
    );
  }

  OnCellEditingStart(params) {
    if (params.event.keyCode === 13) {
      if (params.colDef.field == "MPER") {
        if (
          parseFloat(params.data.MPER) >= params.data.PER + 10 ||
          parseFloat(params.data.MPER) <= params.data.PER - 10
        ) {
          this.gridApi1.stopEditing({
            rowIndex: params.rowIndex,
            colKey: "MPER",
          });
          this.gridApi1.setFocusedCell(params.rowIndex + 1, "MPER");
          this.gridApi1.startEditingCell({
            rowIndex: params.rowIndex + 1,
            colKey: "MPER",
          });
          Swal.fire({
            title: "Are you Sure You Want To Update",
            icon: "warning",
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.value) {
              if (params.value) {
                this.gridApi1.refreshCells({ force: true });
                this.ISCHANGED = true;
                let SaveObj = {
                  MPER: params.data.MPER,
                  COMP_CODE: params.data.COMP_CODE ? params.data.COMP_CODE : "",
                  DETID: params.data.DETID ? params.data.DETID : 0,
                  SRNO: params.data.SRNO ? params.data.SRNO : 0,
                  PLANNO: params.data.PLANNO ? params.data.PLANNO : 0,
                  PTAG: params.data.PTAG ? params.data.PTAG : "",
                  MUSER: this.decodedTkn.UserId,
                };
                this.ViewServ.PricingWrkMperSave(SaveObj).subscribe(
                  (SaveRes) => {
                    try {
                      if (SaveRes.success == true) {
                        this.spinner.hide();
                        this.toastr.success("Save successfully.");
                      } else {
                        this.spinner.hide();
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: JSON.stringify(SaveRes.data),
                        });
                      }
                    } catch (err) {
                      this.spinner.hide();
                      this.toastr.error(err);
                    }
                  }
                );
              }
            } else {
              this.ISCHANGED = false;
              params.data.MPER = 0;
              this.gridApi1.refreshCells({ force: true });
              this.gridApi1.stopEditing({
                rowIndex: params.rowIndex + 1,
                colKey: "MPER",
              });
              this.gridApi1.setFocusedCell(params.rowIndex, "MPER");
              this.gridApi1.startEditingCell({
                rowIndex: params.rowIndex,
                colKey: "MPER",
              });
            }
          });
        } else {
          if (params.value) {
            this.ISCHANGED = true;
            let SaveObj = {
              MPER: params.data.MPER,
              COMP_CODE: params.data.COMP_CODE ? params.data.COMP_CODE : "",
              DETID: params.data.DETID ? params.data.DETID : 0,
              SRNO: params.data.SRNO ? params.data.SRNO : 0,
              PLANNO: params.data.PLANNO ? params.data.PLANNO : 0,
              PTAG: params.data.PTAG ? params.data.PTAG : "",
              MUSER: this.decodedTkn.UserId,
            };

            this.ViewServ.PricingWrkMperSave(SaveObj).subscribe((SaveRes) => {
              try {
                if (SaveRes.success == true) {
                  this.spinner.hide();
                  this.toastr.success("Save successfully.");
                  this.gridApi1.stopEditing({
                    rowIndex: params.rowIndex,
                    colKey: "MPER",
                  });
                  this.gridApi1.refreshCells({ force: true });
                  this.gridApi1.setFocusedCell(params.rowIndex + 1, "MPER");
                  this.gridApi1.startEditingCell({
                    rowIndex: params.rowIndex + 1,
                    colKey: "MPER",
                  });
                } else {
                  this.spinner.hide();
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.stringify(SaveRes.data),
                  });
                }
              } catch (err) {
                this.spinner.hide();
                this.toastr.error(err);
              }
            });
          }
        }
      }
    }
  }

  rowSpy(params) {
    let SubData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });

    if (SubData.length != 0 && params.colDef.field == "TOTAL") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.TOTAL == SubData[params.node.rowIndex].TOTAL) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.TOTAL != SubData[previousIndex].TOTAL) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.TOTAL == SubData[i].TOTAL) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    } else if (SubData.length != 0 && params.colDef.field == "RCTS") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.RCTS == SubData[params.node.rowIndex].RCTS) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.RCTS != SubData[previousIndex].RCTS) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.RCTS == SubData[i].RCTS) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    } else if (SubData.length != 0 && params.colDef.field == "I_CARAT") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT == SubData[params.node.rowIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.I_CARAT == SubData[i].I_CARAT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT != SubData[previousIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.I_CARAT == SubData[i].I_CARAT) {
              mergeIndex += 1;
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
  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        });
      }

      return rv;
    }, []);
  }

  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Shapes, CODE: this.S_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.S_CODE = result;
    });
  }
  OpenColor() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Colors, CODE: this.C_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.C_CODE = result;
    });
  }
  OpenQua() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30% !important",
      data: { arr: this.Quality, CODE: this.Q_CODE, TYPE: "ORDDIS" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.Q_CODE = result;
    });
  }

  NewClear(){
    this.AMT=''
    this.CARAT=''
    this.I_CARAT=''
    this.SIZE=''
    this.RTOP=''
    this.RATE=''
    this.RCTS =''
    this.TDIS = ''
    this.TRESRVE=''
    this.T_PCS = ''
  }

  Clear() {
    this.F_DATE = null;
    this.T_DATE = null;
    this.S_CODE = "";
    this.C_CODE = "";
    this.Q_CODE = "";
    this.F_CARAT = 0;
    this.T_CARAT = 0;
    this.gridApi1.setRowData([]);
  }

  LoadGridData() {
    this.ViewServ.ParcelgWrk({
      F_DATE: this.F_DATE ? this.datepipe.transform(this.F_DATE, "yyyy-MM-dd") : null,
      T_DATE: this.T_DATE ? this.datepipe.transform(this.T_DATE, "yyyy-MM-dd") : null,
      S_CODE: this.S_CODE ? this.S_CODE : "",
      C_CODE: this.C_CODE ? this.C_CODE : "",
      Q_CODE: this.Q_CODE ? this.Q_CODE : "",
      F_CARAT: this.F_CARAT ? this.F_CARAT : 0,
      T_CARAT: this.T_CARAT ? this.T_CARAT : 0,
      MM: this.MM ? this.MM : 0,
      YY: this.YYYY ? this.YYYY : 2024,
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.GRIDDATA = FillRes.data;
          this._gridFunction.FooterKey = this.FooterKey1;
          this.pinnedBottomRowDatadock = this._gridFunction.footerCal(
            FillRes.data
          );
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
    });
  }
  getContextMenuItems(params) {
    let inputText = "";
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
          params.context.thisComponent.ISFILTER =
            !params.context.thisComponent.ISFILTER;
          var tempColumnDefs =
            params.context.thisComponent.gridApi1.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu;
            });
          });
          params.context.thisComponent.columnDefs1 = tempColumnDefs;
        },
        // cssClasses: ['redFont', 'bold'],
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export",
    ];
    return result;
  }
  TimeFormat(params) {
    if (params.value) {
      return this.datepipe.transform(params.value, "hh:mm a", "UTC+0");
    } else {
      return "";
    }
  }

  oncellValueChanged(eve) {
    if (this.ISCHANGED === true) {
      let SubData = [];
      this.gridApi1.forEachNode(function (rowNode, index) {
        SubData.push(rowNode.data);
      });
      let MERGEDATA = [];
      for (let i = 0; i < SubData.length; i++) {
        if (
          SubData[i].TOTAL == eve.data.TOTAL &&
          SubData[i].RCTS === eve.data.RCTS
        ) {
          MERGEDATA.push(SubData[i]);
        }
      }
      let NewAMT = 0;
      for (let i = 0; i < MERGEDATA.length; i++) {
        if (MERGEDATA[i].PLN == eve.data.PLN) {
          let carat = MERGEDATA[i].CARAT;
          let Orap = MERGEDATA[i].ORAP;
          let Mprevalue;
          if (parseFloat(MERGEDATA[i].MPER)) {
            Mprevalue = parseFloat(MERGEDATA[i].MPER);
          } else {
            Mprevalue = MERGEDATA[i].PER;
          }
          let newArray;
          let FinalValue = 0;
          let NewSum = 0;
          newArray = (Mprevalue / 100) * Orap;
          FinalValue = Orap - newArray;
          NewSum = FinalValue * carat;
          MERGEDATA[i].RATE = FinalValue;
          MERGEDATA[i].AMT = NewSum;
          NewAMT += NewSum;
        } else {
          NewAMT += MERGEDATA[i].AMT;
        }
      }
      for (let i = 0; i < MERGEDATA.length; i++) {
        MERGEDATA[i].TOTAL = NewAMT;
        let NewPer = 0;
        NewPer = MERGEDATA[i].TOTAL / MERGEDATA[i].I_CARAT;
        MERGEDATA[i].RCTS = NewPer.toFixed(0);
      }
      this.gridApi1.refreshCells({ force: true });
    }
    let _GridRowData = [];
    this.gridApi1.forEachNode(function (rowNode, index) {
      _GridRowData.push(rowNode.data);
    });
    let NewAmt = 0;
    
    for(let i=0;i<_GridRowData.length;i++){
      NewAmt += _GridRowData[i].AMT
    }

    let NewValue = (this.TDIS / 100) * NewAmt;
    let FinalValue = NewAmt + NewValue;
    this.AMT = FinalValue.toFixed(0);
    this.RATE = (this.AMT / this.CARAT).toFixed(2);
    this.RCTS = (this.AMT / this.I_CARAT).toFixed(0);
    this.RTOP = ((this.CARAT / this.I_CARAT)*100).toFixed(2);
  }
}
