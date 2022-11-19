import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: "root",
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private ngxSpinnerService: NgxSpinnerService) {}
  busy() {
    this.busyRequestCount++;
    this.ngxSpinnerService.show(undefined, {
      type: "ball-scale-multiple",
      bdColor: "rgba(0, 0, 0, .6)",
      color: "white",
    });
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.ngxSpinnerService.hide();
    }
  }
}
