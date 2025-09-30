import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RegistroPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private alertCtrl: AlertController, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    this.auth.registrar(email, password).subscribe({
      next: async (resp) => {
        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
          buttons: ['Aceptar']
        });
        await alert.present();
        this.router.navigateByUrl('/login');
      },
      error: async (err) => {
        const msg = err?.error?.message || err?.error?.error || 'No se pudo completar el registro';
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: msg,
          buttons: ['Cerrar']
        });
        await alert.present();
      }
    });
  }
}
