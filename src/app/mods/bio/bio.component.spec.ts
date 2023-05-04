import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioModule } from './bio.module';
import { BioComponent } from './bio.component';

describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioComponent ],
      imports: [ BioModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
