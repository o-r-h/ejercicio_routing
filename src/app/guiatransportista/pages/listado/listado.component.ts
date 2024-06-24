import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'guiatransportista-listado',

  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoGuiaTransportistaComponent { }
