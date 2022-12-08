import { BusyService } from './../../../../core/services/busy.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router , NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as NavigationEvent} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isSpinnerVisible: Subject<boolean> = this.busyService.isLoading;
  @Input() display = false;
  constructor( private router: Router, private busyService:BusyService ) { 
    // this.router.events.subscribe({
    //   next: (event:NavigationEvent) => {
    //     if (event instanceof NavigationStart) {
    //       this.isSpinnerVisible.next(true);
    //     } else if (
    //       event instanceof NavigationEnd ||
    //       event instanceof NavigationCancel ||
    //       event instanceof NavigationError
    //       ){
    //         this.isSpinnerVisible.next(false);
    //     }
    //   },
    //   error: (e) => this.isSpinnerVisible.next(false)
    // })
  }
  ngOnInit(): void {}
  
}
