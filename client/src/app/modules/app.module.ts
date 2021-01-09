import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UserService } from 'src/app/services/UserService';
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsComponent } from '../components/products/products.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminComponent } from '../components/admin/admin.component';
import { RegisterStepTwoComponent } from '../components/register-step-two/register-step-two.component';
import { RegisterStepThreeComponent } from '../components/register-step-three/register-step-three.component';
import { ProductService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ShippingDetailsComponent } from '../components/shipping-details/shipping-details.component';
import { ThankYouComponent } from '../components/thank-you/thank-you.component';
import { CategoryPipe } from '../pipes/category.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
    ProductsComponent,
    RegisterComponent,
    AdminComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
    ShippingDetailsComponent,
    ThankYouComponent,
    CategoryPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    ProductService,
    CartService,
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
