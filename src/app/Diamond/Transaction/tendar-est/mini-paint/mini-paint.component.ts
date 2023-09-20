import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import SignaturePad from 'signature_pad';
// declare var SignaturePad;
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-mini-paint',
  templateUrl: './mini-paint.component.html',
  styleUrls: ['./mini-paint.component.css']
})
export class MiniPaintComponent implements OnInit {

  @ViewChild('lienzo') lienzo: any;
  @ViewChild('lienzo') canvasContainer: ElementRef<HTMLElement>;
  // @ViewChild('resizeHandle') resizeHandle: ElementRef<HTMLElement>;

  private signature: any;
  private ctx: CanvasRenderingContext2D;
  color = "#000000";
  radio = 2;

  private resizeStartWidth = 0;
  private resizeStartHeight = 0;
  NEWIMAGE:any = ''
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  image = new Image();


  private selectedImage: HTMLImageElement | null = null;
private selectedImageX = 0;
private selectedImageY = 0;
private selectedImageWidth = 0;
private selectedImageHeight = 0;
private resizing = false;
private resizeHandle: string | null = null;
private resizeStartX = 0;
private resizeStartY = 0;


  ngAfterViewInit(){
    let li = this.lienzo.nativeElement;
    li.width = 1000;
    this.signature = new SignaturePad(li, { backgroundColor: 'white' });

    let NewObj = {
      COMP_CODE: this.data['COMP_CODE'],
      DETID:this.data['DETID'],
      SRNO: this.data['SRNO'],
    }
    this.TendarEstServ.TendarVidUploadDisp(NewObj).subscribe((NewRes)=>{
      try{
        if(NewRes.success == true){
          this.NEWIMAGE = NewRes.data[0].PRN
          const imageUrl = this.NEWIMAGE;
          // this.loadImage();
        fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        // Draw the ImageBitmap on the canvas
        const canvas = document.getElementById('lienzo') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = imageBitmap.height;
        context.drawImage(imageBitmap, 0, 0);
      })
      .catch(error => {
        console.error('Error fetching or drawing image:', error);
      });
        }
      } catch (error){
        this.spinner.hide()
      }
    })

    this.cambiarColor();
    this.changeRadio();

    this.ctx = this.lienzo.nativeElement.getContext('2d');
    this.setupDragAndDrop();
    // this.setupResizeHandlers();
}


startResizing(handle: string) {
  if (this.selectedImage) {
    this.resizing = true;
    this.resizeHandle = handle;

    this.resizeStartX = this.selectedImage.x || 0;
    this.resizeStartY = this.selectedImage.y || 0;
    this.resizeStartWidth = this.selectedImage.width || 0;
    this.resizeStartHeight = this.selectedImage.height || 0;
  }
}

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (this.resizing && this.selectedImage) {
    const x = event.clientX
    const y = event.clientY 

    const widthDiff = x - this.resizeStartX;
    const heightDiff = y - this.resizeStartY;

    if (this.resizeHandle === 'top-left' || this.resizeHandle === 'bottom-left') {
      // this.selectedImage.x = this.resizeStartX + widthDiff;
      this.selectedImage.width = this.resizeStartWidth - widthDiff;
    } else {
      this.selectedImage.width = this.resizeStartWidth + widthDiff;
    }

    if (this.resizeHandle === 'top-left' || this.resizeHandle === 'top-right') {
      // this.selectedImage.y = this.resizeStartY + heightDiff;
      this.selectedImage.height = this.resizeStartHeight - heightDiff;
    } else {
      this.selectedImage.height = this.resizeStartHeight + heightDiff;
    }

    this.ctx.clearRect(0, 0, this.lienzo.nativeElement.width, this.lienzo.nativeElement.height);
    this.ctx.drawImage(this.selectedImage, 0, 0, this.selectedImage.width, this.selectedImage.height);
    this.selectedImage.width = this.selectedImage.width
    this.selectedImage.height = this.selectedImage.height
  }
}

@HostListener('document:mouseup', ['$event'])
onMouseUp(event: MouseEvent) {
  this.resizing = false;
  this.resizeHandle = null;
}


