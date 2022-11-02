import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { TaskService } from 'src/app/services';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const mockGetAllTaskData = {
  success: true,
  data: ['hi', 'there']
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAllTask', 'postNewPareTask', 'postNewSubTask', 'updateSubTask']);
  let getAllTaskSpy = taskServiceSpy.getAllTask.and.returnValue(of(mockGetAllTaskData));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule 
      ],
      declarations: [ HomeComponent ],
      providers: [{provide: TaskService, useValue: taskServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive all tasks', () => {
    expect(component.myTasks).toBeTruthy();
  })
});
