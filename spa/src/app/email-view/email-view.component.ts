import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {Email} from '../model/email.model';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styles: [
  ]
})
export class EmailViewComponent implements OnInit {

  email$!: Observable<Email>;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    this.listenToIdChanges();
  }

  ngOnInit(): void {
  }

  private listenToIdChanges(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.email$ = this.http.get<Email>(`/email/${id}`).pipe(catchError((err) => {
        alert('Not found');
        this.router.navigateByUrl('/app/inbox')
        return throwError(() => err)
      }))
    });
  }

}
