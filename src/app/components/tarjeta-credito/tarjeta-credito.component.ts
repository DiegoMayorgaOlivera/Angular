import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})

// Creamos los elementos a enlistar, que contendrá la tabla de "Listar Tarjetas"
export class TarjetaCreditoComponent implements OnInit{
lisTarjetas: any[] = [
  {titular: "Juan Perez", numeroTarjeta:"1234676", fechaExpiracion: "11/12", cvv: "123"},
  {titular: "Miguel Gonzales", numeroTarjeta:"654987", fechaExpiracion: "11/24", cvv: "321"},
];

//Creamos la propiedad FormGroup
form: FormGroup;

constructor(private fb: FormBuilder,
  private toastr: ToastrService){
  this.form = this.fb.group({
  titular: ["", Validators.required],
  numeroTarjeta: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
  fechaExpiracion: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
  cvv: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
  })
}

ngOnInit(): void{
}

//Creamos el métoso agregarTarjeta
agregarTarjeta(){
  console.log(this.form);

  const tarjeta: any = {
    titular: this.form.get('titular')?.value,
    numeroTarjeta: this.form.get('numeroTarjeta')?.value,
    fechaExpiracion: this.form.get('fechaExpiracion')?.value,
    cvv: this.form.get('cvv')?.value,
  }
  
  //Aregamos el registro ingresado a la tabla y limpiamos el formulario.
  this.lisTarjetas.push(tarjeta);
  this.toastr.success('La tarjeta fue Registrada con éxito!', 'Tarjeta Registrada!');
  this.form.reset();
}

}
