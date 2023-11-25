import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import { UserMastService } from 'src/app/Service/Config/user-mast.service';
import { FrmOpePer } from '../../_helpers/frm-ope-per';
import { LoginPermissionService } from 'src/app/Service/Utility/login-permission.service';

declare let $: any;
@Component({
  selector: 'app-login-permission',
  templateUrl: './login-permission.component.html',
  styleUrls: ['./login-permission.component.css']
})
export class LoginPermissionComponent implements OnInit {

  public columnDefs;
  public gridApi;
  public gridColumnApi;
  public defaultColDef;

  UserIdArr:any = [];

  USERID:any='';
  F_DATE:any='';
  T_DATE:any='';

  ALLOWINS: boolean = false
	ALLOWDEL: boolean = false
	ALLOWUPD: boolean = false
	PASS: any = ""
	PER = []

  PASSWORD: any = ""

  constructor(
    private LoginPermissionServ : LoginPermissionService,
    private toastr : ToastrService,
    private spinner : NgxSpinnerService ,
    private datePipe : DatePipe,
    private UserMastServ : UserMastService,
    private _FrmOpePer: FrmOpePer,
    ) { 
      let op = this
      this.columnDefs = [
        {
          headerName: "Action",
          cellStyle: { "text-align": "center" },
          cellRenderer: function (params) {
            let a = '<span class="det_val">'
            if (op.PASS == op.PASSWORD) {
              if (op.ALLOWUPD) {
                a = a + '<svg class="grid-icon icon-edit" data-action-type="SaveData" > <use data-action-type="SaveData" xlink: href = "assets/symbol-defs.svg#icon-save" > </use> </svg>'
              }
              if (op.ALLOWDEL) {
                a = a + '<svg class="grid-icon icon-delete" data-action-type="DeleteUserPer" > <use  data-action-type="DeleteUserPer" xlink: href = "assets/symbol-defs.svg#icon-delete" > </use> </svg>'
              }
            }
            a = a + "</span>"
            return a
          },
          headerClass: "text-center",
          width:85
        },
        {
          headerName: 'ANO',
          field: 'ANO',
          cellStyle: {'text-align': 'center'},
          width:56,
          headerClass: "text-center",
        },
        {
          headerName: 'UserId',
          field: 'USERID',
          cellStyle: {'text-align': 'center'},
          width:154,
          headerClass: "text-center",
          // cellRenderer:(params) => {
          //   let template = `<input type="hidden" value="${params.data.ANO}" / >`;            
          //   template += '<select class="UserIDList" style="text-align: center;">'
          //   template += '<option value="">--- Select ---</option>';
          //   for(let i=0;i<this.UserIdArr.length;i++){
  
          //     if(this.UserIdArr[i].userId == params.data.USERID.toUpperCase()){
          //       template += '<option selected value="'+this.UserIdArr[i].userId+'">'+this.UserIdArr[i].userId+'</option>';
          //     }else{
          //       template += '<option value="'+this.UserIdArr[i].userId+'">'+this.UserIdArr[i].userId+'</option>';
          //     }
  
          //   }
          //   template += '</select>';
          //   return template;
          // }
        },
        {
          headerName: 'IPAddress',
          field: 'IPADDRESS',
          cellStyle: {'text-align': 'center'},
          width:120,
          headerClass: "text-center",
          cellRenderer: function (params) {
            return `<a href="https://tools.keycdn.com/geo?host=${params.data.IPADDRESS}" target="_blank" class="td_maintxt" title="IP Detail">${params.data.IPADDRESS}</a>`
          }
        },
        {
          headerName: 'Browser UID',
          field: 'MACADDRESS',
          cellStyle: {'text-align': 'center'},
          width:370,
          headerClass: "text-center",
        },
        // {
        //   headerName: 'Device Details',
        //   field: 'COMPUTERNAME',
        //   cellStyle: {'text-align': 'center'},
        //   width:600,
        //   headerClass: "text-center",
        // },
        {
          headerName: 'IsActive',
          field: 'ISACTIVE',
          cellStyle: {'text-align': 'center'},
          width:58,   
          headerClass: "text-center",
          cellRenderer: this.UpdateRender.bind(this),
        },
        {
          headerName: 'ActDateTime',
          field: 'ACTDATETIME',
          cellStyle: {'text-align': 'center'},
          width:161,
          headerClass: "text-center",
          cellRenderer: this.DateRender.bind(this)
        },
        {
          headerName: 'CDateTime',
          field: 'CDATETIME',
          cellStyle: {'text-align': 'center'},
          width:161,
          headerClass: "text-center",
          cellRenderer: this.DateRender.bind(this)
        },
        
        {
          headerName: 'Remark',
          field: 'REMARK',
          cellStyle: {'text-align': 'center'},
          width:152,
          headerClass: "text-center",
          editable : true,
          cellClass : ['editable-cell'],
          valueGetter : function(params) {
            return params.data.REMARK ? params.data.REMARK : '';
          },
          valueSetter : function(params) {
            if(params.newValue == ''){
              params.data.REMARK = params.newValue;
              return true
            }
            if (params.data.REMARK !== params.newValue) {
              params.data.REMARK = params.newValue;
              return true;
            } else {
              params.data.REMARK = params.newValue
              return true;
            }

          },
        },
        {
          headerName: 'Approve UserID',
          field: 'APPROVEUSERID',
          cellStyle: {'text-align': 'center'},
          width:93,
          headerClass: "text-center",
        },
        
      ]
  
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        headerCheckboxSelectionFilteredOnly:true,
      }
     }

     CHANGEPASSWORD() {
      if (!this.PASS) return
      this.gridApi.redrawRows();
    }

  async ngOnInit() {

    this.PER = await this._FrmOpePer.UserFrmOpePer('LoginPermissionComponent')
		this.ALLOWDEL = this.PER[0].DEL
		this.ALLOWINS = this.PER[0].INS
		this.ALLOWUPD = this.PER[0].UPD
		this.PASS = this.PER[0].PASS
    this.UserMastServ.UserMastFill({USERID : ''}).subscribe((UserIdRes) => {
      try{
        if(UserIdRes.success == 1){
          this.UserIdArr = UserIdRes.data.map((item) => {
            return {userId: item.USERID}
          })
        }else{
          this.toastr.warning("Something gone wrong while get UserId")
        }
      }catch(error){
        this.toastr.error(error)
      }
    });

    $('body').on('focusin', 'select.UserIDList', function(this) {

      $(this).data('val', $(this).val());
    });

    let that = this;


    $('body').on('change', 'select.UserIDList', function(this) {

      Swal.fire({
        title: "Are you sure give permission?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {
          var inputData = $(this).prevAll()
          that.AssignedUserID($(inputData[0]).val(),$(this).val())
        }else{
          $(this).val($(this).data('val'))
        }

      })

    });


  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadGrid()
  }

  LoadGrid(){
    this.spinner.show()
    let searchObj={
      USERID:this.USERID ? this.USERID : '',
      F_DATE:this.F_DATE ? this.datePipe.transform(this.F_DATE, 'yyyy-MM-dd') : '',
      T_DATE:this.T_DATE ?  this.datePipe.transform(this.T_DATE, 'yyyy-MM-dd') : '',
    }
    this.LoginPermissionServ.CompPerMastIPFill(searchObj).subscribe((UserIPRes) => {
      try{
        if(UserIPRes.success == 1){
          this.gridApi.setRowData(UserIPRes.data);
          this.spinner.hide()
        }else{
          this.spinner.hide()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(UserIPRes.data),
          })
        }
      }catch(error){
        this.spinner.hide()
        this.toastr.error(error)
      }
    })
  }

  
  Clear(){
    this.USERID ='',
    this.F_DATE = '',
    this.T_DATE = '',
    this.LoadGrid()
  }


  onGridRowClicked(e: any) {
    if (e.event.target !== undefined) {

      let actionType = e.event.target.getAttribute("data-action-type");

      if(actionType == "IsActive") {
        
        let dataObj = e.data;
        dataObj.ISACTIVE = !dataObj.ISACTIVE;
        e.node.setData(dataObj)
        e.api.refreshCells({force:true})
      }
      if(actionType == "SaveData"){
        let msg = e.data.ISACTIVE ? "Are you sure you want to active?" : "Are you sure you want to inactive?";
        let actionMsg = !e.data.ISACTIVE?"Activated Successfully!!":"Deactived successfully!!";

        Swal.fire({title: msg, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No'}).then((result) => {
          if (result.value) {
            this.spinner.show()
            let dataObj = e.data;
            // dataObj.ISACTIVE = !dataObj.ISACTIVE;
            let IsActive_FLG = e.data.ISACTIVE == true ? true : false;
            let SaveObj = {
              ANO:e.data.ANO,
              USERID:e.data.USERID,
              IPADDRESS:e.data.IPADDRESS,
              MACADDRESS:e.data.MACADDRESS,
              ISACTIVE:IsActive_FLG,
              REMARK:e.data.REMARK
            }
            this.LoginPermissionServ.CompPerMastIPSave(SaveObj).subscribe(Res => {
              if(Res.success == 1){
                this.LoadGrid()
                this.spinner.hide()
                this.toastr.success(actionMsg)
              }
            },error => {
              this.spinner.hide()
              Swal.fire({title: "Error occured", icon: 'warning', timer:2500})
            });
            e.node.setData(dataObj)
          }
          e.api.refreshCells({force:true})
        })

      }else if(actionType == 'DeleteUserPer'){
        Swal.fire({title: 'Are you sure you want to delete '+e.data.ANO+ '?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No'}).then((result) => {
          if (result.value) {
            this.spinner.show()
            this.LoginPermissionServ.CompPerMastIPDelete({ANO:e.data.ANO}).subscribe((DeleteRes)=>{
              try{
                if(DeleteRes.success == 1){
                  this.spinner.hide()
                  this.toastr.success('successfully delete !!!')
                  this.LoadGrid()

                }else{
                  this.spinner.hide()
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: JSON.stringify(DeleteRes.data),
                  })
                }
              }catch(error){
                this.spinner.hide()
                this.toastr.error(error)
              }
            })
          }else{
            return
          }
        })
      }

    }
  }


  onCellValueChanged(event:any){
    let dataObj = event.data;
    
    if(event.colDef.field == 'REMARK'){
      this.spinner.show();
      this.LoginPermissionServ.CompPerMastIPSave(dataObj).subscribe(Res => {
        if(Res.success == 1){
          this.LoadGrid();
          this.spinner.hide();
          this.toastr.success('Remark updated successfully.');
          event.node.setData(dataObj);
          event.api.refreshCells({force:true});
        }
      },error => {
        this.spinner.hide()
        Swal.fire({title: "Error occured", icon: 'warning', timer:2500})
      });
      
    }


  }


  UpdateRender(params){
    let RenderHtml = ''
    
      if(params.data.ISACTIVE){
        RenderHtml += '<input type="checkbox" checked data-action-type="IsActive">'
      }else{
        RenderHtml += '<input type="checkbox" data-action-type="IsActive">'
      }
    
    
    return RenderHtml
  }

  DateRender(params){
    if(params.data.ACTDATETIME){
      return this.datePipe.transform(params.data.ACTDATETIME, 'dd-MM-yyyy')
    }
    if(params.data.CDATETIME){
      return this.datePipe.transform(params.data.CDATETIME, 'dd-MM-yyyy')
    }

  }


  DeleteRender(params){
    let RenderHtml = '<span class="det_val">'
   
      RenderHtml += '<i class="icon-cancel-button grid-icon" data-action-type="DeleteUserPer" style="cursor: pointer;margin-left: 5px;"></i>'
    RenderHtml += '</span>'
    return RenderHtml
  }

  AssignedUserID(ANO:any,userId:any){
  
    let List = [];
    let SaveObj;
    this.gridApi.forEachNode(function (rowNode, index) {
      List.push(rowNode.data)
    });

    SaveObj = List.find((item)=> item.ANO == ANO);
    SaveObj.USERID = userId;

    this.spinner.show();
    this.LoginPermissionServ.CompPerMastIPSave(SaveObj).subscribe(Res => {
      if(Res.success == 1){
        this.LoadGrid();
        this.spinner.hide();
        this.toastr.success('UserID updated successfully.');
        // this.LoadGrid();
      }else{
        Swal.fire({title: JSON.stringify(Res.data), icon: 'warning', timer:2500})  
      }
    },error => {
      this.spinner.hide()
      Swal.fire({title: "Error occured", icon: 'warning', timer:2500})
    });
  }
}
