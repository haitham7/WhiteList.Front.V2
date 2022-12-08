import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class BusyService {
  busyRequestCount = 0;
  isLoading = new Subject<boolean>();
  constructor() {}
  busy() {
    this.busyRequestCount++;
    this.isLoading.next(true);
 }

 idle() {
  this.busyRequestCount--;
  if (this.busyRequestCount <= 0) {
    this.busyRequestCount = 0;
    this.isLoading.next(false);
  }
 }
}