import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpBaseService{

 private endpoint = 'entradas';

  constructor(protected override readonly  injector: Injector) {
    super(injector);
   }

   getEntradas(): Observable<any>{
    return this.httpGet(this.endpoint);
   }


}
