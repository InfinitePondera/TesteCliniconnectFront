import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PacienteTableComponent} from "./paciente-table/paciente-table.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OverlayModule, PacienteTableComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TesteCliniconnectFront';
}
