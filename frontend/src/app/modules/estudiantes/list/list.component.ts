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
  originalEstudiante: any = null; // Almacena una copia del estudiante original

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

  loadAllEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((data: any[]) => {
      this.estudiantes = data.map((est: any) => ({ ...est, editing: false }));
    });
  }

  ngOnInit(): void {
    this.loadAllEstudiantes();
    this.loadCarreras();
  }

  buscarPorDni(): void {
    if (this.searchDni.trim() === '') {
      alert('Por favor, ingrese un DNI para realizar la búsqueda.');
      return;
    }

    if (this.searchDni.length !== 8 || isNaN(Number(this.searchDni))) {
      alert('El DNI debe contener exactamente 8 dígitos numéricos.');
      return;
    }

    this.estudiantesService.getEstudianteByDni(this.searchDni).subscribe(
      (data) => {
        this.estudiantes = [data];
        this.loadCarreras();
        alert('Alumno encontrado');
      },
      (error) => {
        if (error.status === 404) {
          alert('Alumno no encontrado');
        } else {
          alert('Error al buscar el estudiante');
        }
        this.loadAllEstudiantes();
      }
    );
  }

  editEstudiante(estudiante: any): void {
    this.originalEstudiante = { ...estudiante }; // Clonar el estado inicial
    estudiante.editing = true;
  }

  saveEstudiante(estudiante: any): void {
    const { id_estudiante, ...currentData } = estudiante; // Excluir ID para comparación
    const { id_estudiante: idOriginal, ...originalData } =
      this.originalEstudiante;

    // Comprobar si hay diferencias entre los datos actuales y los originales
    if (JSON.stringify(currentData) === JSON.stringify(originalData)) {
      alert('No se registraron cambios en el estudiante.');
      estudiante.editing = false; // Salir del modo de edición sin cambios
      return;
    }

    this.estudiantesService
      .updateEstudiante(id_estudiante, estudiante)
      .subscribe(
        () => {
          estudiante.editing = false;
          this.originalEstudiante = null; // Restablecer los datos originales
          alert('Estudiante actualizado con éxito.');
        },
        (error) => {
          alert('Error al actualizar estudiante.');
        }
      );
  }

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

  onDniInput(): void {
    if (this.searchDni.trim() === '') {
      this.loadAllEstudiantes();
    }
  }
}
