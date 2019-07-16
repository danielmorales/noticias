import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey2;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  HeadLinescategorias = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {

    // this.headlinesPage = this.headlinesPage + 1;
    this.headlinesPage++;
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a5c0adbcd0e94258a62e6d497f99d036`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadLinescategorias(categoria: string) {

    this.HeadLinescategorias++;

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
