import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event ) {
    console.log('aqui se ocupa la funcion loadData()');
    this.cargarNoticias(event);
  }

  // Signo de interrogacion es para hacer el argumento opcional, ya que la primera vez que se llama el event no existe
  cargarNoticias(event?) {
    this.noticiasService.getTopHeadLines()
        .subscribe( resp => {
          console.log('noticias', resp);
          // Si el largo del arreglo articles es 0, entonces se cancela el intinite scroll
          if (resp.articles.length === 0) {
            // disable = true hace desaparecer el espacio donde aparece el infinite scroll
            console.log('largo del arreglo igual a 0, se dispara el complete');
            event.target.disabled = true;
            return event.target.complete();
          }
          // Se hace push de los articulos del GET en el arreglo noticias
          // this.noticias = resp.articles;
          this.noticias.push(...resp.articles);

          if (event) {
            console.log('entra al if, se activa el complete');
            event.target.complete();
          }

        });
  }

}
