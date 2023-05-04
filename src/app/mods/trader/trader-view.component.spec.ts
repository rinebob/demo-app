import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TraderModule } from './trader.module';
import { TraderViewComponent } from './trader-view.component';

describe('TraderViewComponent', () => {
  let component: TraderViewComponent;
  let fixture: ComponentFixture<TraderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraderViewComponent ],
      imports: [ TraderModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
