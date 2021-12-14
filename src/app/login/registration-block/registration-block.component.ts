import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-block',
  templateUrl: './registration-block.component.html',
  styleUrls: ['./registration-block.component.scss']
})
export class RegistrationBlockComponent implements OnInit {

  public singupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router
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
      alert('User successfully registered');
      this.singupForm.reset();
    }).catch((error) => {
      alert("ERROR: " + error);
    });
  }

  private async emailSingUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      uid: credential.user.uid,
      email: credential.user.email,
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user).then(() => {
      localStorage.setItem('userList', JSON.stringify(user));
      this.router.navigate(['/shop']);
    });
  }
}