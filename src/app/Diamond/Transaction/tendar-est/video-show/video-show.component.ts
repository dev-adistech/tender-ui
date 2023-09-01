import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Inject, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-video-show',
  templateUrl: './video-show.component.html',
  styleUrls: ['./video-show.component.css']
})
export class VideoShowComponent implements OnInit {

  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;

  data:any[] = []
  videoSrc: string = '';
  uploadVideong:boolean = true
  constructor(
    private http: HttpClient,
    private TendarEstServ: TendarEstService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public dataMain: any,
    private _mdr: MatDialogRef<VideoShowComponent>
  ) { 
    this.data = dataMain

    let NewObj = {
      COMP_CODE: this.data['COMP_CODE'],
      DETID:this.data['DETID'],
      SRNO: this.data['SRNO'],
    }
    this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
      try{
        if(NewRes.success == true){  
        this.videoSrc = NewRes.data[0]['VID'];
        }
      } catch (error){
        this.spinner.hide()
      }
    })
  }

  

  ngOnInit(): void {
    this.uploadVideong = true
  }

  CLOSE(){
    this._mdr.close()
  }

}
