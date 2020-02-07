import { TestBed } from '@angular/core/testing';

import { GeneracionConfiguracionFileService } from './generacion-configuracion-file.service';

describe('GeneracionConfiguracionFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneracionConfiguracionFileService = TestBed.get(GeneracionConfiguracionFileService);
    expect(service).toBeTruthy();
  });
});
