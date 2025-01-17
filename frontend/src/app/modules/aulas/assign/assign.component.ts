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
  aulasDisponibles: string[] = []; // Lista de aulas disponibles
  mensajeEstudiante: string = '';
  asignarHabilitado: boolean = false; // Controlar la habilitación de los campos y botón

  constructor(
    private aulasService: AulasService,
    private docentesService: DocentesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocentes();
    this.loadAulas();
  }

  loadDocentes(): void {
    this.docentesService.getAllDocentes().subscribe((data) => {
      this.docentes = data;
    });
  }

  loadAulas(): void {
    this.aulasDisponibles = ['Aula 1', 'Aula 2', 'Aula 3', 'Aula 4']; // Aulas disponibles (puedes adaptarlo)
  }

  verificarEstudiante(): void {
    if (!this.aula.dni_estudiante.trim()) {
      this.mensajeEstudiante = 'Debe ingresar un DNI.';
      this.estudiante = null;
      this.asignarHabilitado = false;
      return;
    }

    // Verificar si el estudiante tiene aula asignada
    this.aulasService.getAulaByDni(this.aula.dni_estudiante).subscribe(
      (aula: any) => {
        // Si el estudiante ya tiene aula
        this.estudiante = { nombres: aula.nombres, apellidos: aula.apellidos };
        this.mensajeEstudiante = `El estudiante ya tiene asignada el aula: ${aula.aula}, turno: ${aula.turno}.`;
        this.asignarHabilitado = false; // Deshabilitar campos y botón
      },
      (error: any) => {
        if (error.status === 404) {
          // Si el estudiante no tiene aula, verificar existencia
          this.aulasService
            .getEstudianteByDni(this.aula.dni_estudiante)
            .subscribe(
              (estudiante: any) => {
                this.estudiante = estudiante; // Mostrar información del estudiante
                this.mensajeEstudiante =
                  'El estudiante está disponible para asignar aula.';
                this.asignarHabilitado = true; // Habilitar campos y botón
              },
              (err: any) => {
                this.mensajeEstudiante = 'El estudiante no existe.';
                this.estudiante = null;
                this.asignarHabilitado = false; // Deshabilitar campos y botón
              }
            );
        }
      }
    );
  }

  asignarAula(): void {
    if (!this.asignarHabilitado) {
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

  volver(): void {
    this.router.navigate(['/aulas']); // Navegar a la lista de aulas
  }
}
