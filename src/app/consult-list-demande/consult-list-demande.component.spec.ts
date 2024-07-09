import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultListDemandeComponent } from './consult-list-demande.component';

describe('ConsultListDemandeComponent', () => {
  let component: ConsultListDemandeComponent;
  let fixture: ComponentFixture<ConsultListDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultListDemandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultListDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
