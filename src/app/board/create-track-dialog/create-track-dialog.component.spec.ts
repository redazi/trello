import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrackDialogComponent } from './create-track-dialog.component';

describe('CreateTrackDialogComponent', () => {
  let component: CreateTrackDialogComponent;
  let fixture: ComponentFixture<CreateTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrackDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
