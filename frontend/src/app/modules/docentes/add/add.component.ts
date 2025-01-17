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
    const file = event.target.files[0];
    if (file) {
      this.docente.hoja_vida = file;
    }
  }

  registrarDocente(): void {
    const formData = new FormData();
    formData.append('nombres', this.docente.nombres);
    formData.append('apellidos', this.docente.apellidos);
    formData.append('dni', this.docente.dni);
    formData.append('curso', this.docente.curso);
    formData.append('turno', this.docente.turno);
    if (this.docente.hoja_vida) {
      formData.append('hoja_vida', this.docente.hoja_vida);
    }

    this.docentesService.createDocente(formData).subscribe(
      (response) => {
        alert('Docente registrado con éxito.');
        this.router.navigate(['/docentes']); // Redirigir a gestión de docentes
      },
      (error) => {
        alert('Error al registrar docente. Por favor, verifique los campos.');
        console.error('Error al registrar docente:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/docentes']); // Redirigir a gestión de docentes
  }

  isFormValid(): boolean {
    return (
      this.docente.nombres.trim() !== '' &&
      this.docente.apellidos.trim() !== '' &&
      this.docente.dni.trim().length === 8 &&
      this.docente.curso !== '' &&
      this.docente.turno !== ''
    );
  }
}
