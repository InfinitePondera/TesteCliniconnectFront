import {Component} from '@angular/core';
import {PacienteService} from "../../services/paciente.service";
import {NgForOf} from "@angular/common";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {PacienteViewComponent} from "../paciente-view/paciente-view.component";
import {PacienteEditComponent} from "../paciente-edit/paciente-edit.component";
import {PacienteCreateComponent} from "../paciente-create/paciente-create.component";

@Component({
  selector: 'app-paciente-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './paciente-table.component.html',
  styleUrl: './paciente-table.component.css'
})
export class PacienteTableComponent {
  pacientes: any;
  currentPage = 1;
  totalItems = 0;
  pageSize = 10;
  totalPages = 0;
  private overlayRef: OverlayRef | undefined;

  constructor(private pacienteService: PacienteService, private overlay: Overlay) {
  }

  ngOnInit(): void {
    this.getPacientesPaginated();
  }

  onSearch(searchString: string) {
    if (searchString) {
      this.pacientes = this.pacienteService.getPacientesSearch(searchString).subscribe(
        data => {
          console.log(data);
          this.pacientes = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.getPacientesPaginated();
    }
  }

  onRefresh() {
    this.getPacientesPaginated();
  }

  openViewOverlay(paciente: any) {
    const overlayConfig = this.overlay.position().global().centerVertically().centerHorizontally();

    this.overlayRef = this.overlay.create({positionStrategy: overlayConfig});

    const overlayPortal = new ComponentPortal(PacienteViewComponent);
    const componentRef = this.overlayRef.attach(overlayPortal);
    componentRef.instance.paciente = paciente;
    componentRef.instance.overlayRef = this.overlayRef;
  }

  openEditOverlay(paciente: any) {
    const overlayConfig = this.overlay.position().global().centerVertically().centerHorizontally();
    this.overlayRef = this.overlay.create({positionStrategy: overlayConfig});

    const overlayPortal = new ComponentPortal(PacienteEditComponent);
    const componentRef = this.overlayRef.attach(overlayPortal);
    componentRef.instance.paciente = paciente;
    componentRef.instance.overlayRef = this.overlayRef;
    componentRef.instance.refreshEvent.subscribe(() => {
      this.onRefresh();
    })
  }

  openCreateOverlay() {
    const overlayConfig = this.overlay.position().global().centerVertically().centerHorizontally();
    this.overlayRef = this.overlay.create({positionStrategy: overlayConfig});

    const overlayPortal = new ComponentPortal(PacienteCreateComponent);
    const componentRef = this.overlayRef.attach(overlayPortal);
    componentRef.instance.overlayRef = this.overlayRef;
  }

  getPacientesPaginated(): void {
    this.pacienteService.getPacientesPaginated(this.pageSize, this.currentPage-1)
      .subscribe(
        data => {
          console.log(data);
          this.pacientes = data.content;
          this.totalPages = data.totalPages;
          this.totalItems = data.totalElements;
        },
        error => {
          console.log(error);
        }
      )
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
    this.getPacientesPaginated();
  }
}
