import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AulasService {
  private baseUrl = 'http://localhost:5000/api/classrooms'; // Ruta base del backend

  constructor(private http: HttpClient) {}

  // Obtener todas las aulas
  getAllAulas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Asignar una nueva aula
  assignAula(aula: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, aula);
  }

  // Eliminar un aula
  deleteAula(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
