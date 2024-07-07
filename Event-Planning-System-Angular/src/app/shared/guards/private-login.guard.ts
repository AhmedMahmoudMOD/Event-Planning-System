// import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
// import { AccountService } from '../services/account.service';
// import { inject } from '@angular/core';
// import { EventService } from '../services/event.service';

// export const privateLoginGuard: CanActivateFn = (route, state) => {
//   let accountService = inject(AccountService);
//   let eventservice = inject(EventService);
//   let router = inject(Router);
//   let activerouter = inject(ActivatedRouteSnapshot);
//   let snapshot = inject(ActivatedRouteSnapshot);




//   const expectedId = route.data['expectedId'];
//   let owner = true;
//   let status = true;
//   let linkId = 0;
//   // const userId = accountService.extractUserID();



//   let id = snapshot.paramMap.get('id');
//   if (id !== null) {
//     console.log(id);
//     linkId = +id;
//   }

//   eventservice.getEventById(Number(linkId)).subscribe((res) => {
//     status = res.isPrivate;
//     console.log(res);
//   });

//   // accountService.checkOwnership(Number(linkId), Number(userId)).subscribe((res: boolean) => {
//   //   owner = res;
//   // });

//   if (!status) {
//     router.navigate(['/home']);
//     return false;
//   }

//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateLoginGuard implements CanActivate {
  constructor(private router: Router, private eventservce: EventService, private accountservice: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Accessing the id parameter from the route
    const id = route.paramMap.get('id');
    if (id) {


      let userid = Number(this.accountservice.extractUserID());
      const linkId = +id;
      console.log(userid);
      let owner = false;
      this.accountservice.checkOwnership(linkId, userid).subscribe((res) => {
        owner = res;
      });

      console.log(owner, "before");

      this.eventservce.getEventById(linkId).subscribe((res) => {

        if (res.isPrivate && !owner) {
          this.router.navigate(['/home']);
          return false;
        }
        else {
          return true;
        }
      });

      //console.log(owner, "after");
      //sss
      return true;
    } else {
      this.router.navigate(['/homee']);
      return false;
    }
  }
}