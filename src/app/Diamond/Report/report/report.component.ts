import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { ReportService } from 'src/app/Service/Report/report.service';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";
import { ReportListBoxComponent } from '../../Common/report-list-box/report-list-box.component';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  public url = environment.BaseUrl
  public port = environment.PORT

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  ReportTab = localStorage.getItem("Report Tab");

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ''
  PER = []
  hide = true
  PASSWORD: any = ''
  arr: any = ''

  SP_NAME: any = ''
  RPT_NAME: any = ''
  SPRPT: boolean = false;
  SHOW_PRMS: boolean = false;
  SHOW_RPT_LIST: boolean = false;

  // FormColumns: { key: string, value: string }[];
  FormColumns;
  Disable: boolean = false;
  RptList: any = ''
  Report_arr = [];

  Group_arr = []
  DATASET = []

  All_Dataset_Arr = []
  RPT_DATASET = []


  SearchMenu: any = ''
  PNTVALUE: any = ''

  REPORT_NAME: any = ''
  GroupArry = []
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private ReportServ: ReportService,
    private EncrDecrServ: EncrDecrService,
    private matDialog: MatDialog,
    private _FrmOpePer: FrmOpePer,
    private datePipe: DatePipe,

  ) {
    this.All_Dataset_Arr = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));
  }

  async ngOnInit() {
    this.spinner.hide()

    this.PER = await this._FrmOpePer.UserFrmOpePer('ReportComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS

    this.FeatchReportData()
    this.FeatchReportDataFill()
  }

  CHANGEPASSWORD() {
    if (!this.PASSWORD) return;
    if (this.PASSWORD == this.PASS) {
      this.SPRPT = true
    }
    else {
      this.SPRPT = false
    }
  }

  FormColumn(data: any) {
    return Object.keys(data).map(key => ({ key, value: data[key] }));
  }

  FeatchReportData() {
    this.spinner.show()
    let FillObj = {}
    if (this.ReportTab == 'Diamond Issue' || this.ReportTab == 'Diamond Receive' || this.ReportTab == 'Diamond Pending' || this.ReportTab == 'Grading' || this.ReportTab == 'M.Polish' || this.ReportTab == 'Avg.Entry' || this.ReportTab == 'Reparing Issue' || this.ReportTab == 'Reparing Receive' || this.ReportTab == 'Reparing Pending') {
      FillObj = {
        TABLENAME: 'dbo.RepMast',
        CRITERIA: "AND PARENT_ID=0 and DEPT_NAME='MFG' AND REP_NAME='" + this.ReportTab + "'",
        FIELDS: '*',
      }
      localStorage.removeItem("Report Tab");
    } else {
      FillObj = {
        TABLENAME: 'dbo.RepMast',
        CRITERIA: "AND PARENT_ID=0 and DEPT_NAME='POI' AND REP_NAME='" + this.ReportTab + "'",
        FIELDS: '*',
      }
      localStorage.removeItem("Report Tab");
    }

    this.ReportServ.FetchReportData(FillObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide()
          let FillRptObj = {
            DEPT_CODE: FillRes.data[0].DEPT_NAME,
            USER_NAME: this.decodedTkn.UserId,
            PARENT_ID: FillRes.data[0].REP_ID,
          }

          this.ReportServ.FillReportList(FillRptObj).subscribe(FillRptRes => {
            try {
              if (FillRptRes.success == true) {
                this.spinner.hide()
                if (FillRes.data == '') {
                  this.SHOW_RPT_LIST = false;
                } else {
                  this.SHOW_RPT_LIST = true;
                }
                this.RptList = FillRptRes.data.map((item) => {
                  return {
                    CAT_CODE: item.CAT_CODE,
                    DEPT_NAME: item.DEPT_NAME,
                    DESCR: item.DESCR,
                    ORD: item.ORD,
                    PARENT_ID: item.PARENT_ID,
                    REP_ID: item.REP_ID,
                    REP_NAME: item.REP_NAME,
                    RPT_NAME: item.RPT_NAME,
                    RPT_TYPE: item.RPT_TYPE,
                    SCHEMA_NAME: item.SCHEMA_NAME,
                    SP_NAME: item.SP_NAME,
                    SELECTED: false
                  }
                })
              } else {
                this.spinner.hide()
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: JSON.stringify(FillRes.data),
                })
              }
            } catch (error) {
              this.spinner.hide()
              this.toastr.error(error)
            }
          })
          this.spinner.hide()
        } else {
          this.spinner.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(FillRes.data),
          })
        }
      } catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

  FeatchReportDataFill() {
    this.spinner.show()
    this.ReportServ.FrmRptDataFill({}).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide()
          this.RPT_DATASET = FillRes.data

        } else {
          this.spinner.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(FillRes.data),
          })
        }
      } catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

  ReportClick(e: any, r: any, id: any) {
    this.SP_NAME = e;
    this.RPT_NAME = r
    this.GetActiveReport();
    // console.log("e", e);
    // console.log("r", r);
    // console.log("id", id);

    this.spinner.show();
    this.ReportServ.GetReportParams({ SP_NAME: e, REP_ID: id }).subscribe((FillRes) => {
      try {
        // console.log("217", FillRes)
        if (FillRes.success == true) {
          this.spinner.hide()
          if (FillRes.data == '') {
            this.SHOW_PRMS = false;
          } else {
            this.SHOW_PRMS = true;
          }
          for (let i = 0; i < FillRes.data.length; i++) {
            if (FillRes.data[i].PARANAME === "@PNT") {
              if (this.decodedTkn.U_CAT === "U" && this.decodedTkn.DEPT_CODE === "POI") {
                FillRes.data[i].DEFVAL = this.decodedTkn.PNT
              }
            }
          }
          let newarr = []
          this.GroupArry.map((item) => {
            FillRes.data.map((_item) => {
              if (item.key === _item.NAME) {
                newarr.push(item)
              }
            })
          })
          // console.log("newarr", newarr);

          this.Report_arr = FillRes.data;

          for (let i = 0; i < FillRes.data.length; i++) {
            for (let j = 0; j < newarr.length; j++) {
              if (FillRes.data[i].NAME === newarr[j].key) {
                // if (FillRes.data[i].DEFVAL !== "0") {
                if (FillRes.data[i].DISPLAYNAME !== "Report Type :") {
                  if (FillRes.data[i].DISPLAYNAME !== "Rep Type:") {
                    FillRes.data[i].DEFVAL = newarr[j].value
                  }
                }
                // }
              }
            }
          }
          // console.log(FillRes.data)

          let Obj = {}
          for (let i = 0; i < FillRes.data.length; i++) {
            Obj[FillRes.data[i].NAME] = FillRes.data[i].DEFVAL ? FillRes.data[i].DEFVAL : ''
          }
          this.GroupArry = this.FormColumn(Obj);
          for (let i = 0; i < FillRes.data.length; i++) {
            this.GroupArry[i]['CATE_NAME'] = FillRes.data[i].CATE_NAME ? FillRes.data[i].CATE_NAME : ''
          }

          this.FormColumns = this.groupByArray(this.GroupArry, 'CATE_NAME')
          console.log(this.FormColumns)
        } else {
          this.spinner.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(FillRes.data),
          })
        }
      } catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

  shouldDisableField(key: any): boolean {
    if (key === "PNT" && this.decodedTkn.U_CAT === "U" && this.decodedTkn.DEPT_CODE === "POI" && this.decodedTkn.PNT !== 0) {
      return true;
    }
    return false;
  }

  changeData(key: any) {

    let rpt_type = this.Report_arr.filter(v => v.NAME == "RPT_TYPE")[0].DEFVAL
    let r_type = this.Report_arr.filter(v => v.NAME == "R_TYPE")[0].DEFVAL
    if (key == "RPT_TYPE") {
      for (let x = 0; x < this.FormColumns.length; x++) {
        for (let y = 0; y < this.FormColumns[x].Data.length; y++) {
          if (this.FormColumns[x].Data[y].key == "RPT_TYPE") {
            this.FormColumns[x].Data[y].value = rpt_type
          }
        }
      }
    } else if (key == "R_TYPE") {
      for (let x = 0; x < this.FormColumns.length; x++) {
        for (let y = 0; y < this.FormColumns[x].Data.length; y++) {
          if (this.FormColumns[x].Data[y].key == "R_TYPE") {
            this.FormColumns[x].Data[y].value = r_type
          }
        }
      }
    }
  }


  GetActiveReport() {
    const items = document.querySelectorAll(".RPT");
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
    }

    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');

      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));
  }

  onSubmit(form: NgForm) {
    this.arr = { value: form.value }
    let RPObj = form.value
    let temp = []
    temp.push(RPObj)
    let SubTitle = ''
    let DataTypeArr = []
    if (form.controls.PNT) {
      temp = temp.map((it) => ({
        ...it,
        PNT: form.controls.PNT.value
      }))
      RPObj = temp[0]
      this.arr = temp[0]
    } else {
      RPObj = form.value
      this.arr = form.value
    }

    for (const [key, value] of Object.entries(RPObj)) {
      if (this.FindFieldDataType(key) == 'varchar') {
        if (value.toString() != '') {
          SubTitle += (`<b>${this.FindLableName(key)}</b> ${value}<br>`)
        }
        DataTypeArr.push(this.FindFieldDataType(key))
      } else if (this.FindFieldDataType(key) == 'numeric' || this.FindFieldDataType(key) == 'int' || this.FindFieldDataType(key) == 'smallint') {
        if (parseFloat(value.toString()) != 0) {
          SubTitle += (`<b>${this.FindLableName(key)}</b> ${value}<br>`)
        }
        DataTypeArr.push(this.FindFieldDataType(key))
      } else if (this.FindFieldDataType(key) == 'date') {
        if (value.toString() != '' && value.toString() != "NULL") {
          SubTitle += (`<b>${this.FindLableName(key)}</b> ${this.datePipe.transform(value, 'dd-MM-yyyy')}<br>`)
          RPObj[key] = this.datePipe.transform(value, 'yyyy-MM-dd')
        }
        DataTypeArr.push(this.FindFieldDataType(key))
      } else if (this.FindFieldDataType(key) == 'datetime') {
        if (value.toString() != '' && value.toString() != 'NULL') {
          // SubTitle.push(`${this.FindLableName(key)} ${this.datePipe.transform(value, 'hh:mm a', 'UTC+0')}`)
          // RPObj[key] = this.datePipe.transform(value, 'hh:mm a', 'UTC+0')
          SubTitle += (`<b>${this.FindLableName(key)}</b> ${value}<br>`)
          RPObj[key] = value
        }
        DataTypeArr.push(this.FindFieldDataType(key))
      } else if (this.FindFieldDataType(key) == 'time') {
        if (value.toString() != '' && value.toString() != 'NULL') {
          // SubTitle.push(`${this.FindLableName(key)} ${this.datePipe.transform(value, 'hh:mm a', 'UTC+0')}`)
          // RPObj[key] = this.datePipe.transform(value, 'hh:mm a', 'UTC+0')
          SubTitle += (`<b>${this.FindLableName(key)}</b> ${value}<br>`)
          RPObj[key] = value
        }
        DataTypeArr.push(this.FindFieldDataType(key))
      }
    }
    console.log("386", RPObj)
    RPObj['RP_NAME'] = `<b>${this.REPORT_NAME}</b>` + '<br>' + SubTitle.toString() + '<br>'

    const propertyNames = Object.keys(RPObj)
    const propertyValues = Object.values(RPObj)

    console.log("DataTypeArr", DataTypeArr)
    let SP_PARAMS = []

    for (let i = 0; i < DataTypeArr.length; i++) {
      SP_PARAMS.push({
        FIELD: propertyNames[i],
        DATATYPE: DataTypeArr[i],
        VALUE: propertyValues[i],
      })
    }
    console.log("SP_PARAMS", SP_PARAMS)
    for (let i = 0; i < SP_PARAMS.length; i++) {
      if (SP_PARAMS[i].FIELD == 'F_DATE' || SP_PARAMS[i].FIELD == 'T_DATE') {
        if (SP_PARAMS[i].VALUE == 'NULL') {
          SP_PARAMS[i].VALUE = '';
        }
      }
      if (SP_PARAMS[i].FIELD == 'F_TIME' || SP_PARAMS[i].FIELD == 'T_TIME') {
        if (SP_PARAMS[i].VALUE == 'NULL') {
          SP_PARAMS[i].VALUE = '';
        }
      }
    }
    // console.log("381", SP_PARAMS)
    let SP_DETAILS = []
    if (SP_PARAMS.find((item) => item.FIELD === 'DS_TYPE')) {
      if (SP_PARAMS.find((item) => item.FIELD === 'DS_TYPE') && SP_PARAMS.find((item) => item.VALUE === 'D')) {
        let checkDet = this.RPT_NAME.slice(-3)
        if (checkDet == 'Det') {
          this.RPT_NAME = this.RPT_NAME
        } else {
          this.RPT_NAME = this.RPT_NAME + 'Det'
        }

        SP_DETAILS.push({
          RP_NAME: `<b>${this.REPORT_NAME}</b>` + '<br>' + SubTitle.toString() + '<br>',
          SP_NAME: this.SP_NAME,
          RPT_NAME: this.RPT_NAME
        })
      } else {
        let checkDet = this.RPT_NAME.slice(-3)
        if (checkDet == 'Det') {
          this.RPT_NAME = this.RPT_NAME.substring(0, this.RPT_NAME.length - 3)
        }
        // console.log(this.RPT_NAME);

        SP_DETAILS.push({
          RP_NAME: `<b>${this.REPORT_NAME}</b>` + '<br>' + SubTitle.toString() + '<br>',
          SP_NAME: this.SP_NAME,
          RPT_NAME: this.RPT_NAME
        })

      }
    } else {
      SP_DETAILS.push({
        RP_NAME: `<b>${this.REPORT_NAME}</b>` + '<br>' + SubTitle.toString() + '<br>',
        SP_NAME: this.SP_NAME,
        RPT_NAME: this.RPT_NAME
      })
    }

    // console.log("419", SP_DETAILS);

    this.spinner.show()
    this.ReportServ.RPTDATA({ SP_PARAMS, SP_DETAILS }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.spinner.hide()

          var mapForm = document.createElement("form");
          mapForm.target = "_blank";
          mapForm.method = "POST";
          mapForm.action = `http://${this.url}:${this.port}/api/Report/ReportViewer`;

          let obj = {}

          if (FillRes.data.length > 1) {
            let RptData = []
            for (let i = 0; i < FillRes.data.length; i++) {
              if (FillRes.data[i] && FillRes.data[i][0]) {

                RptData.push({
                  [FillRes.data[i][0].DT]: FillRes.data[i].map(v => ({
                    ...v,
                    ReportFilterTitle: SP_DETAILS[0] ? SP_DETAILS[0].RP_NAME : ''
                  }))
                })
              }
            }
            obj = {
              Data: JSON.stringify(RptData),
              mrtname: this.RPT_NAME,
            }
            console.log("451", RptData)
          } else {
            let ReportData = FillRes.data[0].map(v => ({
              ...v,
              ReportFilterTitle: SP_DETAILS[0] ? SP_DETAILS[0].RP_NAME : ''
            }))
            obj = {
              Data: JSON.stringify(ReportData),
              mrtname: this.RPT_NAME,
            }
          }

          Object.keys(obj).forEach(function (param) {
            if (obj[param]) {
              var mapInput = document.createElement("input");
              mapInput.type = "hidden";
              mapInput.name = param;
              mapInput.setAttribute("value", obj[param]);
              mapForm.appendChild(mapInput);
            }
            // console.log("471", obj[param])
          });

          document.body.appendChild(mapForm);
          mapForm.submit();
          document.body.removeChild(mapForm);

        } else {
          this.toastr.warning(FillRes.data)
          this.spinner.hide()
        }
      } catch (error) {
        this.toastr.error(error)
        this.spinner.hide()
      }
    })
  }

  FindLableName(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? this.Report_arr.find((item) => item.NAME == NAME).DISPLAYNAME : ''
  }

  FindFieldDataType(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? this.Report_arr.find((item) => item.NAME == NAME).TYPE : ''
  }

  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];

      let el = rv.find(r => r && r.GROUPKEY === _GROUPKEY);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x]
        });
      }

      return rv;
    }, []);
  }

  FillDataSet(DS_NAME: any) {
    return (this.All_Dataset_Arr.map((data) => data.filter((item) => item.DATASET == DS_NAME))).filter((obj) => {
      return ![null, undefined, ''].includes(obj)
    }).filter((el) => {
      return typeof el != "object" || Object.keys(el).length > 0;
    })
  }

  FillAutoDataSet(DS_NAME: any) {
    return (this.RPT_DATASET.map((data) => data.filter((item) => item.DATASET == DS_NAME))).filter((obj) => {
      return ![null, undefined, ''].includes(obj)
    }).filter((el) => {
      return typeof el != "object" || Object.keys(el).length > 0;
    })
  }

  FillFromLookUpString(DS_NAME: any) {
    const DATASET = []
    let SplitArray = DS_NAME.split(',')
    const temp = SplitArray.map(item => {
      return { Code: item };
    });
    DATASET.push(temp)
    console.log(DATASET)
    return DATASET
  }

  FindStnLen(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? this.Report_arr.find((item) => item.NAME == NAME).STRLEN : ''
  }

  FindNormalTextbox(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME && !item.DATATABLE && item.LOOKUP_STRING == "") ? true : false

  }

  FindLookUPString(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? (this.Report_arr.find((item) => item.NAME == NAME).LOOKUP_STRING ? true : false) : false
  }

  FindDataSet(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? (this.Report_arr.find((item) => item.NAME == NAME).LOOKUP_STRING ? true : false) : false
  }

  GetLookUPStringData(NAME: any) {
    return this.Report_arr.find((item) => item.NAME == NAME) ? (this.Report_arr.find((item) => item.NAME == NAME).LOOKUP_STRING ? (this.Report_arr.find((item) => item.NAME == NAME).LOOKUP_STRING).split(',') : []) : []
  }

  GetAutoCompleteDataSet(NAME: any) {

    let fieldObj = this.Report_arr.find((item) => item.NAME == NAME)
    let DataTable = this.FillDataSet(fieldObj.DATATABLE);

    return DataTable[0].map((item) => {
      return item[fieldObj.VALUEMEMBER].toString()
    })
  }

  FindValePNT(NAME: any, Value: any) {
    if (NAME === 'PNT') {
      this.FormColumns.map((it) => {
        if (it.GROUPKEY == '.PACKET') {
          it.Data.map((i) => {
            if (i.key == 'L_CODE') {
              i.value = ''
            }
          })
        }
      })
      this.PNTVALUE = Value
    }
  }

  matDialogRefReportListBox: MatDialogRef<ReportListBoxComponent>;
  ReportHelpList(KeyValue: any, GropKey: any, DefSelectVal: any) {
    let ObjForList = {}
    // console.log(KeyValue);

    console.log('report array', DefSelectVal);

    for (let i = 0; i < this.Report_arr.length; i++) {
      if (KeyValue == this.Report_arr[i].NAME) {
        if (!!this.Report_arr[i].DATATABLE) {
          ObjForList = {
            DataSet: this.FillDataSet(this.Report_arr.find((item) => item.NAME == KeyValue).DATATABLE),
            ColDef: this.Report_arr.find((item) => item.NAME == KeyValue).COLUMNS,
            ColCaption: this.Report_arr.find((item) => item.NAME == KeyValue).CAPTIONS,
            ValueMemeber: this.Report_arr.find((item) => item.NAME == KeyValue).VALUEMEMBER,
            isMulti: true,
            DefSelectVal: DefSelectVal,
            PNT: this.PNTVALUE
          }
        } else if (!!this.Report_arr[i].DESCRIBE) {
          ObjForList = {
            DataSet: this.FillAutoDataSet(this.Report_arr[i].DESCRIBE),
            ColDef: this.Report_arr.find((item) => item.NAME == KeyValue).COLUMNS,
            ColCaption: this.Report_arr.find((item) => item.NAME == KeyValue).CAPTIONS,
            ValueMemeber: this.Report_arr.find((item) => item.NAME == KeyValue).VALUEMEMBER,
            isMulti: true,
            DefSelectVal: DefSelectVal
          }
        } else {
          ObjForList = {
            DataSet: this.FillFromLookUpString(this.Report_arr[i].LOOKUP_STRING),
            ColDef: this.Report_arr.find((item) => item.NAME == KeyValue).COLUMNS,
            ColCaption: this.Report_arr.find((item) => item.NAME == KeyValue).CAPTIONS,
            ValueMemeber: this.Report_arr.find((item) => item.NAME == KeyValue).VALUEMEMBER,
            isMulti: true,
            DefSelectVal: DefSelectVal
          }
        }
        // console.log("601", ObjForList);
      }
    }
    this.matDialogRefReportListBox = this.matDialog.open(ReportListBoxComponent, { data: ObjForList, disableClose: false, width: '900px', height: '80%', panelClass: 'custome-report-list-mat-dialog-container' });
    this.matDialogRefReportListBox.afterClosed().subscribe(res => {
      if (res) {
        if (res.success == 1) {
          for (let i = 0; i < this.FormColumns.length; i++) {
            if (this.FormColumns[i].GROUPKEY == GropKey) {
              for (let j = 0; j < this.FormColumns[i].Data.length; j++) {
                if (this.FormColumns[i].Data[j].key == KeyValue) {
                  this.FormColumns[i].Data[j].value = res.Data
                }
              }
            }
          }
        } else if (res.success == 2) {
          //future use
        } else if (res.success == 3) {
          //future use
        } else {
          this.toastr.warning('Something gone wrong while get party')
        }
      }
    });
  }
}
