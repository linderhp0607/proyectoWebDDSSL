import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component'; // Importar AddComponent
import { EditComponent } from './edit/edit.component'; // Importar EditComponent
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent, // Declarar AddComponent
    EditComponent, // Declarar EditComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class EstudiantesModule {}
