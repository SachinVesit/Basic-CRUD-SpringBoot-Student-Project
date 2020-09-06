import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  faPlus = faUserPlus;

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', RxwebValidators.required],
      password: ['', RxwebValidators.password],
      fullName: ['', RxwebValidators.required],
      email: ['', RxwebValidators.email],
      employeeCode: ['', RxwebValidators.required],
      department: ['', RxwebValidators.required],
      roles: this.formBuilder.array([], [RxwebValidators.json])
    });

  }


  userRoles: Array<any> = [
    { name: 'Admin', value: 'ADMIN' },
    { name: 'Requestor', value: 'REQUESTOR' },
    { name: 'Approver', value: 'APPROVER' }
  ];

  onCheckboxChange(e) {
    const checkArray: FormArray = this.addForm.get('roles') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });
  }

}
