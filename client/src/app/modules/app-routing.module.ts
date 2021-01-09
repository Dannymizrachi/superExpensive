import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminComponent } from '../components/admin/admin.component';
import { RegisterStepTwoComponent } from '../components/register-step-two/register-step-two.component';
import { RegisterStepThreeComponent } from '../components/register-step-three/register-step-three.component';
import { ShippingDetailsComponent } from '../components/shipping-details/shipping-details.component';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'register-step-two', component: RegisterStepTwoComponent },
  { path: 'register-step-three', component: RegisterStepThreeComponent },
  { path: 'shipping-details', component: ShippingDetailsComponent },
  { path: 'thank-you', component: ThankYouComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
