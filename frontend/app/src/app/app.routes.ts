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

export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterUserComponent},
    {path:"",redirectTo:"cabins",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"cabins",component:SearchCabinPageComponent},
    {path:"cabin/create",component:CreateCabinComponent},
    {path:"cabin/:id",component:CabinDetailComponent},
    {path:"cabin-update/:id",component:UpdateCabinComponent},
    {path:"reservation",component:CreateReservationComponent},
    {path:"profile",component:ProfileComponent},
    {path:"success/:id",component:PaymentSuccessComponent},
    {path:"error/:id",component:PaymentErrorComponent},
    {path:"pending/:id",component:PaymentPendingComponent},
    {path:"reports",component:ReportingComponent},
];
