import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PacienteService} from "../../services/paciente.service";
import {OverlayRef} from "@angular/cdk/overlay";

@Component({
  selector: 'app-paciente-view',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './paciente-view.component.html',
  styleUrl: './paciente-view.component.css'
})
export class PacienteViewComponent {
  @Input() paciente: any;
  @Input() overlayRef: OverlayRef | undefined;

  constructor(private pacienteService: PacienteService) {
  }

  // ngOnInit(): void {
  //   this.getPacienteById(this.paciente.id);
  // }


  getPacienteById(id: number): void {
    this.pacienteService.getPacienteById(id).subscribe(
      data => {
        this.paciente = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  closeViewOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
