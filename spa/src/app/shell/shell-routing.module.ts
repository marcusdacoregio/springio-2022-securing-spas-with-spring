import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComposeComponent } from '../email-compose/email-compose.component';
import { EmailViewComponent } from '../email-view/email-view.component';
import { InboxComponent } from '../inbox/inbox.component';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'inbox/:id',
        component: EmailViewComponent
      },
      {
        path: 'inbox',
        component: InboxComponent
      },
      {
        path: 'compose',
        component: EmailComposeComponent
      },
      {
        path: '',
        redirectTo: '/app/inbox',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
