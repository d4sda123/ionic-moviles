import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

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
    'email' : [
      {type: 'required', message: 'Escribir correo'},
      {type: 'pattern', message: 'No es un formato de correo'}
    ],
    'password': [
      {type: 'required', message: 'Escriba su password'},
    ]
  }

  constructor(private router:Router, private authService:AuthService, public alertController:AlertController, public navCtrl:NavController, public formBuilder:FormBuilder) {
    this.formLogin = this.createFormGroup();
  }

  ngOnInit() {}
  
  // TODO: acabarlo
}
