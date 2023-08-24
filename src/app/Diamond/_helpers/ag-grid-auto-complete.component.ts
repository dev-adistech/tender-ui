import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-auto-complete',
  encapsulation: ViewEncapsulation.None,
  host: {
    style: `position: absolute;
					left: 0px;
					top: 0px;
					background-color: transparant;
          width: 170px;
					` },
  //   style: `
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   background-color: transparent;
  //   width: 100%;
  //   height: 100%;

  // `
  // },
  template: `
		<input #input
			[(ngModel)]="inputValue"
			(ngModelChange)="processDataInput($event)"
			style=" height: 28px; font-weight: 700; font-size: 10px; "
			[style.width]="params.column.actualWidth + 'px'">
		<ag-grid-angular
			style="font-weight: 700; font-size:50px; position: absolute; width: 100%;"
			[style.height]="gridHeight + 'px'"
			[style.max-width]="gridWidth + 'px'"
			class="ag-theme-balham"
      [ngClass]="rowTop >= 100 ? 'grid-popup' : ''"
			[rowData]="rowData"
			[columnDefs]="columnDefs"
			[rowSelection]="rowSelection"
			(gridReady)="onGridReady($event)"
			(rowClicked)="rowClicked($event)"
      (onCellvalueChange)="cellValueChanged($event)"
      >

		</ag-grid-angular>
	`
})
export class AgGridAutoCompleteComponent implements ICellEditorAngularComp, AfterViewInit {
  // variables for agGrid
  public params: any;
  public gridApi: any;
  public rowData: any;
  public columnDefs: [{}];
  public rowSelection: string = 'single';
  public columnFilter: any;
  public gridColumnApi: any;
  // variables for component
  public returnObject: boolean;
  public cellValue: string;
  public filteredRowData: any;
  public inputValue: string;
  public apiEndpoint: string;
  public gridHeight: number = 175;
  public gridWidth: number = 375;
  public useApi: boolean;
  public propertyName: string;
  public isCanceled: boolean = true;
  public selectedObject: any = {}
  public rowTop: any = 0

  @ViewChild("input") input: ElementRef;

  constructor(private httpClient: HttpClient) { }


  ngAfterViewInit() {
    window.setTimeout(() => {
      if (this.inputValue == this.cellValue) {
        this.input.nativeElement.select();
      } else {
        this.input.nativeElement.focus();
      }
      if (this.inputValue && !this.useApi) this.updateFilter();
    })

  }


  // ICellEditorAngularComp functions
  agInit(params: any): void {
    this.params = params;
    this.rowTop = this.params.node.rowTop
    // console.log('params--auto', this.params)
    this.inputValue = ''
    if (params.value) {
      if (params.value.code == '') {

        this.inputValue = ''
      } else {
        this.inputValue = params.value
      }
    } else {
      this.inputValue = ''

    }

    if (!params.rowData) {
      this.apiEndpoint = params.apiEndpoint;
      this.useApi = true;
      this.rowData = [{}]
    } else {
      this.rowData = params.rowData;
    }
    if (params.gridHeight) this.gridHeight = params.gridHeight;
    if (params.gridWidth) this.gridWidth = params.gridWidth;
    this.columnDefs = params.columnDefs;
    this.propertyName = params.propertyRendered;
    this.cellValue = params.value[this.propertyName];
    this.returnObject = params.returnObject;

    if (!params.charPress) {
      if (this.cellValue) this.inputValue = this.cellValue;
    } else {
      this.inputValue = params.charPress;
    }
  }

  getValue(): any {
    if (!this.returnObject) return this.selectedObject[this.propertyName];
    return this.selectedObject;
  }
  isPopup(): boolean {
    return true;
  }
  isCancelAfterEnd(): boolean {
    return this.isCanceled
  }

  // ag-Grid functions
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
    this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
  }

  // component functions
  rowClicked(params: any) {
    this.selectedObject = params.data;
    this.isCanceled = false;
    this.params.api.stopEditing();
  }

  rowConfirmed() {
    if (!this.inputValue && !this.gridApi.getSelectedRows()[0]) {
      this.ClearInputValue()
    } else {
      if (this.gridApi.getSelectedRows()[0]) {
        this.selectedObject = this.gridApi.getSelectedRows()[0];
        this.isCanceled = false;
      }
    }
    this.params.api.stopEditing();
  }

  // Clear Input Value
  ClearInputValue() {
    let ClearObject = new Map();
    this.gridColumnApi.getAllDisplayedColumns().forEach((element: any) => {
      ClearObject.set(element.colId, '')
    });
    // ClearObject =  Object.fromEntriesfromEntries(ClearObject)
    this.selectedObject = ClearObject;
    this.isCanceled = false;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: any): any {
    event.stopPropagation();
    if (event.key == "Escape") {
      this.params.api.stopEditing();
      return false;
    }
    if (event.key == "Enter" || event.key == "Tab") {
      this.rowConfirmed();
      return false;
    }
    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      this.navigateGrid();
      return false;
    }
  }

  cellValueChanged(eve) {
    // console.log(eve)
  }

  processDataInput(event: any) {

    if (this.useApi) {
      if (event.length == 0) this.gridApi.setRowData();
      if (event.length == 2) {
        this.getApiData(event).subscribe(data => {
          this.rowData = data;
          setTimeout(() => { this.updateFilter() });
        });
      };
      if (event.length > 2) this.updateFilter();
    } else {
      this.updateFilter();
    }
  }

  getApiData(filter: any) {
    return this.httpClient.get(this.apiEndpoint + this.toQueryString(filter));
  }

  toQueryString(filter: any) {
    return "?" + this.propertyName + "=" + filter;
  }

  updateFilter() {

    let x = this.inputValue
    let y
    this.columnFilter.setModel({
      type: 'startsWith',
      filter: this.inputValue,
    });
    this.columnFilter.onFilterChanged();
    if (!this.inputValue) return this.gridApi.deselectAll()
    if (this.gridApi.getDisplayedRowAtIndex(0)) {
      this.gridApi.forEachNode(function (rowNode, index) {
        if (typeof (rowNode.data.code) === 'number') {
          if (x == rowNode.data.code) {
            y = index
            return
          } else if (x != rowNode.data.code) {
            return
          }
        } else if (typeof (rowNode.data.code) === 'string') {
          if (x.toLowerCase() == rowNode.data.code.toLowerCase()) {
            y = index
            return
          } else if (x != rowNode.data.code) {
            return
          }
        }
      });

      this.gridApi.getDisplayedRowAtIndex(y).setSelected(true);
      this.gridApi.ensureIndexVisible(y, 'top');
    } else {
      this.gridApi.deselectAll();
    }
  }

  navigateGrid() {
    if (this.gridApi.getFocusedCell() == null || this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex) == null) { // check if no cell has focus, or if focused cell is filtered
      this.gridApi.setFocusedCell(this.gridApi.getDisplayedRowAtIndex(0).rowIndex, this.propertyName);
      this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
    } else {
      this.gridApi.setFocusedCell(this.gridApi.getFocusedCell().rowIndex, this.propertyName);
      this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
    }
  }

}
