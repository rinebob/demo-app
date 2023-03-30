import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RINEBOB_EXPERIENCE } from 'src/app/common/constants';
import { ExperienceData } from 'src/app/common/interfaces';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceCardComponent {

  @Input() experience: ExperienceData = RINEBOB_EXPERIENCE[0];
  
  
  readonly RINEBOB_EXPERIENCE = RINEBOB_EXPERIENCE;

}
