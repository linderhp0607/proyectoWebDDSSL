import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AulasService {
  private baseUrl = 'http://localhost:5000/api/aulas'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getAllAulas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  assignAula(aula: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, aula);
  }

  getEstudianteByDni(dni: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/students/dni/${dni}`);
  }

  getAulaByDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dni/${dni}`);
  }

  updateAula(id: number, aula: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, aula);
  }

  deleteAula(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
