import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
