import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAutoComponent } from './demande-auto.component';

describe('DemandeAutoComponent', () => {
  let component: DemandeAutoComponent;
  let fixture: ComponentFixture<DemandeAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
