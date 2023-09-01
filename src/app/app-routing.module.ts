import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Diamond/Common/home/home.component';
import { LoginComponent } from './Diamond/Utility/login/login.component';
import { AuthGuard } from './Service/auth/auth.guard';

//Dashboard
import { DashboardComponent } from './Diamond/Dashboard/dashboard/dashboard.component';

//view
import { PricingWrkViewComponent } from './Diamond/View/pricing-wrk-view/pricing-wrk-view.component';
import { BVViewComponent } from './Diamond/View/b-v-view/b-v-view.component';
import { BidDataComponent } from './Diamond/View/bid-data/bid-data.component';

//master
import { ColMastComponent } from './Diamond/Master/col-mast/col-mast.component';
import { CutMastComponent } from './Diamond/Master/cut-mast/cut-mast.component';
import { FloMastComponent } from './Diamond/Master/flo-mast/flo-mast.component';
import { IncMastComponent } from './Diamond/Master/inc-mast/inc-mast.component';
import { QuaMastComponent } from './Diamond/Master/qua-mast/qua-mast.component';
import { ShpMastComponent } from './Diamond/Master/shp-mast/shp-mast.component';
import { SizeMastComponent } from './Diamond/Master/size-mast/size-mast.component';
import { ViewParaMastComponent } from './Diamond/Master/view-para-mast/view-para-mast.component';

//
import { PerMastComponent } from './Diamond/Config/per-mast/per-mast.component';
import { UserCatComponent } from './Diamond/Config/user-cat/user-cat.component';
import { UserMastComponent } from './Diamond/Config/user-mast/user-mast.component';

//report
import { ReportComponent } from './Diamond/Report/report/report.component';
import { LabMastComponent } from './Diamond/Master/lab-mast/lab-mast.component';
import { TendarComComponent } from './Diamond/Transaction/tendar-com/tendar-com.component';
import { TendarMastComponent } from './Diamond/Transaction/tendar-mast/tendar-mast.component';
import { RapFloDiscComponent } from './Diamond/Rap/rap-flo-disc/rap-flo-disc.component';
import { RapCutDiscComponent } from './Diamond/Rap/rap-cut-disc/rap-cut-disc.component';
import { RapMastComponent } from './Diamond/Rap/rap-mast/rap-mast.component';
import { RapOrgComponent } from './Diamond/Rap/rap-org/rap-org.component';
import { RapIncDiscComponent } from './Diamond/Rap/rap-inc-disc/rap-inc-disc.component';
import { TendarEstComponent } from './Diamond/Transaction/tendar-est/tendar-est.component';
import { TensionMastComponent } from './Diamond/Master/tension-mast/tension-mast.component';
import { MachineColMastComponent } from './Diamond/Master/machine-col-mast/machine-col-mast.component';
import { FloNumMastComponent } from './Diamond/Master/flo-num-mast/flo-num-mast.component';
import { MachineFloMastComponent } from './Diamond/Master/machine-flo-mast/machine-flo-mast.component';
import { MacComMastComponent } from './Diamond/Master/mac-com-mast/mac-com-mast.component';
import { MilkyMastComponent } from './Diamond/Master/milky-mast/milky-mast.component';
import { GridleMastComponent } from './Diamond/Master/gridle-mast/gridle-mast.component';
import { DepthMastComponent } from './Diamond/Master/depth-mast/depth-mast.component';
import { RatioMastComponent } from './Diamond/Master/ratio-mast/ratio-mast.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },

  //Dashboard
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },


  //pricing
  { path: 'RapOrg', component: RapOrgComponent, canActivate: [AuthGuard] },
  { path: 'RapMast', component: RapMastComponent, canActivate: [AuthGuard] },
  { path: 'RapCutDisc', component: RapCutDiscComponent, canActivate: [AuthGuard] },
  { path: 'RapFloDisc', component: RapFloDiscComponent, canActivate: [AuthGuard] },
  { path: 'RapIncDisc', component: RapIncDiscComponent, canActivate: [AuthGuard] },
  { path: 'TendEst', component: TendarEstComponent, canActivate: [AuthGuard] },


  // master
  { path: 'ShpMast', component: ShpMastComponent, canActivate: [AuthGuard] },
  { path: 'ColMast', component: ColMastComponent, canActivate: [AuthGuard] },
  { path: 'QuaMast', component: QuaMastComponent, canActivate: [AuthGuard] },
  { path: 'CutMast', component: CutMastComponent, canActivate: [AuthGuard] },
  { path: 'FloMast', component: FloMastComponent, canActivate: [AuthGuard] },
  { path: 'IncMast', component: IncMastComponent, canActivate: [AuthGuard] },
  { path: 'SizeMast', component: SizeMastComponent, canActivate: [AuthGuard] },
  { path: 'ViewParaMast', component: ViewParaMastComponent, canActivate: [AuthGuard] },
  { path: 'LabMast', component: LabMastComponent, canActivate: [AuthGuard] },
  { path: 'TensionMast', component: TensionMastComponent, canActivate: [AuthGuard] },
  { path: 'MaccolMast', component: MachineColMastComponent, canActivate: [AuthGuard] },
  { path: 'FloNumMast', component: FloNumMastComponent, canActivate: [AuthGuard] },
  { path: 'MacFloMast', component: MachineFloMastComponent, canActivate: [AuthGuard] },
  { path: 'MacComMast', component: MacComMastComponent, canActivate: [AuthGuard] },
  { path: 'MilkyMast', component: MilkyMastComponent, canActivate: [AuthGuard] },
  { path: 'GridleMast', component: GridleMastComponent, canActivate: [AuthGuard] },
  { path: 'DepthMast', component: DepthMastComponent, canActivate: [AuthGuard] },
  { path: 'RatioMast', component: RatioMastComponent, canActivate: [AuthGuard] },

  // Transaction
  { path: 'TenCom', component: TendarComComponent, canActivate: [AuthGuard] },
  { path: 'TenMast', component: TendarMastComponent, canActivate: [AuthGuard] },

  //config
  { path: 'UserCat', component: UserCatComponent, canActivate: [AuthGuard] },
  { path: 'UserMast', component: UserMastComponent, canActivate: [AuthGuard] },
  { path: 'PerMast', component: PerMastComponent, canActivate: [AuthGuard] },
  
  //report
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  
  //view
  { path: 'PricingWrk', component: PricingWrkViewComponent, canActivate: [AuthGuard] },
  { path: 'BvView', component: BVViewComponent, canActivate: [AuthGuard] },
  { path: 'BidData', component: BidDataComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
