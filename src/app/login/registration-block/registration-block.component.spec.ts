import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBlockComponent } from './registration-block.component';

describe('RegistrationBlockComponent', () => {
  let component: RegistrationBlockComponent;
  let fixture: ComponentFixture<RegistrationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
