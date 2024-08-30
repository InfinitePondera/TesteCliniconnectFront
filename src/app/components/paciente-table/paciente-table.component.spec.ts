import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTableComponent } from './paciente-table.component';

describe('PacienteTableComponent', () => {
  let component: PacienteTableComponent;
  let fixture: ComponentFixture<PacienteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
