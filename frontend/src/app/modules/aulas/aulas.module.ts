import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulasRoutingModule } from './aulas-routing.module';
import { ListComponent } from './list/list.component';
import { AssignComponent } from './assign/assign.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, AssignComponent],
  imports: [CommonModule, AulasRoutingModule, FormsModule],
})
export class AulasModule {}
