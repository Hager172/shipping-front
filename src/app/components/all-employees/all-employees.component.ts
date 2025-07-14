import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { EmployeeWithPermissions } from '../../models/employee/employeedto';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    CustomTableComponent,
    ButtonStyleComponent
  ],
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {
  employees: EmployeeWithPermissions[] = [];
  searchTerm: string = '';

  columns = [
    { header: 'Name', accessor: 'fullName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Username', accessor: 'userName' },
    { header: 'Address', accessor: 'address' },
    { header: 'Status', accessor: 'isActive', type: 'toggle' },
    { header: 'Permissions', accessor: 'permissions', type: 'array' } // ✳️ الجديد
  ];

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data.map(e => ({
          ...e,
          id: e.userId // to match 'id' accessor if needed
        }));
      },
      error: (err) => console.error('Error loading employees', err)
    });
  }

  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

  openEditEmployee(emp: any) {
    this.router.navigate(['/edit-employee', emp.userId]);
  }

  deleteEmployee(emp: any) {
    alert("Delete feature not implemented yet!");
  }

  onToggleStatus(emp: any) {
    const updatedStatus = !emp.isActive;

    this.employeeService.toggleEmployeeStatus(emp.userId, updatedStatus).subscribe({
      next: () => {
        emp.isActive = updatedStatus;
        const statusText = emp.isActive ? 'Active' : 'Inactive';
        alert(`Employee "${emp.fullName}" is now ${statusText}`);
      },
      error: (err) => {
        console.error('Error updating status', err);
        alert('Failed to update employee status');
      }
    });
  }
}
