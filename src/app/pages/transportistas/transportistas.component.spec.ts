import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportistasComponent } from './transportistas.component';

describe('TransportistasComponent', () => {
  let component: TransportistasComponent;
  let fixture: ComponentFixture<TransportistasComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
