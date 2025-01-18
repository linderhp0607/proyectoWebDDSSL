import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  estudiantes: any[] = [];
  carreras: string[] = [];
  searchDni: string = ''; // Para almacenar el DNI ingresado

  constructor(private estudiantesService: EstudiantesService) {}

  loadCarreras(): void {
    this.estudiantesService.getCarreras().subscribe(
      (data) => {
        this.carreras = data.map((carrera) => carrera.carrera_profesional);
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );
  }

  // Cargar todos los estudiantes
  loadAllEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((data: any[]) => {
      this.estudiantes = data.map((est: any) => ({ ...est, editing: false }));
    });
  }

  ngOnInit(): void {
    this.loadAllEstudiantes();
    this.loadCarreras();
  }
  
  // Buscar estudiante por DNI
  buscarPorDni(): void {
    if (this.searchDni.trim() === '') {
      // Si el campo está vacío, recargar todos los estudiantes
      this.loadAllEstudiantes();
      return;
    }

    if (this.searchDni.length !== 8) {
      // No realizar la búsqueda si el DNI no tiene 8 dígitos
      return;
    }

    this.estudiantesService.getEstudianteByDni(this.searchDni).subscribe(
      (data) => {
        this.estudiantes = [data];
        alert('Alumno encontrado');
      },
      (error) => {
        if (error.status === 404) {
          alert('Alumno no encontrado');
        } else {
          alert('Error al buscar el estudiante');
        }
        this.loadAllEstudiantes(); // Recargar la lista completa en caso de error
      }
    );
  }

  // Habilitar edición de estudiante
  editEstudiante(estudiante: any): void {
    estudiante.editing = true;
  }

  // Guardar cambios del estudiante
  saveEstudiante(estudiante: any): void {
    this.estudiantesService
      .updateEstudiante(estudiante.id_estudiante, estudiante)
      .subscribe(
        () => {
          estudiante.editing = false;
          alert('Estudiante actualizado con éxito.');
        },
        (error) => {
          alert('Error al actualizar estudiante.');
        }
      );
  }

  // Eliminar estudiante
  deleteEstudiante(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.estudiantesService.deleteEstudiante(id).subscribe(
        () => {
          this.estudiantes = this.estudiantes.filter(
            (est) => est.id_estudiante !== id
          );
          alert('Estudiante eliminado con éxito.');
        },
        (error) => {
          alert('Error al eliminar estudiante.');
        }
      );
    }
  }
}
