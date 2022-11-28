import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LintComponent } from './lint.component';

describe('LintComponent', () => {
  let component: LintComponent;
  let fixture: ComponentFixture<LintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
