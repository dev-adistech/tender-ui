import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { DashboardService } from 'src/app/Service/Dashboard/dashboard.service';
import { ViewParaMastService } from 'src/app/Service/Master/view-para-mast.service';
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import { ViewService } from 'src/app/Service/View/view.service';

@Component({
  selector: 'app-bv-view-det',
  templateUrl: './bv-view-det.component.html',
  styleUrls: ['./bv-view-det.component.css']
})
export class BvViewDetComponent implements OnInit {


  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private ViewServ :ViewService,
    private ViewParaMastServ : ViewParaMastService,
    private _convFunction: ConverterFunctions,
    private datePipe: DatePipe,
    private TendarEstServ: TendarEstService,
    private DashboardServ: DashboardService,
    private _mdr: MatDialogRef<BvViewDetComponent>
    // @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) {
    
   
  }

  ngOnInit(): void {
    this.DashboardServ.componentName$.subscribe(componentName => {
      switch (componentName) {
        case "TendarEstComponent": 
        this._mdr.close()
        const MakHistoryData = JSON.parse(localStorage.getItem('TendarEstComponent'))
        localStorage.removeItem('TendarEstComponent')
      }
    });
  }
}
