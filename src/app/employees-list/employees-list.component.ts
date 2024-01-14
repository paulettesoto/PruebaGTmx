import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit{
  employees: any[] = [];
  currentPage = 0;
  pageSize = 0;
  totalElements = 0;
  totalPages = 0;
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    // Simulación de la respuesta de la API
    const exampleResponse = {
      "content": [
          {
              "id": 1,
              "nombre": "Maria Mendoza Lopez",
              "fechaNacimiento": 1653026400000,
              "edad": 32,
              "estatus": true,
              "idCargo": 1
          }
      ],
      "pageable": {
          "sort": {
              "empty": false,
              "sorted": true,
              "unsorted": false
          },
          "offset": 0,
          "pageNumber": 0,
          "pageSize": 100,
          "paged": true,
          "unpaged": false
      },
      "totalPages": 1,
      "totalElements": 6,
      "last": true,
      "number": 0,
      "sort": {
          "empty": false,
          "sorted": true,
          "unsorted": false
      },
      "size": 10,
      "numberOfElements": 6,
      "first": true,
      "empty": false
  };
    this.employees = exampleResponse.content;
    this.pageSize = exampleResponse.pageable.pageSize; 
    this.employees = exampleResponse.content;
    this.totalElements = exampleResponse.totalElements;
    this.totalPages = exampleResponse.totalPages;

    this.filteredEmployees = [...this.employees];
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage - 1; // Paginación basada en cero
    this.fetchEmployees();
  }

  applyFilter() {
    // Filtra los empleados basados en el término de búsqueda
    this.filteredEmployees = this.employees.filter(employee =>
      employee.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

    handleAgeInput(event: KeyboardEvent) {
     // Permitir teclas de control, números y teclas de flecha
    const isNumberKey = !isNaN(Number(event.key));

    // Si no es una tecla permitida, prevenir la acción del evento
    if (!(isNumberKey )) {
      event.preventDefault();
    }
  }
  editEmployee(employeeId: number, newAge: number) {
    // Implementa la lógica para editar la información del empleado
    console.log('Editar empleado', employeeId, newAge);
  }

  changeStatus(employeeId: number) {
    // Implementa la lógica para cambiar el estatus del empleado
    console.log('Cambiar estatus', employeeId);
  }

  deleteEmployee(employeeId: number) {
    // Implementa la lógica para eliminar al empleado
    console.log('Eliminar empleado', employeeId);
  }

}