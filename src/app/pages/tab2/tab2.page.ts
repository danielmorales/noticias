import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0]; // para que por defecto este la primera categoria como seleccionada
    this.cargarNoticias(this.segment.value);
  }

  loadData( event ) {
    console.log('aqui se ocupa el loadData()');
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event? ) {

    this.noticiasService.getTopHeadLinescategorias(categoria)
        .subscribe(resp => {
          console.log('noticias de categoria: ' + categoria, resp);
          // cuando se llega al final de una categoria se setea como true
          // entonces al cambiar de categoria ya se encuentra desactivado y solo carga 20
          // por lo tanto cada vez que se ingresa se setea como falso
          // event.target.disabled = false;
          this.infiniteScroll.disabled = false;

          if (resp.articles.length === 0) {
            event.target.disabled = true;
            console.log('largo del arreglo igual a 0, se dispara el complete');
            return event.target.complete();
          }

          this.noticias.push(...resp.articles);

          if (event) {
            console.log('Se entra al if');
            event.target.complete();
          }

        });
  }

  cambioCategoria( event ) {
    this.noticias = [];
   // Al cambiar de categoria solo carga las primeras 20 noticias porque se activa event.target.complete()
   // Hay que reparar esta logica
    console.log('cambio de categoria a: ', event.detail.value);
    this.cargarNoticias(event.detail.value);
  }

}
