import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateComponent } from './cards.component';

describe('DirectorateComponent', () => {
  let component: DirectorateComponent;
  let fixture: ComponentFixture<DirectorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
