import { Component } from '@angular/core';
import { DocentesService } from '../docentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  docente: any = {
    nombres: '',
    apellidos: '',
    dni: '',
    curso: '',
    turno: '',
  };
  selectedFile: File | null = null;

  constructor(
    private docentesService: DocentesService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  registrarDocente(): void {
    if (
      !this.docente.nombres ||
      !this.docente.apellidos ||
      !this.docente.dni ||
      !this.docente.curso ||
      !this.docente.turno ||
      !this.selectedFile
    ) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombres', this.docente.nombres);
    formData.append('apellidos', this.docente.apellidos);
    formData.append('dni', this.docente.dni);
    formData.append('curso', this.docente.curso);
    formData.append('turno', this.docente.turno);
    formData.append('hoja_vida', this.selectedFile);

    this.docentesService.createDocente(formData).subscribe(
      () => {
        alert('Docente registrado con éxito.');
        this.router.navigate(['/docentes']);
      },
      (error) => {
        console.error(error);
        alert('Error al registrar el docente.');
      }
    );
  }
}
