import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styles: [
  ]
})
export class EmailComposeComponent implements OnInit {

  emailForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      to: this.fb.control(null, Validators.required),
      subject: this.fb.control(null, Validators.required),
      content: this.fb.control(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  sendEmail(): void {
    if (!this.emailForm.valid) {
      alert('Please fill out all fields');
      return;
    }
    const sendEmail = this.emailForm.value;
    this.http.post('/email/send', sendEmail).subscribe(() => {
      this.router.navigateByUrl('/app/inbox');
    });
  }

}
