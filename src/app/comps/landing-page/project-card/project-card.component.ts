import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RINEBOB_PROJECTS } from 'src/app/common/constants';
import { ProjectData } from 'src/app/common/interfaces';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  @Input() project: ProjectData = RINEBOB_PROJECTS[0];

  constructor(private router: Router) {

  }
}
