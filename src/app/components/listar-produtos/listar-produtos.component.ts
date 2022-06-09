import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  listProdutos: Produto[] = [];

  constructor(private _produtoService: ProdutoService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
      this.obterProdutos();
  }

  obterProdutos() {
    this._produtoService.getProdutos().subscribe((data: any) => {
      console.log(data);
      this.listProdutos = data;
    }, (error: any) => {
      console.log(error);
    })
  }

  eliminarProduto(id: any) {
    this._produtoService.eliminarProduto(id).subscribe(data => {
      this.toastr.error('O produto foi eliminado com exito', 'Produto eliminado');
      this.obterProdutos();
    }, error=> {
      console.log(error);
    })
  }
}
