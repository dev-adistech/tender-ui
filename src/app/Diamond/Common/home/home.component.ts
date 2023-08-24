import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { PushNotificationOptions } from 'ngx-push-notifications';
// import * as $ from "jquery";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { version } from 'package.json';
import { Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { CommonService } from 'src/app/Service/Common/common.service';
import { DockService } from 'src/app/Service/Common/dock.service';
import { EncrDecrService } from 'src/app/Service/Common/encr-decr.service';
import { FooterTextService } from 'src/app/Service/Config/footer-text.service';
import { LoginDetailService } from 'src/app/Service/Config/login-detail.service';
import { DashboardService } from 'src/app/Service/Dashboard/dashboard.service';
import { LoginService } from 'src/app/Service/Utility/login.service';
import { ViewService } from 'src/app/Service/View/view.service';
import { environment } from 'src/environments/environment';
import { PerMastComponent } from '../../Config/per-mast/per-mast.component';
import { UserCatComponent } from '../../Config/user-cat/user-cat.component';
import { UserMastComponent } from '../../Config/user-mast/user-mast.component';
import { ColMastComponent } from '../../Master/col-mast/col-mast.component';
import { CutMastComponent } from '../../Master/cut-mast/cut-mast.component';
import { FloMastComponent } from '../../Master/flo-mast/flo-mast.component';
import { IncMastComponent } from '../../Master/inc-mast/inc-mast.component';
import { QuaMastComponent } from '../../Master/qua-mast/qua-mast.component';
import { ShpMastComponent } from '../../Master/shp-mast/shp-mast.component';
import { SizeMastComponent } from '../../Master/size-mast/size-mast.component';
import { ViewParaMastComponent } from '../../Master/view-para-mast/view-para-mast.component';
import { ReportComponent } from '../../Report/report/report.component';
import { HomeShortCuts } from '../../_helpers/functions/HomeShortCuts';
import { DashboardComponent } from './../../Dashboard/dashboard/dashboard.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { TensionMastComponent } from '../../Master/tension-mast/tension-mast.component';
import { MachineColMastComponent } from '../../Master/machine-col-mast/machine-col-mast.component';
import { FloNumMastComponent } from '../../Master/flo-num-mast/flo-num-mast.component';
import { MachineFloMastComponent } from '../../Master/machine-flo-mast/machine-flo-mast.component';
import { MacComMastComponent } from '../../Master/mac-com-mast/mac-com-mast.component';
import { MilkyMastComponent } from '../../Master/milky-mast/milky-mast.component';
import { GridleMastComponent } from '../../Master/gridle-mast/gridle-mast.component';
import { DepthMastComponent } from '../../Master/depth-mast/depth-mast.component';
import { RatioMastComponent } from '../../Master/ratio-mast/ratio-mast.component';

declare function tabs(params: any): any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private socket: any;
  public socketData: any;
  public version: string = version;
  public url = environment.BaseUrl
  public port = environment.PORT
  public port1 = environment.PORT1

  FOOTERMSG: any = '';
  SLIDSHOW: boolean = false;
  currentImage: string;
  currentIndex: number = 0;
  images: any = []

  clickEventsubscription: Subscription;

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    this.LoginDetailUpdate();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.homeShortCut.handleKeyDown(event)
   
  }

  menus: string[] = ['.dashboard-menu', '.master-menu', '.transaction-menu', '.view-menu', '.pricing-menu', '.config-menu', '.report-menu']
  buttons: string[] = ['.dashboard-btn', '.master-btn', '.transaction-btn', '.view-btn', '.pricing-btn', '.config-btn', '.report-btn']
  

  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"));

  tabs = [];
  docks = [];
  FormPermissionArray = []
  MenuPermissionArray = []
  ComponentName: any = {};

  selected = new FormControl(0);

  USER_NAME: any = '';

  masterRough: Boolean
  masterMachine: Boolean
  masterParameter: Boolean
  masterEmp: Boolean
  transactionInner: Boolean
  transactionAverageEnt: Boolean
  transactionQC: Boolean
  transcationGrading: Boolean
  transactionPointer: Boolean
  viewPointer: Boolean
  viewInner: Boolean
  viewGranding: Boolean
  pricing: Boolean
  // reportPointer: Boolean
  configUser: Boolean
  configPersmission: Boolean
  configUtility: Boolean

  OpenPasswordChange: Boolean = false;
  NEWPASS: any = ''
  CNFPASS: any = ''

  constructor(
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    public EncrDecrServ: EncrDecrService,
    public DashboardServ: DashboardService,
    public LoginServ: LoginService,
    private ViewServ: ViewService,
    public FooterTextServ: FooterTextService,
    private LoginDetailServ: LoginDetailService,
    private DockServ: DockService,
    public router: Router,
    public httpClient: HttpClient,
    public handler: HttpBackend,
    public dialog: MatDialog,
    public homeShortCut: HomeShortCuts,
    public commonServ: CommonService,
    // private _pushNotificationService: PushNotificationService
  ) {
    this.socket = io(`${this.url}:${this.port1}`, {
      path: '/socket.io',
      withCredentials: true,
      transports: ['websocket', 'polling'],
      secure: true,
    }
    );
    this.clickEventsubscription = this.DashboardServ.getClickEvent().subscribe((res) => {
    });
  }

  async ngOnInit() {
    this.spinner.hide()
    this.USER_NAME = this.decodedTkn.UserId;
    this.FillPermissions()
    this.loadScript('./../../../../assets/easyui/jquery.min.js');
    this.loadScript('./../../../../assets/easyui/jquery.easyui.min.js');
    setTimeout(() => {
      var count = $('#dynamicTabs').tabs('tabs').length;
      for (var i = count - 1; i >= 0; i--) {
        $('#dynamicTabs').tabs('close', i);
      }
    }, 700);
    // to disable right click
    window.addEventListener('contextmenu', function (e) {
      // do something here...
      e.preventDefault();
    }, false);

    await this.FillAllMaster()

    this.HideSubMenu()


  }

  windowopen: boolean = false;


  HideSubMenu() {
    if (this.CheckFormPermission('ShpMastComponent') ||
      this.CheckFormPermission('ColMastComponent') ||
      this.CheckFormPermission('QuaMastComponent') ||
      this.CheckFormPermission('CutMastComponent') ||
      this.CheckFormPermission('FloMastComponent') ||
      this.CheckFormPermission('SizeMastComponent') ||
      this.CheckFormPermission('RapLabMastComponent') ||
      this.CheckFormPermission('ViewParaMastComponent')||
      this.CheckFormPermission('FloNumMastComponent')||
      this.CheckFormPermission('MilkyMastComponent')||
      this.CheckFormPermission('GridleMastComponent')||
      this.CheckFormPermission('DepthMastComponent')||
      this.CheckFormPermission('RatioMastComponent')||
      this.CheckFormPermission('TensionMastComponent')) {
      this.masterParameter = true;
    } else {
      this.masterParameter = false;
    }

    if (this.CheckFormPermission('MachineColMastComponent')||
      this.CheckFormPermission('MacComMastComponent')||
      this.CheckFormPermission('MachineFloMastComponent')
    ){
      this.masterMachine = true;
    } else{
      this.masterMachine = false;
    }

    if (this.CheckFormPermission('TendarComComponent') || this.CheckFormPermission('TendarMastComponent')) {
      this.transactionPointer = true;
    } else {
      this.transactionPointer = false;
    }

    if (this.CheckFormPermission('TendarEstComponent') || this.CheckFormPermission('RapOrgComponent') ||
      this.CheckFormPermission('RapMastComponent') || this.CheckMenuPermission('RapCutDiscComponent') ||
      this.CheckFormPermission('RapFloDiscComponent') ||
      this.CheckFormPermission('RapIncDiscComponent') ||
      this.CheckFormPermission('RapParamDiscComponent')) {
      this.pricing = true;
    } else {
      this.pricing = false;
    }

    if (this.CheckFormPermission('UserCatComponent') || this.CheckFormPermission('UserMastComponent')) {
      this.configUser = true;
    } else {
      this.configUser = false;
    }

    if (this.CheckFormPermission('PerMastComponent') || this.CheckFormPermission('RptPerMastComponent')) {
      this.configPersmission = true;
    } else {
      this.configPersmission = false;
    }

  }

  FillPermissions() {
    this.LoginServ.UserFrmPer({ USER_NAME: this.decodedTkn.UserId }).then(res => {
      try {
        if (res.success == true) {

          if (res.data.length !== 1 && this.decodedTkn.PROC_CODE == 1 && this.decodedTkn.DEPT_CODE == 'POI') {

            const DresPrdtype = {
              Res: res.data[1],
              // DRes: res
            }
            const dialogRef = this.dialog.open(LoginPopupComponent, {
              panelClass: "app-login-popup",
              autoFocus: false,
              minWidth: "10vw",
              width: "50%",
              height: "50%",
              data: DresPrdtype,
              disableClose: true
            })

            $("#Close").click()
            dialogRef.afterClosed().subscribe((result) => {
              console.log(result)
              if (!DresPrdtype.Res || DresPrdtype.Res.trim() === "") {
                dialogRef.close();
              }
            })
          }
          this.FormPermissionArray = res.data[0].map(item => {
            return item.FORM_NAME
          });

          if (this.decodedTkn.U_CAT == "S" || this.decodedTkn.U_CAT == 'SA') {
            this.FormPermissionArray = this.FormPermissionArray
          } else {

            this.FormPermissionArray = this.FormPermissionArray.filter((x) => x != 'RptMastComponent' && x != 'UserCatComponent' && x != 'UserMastComponent' && x != 'RptParaMastComponent')
          }

          this.MenuPermissionArray = res.data[0].map(item => {
            return item.FORM_GROUP
          });

          this.MenuPermissionArray = this.MenuPermissionArray.filter((element, i) => i === this.MenuPermissionArray.indexOf(element))

        } else {
          this.spinner.hide();
          this.toastr.warning('Something gone wrong while getting page permissions.');
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });
  }

  CheckMenuPermission(e: any): boolean {
    if (this.MenuPermissionArray.filter(x => x == e).length == 0) {
      return false
    } else {
      return true
    }
  }

  CheckFormPermission(e: any): boolean {
    if (this.FormPermissionArray.filter(x => x == e).length == 0) {
      return false
    } else {
      return true
    }
  }

  async FillAllMaster() {
    await this.DashboardServ.FillAllMaster({}).then((FillRes) => {
      try {
        if (FillRes.success == true) {
          var encrypted = this.EncrDecrServ.set(JSON.stringify(FillRes.data));
          localStorage.removeItem('unfam1')
          localStorage.setItem('unfam1', encrypted)
        } else {
          this.toastr.warning('Something went wrong whie FillAllMaster.')
        }
      } catch (error) {
        this.toastr.error(error)
      }
    })
  }

  async AddTab(FormName: string) {

    this.HideMenu()

    switch (FormName) {
      case "Permission Master":
        this.ComponentName = PerMastComponent;
        break;
      case "User Category Master":
        this.ComponentName = UserCatComponent;
        break;
      case "User Master":
        this.ComponentName = UserMastComponent;
        break;
      case "Dashboard":
        this.ComponentName = DashboardComponent;
        break;
      case "Clarity Master":
        this.ComponentName = QuaMastComponent;
        break;
      case "Color Master":
        this.ComponentName = ColMastComponent;
        break;
      case "Cut Master":
        this.ComponentName = CutMastComponent;
        break;
      case "Fluorescence Master":
        this.ComponentName = FloMastComponent;
        break;
      case "Inclusion Master":
        this.ComponentName = IncMastComponent;
        break;
      case "Shape Master":
        this.ComponentName = ShpMastComponent;
        break;
      case "Size Master":
        this.ComponentName = SizeMastComponent;
        break;
      case "ViewPara Master":
        this.ComponentName = ViewParaMastComponent;
        break;
      case "Tension Master":
        this.ComponentName = TensionMastComponent;
        break;
      case "Machine Color Master":
        this.ComponentName = MachineColMastComponent;
        break;
      case "Machine Fluorescence Master":
        this.ComponentName = MachineFloMastComponent;
        break;
      case "Machine Comment Master":
        this.ComponentName = MacComMastComponent;
        break;
      case "Fluorescence Number Master":
        this.ComponentName = FloNumMastComponent;
        break;
      case "Milky Master":
        this.ComponentName = MilkyMastComponent;
        break;
      case "Gridle Master":
        this.ComponentName = GridleMastComponent;
        break;
      case "Depth Master":
        this.ComponentName = DepthMastComponent;
        break;
      case "Ratio Master":
        this.ComponentName = RatioMastComponent;
        break;
    }

    let OpenTab;
    OpenTab = this.tabs.find(Form => Form.label == FormName);

    if (OpenTab == undefined) {
      let Obj1 = {
        label: FormName,
        component: this.ComponentName
      };
      this.tabs.push(Obj1);
      this.selected.setValue(this.tabs.length - 1);
    } else {
      const position = this.tabs.findIndex(PageName => {
        return PageName.label == FormName;
      });
      this.selected.setValue(position);
    }
  }

  removeTab(index: number, comName: any) {
    this.tabs.splice(index, 1);
  }

  PASSWORDCHANGE() {
    if (this.NEWPASS != '' && this.CNFPASS != '') {
      if (this.NEWPASS == this.CNFPASS) {
        let PObj = {
          USERID: this.decodedTkn.UserId,
          U_PASS: this.NEWPASS
        }
        this.commonServ.ChangePassword(PObj).subscribe((PRes) => {
          console.log(PRes)
          if (PRes.success == 1) {
            this.toastr.success("Password Update Successfully")
            this.NEWPASS = ''
            this.CNFPASS = ''
          } else {
            this.toastr.warning(PRes.data)
            this.NEWPASS = ''
            this.CNFPASS = ''
          }
        })

      } else {
        this.toastr.warning(`Password doesn't Match`)
      }
    } else {
      this.toastr.warning('Enter Password')
    }
  }

  nextEnter(event, e) {
    e.focus()
  }

  OpenNewTab(appRoutName, FormName) {
    if (localStorage.getItem(appRoutName) && appRoutName != '/NewInnPrcIss') {
      this.toastr.warning(FormName + ' Tab already opened.')
      return
    }

    localStorage.setItem(appRoutName, 'true')
    localStorage.setItem('_temptoken', sessionStorage.getItem('token'))
    const url = this.router.serializeUrl(
      this.router.createUrlTree([appRoutName])
    );

    window.open(url, '_blank');
  }

  Logout() {
    sessionStorage.removeItem('token')
    sessionStorage.clear()
    this.LoginDetailUpdate();
    location.reload()
  }

  LoginDetailUpdate() {
    this.LoginDetailServ.LoginDetailUpdate({ USERID: this.decodedTkn.UserId, IP: window.location.hostname, TYPE: 'Logout' }).subscribe(LogDetRes => {
      try {
        if (LogDetRes.success == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.warning('Something gone wrong while logging out.');
        }
      } catch (error) {
        this.spinner.hide();
        this.toastr.error(error);
      }
    });
  }

  ReportName(e: any) {
    localStorage.setItem('Report Tab', e)
  }

  ShowMenu(MenuName: string, ButtonName: string) {
    this.ToggleClasses([...this.menus], MenuName, 'active', 'active')
    this.ToggleClasses([...this.buttons], ButtonName, 'active-btn', 'active-btn')
  }

  HideMenu() {
    this.ToggleClasses([...this.menus], '', '', 'active')
    this.ToggleClasses([...this.buttons], '', '', 'active-btn')
  }


  ToggleClasses(items: string[], classToMatch: string, classToAdd: string, classToRemove: string) {
    let activeMenu: string = ''
    const menuIndex = items.indexOf(classToMatch);
    if (menuIndex > -1) activeMenu = items.splice(menuIndex, 1).toString()
    $(activeMenu).toggleClass(classToAdd)
    for (let i in items) $(items[i]).removeClass(classToRemove)
  }

  BgImage() {
    const BgImage = `url: ('http://${this.url}:${this.port}/images/bg/background.jpg')`;
    console.log(BgImage)
    document.documentElement.style.setProperty('--bgUrl', BgImage);
  }

  onTabChanged(event) {
    const tabIndex = event.index
    if (tabIndex >= 0) {
      const tabLabel = this.tabs[tabIndex].label
      this.ViewServ.sendTabChangedEvent(tabLabel);
    }
  }

  addiFrameTabs(title, url) {
    url = window.location.origin + url + '?random=' + (new Date()).getTime() + Math.floor(Math.random() * 1000000)
    if ($('#dynamicTabs').tabs('exists', title)) {
      $('#dynamicTabs').tabs('select', title);
    } else {
      var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:98%;"></iframe>';
      $('#dynamicTabs').tabs('add', {
        title: title,
        content: content,
        closable: true
      });
    }
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
