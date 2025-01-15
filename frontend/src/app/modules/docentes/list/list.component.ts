import { Component, OnInit } from '@angular/core';
import { DocentesService } from '../docentes.service';
import { Router } from '@angular/router';

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
      this.docentes = data.map((doc: any) => ({ ...doc, editing: false }));
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

  editDocente(docente: any): void {
    docente.editing = true;
  }

  saveDocente(docente: any): void {
    this.docentesService.updateDocente(docente.id_docente, docente).subscribe(
      () => {
        docente.editing = false;
        alert('Docente actualizado con éxito.');
      },
      (error) => {
        alert('Error al actualizar docente.');
      }
    );
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

  onFileSelected(event: any, docente: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('hoja_vida', file);

      this.docentesService
        .uploadHojaDeVida(docente.id_docente, formData)
        .subscribe(
          (response) => {
            alert('Hoja de vida subida con éxito.');
            docente.hoja_vida = response.fileName;
          },
          (error) => {
            alert('Error al subir la hoja de vida.');
          }
        );
    }
  }

  // Función para redirigir al formulario de registro
  registrarDocente(): void {
    this.router.navigate(['/docentes/add']); // Ruta al formulario de registro
  }

  // Función para redirigir al inicio
  irInicio(): void {
    this.router.navigate(['/auth/home']); // Redirige a auth/home
  }
}
