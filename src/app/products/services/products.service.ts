import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, catchError, throwError} from "rxjs";
import { environment } from '../../../environments/environment';
//import { environment } from 'src/enviroments';
import { IProduct } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  globalHeaders: HttpHeaders = new HttpHeaders({ authorId: environment.authorId});
  baseUrl: string = `${environment.api_url}/products`; 
  allProduct: IProduct[] = [];

  constructor(private http: HttpClient) { }
  

  getAll(): Observable<IProduct[]>{
    const headers = this.globalHeaders;
    return this.http.get<IProduct[]>(this.baseUrl, {headers});
  }

  verify(productId: string | null): Observable<boolean>{
    const headers = this.globalHeaders;
    return this.http.get<boolean>(`${this.baseUrl}/verification?id=${productId}`, {headers});
  }

  save(body: IProduct): Observable<IProduct>{
    const headers = this.globalHeaders;
    return this.http.post<IProduct>(this.baseUrl, body, {headers});
  }

  update(body: IProduct): Observable<IProduct>{
    const headers = this.globalHeaders;
    return this.http.put<IProduct>(this.baseUrl, body, {headers});
  }

  delete(productId: string | null): Observable<string>{
    const headers = this.globalHeaders;
    return this.http.delete<string>(`${this.baseUrl}?id=${productId}`, {headers});
  }

  checkProductExist(value: string){ //buscar si existe el producto
    const productsGlobals = localStorage.getItem('products');
    const allProducts =  productsGlobals ? JSON.parse(productsGlobals) : [];
    if(allProducts.length > 0){
      const currentProduct = allProducts.find((product: IProduct) => product.id == value);
      return currentProduct ? currentProduct : null;
    } else {
      return null;
    }
  }

  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage))
  }

}
