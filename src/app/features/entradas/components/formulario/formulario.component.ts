import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/features/categorias/models/categoria.model';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { EntradasService } from '../../service/entradas.service';

import * as dayjs from 'dayjs'
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { Entrada } from '../../model/entrada.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ]
  tiposDeEntradas = [
    'receita',
    'despesa'
  ];

  statusDePagamento = [
   {value: true, descricao: 'Pago'},
   {value: false, descricao: 'Pendente'}
  ];

  categorias: Categoria[] = [];
  formEntradas!: FormGroup;
  rota: string = '';
  id: string = '';
  entrada!: Entrada;
  estaCriando: boolean = false;

   /** Criando um Obserble, toda vez que adiciona um $ quer dizer que é Obserble */
  //categorias$ = this.categoriaService.getCategorias();

  constructor(private readonly categoriaService: CategoriaService, 
    private formBuilder: FormBuilder,
    private readonly entradaService: EntradasService,
    private router: Router, private activateRouter: ActivatedRoute){}


  
  ngOnInit(): void {
    this.criarFormulario();
    this.buscarCategorias();

    this.rota = this.activateRouter.snapshot.url[0].path;

    if(this.rota === 'editar'){
      this.id = this.rota = this.activateRouter.snapshot.url[1].path;
        
      this.buscarEntradaPeloId();

    }

    else{
      this.estaCriando = true;



    }

  }

  buscarEntradaPeloId(){
    
    this.entradaService.getEntradasPeloId(+this.id).subscribe((entrada: Entrada) =>{
      this.entrada = entrada;

      const data = this.entrada.data.split('/');

      this.formEntradas.controls['nome'].setValue(this.entrada.nome);                    
      this.formEntradas.controls['valor'].setValue(this.entrada.valor);      
      this.formEntradas.controls['categoriaId'].setValue(this.entrada.categoriaId);      
      this.formEntradas.controls['pago'].setValue(this.entrada.pago);      
      this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);      
      this.formEntradas.controls['data'].setValue(new Date(+data[2], +data[1] -1, +data[0]));      
    });

  }
  
  buscarCategorias(){

    this.categoriaService.getCategorias().subscribe((categorias: Categoria[])=> {
      this.categorias = categorias;
  
    });
  }

  criarFormulario(){
    this.formEntradas = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],
      tipo: ['Despesa', Validators.required],
      data: [ new Date(), Validators.required],

    })

  }

  salvarEntrada(){

    const data = dayjs(this.formEntradas.controls['data'].value).format('DD/MM/YYYY');

    const payloadRequest: Entrada = Object.assign('',this,this.formEntradas.getRawValue());

    payloadRequest.data = data;


    const payload: Entrada = {
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor
    }

    if(this.estaCriando){
      this.criarNovaEntrada(payload);

    }else{
      payload.id = this.entrada.id;
      this.editarEntrada(payload);
    
    }

  }

  criarNovaEntrada(payload: Entrada){
    this.entradaService.criarEntrada(payload).subscribe(resposta =>{
      this.redirecionar();
   
    })
  }
editarEntrada(payload: Entrada){
  this.entradaService.editarEntrada(payload).subscribe(resposta =>{
    this.redirecionar();

  })

}

redirecionar(){
  this.router.navigate(['entradas']);
  
}

}
