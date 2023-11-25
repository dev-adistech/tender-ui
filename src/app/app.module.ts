import { DatePipe } from "@angular/common"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MAT_DATE_LOCALE } from "@angular/material/core"
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { MatDatetimepickerModule, MatNativeDatetimeModule } from "@mat-datetimepicker/core"
import { NgSelectModule } from "@ng-select/ng-select"
import { AgGridModule } from "ag-grid-angular"
import "ag-grid-enterprise"
import { jqxGridModule } from "jqwidgets-ng/jqxgrid"
import { NgxSpinnerModule } from "ngx-spinner"
import { ToastrModule } from "ngx-toastr"
import { AgGridDateEditorComponent } from './Diamond/Common/ag-grid-date-editor'
import { HomeComponent } from "./Diamond/Common/home/home.component"
import { ListboxComponent } from "./Diamond/Common/listbox/listbox.component"
import { ReportListBoxComponent } from "./Diamond/Common/report-list-box/report-list-box.component"
import { PerMastComponent } from "./Diamond/Config/per-mast/per-mast.component"
import { UserCatComponent } from "./Diamond/Config/user-cat/user-cat.component"
import { UserMastComponent } from "./Diamond/Config/user-mast/user-mast.component"
import { DashStockComponent } from "./Diamond/Dashboard/dash-stock/dash-stock.component"
import { DashboardComponent } from "./Diamond/Dashboard/dashboard/dashboard.component"
import { ColMastComponent } from "./Diamond/Master/col-mast/col-mast.component"
import { CutMastComponent } from "./Diamond/Master/cut-mast/cut-mast.component"
import { FloMastComponent } from "./Diamond/Master/flo-mast/flo-mast.component"
import { IncMastComponent } from "./Diamond/Master/inc-mast/inc-mast.component"
import { QuaMastComponent } from "./Diamond/Master/qua-mast/qua-mast.component"
import { ShpMastComponent } from "./Diamond/Master/shp-mast/shp-mast.component"
import { SizeMastComponent } from "./Diamond/Master/size-mast/size-mast.component"
import { ViewParaMastComponent } from "./Diamond/Master/view-para-mast/view-para-mast.component"
import { ReportComponent } from "./Diamond/Report/report/report.component"
import { LoginComponent } from "./Diamond/Utility/login/login.component"
import { SetFloatPipe } from "./Diamond/_helpers/CustomPipe/set-float.pipe"
import { AgGridAutoCompleteComponent } from "./Diamond/_helpers/ag-grid-auto-complete.component"
import { AutoFocusDirective } from './Diamond/_helpers/auto-focus.directive'
import { MaterialModule } from "./MaterialModule/material-module"
import { EncrDecrService } from "./Service/Common/encr-decr.service"
import { AuthInterceptor } from "./Service/auth/auth.interceptor"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SwiperModule } from 'ngx-swiper-wrapper'

