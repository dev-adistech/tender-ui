import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { GridFunctions } from 'src/app/Diamond/_helpers/functions/GridFunctions';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { StoneDetailViewComponent } from '../../stone-detail-view/stone-detail-view.component';
declare function tabs(params: any): any;
declare var $: any

@Component({
  selector: 'app-stoneid-popup',
  templateUrl: './stoneid-popup.component.html',
  styleUrls: ['./stoneid-popup.component.css']
})
export class StoneidPopupComponent implements OnInit {

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public pinnedBottomRowData;
  public getRowStyle;
  public gridOptions;

  data: any[] = []
  GlobfilteredData: any = {}
  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _gridFunction: GridFunctions,
    private elementRef: ElementRef,
    private EncrDecrServ: EncrDecrService,
    private _convFunction: ConverterFunctions,
    public dialog: MatDialog,
    private _mdr: MatDialogRef<StoneidPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) { 

    this.columnDefs = [
			{
				headerName: "StoneId",
				field: "STONEID",
				cellStyle: { "text-align": "right" },
				headerClass: "text-center",
				width:65
			},
			{
				headerName: "Shape",
				field: "S_NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:71
			},
			{
				headerName: "Color",
				field: "C_NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:58
			},
			{
				headerName: "Qua",
				field: "Q_NAME",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:58
			},
			{
				headerName: "Flo",
				field: "FL_CODE",
				cellStyle: { "text-align": "center" },
				headerClass: "text-center",
				width:58
			},
		]

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    }

    this.data = dataMain.Res

    this.getRowStyle = function (params) {
      if (params.node.rowPinned === 'bottom') {
        return { 'background': '#FFE0C0', 'font-weight': 'bold' };
      }
    }
    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
  }

  async LoadGridData() {
    if (this.data) {
      try {
        
          this.gridApi.setRowData(this.data);

      } catch (err) {
        console.log(err)
        this.toastr.error(err)
      }
    }
  }

  ngOnInit(): void {
  }

  onCellDoubleClicked(eve){
    console.log(eve)
    localStorage.setItem("SVDPID", eve.data.STONEID);

    const dialogRef = this.dialog.open(StoneDetailViewComponent, {
      panelClass: "marker-acc-view-det-dialog",
      autoFocus: false,
      width: "100%",
      disableClose: true,
      height: "calc(100vh - 2%)",
    })

    $("#Close").click()
    dialogRef.afterClosed().subscribe((result) => { })
  }
  CLOSE(){
    this._mdr.close()
  }

}
