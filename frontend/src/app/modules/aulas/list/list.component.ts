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
      this.aulas = data;
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
}
