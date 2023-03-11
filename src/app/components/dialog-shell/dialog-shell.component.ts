import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dialog-shell',
  templateUrl: './dialog-shell.component.html',
  styleUrls: ['./dialog-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogShellComponent {
  @HostBinding('class') theme = 'kanban-light-theme';

}
