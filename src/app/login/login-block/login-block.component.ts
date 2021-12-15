import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-login-block',
  templateUrl: './login-block.component.html',
  styleUrls: ['./login-block.component.scss']
})
export class LoginBlockComponent implements OnInit {
  public loginForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
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

  public login(): void {
    const { email, password } = this.loginForm.value;

    this.emailLogin(email.toLowerCase(), password).then(() => {
      alert('Welcome');
      this.loginForm.reset()
    }).catch((error) => {
      alert("ERROR: " + error);
    });
  }

  private async emailLogin(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);

    this.subscriptions.add(
      docData(doc(this.afs, 'users', credential.user.uid)).subscribe((user) => {
        localStorage.setItem('userList', JSON.stringify(user));
        this.router.navigate(['']);
      })
    );
  }

  public loginWithFacebook(): void {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          role: 'USER'
        };
        localStorage.setItem('userList', JSON.stringify(user));
        this.router.navigate(['']);
      })
      .catch((error) => {
        alert('ERROR: ' + error);
      });
  }

}
