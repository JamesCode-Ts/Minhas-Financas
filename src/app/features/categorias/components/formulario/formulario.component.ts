import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent  implements OnInit{

  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup;

  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private actvateRoute: ActivatedRoute,
    private formBuilder: FormBuilder){

  }
  ngOnInit(): void {

  this.id = this.actvateRoute.snapshot.url[1].path;
  this.criarFormulario();
  this.categoriaService.getCategoriasPeloId(parseInt(this.id)).subscribe((categoria: Categoria) =>{
  this.categoria = categoria;
  this.formCategoria.controls['nome'].setValue(categoria.nome);
  this.formCategoria.controls['descricao'].setValue(categoria.descricao);
 })

}

criarFormulario(){
  this.formCategoria = this.formBuilder.group(

    {  
   nome:['', Validators.required],
   descricao: ['',Validators.required]
    }
  )

  }

}


