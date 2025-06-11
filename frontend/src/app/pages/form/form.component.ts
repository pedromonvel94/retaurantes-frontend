import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const API_URL = 'https://findmybite-backend.onrender.com';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formulario: FormGroup;

  datosGuardados: any[] = [];
  currentId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg|gif|bmp|webp))|(^$)')], 
    });
  }

  ngOnInit(): void {
    this.consultarDatos();
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.currentId = null;
  }

  onSubmit() {
    if (this.formulario.valid) {
      const dataToSend = this.formulario.value;

      // Si estamos actualizando un registro, enviamos PUT. Si no, POST.
      if (this.currentId) {
        this.http.put(`${API_URL}/actualizar/${this.currentId}`, dataToSend) 
          .subscribe(
            (res) => {
              console.log('Registro actualizado con éxito:', res);
              this.formulario.reset();
              this.currentId = null; 
              this.consultarDatos(); 
            },
            (err) => {
              console.error('Error al actualizar el registro:', err);
            }
          );
      } else {
        this.http.post(`${API_URL}/guardar`, dataToSend).subscribe( 
          (res) => {
            console.log('Formulario enviado con éxito:', res);
            this.formulario.reset();
            this.consultarDatos(); 
          },
          (err) => {
            console.error('Error al enviar el formulario:', err);
          }
        );
      }
    } else {
      console.log('Formulario no válido');
      this.formulario.markAllAsTouched();
    }
  }

  consultarDatos() {
    this.http.get<any[]>(`${API_URL}/listar`).subscribe(
      (res) => {
        this.datosGuardados = res;
        console.log('Datos recibidos:', res);
      },
      (err) => {
        console.error('Error al consultar los datos:', err);
      }
    );
  }


  eliminarDato(id: number) {
    this.http.delete(`${API_URL}/eliminar/${id}`).subscribe(
      (res) => {
        console.log('Dato eliminado:', res);
        this.consultarDatos();
      },
      (err) => {
        console.error('Error al eliminar dato:', err);
      }
    );
  }

  abrirFormularioActualizar(item: any) {
    this.formulario.patchValue({
      name: item.name,
      description: item.description,
      address: item.address,
      image: item.image || '' 
    });
  
    this.currentId = item.id;
  }
}