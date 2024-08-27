import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PacientesTable} from "./PacientesTable/PacientesTable.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PacientesTable],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TesteCliniconnectFront';
}
