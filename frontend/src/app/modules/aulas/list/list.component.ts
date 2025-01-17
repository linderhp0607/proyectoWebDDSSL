import { Component, OnInit } from '@angular/core';
import { AulasService } from '../aulas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  aulas: any[] = [];
  searchDni: string = ''; // Variable para el buscador

  constructor(private aulasService: AulasService, private router: Router) {}

  ngOnInit(): void {
    this.loadAulas();
  }

  loadAulas(): void {
    this.aulasService.getAllAulas().subscribe((data) => {
      console.log('Datos recibidos del backend:', data);
      this.aulas = data.map((aula) => ({
        ...aula,
        estudiante: aula.estudiante || 'Sin asignar',
        estudiante_dni: aula.estudiante_dni || 'N/A',
        docente: aula.docente || 'Sin asignar',
      }));
    });
  }

  // Función para buscar aulas por DNI del estudiante
  buscarPorDni(): void {
    if (this.searchDni.trim() === '') {
      this.loadAulas(); // Recargar todas las aulas si el campo está vacío
      return;
    }

    if (this.searchDni.trim().length === 8) {
      this.aulasService.getAulaByDni(this.searchDni).subscribe(
        (aula) => {
          this.aulas = [aula]; // Mostrar solo el aula encontrada
        },
        (error) => {
          if (error.status === 404) {
            alert('No se encontró un aula asignada para este estudiante.');
            this.loadAulas(); // Recargar todas las aulas si no se encuentra resultado
          } else {
            console.error('Error al buscar aula:', error);
          }
        }
      );
    } else {
      alert('El DNI debe tener 8 dígitos.');
    }
  }

  deleteAula(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta aula?')) {
      this.aulasService.deleteAula(id).subscribe(() => {
        this.aulas = this.aulas.filter((aula) => aula.id_aula !== id);
        alert('Aula eliminada con éxito.');
      });
    }
  }

  editAula(aula: any): void {
    aula.editing = true; // Habilitar el modo edición
  }

  saveAula(aula: any): void {
    if (!aula.id_estudiante || !aula.id_docente || !aula.aula || !aula.turno) {
      alert('Todos los campos deben estar completos antes de guardar.');
      return;
    }

    this.aulasService
      .updateAula(aula.id_aula, {
        id_estudiante: aula.id_estudiante,
        id_docente: aula.id_docente,
        aula: aula.aula,
        turno: aula.turno,
      })
      .subscribe(
        () => {
          aula.editing = false; // Salir del modo edición
          alert('Aula actualizada con éxito.');
          this.loadAulas(); // Recargar listado
        },
        (error) => {
          alert('Error al actualizar aula.');
          console.error(error);
        }
      );
  }

  // Redirigir al módulo principal
  irInicio(): void {
    this.router.navigate(['/auth/home']); // Ajustar la ruta correcta
  }
}
