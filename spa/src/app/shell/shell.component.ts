import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

interface User {
  email: string;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styles: [
  ]
})
export class ShellComponent implements OnInit {

  user$!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.fetchUser();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.http.post<void>('/logout', {}).subscribe(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }

  private fetchUser(): void {
    this.user$ = this.http.get<User>('/user/me');
  }

}