private setupDragAndDrop() {
  const canvas = this.lienzo.nativeElement;

  canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  canvas.addEventListener('drop', (e) => {
    e.preventDefault();

    const imageFile = e.dataTransfer.files[0];
    if (imageFile) {
      this.handleImageDrop(imageFile);
    }
  });
  canvas.addEventListener('mousedown', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    // Check if any image is clicked and select it
    if (this.isInsideImage(this.selectedImage, x, y)) {
      this.isDragging = true;
      this.offsetX = x;
      this.offsetY = y;
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (this.isDragging && this.selectedImage) {
      const x = e.clientX - canvas.getBoundingClientRect().left - this.offsetX;
      const y = e.clientY - canvas.getBoundingClientRect().top - this.offsetY;
      // Clear the canvas and redraw the selected image at the new position
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(this.selectedImage, x, y,this.selectedImage.width,this.selectedImage.height);
    }
  });

  canvas.addEventListener('mouseup', () => {
    this.isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    this.isDragging = false;
  });
}



// private setupDragAndDrop() {
//   const canvas = this.lienzo.nativeElement;

//   canvas.addEventListener('dragover', (e) => {
//     e.preventDefault();
//   });

//   canvas.addEventListener('drop', (e) => {
//     e.preventDefault();

//     const imageFile = e.dataTransfer.files[0];
//     if (imageFile) {
//       this.handleImageDrop(imageFile);
//     }
//   });
//   canvas.addEventListener('mousedown', (e) => {
//     if (this.selectedImage && this.isInsideImage(this.selectedImage, e.clientX, e.clientY)) {
//       this.isDragging = true;
//       this.offsetX = e.clientX - canvas.getBoundingClientRect().left;
//       this.offsetY = e.clientY - canvas.getBoundingClientRect().top;
//     }
//   });
  
//   canvas.addEventListener('mousemove', (e) => {
//     if (this.isDragging && this.selectedImage) {
//       const x = e.clientX - canvas.getBoundingClientRect().left - this.offsetX;
//       const y = e.clientY - canvas.getBoundingClientRect().top - this.offsetY;
  
//       // Clear the canvas and redraw the selected image at the new position
//       this.ctx.clearRect(0, 0, canvas.width, canvas.height);
//       this.ctx.drawImage(this.selectedImage, x, y);
  
//       // Update the offset for the next mousemove event
//       this.offsetX = e.clientX - canvas.getBoundingClientRect().left;
//       this.offsetY = e.clientY - canvas.getBoundingClientRect().top;
//     }
//   });
  
//   canvas.addEventListener('mouseup', () => {
//     this.isDragging = false;
//     this.selectedImage = null; // Deselect the image after releasing the mouse button
//   });
  
//   canvas.addEventListener('mouseleave', () => {
//     this.isDragging = false;
//   });
// }

private isInsideImage(image: HTMLImageElement, x: number, y: number): boolean {
  const imageX = image.x || 0;
  const imageY = image.y || 0;
  const imageWidth = image.width || 0;
  const imageHeight = image.height || 0;

  return (
    x >= imageX &&
    x <= imageX + imageWidth &&
    y >= imageY &&
    y <= imageY + imageHeight
  );
}



private handleImageDrop(file: File) {
  const canvas = this.lienzo.nativeElement;
  const ctx = this.ctx;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (e) => {
    img.src = e.target.result as string;
    
    img.onload = () => {
      // ctx.clearRect(0, 0, 1000, 450);
      this.selectedImage = img;
      ctx.drawImage(img, 0, 0);
    };
  };

  reader.readAsDataURL(file);
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
    @Inject(MAT_DIALOG_DATA) public dataMain: any,
    private _mdr: MatDialogRef<MiniPaintComponent>
  ) { 
    this.data = dataMain
  }

  ngOnInit(): void {
  }

  CLOSE(){
   this._mdr.close()
  }
  
download(){
  let a = document.getElementById('lienzo');
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
                FileName: `${this.data['COMP_CODE']}-${this.data['DETID']}-${this.data['SRNO']}-D`,
                base64File: selectedFile, //base64String
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

async DELETE(){
  let Obj = {
    COMP_CODE: this.data['COMP_CODE'],
    DETID: this.data['DETID'],
    FSRNO: this.data['SRNO'],
    TSRNO: this.data['SRNO'],
    I_TYPE:"PRINT"
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
        this.spinner.hide();
        this.toastr.success("Image deleted successfully.");
      } else {
        this.spinner.hide();
        this.toastr.warning("Something went wrong while deleting image.");
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

