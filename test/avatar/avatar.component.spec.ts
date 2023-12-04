import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from '../../src/app/components/avatar/avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Probar src de la imagen', () => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.url = "https://gravatar.com/avatar/475521dc4752b5e71c78e83299dee893?s=400&d=robohash&r=x";
    fixture.detectChanges();
    const img = compiled.querySelector('img');
    expect(img?.getAttribute('src')).toContain("https://gravatar.com");
  });


});
