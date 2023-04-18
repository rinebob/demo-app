import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPanelComponent } from './shop-panel.component';

describe('ShopPanelComponent', () => {
  let component: ShopPanelComponent;
  let fixture: ComponentFixture<ShopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopPanelComponent ]
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
