import {
    AfterViewInit,
    Component,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'app-numeric-editor-cell',
    template: `
      <input
        #i
        [value]="params.value"
        (keypress)="onKeyPress($event)"
        (keydown)="onKeyDown($event)"
        (keyup)="onKeyUP($event)"
        style="width: 100%; height: -webkit-fill-available;"
      />
    `
})
export class NumericEditorComponent implements AfterViewInit {
    @ViewChild('i') textInput;
    params: any;

    ngAfterViewInit() {
        setTimeout(() => this.textInput.element.nativeElement.focus());
    }

    agInit(params: any): void {
        this.params = params;
    }
    getValue() {
        return this.textInput * 2;
    }
    onKeyUP(event) { }
    onKeyPress(event) { }

    onKeyDown(event) {
        if (
            event.keyCode === 8 ||
            event.keyCode === 46 ||
            event.keyCode === 37 ||
            event.keyCode === 39
        ) {
            return true;
        }
        if (event.target.value.length >= 6) {
            event.preventDefault();
        }
        if (event.key == '.') {
            if (event.target.value.includes('.')) {
                event.preventDefault();
            }
        } else if (!isNumeric(event)) {
            event.preventDefault();
        } else if (event.target.value + event.key > 100.01) {
            event.preventDefault();
        } else if (event.target.value.includes('.') && event.key != '.') {
            let myarr = (event.target.value + event.key).split('.');
        }
        function isNumeric(ev) {
            return /\d/.test(ev.key);
        }
    }
}
