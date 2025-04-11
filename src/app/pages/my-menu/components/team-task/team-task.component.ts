import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit {
  constructor() {}

  name: string = 'rohit';

  // Data Created for tree like structure maybe useful in the future perspective
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

  userFormObj = {
    name: '',
    email: '',
    address: [{ city: '', country: '' }],
  };

  ngOnInit(): void {}

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
}
