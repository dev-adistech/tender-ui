import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private subject: Subject<any> = new Subject<any>();
  tabChanged$: Observable<any> = this.subject.asObservable();

  // public url = environment.BaseUrl

  constructor(private http: HttpClient) { }

  sendTabChangedEvent(Data) {
    this.subject.next(Data);
  }

  getTabChangedEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  PacketView(Data: any): Observable<any> {
    return this.http.post<any>('View/PacketView', Data)
  }

  PacketViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/PacketViewTotal', Data)
  }

  ProcessView(Data: any): Observable<any> {
    return this.http.post<any>('View/ProcessView', Data)
  }
  GrdAnalazerView(Data: any): Observable<any> {
    return this.http.post<any>('View/GrdAnalazerView', Data)
  }
  BrkHistoryDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/BrkHistoryDisp', Data)
  }

  ProcessViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/ProcessViewTotal', Data)
  }

  PrcViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PrcViewPrint', Data)
  }

  PrcViewDetPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PrcViewDetPrint', Data)
  }

  PktViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PktViewPrint', Data)
  }

  InnerPacketView(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPacketView', Data)
  }

  InnerPacketViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPacketViewTotal', Data)
  }

  InnerProcessView(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerProcessView', Data)
  }

  InnerProcessViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerProcessViewTotal', Data)
  }

  InnPktViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/InnPktViewPrint', Data)
  }

  InnPrcViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/InnPrcViewPrint', Data)
  }

  PolishStkView(Data: any): Observable<any> {
    return this.http.post<any>('View/PolishStkView', Data)
  }

  PolishStkViewTot(Data: any): Observable<any> {
    return this.http.post<any>('View/PolishStkViewTot', Data)
  }

  EmpIDView(Data: any): Observable<any> {
    return this.http.post<any>('View/EmpIDView', Data)
  }
  EmpPrdView(Data: any): Observable<any> {
    return this.http.post<any>('View/EmpPrdView', Data)
  }

  LivePktView(Data: any): Observable<any> {
    return this.http.post<any>('View/LivePktView', Data)
  }

  LivePktViewExcel(Data: any): Observable<any> {
    return this.http.post<any>('View/LivePktViewExcel', Data)
  }

  MakableView(Data: any): Observable<any> {
    return this.http.post<any>('View/MakableView', Data)
  }

  RouEntViewDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/RouEntViewDisp', Data)
  }

  RouEntViewTotDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/RouEntViewTotDisp', Data)
  }

  PrdQueryDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdQueryDisp', Data)
  }

  EstToGiaView(Data: any): Observable<any> {
    return this.http.post<any>('View/EstToGiaView', Data)
  }

  EstToGiaDiffView(Data: any): Observable<any> {
    return this.http.post<any>('View/EstToGiaDiffView', Data)
  }

  VWCompare(Data: any): Observable<any> {
    return this.http.post<any>('View/VWCompare', Data)
  }

  VWCompareDet(Data: any): Observable<any> {
    return this.http.post<any>('View/VWCompareDet', Data)
  }
  CompareViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/CompareViewPrint', Data)
  }

  HeliumHisView(Data: any): Observable<any> {
    return this.http.post<any>('View/HeliumHisView', Data)
  }

  MakHistoryUnLock(Data: any): Observable<any> {
    return this.http.post<any>('View/MakHistoryUnLock', Data)
  }

  VWGalFileView(Data: any): Observable<any> {
    return this.http.post<any>('View/VWGalFileView', Data)
  }

  VWGalFileViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/VWGalFileViewTotal', Data)
  }

  DeleteView(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmDeleteView', Data)
  }

  BrkViewDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/BrkViewDisp', Data)
  }

  Brkconfirm(Data: any): Observable<any> {
    return this.http.post<any>('View/Brkconfirm', Data)
  }

  GrdOutEntBcode(Data: any): Observable<any> {
    return this.http.post<any>('View/GrdOutEntBcode', Data)
  }

  VWGrdView(Data: any): Observable<any> {
    return this.http.post<any>('View/VWGrdView', Data)
  }

  VWLockView(Data: any): Observable<any> {
    return this.http.post<any>('View/VWLockView', Data)
  }

  VWFrmLockViewPktLock(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmLockViewPktLock', Data)
  }
  VWFrmLockViewClick(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmLockViewClick', Data)
  }
  RapDisCompView(Data: any): Observable<any> {
    return this.http.post<any>('View/RapDisCompView', Data)
  }

  PrdViewDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdViewDisp', Data)
  }

  PrdViewSave(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdViewSave', Data)
  }

  PrdViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdViewPrint', Data)
  }

  InnPrcTallyFGrdView(Data: any): Observable<any> {
    return this.http.post<any>('View/InnPrcTallyFGrdView', Data)
  }

  InnPrcTallySGrdView(Data: any): Observable<any> {
    return this.http.post<any>('View/InnPrcTallySGrdView', Data)
  }

  TallyTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/TallyTotal', Data)
  }

  InnerPrcTallyClear(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPrcTallyClear', Data)
  }

  InnerPrcTally(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPrcTally', Data)
  }

  async InnerPrcChkPcTally(Data: any) {
    return this.http.post<any>('View/InnerPrcChkPcTally', Data).toPromise()
  }

  DimPktViewDisp(Data: any): Observable<any> {
    return this.http.post<any>('View/DimPktViewDisp', Data)
  }

  DimPktViewDispTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/DimPktViewDispTotal', Data)
  }

  DimPktViewDispPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/DimPktViewDispPrint', Data)
  }

  InnerPrcPktViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPrcPktViewPrint', Data)
  }

  InnerPrcPrcViewPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerPrcPrcViewPrint', Data)
  }

  PktViewSummPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PktViewSummPrint', Data)
  }

  PktViewDetPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/PktViewDetPrint', Data)
  }

  GalStkView(Data: any): Observable<any> {
    return this.http.post<any>('View/GalStkView', Data)
  }

  GalStkViewTotal(Data: any): Observable<any> {
    return this.http.post<any>('View/GalStkViewTotal', Data)
  }

  GalStkUpd(Data: any): Observable<any> {
    return this.http.post<any>('View/GalStkUpd', Data)
  }

  DiscussView(Data: any): Observable<any> {
    return this.http.post<any>('View/DiscussView', Data)
  }

  DiscussViewTot(Data: any): Observable<any> {
    return this.http.post<any>('View/DiscussViewTot', Data)
  }

  CompEntView(Data: any): Observable<any> {
    return this.http.post<any>('View/CompEntView', Data)
  }

  FrmAutoTrfAct(Data: any): Observable<any> {
    return this.http.post<any>('View/FrmAutoTrfAct', Data)
  }

  InnerLivePktView(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerLivePktView', Data)
  }

  Pktchk(Data: any): Observable<any> {
    return this.http.post<any>('View/PktChk', Data)
  }

  CommonView(Data: any): Observable<any> {
    return this.http.post<any>('View/CommonView', Data);
  }
  VWFrmCommonViewUPD(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmCommonViewUPD', Data);
  }

  ValMsgView(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmValMsgView', Data);
  }

  NoticeView(Data: any): Observable<any> {
    return this.http.post<any>("View/NoticeView", Data)
  }

  NoticeFill(Data: any): Observable<any> {
    return this.http.post<any>("View/NoticeFill", Data)
  }
  backFill(Data: any): Observable<any> {
    return this.http.post<any>("View/backFill", Data)
  }
  backView(Data: any): Observable<any> {
    return this.http.post<any>("View/backView", Data)
  }

  NoticeDelete(Data: any): Observable<any> {
    return this.http.post<any>("View/NoticeDelete", Data);
  }

  VWFrmAssDiffView(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmAssSDiffView", Data);
  }
  VWFrmAssDiffViewClick(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmAssDiffViewClick", Data);
  }
  VWHeadChkDiffView(Data: any): Observable<any> {
    return this.http.post<any>("View/VWHeadChkDiffView", Data);
  }
  VWHeadChkDiffViewClick(Data: any): Observable<any> {
    return this.http.post<any>("View/VWHeadChkDiffViewClick", Data);
  }
  VWHeadChkDiffViewClickDet(Data: any): Observable<any> {
    return this.http.post<any>("View/VWHeadChkDiffViewClickDet", Data);
  }
  AttUpdView(Data: any): Observable<any> {
    return this.http.post<any>("View/AttUpdView", Data);
  }
  LeaveEntGrpEmpFil(Data: any): Observable<any> {
    return this.http.post<any>("View/LeaveEntGrpEmpFil", Data);
  }
  LeaveEntSave(Data: any): Observable<any> {
    return this.http.post<any>("View/LeaveEntSave", Data);
  }
  VWLeaveEntDisp(Data: any): Observable<any> {
    return this.http.post<any>("View/VWLeaveEntDisp", Data);
  }
  LeaveEntUpdate(Data: any): Observable<any> {
    return this.http.post<any>("View/LeaveEntUpdate", Data);
  }
  LeaveEntDelete(Data: any): Observable<any> {
    return this.http.post<any>("View/LeaveEntDelete", Data);
  }
  VWFrmRouReqView(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmRouReqView", Data);
  }
  VWFrmRouReqEntSave(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmRouReqEntSave", Data);
  }
  VWFrmRouReqPrint(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmRouReqPrint", Data);
  }
  VWFrmGrdLivePktView(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmGrdLivePktView", Data);
  }
  EmpLabourCertiPen(Data: any): Observable<any> {
    return this.http.post<any>("View/EmpLabourCertiPen", Data);
  }
  VWFrmAssEntView(Data: any): Observable<any> {
    return this.http.post<any>("View/VWFrmAssEntView", Data);
  }

  BioDataView(Data: any): Observable<any> {
    return this.http.post<any>('View/BioDataView', Data)
  }
  SawMistView(Data: any): Observable<any> {
    return this.http.post<any>('View/SawMistView', Data)
  }
  SawMacPro(Data: any): Observable<any> {
    return this.http.post<any>('View/SawMacPro', Data)
  }
  SawMacProSave(Data: any): Observable<any> {
    return this.http.post<any>('View/SawMacProSave', Data)
  }
  SawMacProDet(Data: any): Observable<any> {
    return this.http.post<any>('View/SawMacProDet', Data)
  }
  VWEmpLabourCertiPenTot(Data: any): Observable<any> {
    return this.http.post<any>('View/VWEmpLabourCertiPenTot', Data)
  }
  VWEmpLabourCertiPenPrn(Data: any): Observable<any> {
    return this.http.post<any>('View/VWEmpLabourCertiPenPrn', Data)
  }
  VWFrmAssEntViewUpd(Data: any): Observable<any> {
    return this.http.post<any>('View/VWFrmAssEntViewUpd', Data)
  }
  VWEmpLabourCertiPenDetPrint(Data: any): Observable<any> {
    return this.http.post<any>('View/VWEmpLabourCertiPenDetPrint', Data)
  }
  InnerLivePktViewLock(Data: any): Observable<any> {
    return this.http.post<any>('View/InnerLivePktViewLock', Data)
  }
  GradingAvgEntryView(Data: any): Observable<any> {
    return this.http.post<any>('View/GradingAvgEntryView', Data)
  }

  CompareViewExport(Data: any): Observable<any> {
    return this.http.post<any>('View/CompareViewExport', Data)
  }
  PrdViewExport(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdViewExport', Data)
  }
  PrdViewUnLock(Data: any): Observable<any> {
    return this.http.post<any>('View/PrdViewUnLock', Data)
  }
  RelodProgram(Data: any): Observable<any> {
    return this.http.post<any>('reload_program', Data)
  }


  // CompareViewExport(Data: any): Observable<any> {
  //   let CheckStoneArray = Data.Data.map((items) => this.http.post<any>('View/CompareViewExport', {
  //     L_CODE: items.L_CODE,
  //     TAG: items.TAG,
  //     TYP: items.TYP,
  //     FComp: items.FComp,
  //     TComp: items.TComp,
  //     F_DATE: items.F_DATE,
  //     T_DATE: items.T_DATE,
  //     EMP_CODE: items.EMP_CODE,
  //     S_CODE: items.S_CODE,
  //     GRP: items.GRP,
  //     SELECT: items.SELECT,
  //     EMPTYP: items.EMPTYP
  //   }))
  //   return forkJoin(CheckStoneArray)
  // }

}
