import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-agregar',

  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgregarTransporteComponent { }
