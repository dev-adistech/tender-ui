import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from './../../../Service/Dashboard/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  clickEventsubscription: Subscription;
  F_DATE = null
  T_DATE: any = null

  displayStk = false;

  viewCounter = []

  constructor(
    private DashboardServ: DashboardService,
    private toastr: ToastrService,
  ) {
    //   this.clickEventsubscription = this.DashboardServ.getClickEvent().subscribe((res) => {
    //     this.onPress(res)
    //     this.close();
    //   });
  }

  ngOnInit(): void {
    this.clickEventsubscription = this.DashboardServ.getClickEvent().subscribe((res) => {
      console.log(res);
      // this.onPress(res)
      this.close();
    });

  }

  onPress(e: any) {
    if (this.viewCounter.includes(e)) return;

    if (this.viewCounter.length < 4) {
      this.viewCounter.push(e)
    } else {
      this.toastr.warning('Can not add more than 4 views, please close alredy opened views to add new.')
      return;
    }

    if (e == 'DashStockComponent') {
      this.displayStk = true;
    }
   
  }

  close() {

    this.DashboardServ.componentName$.subscribe(componentName => {
      switch (componentName) {
        
        case "DashStockComponent":
          this.displayStk = false;
          this.removeView("DashStockComponent")
          break;
      }
    })
  }

  removeView(e: any) {
    const index = this.viewCounter.indexOf(e);
    if (index > -1) {
      if (e == 'DashStockComponent' ) {
        this.viewCounter.splice(index, 1);
      }
    }
  }


}
