import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AutoLoginGuard} from "./auto-login.guard";

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      canLoad: [AutoLoginGuard]
    },
    {
      path: 'app',
      loadChildren: () => import('./shell/shell.module').then(m => m.ShellModule)
    },
    {
      path: '**',
      redirectTo: '/app/inbox',
      pathMatch: 'full',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
