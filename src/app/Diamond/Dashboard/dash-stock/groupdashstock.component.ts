import { RowNode } from '@ag-grid-community/all-modules';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'

@Component({
    selector: 'floating-cell',
    template: `
        <span>
      {{ node.field }}
      {{ node.key }}
      ({{ node.allChildrenCount }} items)
      (Lot: {{ node.aggData.L_CODE }},
      Pcs: {{ node.aggData.I_PCS }},
      Carat: {{ node.aggData.I_CARAT }},
    </span>
    `,
    styles: [``],

})


export class groupDashstckRenderer implements ICellRendererAngularComp {
    public node: RowNode;
  
    agInit(params: any): void {
      this.node = params.node;
      console.log(this.node)
    }
  
    refresh(): boolean {
      return false;
    }
  }
  