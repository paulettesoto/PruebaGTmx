import { Routes } from '@angular/router';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
export const routes: Routes = [
    { path: '', redirectTo:'/home', pathMatch: 'full'},
    {path:'home', component:EmployeesFormComponent},
    {path:'list', component:EmployeesListComponent},

];
