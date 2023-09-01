import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-view-para',
    template: `
      <!-- <div class="from-group date-input"> -->
  
      <!-- <input #input type="text" [(ngModel)]="TTIME"> -->
  
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
export class ViewParaComponent implements OnInit {

    constructor() {}
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    ngAfterViewInit(){

    }

    agInit(params: any): void{

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
}