import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { AudioModule } from '../../audio.module';
import { CategoryPageComponent } from './category-page.component';
import { AUDIO_PRODUCTS } from '../../common/audio-mock-data';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let activatedRouteMock = {
    paramMap: new BehaviorSubject<ParamMap>(
      convertToParamMap({id: "headphones"})
    ),
    data: of([AUDIO_PRODUCTS[0]]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPageComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: activatedRouteMock } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
