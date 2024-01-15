import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employees-form.component.html',
  styleUrl: './employees-form.component.css'
})
export class EmployeesFormComponent {
  employeeForm!: FormGroup;

  //arreglo de cargos (simulado)
  cargos: string[] = ['Gerente', 'Coordinador', 'Subdirector'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      edad: [{ value: null, disabled: true }, Validators.required],
      cargo: ['', Validators.required],
      estatus: ['Activo'],
    });

    const fechaNacimientoControl = this.employeeForm.get('fechaNacimiento');
  if (fechaNacimientoControl) {
    fechaNacimientoControl.valueChanges.subscribe(() => {
      this.calcularEdad();
    });
  }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Empleado:', this.employeeForm.value);
      this.employeeForm.reset();
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.marcarCamposComoTocados(this.employeeForm);
    }
  }

  calcularEdad() {
    const fechaNacimiento = this.employeeForm?.get('fechaNacimiento')?.value;
    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      const edad = hoy.getFullYear() - nacimiento.getFullYear();
  
      if (hoy < new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())) {
        this.employeeForm?.get('edad')?.setValue(edad - 1);
      } else {
        this.employeeForm?.get('edad')?.setValue(edad);
      }
    }
  }


  marcarCamposComoTocados(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.marcarCamposComoTocados(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
