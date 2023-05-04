import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AudioModule } from '../../audio.module';
import { ThankYouComponent } from './thank-you.component';
import { CartDialogData } from '../../common/au-interfaces';
import { ORDER_INITIALIZER } from '../../common/au-constants';
import { AUDIO_PRODUCTS } from '../../common/audio-mock-data'

const dialogData: CartDialogData = {
  order: ORDER_INITIALIZER,
  products: [AUDIO_PRODUCTS[0]],
}

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouComponent ],
      imports: [ AudioModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
