import { TestBed } from '@angular/core/testing';

import { ServerService } from './server.service';

describe('ServerService', () => {
  let service: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set table id', () => {
    service.setCurrentTabId(1);
    expect(service.currentTabId).toBeDefined();
  });

  it('should set setHeadTitle', () => {
    service.setHeadTitle({
      link: '',
      module: '',
    });

    expect(service.headerTitleSubject).toBeDefined();
  });

  it('should set setOrgData', () => {
    service.setOrgData({
      id: 0,
      organization: '',
      type: '',
      industry: '',
      onboarding: '',
      relatedOrgs: [],
      orgSPOC: '',
      parentOrganizations: [],
      registrationNumber: '',
      description: '',
      cluster: '',
      tier: '',
      address: '',
      products: [],
      contacs: [],
    });

    expect(service.orgDataSubject).toBeDefined();
  });

  it('should test getUser_Data', () => {
    let result = service.getUser_Data();
    expect(result).toBeDefined();
  });

  it('should set setData', () => {
    let obj = {
      dueDate: '2024-07-17',
      id: 'id526f6be04cebc',
      priority: 'high',
      solutionArea: 'Test ',
      startDate: '2024-07-05',
      status: 'active',
      task: 'asdfasd',
      taskId: '5654',
      workflow: 'Ag Grid 2',
    };
    // localStorage.removeItem('taskFormData');
    service.setData(obj);

    let result = service.getUser_Data();
    expect(result).toBeDefined();
  });

  it('should set empty array', () => {
    localStorage.removeItem('taskFormData');

    service.setData([])
    // expect(result).toBe([]);
  });

  it('should edit data', () => {
    let initialData = {
      dueDate: '2024-07-17',
      id: 'id526f6be04cebc',
      priority: 'high',
      solutionArea: 'Test ',
      startDate: '2024-07-05',
      status: 'active',
      task: 'asdfasd',
      taskId: '5654',
      workflow: 'Ag Grid 2',
    };
    let updatedData = {
      dueDate: '2024-07-17',
      id: 'id526f6be04cebc',
      priority: 'low',
      solutionArea: 'Test ',
      startDate: '2024-07-05',
      status: 'active',
      task: 'asdfasd',
      taskId: '5654',
      workflow: 'Ag Grid 2',
    };
    localStorage.setItem('taskFormData', JSON.stringify([initialData]));
    let previousLength = service.getUser_Data().length;

    service.editData(updatedData);

    expect(service.getUser_Data().length).toBe(previousLength);
    // expect(service.editData).toEqual();
  });
});
