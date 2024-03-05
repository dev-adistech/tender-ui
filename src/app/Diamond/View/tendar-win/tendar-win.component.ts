import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { EncrDecrService } from "src/app/Service/Common/encr-decr.service";
import { ViewService } from "src/app/Service/View/view.service";
import { GridFunctions } from "../../_helpers/functions/GridFunctions";
import { ConverterFunctions } from "../../_helpers/functions/ConverterFunctions";
import { ToastrService } from "ngx-toastr";
import { ViewParaMastService } from "src/app/Service/Master/view-para-mast.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { TendatMastService } from "src/app/Service/Transaction/tendat-mast.service";
import { environment } from "src/environments/environment";
import { ListboxComponent } from "../../Common/listbox/listbox.component";
import { FrmOpePer } from "../../_helpers/frm-ope-per";
declare let $: any;
@Component({
  selector: "app-tendar-win",
  templateUrl: "./tendar-win.component.html",
  styleUrls: ["./tendar-win.component.css"],
})
export class TendarWinComponent implements OnInit {
  public url = environment.BaseUrl;
  public port = environment.PORT;

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));
  decodedMast = JSON.parse(
    this.EncrDecrServ.get(localStorage.getItem("unfam1"))
  );

  DEPTArr: any = [];
  COMP_CODE: any = "";
  COMP_NAME: any = "";

  public columnDefs;
  public pinnedBottomRowData;
  public gridApi;
  public gridColumnApi;
  public getRowStyle;
  public defaultColDef;
  public gridOptions;

  GridHeader = [];
  FooterKey = [];
  FooterValue = [];
  GridFooter: any[] = [];

  DETIDarr: any = [];
  DETID: any = "";
  T_NAME: any = "";
  F_DATE: any = "";
  T_DATE: any = "";

  DATE: any = "";
  I_CARAT: any = "";
  FAMT: any = "";
  PCRT: any = "";
  ExcelData: any = "";
  HeaderData: any = "";

  ALLOWINS: boolean = false;
  ALLOWDEL: boolean = false;
  ALLOWUPD: boolean = false;
  PASS: any = "";
  PER = [];
  hide = true;
  PASSWORD: any = "";

  constructor(
    public dialog: MatDialog,
    private EncrDecrServ: EncrDecrService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private ViewServ: ViewService,
    private _gridFunction: GridFunctions,
    private _convFunction: ConverterFunctions,
    private toastr: ToastrService,
    private TendarMastser: TendatMastService,
    private _FrmOpePer: FrmOpePer,
    private datePipe: DatePipe,
    private ViewParaMastServ: ViewParaMastService
  ) {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      enableRowGroup: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
    };
    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      context: { thisComponent: this },
    };
    this.getRowStyle = function (params) {
      if (params.node.rowPinned === "bottom") {
        return { background: "#FFE0C0", fontWeight: "bold" };
      }
    };
    this.FillViewPara();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  async ngOnInit() {
    this.PER = await this._FrmOpePer.UserFrmOpePer("TendarWinComponent");
    this.ALLOWDEL = this.PER[0].DEL;
    this.ALLOWINS = this.PER[0].INS;
    this.ALLOWUPD = this.PER[0].UPD;
    this.PASS = this.PER[0].PASS;

    this.DEPTArr = this.decodedMast[2].map((item) => {
      return { code: item.COMP_CODE, name: item.COMP_NAME };
    });
  }

  groupByArray(xs, GROUPKEY) {
    return xs.reduce(function (rv, x) {
      let _GROUPKEY = GROUPKEY instanceof Function ? GROUPKEY(x) : x[GROUPKEY];

      let el = rv.find((r) => r && r.GROUPKEY === _GROUPKEY);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({
          GROUPKEY: _GROUPKEY,
          Data: [x],
        });
      }

      return rv;
    }, []);
  }

  FillViewPara() {
    let op = this;
    this.ViewParaMastServ.ViewParaFill({ FORMNAME: "FrmTenderWin" }).subscribe(
      (VPRes) => {
        try {
          if (VPRes.success == 1) {
            let GroupData = this.groupByArray(VPRes.data, "GROUPKEY");
            let ViewParaRowData = [];
            for (let i = 0; i < GroupData.length; i++) {
              let jsonData = {};
              jsonData["headerName"] = GroupData[i].GROUPKEY;
              jsonData["headerClass"] = "header-align-center";
              let tempData = [];

              for (let j = 0; j < GroupData[i].Data.length; j++) {
                if(GroupData[i].Data[j].FIELDNAME === "WINCOMMENT"){
                  tempData.push({
                    headerName: GroupData[i].Data[j].DISPNAME,
                    headerClass: GroupData[i].Data[j].HEADERALIGN,
                    field: GroupData[i].Data[j].FIELDNAME,
                    width: GroupData[i].Data[j].COLWIDTH,
                    cellStyle: {
                      "text-align": GroupData[i].Data[j].CELLALIGN,
                      "background-color": GroupData[i].Data[j].BACKCOLOR,
                      color: GroupData[i].Data[j].FONTCOLOR,
                      "font-weight":
                        GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                    },
                    resizable: GroupData[i].Data[j].ISRESIZE,
                    GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                    hide: GroupData[i].Data[j].DISP == false ? true : false,
                    pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                    suppressMenu: true,
                    editable: (params: any) => {
                        if (this.PASS == this.PASSWORD) {
                          return true
                        } else {
                          return false;
                        }
                    },
                    rowSpan: this.rowSpy.bind(this),
                    cellClass: function (params) {
                      if (params.node.rowPinned != "bottom") {
                        if (params.colDef.field == "WINCOMMENT") {
                          return "cell-span1";
                        }
                      }
                    },
                  });
                }else{
                tempData.push({
                  headerName: GroupData[i].Data[j].DISPNAME,
                  headerClass: GroupData[i].Data[j].HEADERALIGN,
                  field: GroupData[i].Data[j].FIELDNAME,
                  width: GroupData[i].Data[j].COLWIDTH,
                  cellStyle: {
                    "text-align": GroupData[i].Data[j].CELLALIGN,
                    "background-color": GroupData[i].Data[j].BACKCOLOR,
                    color: GroupData[i].Data[j].FONTCOLOR,
                    "font-weight":
                      GroupData[i].Data[j].ISBOLD === true ? "bold" : "",
                  },
                  resizable: GroupData[i].Data[j].ISRESIZE,
                  GROUPKEY: GroupData[i].Data[j].GROUPKEY,
                  hide: GroupData[i].Data[j].DISP == false ? true : false,
                  pinned: GroupData[i].Data[j].ISFREEZE == true ? "left" : null,
                  suppressMenu: true,
                  rowSpan: this.rowSpy.bind(this),
                  cellClass: function (params) {
                    if (params.node.rowPinned != "bottom") {
                      if (params.colDef.headerName == "R.Weight") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "T-AMOUNT") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "PAY") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "PAY PER CRT") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "PER") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "LABOUR") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "LAB") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "Tenshan") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "DN") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "USER1") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "USER2") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "USER3") {
                        return "cell-span1";
                      }
                      if (params.colDef.headerName == "Commnet") {
                        return "cell-span1";
                      }
                    }
                  },
                });
              }

                if (GroupData[i].Data[j].FIELDNAME === "I_CARAT" || GroupData[i].Data[j].FIELDNAME === "SRNO") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                }
                if (GroupData[i].Data[j].FORMAT == "#0") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter = this._convFunction.NumberFormat;
                } else if (GroupData[i].Data[j].FORMAT == "#0.00") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.TwoFloatFormat;
                } else if (GroupData[i].Data[j].FORMAT == "#0.000") {
                  this.FooterKey.push(GroupData[i].Data[j].FIELDNAME);
                  tempData[j].valueFormatter =
                    this._convFunction.ThreeFloatFormat;
                } else if (GroupData[i].Data[j].FORMAT == "DateFormat") {
                  tempData[j].cellRenderer = this.DateFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else if (GroupData[i].Data[j].FORMAT == "TimeFormat") {
                  tempData[j].cellRenderer = this.TimeFormat.bind(this);
                  delete tempData[j].valueFormatter;
                } else {
                  tempData[j].valueFormatter = this._convFunction.StringFormat;
                }
                this._gridFunction.FooterKey = this.FooterKey;
              }
              jsonData["children"] = tempData;
              tempData = [];
              ViewParaRowData.push(jsonData);
            }
            let op = this
            ViewParaRowData.unshift({
              headerName: "Action",
              headerClass: "header-align-center",
              width: 50,
              children: [
                {
                  headerName: 'Action',
                  field: 'Action',
                  width: 50,
                  resizable: true,
                  suppressMenu:true,
                  cellRenderer: function (params) {
                    let a = '<span class="det_val">'
                    if (op.PASSWORD) {
      
                      if (op.PASSWORD == op.PASS) {
                        if (op.ALLOWDEL) {
                          if (params.node.rowPinned != "bottom") {
                          a = a + '<svg class="grid-icon icon-save" data-action-type="SaveData" > <use data-action-type="SaveData" xlink: href = "assets/symbol-defs.svg#icon-save" > </use> </svg>'
                          }
                        }
                      }
                    }
                    a = a + "</span>"
                    return a
                  },
                },
              ]
            })
            this.columnDefs = ViewParaRowData;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: JSON.stringify(VPRes.data),
            });
          }
        } catch (error) {
          console.log(error);
          this.toastr.error(error);
        }
      }
    );
  }

  onGridRowClicked(eve){
    let actionType = eve.event.target.getAttribute("data-action-type")
    if (actionType == 'SaveData') {
      let SaveObj ={
        COMP_CODE:eve.data.COMP_CODE ? eve.data.COMP_CODE:"",
        DETID:eve.data.DETID ? eve.data.DETID:0,
        SRNO:eve.data.SRNO ? eve.data.SRNO:0,
        WINCOMMENT:eve.data.WINCOMMENT ? eve.data.WINCOMMENT:"",
      }
      this.ViewServ.TenderWinCommentSave(SaveObj).subscribe((SaveRes) => {
        try {
          if (SaveRes.success == true) {
            this.spinner.hide()
            this.toastr.success("Save Sucessfully")
          }else{
            this.spinner.hide()
            this.toastr.warning(SaveRes.data)
          }
        }catch(err){
          this.spinner.hide()
          this.toastr.error(err)
        }
      })

    }
  }

  CHANGEPASSWORD() {
    if (!this.PASS) return;
    if (this.PASSWORD === this.PASS) {
      this.gridOptions.columnApi.setColumnVisible('ORAP', true);
      this.gridOptions.columnApi.setColumnVisible('DIS', true);
      this.gridApi.redrawRows();
    } else {
      this.gridOptions.columnApi.setColumnVisible('ORAP', false);
      this.gridOptions.columnApi.setColumnVisible('DIS', false);
      this.gridApi.redrawRows();
    }
    this.gridApi.redrawRows();
  }

  rowSpy(params) {
    let SubData = [];
    this.gridApi.forEachNode(function (rowNode, index) {
      SubData.push(rowNode.data);
    });

    if (SubData.length != 0 && params.colDef.headerName == "R.Weight") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT == SubData[params.node.rowIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.I_CARAT == SubData[i].I_CARAT &&
              params.data.I_CARAT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.I_CARAT != SubData[previousIndex].I_CARAT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.I_CARAT == SubData[i].I_CARAT &&
              params.data.I_CARAT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "T-AMOUNT") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (
          params.data.MAMT == SubData[params.node.rowIndex].MAMT &&
          params.data.MAMT
        ) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.MAMT == SubData[i].MAMT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.MAMT != SubData[previousIndex].MAMT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.MAMT == SubData[i].MAMT && params.data.MAMT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "PAY") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.FAMT == SubData[params.node.rowIndex].FAMT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.FAMT == SubData[i].FAMT && params.data.FAMT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.FAMT != SubData[previousIndex].FAMT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.FAMT == SubData[i].FAMT && params.data.FAMT) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "PAY PER CRT") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.FBID == SubData[params.node.rowIndex].FBID) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.FBID == SubData[i].FBID && params.data.FBID) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.FBID != SubData[previousIndex].FBID) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.FBID == SubData[i].FBID && params.data.FBID) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "PER") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.PER == SubData[params.node.rowIndex].PER) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.PER == SubData[i].PER && params.data.PER) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.PER != SubData[previousIndex].PER) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.PER == SubData[i].PER && params.data.PER) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "LABOUR") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.PERPAY == SubData[params.node.rowIndex].PERPAY) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.PERPAY == SubData[i].PERPAY && params.data.PERPAY) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.PERPAY != SubData[previousIndex].PERPAY) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.PERPAY == SubData[i].PERPAY && params.data.PERPAY) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }

    if (SubData.length != 0 && params.colDef.headerName == "LAB") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.LAB_NAME == SubData[params.node.rowIndex].LAB_NAME) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.LAB_NAME == SubData[i].LAB_NAME &&
              params.data.LAB_NAME
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.LAB_NAME != SubData[previousIndex].LAB_NAME) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.LAB_NAME == SubData[i].LAB_NAME &&
              params.data.LAB_NAME
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }

    if (SubData.length != 0 && params.colDef.headerName == "Tenshan") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.T_NAME == SubData[params.node.rowIndex].T_NAME) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.T_NAME == SubData[i].T_NAME && params.data.T_NAME) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.T_NAME != SubData[previousIndex].T_NAME) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.T_NAME == SubData[i].T_NAME && params.data.T_NAME) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }

    if (SubData.length != 0 && params.colDef.headerName == "DN") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.DN == SubData[params.node.rowIndex].DN) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.DN == SubData[i].DN && params.data.DN) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.DN != SubData[previousIndex].DN) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.DN == SubData[i].DN && params.data.DN) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }

    if (SubData.length != 0 && params.colDef.headerName == "USER1") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U1 == SubData[params.node.rowIndex].U1) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U1 == SubData[i].U1 && params.data.U1) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U1 != SubData[previousIndex].U1) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U1 == SubData[i].U1 && params.data.U1) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "USER2") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U2 == SubData[params.node.rowIndex].U2) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U2 == SubData[i].U2 && params.data.U2) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U2 != SubData[previousIndex].U2) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U2 == SubData[i].U2 && params.data.U2) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }

    if (SubData.length != 0 && params.colDef.headerName == "USER3") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U3 == SubData[params.node.rowIndex].U3) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U3 == SubData[i].U3 && params.data.U3) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.U3 != SubData[previousIndex].U3) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (params.data.U3 == SubData[i].U3 && params.data.U3) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.headerName == "Commnet") {
      if (params.node.rowIndex == 0) {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.BVCOMMENT == SubData[params.node.rowIndex].BVCOMMENT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.BVCOMMENT == SubData[i].BVCOMMENT &&
              params.data.BVCOMMENT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.BVCOMMENT != SubData[previousIndex].BVCOMMENT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.BVCOMMENT == SubData[i].BVCOMMENT &&
              params.data.BVCOMMENT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      }
    }
    if (SubData.length != 0 && params.colDef.field == "WINCOMMENT") {
      if (params.node.rowIndex == 0) {
        if (params.data.WINCOMMENT == SubData[params.node.rowIndex].WINCOMMENT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.WINCOMMENT == SubData[i].WINCOMMENT &&
              params.data.WINCOMMENT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
      } else {
        let previousIndex =
          params.node.rowIndex != 0
            ? params.node.rowIndex - 1
            : params.node.rowIndex;
        if (params.data.WINCOMMENT != SubData[previousIndex].WINCOMMENT) {
          let mergeIndex = 0;
          for (let i = params.node.rowIndex; i < SubData.length; i++) {
            if (
              params.data.WINCOMMENT == SubData[i].WINCOMMENT &&
              params.data.WINCOMMENT
            ) {
              mergeIndex += 1;
            } else {
              break;
            }
          }
          return mergeIndex;
        } else {
          return 0;
        }
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

  LoadGridData() {
    this.FAMT = "";
    this.DATE = "";
    this.PCRT = "";
    this.I_CARAT = "";
    let FillObj = {
      COMP_CODE: this.COMP_CODE ? this.COMP_CODE : "",
      DETID: this.DETID ? this.DETID : "",
      F_DATE: this.F_DATE
        ? this.datePipe.transform(this.F_DATE, "yyyy-MM-dd")
        : null,
      T_DATE: this.T_DATE
        ? this.datePipe.transform(this.T_DATE, "yyyy-MM-dd")
        : null,
      ISPASS: this.PASS === this.PASSWORD ? 1 : 0,
    };
    this.spinner.show();
    this.ViewServ.TenderWin(FillObj).subscribe((FillRes) => {
      try {
        if (FillRes.success == true) {
          this.gridApi.setRowData(FillRes.data[0]);
          this.ExcelData = FillRes.data[0];
          this.HeaderData = FillRes.data[1];
          this.FAMT = FillRes.data[1][0]["FAMT"];
          this.DATE = FillRes.data[1][0]["T_DATE"];
          this.PCRT = FillRes.data[1][0]["PCRT"];
          this.I_CARAT = FillRes.data[1][0]["I_CARAT"];
          this.spinner.hide();

          this._gridFunction.FooterKey = this.FooterKey;
          this.pinnedBottomRowData = this._gridFunction.footerCal(
            FillRes.data[0]
          );
          this.pinnedBottomRowData[0].I_CARAT = this.I_CARAT;

          let SubData = [];
          this.gridApi.forEachNode(function (rowNode, index) {
            SubData.push(rowNode.data);
          });
          let ValueOfTamount = 0;
          let SumOfTamount = 0;

          let ValueOfPay = 0;
          let SumOfPay = 0;

          let ValueOfPayPer = 0;
          let SumOfPayPer = 0;

          let ValueOfPer = 0;
          let SumOfPer = 0;

          let ValueOfLab = 0;
          let SumOfLab = 0;
          let SumOfSrno = 0;
          for (let i = 0; i < SubData.length; i++) {
            if (ValueOfTamount !== SubData[i].MAMT) {
              ValueOfTamount = SubData[i].MAMT;
              SumOfTamount += SubData[i].MAMT;
              SumOfSrno += 1;
            }

            if (ValueOfPay !== SubData[i].FAMT) {
              ValueOfPay = SubData[i].FAMT;
              SumOfPay += SubData[i].FAMT;
            }

            if (ValueOfPayPer !== SubData[i].FBID) {
              ValueOfPayPer = SubData[i].FBID;
              SumOfPayPer += SubData[i].FBID;
            }

            if (ValueOfPayPer !== SubData[i].FBID) {
              ValueOfPayPer = SubData[i].FBID;
              SumOfPayPer += SubData[i].FBID;
            }

            if (ValueOfPer !== SubData[i].PER) {
              ValueOfPer = SubData[i].PER;
              SumOfPer += SubData[i].PER;
            }

            if (ValueOfLab !== SubData[i].PERPAY) {
              ValueOfLab = SubData[i].PERPAY;
              SumOfLab += SubData[i].PERPAY;
            }
          }
          this.pinnedBottomRowData[0].MAMT = SumOfTamount.toFixed(2);
          this.pinnedBottomRowData[0].FAMT = SumOfPay.toFixed(2);
          this.pinnedBottomRowData[0].FBID = FillRes.data[1][0]["PCRT"];
          this.pinnedBottomRowData[0].PER = SumOfPer.toFixed(2);
          this.pinnedBottomRowData[0].PERPAY = SumOfLab.toFixed(2);
          this.pinnedBottomRowData[0].SRNO = SumOfSrno;

          const agBodyViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          const agBodyHorizontalViewport: HTMLElement =
            this.elementRef.nativeElement.querySelector(
              ".ag-body-horizontal-scroll-viewport"
            );
          if (agBodyViewport) {
            const psV = new PerfectScrollbar(agBodyViewport);
            psV.update();
          }
          if (agBodyHorizontalViewport) {
            const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            psH.update();
          }
          if (agBodyViewport) {
            const ps = new PerfectScrollbar(agBodyViewport);
            const container = document.querySelector(".ag-body-viewport");
            ps.update();
          }
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
  getContextMenuItems(params) {
    let inputText = "";
    if (params.context.thisComponent.ISFILTER == true) {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck" checked>`;
    } else {
      inputText = `<span>Filter  </span><input type="checkbox" data-action-type="FilterCheck">`;
    }
    var result = [
      {
        name: inputText,
        action: () => {
          params.context.thisComponent.ISFILTER =
            !params.context.thisComponent.ISFILTER;
          var tempColumnDefs =
            params.context.thisComponent.gridApi.getColumnDefs();
          tempColumnDefs.map((grpHeader) => {
            grpHeader.children.map((ClmHeader) => {
              ClmHeader.suppressMenu = !ClmHeader.suppressMenu;
            });
          });
          params.context.thisComponent.columnDefs = tempColumnDefs;
        },
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "separator",
      "export",
    ];
    return result;
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

  GETDETID() {
    this.DETID = "";
    this.T_NAME = "";
    this.DETIDarr = [];
    this.TendarMastser.TendarMastFill({ COMP_CODE: this.COMP_CODE }).subscribe(
      (FillRes) => {
        try {
          if (FillRes.success == true) {
            this.spinner.hide();
            this.DETIDarr = FillRes.data
              .filter((item) => item.ISACTIVE == true && item.ISMIX == false)
              .map((item) => {
                return {
                  code: item.DETID,
                  date: item.T_DATE,
                  name: item.T_NAME,
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
      }
    );
  }
  GETDATE() {
    if (this.COMP_CODE) {
      if (this.DEPTArr.filter((x) => x.code == this.COMP_CODE).length != 0) {
        this.T_NAME = this.DETIDarr.filter((x) => x.code == this.DETID)[0].name;
      }
    } else {
      this.DETID = "";
    }
  }
  Excel() {
    let ExcelData = this.ExcelData;
    let HeaderData = this.HeaderData;
    let rowData = [];

    ExcelData.map((x) => {
      rowData.push(x);
    });

    rowData = rowData.map((v) => ({
      ...v,
    }));

    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST";
    if (this.PASS === this.PASSWORD) {
      mapForm.action = `https://${this.url}:${this.port}/api/View/TendarWinSheet`;
    } else {
      mapForm.action = `https://${this.url}:${this.port}/api/View/TendarWinSheetUnmatch`;
    }

    let obj = {
      DataRow: JSON.stringify(rowData),
      HeaderDataRow: JSON.stringify(HeaderData),
    };

    Object.keys(obj).forEach(function (param) {
      if (obj[param]) {
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = param;
        mapInput.setAttribute("value", obj[param]);
        mapForm.appendChild(mapInput);
      }
    });

    document.body.appendChild(mapForm);
    mapForm.submit();
  }
  OpenDetIdPopup() {
    const PRF = this.dialog.open(ListboxComponent, {
      width: "30%",
      data: { arr: this.DETIDarr, CODE: this.DETID, TYPE: "DETID" },
      panelClass: "ListboxDialog",
    });
    $("#Close").click();
    PRF.afterClosed().subscribe((result) => {
      this.DETID = result;
    });
  }
}
