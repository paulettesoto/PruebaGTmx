import { Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
export const routes: Routes = [
    { path: '', redirectTo:'/employees-list', pathMatch: 'full'},
    {path:'employees-list', component:EmployeesListComponent},

];
