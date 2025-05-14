// taxista.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxistaService {
  private apiUrl = 'http://localhost/php/taxistas/guardar_taxistas.php';

  constructor(private http: HttpClient) { }

  guardarTaxista(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
