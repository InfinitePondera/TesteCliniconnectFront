import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import {Paciente} from "../models/paciente";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  baseUrl = "http://localhost:8080/pacientes";
  headers = new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getPacientesPaginated(pageTam: number, pageNum: number): Observable<any> {
    const getPageUrl = `${this.baseUrl}/pacientesPaginated`;
    const params = new HttpParams().set('pageNum', pageNum).set('pageTam', pageTam);
    return this.http.get(getPageUrl, {params});
  }

  getPacienteById(id: number): Observable<any> {
    const getPacienteUrl = `${this.baseUrl}/pacientes`;
    const params = new HttpParams().set('id', id);
    return this.http.get(getPacienteUrl, {params});
  }

  getPacientesSearch(searchString: string): Observable<any> {
    const getPacienteSearchUrl = `${this.baseUrl}/busca`;
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get(getPacienteSearchUrl, {params});
  }

  postPaciente(paciente: Paciente): Observable<any> {
    const postPacienteUrl = `${this.baseUrl}`;
    return this.http.post(postPacienteUrl, paciente);
  }

  putPaciente(paciente: Paciente): Observable<any> {
    const putPacienteUrl = `${this.baseUrl}`;
    return this.http.put(putPacienteUrl, paciente);
  }

  deletePaciente(id: number): Observable<any> {
    const deletePacienteUrl = `${this.baseUrl}`;
    const params = new HttpParams().set('id', id);
    return this.http.delete(deletePacienteUrl, {params});
  }
}
