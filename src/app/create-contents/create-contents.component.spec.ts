import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentsComponent } from './create-contents.component';

describe('CreateContentsComponent', () => {
  let component: CreateContentsComponent;
  let fixture: ComponentFixture<CreateContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
