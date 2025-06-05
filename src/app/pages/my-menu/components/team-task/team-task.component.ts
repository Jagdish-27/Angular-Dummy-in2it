import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { STEP_STATE, NgWizardConfig, THEME, NgWizardService } from 'ng-wizard';
import { AsyncSubject, from, of } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
// import Swal from 'sweetalert2';
@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit {
  //#region mirror highlight
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    anchorSettings: {
      anchorClickable: false,
    },
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
  };

  currentStepIndex!: number;

  constructor(
    private ngWizardService: NgWizardService // private spinner: NgxSpinnerService
  ) {}

  name: string = 'rohit';

  //#region Data Created for tree like structure maybe useful in the future perspective
  // Building a Recursive Tree Component
  treeStructure_data = {
    name: 'Root',
    children: [
      { name: 'child 1' },
      {
        name: 'child 2',
        children: [
          {
            name: 'subchild 1',
            children: [
              { name: 'childOfSubChild 1' },
              { name: 'childOfSubChild 2', children: [{ name: 'Got child' }] },
            ],
          },
          { name: 'subchild 2' },
        ],
      },
      {
        name: 'child 3',
      },
    ],
  };

  /// data for comment component will be helpful for managing comment like feature in the future where we have nested replies to a comments

  // Displaying a Recursive Comment Thread
  comment_data = {
    author: 'Jagdish',
    text: 'Text of Jagdish',
    replies: [{ author: 'Himmat', text: 'Himmat has replied', replies: [] }], // Allows sub-replies for the new reply.
  };

  // Creating a Recursive Menu Component with Router Links
  menuItems_data = [
    {
      route: 'Home',
      label: 'Home Route',
      submenu: [
        {
          route: 'Dashboard',
          label: 'Dashboard route',
          submenu: [{ route: 'Table', label: 'Table route', submenu: [] }],
        },
      ],
    },
  ];

  // gender drop down list.. for single select

  genderList: any[] = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'Other', name: 'Other' },
  ];

  sportsList: any[] = [
    { id: 1, name: 'Cricket' },
    { id: 2, name: 'Foot Ball' },
    { id: 3, name: 'Hockey' },
    { id: 4, name: 'Kabaddi' },
    { id: 5, name: 'Volly Ball' },
    { id: 6, name: 'Table Tennis' },
  ];

  userFormObj = {
    name: '',
    gender: '',
    sports: [],
    email: '',
    password: '',
    address: [{ city: '', country: '' }],
  };

  selectSettingsForSports = {
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 3,
  };
  source = from([1, 2, 3, 4, 5]);
  dummyList: any = [
    { id: '1', name: 'Rohit' },
    { id: '2', name: 'Mohit' },
  ];

  idObse = of('1', '2');
  getUserById(id: string) {
    let user = this.dummyList.find((item: any) => item.id == id);
    return of(user);
  }

  // getUser(user: any) {
  //   return of({ id: user.id, position: 'developer' });
  // }
  // userObserver = this.idObse.pipe(
  //   mergeMap((userID) => this.getUserById(userID))
  // );
  // ob = concat(of(1).pipe(delay(400)), of(2));
  ngOnInit(): void {
    // this.ob.subscribe((res: any) => {
    //   console.log('res', res);
    // });
    // this.userObserver.subscribe({
    //   next: (res: any) => {
    //     console.log('response from api', res);
    //   },
    //   error: (error) => {
    //     console.log('error', error);
    //   },
    // });
    this.just();
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: 'You will not be able to recover this imaginary file!',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'No, keep it',
    //   }).then(
    //     function () {
    //       Swal.fire(
    //         'Deleted!',
    //         'Your imaginary file has been deleted.',
    //         'success'
    //       );
    //     },
    //     function (dismiss) {
    //       // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
    //       if (dismiss === 'cancel') {
    //         Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
    //       }
    //     }
    //   );
    // }, 5000);

    console.log(this.check('manualLinksFoUser'));
  }

  get getUserFormArray() {
    return this.userFormObj.address;
  }

  addField() {
    this.getUserFormArray.push({ city: '', country: '' });
  }

  deleteField(i: number) {
    this.getUserFormArray.splice(i, 1);
  }
  onSubmit(_form: NgForm) {
    console.log(this.userFormObj);
  }

  runSettingsOnStart() {
    console.log('log from app initializer');
  }
  value: string = '';
  onSelectChange(event: any) {
    if (event.target.value == 'Add') {
      // this.value = '';
    }
    setTimeout(() => {
      this.value = '';
    });
    // this.onSelectChange('');
  }

  fileSelected: boolean = false;
  file: any = '';
  fileName: string = '';
  errorFileName: any = '';

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      let fileInput = event.target;
      let filePath = fileInput.value;
      let allowExtensions = /(\.xlsx|xls)$/i;
      if (!allowExtensions.exec(filePath)) {
        alert('invalid Format.');
        // Swal.fire({ text: 'invalid Format.', confirmButtonText: 'Ok' }).then(
        //   () => {}
        // );
        fileInput.value = '';
        this.file = null;
        this.fileName = '';
        this.fileSelected = false;
      } else {
        this.fileName = event.target.files[0].name;
        this.file = event.target.files[0];
        this.fileSelected = true;
        fileInput.value = '';
      }
    }
  }

  // downloadSampleFile() {
  //   this.orgService.getOrgGroupTemplateDownload().subscribe({
  //     next: (res: any) => {
  //       saveAs(res, 'Org_sample.xlsx');
  //     },
  //     error: (err: any) => {
  //       Swal.fire({ text: err.error.errorMsg, confirmButtonText: 'OK' });
  //     },
  //   });
  // }

  // uploadOrgGroup() {
  //   const uploadedFile = new FormData();
  //   uploadedFile.append(
  //     'file',
  //     new Blob([this.file], { type: 'xls/xlsx' }),
  //     this.fileName
  //   );
  //   this.orgService.bulkUploadOrgGroup(uploadedFile).subscribe({
  //     next: (res: any) => {
  //       this.bulkUploadInProgress = false;
  //       this.errorView = true;
  //       this.errorFileName = res.body?.filename;
  //       this.successCount = res.body?.Imported;
  //       this.errorCount = res.body?.NotImported;
  //       this.orgService.setUpdateLeftPannet(true);
  //     },
  //     error: (err: any) => {
  //       this.bulkUploadInProgress = false;
  //       this.uploadView = true;
  //       Swal.fire({ text: err.error.errorMsg, confirmButtonText: 'Ok' });
  //     },
  //   });
  // }

  /// ng-wizard

  stepChanged(args: any): void {
    this.currentStepIndex = args.step.index;
  }

  showNextStep() {
    this.ngWizardService.next();
  }

  showPrevStep() {
    this.ngWizardService.previous();
  }

  //// single select

  /**
   * @description method to update singleselect control value
   * @author Jagdish
   * @param {event:any,field:FormControl}
   * @returns void
   */
  updateSingleSelectControl(event: any, field: any): void {
    field.gender = event.id;
    // field = event.id;
    // field.patchValue(event.id);
  }
  /**
   * @description method to get selected country or state data if from is country than call state api
   * @author Jagdish
   * @param {event:any,field:FormControl,from:string}
   * @returns void
   */
  // updateSingleSelect(event: any, field: any, from?: string) {
  //   field.patchValue({ id: event.id, name: event.name });
  //   if (from == 'country') {
  //     this.siteForm.controls.state.patchValue('');
  //     this.siteForm.controls.zip.patchValue('');
  //     this.siteForm.controls.city.patchValue('');
  //     this.siteForm.controls.lat.patchValue('');
  //     this.siteForm.controls.lng.patchValue('');
  //     this.getStateList(event.id);
  //   }
  // }

  /**
   * @description method to update  multiple select control.
   * @author Jagdish
   * @param {Event, formControl}
   * @returns void
   */
  selectItemsFromMultiSelect(event: any, formControl: any, _type?: any) {
    formControl.sports = event;
    // formControl.patchValue(event);
    // if (!type || type != 'sites') {
    //   this.getAllFilteredSites();
    // }
  }

  password: string = '';

  dropdownOpen: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(_event: MouseEvent) {
    this.dropdownOpen = false;
  }

  items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  loadMore() {
    console.log('next api hitted');
    const nextItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${this.items.length + i + 1}`
    );
    this.items = [...this.items, ...nextItems];
  }

  obj = {
    name: 'jagdish',
    id: 1,
    address: {
      city: 'Delhi',
      zipCode: 230,
      contact: {
        phone: '114309867',
      },
    },
  };

  searchQuery!: string;

  check(str: string) {
    let result = str[0].toUpperCase();
    let newStr = str.split('');

    for (let i = 1; i < newStr.length; i++) {
      if (newStr[i] != newStr[i].toUpperCase()) {
        result += newStr[i];
      } else {
        result += ' ' + newStr[i].toUpperCase();
      }
    }
    return result;
  }
  postDate = new Date(2024, 11, 31);

  phoneNumber = '1234567890';
  mask = '(***) ***-****';

  dragBoxLeft = 50;
  dragBoxTop = 50;
  dragBoxWidth = 100;
  dragBoxHeight = 75;

  miniMapWidth = 200;
  miniMapHeight = 150;

  largeViewWidth = 800;
  largeViewHeight = 600;

  private startX = 0;
  private startY = 0;
  private dragging = false;

  // Clean up listeners if needed
  ngOnDestroy(): void {
    this.removeListeners();
  }

  startDrag(event: PointerEvent): void {
    event.preventDefault();
    this.dragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.dragging) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    this.dragBoxLeft = Math.max(
      0,
      Math.min(this.miniMapWidth - this.dragBoxWidth, this.dragBoxLeft + dx)
    );
    this.dragBoxTop = Math.max(
      0,
      Math.min(this.miniMapHeight - this.dragBoxHeight, this.dragBoxTop + dy)
    );

    // Move the large view to match the drag box position
    const scaleX = this.largeViewWidth / this.miniMapWidth;
    const scaleY = this.largeViewHeight / this.miniMapHeight;

    const largeView = document.querySelector('.large-view') as HTMLElement;
    if (largeView) {
      largeView.style.left = `-${this.dragBoxLeft * scaleX}px`;
      largeView.style.top = `-${this.dragBoxTop * scaleY}px`;
    }

    this.startX = event.clientX;
    this.startY = event.clientY;
  };

  private onPointerUp = (): void => {
    this.dragging = false;
    this.removeListeners();
  };

  private removeListeners(): void {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }

  rsubject = new AsyncSubject();

  just() {
    // this.rsubject.next(100);
    // this.rsubject.next(200);
    // this.rsubject.next(300);
    // this.rsubject.next(400);
    // this.rsubject.complete();
    // this.rsubject.subscribe({
    //   next: (val) => {
    //     console.log('a', val);
    //   },
    // });
    // this.bsubject.subscribe({
    //   next: (val) => {
    //     console.log('b', val);
    //   },
    // });
    // # Frok join
    // let req1 = this.http.get('https://jsonplaceholder.typicode.com/todos');
    // let req2 = this.http.get('https://jsonplaceholder.typicode.com/users');
    // forkJoin({ blog: req1, users: req2 }).subscribe({
    //   next: (result) => {
    //     console.log('res', result.blog);
    //     console.log('res', result.users);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
    // let search = document.getElementById('search-input') as HTMLElement;
    // fromEvent(search, 'keyup')
    //   .pipe(
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     switchMap((evet: any) => {
    //       return this.http.get(
    //         `https://api.example.com/search?q=${evet.target.value}`
    //       );
    //     })
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log('search res', res);
    //     },
    //     error: (error) => {
    //       console.log('error', error);
    //     },
    //   });
    // ********** combine latest
    // let req1 = this.http.get('https://jsonplaceholder.typicode.com/todos');
    // let req2 = this.http.get('https://jsonplaceholder.typicode.com/users');
    // combineLatest([req1, req2]).subscribe({
    //   next: ([res1, res2]) => {
    //     console.log('res', res1);
    //     console.log('res2', res2);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
    // forkJoin({ blog: req1, users: req2 }).subscribe({
    //   next: (result) => {
    //     console.log('res', result.blog);
    //     console.log('res', result.users);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  dataFromParent = 'data from parent';

  // prevent button to click multiple times custom logic
  // isFirst = true;
  // onBtnClick() {
  //   if (!this.isFirst) {
  //     return;
  //   } else {
  //     console.log('button click');
  //     this.isFirst = false;

  //     let booleanOb = of(true);

  //     booleanOb.pipe(throttleTime(300)).subscribe((res) => {
  //       this.isFirst = res;
  //     });

  //   }
  // }

  // @ViewChild('btn') onBtnClick!: ElementRef;
  // ngAfterViewInit() {
  //   // const onBtnClick = document.getElementById('btn') as HTMLElement;
  //   fromEvent(this.onBtnClick.nativeElement, 'click')
  //     .pipe(throttleTime(3000))
  //     .subscribe(() => {
  //       console.log('button click');
  //     });
  // }
}
