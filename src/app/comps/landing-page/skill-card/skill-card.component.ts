import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkillData } from 'src/app/common/interfaces';
import { RINEBOB_SKILLS } from 'src/app/common/constants';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillCardComponent {
  @Input() skill: SkillData = RINEBOB_SKILLS[0];
}
