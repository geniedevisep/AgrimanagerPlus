import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage = "";
  successMessage = "";

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: (apps) => {
        this.employees = apps;
      },
      error: (err) => {
        this.errorMessage = "Erreur de la requête";
      },
      complete: () => {
        this.successMessage = "Requête valide";
      }
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data) => {
        console.log(data);

        // Mettez à jour la liste des employés après la suppression
        this.getEmployees();
      },
      (error) => {
        console.error("Error during deletion:", error);
      }
    );
  }

  detailsEmployee(id: number) {
    this.router.navigate(['employee-details', id]);
  }
}
