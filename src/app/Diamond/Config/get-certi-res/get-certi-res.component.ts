import { Component, OnInit } from '@angular/core';
import { GetcertiService } from 'src/app/Service/Utility/getcerti.service';
import Swal from 'sweetalert2';
import { ListboxComponent } from '../../Common/listbox/listbox.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

export interface LOTInt {
  CODE: string;
}

@Component({
  selector: 'app-get-certi-res',
  templateUrl: './get-certi-res.component.html',
  styleUrls: ['./get-certi-res.component.css']
})
export class GetCertiResComponent implements OnInit {

  L_CODE:any=''
  LOTs: LOTInt[] = [];

  constructor(
    private GetCeriServ: GetcertiService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.GetCeriServ.GetLot({}).subscribe((FillRes) => {
			try {
				if (FillRes.success == true) {
          this.LOTs = FillRes.data.map((item) => {
            return { CODE: item.L_CODE}
          })
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: JSON.stringify(FillRes.data),
					})
				}
			} catch (error) {
			}
		})
  }

  OpenLotPopup() {
    const PRF = this.dialog.open(ListboxComponent, { width: '30%', data: { arr: this.LOTs, CODE: this.L_CODE, TYPE: 'DELETEVIDEO' }, panelClass: 'ListboxDialog' })
    $("#Close").click();
    PRF.afterClosed().subscribe(result => {
    this.L_CODE = result
    });

  }
  LotTransfer(){
    let Obj={
      LSRNOLIST:'',
      L_CODE:this.L_CODE ? this.L_CODE:'',
      LSRNO:0,
      LTAG:''
    }
    this.spinner.show()
    this.GetCeriServ.LabResultGet(Obj).subscribe((FillRes) => {
			try {
				if (FillRes.success == true) {
          let SubData = FillRes.data
          let PerArr = [];

          for (let i = 0; i < SubData.length; i++) {
            let SaveObj = {
              L_CODE:SubData[i].L_CODE ? SubData[i].L_CODE:'',
              SRNO:SubData[i].LSRNO ? SubData[i].LSRNO:0,
              TAG:SubData[i].LTAG ? SubData[i].LTAG:'',
              STONEID:SubData[i].STONEID ? SubData[i].STONEID:0,
              S_NAME:SubData[i].S_NAME ? SubData[i].S_NAME:'',
              C_NAME:SubData[i].C_NAME ? SubData[i].C_NAME:'',
              Q_NAME:SubData[i].Q_NAME ? SubData[i].Q_NAME:'',
              CARAT:SubData[i].CARAT ? SubData[i].CARAT:0,
              CUT_CODE:SubData[i].CUT ? SubData[i].CUT:'',
              POL_CODE:SubData[i].POL ? SubData[i].POL:'',
              SYM_CODE:SubData[i].SYM ? SubData[i].SYM:'',
              FL_CODE:SubData[i].FL_NAME ? SubData[i].FL_NAME:'',
              FCOLOR:SubData[i].FCOLOR ? SubData[i].FCOLOR:'',
              FINTENSITY:SubData[i].FINTENSITY ? SubData[i].FINTENSITY:'',
              FOVERTONE:SubData[i].FOVERTONE ? SubData[i].FOVERTONE:'',
              COLORNAME:SubData[i].COLORNAME ? SubData[i].COLORNAME:'',
              SDATE:SubData[i].SDATE ? SubData[i].SDATE:null,
              CR_NAME:SubData[i].CR_NAME ? SubData[i].CR_NAME:'',
              GI_DATE:SubData[i].GI_DATE ? SubData[i].GI_DATE:null
            };
            PerArr.push(SaveObj);
          }
          this.GetCeriServ.CertiResultSave(PerArr).subscribe((SaveRes) => {
            try{
              if(SaveRes.success == true){
                this.spinner.hide()
                this.toastr.success("Save successfully")
                this.GetCeriServ.GetStonId({TYPE:'GET'}).subscribe((FillRes) => {
                  try {
                    if (FillRes.success == true) {
                      if(FillRes.data[0].STONEID){
                        this.GetCeriServ.LabResultImportUpdate({STONEID:FillRes.data[0].STONEID}).subscribe((GetRes) => {
                          try {
                            if (GetRes.success == true) {
                              this.GetCeriServ.GetStonId({TYPE:'DELETE'}).subscribe((DelRes) => {
                                try {
                                  if (DelRes.success == true) {
                                    
                                  } else {
                                    Swal.fire({
                                      icon: "error",
                                      title: "Oops...",
                                      text: JSON.stringify(DelRes.data),
                                    })
                                  }
                                } catch (error) {
                                }
                              })
                            } else {
                              Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: JSON.stringify(GetRes.data),
                              })
                            }
                          } catch (error) {
                          }
                        })
                      }
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: JSON.stringify(FillRes.data),
                      })
                    }
                  } catch (error) {
                  }
                })
              }else{
                this.spinner.hide();
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: JSON.stringify(SaveRes.data),
                });
                return;
              }
            } catch (err) {
              this.spinner.hide();
              this.toastr.error(err);
              return;
            }
          });
				} else {
          this.spinner.hide()
          this.toastr.warning('something went wrong will geting data')
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: JSON.stringify(FillRes.data),
					})
				}
			} catch (error) {
        this.spinner.hide()
        this.toastr.error(error)
			}
		})
  }
}
