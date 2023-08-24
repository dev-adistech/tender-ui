import { HostListener, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class HomeShortCuts {

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // console.log(event)
    // if (event.key == 'F1') {
    //   // this.AddTab('Inner Process Inward')
    //   // this.addiFrameTabs('Inner Process Inward', '/InnPrc')
    //   event.preventDefault()
    // } else if (event.key == 'F2') {
    //   // this.AddTab('Inner Process Recieve')
    //   // this.addiFrameTabs('Inner Process Recieve', '/InnPrcRec')
    //   event.preventDefault()
    // } else if (event.key == 'F3') {
    //   // this.AddTab('Packet Entry')
    //   // this.addiFrameTabs('Packet Entry', '/PktEnt')
    //   event.preventDefault()
    // } else if (event.key == 'F4') {
    //   // this.AddTab('Inner Process Recieve')
    //   this.addiFrameTabs('Inner Process Recieve', '/InnPrcRec')
    //   event.preventDefault()
    // } else if (event.key == 'F5') {
    //   event.preventDefault()
    //   // this.AddTab('Process Inward')
    // } else if (event.key == 'F6') {
    //   // this.AddTab('Packet Recieve')
    //   this.addiFrameTabs('Packet Recieve', '/PktRec')
    //   event.preventDefault()
    // } else if (event.key == 'F7') {
    //   // this.AddTab('Process Return Print')
    //   this.addiFrameTabs('Process Return Print', '/PrcRetPrnt')
    //   event.preventDefault()
    // } else if (event.key == 'F8') {
    //   // this.AddTab('Packet View')
    //   this.addiFrameTabs('Packet View', '/PacketView')
    //   event.preventDefault()
    // } else if (event.key == 'F9') {
    //   this.AddTab('Process View')
    //   this.addiFrameTabs('Process View', '/ProcessView')
    //   event.preventDefault()
    // } else if (event.key == 'F10') {
    //   // this.AddTab('Process Makeable')
    //   this.addiFrameTabs('Process Makeable', '/PrcMakeable')
    //   event.preventDefault()
    // }
  }

}
