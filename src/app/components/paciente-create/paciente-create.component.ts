import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {OverlayRef} from "@angular/cdk/overlay";
import {PacienteService} from "../../services/paciente.service";
import {Endereco} from "../../models/endereco";

@Component({
  selector: 'app-paciente-create',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './paciente-create.component.html',
  styleUrl: './paciente-create.component.css'
})
export class PacienteCreateComponent {
  @Input() overlayRef: OverlayRef | undefined;
  invalidEmail: boolean = false;
  invalidCpf: boolean = false;
  pacienteCreateForm!: FormGroup;

  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.pacienteCreateForm = this.formBuilder.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      enderecos: this.formBuilder.array([]),
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      informacaoAtendimento:['', Validators.required]
    })
  }

  createEndereco(): FormGroup {
    return this.formBuilder.group({
      rua: ['',  Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  get enderecos(): FormArray {
    return this.pacienteCreateForm.get('enderecos') as FormArray;
  }

  addEndereco() {
    this.enderecos.push(this.createEndereco());
  }

  removeEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  onSaveClick(): void {
    console.log(this.pacienteCreateForm);
    const paciente = {...this.pacienteCreateForm.value};

    if (this.validateEmail(paciente.email)) {
      this.invalidEmail = true;
    } else if (this.validateCpf(paciente.cpf)) {
      this.invalidCpf = true;
    } else {
      this.pacienteService.postPaciente(paciente).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  validateEmail(email: string): boolean {
    const regex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    if (!email.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  validateCpf(cpf: string): boolean {
    const regex = "[0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9]{2}";
    if (!cpf.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  closeCreateOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
