import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersteamComponent } from './usersteam.component';

describe('UsersteamComponent', () => {
  let component: UsersteamComponent;
  let fixture: ComponentFixture<UsersteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
