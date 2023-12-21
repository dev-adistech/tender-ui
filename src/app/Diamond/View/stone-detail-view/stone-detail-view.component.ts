import { Component, OnInit , ViewChild, ElementRef, Inject } from '@angular/core';
import { StoneDetailViewService } from '../../../Service/View/stone-detail-view.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer} from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { DatePipe } from "@angular/common";
import { map, startWith } from 'rxjs/operators';
import PerfectScrollbar from "perfect-scrollbar";
import { formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { PartySearchComponent } from './../../Global/party-search/party-search.component';

// import * as $ from "jquery";
declare let $: any;


@Component({
  selector: 'app-stone-detail-view',
  templateUrl: './stone-detail-view.component.html',
  styleUrls: ['./stone-detail-view.component.css']
})
export class StoneDetailViewComponent implements OnInit {

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem('token')); //localStorage.getItem('token')

  StoneDetail:any = {}
  videoUrl: any;
  certiUrl: any;
  imageUrl: any;
  disPlay = 'image';
  certiIsImage = true;

  StoneId:any='';

  public columnDefs;
  public gridApi;
  public gridColumnApi;


  private BaseUrl = environment.BaseUrl;
  attachUrl=''
  VideoDownload=''

  ShowPrcPer:boolean=true;
  ShowPrcNote:boolean=false;
  ShowOfferPrice:boolean=false;

  iconList = [
    {name:"Round",code:"R",className:"icon-Round1"},
    {name:"Emerald",code:"E",className:"icon-Emerald3"},
    {name:"Cushion",code:"CU",className:"icon-Cushion1"},
    {name:"Princess",code:"P",className:"icon-ico_Princess"},
    {name:"Marquise",code:"M",className:"icon-Marquise1"},
    {name:"Pear",code:"PE",className:"icon-Pear1"},
    {name:"Heart",code:"H",className:"icon-Heart3"},
    {name:"Oval",code:"O",className:"icon-Oval3"},
    {name:"SqEmerald",code:"SE",className:"icon-Square-Emerald1"},
    {name:"Radient",code:"RA",className:"icon-LgRadiant3"},
    {name:"Other Shapes",code:"OT",className:"icon-other"},
    {name:"CUSHION BRILLIANT",code:"CB",className:"icon-Cushion1"},
    {name:"CUSHION MODIFIED",code:"CM",className:"icon-Cushion1"},
    {name:"SQ.RADIANT",code:"SRD",className:"icon-Square-Radiant"},

  ]

  iconClass = '';

  constructor(
    private StoneDetailViewServ: StoneDetailViewService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private  matDialog: MatDialog,
    private _mdr: MatDialogRef<StoneDetailViewComponent>,
    private datePipe: DatePipe,
  ) {
    this.columnDefs = [
      {
        headerName: 'Party',
        headerClass: 'text-center',
        field: 'OfferParty',
        resizable: true,
        width:202,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: 'Rap',
        headerClass: 'text-left',
        field: 'OfferRap',
        resizable: true,
        cellStyle: {'text-align': 'right'},
        width:44,
        cellRenderer: function (params) {
          if(!params.value){ params.value = 0;}
          return '<p>' + (params.value).toFixed(0) + '</p>';
        },
      },
      {
        headerName: 'Dis%',
        headerClass: 'text-left',
        field: 'OfferPer',
        resizable: true,
        cellStyle: {'text-align': 'right'},
        width:48,
        cellRenderer: function (params) {
          if(!params.value){ params.value = 0;}
          return '<p>' + (params.value).toFixed(2) + '</p>';
        },
      },
      {
        headerName: 'Rate',
        headerClass: 'text-left',
        field: 'OfferRate',
        resizable: true,
        cellStyle: {'text-align': 'right'},
        width:62,
        cellRenderer: function (params) {
          if(!params.value){ params.value = 0;}
          return '<p>' + (params.value).toFixed(2) + '</p>';
        }
      },
      {
        headerName: 'Date',
        headerClass: 'text-left',
        field: 'OfferDate',
        resizable: true,
        cellStyle: {'text-align': 'center'},
        width:69,
      },
      {
        headerName: 'Saler',
        headerClass: 'text-left',
        field: 'OfferSaler',
        resizable: true,
        width:43,
        cellStyle: {'text-align': 'center'}
      }
    ]
   }


  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  data: string[] = [];

  PriceRevDate:any=''

  filteredOptions: Observable<any[]>;

  CLOSE(){
    this._mdr.close()
  }

  ngOnInit(): void {

    // this.StoneDetailViewServ.PartyEmailIdList({}).subscribe((MailListRes) => {
    //   try{
    //     if(MailListRes.success == 1){
    //       this.data = MailListRes.data.map((item) => {
    //         return item.PARTY_DISPLAY.trim()
    //       })
    //       if(this.data.length != 0){
    //         this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(startWith<string>(''),map(name => this._filter(name)));
    //       }
    //     }else{
    //       this.toastr.warning('Something gone wrong while get party mail list')
    //     }
    //   }catch(error){
    //     this.toastr.error(error)
    //   }
    // })

    this.spinner.show();
    if(localStorage.getItem('SVDPID')){
      this.StoneDetailViewServ.StoneDetailView({STONEID:localStorage.getItem('SVDPID')}).subscribe((DetailRes) => {
        this.StoneId = localStorage.getItem('SVDPID')
        localStorage.removeItem('SVDPID');
        try{
          if(DetailRes.success == 1 && DetailRes.data.length != 0){
            this.StoneDetail = DetailRes.data[0];
            this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.StoneDetail.PhotoPath);
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.StoneDetail.VideoPath);
            this.certiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.StoneDetail.CertiPath);
            this.PriceRevDate = this.StoneDetail.PriceRevDate 
            
            let certiExt = this.StoneDetail.CertiPath.split('.').pop();
            this.attachUrl = this.StoneDetail.PhotoPath
            this.VideoDownload = this.StoneDetail.VideoPathDownload;
            
            if(certiExt.toUpperCase()=='PDF'){
              this.certiIsImage = false;
            }

            if(this.StoneDetail && this.StoneDetail.S_Name){
              let classObj = this.iconList.filter((item) => {return item.code==this.StoneDetail.S_Name});

              if(classObj && classObj[0]){
                this.iconClass = classObj[0]['className'];
              }
            }

            this.spinner.hide();
          }else{
            this.spinner.hide();
            this.toastr.info("Data not found")
          }
        }catch(err){
          this.spinner.hide();
          this.toastr.error(err);
        }
      })
    }else{
      this.spinner.hide();
      this.toastr.info("Not found StoneID")
    }


  }

  // PacketOfferView(StoneId:any){
  //   this.StoneDetailViewServ.PacketOfferView({StoneId:StoneId, ISFANCY:this.StoneDetail.ISFancy}).subscribe((OffRes) => {
  //     try{
  //       if(OffRes.success == 1){
  //         this.gridApi.setRowData(OffRes.data);
  //       }else{
  //         this.gridApi.setRowData('');
  //       }
  //     }catch(error){
  //       this.toastr.error(error)
  //     }
  //   })
  // }

  tofixedto2(elm){

    if(elm!=''){
      return parseFloat(elm).toFixed(2)
    }else{
      return '';
    }

  }

  _filter(name: string): String[] {

    const filterValue = name.toLowerCase();

    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().includes(filterValue)).slice(0, 10);
    return filteredList;
  }

  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  openedChange(e) {

    this.searchTextboxControl.patchValue('');

    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  setSelectedValues() {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  // matDialogRefMemoName: MatDialogRef<MemoNameComponent>;
  // AddToMemo(){
  //   // let  _PID = this.StoneId
  //   if(this.StoneDetail.PId){
  //     let _PID = this.StoneDetail.PId
  //     this.matDialogRefMemoName = this.matDialog.open(MemoNameComponent,{data: {_PID}, disableClose:false, width: "80%",panelClass:'custom-mat-dialog-container-memo-name',});
  //   }else{
  //     return
  //   }

  // }

  DownloadDoc(){
    if(this.disPlay == 'video'){
      // window.location.href = 'https://pcknstg.blob.core.windows.net/hdfile/DimImg/360Viewer/HD4/imaged/'+this.pid+'/'+this.pid+'.mp4';

      window.open(
        this.VideoDownload,
        '_blank'
      );

    }else{

      var mapForm = document.createElement("form");
      //mapForm.target = "_blank";
      mapForm.method = "POST"; // or "post" if appropriate

      mapForm.action = this.BaseUrl+'StoneDetailView/DownloadDoc';

      let obj = {
        url:this.attachUrl,
        ext:this.attachUrl.substr(this.attachUrl.lastIndexOf('.') + 1).toUpperCase(),
        StoneId:this.StoneDetail.PId
      }


      Object.keys(obj).forEach(function(param){
        if(obj[param]){
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
  }


  ErrStoneImg(e){
    if(e.type == "error"){
      this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://pcknstg.blob.core.windows.net/hdfile/webimg/no-image-found.png');
    }
  }

  ErrCerti(e){
    if(e.type == "error"){
      this.certiUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://pcknstg.blob.core.windows.net/hdfile/webimg/no-image-found.png');
    }
  }


  urlExists(url:any,callback){
    return new Promise(function (resolve, reject) {
      var x=new XMLHttpRequest();
      x.timeout=15000;
      x.open('GET',url);
      x.onreadystatechange=function(){
          if(this.readyState==4){
              if(this.status==200){
                resolve(callback(true))
              } else {
                resolve(callback(false))
              }
          }
      }
      x.send();
    })
  }

  CheckCrt(CrtType:any,url:any){

    if(CrtType == 'CERTI'){
      if(url==''){
          $('#certiUrl').attr('src', 'https://pcknstg.blob.core.windows.net/hdfile/webimg/no-certificate-found.png');
        return
      }
      this.urlExists(this.StoneDetail.CertiPath,function(exists) {
        if(exists == true){
          $('#certiUrl').attr('src', this.StoneDetail.CertiPath);
        }else{
            $('#certiUrl').attr('src', 'https://pcknstg.blob.core.windows.net/hdfile/webimg/no-certificate-found.png');
        }
      })
    }else if(CrtType == 'VIDEO'){
      if(url==''){
        $('#videoUrl').attr('src', 'https://pcknstg.blob.core.windows.net/hdfile/webimg/no-video-found.png');
        return
      }
      this.urlExists(this.StoneDetail.VIDEOCHECKPATH,function(exists) {
        if(exists == true){
          $('#videoUrl').attr('src', this.StoneDetail.VideoPath);
       }else{
          $('#videoUrl').attr('src', 'https://pcknstg.blob.core.windows.net/hdfile/webimg/no-video-found.png');
       }
   })
    }
  }

  // matDialogRefAddWatchList: MatDialogRef<AddWatchListComponent>;
  // AddWatchList(){
  //   let saveData = this.StoneDetail;
  //   saveData.STONEID = saveData.PId;
  //   saveData.GRAP = saveData.GRap;
  //   saveData.GPER = saveData.GPer;
  //   saveData.GRATE = saveData.GRate;
  //   saveData.ISFROMDETAIL = true;
  //   this.matDialogRefAddWatchList = this.matDialog.open(AddWatchListComponent, { data: { StoneIdList: [saveData] }, disableClose: false});
  // }

  // matDialogRefOfferEntry: MatDialogRef<OfferEntryDialog>;
  // AddNewOffer(){

  //   this.matDialogRefOfferEntry = this.matDialog.open(OfferEntryDialog, { data: this.StoneDetail , disableClose: false, width: '35%', height: 'auto',panelClass:'offer-entry-mat-dialog-container' });
  //   this.matDialogRefOfferEntry.afterClosed().subscribe(res => {
  //     if(res){
  //      if(res.success == 1){
  //       this.PacketOfferView(this.StoneDetail.PId)
  //      }
  //     }
  //   });

  // }
}
