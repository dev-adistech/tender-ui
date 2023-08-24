import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-date-editor',
  template: `
    <!-- <div class="from-group date-input"> -->
      <mat-form-field appearance="outline">
        <mat-label></mat-label>
        <input matInput [matDatepicker]="B" [value]="selectedDate"  (dateChange)="onDateChanged($event)" />
        <mat-datepicker-toggle matSuffix [for]="B"  (click)="B.open()"></mat-datepicker-toggle>
        <mat-datepicker #B></mat-datepicker>
      </mat-form-field>
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
export class AgGridDateEditorComponent implements ICellEditorAngularComp {

  constructor(
    private datepipe: DatePipe
  ) { }

  private params: any;
  public selectedDate = null;

  agInit(params: any): void {
    this.params = params;
    // console.log(params);
  }

  getValue = () => {
    let dateString = null;
    if (this.selectedDate) {
      dateString = this.datepipe.transform(this.selectedDate, 'dd-MM-yyyy');
    } else {
      this.selectedDate = this.params.value
    }
    // console.log(this.selectedDate)
    return this.selectedDate;
  };

  afterGuiAttached = () => {
    if (!this.params.value) {
      return;
    }
    const [_, day, month, year] = this.params.value.match(
      /^(\d{2})\/(\d{2})\/(\d{4})$/
    );
    let selectedDate = new Date(year, month - 1, day);

    this.selectedDate = selectedDate;
  };

  onDateChanged = event => {
    let date = event.value;
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    this.selectedDate = date;
  }

}
