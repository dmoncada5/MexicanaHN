import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialsComponent } from './historials.component';

describe('HistorialsComponent', () => {
  let component: HistorialsComponent;
  let fixture: ComponentFixture<HistorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
