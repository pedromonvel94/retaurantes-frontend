import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedComponent } from './pages/shared/shared.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirecciona a 'home' por defecto
  { path: 'home', component: HomeComponent },
  { path: 'shared', component: SharedComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: 'home' }, // Ruta comodín para páginas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
