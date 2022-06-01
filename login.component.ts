import { LoginService } from './../services/login.service';
import { loginModel } from './login.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  loginObj: loginModel = new loginModel();
  loginUser: any;

  constructor(
    private config: NgSelectConfig,
    private formbuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });

    this.getAllEmploy();
  }

  postEmployDetails() {
    this.loginObj.id = this.formValue.value.id;
    this.loginObj.name = this.formValue.value.name;
    this.loginObj.email = this.formValue.value.email;
    this.loginObj.mobile = this.formValue.value.mobile;
    this.loginObj.salary = this.formValue.value.salary;

    this.loginService.postEmploy(this.loginObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employ Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmploy();
      },
      (err) => {
        alert('Somthing Went Wrong');
      }
    );
  }

  getAllEmploy() {
    this.loginService.getEmploy().subscribe((res) => {
      console.log('response', res);
      this.loginUser = res;
    });
  }
  deleteEmploy(row: any) {
    this.loginService.deleteEmploy(row.id).subscribe((res) => {
      alert('Employ Deleted Successfully');
      this.getAllEmploy();
    });
  }

  onEdit(row: any) {
    this.loginObj.id = row.id;

    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployDetails() {
    this.loginObj.id = this.formValue.value.id;
    this.loginObj.name = this.formValue.value.name;
    this.loginObj.email = this.formValue.value.email;
    this.loginObj.mobile = this.formValue.value.mobile;
    this.loginObj.salary = this.formValue.value.salary;

    this.loginService
      .updateEmploy(this.loginObj.id, this.loginObj)
      .subscribe((res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmploy();
      });
  }

  // updateData(){
  //   let user={

  //   }
  // }
}
