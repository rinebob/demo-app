import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { KanbanModule } from '../../kanban.module';
import { ColumnSettingsComponent } from './column-settings.component';

describe('ColumnSettingsComponent', () => {
  let component: ColumnSettingsComponent;
  let fixture: ComponentFixture<ColumnSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnSettingsComponent ],
      imports: [ KanbanModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
