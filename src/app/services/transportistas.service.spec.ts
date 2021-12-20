import { TestBed } from '@angular/core/testing';

import { TransportistasService } from './transportistas.service';

describe('TransportistasService', () => {
  let service: TransportistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
