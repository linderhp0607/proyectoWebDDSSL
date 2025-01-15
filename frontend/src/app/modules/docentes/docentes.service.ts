import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {
  private baseUrl = 'http://localhost:5000/api/teachers';

  constructor(private http: HttpClient) {}

  getAllDocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getDocenteByDni(dni: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dni/${dni}`);
  }

  updateDocente(id: number, docente: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, docente);
  }

  deleteDocente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  uploadHojaDeVida(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/upload`, formData);
  }
}
