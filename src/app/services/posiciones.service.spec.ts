import { TestBed } from '@angular/core/testing';

import { PosicionesService } from './posiciones.service';

describe('PosicionesService', () => {
  let service: PosicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
