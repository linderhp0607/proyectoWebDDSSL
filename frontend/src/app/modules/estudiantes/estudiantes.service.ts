import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private baseUrl = 'http://localhost:5000/api/students'; // backend

  constructor(private http: HttpClient) {}

  getAllEstudiantes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCarreras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/carreras`);
  }

  addEstudiante(estudiante: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, estudiante);
  }

  updateEstudiante(id: number, estudiante: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getEstudianteByDni(dni: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dni/${dni}`);
  }

  createEstudiante(estudiante: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, estudiante);
  }
}
