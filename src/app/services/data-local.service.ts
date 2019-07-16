import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../pages/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);

    }

    this.presentToast('Añadido a favoritos');
  }

  async cargarFavoritos() {
//    this.storage.get('favoritos')
//     .then( fav => {
//        console.log('favoritos', fav);
//      });
    const favoritos = await this.storage.get('favoritos');
    console.log('await async', favoritos);

    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);

    this.presentToast('Borrado de favoritos');

  }


}
