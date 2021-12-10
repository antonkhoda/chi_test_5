import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    const { email, password } = this.loginForm.value;
    this.emailLogin(email, password).then(() => {
      alert('Welcome');
      this.loginForm.reset()
    }).catch((error) => {
      alert("ERROR: " + error);
    });;
  }

  private async emailLogin(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.subscriptions.add(
      docData(doc(this.afs, 'users', credential.user.uid)).subscribe((user) => {
        localStorage.setItem('userList', JSON.stringify(user));
        
        if (user) {
          this.router.navigate(['/shop']);
        }
      })
    );
  }

  // FacebookAuth() {
  //   return this.AuthLogin(new auth.FacebookAuthProvider());
  // } 

  // AuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //   .then((result) => {
  //       console.log('You have been successfully logged in!')
  //   }).catch((error) => {
  //       console.log(error)
  //   })
  // }

}
