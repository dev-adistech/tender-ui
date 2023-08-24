import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Inject, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TendarEstService } from 'src/app/Service/Rap/tendar-est.service';
import Swal from 'sweetalert2';
declare var MediaRecorder: any;

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent implements OnInit {

  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;
  @ViewChild('video') videoElementRef: ElementRef;

  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;
  NEWVID:any = ''

  data:any[] = []
  videoSrc: string = '';
  RecodedVideoNg:boolean= false
  NewStyle:any =`display:none`
  uploadVideong:boolean = true
  constructor(
    private http: HttpClient,
    private TendarEstServ: TendarEstService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public dataMain: any
  ) { 
    this.data = dataMain

    this.videoSrc = this.data['VID'];
  }

  

  ngOnInit(): void {
    navigator.mediaDevices
    .getUserMedia({
      video: {
        width: 360
      }
    })
    .then(stream => {
      this.videoElement = this.videoElementRef.nativeElement;
      this.stream = stream;
      this.videoElement.srcObject = this.stream;
      this.recordVideoElement = this.recordVideoElementRef.nativeElement;

    });

    
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start();
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    // this.RecodedVideoNg = true
    this.NewStyle =`display:inline`
    this.uploadVideong = false
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }

  Save(){
    let op = this
      const file = this.recordedBlobs
      const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
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
            let Obj = {
              COMP_CODE: this.data['COMP_CODE'],
              DETID:this.data['DETID'],
              SRNO: this.data['SRNO'],
              SECURE_URL: response.data.secure_url,
              URL: response.data.url,
              CLOUDID: response.data.cloudid,
              PUBLICID: response.data.public_id,
              I_TYPE:'VIDEO'
            };
            op.TendarEstServ.TendarVidUpload(Obj).subscribe((Res) => {
              try {
                if (Res.success == true) {
                  // alert("SAVE")
                  op.spinner.hide();
                  op.toastr.success("File uploaded succesfully.");
                } else {
                  alert("error")
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
      I_TYPE:"VIDEO"
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
    this.spinner.show()
    await this.TendarEstServ.TendarVidDelete(Obj).subscribe((Res) => {
      try {
        if (Res.success == true) {
          this.spinner.hide();
          this.toastr.success("Video deleted successfully.");
        } else {
          this.spinner.hide();
          this.toastr.warning("Something went wrong while deleting video.");
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
          resource_type: "video",
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
