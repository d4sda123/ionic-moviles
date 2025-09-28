import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, // ← AÑADIR ESTA IMPORTACIÓN
  Validators,
} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonItem, IonLabel, IonButton, IonFooter, IonButtons, IonInput, IonCardSubtitle } from '@ionic/angular/standalone'; // ← También agregué IonInput
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    ReactiveFormsModule,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonFooter,
    IonButtons,
    IonInput
  ],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zA-Z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required])
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' }
    ],
    'password': [
      { type: 'required', message: 'Escriba su password' },
    ]
  }

  constructor(private router: Router, private authService: AuthService, public alertController: AlertController, public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.formLogin = this.createFormGroup();
  }

  ngOnInit() { }

  async iniciar() {
    let email = this.formLogin.value.email;
    this.authService.verificarEmail(email!).subscribe(async response => {
      if (response.data) {
        let user = this.formLogin.value.password;
        this.authService.verificarClave(email!, user!).subscribe(async resp => {
            if (resp.data) {
              this.navCtrl.navigateRoot('clientes');
            }
            else {
              const alert = await this.alertController.create({
                header: "Error",
                message: 'Password no Valido',
                buttons: ['Aceptar']
              });
              await alert.present();
            }
          });
      }
      else {
        const alert = await this.alertController.create({
          header: "Error",
          message: 'Correo no Valido',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
