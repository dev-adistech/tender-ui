import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FooterTextService } from "src/app/Service/Config/footer-text.service";
import { DashboardService } from "src/app/Service/Dashboard/dashboard.service";
import { ViewService } from "src/app/Service/View/view.service";

@Component({
  selector: "app-footer-dialog",
  template: `
    <article class="dialog-container">
      <!-- <p class="dialog-msg">
      {{MSG}}
    </p> -->
      <p
      *ngFor="let item of MSG"
        style="font-size: 1rem; font-family: monospace; text-align:center;color:#ff6969"
      >
        Company Code: {{ item.COMP_CODE }} Company Name: {{ item.COMP_NAME }} Tendar Name:
        {{ item.T_NAME }} Tendar Number: {{ item.DETID }} Tendar Date:
        {{ item.T_DATE }} Expiry: {{ item.TEXP_DATETIME }} Remaining: {{ item.TTime }}
      </p>
      <button class="btn theme-btn " (click)="close()">Close</button>
    </article>
  `,
  styles: [
    `
      article {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      p {
        width: 100%;
        padding: 1rem;
        font-size: 1.5rem;
        text-align: center;
        line-height: 1.3;
        letter-spacing: 1.5px;
        border-radius: 10px;
        border: 1px solid black;
        flex-grow: 1;
      }
      button {
        padding: 3px !important;
        align-self: end;
      }
    `,
  ],
})
export class FooterDialogComponent implements OnInit {
  MSG: any[]=[];
  COMP_CODE: any;
  COMP_NAME: any;
  T_NAME: any;
  DETID: any;
  T_DATE: any;
  TEXP_DATETIME: any;
  TempTime: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mdr: MatDialogRef<FooterDialogComponent>,
    public DashboardServ: DashboardService,
    private ViewServ: ViewService
  ) {
  }

  async ngOnInit() {
    this.GetData();
  }

  async GetData() {
    this.DashboardServ.FillAllExpTendar({}).then(async (FillRes) => {
      try {
        if (FillRes.success == true) {
          for (let i = 0; i < FillRes.data.length; i++) {
            await this.ViewServ.getRemainingTimeForMessage(
              FillRes.data[i].TEXP_DATETIME
            ).then((time) => {
              this.TempTime = time;
            });
            this.COMP_CODE = FillRes.data[i].COMP_CODE;
            this.COMP_NAME = FillRes.data[i].COMP_NAME;
            this.T_NAME = FillRes.data[i].T_NAME;
            this.DETID = FillRes.data[i].DETID;
            this.T_DATE = FillRes.data[i].T_DATE;
            this.TEXP_DATETIME = FillRes.data[i].TEXP_DATETIME;

            let obj ={
              COMP_CODE:this.COMP_CODE,
              COMP_NAME:this.COMP_NAME,
              T_NAME:this.T_NAME,
              DETID:this.DETID,
              T_DATE:this.T_DATE,
              TEXP_DATETIME:this.TEXP_DATETIME,
              TTime:this.TempTime
            }
            this.MSG.push(obj)

            console.log(this.MSG)
          }
        }
      } catch (error) {
        console.log(error)
      }
    });
  }

  close() {
    this._mdr.close();
  }
}
