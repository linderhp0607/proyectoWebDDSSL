import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Importa HomeComponent

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // Ruta para la página principal
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
