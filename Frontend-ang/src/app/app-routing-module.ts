import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Payments } from './payments/payments';
import { Profile } from './profile/profile';
import { Students } from './students/students';
import { LoadStudents } from './load-students/load-students';
import { LoadPayments } from './load-payments/load-payments';
import { Dashboard } from './dashboard/dashboard';
import { AdminTemplate } from './admin-template/admin-template';
import { authorisationGuard } from './guards/authorisation-guard';
import { authenticationGuard } from './guards/authentication-guard';
import { StudentDetails } from './student-details/student-details';
import { NewPayment } from './new-payment/new-payment';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminTemplate,
    children: [
      { path: 'home', component: Home },
      { path: 'login', component: Login },
      { path: 'payments', component: Payments },
      { path: 'profile', component: Profile },
      { path: 'students', component: Students },
      { path: 'student-details/:code', component: StudentDetails },
      { path: 'new-payment/:code', component: NewPayment },
      {
        path: 'loadStudents',
        component: LoadStudents,
        data: { roles: 'ADMIN' },
        canActivate: [authorisationGuard],
      },
      {
        path: 'loadPayments',
        component: LoadPayments,
        data: { roles: 'ADMIN' },
        canActivate: [authorisationGuard],
      },
      { path: 'dashboard', component: Dashboard },
    ],
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
