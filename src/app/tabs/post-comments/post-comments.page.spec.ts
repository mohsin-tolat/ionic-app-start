import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCommentsPage } from './post-comments.page';

describe('PostCommentsPage', () => {
  let component: PostCommentsPage;
  let fixture: ComponentFixture<PostCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
