import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotebodegaComponent } from './lotebodega.component';

describe('LotebodegaComponent', () => {
  let component: LotebodegaComponent;
  let fixture: ComponentFixture<LotebodegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotebodegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotebodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
