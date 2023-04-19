import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbPanelComponent } from './breadcrumb-panel.component';

describe('BreadcrumbPanelComponent', () => {
  let component: BreadcrumbPanelComponent;
  let fixture: ComponentFixture<BreadcrumbPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
