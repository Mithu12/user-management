import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {UserUpdateComponent} from './user-update/user-update.component';
import {TextInputComponentComponent} from './text-input-component/text-input-component.component';
import {UserDetailsComponent} from './user-details/user-details.component';

const routes: Routes = [
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user/add', component: AddUserComponent},
  {path: 'user/list', component: AllUsersComponent},
  {path: 'user/update/:id', component: UserUpdateComponent},
  {path: 'user/details/:id', component: UserDetailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}

export const routingComponents = [
  LoginComponent, AddUserComponent, NotFoundComponent, AllUsersComponent, UserUpdateComponent, UserDetailsComponent,
  TextInputComponentComponent,
]
