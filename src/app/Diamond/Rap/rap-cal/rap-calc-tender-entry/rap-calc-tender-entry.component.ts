import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { RapCalComponent } from '../rap-cal.component';

@Component({
  selector: 'app-rap-calc-tender-entry',
  templateUrl: './rap-calc-tender-entry.component.html',
  styleUrls: ['./rap-calc-tender-entry.component.css']
})
export class RapCalcTenderEntryComponent implements OnInit {

  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));

  S_CODE: any = ''
  Q_CODE: any = ''
  Q_NAME: any = ''
  C_CODE: any = ''
  C_NAME: any = ''
  DIA: any = ''
  CUT_CODE: any = ''
  CUT_NAME: any = ''
  POL_CODE: any = ''
  POL_NAME: any = ''
  SYM_CODE: any = ''
  SYM_NAME: any = ''
  FL_CODE: any = ''
  FL_NAME: any = ''
  INC_CODE: any = ''
  INC_NAME: any = ''
  SH_CODE: any = ''
  SH_NAME: any = ''
  PRDMILKY: any = ''
  PRDMILKY_NAME: any = ''
  PRDREDSPOT: any = ''
  PRDREDSPOT_NAME: any = ''
  RAPTYPE: any = ''
  CARAT: any = ''
  RATE: any = ''
  AMMOUNT: any = ''
  MC1: any = ''
  MC2: any = ''
  MC3: any = ''
  DN: any = ''
  E1: any = ''
  E2: any = ''
  E3: any = ''
  DEPTH: any = ''
  COMMENT: any = ''
  RATIO: any = ''
  MCCOLOR_CODE: any = ''
  MCCOLOR_NAME: any = ''
  TENSION_CODE: any = ''
  TENSION_NAME: any = ''
  REMARK_CODE: any = ''
  REMARK_NAME: any = ''

  MCColorArray: any = []
  TensionArray: any = []
  RemarkArray: any = []

  constructor(
    private EncrDecrServ: EncrDecrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mdr: MatDialogRef<RapCalComponent>,
  ) { }

  ngOnInit(): void {
  
    this.getAutoCompleteVales()
    this.assignDefaultValues()
  }

  getAutoCompleteVales() {

    this.MCColorArray = this.decodedMast[3].map(item => {
      return { code: item.C_CODE, name: item.C_NAME };
    });

    this.TensionArray = this.decodedMast[18].map(item => {
      return { code: item.TEN_CODE, name: item.TEN_NAME };
    });

    this.RemarkArray = this.decodedMast[47].filter(item => item.PROC_CODE == 'RAP').map(item => {
      return { code: item.R_CODE, name: item.R_NAME };
    });
  }

  assignDefaultValues() {
    //disabled valyes
    this.S_CODE = this.data.PRDS_CODE ? this.data.PRDS_CODE : ''
    this.Q_CODE = this.data.PRDQ_CODE ? this.data.PRDQ_CODE : ''
    this.Q_NAME = this.data.Q_NAME ? this.data.Q_NAME : ''
    this.C_CODE = this.data.PRDC_CODE ? this.data.PRDC_CODE : ''
    this.C_NAME = this.data.C_NAME ? this.data.C_NAME : ''
    this.CUT_CODE = this.data.PRDCUT_CODE ? this.data.PRDCUT_CODE : ''
    this.CUT_NAME = this.data.CUT_NAME ? this.data.CUT_NAME : ''
    this.POL_CODE = this.data.PRDPOL_CODE ? this.data.PRDPOL_CODE : ''
    this.POL_NAME = this.data.POL_NAME ? this.data.POL_NAME : ''
    this.SYM_CODE = this.data.PRDSYM_CODE ? this.data.PRDSYM_CODE : ''
    this.SYM_NAME = this.data.SYM_NAME ? this.data.SYM_NAME : ''
    this.FL_CODE = this.data.PRDFL_CODE ? this.data.PRDFL_CODE : ''
    this.FL_NAME = this.data.FL_NAME ? this.data.FL_NAME : ''
    this.INC_CODE = this.data.PRDIN_CODE ? this.data.PRDIN_CODE : ''
    this.INC_NAME = this.data.IN_NAME ? this.data.IN_NAME : ''
    this.SH_CODE = this.data.PRDSH_CODE ? this.data.PRDSH_CODE : ''
    this.SH_NAME = this.data.SH_NAME ? this.data.SH_NAME : ''
    this.PRDMILKY = this.data.PRDMILKY ? this.data.PRDMILKY : ''
    this.PRDMILKY_NAME = this.data.PRDMILKY_NAME ? this.data.PRDMILKY_NAME : ''
    this.PRDREDSPOT = this.data.PRDREDSPOT ? this.data.PRDREDSPOT : ''
    this.PRDREDSPOT_NAME = this.data.PRDREDSPOT_NAME ? this.data.PRDREDSPOT_NAME : ''
    this.RAPTYPE = this.data.RAPTYPE ? this.data.RAPTYPE : ''
    this.CARAT = this.data.PRDCARAT ? this.data.PRDCARAT : ''
    this.RATE = this.data.RATE ? this.data.RATE : ''
    this.AMMOUNT = this.data.AMT ? this.data.AMT : ''

    //editable values
    this.MC1 = this.data.MC1 ? this.data.MC1 : ''
    this.MC2 = this.data.MC2 ? this.data.MC2 : ''
    this.MC3 = this.data.MC3 ? this.data.MC3 : ''
    this.DN = this.data.DN ? this.data.DN : ''
    this.E1 = this.data.E1 ? this.data.E1 : ''
    this.E2 = this.data.E2 ? this.data.E2 : ''
    this.E3 = this.data.E3 ? this.data.E3 : ''
    this.DEPTH = this.data.DEP ? this.data.DEP : ''
    this.DIA = this.data.DIA ? this.data.DIA : ''
    this.COMMENT = this.data.COMENT ? this.data.COMENT : ''
    this.RATIO = this.data.RAT ? this.data.RAT : ''
    this.TENSION_NAME = this.data.TEN_NAME.code || this.data.TEN_NAME.code == '' ? this.data.TEN_NAME.code : this.data.TEN_NAME
    this.TENSION_CODE = this.TensionArray.find(item => item.name === this.TENSION_NAME).code
    this.MCCOLOR_NAME = this.data.MC_NAME.code || this.data.MC_NAME.code == '' ? this.data.MC_NAME.code : this.data.MC_NAME
    this.MCCOLOR_CODE = this.MCCOLOR_NAME ? this.MCColorArray.find(item => item.name === this.MCCOLOR_NAME).code : ''
    this.REMARK_NAME = this.data.REM.code || this.data.REM.code == '' ? this.data.REM.code : this.data.REM
    this.REMARK_CODE = this.REMARK_NAME ? this.RemarkArray.find(item => item.name === this.REMARK_NAME).code : ''
  }

  Close() {
    const tenderData = {
      "PLNSEL": this.data.PLNSEL ? this.data.PLNSEL : '',
      "PLANNO": this.data.PLANNO ? this.data.PLANNO : '',
      "PTAG": this.data.PTAG ? this.data.PTAG : '',
      "EMP_CODE": this.data.EMP_CODE ? this.data.EMP_CODE : '',
      "PRDS_CODE": this.data.PRDS_CODE ? this.data.PRDS_CODE : '',
      "PRDQ_CODE": this.data.PRDQ_CODE ? this.data.PRDQ_CODE : '',
      "Q_NAME": this.data.Q_NAME ? this.data.Q_NAME : '',
      "PRDC_CODE": this.data.PRDC_CODE ? this.data.PRDC_CODE : '',
      "C_NAME": this.data.C_NAME ? this.data.C_NAME : '',
      "PRDMFL_CODE": this.data.PRDMFL_CODE ? this.data.PRDMFL_CODE : '',
      "PRDCARAT": this.data.PRDCARAT ? this.data.PRDCARAT : '',
      "PRDCUT_CODE": this.data.PRDCUT_CODE ? this.data.PRDCUT_CODE : '',
      "CUT_NAME": this.data.CUT_NAME ? this.data.CUT_NAME : '',
      "PRDPOL_CODE": this.data.PRDPOL_CODE ? this.data.PRDPOL_CODE : '',
      "POL_NAME": this.data.POL_NAME ? this.data.POL_NAME : '',
      "PRDSYM_CODE": this.data.PRDSYM_CODE ? this.data.PRDSYM_CODE : '',
      "SYM_NAME": this.data.SYM_NAME ? this.data.SYM_NAME : '',
      "PRDFL_CODE": this.data.PRDFL_CODE ? this.data.PRDFL_CODE : '',
      "FL_NAME": this.data.FL_NAME ? this.data.FL_NAME : '',
      "PRDIN_CODE": this.data.PRDIN_CODE ? this.data.PRDIN_CODE : '',
      "IN_NAME": this.data.IN_NAME ? this.data.IN_NAME : '',
      "PRDSH_CODE": this.data.PRDSH_CODE ? this.data.PRDSH_CODE : '',
      "SH_NAME": this.data.SH_NAME ? this.data.SH_NAME : '',
      "RATE": this.data.RATE ? this.data.RATE : '',
      "AMT": this.data.AMT ? this.data.AMT : '',
      "SRATE": this.data.SRATE ? this.data.SRATE : '',
      "SAMT": this.data.SAMT ? this.data.SAMT : '',
      "RRATE": this.data.RRATE ? this.data.RRATE : '',
      "RAMT": this.data.RAMT ? this.data.RAMT : '',
      "CPAMT": this.data.CPAMT ? this.data.CPAMT : '',
      "CMAMT": this.data.CMAMT ? this.data.CMAMT : '',
      "QPAMT": this.data.QPAMT ? this.data.QPAMT : '',
      "QMAMT": this.data.QMAMT ? this.data.QMAMT : '',
      "PRDTABLE": this.data.PRDTABLE ? this.data.PRDTABLE : '',
      "PRDTABLE_BLACK": this.data.PRDTABLE_BLACK ? this.data.PRDTABLE_BLACK : '',
      "PRDTABLE_OPEN": this.data.PRDTABLE_OPEN ? this.data.PRDTABLE_OPEN : '',
      "PRDSIDE": this.data.PRDSIDE ? this.data.PRDSIDE : '',
      "PRDSIDE_BLACK": this.data.PRDSIDE_BLACK ? this.data.PRDSIDE_BLACK : '',
      "PRDSIDE_OPEN": this.data.PRDSIDE_OPEN ? this.data.PRDSIDE_OPEN : '',
      "PRDCROWN_OPEN": this.data.PRDCROWN_OPEN ? this.data.PRDCROWN_OPEN : '',
      "PRDGIRDLE_OPEN": this.data.PRDGIRDLE_OPEN ? this.data.PRDGIRDLE_OPEN : '',
      "PRDPAV_OPEN": this.data.PRDPAV_OPEN ? this.data.PRDPAV_OPEN : '',
      "PRDCULET": this.data.PRDCULET ? this.data.PRDCULET : '',
      "PRDEXTFACET": this.data.PRDEXTFACET ? this.data.PRDEXTFACET : '',
      "PRDEYECLEAN": this.data.PRDEYECLEAN ? this.data.PRDEYECLEAN : '',
      "PRDGRAINING": this.data.PRDGRAINING ? this.data.PRDGRAINING : '',
      "PRDLUSTER": this.data.PRDLUSTER ? this.data.PRDLUSTER : '',
      "PRDMILKY": this.data.PRDMILKY ? this.data.PRDMILKY : '',
      "PRDNATURAL": this.data.PRDNATURAL ? this.data.PRDNATURAL : '',
      "PRDREDSPOT": this.data.PRDREDSPOT ? this.data.PRDREDSPOT : '',
      "TYP": this.data.TYP ? this.data.TYP : '',
      "ISLOCK": this.data.ISLOCK,
      "CMAMTCOL": this.data.CMAMTCOL ? this.data.CMAMTCOL : '',
      "CPAMTCOL": this.data.CPAMTCOL ? this.data.CPAMTCOL : '',
      "QMAMTCOL": this.data.QMAMTCOL ? this.data.QMAMTCOL : '',
      "QPAMTCOL": this.data.QPAMTCOL ? this.data.QPAMTCOL : '',
      "PRDDIA_CODE": this.data.PRDDIA_CODE ? this.data.PRDDIA_CODE : '',
      "PRDDEPTH_CODE": this.data.PRDDEPTH_CODE ? this.data.PRDDEPTH_CODE : '',
      "PRDTAB_CODE": this.data.PRDTAB_CODE ? this.data.PRDTAB_CODE : '',
      "PRDRAT_CODE": this.data.PRDRAT_CODE ? this.data.PRDRAT_CODE : '',
      "RAPTYPE": this.data.RAPTYPE ? this.data.RAPTYPE : '',
      "V_CODE": this.data.V_CODE ? this.data.V_CODE : '',
      "REM": this.REMARK_NAME ? this.REMARK_NAME : '',
      "R_CODE": this.REMARK_CODE ? this.REMARK_CODE : '',
      "TEN_NAME": this.TENSION_NAME ? this.TENSION_NAME : '',
      "T_CODE": this.TENSION_CODE ? this.TENSION_CODE : '',
      "PRDMC_CODE": this.MCCOLOR_CODE ? this.MCCOLOR_CODE : '',
      "MC_NAME": this.MCCOLOR_NAME ? this.MCCOLOR_NAME : '',
      "ORDNO": this.data.ORDNO ? this.data.ORDNO : '',
      "MC1": this.MC1 ? this.MC1 : '',
      "MC2": this.MC2 ? this.MC2 : '',
      "MC3": this.MC3 ? this.MC3 : '',
      "DN": this.DN ? this.DN : '',
      "E1": this.E1 ? this.E1 : '',
      "E2": this.E2 ? this.E2 : '',
      "E3": this.E3 ? this.E3 : '',
      "DEP": this.DEPTH ? this.DEPTH : '',
      "DIA": this.DIA ? this.DIA : '',
      "RAT": this.RATIO ? this.RATIO : '',
      "COMENT": this.COMMENT ? this.COMMENT : '',
      "RELOCK": this.data.RELOCK
    }
    this._mdr.close(tenderData);
  }

  GetName(code, name, array) {
    this[name] = code == '' ? '' : array.find(x => x.code == code).name ? array.find(x => x.code == code).name : '';
  }

}
