import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Entrada } from '../../model/entrada.model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { EntradasService } from '../../service/entradas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  implements AfterViewInit, OnInit {


  displayedColumns: string[] = ['nome', 'pago','data','valor','tipo','editar','excluir'];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private entradaService: EntradasService,
    private router: Router){

  }
  ngOnInit(): void {
  this.buscarEntradas();
  }

  ngAfterViewInit() {
    /** é iniciado antes(after) do ngOninit, ou seja, antes de ter categorias, e antes do dataSorce ser alimentado com dados  */
    this.dataSource.paginator = this.paginator;
  }

   buscarEntradas(){
    this.entradaService.getEntradas().subscribe((entradas: Entrada[]) =>{
      this.entradas = entradas;
      this.dataSource.data = this.entradas;
    })
   }

  chamarEdicao(entrada: Entrada){
    this.router.navigate(['entradas','editar', entrada.id]);
  }

  excluir(id: number){
    this.entradaService.exluirEntrada(id).subscribe(resposta =>{
      console.log(resposta);
           this.buscarEntradas();
    });
  }

  novaCategoria(){
    this.router.navigate(['categorias','nova-categoria']);

  
}

  

novaEntrada(){
  this.router.navigate(['entradas','novo'])
}

}
