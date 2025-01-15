import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    HttpClientModule, 
  ],
})
export class EstudiantesModule {}
