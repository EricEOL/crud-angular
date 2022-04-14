import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userId: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router ) {
    this.userForm = this.formBuilder.group({
      id: '0',
      nome: '',
      idade: 0,
      localidade: ''
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      
      if(id !== null) {
        this.userId = id;
        this.userService.findAll().subscribe(result => {
          const userEdit = result.filter(user => user.id == Number(this.userId))
          this.userForm.patchValue({
            id: userEdit[0].id,
            nome: userEdit[0].nome,
            idade: userEdit[0].idade,
            localidade: userEdit[0].localidade
          })
        })
      }
    })
  }

  actionButton(): void  {
    if(this.userId) this.updateUser();
    else this.createUser();
  }

  updateUser() {
    this.userService.update(this.userId, this.userForm.value).subscribe(null, null, () => this.router.navigate(['/']));
  }

  createUser(): void {
    this.userService.create(this.userForm.value).subscribe(null, null, () => this.router.navigate(['/']));
  }

}
