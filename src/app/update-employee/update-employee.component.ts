import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number=0;
  employee: Employee=new Employee();

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,private router:Router) { }

  ngOnInit() {
    

    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id)
      .subscribe(data => {
       this.employee=data;
       
      }, error => console.log(error));
  }

  

  onSubmit() {
    this.employeeService.updateEmployee(this.id,this.employee)
    .subscribe(data => {
    this.goToEmployeeList();
     
    }, error => console.log(error));;    
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }
}