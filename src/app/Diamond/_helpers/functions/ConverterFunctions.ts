import { DatePipe } from "@angular/common"
import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class ConverterFunctions {
	constructor(
		public datePipe: DatePipe
	) { }

	NumberFormat(params) {
		if (params.value != "NaN" && params.value != null) {
			return parseInt(params.value)
		} else {
			return ""
		}
	}

	TwoFloatFormat(params) {
		if (params.value != "NaN" && (params.value != null && params.value != "")) {
			return parseFloat(params.value).toFixed(2)
		} else {
			return "0.00"
		}
	}

	ThreeFloatFormat(params) {
		if (params.value != "NaN" && (params.value != null && params.value != "")) {
			return parseFloat(params.value).toFixed(3)
		} else {
			return "0.000"
		}
	}

	StringFormat(params) {
		if (params.value != "NaN" && params.value != null) {
			return params.value
		} else {
			return ""
		}
	}

	DateFormat(params) {
		// console.log('Before Converting: ', params);
		// try {
		if (params.value) {
			// console.log('After Converting: ', this.datePipe.transform(params.value, "dd-MM-yyyy"));
			return this.datePipe.transform(params.value, "dd-MM-yyyy")
		} else {
			return ""
		}
		// } catch (error) {
		// 	console.log('2133', error)
		// }
	}

	TimeFormat(params) {
		if (params.value) {
			return this.datePipe.transform(params.value, "hh:mm a", "UTC+0")
		} else {
			return ""
		}
	}
}
