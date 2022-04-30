/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ExcelJsUtilsService } from './excel-js-utils.service';

describe('Service: ExcelJsUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelJsUtilsService]
    });
  });

  it('should ...', inject([ExcelJsUtilsService], (service: ExcelJsUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
