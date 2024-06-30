import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error404page',
  templateUrl: './error404page.component.html',
  styleUrls: ['./error404page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404pageComponent { }
