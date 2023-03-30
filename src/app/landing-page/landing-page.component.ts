import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Assignment, ExperienceData, ProjectData, SkillData } from 'src/app/common/interfaces';
import { RINEBOB_EXPERIENCE, RINEBOB_PROJECTS, RINEBOB_SKILLS, WELCOME_BUTTONS } from 'src/app/common/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {

  readonly RINEBOB_SKILLS = RINEBOB_SKILLS;
  readonly RINEBOB_EXPERIENCE = RINEBOB_EXPERIENCE;
  readonly RINEBOB_PROJECTS = RINEBOB_PROJECTS;
  readonly WELCOME_BUTTONS = WELCOME_BUTTONS;

}
