import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _showNavbar = true;

  get showNavbar(): boolean {
    return this._showNavbar;
  }

  set showNavbar(value: boolean) {
    this._showNavbar = value;
  }
}
