import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeesFormComponent } from '../employees-form/employees-form.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
     EmployeesFormComponent
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
  catalogoCargos: any[] = [
    {
      "id": 1,
      "descripcion": "Gerente"
    },
    {
      "id": 2,
      "descripcion": "Coordinador"
    },
    {
      "id": 3,
      "descripcion": "Subdirector"
    }
  ];

  constructor() {}
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

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
          },
          {
            "id": 2,
            "nombre": "Marco Mendoza Lopez",
            "fechaNacimiento": 1653026400000,
            "edad": 32,
            "estatus": false,
            "idCargo": 2
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
    this.pageSize = exampleResponse.pageable.pageSize; 
    this.employees = exampleResponse.content;
    this.totalElements = exampleResponse.totalElements;
    this.totalPages = exampleResponse.totalPages;
    this.employees = exampleResponse.content.map((employee: any) => {
      return {
        ...employee,
        cargo: this.getCargoDescripcion(employee.idCargo)
      };
    });

    this.filteredEmployees = [...this.employees];
  }

  onPageChange(newPage: number) {
    const totalPages = this.totalPages; 
  
    if (newPage >= 0 && newPage < totalPages) {
      this.currentPage = newPage;
      this.fetchEmployees(); 
    }
  }
  getCargoDescripcion(idCargo: number): string {
    const cargo = this.catalogoCargos.find(c => c.id === idCargo);
    return cargo ? cargo.descripcion : '';
  }

  applyFilter() {
    if (!this.searchTerm) {
      // Si no hay término de búsqueda, mostrar todos los empleados
      this.filteredEmployees = [...this.employees];
    } else {
      // Filtra los empleados basados en el término de búsqueda
      this.filteredEmployees = this.employees.filter(employee =>
        (employee.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.id.toString().includes(this.searchTerm) ||
        this.catalogoCargos.some(cargo => cargo.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) && cargo.id === employee.idCargo))
      );
    }
  }

    handleAgeInput(event: KeyboardEvent) {
      // Permitir teclas de control, números, teclas de flecha y teclas de retroceso y eliminar
      const isAllowedKey =
        !isNaN(Number(event.key)) ||
        ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(event.key);
    
      // Si no es una tecla permitida, prevenir la acción del evento
      if (!isAllowedKey) {
        event.preventDefault();
      }
    }

  editEmployee(employeeId: number, newAge: number) {
    console.log('Editar empleado', employeeId, newAge);
  }

  changeStatus(employeeId: number) {
    console.log('Cambiar estatus', employeeId);
  }

  deleteEmployee(employeeId: number) {
    console.log('Eliminar empleado', employeeId);
  }

}