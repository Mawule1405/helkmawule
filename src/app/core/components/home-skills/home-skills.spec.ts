import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSkills } from './home-skills';

describe('HomeSkills', () => {
  let component: HomeSkills;
  let fixture: ComponentFixture<HomeSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
