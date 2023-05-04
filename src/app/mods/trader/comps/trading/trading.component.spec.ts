import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderModule } from '../../trader.module';
import { TradingComponent } from './trading.component';

describe('TradingComponent', () => {
  let component: TradingComponent;
  let fixture: ComponentFixture<TradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingComponent ],
      imports: [ TraderModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
