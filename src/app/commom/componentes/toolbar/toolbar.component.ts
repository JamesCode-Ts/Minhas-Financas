import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

@Input() menu!: any[];

estaLogado: boolean = false;
rota: string = '';

constructor(private authService: AuthenticationService,
  private router: Router, private activatedRouter: ActivatedRoute){


}

ngOnInit(): void {
/*
  this.rota = this.activatedRouter.snapshot.url[0].path;

  if(this.rota === 'login'){
    this.estaLogado = false;
  }else{
      this.estaLogado = true;
  }
*/
this.authService.usuarioEstaLogado().subscribe(estaLogado =>{
  this.estaLogado = estaLogado;

 
})
}

sair(){
  this.authService.sair();
  this.router.navigate(['auth','login']);

}
}
