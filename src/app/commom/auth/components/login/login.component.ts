import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  hide = true;

  loginForm!: FormGroup;
  authLogin!: Login;
  rota: string = '';
  estaLogado: boolean = false;


  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar, private activatedRouter : ActivatedRoute){}



  ngOnInit(): void {

    /*this.rota = this.activatedRouter.snapshot.url[0].path;

    if(this.rota === 'login'){
      this.estaLogado = false;
    }else{
        this.estaLogado = true;
    }

    */
    
    this.loginForm = this.formBuilder.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required, Validators.minLength(4)])],

    })
  }

  login(){

    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.authLogin.email = this.authLogin.email.toLowerCase();

    console.log(this.authLogin)

    this.authenticationService.login({email: this.authLogin.email, password: this.authLogin.password}).subscribe((user) =>{

      if(user?.id){

        this.router.navigateByUrl('dashboard');

      }

    },error =>

    this._snackBar.open('Ocorreu um erro no Login!')
    
    )
  }

  sair(){

 this.authenticationService.sair();
 this.router.navigate(['auth','login']);
    
  }

}

