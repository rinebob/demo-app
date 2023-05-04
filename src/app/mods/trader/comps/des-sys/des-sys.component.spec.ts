import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderModule } from '../../trader.module';
import { DesignSystemComponent } from './des-sys.component';

describe('DesignSystemComponent', () => {
  let component: DesignSystemComponent;
  let fixture: ComponentFixture<DesignSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignSystemComponent ],
      imports: [ TraderModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
