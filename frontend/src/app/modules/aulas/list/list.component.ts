import { Component, OnInit } from '@angular/core';
import { AulasService } from '../aulas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  aulas: any[] = [];

  constructor(private aulasService: AulasService) {}

  ngOnInit(): void {
    this.loadAulas();
  }

  loadAulas(): void {
    this.aulasService.getAllAulas().subscribe((data) => {
      this.aulas = data; // Asegúrate de que los nombres de las propiedades coincidan
    });
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
    aula.editing = true; // Habilitar el modo de edición
  }

  saveAula(aula: any): void {
    this.aulasService.updateAula(aula.id_aula, aula).subscribe(
      () => {
        aula.editing = false; // Salir del modo de edición
        this.loadAulas(); // Recargar la lista de aulas
        alert('Aula actualizada con éxito.');
      },
      (error) => {
        alert('Error al actualizar aula.');
        console.error(error);
      }
    );
  }
}
