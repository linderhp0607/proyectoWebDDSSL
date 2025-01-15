import { Component } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  estudiante = {
    nombres: '',
    apellidos: '',
    dni: '',
    modalidad: 'ordinario',
    carrera_profesional: 'educación',
    turno: 'mañana',
  };

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router
  ) {}

  registrarEstudiante(): void {
    this.estudiantesService.createEstudiante(this.estudiante).subscribe(
      () => {
        alert('Estudiante registrado con éxito.');
        this.router.navigate(['/estudiantes']);
      },
      (error) => {
        alert('Error al registrar estudiante. Verifique los campos.');
      }
    );
  }
}
