import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  selectedFileName: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name; // Obtiene el nombre del archivo seleccionado
    } else {
      this.selectedFileName = ''; // Si no hay archivo seleccionado
    }
  }
}
