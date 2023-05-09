import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
class UserToken {}

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  canActivate(currentUser: UserToken, userId: string): boolean {
    console.log('kG pS cA current user token/id: ', currentUser, userId);
    return true;
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}

export const canActivateKanban: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate(inject(UserToken), route.params['id']);

};


// @Injectable({
//   providedIn: 'root'
// })
// export class KanbanGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
