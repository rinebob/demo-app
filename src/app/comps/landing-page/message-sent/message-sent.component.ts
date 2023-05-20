import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-sent',
  templateUrl: './message-sent.component.html',
  styleUrls: ['./message-sent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageSentComponent {

  constructor(public dialogRef: MatDialogRef<MessageSentComponent>) {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
