import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { IUser } from 'src/app/assets/interfaces/user/user';
import { UserService } from 'src/app/assets/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public singupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.singupForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public register(): void {
    const { email, password } = this.singupForm.value;

    this.emailSingUp(email.toLowerCase(), password).then(() => {
      this.toast.success('User successfully registered');
      this.singupForm.reset();
    }).catch((error) => {
      this.toast.error(`ERROR: ${error}`);
    });
  }

  private async emailSingUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user: IUser = {
      uid: credential.user.uid,
      email: credential.user.email,
      role: 'USER',
    };

    this.userService.add(user).then(() => {
      localStorage.setItem('userList', JSON.stringify(user));
      this.router.navigate(['']);
    });
  }
}
