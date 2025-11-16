import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../Services/tarjeta.service';



@Component({
    selector: 'app-tarjeta-credito',
    templateUrl: './tarjeta-credito.component.html',
    styleUrls: ['./tarjeta-credito.component.css'],
    standalone: false
})

// Creamos los elementos a enlistar, que contendrá la tabla de "Listar Tarjetas"
export class TarjetaCreditoComponent implements OnInit{
lisTarjetas: any[] = [];

//Propiedad para cambiar el título del formulario
accion: string = 'Agregar';

//Creamos la propiedad FormGroup
form: FormGroup;

id: number | undefined;


//Método constructor para ingresar datoos al formulario y validar las entradas
constructor(private fb: FormBuilder,
  private toastr: ToastrService,
  private _tarjetaService: TarjetaService){
  this.form = this.fb.group({
  titular: ["", Validators.required],
  numeroTarjeta: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
  fechaExpiracion: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
  cvv: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
  })
}

ngOnInit(): void{
  this.obtenerTarjetas();
}

//Método para obtener Tarjeta en la consola

obtenerTarjetas() {
  this._tarjetaService.getListTarjetas().subscribe({
    next: (data) => {
      console.log('Datos Recibidos:', data);
      this.lisTarjetas = data;
    },
    error: (error) => {
      console.error('Error en la Petición:', error);
    },
    complete: () => {
      console.log('Petición Completada');
    }
  });
}



//Creamos el métoso agregarTarjeta
guardarTarjeta(){
  
  const tarjeta: any = {
    titular: this.form.get('titular')?.value,
    numeroTarjeta: this.form.get('numeroTarjeta')?.value,
    fechaExpiracion: this.form.get('fechaExpiracion')?.value,
    cvv: this.form.get('cvv')?.value,
  }
  
  if(this.id == undefined){
    //Aregamos un nuevo registro ingresado a la tabla y limpiamos el formulario.
    this._tarjetaService.saveTarjetas(tarjeta).subscribe({
      next: (data) => {
        console.log('Respuesta POST:', data);
        this.toastr.success('La tarjeta fue Registrada con éxito!', 'Tarjeta Registrada!');
        this.obtenerTarjetas();
        this.form.reset();
      },
      error: (err) => {
        console.error('Error al guardar tarjeta:', err);
        this.toastr.error('Opss.. ocurrió un error', 'Error');
      },
      complete: () => {
        console.log('Petición POST completada');
      }
    });
  } else {
    //Editamos la tarjeta
    tarjeta.id = this.id;
    this._tarjetaService.updateTarjetas(this.id, tarjeta).subscribe({
      next: (data) => {
        console.log('Respuesta PUT:', data);
        this.toastr.info('La tarjeta fue actualizada con éxito!', 'Tarjeta Actualizada');
        this.obtenerTarjetas();
        this.form.reset();
        this.id = undefined;
        this.accion = 'Agregar';
      },
      error: (err) => {
        console.error('Error al actualizar tarjeta:', err);
        this.toastr.error('Opss.. ocurrió un error', 'Error');
      },
      complete: () => {
        console.log('Petición PUT completada');
      }
    });
  }
  
}

//Creamos el método para eliminar el registro de la tabla.
eliminarTarjeta(id: number){
  this._tarjetaService.deleteTarjetas(id).subscribe({
    next: (data) => {
      console.log('Respuesta eliminación:', data);
      this.toastr.error('La tarjeta fue eliminada con éxito!', 'Tarjeta Eliminada');
      this.obtenerTarjetas();
      this.form.reset();
    },
    error: (error) => {
      console.error('Error al eliminar:', error);
      this.toastr.error('Error al eliminar la tarjeta', 'Error');
    },
    complete: () => {
      console.log('Petición de eliminación completada');
    }
  });
}
//Método para prellenar el formulario al editar
  editarTarjeta(tarjeta: any){
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
  }
}
