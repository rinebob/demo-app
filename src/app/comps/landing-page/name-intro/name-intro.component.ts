import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-name-intro',
  templateUrl: './name-intro.component.html',
  styleUrls: ['./name-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameIntroComponent {

}
