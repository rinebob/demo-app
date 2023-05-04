import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AudioModule } from '../../audio.module';
import { ShopPanelComponent } from './shop-panel.component';

describe('ShopPanelComponent', () => {
  let component: ShopPanelComponent;
  let fixture: ComponentFixture<ShopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopPanelComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
