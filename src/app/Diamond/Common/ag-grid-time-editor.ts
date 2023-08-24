import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-time-editor',
  template: `
    <!-- <div class="from-group date-input"> -->

    <input #input type="text" [(ngModel)]="TTIME">

        <!-- <<mat-input-container floatPlaceholder="auto">
            <input matInput formControlName="formControlName"
                   type="text"
                   required
                   placeholder="">
        </mat-input-container> matInput #time type="text" [value]="selectedtime" (cellKeyPress)="onCellKeyPress($event)"  (change)="onDateChanged($event)" [(ngModel)]= "TTIME"/> -->
    <!-- </div> -->
    <!-- <mat-form-field appearance="outline">
      <mat-label>To Date</mat-label>
      <input matInput [matDatepicker]="ID2" [(ngModel)]="T_DATE" #todate (keyup.enter)="autoFocus($event, party)"
        onfocus="this.select();" />
      <mat-datepicker-toggle matSuffix [for]="ID2" (click)="ID2.open()"></mat-datepicker-toggle>
      <mat-datepicker #ID2></mat-datepicker>
    </mat-form-field> -->
  `
})
export class AgGridTimeEditorComponent implements ICellEditorAngularComp {

  @ViewChild("input") input: ElementRef;
  public columnDefs;
  public gridApi;
  public useApi: boolean;
  public cellValue: string;

  EDITABLEGRID: boolean = false
  TTIME: any = ""
  constructor(
    private datepipe: DatePipe
  ) { }

  private params: any;
  public selectedtime = null;

  ngAfterViewInit() {
    window.setTimeout(() => {
      if (this.TTIME == this.cellValue) {
        this.input.nativeElement.select();
      } else {
        this.input.nativeElement.focus();
      }
      // if (this.TTIME && !this.useApi) this.updateFilter();
    })

  }


  agInit(params: any): void {
    this.params = params;
    this.TTIME = '';

    if (params.value) {
      if (params.data.TTIME.includes('T')) {
        const timeString = params.value.split('T')[1].split('.')[0];
        const [hours, minutes] = timeString.split(':');
        this.TTIME = hours + ':' + minutes;
      } else {
        this.TTIME = params.value;
      }
    }

    // console.log(this.TTIME)
    // console.log(params);
  }


  getValue = () => {
    // console.log(this.TTIME)
    let dateString = null;
    if (this.TTIME) {
      dateString = this.TTIME;
      // return this.EDITABLEGRID
    } else {
      this.TTIME = this.params.value
    }
    return this.TTIME;
  };

  // afterGuiAttached = () => {
  //   if (!this.params.value) {
  //     return;
  //   }
  //   const [_, day, month, year] = this.params.value.match(
  //     /^(\d{2})\/(\d{2})\/(\d{4})$/
  //   );
  //   let selectedDate = new Date(year, month - 1, day);

  //   // console.log(selectedDate)
  //   this.selectedtime = selectedDate;
  // };

  onDateChanged = (event) => {
    let date = event.value;
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    this.selectedtime = date;
    // console.log(this.selectedtime)
  }

  onCellKeyPress(e) {
    if (e.event.key == 'Enter') {
      this.gridApi.tabToNextCell();
      var currentCell = this.gridApi.getFocusedCell();
      var finalRowIndex = this.gridApi.paginationGetRowCount() - 1;

      if (currentCell.rowIndex === finalRowIndex) {
        return;
      }
      this.gridApi.startEditingCell({
        rowIndex: currentCell.rowIndex,
        colKey: currentCell.column.colId
      });
    }
  }

}
