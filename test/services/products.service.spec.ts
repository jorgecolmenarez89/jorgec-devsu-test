import { TestBed,  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from '../../src/app/products/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { IProduct } from 'src/app/products/product';

const  makeid = (length: number) =>{
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('primer registro id pro2', (done) => {
    service.getAll().subscribe(products => {
      expect(products[0].id).toBe('pro2');
    })
    done();
  });

  it('create data by post', (done) => {
    const createObj: IProduct = { 
      id: makeid(7), 
      name: 'test', 
      description: 'test', 
      logo: 'https://gravatar.com/avatar/88dd9f32ab82a5852d6655022e15ce66?s=400&d=robohash&r=x',
      date_release: '2023-12-12',
      date_revision: '2024-12-12'  
    };
    service.save(createObj).subscribe(res => {
      expect(res.name).toBe('test'); 
    }); 
    done();
  });

  it('update data', (done) => {
    const createObj: IProduct = { 
      id: 'pro2', 
      name: 'test', 
      description: 'test', 
      logo: 'https://gravatar.com/avatar/88dd9f32ab82a5852d6655022e15ce66?s=400&d=robohash&r=x',
      date_release: '2023-12-12',
      date_revision: '2024-12-12'  
    };
    service.save(createObj).subscribe(res => {
      expect(res.name).toBe('test'); 
    }); 
    done();
  });

  it('delete data', (done) => {
    service.delete('pro-11').subscribe(res => {
      expect(res).toBe(true); 
    });
    done();
  });
  

});
