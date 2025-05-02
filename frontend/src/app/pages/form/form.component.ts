import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formulario: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  datosGuardados: any[] = [];
  currentId: number | null = null; // Para guardar el ID del registro que estamos actualizando

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      image: [null], // No es obligatorio para la actualización
    });
  }

  ngOnInit(): void {
    this.consultarDatos();
  }

  // Manejo de imagen seleccionada
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    if (file) {
      this.formulario.patchValue({ image: file });
      this.formulario.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Enviar formulario (crear nuevo o actualizar)
  limpiarFormulario() {
    this.formulario.reset();
    this.imagePreview = null;
    this.selectedFile = null;
    this.currentId = null;
  }
  onSubmit() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('name', this.formulario.get('name')?.value);
      formData.append('description', this.formulario.get('description')?.value);
      formData.append('address', this.formulario.get('address')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      // Si estamos actualizando un registro, enviamos PUT. Si no, POST.
      if (this.currentId) {
        this.http
          .put(`http://localhost:3000/actualizar/${this.currentId}`, formData)
          .subscribe(
            (res) => {
              console.log('Registro actualizado con éxito:', res);
              this.formulario.reset();
              this.imagePreview = null;
              this.selectedFile = null;
              this.currentId = null; // Resetear el ID después de la actualización
              this.consultarDatos(); // Actualizamos la lista después de la actualización
            },
            (err) => {
              console.error('Error al actualizar el registro:', err);
            }
          );
      } else {
        this.http.post('http://localhost:3000/guardar', formData).subscribe(
          (res) => {
            console.log('Formulario enviado con éxito:', res);
            this.formulario.reset();
            this.imagePreview = null;
            this.selectedFile = null;
            this.consultarDatos(); // Actualizar la lista de datos después de agregar uno nuevo
          },
          (err) => {
            console.error('Error al enviar el formulario:', err);
          }
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  // Consultar los datos guardados
  consultarDatos() {
    this.http.get<any[]>('http://localhost:3000/listar').subscribe(
      (res) => {
        this.datosGuardados = res;
        console.log('Datos recibidos:', res);
      },
      (err) => {
        console.error('Error al consultar los datos:', err);
      }
    );
  }

  // Eliminar un dato
  eliminarDato(id: number) {
    this.http.delete(`http://localhost:3000/eliminar/${id}`).subscribe(
      (res) => {
        console.log('Dato eliminado:', res);
        this.consultarDatos(); // Volver a obtener los datos actualizados
      },
      (err) => {
        console.error('Error al eliminar dato:', err);
      }
    );
  }

  // Llenar el formulario para actualizar un dato
  abrirFormularioActualizar(item: any) {
    this.formulario.patchValue({
      name: item.name,
      description: item.description,
      address: item.address,
    });
    this.selectedFile = null; // Si no deseas permitir la actualización de la imagen, lo dejas vacío
    this.imagePreview = item.imgae
      ? `data:image/jpeg;base64,${item.image}`
      : null;

    // Guardar el ID del dato que estamos actualizando
    this.currentId = item.id;
  }
}
