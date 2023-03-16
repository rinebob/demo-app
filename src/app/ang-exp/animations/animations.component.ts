import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  
} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class AnimationsComponent {

}
