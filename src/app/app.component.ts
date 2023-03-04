import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  shouldShowOpenSidenavButton = true;

  constructor(private router: Router, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    ) {
    
    // this.matIconRegistry.addSvgIcon(
    //   `logo-light`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/logo-light.svg")
    // );

    // this.matIconRegistry.addSvgIcon(
    //   `icon-light-theme`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-light-theme.svg")
    // );
  }

  
}
