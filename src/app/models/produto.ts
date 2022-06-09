export class Produto {
  _id?: number;
  nome: string;
  categoria: string;
  location: string;
  price: number;

  constructor(nome: string, categoria: string, location: string, price: number  ) {
    this.nome = nome;
    this.categoria = categoria;
    this.location = location;
    this.price = price;
  }
}
