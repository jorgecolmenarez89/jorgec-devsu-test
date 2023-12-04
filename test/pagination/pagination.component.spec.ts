import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from '../../src/app/components/pagination/pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  /*it('Evento click del paginador', () => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.total = 10;
    component.current = 1;
    fixture.detectChanges();
    jest.spyOn(component.goTo, 'emit');
    const buttonsPaginator = compiled.querySelectorAll('[data-test=btnPaginador]');
    buttonsPaginator[0]?.dispatchEvent(new Event('click'));
    expect( component.goTo.emit).toHaveBeenCalled();
  });*/

  /*it('Evento click next', () => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.total = 30;
    component.current = 5;
    fixture.detectChanges();
    jest.spyOn(component.next, 'emit');
    const buttonsNext = compiled.querySelector('[data-test=btnNext]');
    console.log('buttonsNext', buttonsNext)
    buttonsNext?.dispatchEvent(new Event('click'));
    expect( component.next.emit).toHaveBeenCalled();
  });

  it('Evento click boton Previous', () => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.total = 30;
    component.current = 3;
    fixture.detectChanges();
    jest.spyOn(component.previous, 'emit');
    const btnPrevious = compiled.querySelector('[data-test=btnPrev]');
    console.log('buttonsNext', btnPrevious)
    btnPrevious?.dispatchEvent(new Event('click'));
    expect(component.previous.emit).toHaveBeenCalled();
  });*/

});
