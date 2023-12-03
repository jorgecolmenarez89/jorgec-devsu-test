import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { IProduct } from '../product';
import { ProductsService } from '../services/products.service';

export class IdValidator {
  static createValidator(productsService: ProductsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return productsService
        .verify(control.value)
        .pipe(
          map((result: boolean) =>
            result ? { idAlreadyExists: true } : null
          )
        );
    };
  }
}