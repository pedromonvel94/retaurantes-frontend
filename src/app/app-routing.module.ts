import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirecciona a 'home' por defecto
  { path: 'home', component: HomeComponent },
  { path: 'shared', component: SearchComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: 'home' }, // Ruta comodín para páginas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
