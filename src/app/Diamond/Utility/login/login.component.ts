import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"
import { DeviceDetectorService } from "ngx-device-detector"
import { NgxSpinnerService } from "ngx-spinner"
import { ToastrService } from "ngx-toastr"
import { LoginDetailService } from "src/app/Service/Config/login-detail.service"
import { LoginService } from "src/app/Service/Utility/login.service"
import { environment } from "src/environments/environment"
import { v4 as uuidv4 } from 'uuid';
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit {
	decodeHelper = new JwtHelperService()
	decodedTkn = this.decodeHelper.decodeToken(sessionStorage.getItem("token"))
	RUN: boolean = true
	title: string = ""
	loginForm: FormGroup
	OtpForm:boolean = false
	OTPForm : FormGroup;
	token : any = '';

	OtpValue:any = ''

	isResendDisabled:boolean = true
	remainingTime: number = 0;

	constructor(
		public LoginServ: LoginService,
		private router: Router,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private LoginDetailServ: LoginDetailService,
		private deviceService: DeviceDetectorService,
		private titleService: Title
	) {
		this.title = window.origin
		this.title = this.title.slice(7)

		this.titleService.setTitle(this.title)

		this.loginForm = new FormGroup({
			UserId: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required]),
		})
		this.OTPForm = new FormGroup({
			OTP: new FormControl("", [Validators.required]),
		  });
		  if(localStorage.getItem('uuid') == null || localStorage.getItem('uuid') == ''){
			localStorage.setItem('uuid',uuidv4()+'-'+this.deviceService.getDeviceInfo().browser);
		  }
	}

	ngOnInit(): void {
		this.spinner.hide()

		// localStorage.setItem("version", "v19.09.2022.01:00")

		if (sessionStorage.getItem("token")) {
			this.router.navigateByUrl("dashboard")
		} else {
			this.router.navigateByUrl("login")
		}
	}

	startCountdown() {
		const interval = setInterval(() => {
		  this.remainingTime--;
		  if (this.remainingTime <= 0) {
			this.isResendDisabled = false;
			clearInterval(interval);
		  }
		}, 1000);
	  }

	async onSubmit() {
		let LoginObj = {
			USERID: this.loginForm.value.UserId,
			PASS: this.loginForm.value.password,
			LINK: window.location.hostname,
			uuid : localStorage.getItem('uuid'),
      		COMPUTERNAME : `OS: ${this.deviceService.os} ; browser: ${this.deviceService.browser} ; device: ${this.deviceService.device} ; os_version: ${this.deviceService.os_version} ; browser_version: ${this.deviceService.os_version} ;  userAgent: ${this.deviceService.userAgent}`,
			BASEURL: environment.BaseUrl
		}
		this.spinner.show()
		await this.LoginServ.LoginAuthentication(LoginObj).then(
			async (LoginRes) => {
				try {
					if (LoginRes.success == true) {
						this.spinner.hide()
						this.OtpForm = true
						this.token = LoginRes.data;
						this.onOTPSubmit()
					} else if (LoginRes.success == 2) {
						this.spinner.hide()
						this.toastr.warning("Not Found")
					} else if (LoginRes.success == 3) {
						this.spinner.hide()
						this.toastr.warning("Password does not match")
					} else if (LoginRes.success == 5) {
						this.spinner.hide()
						this.toastr.warning("User not found")
					} else if (LoginRes.success == 6) {
						this.spinner.hide()
						this.toastr.warning(LoginRes.data)
					} else if (LoginRes.success == 4){
						this.spinner.hide();
						this.toastr.warning(LoginRes.data)
					} else if (LoginRes.success == 10){
						this.spinner.hide();
						this.toastr.warning('This Device is not Authenticated, Please contact to System ADMIN.')
					}
					else {
						this.spinner.hide()
						this.toastr.warning("Something went wrong.")
					}
				} catch (err) {
					this.spinner.hide()
					this.toastr.error(err)
				}
			}
		)
	}

	ClearTokne(){
		this.token = ''
	}
	async onOTPSubmit(){
		this.spinner.show()
		let decodeHelper = new JwtHelperService();
		let decodedTkn = decodeHelper.decodeToken(this.token);
		this.spinner.show()
		this.LoginServ.GetEmail({IUSER:decodedTkn.UserId}).subscribe((Res)=>{
			this.spinner.hide()
			try {
			if(Res.success == true){
			this.LoginServ.EmailSendOTP({EMAIL:Res.data[0],USERID:decodedTkn.UserId}).subscribe((ORes)=>{
		  	this.spinner.hide()
		  try {
			if(ORes.success == true){
				this.toastr.success('Otp Send on Your Registed Mail !!!')
				this.OtpValue = ORes.data
				this.isResendDisabled = true
				this.remainingTime = 120
				this.startCountdown()
			}else{
			  this.toastr.warning(JSON.stringify(ORes.data))
			  this.token = ''
			  sessionStorage.removeItem('token')
    		sessionStorage.clear()
			}
		  } catch (error) {
			this.token = ''
			sessionStorage.removeItem('token')
    		sessionStorage.clear()
			console.log(error)
			this.toastr.error(error)
		  }
		})
			}else{
    		sessionStorage.clear()
			}
		  } catch (error) {
			console.log(error)
			this.toastr.error(error)
		  }
		})
	  }

	  OTPSubmit(){
		const decrypt = (salt, encoded) => {
			  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
			  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
			  return encoded
				.match(/.{1,2}/g)
				.map((hex) => parseInt(hex, 16))
				.map(applySaltToChar)
				.map((charCode) => String.fromCharCode(charCode))
				.join("");
			};

			const decrypted_string = decrypt("Pr!dcr0n@990", this.OtpValue);

			if(parseInt(this.OTPForm.value.OTP) == parseInt(decrypted_string)){
			  sessionStorage.setItem('token',this.token)
			  sessionStorage.setItem("barcode", "")
			  window.location.href = window.location.origin+'/dashboard';
			}else{
			  this.toastr.warning("Enter vaild OTP.")
			}
	  }

	  ResendOtp(){
		  this.onOTPSubmit()
	  }
}
