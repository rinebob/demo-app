import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-dark-mode-switch',
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DarkModeSwitchComponent {
  @Output() changeTheme = new EventEmitter<void>();

  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOn);
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOn);
    this.changeTheme.emit();
  }

}
