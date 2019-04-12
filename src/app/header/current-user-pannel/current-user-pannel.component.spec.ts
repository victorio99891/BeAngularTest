import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserPannelComponent } from './current-user-pannel.component';

describe('CurrentUserPannelComponent', () => {
  let component: CurrentUserPannelComponent;
  let fixture: ComponentFixture<CurrentUserPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
