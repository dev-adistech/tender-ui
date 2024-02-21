import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { CalculatorService } from "src/app/Service/Rap/calculator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"],
})
export class CalculatorComponent implements OnInit {
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  Shaps: any = [
    { code: "R", name: "Round" },
    { code: "PE", name: "Pear" },
  ];
  Colors: any = [];
  QuaArr: any = [];
  RapArr: any = [];
  CARAT: any = "";
  S_CODE: any = "";
  C_CODE: any = "";
  C_NAME: any = "";
  Q_CODE: any = "";
  Q_NAME: any = "";
  RAP: any = "";
  YCT: any = "";
  YTTL: any = "";
  LCT: any = "";
  LTTL: any = "";
  S_NAME: any = "";

  DS_CODE: any = "";
  DC_CODE: any = "";
  DQ_CODE: any = "";
  DCARAT: any = "";
  DRAP: any = "";
  DPRICE:any="";
  DCT: any = "";
  DTotal: any = "";
  DIFFTotal:any=''
  DIFFCT:any=''

  HIDECALCULATOR: boolean = true;
  DaimondHide: boolean = false;
  currentInputField: HTMLInputElement | null = null;

  constructor(
    private EncrDecrServ: EncrDecrService,
    private CalculatorServ: CalculatorService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.HIDECALCULATOR = true;
    this.Colors = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.QuaArr = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });

    this.CalculatorServ.RapDisMastFill({}).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.RapArr = FillRes.data.map((item) => {
            return {
              code: item.PER,
            };
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
    });
  }
  onInputFieldClick(value): void {
    this.currentInputField = value;
  }

  onButtonClick(value: string): void {
    if (this.currentInputField) {
      const currentValue = this[`${this.currentInputField}`];
      if (value === "C") {
        this[`${this.currentInputField}`] = "";
      } else {
        this[`${this.currentInputField}`] = currentValue + value;
      }
    }
  }
  DaiMondShow() {
    this.HIDECALCULATOR = false;
    this.DaimondHide = true;
  }
  CalculatorShow() {
    this.DaimondHide = false;
    this.HIDECALCULATOR = true;
  }

  GetName() {
    if (this.S_CODE) {
      this.S_NAME = this.Shaps.filter((x) => x.code == this.S_CODE)[0]
        ? this.Shaps.filter((x) => x.code == this.S_CODE)[0].name
        : "";
    } else {
      this.S_NAME = "";
    }
  }
  GetColorName() {
    if (this.C_CODE) {
      this.C_NAME = this.Colors.filter((x) => x.code == this.C_CODE)[0]
        ? this.Colors.filter((x) => x.code == this.C_CODE)[0].name
        : "";
    } else {
      this.S_NAME = "";
    }
  }
  GetQuaName() {
    if (this.Q_CODE) {
      this.Q_NAME = this.QuaArr.filter((x) => x.code == this.Q_CODE)[0]
        ? this.QuaArr.filter((x) => x.code == this.Q_CODE)[0].name
        : "";
    } else {
      this.Q_NAME = "";
    }
  }
  async Findrap() {
    if (!this.S_CODE) {
      return;
    }
    if (!this.Q_CODE) {
      return;
    }
    if (!this.C_CODE) {
      return;
    }
    if (!this.CARAT) {
      return;
    }
    let FindObj = {
      S_CODE: this.S_CODE,
      Q_CODE: this.Q_CODE,
      C_CODE: this.C_CODE,
      CARAT: this.CARAT,
    };
    await this.CalculatorServ.FindORap(FindObj).then((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.LCT = FillRes.data[0].ORATE;
          this.YCT = this.LCT + ((this.LCT * parseFloat(this.RAP)) / 100);
          this.LTTL = this.LCT*parseFloat(this.CARAT)
          this.YTTL = this.YCT*parseFloat(this.CARAT)
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
  ValueChange(){
    this.YCT = this.LCT + ((this.LCT * parseFloat(this.RAP)) / 100);
    this.LTTL = this.LCT*parseFloat(this.CARAT)
    this.YTTL = this.YCT*parseFloat(this.CARAT)
  }

  async FindrapDaimond(){
    if (!this.DS_CODE) {
      return;
    }
    if (!this.DQ_CODE) {
      return;
    }
    if (!this.DC_CODE) {
      return;
    }
    if (!this.DCARAT) {
      return;
    }
    let FindObj = {
      S_CODE: this.DS_CODE,
      Q_CODE: this.DQ_CODE,
      C_CODE: this.DC_CODE,
      CARAT: this.DCARAT,
    };
    await this.CalculatorServ.FindORap(FindObj).then((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide();
          this.DPRICE = FillRes.data[0].ORATE
          this.DCT = FillRes.data[0].ORATE + ((FillRes.data[0].ORATE * parseFloat(this.DRAP)) / 100)
          this.DTotal = this.DCT*parseFloat(this.DCARAT)

          this.DIFFCT = this.DCT-this.YCT
          this.DIFFTotal = this.DTotal - this.YTTL
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
  FindDaimondDiff(){
    this.DCT = this.DPRICE + ((this.DPRICE * parseFloat(this.DRAP)) / 100)
    this.DTotal = this.DCT*parseFloat(this.DCARAT)

    this.DIFFCT = this.DCT-this.YCT
    this.DIFFTotal = this.DTotal - this.YTTL
  }
}
