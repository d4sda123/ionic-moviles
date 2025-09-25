import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, ModalController, IonInput } from '@ionic/angular/standalone';
import { Cliente, ClienteService } from '../services/cliente';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, ReactiveFormsModule,
    IonButtons, IonButton, IonItem, IonLabel, IonInput
  ]
})
export class AgregarPage implements OnInit {

  @Input() cliente?: Cliente;   // ya admite undefined

  edit = false;

  registrarForm: FormGroup;

  constructor(
    private service: ClienteService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.minLength(5)]),
      ruc_dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
      ])
    });
  }

  validation_messages = {
    'nombres': [
      { type: 'required', message: 'Escriba Nombre.' },
      { type: 'minlength', message: 'Nombre mínimo de 5 caracteres' }
    ],
    'ruc_dni': [
      { type: 'required', message: 'Escriba RUC/DNI' },
      { type: 'maxlength', message: 'RUC/DNI debe tener máximo 8 caracteres' }
    ],
    'direccion': [
      { type: 'required', message: 'Escriba dirección' },
      { type: 'maxlength', message: 'No puede escribir más de 100 caracteres' }
    ],
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'Formato de correo inválido' }
    ],
  };

  ngOnInit() {
    if (this.cliente) {
      this.edit = true;
      // Cargar datos en el formulario
      this.registrarForm.patchValue(this.cliente);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    const formData = this.registrarForm.value;

    if (this.edit && this.cliente) {
      // Editar cliente existente
      this.service.Actualizar(formData, this.cliente.cliente_id).subscribe(actualizado => {
        this.modalCtrl.dismiss(actualizado, 'editado');
      });
    } else {
      // Crear nuevo cliente
      this.service.Agregar(formData).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
