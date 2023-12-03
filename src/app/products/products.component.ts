import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { IProduct } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  optionsSelect: number[] = [5,10,20];
  search: string = '';
  current: number = 1;
  productsToDisplay: IProduct[] = [];
  perPage = 5;
  total = Math.ceil(this.productsService.allProduct.length / this.perPage);
  modalOpen: boolean = false;
  titleModal: string = '';
  selectedProduct: any | null = null;

  constructor (private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productsService.getAll().subscribe((data) => {
      this.productsService.allProduct = data;
      localStorage.setItem('products', JSON.stringify(data));
      this.total = Math.ceil(data.length / this.perPage);
      this.productsToDisplay = this.paginate(this.current, this.perPage)
    }, err => console.log('HTTP Error', err),
    () => console.log('HTTP request completed.'));
  }

  handleSearch(){
    let filter: IProduct[] = [];
    console.log('search', this.search);
    if(this.search == ''){
      filter = this.productsService.allProduct;
    } else {
      filter = this.productsService.allProduct.filter(
        (pro: IProduct) =>  { 
          return pro.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
          || pro.description.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
          || pro.date_release.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
          || pro.date_revision.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
      });
    }
    this.total = Math.ceil(filter.length / this.perPage);
    this.productsToDisplay = filter;
  }

  changePerPage(){
    this.current = 1;
    this.total = Math.ceil(this.productsService.allProduct.length / this.perPage);
    this.productsToDisplay = this.paginate(this.current, this.perPage)
  }

  onGoTo(page: number): void {
    this.current = page;
    this.productsToDisplay = this.paginate(this.current, this.perPage)
  }

  onNext(page: number): void {
    this.current = page + 1
    this.productsToDisplay = this.paginate(this.current, this.perPage)
  }

  onPrevious(page: number): void {
    this.current = page - 1
    this.productsToDisplay = this.paginate(this.current, this.perPage)
  }

  paginate(current: number, perPage: number): IProduct[] {
    return [...this.productsService.allProduct.slice((current - 1) * perPage).slice(0, perPage)];
  }

  onDelete(currentProduct: IProduct){
    this.selectedProduct = currentProduct;
    this.titleModal = `¿Estas seguro de eliminar el producto: ${currentProduct.name}?`
    this.modalOpen = true;
  }

  cancelModal(){
    this.modalOpen = false;
  }

  deleteProduct(){
    this.modalOpen = false;
    this.productsService.delete(this.selectedProduct?.id).subscribe((data) => {
      console.log(data);
      this.getAllProducts();
      this.selectedProduct = null;
    }, err => {
      console.log('HTTP Error', err)
      if(err.status == 200){
        this.getAllProducts();
      } else {
        console.log('Error al Eliminar')
      }
    },
    () => console.log('HTTP request completed.'))
  }

}
