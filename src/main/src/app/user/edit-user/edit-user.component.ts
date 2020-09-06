import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { first } from "rxjs/operators";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  faThumb = faThumbsUp;
  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', RxwebValidators.required],
      password: ['', RxwebValidators.password],
      fullName: ['', RxwebValidators.required],
      email: ['', RxwebValidators.email],
      employeeCode: ['', RxwebValidators.required],
      department: ['', RxwebValidators.required],
      roles: this.formBuilder.array([], [RxwebValidators.json])
    });
    this.apiService.getUserById(+userId)
      .subscribe(data => {
        this.editForm.setValue(data.result);
      });
  }

  userRoles: Array<any> = [
    { name: 'Admin', value: 'ADMIN' },
    { name: 'Requestor', value: 'REQUESTOR' },
    { name: 'Approver', value: 'APPROVER' }
  ];

  onCheckboxChange(e) {
    const checkArray: FormArray = this.editForm.get('roles') as FormArray;

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
    // this.editForm.roles = this.selectedOptions;
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
