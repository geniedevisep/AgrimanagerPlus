import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  employee: Employee = new Employee();

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employeeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adress: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form is valid');
      this.employee = this.employeeForm.value;
      console.log('Employee data:', this.employee);

      // Assuming this is an HTTP call to create an employee
      this.employeeService.createEmployee(this.employee)
        .subscribe(data => {
          console.log('Submission successful:', data);
          
          // Redirect to the employee list page after successful submission
          this.router.navigate(['/employees']);
        }, error => {
          console.error('Error during submission:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
