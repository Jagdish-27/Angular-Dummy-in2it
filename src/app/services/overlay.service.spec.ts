import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
  let service: OverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test open overlay',()=>{
    service.openOverlay();
    expect(service.overlayOpen$).toBeDefined();
  })

  it('should test close overlay',()=>{
    service.closeOverlay();
    expect(service.overlayOpen$).toBeDefined();
  })
});
