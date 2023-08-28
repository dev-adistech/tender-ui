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
  @ViewChild('canvas1',{static:true}) canvas:ElementRef
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private TendarEstServ: TendarEstService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) { 
    this.data = dataMain
    console.log("27",dataMain)
  }

  ngOnInit(){
    let NewObj = {
      COMP_CODE: this.data['COMP_CODE'],
      DETID:this.data['DETID'],
      SRNO: this.data['SRNO'],
    }
    this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
      try{
        if(NewRes.success == true){
          this.drawImage(NewRes)    
        }
      } catch (error){
        this.spinner.hide()
      }
    })
  }
  
  drawImage(NewRes): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };
    if(NewRes.data[0]['IMG']){
      img.src = NewRes.data[0]['IMG']
    }
  }

  UPLOAD(){
    const fileInput = document.getElementById('fileInput1');
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
            const blob = new Blob([file], { type: "image/png" });
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
              op.spinner.show()
              op.uploadVideo(FileObj).subscribe((response) => {
                try {
                  let NewObj = {
                    COMP_CODE: this.data['COMP_CODE'],
                    DETID:this.data['DETID'],
                    SRNO: this.data['SRNO'],
                  }
                  let Obj = {
                    COMP_CODE: this.data['COMP_CODE'],
                    DETID:this.data['DETID'],
                    SRNO: this.data['SRNO'],
                    SECURE_URL: response.data.secure_url,
                    URL: response.data.url,
                    CLOUDID: response.data.cloudid,
                    PUBLICID: response.data.public_id,
                    I_TYPE:'IMAGE'
                  };
                  op.TendarEstServ.TendarVidUpload(Obj).subscribe((Res) => {
                    try {
                      if (Res.success == true) {
                        op.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
                          try{
                            if(NewRes.success == true){
                              const ctx = this.canvas.nativeElement.getContext('2d');
                              const img = new Image();
                              img.onload = () => {
                                ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
                              };
                              if(NewRes.data[0]['IMG']){
                                img.src = NewRes.data[0]['IMG']
                              }  
                              op.toastr.success("File uploaded succesfully.");
                              op.spinner.hide();
                            }else{
                              op.spinner.hide();
                            }
                          } catch (error){
                            op.spinner.hide()
                          }
                        })
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

  async DELETE(){
    let Obj = {
      COMP_CODE: this.data['COMP_CODE'],
      DETID: this.data['DETID'],
      FSRNO: this.data['SRNO'],
      TSRNO: this.data['SRNO'],
      I_TYPE:"IMAGE"
    };
    this.spinner.show()
    await this.TendarEstServ.TendarVidDisp(Obj).subscribe((Res) => {
      try {
        if (Res.success == true) {
          this.spinner.hide();

          const videos = Res.data.map((item) => item.PUBLICID);
          this.deleteTenderVideoFromCloud(videos);
        } else {
          this.toastr.warning("Cannot get video upload data.");
        }
      } catch (error) {
        console.log(error);

        this.spinner.hide();
        this.toastr.error(error);
      }
    });
    this.spinner.show()
    await this.TendarEstServ.TendarVidDelete(Obj).subscribe((Res) => {
      try {
        if (Res.success == true) {
          const ctx = this.canvas.nativeElement.getContext('2d');
          const img = new Image();

          img.onload = () => {
            ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
          };
            img.src = ''
            
          this.spinner.hide();
          this.toastr.success("Image deleted successfully.");
        } else {
          this.spinner.hide();
          this.toastr.warning("Something went wrong while deleting Image.");
        }
      } catch (error) {
        console.log(error);

        this.spinner.hide();
        this.toastr.error(error);
      }
    });
  }

  async deleteTenderVideoFromCloud(videos) {
    // for (const video of videos) {
    for (let i = 0; i < videos.length; i++) {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          projectId: "63ab279447964464e2194563",
          companyId: "63ab2411a95148bc211212fc",
          cloudid: "63abee53a3d3a783c330d74d",
        }),
        body: {
          FileName: videos[i],
          resource_type: "image",
        },
      };

      await this.http
        .request(
          "DELETE",
          "https://cloud.peacocktech.in/api/PublicAPI/uploadedFileDeleteOnCloud",
          httpOptions
        )
        .subscribe((Res) => {
          // if (i === videos.length - 1) this.deleteTenderVideoFromDatabase();
        });
    }
  }
}
