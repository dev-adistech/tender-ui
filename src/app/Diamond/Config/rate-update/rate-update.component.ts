import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { TendatMastService } from 'src/app/Service/Transaction/tendat-mast.service';
import { RateupdateService } from 'src/app/Service/Utility/rateupdate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rate-update',
  templateUrl: './rate-update.component.html',
  styleUrls: ['./rate-update.component.css']
})
export class RateUpdateComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  T_DATE: any = null;

  TYPE:any='ORAP'

  constructor(
    private EncrDecrServ: EncrDecrService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private TendarMastser: TendatMastService,
    private RateUpdateServ: RateupdateService,
  ) { }

  ngOnInit(): void {

    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
  }

  GETDETID() {
    this.DETID=''
    this.T_DATE=null
    this.T_NAME=''
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.DETIDarr = FillRes.data.filter(item => item.ISACTIVE == true).map(item => {
              return { code: item.DETID,date: item.T_DATE,name:item.T_NAME };
            });
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
  GETDATE() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_DATE = this.DETIDarr.filter((x) => x.code == this.DETID)[0].date;
      } else {
        this.DETID = "";
      }
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_NAME = this.DETIDarr.filter((x) => x.code == this.DETID)[0].name;
      }
    } else {
      this.DETID = "";
    }
  }

  RateUpdate(){
    let Swalmessage = ''
    if(this.TYPE === 'ORAP'){
      Swalmessage = 'Are Sure You Want To Update Org Rate ??'
    }else if(this.TYPE === 'RATE'){
      Swalmessage = 'Are Sure You Want To Update Rate ??'
    }
    Swal.fire({
      title: Swalmessage,
      icon: "question",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        let SaveObj = {
          COMP_CODE:this.COMP_CODE ? this.COMP_CODE:'',
          DETID:this.DETID ? this.DETID:0,
          TYPE:this.TYPE ? this.TYPE:'ORAP',
        };
        this.spinner.show()
        this.RateUpdateServ.TendarRateUpd(SaveObj).subscribe((SaveRes) => {
          try {
            if (SaveRes.success == true) {
              this.spinner.hide();
              this.toastr.success("Rate Update successfully.");
              
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
    })
  }

}
