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
      this.aulas = data.map((aula) => ({
        ...aula,
        estudiante: `${aula.nombres} ${aula.apellidos}`, // Concatenar nombres y apellidos del estudiante
        estudiante_dni: aula.estudiante_dni, // DNI del estudiante
        docente: aula.docente, // Nombre del docente
      }));
    });
  }

  // Función para buscar aulas por DNI del estudiante
  buscarPorDni(): void {
    if (this.searchDni.trim() === '') {
      // Si el campo está vacío, recargar todas las aulas
      this.loadAulas();
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
    if (!aula.id_estudiante || !aula.id_docente) {
      alert('El estudiante o el docente no pueden estar vacíos.');
      return;
    }

    this.aulasService.updateAula(aula.id_aula, aula).subscribe(
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
