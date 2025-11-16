import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'https://localhost:7062/';
  private myApiUrl = 'api/tarjeta/'

  constructor(private http: HttpClient) { }

  getListTarjetas(): Observable<any[]> {
    return this.http.get<any[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjetas(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.myAppUrl + this.myApiUrl + id);
  }
  
  saveTarjetas(tarjeta: any): Observable<any> {
    // Enviar 'tarjeta' como body, no concatenarlo en la URL
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjetas(id: number, tarjeta: any): Observable<any> {
    return this.http.put<any>(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }

}
