import { Component } from '@angular/core';
import { AulasService } from '../aulas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assing',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
})
export class AssingComponent {
  aula = {
    id_estudiante: '',
    id_docente: '',
    aula: '',
    turno: '',
  };

  constructor(private aulasService: AulasService, private router: Router) {}

  assignAula(): void {
    this.aulasService.assignAula(this.aula).subscribe(() => {
      alert('Aula asignada con éxito.');
      this.router.navigate(['/aulas']);
    });
  }
}
