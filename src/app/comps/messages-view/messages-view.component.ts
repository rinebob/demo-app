import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { MessageService } from 'src/app/services/message.service';
import { LANDING_PAGE_THEME_START_TEXT } from 'src/app/common/constants';
import { AppTheme, Contact } from 'src/app/common/interfaces';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesViewComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>()
  @HostBinding('class') theme = AppTheme.LANDING_PAGE_DARK;

  messagesBS = new BehaviorSubject<Contact[]>([]);
  messages$: Observable<Contact[]> = this.messagesBS;

  displayedColumns = [
    'date',
    'name',
    'email',
    'messageText',
  ];

  constructor(readonly messageService: MessageService, private _overlayContainer: OverlayContainer,) {

    this.applyTheme(this.theme);

    this.messageService.listMessages().pipe(takeUntil(this.destroy$)).subscribe(messages => {

      messages.forEach(message => {
        if (message['date']) {
          // console.log(message['date']);
          const {seconds} = message['date'];
          const formattedDate = new Date(seconds * 1000);
          // console.log(formattedDate);
          message['date'] = formattedDate;

        }
      })

      // console.log('mV ctor messages: ', this.messagesBS.value);
      this.messagesBS.next( messages as Contact[]);
      // console.log('mV ctor messages: ', this.messagesBS.value);

    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyTheme(theme: string): void {
    // remove old theme class and add new theme class
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    // console.log('lP aT container classes pre: ', overlayContainerClasses);
    const themeClassesToRemove = Array.from(overlayContainerClasses)
    .filter((item: string) => item.includes(LANDING_PAGE_THEME_START_TEXT));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    // console.log('lP aT adding theme: ', theme);
    overlayContainerClasses.add(theme);
    // console.log('lP aT container classes post: ', overlayContainerClasses);
  }

}
