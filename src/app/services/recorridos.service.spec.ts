import { TestBed } from '@angular/core/testing';

import { RecorridosService } from './recorridos.service';

describe('RecorridosService', () => {
  let service: RecorridosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecorridosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
