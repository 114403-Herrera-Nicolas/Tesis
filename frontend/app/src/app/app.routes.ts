import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { CabinListComponent } from './cabin-list/cabin-list.component';
import { SearchCabinPageComponent } from './pages/search-cabin-page/search-cabin-page.component';
import { CreateCabinComponent } from './create-cabin/create-cabin.component';
import { CabinDetailComponent } from './cabin-detail/cabin-detail.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { UpdateCabinComponent } from './update-cabin/update-cabin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentErrorComponent } from './pages/payment-error/payment-error.component';
import { PaymentPendingComponent } from './pages/payment-pending/payment-pending.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ReservationsForCabinComponent } from './pages/reporting/ReservationsForCabin/ReservationsForCabin.component';
import { ReportByUserComponent } from './pages/reporting/report-by-user/report-by-user.component';
import { ReportByYearComponent } from './pages/reporting/report-by-year/report-by-year.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { FaqComponent } from './pages/faq/faq.component';
import { validatorLoginGuard } from './guards/validator-login.guard';
import { validatorAdminGuard } from './guards/validator-admin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterUserComponent},
    {path:"",redirectTo:"cabins",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"cabins",component:SearchCabinPageComponent},
    {path:"cabin/:id",component:CabinDetailComponent},
    {path:"reservation",component:CreateReservationComponent,canActivate:[validatorLoginGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[validatorLoginGuard]},
    {path:"success/:id",component:PaymentSuccessComponent,canActivate:[validatorLoginGuard]},
    {path:"error/:id",component:PaymentErrorComponent,canActivate:[validatorLoginGuard]},
    {path:"pending/:id",component:PaymentPendingComponent,canActivate:[validatorLoginGuard]},
    {path:"terms",component:TermsAndConditionsComponent},
    {path:"faq",component:FaqComponent},
    {path:"reports",component:ReportingComponent, canActivate:[validatorAdminGuard],
    children:[
      {path:"cabin",component:ReservationsForCabinComponent},
      {path:"user",component:ReportByUserComponent},
      {path:"year",component:ReportByYearComponent},
      {path:"cabin/create",component:CreateCabinComponent},
      {path:"cabin-update/:id",component:UpdateCabinComponent},
    ]
    },
    {path:"forbidden",component:ForbiddenComponent}
];
