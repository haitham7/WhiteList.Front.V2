import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor() { }

  ngOnInit(): void {
  }
  public isFirstGradient = false;
  public isSecondGradient = false;
   
  FirstGradient() {
    this.isFirstGradient = !this.isFirstGradient;
    if (this.isFirstGradient == true) {
      document.querySelector('.firstgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.firstgradient')?.classList.add('collapsed');
    }
  }
  SecondGradient() {
    this.isSecondGradient = !this.isSecondGradient;
    if (this.isSecondGradient == true) {
      document.querySelector('.secondgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.secondgradient')?.classList.add('collapsed');
    }
  }

  // angular material accordion
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
