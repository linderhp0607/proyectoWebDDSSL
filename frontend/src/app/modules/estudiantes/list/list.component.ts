import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  estudiantes: any[] = [];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((data) => {
      this.estudiantes = data;
    });
  }
}
