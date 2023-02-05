import { TestBed } from '@angular/core/testing';

import { SpecialistRegisterService } from './specialist-register.service';

describe('SpecialistRegisterService', () => {
  let service: SpecialistRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
