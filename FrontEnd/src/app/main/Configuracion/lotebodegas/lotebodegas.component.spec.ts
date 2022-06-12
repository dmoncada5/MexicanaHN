import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotebodegasComponent } from './lotebodegas.component';

describe('LotebodegasComponent', () => {
  let component: LotebodegasComponent;
  let fixture: ComponentFixture<LotebodegasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotebodegasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotebodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
