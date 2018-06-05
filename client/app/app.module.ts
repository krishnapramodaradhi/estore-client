import { SharedModule } from "./shared/shared.module";
import { UserService } from "./services/user.service";
import { AuthGuard } from "./guards/auth.guard";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./common/navbar/navbar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavbarSecondaryComponent } from "./common/navbar/navbar-secondary/navbar-secondary.component";
import { LoginComponent } from "./common/login/login.component";
import { RegisterComponent } from "./common/register/register.component";
import { ProductService } from "./services/product.service";
import { Wa18396InterceptorService } from './services/wa18396-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarSecondaryComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [NavbarComponent],
  providers: [AuthGuard, UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
