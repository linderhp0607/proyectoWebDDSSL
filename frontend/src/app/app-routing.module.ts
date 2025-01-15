import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component'; // Importa el HomeComponent

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./modules/estudiantes/estudiantes.module').then(
        (m) => m.EstudiantesModule
      ),
  },
  {
    path: 'docentes',
    loadChildren: () =>
      import('./modules/docentes/docentes.module').then(
        (m) => m.DocentesModule
      ),
  },
  {
    path: 'aulas',
    loadChildren: () =>
      import('./modules/aulas/aulas.module').then((m) => m.AulasModule),
  },
  { path: 'home', component: HomeComponent }, // Ruta al Home
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
