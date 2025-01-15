import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {
  private baseUrl = 'http://localhost:5000/api/teachers'; // URL base del backend para docentes

  constructor(private http: HttpClient) {}

  // Obtener todos los docentes
  getAllDocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Obtener un docente por DNI
  getDocenteByDni(dni: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dni/${dni}`);
  }

  // Crear un nuevo docente
  createDocente(docente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, docente);
  }

  // Actualizar un docente
  updateDocente(id: number, docente: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, docente);
  }

  // Eliminar un docente
  deleteDocente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
