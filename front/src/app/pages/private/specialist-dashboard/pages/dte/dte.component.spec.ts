import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DteComponent } from './dte.component';

describe('DteComponent', () => {
  let component: DteComponent;
  let fixture: ComponentFixture<DteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
