import {Component, Input, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PacienteService} from "../../services/paciente.service";
import {OverlayRef} from "@angular/cdk/overlay";
import {NgxMaskDirective} from "ngx-mask";
import {FormArray, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import {Endereco} from "../../models/endereco";
import {Paciente} from "../../models/paciente";

@Component({
  selector: 'app-paciente-edit',
  standalone: true,
  imports: [
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './paciente-edit.component.html',
  styleUrl: './paciente-edit.component.css'
})
export class PacienteEditComponent {
  @Input() paciente?: any;
  @Input() overlayRef: OverlayRef | undefined;
  invalidEmail: boolean = false;
  invalidCpf: boolean = false;
  successMsg: boolean = false;
  // pacienteEditForm: FormGroup;
  editPacienteForm: Paciente = new Paciente();
  editEndereco1Form: Endereco = new Endereco();
  editEndereco2Form: Endereco = new Endereco();
  editEndereco3Form: Endereco = new Endereco();

  @ViewChild("pacienteForm")
  pacienteForm!: NgForm;

  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder) {
    // this.pacienteEditForm = this.formBuilder.group({})
  }

  ngOnInit():void {
    this.editPacienteForm.id = this.paciente.id;
    this.editPacienteForm.nome = this.paciente.nome;
    this.editPacienteForm.sexo = this.paciente.sexo;
    this.editPacienteForm.enderecos = this.paciente.enderecos;
    this.editEndereco1Form = this.paciente.enderecos[0];
    this.editEndereco2Form = this.paciente.enderecos[1];
    this.editEndereco3Form = this.paciente.enderecos[2];
    console.log(this.paciente.enderecos[1], this.paciente.enderecos[2])
    this.editPacienteForm.email = this.paciente.email;
    this.editPacienteForm.cpf = this.paciente.cpf;
    this.editPacienteForm.celular = this.paciente.celular;
    this.editPacienteForm.informacaoAtendimento = this.paciente.informacaoAtendimento;
  }


  // populateEnderecos() {
  //   this.paciente.enderecos.forEach((e: Endereco) => {
  //     this.enderecos.push({
  //       rua: [e.rua,  Validators.required],
  //       numero: [e.numero, Validators.required],
  //       bairro: [e.bairro, Validators.required],
  //       cidade: [e.cidade, Validators.required],
  //       estado: [e.estado, Validators.required],
  //     });
  //   })
  // }
  //
  // createEndereco(): FormGroup {
  //   return this.formBuilder.group({
  //     rua: ['',  Validators.required],
  //     numero: ['', Validators.required],
  //     bairro: ['', Validators.required],
  //     cidade: ['', Validators.required],
  //     estado: ['', Validators.required],
  //   })
  // }
  //
  // get enderecos(): FormArray {
  //   return this.pacienteEditForm.get('enderecos') as FormArray;
  // }
  //
  // addEndereco() {
  //   this.enderecos.push(this.createEndereco());
  // }
  //
  // removeEndereco(index: number) {
  //   this.enderecos.removeAt(index);
  // }

  onSaveClick(): void {
    this.paciente = this.editPacienteForm;
    if (this.validateEmail(this.paciente.email)) {
      this.invalidEmail = true;
    } else if (this.validateCpf(this.paciente.cpf)) {
      this.invalidCpf = true;
    } else {
      this.pacienteService.putPaciente(this.paciente).subscribe(
        data => {
          console.log(data);
          this.successMsg = true;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onDeleteClick(): void {
    this.paciente = this.editPacienteForm;
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
