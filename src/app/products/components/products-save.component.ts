import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common' 
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { IdValidator } from '../validators/id.validator';
import { IProduct } from '../product';

@Component({
  selector: 'app-products-save',
  templateUrl: './products-save.component.html',
  styleUrls: ['./products-save.component.scss']
})
export class ProductsSaveComponent implements OnInit {

  productForm: FormGroup;
  isEdit: boolean =  false;
  productId: string = '';
  
  constructor(
    private fb: FormBuilder, 
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
    ){
    this.productForm = this.fb.group({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ],  [IdValidator.createValidator(this.productsService)]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ], []),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ], []),
      logo: new FormControl('', [
        Validators.required,
      ],  []),
      date_release: new FormControl(formatDate(new Date(),'yyyy-MM-dd','en'), [
        Validators.required,
      ], []),
      date_revision: new FormControl(formatDate(this.sumOneYear(),'yyyy-MM-dd','en'), [
        Validators.required,
        this.oneYearValidator()
      ], []),
    })
  }

  ngOnInit(): void {

    this.route.params.subscribe( (param) => {
      if(param['id']){
        const currentProduct = this.productsService.checkProductExist(param['id']);
        if(currentProduct){
          this.isEdit = true;
          this.productId = param['id'];
          this.productForm.controls["id"].setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
          this.productForm.setValue({
            ...currentProduct,
            date_release:  formatDate(currentProduct.date_release,'yyyy-MM-dd','en'),
            date_revision:  formatDate(currentProduct.date_revision,'yyyy-MM-dd','en')
          });
          this.productForm.controls['id'].disable();
        } else {
          this.isEdit = false;
        }
      }
    })

    this.productForm.controls['date_release'].valueChanges.subscribe(value => {
      this.productForm.controls['date_revision'].setValue(formatDate(this.sumOneYear(value),'yyyy-MM-dd','en'))
    });
    
  }


  handleSubmit() {
    if(this.isEdit){
      const body = {
        ...this.productForm.value,
        id: this.productId
      }
      this.productsService.update(body).subscribe((data) => {
        this.productForm.reset();
        this.router.navigate(['/products'])
      },err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'))
    } else {
      this.productsService.save(this.productForm.value).subscribe((data) => {
        this.productForm.reset();
        this.router.navigate(['/products'])
      },err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'))
    }
  }

  resetForm() {
    this.productForm.reset();
  }

  sumOneYear(value?: string){
    const currentDate =  value ? new Date(value) : new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const oneYear = new Date(year + 1, month, day);
    return oneYear;
  }

  oneYearValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      if(this.productForm){
        const oldDate = new Date(this.productForm.get('date_release')?.value);
        const futureDate = new Date(value);
        const time = Math.abs(futureDate.getTime() - oldDate.getTime());
        const days = Math.ceil(time / (1000 * 3600 * 24));
        return days < 365 ? { hasNotPasedOneYear: true } : null;
      }
      return null;
    }
  }

}
