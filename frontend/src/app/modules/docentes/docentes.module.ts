import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentesRoutingModule } from './docentes-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    DocentesRoutingModule,
    HttpClientModule,
    FormsModule, // Añadir FormsModule aquí
  ],
})
export class DocentesModule {}
