import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaprecioComponent } from './listaprecio.component';

describe('ListaprecioComponent', () => {
  let component: ListaprecioComponent;
  let fixture: ComponentFixture<ListaprecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaprecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaprecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
