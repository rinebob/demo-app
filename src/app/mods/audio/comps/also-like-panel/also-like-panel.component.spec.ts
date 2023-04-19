import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoLikePanelComponent } from './also-like-panel.component';

describe('AlsoLikePanelComponent', () => {
  let component: AlsoLikePanelComponent;
  let fixture: ComponentFixture<AlsoLikePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlsoLikePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlsoLikePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
