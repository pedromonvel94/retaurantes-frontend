import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FormComponent } from './pages/form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './component/card/card.component';
import { HeroComponent } from './component/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FormComponent,
    FooterComponent,
    NavbarComponent,
    CardComponent,
    HeroComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,  ReactiveFormsModule,
    HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
