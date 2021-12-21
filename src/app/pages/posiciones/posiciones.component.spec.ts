import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionesComponent } from './posiciones.component';

describe('PosicionesComponent', () => {
  let component: PosicionesComponent;
  let fixture: ComponentFixture<PosicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
