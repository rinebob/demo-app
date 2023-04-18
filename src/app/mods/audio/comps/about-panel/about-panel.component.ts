import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-panel',
  templateUrl: './about-panel.component.html',
  styleUrls: ['./about-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPanelComponent {

}
