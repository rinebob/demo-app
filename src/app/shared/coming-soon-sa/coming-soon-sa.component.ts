import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonMetadata } from 'src/app/common/interfaces';
import { COMING_SOON_INITIALIZER } from 'src/app/common/constants';

@Component({
  selector: 'app-coming-soon-sa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coming-soon-sa.component.html',
  styleUrls: ['./coming-soon-sa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComingSoonSaComponent {
  @Input() app: ComingSoonMetadata = COMING_SOON_INITIALIZER;
}
