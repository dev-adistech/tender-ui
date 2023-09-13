import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"
import { NgxSpinnerService } from "ngx-spinner"
import { ToastrService } from "ngx-toastr"
import { LoginDetailService } from "src/app/Service/Config/login-detail.service"
import { LoginService } from "src/app/Service/Utility/login.service"
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

	constructor(
		public LoginServ: LoginService,
		private router: Router,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private LoginDetailServ: LoginDetailService,
		private titleService: Title
	) {
		this.title = window.origin
		this.title = this.title.slice(7)

		this.titleService.setTitle(this.title)

		this.loginForm = new FormGroup({
			UserId: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required]),
		})
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

	async onSubmit() {
		let LoginObj = {
			USERID: this.loginForm.value.UserId,
			PASS: this.loginForm.value.password,
			LINK: window.location.hostname
		}
		this.spinner.show()
		await this.LoginServ.LoginAuthentication(LoginObj).then(
			async (LoginRes) => {
				try {
					if (LoginRes.success == true) {
						this.spinner.hide()
						sessionStorage.setItem("token", LoginRes.data)
						sessionStorage.setItem("barcode", "")
						let SaveObj = {
							USERID: this.loginForm.value.UserId,
							RUN: this.RUN,
							URL: window.location.hostname
						}
						await this.LoginDetailServ.LoginDetailSave(SaveObj).subscribe(
							(SaveRes) => {
								try {
									if (SaveRes.success == true) {
										this.spinner.hide()
									} else {
										this.spinner.hide()
										this.toastr.warning("Cannot save login details.")
									}
								} catch (error) {
									this.spinner.hide()
									this.toastr.error(error)
								}
							}
						)
						// this.router.navigateByUrl("home")
						window.location.href = window.location.origin+'/dashboard';
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
}
