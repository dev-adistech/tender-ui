import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit,Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, zip } from 'rxjs';
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  data:any[]=[]
  @ViewChild('canvas',{static:true}) canvas:ElementRef
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private TendarEstServ: TendarEstService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) { 
    this.data = dataMain
  }

  ngOnInit(){
    this.drawImage()
  }
  
  drawImage(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };

    if(this.data['IMG']){
      img.src = this.data['IMG']
    }else {
      img.src = 'https://picsum.photos/600/600'
    }
  }

  UPLOAD(){
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileInputChange(event){
    
    let op = this

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];

    if (selectedFile) {
      console.log(selectedFile)

      const file = selectedFile
            const blob = new Blob([file], { type: "video/mp4" });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.addEventListener("load", () => {
              let base64String = fileReader.result;
              let FileObj = {
                FileName: `${this.data['COMP_CODE']}-${this.data['DETID']}`,
                base64File: base64String,
              };
              if (typeof base64String === "string") {
                op.uploadVideo(FileObj);
              } else {
                const bytes = new Uint8Array(base64String);
                base64String = String.fromCharCode.apply(null, bytes);
                op.uploadVideo(FileObj);
              }
      
              op.uploadVideo(FileObj).subscribe((response) => {
                try {
                  let Obj = {
                    COMP_CODE: this.data['COMP_CODE'],
                    DETID:this.data['DETID'],
                    SRNO: this.data['SRNO'],
                    SECURE_URL: response.data.secure_url,
                    URL: response.data.url,
                    CLOUDID: response.data.cloudid,
                    PUBLICID: response.data.public_id,
                    I_TYPE:'PRINT'
                  };
                  op.TendarEstServ.TendarVidUpload(Obj).subscribe((Res) => {
                    try {
                      if (Res.success == true) {
                        op.spinner.hide();
                        op.toastr.success("File uploaded succesfully.");
                      } else {
                        op.spinner.hide();
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: JSON.stringify(Res.data),
                        });
                      }
                    } catch (error) {
                      op.spinner.hide();
                      console.log(error);
      
                      op.toastr.error(error);
                    }
                  });
                } catch (error) {
                  op.spinner.hide();
                  console.log(error);
      
                  op.toastr.error(error);
                }
              });
            });
    }
  }

  uploadVideo(FileObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        projectId: "63ab279447964464e2194563",
        companyId: "63ab2411a95148bc211212fc",
      }),
    };

    return this.http.post(
      "https://cloud.peacocktech.in/api/PublicAPI/uploadFileOnCloud",
      FileObj,
      httpOptions
    );
  }
}
