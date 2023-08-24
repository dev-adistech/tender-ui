import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })

export class ExcelFunctions {

  ExportExcel(excelData, fileName, ws_name) {

    fileName = fileName + ".xlsx";

    // var data = ExpRes.data
    // var ws_name = "SheetJS";

    // type ColInfo = {
    //   /* visibility */
    //   hidden?: boolean; // if true, the column is hidden

    //   /* column width is specified in one of the following ways: */
    //   wpx?: number;  // width in screen pixels
    //   width?: number;  // width in Excel "Max Digit Width", width*256 is integral
    //   wch?: number;  // width in characters

    //   /* other fields for preserving features from files */
    //   level?: number;  // 0-indexed outline / group level
    //   MDW?: number;  // Excel "Max Digit Width" unit, always integral
    // };

    // if (typeof console !== 'undefined') console.log(new Date());
    let wb = XLSX.utils.book_new()
    let ws = XLSX.utils.json_to_sheet(excelData);
    // console.log(ws);
    // ws["!cols"] = [RowColDefs[0]];
    // ws["!rows"] = [RowColDefs[1]];

    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* write workbook */
    // if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, fileName);
    // if (typeof console !== 'undefined') console.log(new Date());
  }

}
