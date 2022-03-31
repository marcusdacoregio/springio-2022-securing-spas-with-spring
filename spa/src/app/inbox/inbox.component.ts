import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Email } from '../model/email.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styles: [
  ]
})
export class InboxComponent implements OnInit {

  emails$!: Observable<Email[]>;

  constructor(private http: HttpClient) {
    this.fetchEmails();
  }

  ngOnInit(): void {
  }

  deleteEmail(email: Email): void {
    this.http.delete<void>(`/email/${email.id}`)
      .pipe(finalize(() => this.fetchEmails()))
      .subscribe({
        error: () => alert('Error')
      })
  }

  private fetchEmails(): void {
    this.emails$ = this.http.get<Email[]>('/email');
  }

}
