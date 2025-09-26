import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonIcon, ModalController, IonItemOption } from '@ionic/angular/standalone';
import { Cliente, ClienteService } from '../services/cliente';
import { AgregarPage } from '../agregar/agregar.page';

import { addIcons } from 'ionicons';
import { addOutline, create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption]
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] | undefined;

  constructor(private service: ClienteService, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    addIcons({
      'add-outline': addOutline,
      'create': create,
      'trash': trash
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes() {
    this.service.obtenerTodos().subscribe(response => {
      this.clientes = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarPage
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.role === 'creado') {
        this.clientes = [...(this.clientes || []), result.data];
      }
    });

    await modal.present();
  }

  editar(cliente: Cliente) {
    this.modalCtrl.create({
      component: AgregarPage,
      componentProps: { cliente }
    })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'editado' && data) {
          this.clientes = this.clientes?.map(std =>
            std.cliente_id === data.cliente_id ? data : std
          );
        }
      });
  }

  eliminar(cliente_id: number) {
    this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar al cliente con ID ${cliente_id}?`,
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            // Guardar el estado original por si hay que revertir
            const clientesOriginal = [...(this.clientes || [])];

            // Eliminar inmediatamente de la UI
            this.clientes = this.clientes?.filter(c => c.cliente_id !== cliente_id);

            // Hacer la petición al servidor
            this.service.Borrar(cliente_id).subscribe({
              next: () => {
                console.log('Cliente eliminado exitosamente');
                // Ya está eliminado de la UI, no hacer nada más
              },
              error: (err) => {
                console.error('Error eliminando cliente:', err);
                // Revertir el cambio en caso de error
                this.clientes = clientesOriginal;
                // Mostrar mensaje de error al usuario
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

