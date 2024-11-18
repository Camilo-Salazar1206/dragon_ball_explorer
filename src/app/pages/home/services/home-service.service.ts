import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFCharacters } from '../models/home.models';
import { endpoints } from '../enums/endpoints';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getAllCharacters(limit: number): Observable<IFCharacters> {
    return this.http.get<IFCharacters>(`${endpoints.BASE_URL}/${endpoints.CHARACTERS}?limit=${limit}`);
}

getCharacterByName(name:string | null):Observable<IFCharacters>{
  return this.http.get<IFCharacters>(`${endpoints.BASE_URL}/${endpoints.CHARACTERS}?name=${name}`)
}

getCharactersByPage(page: number, limit: number | null): Observable<IFCharacters> {
  const url = `${endpoints.BASE_URL}/${endpoints.CHARACTERS}?page=${page}&limit=${limit || ''}`;
  return this.http.get<IFCharacters>(url);
}




}
