import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef  } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CATEGORIES, NAV_BUTTONS } from '../../common/au-constants';
import { AppText, CartDialogData } from '../../common/au-interfaces';

@Component({
  selector: 'app-shop-panel',
  templateUrl: './shop-panel.component.html',
  styleUrls: ['./shop-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopPanelComponent implements OnInit {
  @Input() url:string;
  
  private navMenuDialogRef: MatDialogRef<ShopPanelComponent>;
  private triggerElementRef: ElementRef;
  
  readonly CATEGORIES = CATEGORIES;
  readonly NAV_BUTTONS = NAV_BUTTONS;
  readonly AppText = AppText;

  dialogMode = false;

  constructor(readonly router: Router, @Optional() readonly dialogRef: MatDialogRef<ShopPanelComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data: CartDialogData,
    ) {
      this.navMenuDialogRef = dialogRef;
      if (data && data.ref) {
        this.triggerElementRef = data.ref;
        this.url = './audio'
        this.dialogMode = true;

      }

  }

  ngOnInit() {
    this.setDialogPosition();
  }

  setDialogPosition() {
    if (this.triggerElementRef) {
      const config: MatDialogConfig = new MatDialogConfig();
      const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
      // console.log('sP sDP rect: ', rect);

      config.position = { left: `${rect.left}px`, top: `${rect.bottom}px`};
      config.width = `${rect.right - rect.left}px`;
      
      // console.log('sP sDP width: ', config.width);
      
      
      this.navMenuDialogRef.updateSize(config.width, config.height);
      this.navMenuDialogRef.updatePosition(config.position);
    }
  }

  handleNavigation(category: string) {
    // console.log('sP hN navigate to category: ', category);
    this.navMenuDialogRef.close(category);
  }

}
