import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/services';
import { provideMockStore } from '@ngrx/store/testing';
import { DemoComponent } from './demo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initialState } from '../../app-state/reducers/todo.reducer';
describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;
  const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTasks', 'addTask', 'deleteTask', 'editTask']);
  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DemoComponent ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy},
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
