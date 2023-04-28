import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

interface Skill {
  level: string;
  skill: string;
}
interface Resume {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();

  skills = new FormArray([
    new FormGroup({
      'level': new FormControl(),
      'skill': new FormControl(),
    })
  ]);

  resumeForm = new FormGroup({
    'name': new FormControl(''),
    'skills': this.skills,
  });

  ngOnInit() {
    this.skills.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('fA ngOI skills value changes sub: ', changes);
    });

    this.resumeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('fA ngOI resume form value changes sub: ', changes);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  addSkill() {
    const group = new FormGroup({
      'level': new FormControl(),
      'skill': new FormControl(),
    });
    this.skills.push(group);
  }
  
  insertSkill(index: number) {
    // console.log('fA iS insert skill at index: ', index);
    const group = new FormGroup({
      'level': new FormControl(),
      'skill': new FormControl(),
    });
    this.skills.insert(index, group);
  }
  
  replaceSkill(index: number) {
    // console.log('fA rS replace skill at index: ', index);
    const group = new FormGroup({
      'level': new FormControl(),
      'skill': new FormControl(),
    });
    this.skills.setControl(index, group);
  }

  removeSkill(index: number) {
    // console.log('fA rS remove skill at index: ', index);
    this.skills.removeAt(index);
  }
  
  removeAllSkills() {
    // console.log('fA rAS remove all skills');
    this.skills.clear();
  }

  submitForm() {
    // console.log('fA sF form value: ', this.resumeForm.value);
  }
}
