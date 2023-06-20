import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PRODUCT_FEEDBACK_APP_COLOR_SPECS, PRODUCT_FEEDBACK_APP_TYPOGRAPHY_SPECS } from 'src/app/common/constants';
import { AppTheme, TypographySpec } from 'src/app/common/interfaces';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignSystemComponent {
  @HostBinding('class') theme = AppTheme.APP_LIGHT;

  
  readonly PRODUCT_FEEDBACK_APP_COLOR_SPECS = PRODUCT_FEEDBACK_APP_COLOR_SPECS;
  readonly PRODUCT_FEEDBACK_APP_TYPOGRAPHY_SPECS = PRODUCT_FEEDBACK_APP_TYPOGRAPHY_SPECS;



  generateSpecText(spec: TypographySpec): string {
    // console.log('dS gST spec: ', spec);
    
    const specText = `${spec.typographyLevel} - ${spec.cssClasses.fontFamily} | ${spec.cssClasses.fontSize}/${spec.cssClasses.lineHeight}${spec.cssClasses.letterSpacing ? ' | ' + spec.cssClasses.letterSpacing : ''}`;
    
    // console.log('dS gST specText: ', specText);

    return specText;



  }
}
