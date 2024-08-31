import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PacienteService} from "../../services/paciente.service";
import {OverlayRef} from "@angular/cdk/overlay";
import {NgxMaskDirective} from "ngx-mask";
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import {Endereco} from "../../models/endereco";

@Component({
  selector: 'app-paciente-edit',
  standalone: true,
  imports: [
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './paciente-edit.component.html',
  styleUrl: './paciente-edit.component.css'
})
export class PacienteEditComponent {
  @Input() paciente: any;
  @Input() overlayRef: OverlayRef | undefined;
  @Output() refreshEvent: EventEmitter<any> = new EventEmitter();
  invalidEmail: boolean = false;
  invalidCpf: boolean = false;
  pacienteEditForm!: FormGroup;
  successMsg: boolean = false;

  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.pacienteEditForm = this.formBuilder.group({
      nome: [this.paciente.nome, Validators.required],
      sexo: [this.paciente.sexo, Validators.required],
      enderecos: this.formBuilder.array([]),
      cpf: [this.paciente.cpf, Validators.required],
      celular: [this.paciente.celular, Validators.required],
      dataNascimento: [this.paciente.dataNascimento, Validators.required],
      email: [this.paciente.email, Validators.required],
      informacaoAtendimento:[this.paciente.informacaoAtendimento, Validators.required]
    })
    this.populateEnderecos();
  }

  populateEnderecos() {
    this.paciente.enderecos.forEach((e: Endereco) => {
      this.enderecos.push(this.formBuilder.group({
        id: [e.id],
        rua: [e.rua,  Validators.required],
        numero: [e.numero, Validators.required],
        bairro: [e.bairro, Validators.required],
        cidade: [e.cidade, Validators.required],
        estado: [e.estado, Validators.required],
      }));
    })
  }

  refreshParent() {
    this.refreshEvent.emit();
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
    return this.pacienteEditForm.get('enderecos') as FormArray;
  }

  addEndereco() {
    this.enderecos.push(this.createEndereco());
  }

  removeEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  onSaveClick(): void {
    console.log(this.pacienteEditForm);

    this.paciente = {...this.paciente, ...this.pacienteEditForm.value};

    if (this.validateEmail(this.paciente.email)) {
      this.invalidEmail = true;
    } else if (this.validateCpf(this.paciente.cpf)) {
      this.invalidCpf = true;
    } else {
      this.pacienteService.putPaciente(this.paciente).subscribe(
        data => {
          console.log(data);
          this.successMsg = true;
          this.closeEditOverlay();
          this.refreshParent();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onDeleteClick(): void {
    this.pacienteService.deletePaciente(this.paciente.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
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

  closeEditOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
