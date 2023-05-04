import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { HomeFeatureComponent } from './home-feature.component';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFeatureComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
