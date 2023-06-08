import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioModule } from '../../audio.module';
import { AboutPanelComponent } from './about-panel.component';
import { By } from '@angular/platform-browser';
import { ABOUT_SECTION_TEXT } from '../../common/au-constants';

describe('AboutPanelComponent', () => {
  let component: AboutPanelComponent;
  let fixture: ComponentFixture<AboutPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPanelComponent ],
      imports: [ AudioModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has an image and text', () => {
    const image = fixture.debugElement.query(By.css('.img'));
    const headline = fixture.debugElement.query(By.css('.about-headline-text'));
    const description = fixture.nativeElement.querySelector('.description-text');

    expect(image).toBeTruthy();
    expect(headline).toBeTruthy();
    expect(description).toBeTruthy();
    expect(description.textContent).toEqual(ABOUT_SECTION_TEXT);
  });
});
