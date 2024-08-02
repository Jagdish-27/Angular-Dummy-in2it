import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private overlayOpenSubject = new Subject<boolean>();

  overlayOpen$ = this.overlayOpenSubject.asObservable();

  openOverlay(){
    this.overlayOpenSubject.next(true);
  }
  closeOverlay(){
    this.overlayOpenSubject.next(false);
  }
}
