import { Component, OnInit } from '@angular/core';
import { DocentesService } from '../docentes.service'; // Importa correctamente el servicio
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  docentes: any[] = [];
  searchDni: string = '';

  constructor(
    private docentesService: DocentesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllDocentes();
  }

  loadAllDocentes(): void {
    this.docentesService.getAllDocentes().subscribe((data: any[]) => {
      this.docentes = data;
    });
  }

  buscarPorDni(): void {
    if (this.searchDni.trim() === '') {
      this.loadAllDocentes();
      return;
    }

    this.docentesService.getDocenteByDni(this.searchDni).subscribe(
      (data) => {
        this.docentes = [data];
        alert('Docente encontrado');
      },
      (error) => {
        if (error.status === 404) {
          alert('Docente no encontrado');
        } else {
          alert('Error al buscar docente');
        }
        this.loadAllDocentes();
      }
    );
  }

  editDocente(id: number): void {
    this.router.navigate(['/docentes/edit', id]);
  }

  deleteDocente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      this.docentesService.deleteDocente(id).subscribe(
        () => {
          this.docentes = this.docentes.filter((doc) => doc.id_docente !== id);
          alert('Docente eliminado con éxito.');
        },
        (error) => {
          alert('Error al eliminar docente.');
        }
      );
    }
  }
}
