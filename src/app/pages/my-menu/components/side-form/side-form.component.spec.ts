import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFormComponent } from './side-form.component';


describe('SideFormComponent', () => {
  let component: SideFormComponent;
  let fixture: ComponentFixture<SideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnChanges',()=>{
    const mockGridOptions = {
      context:{
        componentParent:{isEditable:true}
      }
    }
    component.item = {id:1,name:'jagdish'};
    component.itemIndex = 1;

    component.gridOptions = mockGridOptions;

    component.ngOnChanges();

    expect(component.item).toBeDefined();

  })

  it('should test when item is undefined ',()=>{
    component.item = undefined;

    component.ngOnChanges();

    expect(component.item).toBeUndefined();
  });

  it('should generate unique ID and patch it into the form control', () => {

    component.generateUniqueId();

    const idControl = component.task_form.get('id');

    expect(idControl?.value).toBeDefined()
  });

  it('should test for undefined form id',()=>{

    component.task_form.removeControl('id');
    
    component.generateUniqueId();

    expect(component.task_form.controls['id']).toBeUndefined();
  })

  describe('onForm_Submit()',()=>{
    
    it('should test submit form for valid',()=>{
      component.isEditable = true;
      let form_Data = {
        id: 123452,
        solutionArea: 'NewArea',
        workflow: 'flow',
        taskId: '1234',
        task: 'nothing',
        status: 'VALID',
        startDate: '15/05/2024',
        dueDate: '15/05/2024',
        priority: 'high',
      }
      component.task_form.patchValue(form_Data)
      component.onForm_Submit();

      expect(component.task_form).toBeDefined()
    })

    it('should test submit on invalid form',()=>{
      let form_Data = {
        id: null,
        solutionArea: 'NewArea',
        workflow: 'flow',
        taskId: '1234',
        task: 'nothing',
        status: 'VALID',
        startDate: '15/05/2024',
        dueDate: '15/05/2024',
        priority: 'high',
      }

      component.task_form.patchValue(form_Data)
      component.onForm_Submit();
      expect(component.task_form.controls['id']).toBeNull;

      // another test case 
      let form_Data1 = {
        id: null,
        solutionArea: '',
        workflow: 'flow',
        taskId: '1234',
        task: 'nothing',
        status: 'VALID',
        startDate: '15/05/2024',
        dueDate: '15/05/2024',
        priority: 'high',
      }
      component.task_form.patchValue(form_Data1)
      component.onForm_Submit();
      expect(component.task_form.valid).toBeFalse();

    })

    it('should test id for optinal chaining',()=>{
      component.task_form.removeControl('id');

      let form_Data = {
        solutionArea: 'NewArea',
        workflow: 'flow',
        taskId: '1234',
        task: 'nothing',
        status: 'VALID',
        startDate: '15/05/2024',
        dueDate: '15/05/2024',
        priority: 'high',
      }

      component.task_form.patchValue(form_Data)
      component.onForm_Submit();
      expect(component.task_form.controls['id']).toBeUndefined();
    })
  })

  it('should test closeSideForm',()=>{
    component.closeSideForm();
    expect(component.closeSideForm).toBeDefined()
  })

  it('should test onClear_click',()=>{
    component.item = null;
    component.onClear_click();
    expect(component.item).toBeNull();

    component.item = {};
    component.onClear_click();
    expect(component.item).toEqual({});
  })
});

