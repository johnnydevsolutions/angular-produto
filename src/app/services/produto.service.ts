import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'http://localhost:4000/api/produtos/';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProduto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
  guardarProduto(produto: Produto): Observable<any> {
    return this.http.post(this.url, produto);
  }
  obterProduto(id: string): Observable<any> {
    return this.http.get(this.url + id);
}

  editarProduto(id: string, produto: Produto): Observable<any> {
    return this.http.put(this.url + id, produto);
  }
}
