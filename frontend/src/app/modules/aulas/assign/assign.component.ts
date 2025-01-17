import { Component, OnInit } from '@angular/core';
import { AulasService } from '../aulas.service';
import { DocentesService } from '../../docentes/docentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
})
export class AssignComponent implements OnInit {
  aula: any = {
    dni_estudiante: '',
    id_docente: '',
    aula: '',
    turno: '',
  };
  estudiante: any = null; // Información del estudiante
  docentes: any[] = [];
  mensajeEstudiante: string = '';

  constructor(
    private aulasService: AulasService,
    private docentesService: DocentesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocentes();
  }

  loadDocentes(): void {
    this.docentesService.getAllDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  verificarEstudiante(): void {
    this.aulasService.getEstudianteByDni(this.aula.dni_estudiante).subscribe(
      (estudiante: any) => {
        this.estudiante = estudiante; // Guardar información del estudiante
        this.aula.turno = estudiante.turno; // Asignar turno automáticamente
        this.mensajeEstudiante = ''; // Limpiar mensajes de error
      },
      (error: any) => {
        this.mensajeEstudiante = 'El estudiante no existe.';
        this.estudiante = null; // Limpiar información previa
      }
    );
  }

  asignarAula(): void {
    if (!this.estudiante) {
      alert('Debe verificar un estudiante antes de asignar un aula.');
      return;
    }

    const aulaData = {
      id_estudiante: this.estudiante.id_estudiante,
      id_docente: this.aula.id_docente,
      aula: this.aula.aula,
      turno: this.aula.turno,
    };

    this.aulasService.assignAula(aulaData).subscribe(
      () => {
        alert('Aula asignada con éxito.');
        this.router.navigate(['/aulas']);
      },
      (error) => {
        alert('Error al asignar aula.');
        console.error(error);
      }
    );
  }
}
