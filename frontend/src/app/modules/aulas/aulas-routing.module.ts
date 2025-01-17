import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AssignComponent } from './assign/assign.component';

const routes: Routes = [
  { path: '', component: ListComponent }, // Ruta para listar aulas
  { path: 'assign', component: AssignComponent }, // Ruta para asignar aulas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulasRoutingModule {}
