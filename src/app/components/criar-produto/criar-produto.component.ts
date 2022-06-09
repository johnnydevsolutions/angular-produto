import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  titulo = 'Criar produto';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router, //Redirecionar
              private toastr: ToastrService,
              private _produtoService: ProdutoService,
              private aRouter: ActivatedRoute) {
    this.produtoForm = this.fb.group({
      produto: ['', Validators.required],
      categoria: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProduto() {
    console.log(this.produtoForm);

    console.log(this.produtoForm.get('produto')?.value);

    const PRODUTO: Produto = {
      nome: this.produtoForm.get('produto')?.value,
      categoria: this.produtoForm.get('categoria')?.value,
      location: this.produtoForm.get('location')?.value,
      price: this.produtoForm.get('price')?.value,
    }

    if(this.id !== null) {
      // Edita produto

      this._produtoService.editarProduto(this.id, PRODUTO).subscribe(data=> {
        this.toastr.info('O produto foi atualizado com exito!', 'Produto Registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.produtoForm.reset();
      })

    } else {
      console.log(PRODUTO);
    this._produtoService.guardarProduto(PRODUTO).subscribe(data => {
      this.toastr.success('O produto foi registrado com exito', 'Produto Registrado!')
    this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.produtoForm.reset();
    })
  }
    }


    esEditar() {

      if(this.id !== null) {
        this.titulo= 'Editar produto';
        this._produtoService.obterProduto(this.id).subscribe(data=> {
          this.produtoForm.setValue({
            produto: data.nome,
      categoria: data.categoria,
      location: data.location,
      price: data.price,
          })
        })
      }
    }
  }

// Acima chamando o redirecionamento de página e também info do produto pelo console.log

