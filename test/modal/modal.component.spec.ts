import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from '../../src/app/components/modal/modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Probar si recibe el titulo', () => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.title = "devsu";
    fixture.detectChanges();
    const h4 = compiled.querySelector('h4');
    expect(h4?.textContent).toContain("devsu");
  });

  it('Evento click boton Cancelar', () => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
    jest.spyOn(component.onCancel, 'emit');
    const btnCancel = compiled.querySelector('[data-test=btnCancel]');
    btnCancel?.dispatchEvent(new Event('click'));
    expect( component.onCancel.emit).toHaveBeenCalled();
  });

  it('Evento click boton Confirmar', () => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
    jest.spyOn(component.onConfirm, 'emit');
    const btnConfirm = compiled.querySelector('[data-test=btnConfirm]');
    btnConfirm?.dispatchEvent(new Event('click'));
    expect(component.onConfirm.emit).toHaveBeenCalled();
  });

});
