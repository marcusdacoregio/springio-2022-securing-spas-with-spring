import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable, take} from 'rxjs';

import {map} from 'rxjs/operators';
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {

    constructor(private router: Router, private authService: AuthenticationService) {}

    canLoad(): Observable<boolean> {
        return this.authService.isAuthenticated.pipe(
            take(1),
            map((isAuthenticated) => {
                if (isAuthenticated) {
                    this.router.navigateByUrl('/app/inbox', { replaceUrl: true });
                    return false;
                }
                return true;
            })
        );
    }

}
