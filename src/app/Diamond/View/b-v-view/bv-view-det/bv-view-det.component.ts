import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConverterFunctions } from 'src/app/Diamond/_helpers/functions/ConverterFunctions';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
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
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public getRowStyle

  GridHeader = [];
  FooterKey = [];
  FooterValue = [];
  GridFooter: any[] = [];

  S_CODE: any = [];
  C_NAME: any = [];
  Q_NAME: any = [];
  CT_NAME: any = [];
  FL_NAME: any = [];
  LB_NAME: any = [];
  IN_NAME: any = [];
  DEP_NAME: any = [];
  RAT_NAME: any = []
  GRD_NAME: any = []
  SHD_NAME: any = []
  REF_NAME: any = []
  RAPNAME: any = []
  ML_NAME: any = []

  disabledata: boolean = true
  ALLGRIDDISABLE:boolean = true


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
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) {
    
    this.getRowStyle = function (params) {
      if (params.data.PTAG == "Total") {
        return { background: "#c0ffc0" };
      }
    }
    this.FillViewPara()
    this.LoadGridData()
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  FillViewPara() {
    this.ViewParaMastServ.ViewParaFill({
      FORMNAME: "TendarPrddetDisp",
    }).subscribe((VPRes) => {
      try {
        if (VPRes.success == 1) {
          let temp = [];
          let op = this;
          for (let i = 0; i < VPRes.data.length; i++) {
            if (VPRes.data[i].COLUMNSTYLE == "CheckBox") {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerclass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: { "text-align": VPRes.data[i].CELLALIGN },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
                cellRenderer: (params) => {
                  if (params.data) {
                    if (params.node.rowPinned != "bottom") {
                      if(params.data['PTAG'] !== 'Total'){
                      if (params.data[VPRes.data[i].FIELDNAME] == 1) {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" checked disabled>'
                          );
                      } else {
                          return (
                            '<input type="checkbox" data-action-type="' +
                            "PLNSEL" +
                            '" disabled>'
                          );
                    }
                  }
                  }
                }
                },
              });
            } else {
              temp.push({
                headerName: VPRes.data[i].DISPNAME,
                headerClass: VPRes.data[i].HEADERALIGN,
                field: VPRes.data[i].FIELDNAME,
                width: VPRes.data[i].COLWIDTH,
                cellStyle: {
                  "text-align": VPRes.data[i].CELLALIGN,
                  "background-color": VPRes.data[i].BACKCOLOR,
                  "color":VPRes.data[i].FONTCOLOR
                },
                resizable: VPRes.data[i].ISRESIZE,
                hide: VPRes.data[i].DISP == false ? true : false,
                suppressMenu: true,
              });
            }
            if (VPRes.data[i].FIELDNAME == 'S_CODE') {
              temp[i].cellRenderer = this.ShapeFill.bind(this)
            }
            // if (VPRes.data[i].FIELDNAME == 'CARAT') {
            //   temp[i].editable = this.CARATEDITABLE.bind(this)
            // }
            // if (VPRes.data[i].FIELDNAME == 'MPER') {
            //   temp[i].editable = this.MPERDISABLE.bind(this)
            // }
            if (VPRes.data[i].FIELDNAME == 'C_NAME') {
              temp[i].cellRenderer = this.ColorFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'Q_NAME') {
              temp[i].cellRenderer = this.QuaFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'CT_NAME') {
              temp[i].cellRenderer = this.CutFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'FL_NAME') {
              temp[i].cellRenderer = this.FloFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'LB_NAME') {
              temp[i].cellRenderer = this.LabFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'IN_NAME') {
              temp[i].cellRenderer = this.IncFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'ML_NAME') {
              temp[i].cellRenderer = this.MilkyFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'DEP_CODE') {
              temp[i].cellRenderer = this.DepFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'RAT_CODE') {
              temp[i].cellRenderer = this.RatFill.bind(this)
            }
            if (VPRes.data[i].FIELDNAME == 'GRD_CODE') {
              temp[i].cellRenderer = this.GrdFill.bind(this)
            }

            if (VPRes.data[i].FIELDNAME == 'SH_NAME') {
              temp[i].cellRenderer = this.SHADESFill.bind(this)
            }

            if (VPRes.data[i].FIELDNAME == 'REF_NAME') {
              temp[i].cellRenderer = this.REFFill.bind(this)
            }

            if (VPRes.data[i].FIELDNAME == 'RAPTYPE') {
              temp[i].cellRenderer = this.RAPTYPEFill.bind(this)
            }

            if (i == 0) {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
            }
            if (VPRes.data[i].FORMAT == "#0") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.NumberFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "#0.00") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.TwoFloatFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "#0.000") {
              this.FooterKey.push(VPRes.data[i].FIELDNAME);
              temp[i].valueFormatter = this.ThreeFloatFormat;
              temp[i].aggFunc = "sum";
            } else if (VPRes.data[i].FORMAT == "DateFormat") {
              temp[i].cellRenderer = this.DateFormat.bind(this);
              delete temp[i].valueFormatter;
            } else if (VPRes.data[i].FORMAT == "TimeFormat") {
              temp[i].cellRenderer = this.TimeFormat.bind(this);
              delete temp[i].valueFormatter;
            } else {
              temp[i].valueFormatter = this.StringFormat;
            }
            // this._gridFunction.FooterKey = this.FooterKey;
            // delete temp[i].cellStyle
            // temp[i].cellStyle = this.ColColor.bind(this)
          }
          this.columnDefs = temp

          for (let i = 0; i < this.columnDefs.length; i++) {
            if (this.columnDefs[i].headername == "Date") {
              this.columnDefs[i].cellRenderer =
                this._convFunction.DateFormat.bind(this);
            }
            if (this.columnDefs[i].headername == "Time") {
              this.columnDefs[i].cellRenderer =
                this._convFunction.TimeFormat.bind(this);
            }
          }
        } else {
          this.toastr.error(JSON.stringify(VPRes.data));
        }
      } catch (error) {
        console.log(error);
        this.toastr.error(error);
      }
    });
  }

  ShapeFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
                        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
                        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
                        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
                        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
                        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                          <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                          <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                          <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                          <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                          <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                          <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                          <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                          <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                          <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                          <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                          <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                          <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                          <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                          <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
        template += '<select class="ShapeList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.S_CODE.length; i++) {

          if (this.S_CODE[i].code == params.data.S_CODE) {
            template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
          } else {
            template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else
        if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
          let template = `
          <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
          <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
          <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                  <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                  <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                  <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                  <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                  <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
          template += '<select class="ShapeList">'
          template += '<option value="">---</option>';
          for (let i = 0; i < this.S_CODE.length; i++) {

            if (this.S_CODE[i].code == params.data.S_CODE) {
              template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            } else {
              template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            }

          }
          template += '</select>';
          return template;
        } else {
          let template = `
          <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
          <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
          <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
          <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
              <input id="MPER" type="hidden" value=${params.data.MPER} / >
                        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                          <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                          <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                          <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                          <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                          <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                          <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                          <input id="PTAG" type="hidden" value="${params.data.PTAG}" / > 
                          <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / > 
                          <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                          <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                          <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                          <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                          <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                          <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >`
          template += '<select class="ShapeList" disabled>'
          template += '<option value="">---</option>';
          for (let i = 0; i < this.S_CODE.length; i++) {

            if (this.S_CODE[i].code == params.data.S_CODE) {
              template += '<option selected value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            } else {
              template += '<option value="' + this.S_CODE[i].code + '">' + this.S_CODE[i].code + '</option>';
            }

          }
          template += '</select>';
          return template;
        }
    }
  }
  ColorFill(params) {
    if (params.data.PTAG !== "Total") {

      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ColorList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.C_NAME.length; i++) {

          if (this.C_NAME[i].code == params.data.C_CODE) {
            template += '<option selected value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.C_NAME[i].code + '">' + this.C_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  QuaFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
        <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
        <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
        <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
        <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
        <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
        <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
        <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
        <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
        <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
        <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
        <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
        <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
        <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
        <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
        <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
        <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
        <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="QuaList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.Q_NAME.length; i++) {

          if (this.Q_NAME[i].code == params.data.Q_CODE) {
            template += '<option selected value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.Q_NAME[i].code + '">' + this.Q_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  CutFill(params) {
    if (params.data.PTAG !== "Total") {

      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="CutList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.CT_NAME.length; i++) {

          if (this.CT_NAME[i].code == params.data.CT_CODE) {
            template += '<option selected value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.CT_NAME[i].code + '">' + this.CT_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  FloFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN') && this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="FloList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.FL_NAME.length; i++) {

          if (this.FL_NAME[i].code == params.data.FL_CODE) {
            template += '<option selected value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.FL_NAME[i].code + '">' + this.FL_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  LabFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="IN_CODE" type="hidden" value="${params.data.IN_CODE}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="LabList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.LB_NAME.length; i++) {

          if (this.LB_NAME[i].code == params.data.LB_CODE) {
            template += '<option selected value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.LB_NAME[i].code + '">' + this.LB_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  IncFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
    <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
          <input id="MPER" type="hidden" value=${params.data.MPER} / >
                    <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                    <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                    <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                    <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                    <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                    <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                    <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                    <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                    <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                    <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                    <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                    <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                    <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                    <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                    <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                    <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                    <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                    <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                    <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="IncList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.IN_NAME.length; i++) {

          if (this.IN_NAME[i].code == params.data.IN_CODE) {
            template += '<option selected value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.IN_NAME[i].code + '">' + this.IN_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  MilkyFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="MilkyLIST" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.ML_NAME.length; i++) {

          if (this.ML_NAME[i].code == params.data.ML_CODE) {
            template += '<option selected value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.ML_NAME[i].code + '">' + this.ML_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  DepFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="DepList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.DEP_NAME.length; i++) {

          if (this.DEP_NAME[i].code == params.data.DEP_CODE) {
            template += '<option selected value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.DEP_NAME[i].code + '">' + this.DEP_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  RatFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RatList" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAT_NAME.length; i++) {

          if (this.RAT_NAME[i].code == params.data.RAT_CODE) {
            template += '<option selected value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAT_NAME[i].code + '">' + this.RAT_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  GrdFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="GRDFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.GRD_NAME.length; i++) {

          if (this.GRD_NAME[i].code == params.data.GRD_CODE) {
            template += '<option selected value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.GRD_NAME[i].code + '">' + this.GRD_NAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  SHADESFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ShdFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ShdFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="ShdFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.SHD_NAME.length; i++) {

          if (this.SHD_NAME[i].code == params.data.SH_CODE) {
            template += '<option selected value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.SHD_NAME[i].code + '">' + this.SHD_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }
  REFFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RefFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RefFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="RAPTYPE" type="hidden" value=${params.data.RAPTYPE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RefFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.REF_NAME.length; i++) {

          if (this.REF_NAME[i].code == params.data.REF_CODE) {
            template += '<option selected value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          } else {
            template += '<option value="' + this.REF_NAME[i].code + '">' + this.REF_NAME[i].name + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  RAPTYPEFill(params) {
    if (params.data.PTAG !== "Total") {
      if (this.disabledata && this.decodedTkn.U_CAT !== "S" && this.decodedTkn.U_CAT !== "C") {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
        <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RapTypeFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else if ((params.data.IUSER == this.decodedTkn.UserId || !params.data.IUSER || this.decodedTkn.UserId === 'DN')&& this.ALLGRIDDISABLE == false) {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
      <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RapTypeFill">'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      } else {
        let template = `
        <input id="REF_CODE" type="hidden" value=${params.data.REF_CODE} / >
        <input id="SH_CODE" type="hidden" value=${params.data.SH_CODE} / >
        <input id="GRD_CODE" type="hidden" value=${params.data.GRD_CODE} / >
        <input id="PLNSEL" type="hidden" value=${params.data.PLNSEL} / >
            <input id="MPER" type="hidden" value=${params.data.MPER} / >
                      <input id="RAT_CODE" type="hidden" value=${params.data.RAT_CODE} / >
                      <input id="ML_CODE" type="hidden" value=${params.data.ML_CODE} / >
                      <input id="DEP_CODE" type="hidden" value=${params.data.DEP_CODE} / >
                      <input id="IN_CODE" type="hidden" value=${params.data.IN_CODE} / >
                      <input id="DATA" type="hidden" value=${JSON.stringify(params.data)} / >
                      <input id="AMT" type="hidden" value="${params.data.AMT ? params.data.AMT : 0}" / >
                      <input id="RTYPE" type="hidden" value="${params.data.RTYPE ? params.data.RTYPE : ''}" / >
                      <input id="PER" type="hidden" value="${params.data.PER ? params.data.PER : 0}" / >
                      <input id="ORAP" type="hidden" value="${params.data.ORAP ? params.data.ORAP : 0}" / >
                      <input id="SRNO" type="hidden" value="${params.data.SRNO}" / >  
                      <input id="PLANNO" type="hidden" value="${params.data.PLANNO}" / > 
                      <input id="PTAG" type="hidden" value="${params.data.PTAG}" / >  
                      <input id="C_CODE" type="hidden" value="${params.data.C_CODE ? params.data.C_CODE : 0}" / >
                      <input id="CARAT" type="hidden" value="${params.data.CARAT ? params.data.CARAT : 0}" / > 
                      <input id="Q_CODE" type="hidden" value="${params.data.Q_CODE ? params.data.Q_CODE : 0}" / > 
                      <input id="CT_CODE" type="hidden" value="${params.data.CT_CODE}" / > 
                      <input id="FL_CODE" type="hidden" value="${params.data.FL_CODE}" / > 
                      <input id="LB_CODE" type="hidden" value="${params.data.LB_CODE ? params.data.LB_CODE : ''}" / >
                      <input id="S_CODE" type="hidden" value="${params.data.S_CODE ? params.data.S_CODE : ''}" / >`
        template += '<select class="RapTypeFill" disabled>'
        template += '<option value="">---</option>';
        for (let i = 0; i < this.RAPNAME.length; i++) {

          if (this.RAPNAME[i].code == params.data.RAPTYPE) {
            template += '<option selected value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          } else {
            template += '<option value="' + this.RAPNAME[i].code + '">' + this.RAPNAME[i].code + '</option>';
          }

        }
        template += '</select>';
        return template;
      }
    }
  }

  DateFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "dd-MM-yyyy");
    } else {
      return "";
    }
  }

  TimeFormat(params) {
    if (params.value) {
      return this.datePipe.transform(params.value, "hh:mm a", "UTC+0");
    } else {
      return "";
    }
  }

  NumberFormat(params) {

    if (params.value != "NaN" && params.value != null) {
      return parseInt(params.value);
    } else {
      return "";
    }
  }

  TwoFloatFormat(params) {
    if (params.value != "NaN" && params.value != null && params.value != "") {
      return parseFloat(params.value).toFixed(2);
    } else {
      return "0.00";
    }
  }

  ThreeFloatFormat(params) {
    if (params.value != "NaN" && params.value != null && params.value != "") {
      return parseFloat(params.value).toFixed(3);
    } else {
      return "0.000";
    }
  }

  StringFormat(params) {
    if (params.value != "NaN" && params.value != null) {
      return params.value;
    } else {
      return "";
    }
  }

  LoadGridData(){
    this.TendarEstServ.TendarPrdDetDisp({
      COMP_CODE: this.dataMain.COMP_CODE,
      DETID: this.dataMain.DETID,
      SRNO: this.dataMain.SRNO,
      TYPE:'DOCK'
    }).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          console.log(FillRes.data)
          this.gridApi.setRowData(FillRes.data[1])
        }
      }catch{

      }
    })
  }
  ngOnInit(): void {
    this.C_NAME = this.decodedMast[12].map((item) => {
      return { code: item.C_CODE, name: item.C_NAME };
    });
    this.Q_NAME = this.decodedMast[5].map((item) => {
      return { code: item.Q_CODE, name: item.Q_NAME };
    });
    this.CT_NAME = this.decodedMast[3].map((item) => {
      return { code: item.CT_CODE, name: item.CT_NAME };
    });
    this.FL_NAME = this.decodedMast[7].map((item) => {
      return { code: item.FL_CODE, name: item.FL_NAME };
    });

    this.LB_NAME = this.decodedMast[4].map((item) => {
      return { code: item.LAB_CODE, name: item.LAB_NAME };
    });
    this.IN_NAME = this.decodedMast[6].map((item) => {
      return { code: item.IN_CODE, name: item.IN_NAME };
    });
    this.S_CODE = this.decodedMast[15].map((item) => {
      return { code: item.S_CODE, name: item.S_NAME };
    });
    this.ML_NAME = this.decodedMast[24].map((item) => {
      return { code: item.ML_CODE, name: item.ML_NAME };
    });

    this.SHD_NAME = this.decodedMast[25].map((item) => {
      return { code: item.SH_CODE, name: item.SH_NAME };
    });

    this.REF_NAME = this.decodedMast[26].map((item) => {
      return { code: item.REF_CODE, name: item.REF_NAME };
    });
    this.DEP_NAME = this.decodedMast[21].map((item) => {
      return { code: item.DEP_CODE };
    });
    this.GRD_NAME = this.decodedMast[22].map((item) => {
      return { code: item.GRD_CODE };
    });
    this.RAT_NAME = this.decodedMast[23].map((item) => {
      return { code: item.RAT_CODE };
    });

    this.RAPNAME = this.decodedMast[27].map((item) => {
      return { code: item.RAPTYPE };
    });

  }

}
