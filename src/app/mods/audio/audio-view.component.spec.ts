import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from './audio.module';
import { AudioViewComponent } from './audio-view.component';
import { MockInstance } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../testing/test-utils';

describe('AudioViewComponent', () => {
  let component: AudioViewComponent;
  let fixture: ComponentFixture<AudioViewComponent>;

  // MockInstance.scope();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioViewComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has nav header component', () => {
    const navHeader = findComponent(fixture, 'app-nav-header');
    expect(navHeader).toBeTruthy();

  });

  it('has nav footer component', () => {
    const navFooter = findComponent(fixture, 'app-nav-footer');
    expect(navFooter).toBeTruthy();

  });

});
