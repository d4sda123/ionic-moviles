import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonMenuButton, ModalController, AlertController } from '@ionic/angular/standalone';
import { Producto, ProductoService } from '../services/producto';
import { AgregarProductoPage } from '../agregar-producto/agregar-producto.page';
import { addIcons } from 'ionicons';
import { addOutline, create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonMenuButton, CommonModule]
})
export class ProductosPage {
  productos: Producto[] | undefined;

  constructor(private service: ProductoService, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    addIcons({ 'add-outline': addOutline, 'create': create, 'trash': trash });
  }

  ionViewWillEnter() {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.service.obtenerTodos().subscribe(response => {
      this.productos = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarProductoPage
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.role === 'creado') {
        this.productos = [...(this.productos || []), result.data];
      }
    });

    await modal.present();
  }

  editar(producto: Producto) {
    this.modalCtrl.create({
      component: AgregarProductoPage,
      componentProps: { producto }
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'editado' && data) {
          this.productos = this.productos?.map(p =>
            p.producto_id === data.producto_id ? data : p
          );
        }
      });
  }

  eliminar(producto_id: number) {
    this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar el producto con ID ${producto_id}?`,
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            const productosOriginal = [...(this.productos || [])];
            this.productos = this.productos?.filter(c => c.producto_id !== producto_id);
            this.service.Borrar(producto_id).subscribe({
              next: () => {},
              error: () => {
                this.productos = productosOriginal;
              }
            });
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(alertEl => alertEl.present());
  }
}
