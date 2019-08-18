import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoimComponent } from './moim.component';

describe('MoimComponent', () => {
  let component: MoimComponent;
  let fixture: ComponentFixture<MoimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