import { AgGridTimeEditorComponent } from "./Diamond/Common/ag-grid-time-editor"
import { LoginPopupComponent } from './Diamond/Common/home/login-popup/login-popup.component'
import { ViewParaComponent } from "./Diamond/Common/ViewPara";
import { LabMastComponent } from './Diamond/Master/lab-mast/lab-mast.component';
import { TendarComComponent } from './Diamond/Transaction/tendar-com/tendar-com.component';
import { TendarMastComponent } from './Diamond/Transaction/tendar-mast/tendar-mast.component';
import { RapOrgComponent } from "./Diamond/Rap/rap-org/rap-org.component"
import { RapCutDiscComponent } from "./Diamond/Rap/rap-cut-disc/rap-cut-disc.component"
import { RapFloDiscComponent } from "./Diamond/Rap/rap-flo-disc/rap-flo-disc.component"
import { RapIncDiscComponent } from "./Diamond/Rap/rap-inc-disc/rap-inc-disc.component"
import { RapMastDetComponent } from "./Diamond/Rap/rap-mast/rap-mast-det/rap-mast-det.component"
import { NumberEditableComponent } from "./Diamond/Rap/rap-mast/number-editable/number-editable.component";
import { TendarEstComponent } from './Diamond/Transaction/tendar-est/tendar-est.component';
import { RapMastComponent } from "./Diamond/Rap/rap-mast/rap-mast.component";
import { TensionMastComponent } from './Diamond/Master/tension-mast/tension-mast.component';
import { MachineColMastComponent } from './Diamond/Master/machine-col-mast/machine-col-mast.component';
import { FloNumMastComponent } from './Diamond/Master/flo-num-mast/flo-num-mast.component';
import { MachineFloMastComponent } from './Diamond/Master/machine-flo-mast/machine-flo-mast.component';
import { MacComMastComponent } from './Diamond/Master/mac-com-mast/mac-com-mast.component';
import { MilkyMastComponent } from './Diamond/Master/milky-mast/milky-mast.component';
import { GridleMastComponent } from './Diamond/Master/gridle-mast/gridle-mast.component';
import { DepthMastComponent } from './Diamond/Master/depth-mast/depth-mast.component';
import { RatioMastComponent } from './Diamond/Master/ratio-mast/ratio-mast.component';
import { MiniPaintComponent } from './Diamond/Transaction/tendar-est/mini-paint/mini-paint.component';
import { WebCamComponent } from './Diamond/Transaction/tendar-est/web-cam/web-cam.component';
import { ImageUploadComponent } from './Diamond/Transaction/tendar-est/image-upload/image-upload.component';
import { PricingWrkViewComponent } from './Diamond/View/pricing-wrk-view/pricing-wrk-view.component';
import { BVViewComponent } from './Diamond/View/b-v-view/b-v-view.component';
import { VideoShowComponent } from './Diamond/Transaction/tendar-est/video-show/video-show.component';
import { BidDataComponent } from './Diamond/View/bid-data/bid-data.component';
import { ShdMastComponent } from './Diamond/Master/shd-mast/shd-mast.component';
import { RefMastComponent } from './Diamond/Master/ref-mast/ref-mast.component';
import { LotMappingComponent } from './Diamond/Transaction/lot-mapping/lot-mapping.component';
import { RoughColorAnaComponent } from './Diamond/View/rough-color-ana/rough-color-ana.component';
import { ParcelViewComponent } from './Diamond/View/parcel-view/parcel-view.component';
import { BvViewDetComponent } from './Diamond/View/b-v-view/bv-view-det/bv-view-det.component';
import { GetCertiResComponent } from './Diamond/Config/get-certi-res/get-certi-res.component';
import { SellDaysMastComponent } from './Diamond/Master/sell-days-mast/sell-days-mast.component';
import { RateUpdateComponent } from './Diamond/Config/rate-update/rate-update.component'
import { LoginPermissionComponent } from "./Diamond/Utility/login-permission/login-permission.component"


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		ShpMastComponent,
		SizeMastComponent,
		ColMastComponent,
		QuaMastComponent,
		CutMastComponent,
		FloMastComponent,
		UserCatComponent,
		IncMastComponent,
		ViewParaMastComponent,
		PerMastComponent,
		DashStockComponent,
		ListboxComponent,
		ReportComponent,
		ReportListBoxComponent,
		SetFloatPipe,
		AgGridAutoCompleteComponent,
		HomeComponent,
		AutoFocusDirective,
		AgGridDateEditorComponent,
		AgGridTimeEditorComponent,
		LoginPopupComponent,
		ViewParaComponent,
		LabMastComponent,
		TendarComComponent,
		RapMastComponent,
		UserMastComponent,
		TendarMastComponent,
		RapOrgComponent,
		RapCutDiscComponent,
		RapFloDiscComponent,
		RapIncDiscComponent,
		RapMastDetComponent,
		NumberEditableComponent,
		TendarEstComponent,
		TensionMastComponent,
		MachineColMastComponent,
		FloNumMastComponent,
		MachineFloMastComponent,
		MacComMastComponent,
		MilkyMastComponent,
		GridleMastComponent,
		DepthMastComponent,
		RatioMastComponent,
		MiniPaintComponent,
		WebCamComponent,
		ImageUploadComponent,
		PricingWrkViewComponent,
		BVViewComponent,
		VideoShowComponent,
		BidDataComponent,
		ShdMastComponent,
		RefMastComponent,
		LotMappingComponent,
		RoughColorAnaComponent,
		ParcelViewComponent,
		BvViewDetComponent,
		GetCertiResComponent,
		SellDaysMastComponent,
		RateUpdateComponent,
		LoginPermissionComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		NgxSpinnerModule,
		MatNativeDatetimeModule,
		MatDatetimepickerModule,
		ToastrModule.forRoot(),
		AgGridModule.withComponents([]),
		jqxGridModule,
		NgSelectModule,
		MatDialogModule,
		SwiperModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		DatePipe,
		EncrDecrService,
		{ provide: MAT_DATE_LOCALE, useValue: "en-GB" },
		{ provide: LOCALE_ID, useValue: "en-GB" },
		// PushNotificationService
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
