import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { RapCutDiscService } from 'src/app/Service/Rap/rap-cut-disc.service';
import { RapMastService } from 'src/app/Service/Rap/rap-mast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ShpMastService } from '../../../Service/Master/shp-mast.service';
import { SizeMastService } from '../../../Service/Master/size-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { AutocompleteFunctions } from '../../_helpers/functions/AutocompleteFunction';
import { IsBlank } from "../../_helpers/functions/isBlank";
import { NumberEditableComponent } from '../rap-mast/number-editable/number-editable.component';
export interface Emp {
  code: string;
  name: string;
}
export interface Size {
  code: string;
  name: string;
  fsize: string;
  tsize: string;
}
@Component({
  selector: 'app-rap-cut-disc',
  templateUrl: './rap-cut-disc.component.html',
  styleUrls: ['./rap-cut-disc-component.css']
})
export class RapCutDiscComponent implements OnInit {

  public url = environment.BaseUrl
  public port = environment.PORT

  decodedMast = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));
  @ViewChild('Import') Import: any;

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public frameworkComponents;

  public columnDefs2;
  public gridApi2;
  public gridColumnApi2;
  public defaultColDef2;
  public frameworkComponents2;

  S_CODE: any = '';
  S_NAME: any = '';
  SZ_CODE: any = '';
  SZ_GROUP: any = '';
  F_SIZE: any = '';
  T_SIZE: any = '';
  CT_CODE: any = '';
  CT_NAME: any = '';
  FL_NAME: any = '';
  FL_CODE: any = '';
  PRP_CODE: any = '';
  PRP_NAME: any = '';
  PRPTYPE: any = 'CT';
  C_NAME: any = 'C_NAME';

  STYPE: any = '';
  RTYPE: any = '';
  C_CODE: any = '';
  PRP: any = '';

  shpCtrl: FormControl;
  filteredShps: Observable<any[]>;
  shapes: Emp[] = [];
  prps: Emp[] = [];

  szCtrl: FormControl;
  filteredSzs: Observable<any[]>;
  sizes: Size[] = [];

  flCtrl: FormControl;
  filteredFls: Observable<any[]>;
  flos: Emp[] = [];

  prpCtrl: FormControl;
  filteredPrps: Observable<any[]>;
  Prps: Emp[] = [];

  RAPTARR = []
  RTARR = []
  FLOVISIBLE: boolean = false
  CUTVISIBLE: boolean = false
  array = [];

  All_Dataset_Arr: any[];

  ALLOWINS: boolean = false
  ALLOWDEL: boolean = false
  ALLOWUPD: boolean = false
  PASS: any = ""
  PER = []
  hide = true
  PASSWORD: any = ""

  constructor(
    private ShpMastServ: ShpMastService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private SizeMastServ: SizeMastService,
    private RapCutDiscServ: RapCutDiscService,
    private RapMastServ: RapMastService,
    private EncrDecrServ: EncrDecrService,
    private elementRef: ElementRef,
    private _FrmOpePer: FrmOpePer,
    private autocomplete: AutocompleteFunctions,
    private _validator: IsBlank,
  ) {
    this.szCtrl = new FormControl();
    this.shpCtrl = new FormControl();
    this.flCtrl = new FormControl();
    this.prpCtrl = new FormControl();

    this.frameworkComponents = {
      numbereditable: NumberEditableComponent
    };

    this.columnDefs = [
      {
        headerName: 'COLOR',
        field: 'C_Name',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center'

      },
      {
        headerName: 'FL',
        field: 'Q1',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
        editable: true,
      },
      {
        headerName: 'IF',
        field: 'Q2',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        editable: true,
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'VVS1',
        field: 'Q3',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'VVS2',
        field: 'Q4',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'VS1',
        field: 'Q5',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'VS2',
        field: 'Q6',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'SI1',
        field: 'Q7',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'SI2',
        field: 'Q8',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'SI3',
        field: 'Q9',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'I1',
        field: 'Q10',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'I2',
        field: 'Q11',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'I3',
        field: 'Q12',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'I4',
        field: 'Q13',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'I5',
        field: 'Q14',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center'
      },
      {
        headerName: 'I6',
        field: 'Q15',
        editable: true,
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
        cellEditor: 'numbereditable',
      },
      {
        headerName: 'I7',
        field: 'Q16',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      },
      {
        headerName: 'I8',
        field: 'Q17',
        editable: true,
        cellEditor: 'numbereditable',
        cellStyle: { 'text-align': 'center' },
        headerClass: 'text-center',
      }
    ];

    this.defaultColDef = {
      resizable: true,
      sortable: true,
      suppressAggFuncInHeader: true,
      enableCellChangeFlash: true,
      suppressMenu: true,
    };
    this.defaultColDef2 = {
      suppressMenu: true,
    }


    this.RapMastServ.RapTypeFill({ TYPE: "RTYPE", TABNAME: "" }).subscribe(RRes => {
      try {
        if (RRes.success == true) {
          this.RTARR = RRes.data.map(item => {
            return { code: item.RTYPE, name: item.RAPNAME, DISP: item.DISP };
          });
          this.radioChange(RRes.data[0].DISP)
          this.RTYPE = RRes.data[0].RTYPE
          this.RapMastServ.RapTypeFill({ TYPE: "DIS", TABNAME: "RAPCUTD" }).subscribe(FloRes => {
            try {
              if (FloRes.success == true) {
                if (FloRes.data[0].IS_FLO == false) {
                  this.FL_CODE = 1
                  this.FLOVISIBLE = true
                }
                if (FloRes.data[0].IS_CUT == false) {
                  this.CT_CODE = 1
                  this.CUTVISIBLE = true
                }
              } else {
                this.spinner.hide();
                this.toastr.warning('Something gone wrong while get shape');
              }
            } catch (error) {
              this.spinner.hide();
              this.toastr.error(error);
            }
          });
        } else {
          this.spinner.hide();
          this.toastr.warning('Something gone wrong while get shape');
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });

  }

  async radioChange(e: any) {
    this.S_CODE = ""
    this.S_NAME = ""
    this.SZ_CODE = ""
    this.F_SIZE = ""
    this.T_SIZE = ""
    this.PRP_CODE = ""
    this.PRP_NAME = ""
    this.LoadGridData();
  }
  filterarr(filteredarray: any, controlname: any, arrayname: any) {
    this[filteredarray] = this[controlname].valueChanges
      .pipe(
        startWith(''),
        map(grp => grp ? this.FinalFileterByChange(grp, arrayname) : this[arrayname])
      );
  }
  FinalFileterByChange(code: any, arrayname: any) {
    return this[arrayname].filter(grp =>
      grp.code.toString().indexOf(code) === 0);
  }

  async ngOnInit() {

    this.spinner.hide()
    this.PER = await this._FrmOpePer.UserFrmOpePer('RapCutDiscComponent')
    this.ALLOWDEL = this.PER[0].DEL
    this.ALLOWINS = this.PER[0].INS
    this.ALLOWUPD = this.PER[0].UPD
    this.PASS = this.PER[0].PASS

    this.ShpMastServ.ShpMastFill({ Type: 'SHPMAST' }).subscribe(ShpRes => {
      try {
        if (ShpRes.success == true) {
          this.shapes = ShpRes.data.map(item => {
            return { code: item.S_CODE, name: item.S_NAME };
          });

          this.filterarr('filteredShps', 'shpCtrl', 'shapes');

        } else {
          this.spinner.hide();
          this.toastr.warning('Something gone wrong while get shape');
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });

    this.SizeMastServ.SizeMastFill({ SZ_TYPE: 'RAP' }).subscribe(SzRes => {
      try {
        if (SzRes.success == true) {
          this.sizes = SzRes.data.map(item => {
            return { code: item.SZ_CODE, name: item.SZ_GROUP, fsize: item.F_SIZE, tsize: item.T_SIZE };
          });
          this.filteredSzs = this.szCtrl.valueChanges
            .pipe(
              startWith(''),
              map(grp => grp ? this.filterSzs(grp) : this.sizes)
            );
        } else {
          this.spinner.hide();
          this.toastr.warning('Something gone wrong while get size');
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });

    this.shapes = this.decodedMast[0].map(item => {
      return { code: item.S_CODE, name: item.S_NAME };
    });

    this.filteredShps = this.shpCtrl.valueChanges
      .pipe(
        startWith(''),
        map(shp => shp ? this.filterShps(shp) : this.shapes)
      );

    this.flos = this.decodedMast[6].map(item => {
      return { code: item.FL_CODE, name: item.FL_SHORTNAME };
    });
    this.filteredFls = this.flCtrl.valueChanges
      .pipe(
        startWith(''),
        map(fl => fl ? this.filterFls(fl) : this.flos)
      );

    this.All_Dataset_Arr = JSON.parse(this.EncrDecrServ.get(localStorage.getItem("unfam1")));
  }

  filterFls(code: string) {
    return this.flos.filter(grp =>
      grp.code.toString().indexOf(code) === 0);
  }

  filterShps(code: string) {
    return this.shapes.filter(grp =>
      grp.code.toLowerCase().indexOf(code.toLowerCase()) === 0);
  }

  filterSzs(code: string) {
    return this.sizes.filter(grp =>
      grp.code.toString().indexOf(code) === 0);
  }

  filterPrps(code: string) {
    return this.Prps.filter(grp =>
      grp.code.toString().indexOf(code) === 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGridData()
    this.PRPCHANGE()
  }

  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
  }

  getShapeName() {
    const TEMP = this.shapes.filter((option) => option.code.toString().toLocaleLowerCase() == this.S_CODE.toString().toLocaleLowerCase())
    this.S_NAME = TEMP.length !== 0 ? TEMP[0].name : "";
    this.LoadGridData();
  }

  getSizeName() {
    const TEMP = this.sizes.filter((option) => option.code.toString().toLocaleLowerCase() == this.SZ_CODE.toString().toLocaleLowerCase())
    this.F_SIZE = TEMP.length !== 0 ? TEMP[0].fsize : "";
    this.T_SIZE = TEMP.length !== 0 ? TEMP[0].tsize : "";
    this.LoadGridData();
  }

  getFloName() {
    const TEMP = this.flos.filter((option) => option.code.toString().toLocaleLowerCase() == this.FL_CODE.toString().toLocaleLowerCase())
    this.FL_NAME = TEMP.length !== 0 ? TEMP[0].name : "";
    this.LoadGridData();
  }

  getPrpName() {
    const TEMP = this.Prps.filter((option) => option.code.toString().toLocaleLowerCase() == this.PRP_CODE.toString().toLocaleLowerCase())
    this.PRP_NAME = TEMP.length !== 0 ? TEMP[0].name : "";
    this.LoadGridData();
  }

  FillDataSet(DS_NAME: any) {
    return (this.All_Dataset_Arr.map((data) => data.filter((item) => item.DATASET == DS_NAME))).filter((obj) => {
      return ![null, undefined, ''].includes(obj)
    }).filter((el) => {
      return typeof el != "object" || Object.keys(el).length > 0;
    })
  }

  LoadGridData() {
    this.spinner.show();
    this.RapCutDiscServ.RapCutDiscFill({
      SZ_CODE: this.SZ_CODE, 
      S_CODE: this.S_CODE,
      C_CODE: 0, PRP: this.PRP_CODE, 
      FL_CODE: this.FL_CODE,
      STYPE:this.PRPTYPE,
      RTYPE:this.RTYPE
    }).subscribe(RapRes => {
      try {
        if (RapRes.success == true) {
          this.spinner.hide();
          this.gridApi.setRowData(RapRes.data);
          this.gridApi.sizeColumnsToFit();

          const agBodyViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-viewport");
          const agBodyHorizontalViewport: HTMLElement = this.elementRef.nativeElement.querySelector(".ag-body-horizontal-scroll-viewport");

          if (agBodyViewport) {
            const psV = new PerfectScrollbar(agBodyViewport);
            psV.update();
          }
          if (agBodyHorizontalViewport) {
            const psH = new PerfectScrollbar(agBodyHorizontalViewport);
            psH.update();
          }
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(RapRes.data)
          });
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });
    console.log(this.RapCutDiscServ.RapCutDiscFill)
  }

  PRPCHANGE() {
    this.S_CODE = ""
    this.S_NAME = ""
    this.SZ_CODE = ""
    this.F_SIZE = ""
    this.T_SIZE = ""
    this.PRP_CODE = ""
    this.PRP_NAME = ""

    
      this.Prps = this.decodedMast[3].map(item => {
        return { code: item.CT_CODE, name: item.CT_NAME };
      });
    
    this.filteredPrps = this.prpCtrl.valueChanges
      .pipe(
        startWith(''),
        map(grp => grp ? this.filterPrps(grp) : this.Prps)
      );
    this.LoadGridData();
  }

  Cellvaluechange(e: any) {
    if (this.PASS != this.PASSWORD) {
      this.toastr.warning("Incorrect Password")
      return
    }

    if (this.S_CODE == "" || this.S_CODE == null) {
      this.toastr.warning("FILL Shape")
      return
    }
    if (this.SZ_CODE == "" || this.SZ_CODE == null) {
      this.toastr.warning("FILL Size")
      return
    }
    if (this.PRP_CODE == "" || this.PRP_CODE == null) {
      this.toastr.warning("FILL PRP")
      return
    }
    if (e.newValue != 0 || e.newValue != null) {
      this.RapCutDiscServ.RapCutdSave({
        STYPE: this.PRPTYPE,
        RTYPE: this.RTYPE,
        SZ_CODE: this.SZ_CODE,
        S_CODE: this.S_CODE,
        C_CODE: e.data.C_Code,
        PRP: this.PRP_CODE,
        FL_CODE: this.FL_CODE,
        Q1: e.data.Q1,
        Q2: e.data.Q2,
        Q3: e.data.Q3,
        Q4: e.data.Q4,
        Q5: e.data.Q5,
        Q6: e.data.Q6,
        Q7: e.data.Q7,
        Q8: e.data.Q8,
        Q9: e.data.Q9,
        Q10: e.data.Q10,
        Q11: e.data.Q11,
        Q12: e.data.Q12,
        Q13: e.data.Q13,
        Q14: e.data.Q14,
        Q15: e.data.Q15,
        Q16: e.data.Q16,
        Q17: e.data.Q17,
        F_CARAT: this.F_SIZE,
        T_CARAT: this.T_SIZE
      }).subscribe(rapres => {
        try {
          if (rapres.success == 1) { }
          else {
            this.toastr.error("SOMTHING WRONG")
          }
        }
        catch {
          this.toastr.error("SOMTHING WRONG")
        }
      });
    }
  }
  groupByArraySizeWise(xs, SIZE) {

    return xs.reduce(function (rv, x) {

      let v = SIZE instanceof Function ? SIZE(x) : x[SIZE];

      let el = rv.find(r => r && r.SIZE === v);

      if (el) {
        el.Data.push(x);
      } else {
        rv.push({ SIZE: v, Data: [x] });
      }
      return rv;
    }, []);
  }

  tempDataArr = [];

  EXPORT() {
    // this.spinner.show();
    let Prp = this.Prps.map((item) => { return item.name })

    if (this.S_CODE !== "") {
      if (this.PRP_CODE) {
        this.RapCutDiscServ.RapCutdExport({
          Data: this.sizes.map((item) => {
            return {
              RTYPE: this.RTYPE,
              S_CODE: this.S_CODE,
              SZ_CODE: item.code,
              PRP: this.PRP_CODE,
              STYPE: this.PRPTYPE,
              CT_CODE: this.CT_CODE,
              SZ_NAME: item.name
            }

          })
        }).subscribe((StoneChkRes) => {
          console.log('stone=>', StoneChkRes)
          try {

            let data = [];
            data = StoneChkRes.map((item) => item.data.map((_item) => ({
              ..._item,
              SIZE: item.SZ_NAME,

            })));

            let data2 = [];

            data.map((item) => item.map((_item) => data2.push(_item)))
            console.log('DATA2=>', data2)
            StoneChkRes.map((item) => item.data.map((_item) => data.push(_item)))
            if (!data.length) {
              this.toastr.warning('No Data!!')
              return
            }

            var mapForm = document.createElement("form");
            mapForm.target = "_blank";
            mapForm.method = "POST";
            mapForm.action = `http://${this.url}:${this.port}/api/RapCutDisc/RapCutdExcelDownload`;

            let QuaData = this.FillDataSet("CUTMAST");

            let _QuaData = QuaData[0].map(item => {

              return { code: 'Q' + item.CT_CODE, name: item.CT_NAME };
            });
            let obj = {
              DataRow: JSON.stringify(this.groupByArraySizeWise(data2, 'SIZE')),
              QuaData: JSON.stringify(_QuaData),
              SheetName: this.PRP_NAME,
              SHAPE: this.CT_NAME,
              RTYPE: this.RTYPE,
              CT_CODE: this.CT_NAME,
              S_CODE: this.S_NAME,
              STYPE: this.PRPTYPE,
            }

            Object.keys(obj).forEach(function (param) {
              var mapInput = document.createElement("input");
              mapInput.type = "show";
              mapInput.name = param;
              mapInput.setAttribute("value", obj[param]);
              mapForm.appendChild(mapInput);
            })

            document.body.appendChild(mapForm);
            mapForm.submit();
            this.spinner.hide()

          } catch (err) {
            this.spinner.hide()
            this.toastr.error(err)
            console.log(err)
          }
        })
      } else {
        this.tempDataArr = []

        let SheetName = this.Prps.map((Prps) => { return Prps.code })
        let SHAPE = this.Prps.map((Prps) => { return Prps.name })
        // this.spinner.show();

        this.Prps.map((PrpsItem) => this.RapCutDiscServ.RapCutdExport({
          Data: this.sizes.map((item) => {
            return {
              RTYPE: this.RTYPE,
              S_CODE: this.S_CODE,
              SZ_CODE: item.code,
              PRP: PrpsItem.code,
              STYPE: this.PRPTYPE,
              CT_CODE: this.CT_CODE,
              SZ_NAME: item.name
            }
          })
        }).subscribe((StoneChkRes) => {

          try {

            let data = [];
            data = StoneChkRes.map((item) => item.data.map((_item) => ({
              ..._item,
              SIZE: item.SZ_NAME,

            })));

            let data2 = [];

            data.map((item) => item.map((_item) => data2.push(_item)))
            console.log(data2)

            this.spinner.hide();
            // StoneChkRes.map((item) => item.data.map((_item) => data.push(_item)));

            // this.ExportDataLog(this.groupByArraySizeWise(data, 'SIZE'));


            this.tempDataArr.push(this.groupByArraySizeWise(data2, 'SIZE'))
            if (this.tempDataArr.length == this.Prps.length) {
              if (!this.tempDataArr.length) {
                this.toastr.warning('No Data!!')
                return
              }

              var mapForm = document.createElement("form");
              mapForm.target = "_blank";
              mapForm.method = "POST";
              mapForm.action = `http://${this.url}:${this.port}/api/RapCutDisc/RapCutdExcelDownload`;
              let QuaData = this.FillDataSet("CUTMAST");
              let _QuaData = QuaData[0].map(item => {
                return { code: 'CT' + item.CT_CODE, name: item.CT_NAME };
              });
              let obj = {
                DataRow: JSON.stringify(this.tempDataArr),
                QuaData: JSON.stringify(_QuaData),
                SHAPE: SHAPE,
                SheetName: SheetName,
                shapeCount: this.Prps.length,
                shapeArr: Prp,
                RTYPE: this.RTYPE,
                CT_CODE: this.CT_NAME,
                S_CODE: this.S_NAME,
                STYPE: this.PRPTYPE,
              }
              Object.keys(obj).forEach(function (param) {
                var mapInput = document.createElement("input");
                mapInput.type = "show";
                mapInput.name = param;
                mapInput.setAttribute("value", obj[param]);
                mapForm.appendChild(mapInput);
              });
              document.body.appendChild(mapForm);
              mapForm.submit();
              this.spinner.hide()
            }

          } catch (err) {
            this.spinner.hide()
          }
        }))
      }
    } else {
      this.toastr.warning("Enter Valid SHAPE")
    }
  }

  CUTEXPORT() {

  }

  IMPORT($event: any) {
    let Color = [];
    let files = $event.srcElement.files;
    let DataObj = []
    if (files[0].name.endsWith(".xls") || files[0].name.endsWith(".XLS") || files[0].name.endsWith(".xlsx") || files[0].name.endsWith(".xlsx") || files[0].name.endsWith(".csv")) {
      this.spinner.show()
      let file;
      let arrayBuffer;
      let RType
      let RTyp
      let RAP
      let S_NAME
      let FL_NAME
      let PRP_NAME
      let CT_NAME
      let s_NAME
      let s_TYPE
      file = $event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        let newRecords;
        arrayBuffer = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i <= data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
        for (let sheet = 0; sheet < workbook.SheetNames.length; sheet++) {

          var first_sheet_name = workbook.SheetNames[sheet];
          var worksheet = workbook.Sheets[first_sheet_name];
          newRecords = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', blankrows: false, raw: false })
          // console.log(newRecords)
          let RapAr = []
          RapAr = newRecords[1][1].split('_')
          
          RType = RapAr[0]
          this.Import.nativeElement.value = '';
          if (RType != this.RTARR.find((x) => x.code == this.RTYPE).name) {
            this.toastr.warning('Select Valid Parameter')
            this.spinner.hide();
            return;
          }
          RTyp = this.RTARR.find((x) => x.name == RType).code
          CT_NAME = newRecords[2][1].split('-')[1]
          PRP_NAME = newRecords[2][1].split('-')[2]
          s_NAME = newRecords[2][1].split('-')[0]
          s_TYPE = newRecords[2][1].split('-')[1]
          // console.log(JSON.stringify(newRecords))
          this.spinner.hide()



          if (newRecords[0].length != 0) {
            let mappedData = this.RapCutDiscComponent(newRecords, PRP_NAME, s_NAME, RTyp, s_TYPE)
            DataObj.push(mappedData)

            // console.log('new data=>', DataObj)
          }

        }
        console.log(DataObj)

        this.RapCutDiscServ.RapCutdImport(DataObj).subscribe((SaveRes) => {
          console.log('saveRes', SaveRes);

          try {
            if (SaveRes.success == true) {
              this.RapCutDiscServ.RapCutInsertDis({
                RTYPE: RTyp,
                TYP: "CUT"
              }).subscribe(RapRes => {
                this.spinner.hide()
                this.toastr.success('Cuts Upload Successfully')
                console.log(RapRes)
              })
            } else {
              this.spinner.hide()
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Rap not change with this crite area ' + JSON.stringify(SaveRes.data)
              });
            }
          } catch (error) {
            this.spinner.hide()
            this.toastr.error(error)
          }
        })
      };
    }
  }

  RapCutDiscComponent(newRecords, PRP_NAME, s_NAME, RTyp, s_TYPE) {
    this.spinner.hide()
    let RapSaveArr = []
    let Color = [];
    let array = [];

    for (let h = 0; h < 3; h++) {
      var p = newRecords[0][1]
      array.push(p)
      newRecords.shift();
    }

    let r = [];
    for (let i = 1; i < newRecords.length; i++) {
      if (newRecords[i][0] == "" && newRecords[i][2] == "") {
        break
      } else {
        r.push(1);
      }

    }

    if (array[1] == 'GIA') {
      var a = newRecords
        , chunk
      while (a.length > 0) {
        chunk = a.splice(0, r.length + 1)
        RapSaveArr.push(chunk)
      }
    } else {
      var a = newRecords
        , chunk
      while (a.length > 0) {
        chunk = a.splice(0, r.length + 1)
        RapSaveArr.push(chunk)
      }
    }

    for (let x = 0; x < RapSaveArr.length; x++) {
      for (let y = 0; y < RapSaveArr[x].length; y++) {

        if (RapSaveArr[x][y][0] != "") {
          let p = RapSaveArr[x][y][0]
          Color.push(p)
        }
      }
      break;
    }


    let RTYPE = array[1];
    let Q1 = [];
    let Q2 = [];
    let Q3 = [];
    let Q4 = [];
    let Q5 = [];
    let Q6 = [];
    let Q7 = [];
    let Q8 = [];
    let Q9 = [];
    let Q10 = [];
    let Q11 = [];
    let Q12 = [];
    let Q13 = [];
    let Q14 = [];
    let Q15 = [];
    let Q16 = [];
    let Q17 = [];
    let S_CODE = [];
    let F_CARAT;
    let T_CARAT;
    let C_NAME = array[2]
    // let PRP_CODE;
    // let s_NAME;
    // let RTyp;
    let lastary = []
    let SaveObj;

    for (let i = 0; i < RapSaveArr.length; i++) {

      for (let a = 0; a < RapSaveArr[i].length; a++) {

        for (let b = 0; b < Color.length; b++) {
          if (RapSaveArr[i][a][0] == Color[b]) {
            let x1 = RapSaveArr[i][a][1];
            Q1.push(x1)
            let x2 = RapSaveArr[i][a][2];
            Q2.push(x2)
            let x3 = RapSaveArr[i][a][3];
            Q3.push(x3)
            let x4 = RapSaveArr[i][a][4];
            Q4.push(x4)
            let x5 = RapSaveArr[i][a][5];
            Q5.push(x5)
            let x6 = RapSaveArr[i][a][6];
            Q6.push(x6)
            let x7 = RapSaveArr[i][a][7];
            Q7.push(x7)
            let x8 = RapSaveArr[i][a][8];
            Q8.push(x8)


            let x9 = RapSaveArr[i][a][9] ? RapSaveArr[i][a][9] : "0";
            Q9.push(x9)

            let x10 = RapSaveArr[i][a][10] ? RapSaveArr[i][a][10] : "0";
            Q10.push(x10)

            let x11 = RapSaveArr[i][a][11] ? RapSaveArr[i][a][11] : "0";
            Q11.push(x11)

            let x12 = RapSaveArr[i][a][12] ? RapSaveArr[i][a][12] : "0";
            Q12.push(x12)

            let x13 = RapSaveArr[i][a][13] ? RapSaveArr[i][a][13] : "0";
            Q13.push(x13)

            let x14 = RapSaveArr[i][a][14] ? RapSaveArr[i][a][14] : "0";
            Q14.push(x14)

            let x15 = RapSaveArr[i][a][15] ? RapSaveArr[i][a][15] : "0";
            Q15.push(x15)

            let x16 = RapSaveArr[i][a][16] ? RapSaveArr[i][a][16] : "0";
            Q16.push(x16)

            let x17 = RapSaveArr[i][a][17] ? RapSaveArr[i][a][17] : "0";
            Q17.push(x17)

            let s_code = RapSaveArr[i][a][0]
            S_CODE.push(s_code)

          }

          if (RapSaveArr[i][a][0] == '' && RapSaveArr[i][a][2] == '') {
            let text = RapSaveArr[i][a][1];
            let CARAT = text.split("-");
            F_CARAT = CARAT[0];
            T_CARAT = CARAT[1];
          }

        }

      }
      SaveObj = {
        STYPE: s_TYPE ? s_TYPE : '',
        RTYPE: RTyp ? RTyp : '',  // GIA
        S_NAME: s_NAME ? s_NAME : '', // ROUND
        C_NAME: S_CODE ? S_CODE : '', // D,E,F..
        PRP_NAME: PRP_NAME ? PRP_NAME : '', // EX,VG,GD,FR
        FL_NAME: 1,
        Q1: Q1 ? Q1 : 0,
        Q2: Q2 ? Q2 : 0,
        Q3: Q3 ? Q3 : 0,
        Q4: Q4 ? Q4 : 0,
        Q5: Q5 ? Q5 : 0,
        Q6: Q6 ? Q6 : 0,
        Q7: Q7 ? Q7 : 0,
        Q8: Q8 ? Q8 : 0,
        Q9: Q9 ? Q9 : 0,
        Q10: Q10 ? Q10 : 0,
        Q11: Q11 ? Q11 : 0,
        Q12: Q12 ? Q12 : 0,
        Q13: Q13 ? Q13 : 0,
        Q14: Q14 ? Q14 : 0,
        Q15: Q15 ? Q15 : 0,
        Q16: Q16 ? Q16 : 0,
        Q17: Q17 ? Q17 : 0,
        F_CARAT: F_CARAT ? F_CARAT : '',  //  0.025
        T_CARAT: T_CARAT ? T_CARAT : '',  //  0.039
      }
      Q1 = []; Q2 = []; Q3 = []; Q4 = []; Q5 = []; Q6 = []; Q7 = []; Q8 = []; Q9 = []; Q10 = []; Q11 = []; Q12 = []; Q13 = []; Q14 = []; Q15 = []; Q16 = []; Q17 = []; S_CODE = []

      lastary.push(SaveObj)
    }
    return lastary
  }

  CreateNewJosn(header, records) {
    let ValidCol = []
    for (let i = 0; i < header.length; i++) {
      ValidCol.push(header[i])
    }
    return [records, ValidCol]
  }
  fileReset() {
    this.Import.nativeElement.value = "";
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, header: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let CTA = this.csvToArray(csvRecordsArray[i])
      if (CTA[0].length == header.length) {
        let tempJson = {}
        for (let j = 0; j < header.length; j++) {
          tempJson[header[j]] = CTA[0][j]
        }
        csvArr.push(tempJson)
        tempJson = {}
      }
    }
    return csvArr;
  }

  csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = '']; i = 0;
      } else row[i] += l;
      p = l;
    }
    return ret;
  }

  autocompleteCode(code, ngmodel, array) {
    let Res = this.autocomplete.autocompleteCode(code, array);
    this[ngmodel] = Res
  }

  CHANGEPASSWORD() {
    if (!this.PASS) return
    // let RowData = []
    // this.gridApi.forEachNode(function (rowNode, index) {
    //   RowData.push(rowNode.data)
    // })
    // this.gridApi.setRowData(RowData)
    this.gridApi.redrawRows();
  }
}
