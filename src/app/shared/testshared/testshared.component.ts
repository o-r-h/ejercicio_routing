import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-testshared',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './testshared.component.html',
  styleUrls: ['./testshared.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsharedComponent { }
