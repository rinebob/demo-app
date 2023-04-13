import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

type ViewMode = 'light' | 'dark' | 'css-tricks';

@Component({
  selector: 'app-three-way-toggle',
  templateUrl: './three-way-toggle.component.html',
  styleUrls: ['./three-way-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeWayToggleComponent {
  @Input() viewMode: ViewMode = 'light';
  @Output() mode = new EventEmitter<ViewMode>();

  updateActiveMode(mode: ViewMode) {
    // console.log('tWT uAM update view mode: ', mode);
    this.viewMode = mode;
    this.mode.emit(mode);
  }

}
