import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, ModalController, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Producto, ProductoService } from '../services/producto';
import { Categoria, CategoriaService } from '../services/categoria';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, ReactiveFormsModule,
    IonButtons, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
  ]
})
export class AgregarProductoPage implements OnInit {

  @Input() producto?: Producto;

  categorias: Categoria[] | undefined;

  edit = false;

  form: FormGroup;

  constructor(
    private service: ProductoService,
    private categoriaService: CategoriaService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.form = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      categoria_id: new FormControl(null, [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      descripcion: new FormControl('', []),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  validation_messages = {
    'categoria': [
      { type: 'required', message: 'Seleccione una categoria'}
    ],
    'nombre': [
      { type: 'required', message: 'Escriba nombre.' },
      { type: 'minlength', message: 'Nombre mínimo de 2 caracteres' }
    ],
    'precio': [
      { type: 'required', message: 'Escriba precio' },
      { type: 'min', message: 'Precio no puede ser negativo' }
    ],
    'stock': [
      { type: 'required', message: 'Escriba stock' },
      { type: 'min', message: 'Stock no puede ser negativo' }
    ],
  };

  ngOnInit() {
    this.categoriaService.ObtenerTodos().subscribe(
      response=>{
        this.categorias=response;
      }
    )
    if (this.producto) {
      this.edit = true;
      this.form.patchValue(this.producto);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    const data = this.form.value;

    if (this.edit && this.producto) {
      this.service.Actualizar(data, this.producto.producto_id).subscribe(actualizado => {
        this.modalCtrl.dismiss(actualizado, 'editado');
      });
    } else {
      this.service.Agregar(data).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
      });
    }
  }
}
