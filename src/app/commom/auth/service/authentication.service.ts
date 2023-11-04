import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Login } from '../models/login.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpBaseService {
  /** Verifica se existe usuario   */
  private subjectUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
    /**Serve para fazer uma vefiricação se o usuario estiver logado,e mostar uma informação.Por exemplo
     * Tela de dashboard.
     */
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

  /** Quando fazer o  login ele vai obeter dentro do BehaviorSubject informações e vai fazer um next
   * Propagando as informaçõs para frente.
   */



  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  login(login: Login): Observable<any>{
    
    return this.httpPost('authentication',login).pipe(
      map((resposta)=>{

        sessionStorage.setItem('token',resposta.token);
        this.subjectUsuario.next(resposta.user);
        this.subjectLogin.next(true);
        return resposta.user


      }),
    )



  }

  sair(){

    sessionStorage.removeItem('token');
    this.subjectUsuario.next(null);
    this.subjectLogin.next(false);



  }

  usuarioEstaLogado(): Observable<any>{

    const token = sessionStorage.getItem('token');

    if(token){
      this.subjectLogin.next(true)
    }

    /** Com esse retorno o usuario vai conseguir se inscrever */
    return this.subjectLogin.asObservable();

  }
 
  obterUsuario(){

    this.subjectUsuario.asObservable();

  }

}
