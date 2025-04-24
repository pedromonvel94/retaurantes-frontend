import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedComponent } from './pages/shared/shared.component';
import { FormComponent } from './pages/form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './component/footer/footer.component';
import { NarvarComponent } from './component/narvar/narvar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SharedComponent, FormComponent, FooterComponent, NarvarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
