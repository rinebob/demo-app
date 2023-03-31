import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COMING_SOON_INITIALIZER } from 'src/app/common/constants';
import { ComingSoonMetadata } from 'src/app/common/interfaces';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComingSoonComponent {
  @Input() app: ComingSoonMetadata = COMING_SOON_INITIALIZER;

}
