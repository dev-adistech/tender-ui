import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import SignaturePad from 'signature_pad';
// declare var SignaturePad;
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mini-paint',
  templateUrl: './mini-paint.component.html',
  styleUrls: ['./mini-paint.component.css']
})
export class MiniPaintComponent implements OnInit {

  @ViewChild('lienzo') lienzo: any;
  private signature: any;
  color = "#000000";
  radio = 2;

  image = new Image();


  ngAfterViewInit(){

    let li = this.lienzo.nativeElement;
    li.width = window.innerWidth - 400;
    this.signature = new SignaturePad(li, { backgroundColor: 'white' });

  if(this.data['PRN']){
    const imageUrl = this.data['PRN'];

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        // Draw the ImageBitmap on the canvas
        const canvas = document.getElementById('lienzo') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        context.drawImage(imageBitmap, 0, 0);
      })
      .catch(error => {
        console.error('Error fetching or drawing image:', error);
      });
    
    
    }
    
  //   let ctx: CanvasRenderingContext2D =
  //     this.lienzo.nativeElement.getContext('2d');
     
  //    // showing
  
  // ctx.fillRect(20, 20, 150, 100);
  
  // this.image.onload = () => {
  //   console.log("image has loaded!");
  //   ctx.drawImage(this.image, 0, 0);
  
  //   ctx.beginPath();
  //   ctx.moveTo(10, 10);
  //   ctx.lineTo(50, 50);
  //   ctx.lineTo(100, 55);
  //   ctx.lineTo(90, 120);
  //   ctx.lineTo(120, 200);
  //   ctx.stroke();
  // };
  // this.image.setAttribute("src",this.data['PRN']);
  
  //   }

    this.cambiarColor();
    this.changeRadio();

}

borrar(){
  this.signature.clear();
}

cambiarColor(){
  this.signature.penColor = this.color;
}

changeRadio(){
this.signature.dotSize = this.radio / 2;
this.signature.minWidth = this.radio / 2;
this.signature.maxWidth = this.radio;
}

data: any[] = []
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private TendarEstServ: TendarEstService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) { 
    console.log(dataMain)
    this.data = dataMain

    console.log(this.data)
  }

  ngOnInit(): void {
  }

  
download(){
  let a = document.getElementById('lienzo');
  console.log(a)
  // a.href = this.signature.toDataURL();
  let NEWDATA = this.data
  let op = this
    let selectedFile
          selectedFile = op.signature.toDataURL();
          if (selectedFile) {
            const file = selectedFile
            const blob = new Blob([file], { type: "image/png" });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.addEventListener("load", () => {
              let base64String = fileReader.result;
              let FileObj = {
                FileName: `${this.data['COMP_CODE']}-${this.data['DETID']}`,
                base64File: selectedFile, //base64String
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
       
  // a.download = 'picture.png';
  // a.click();
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
