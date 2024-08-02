import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-task-list-data',
  templateUrl: './task-list-data.component.html',
  styleUrls: ['./task-list-data.component.css'],
})
export class TaskListDataComponent implements OnInit {
  constructor(private server:ServerService, public overlayService:OverlayService,) {}

  currentPage: number = 1;
  itemsPerPage: number = 5;

  isSideNavForm_Open: boolean = false;
  tableData: any[] = [];
  onListDataChange!:boolean;
  reset:boolean=false

  item:any;
  itemIndex!:number;

  isEditable:boolean = false;
  // reset:boolean=false

  // tableData:any[]= [
  //     {
  //       "Id": 1,
  //       "solutionArea": "Sales",
  //       "workflow": "Lead Generation",
  //       "taskId": "TASK001",
  //       "task": "Identify potential leads",
  //       "status": "In Progress",
  //       "startDate": "2024-05-02",
  //       "dueDate": "2024-05-10",
  //       "priority": "High"
  //     },
  //     {
  //       "Id": 2,
  //       "solutionArea": "Marketing",
  //       "workflow": "Content Creation",
  //       "taskId": "TASK002",
  //       "task": "Write blog post",
  //       "status": "Pending",
  //       "startDate": "2024-05-01",
  //       "dueDate": "2024-05-05",
  //       "priority": "Medium"
  //     },
  //     {
  //       "Id": 3,
  //       "solutionArea": "Human Resources",
  //       "workflow": "Recruitment",
  //       "taskId": "TASK003",
  //       "task": "Conduct job interviews",
  //       "status": "Completed",
  //       "startDate": "2024-04-15",
  //       "dueDate": "2024-04-30",
  //       "priority": "Low"
  //     },
  //     {
  //       "Id": 4,
  //       "solutionArea": "Finance",
  //       "workflow": "Budgeting",
  //       "taskId": "TASK004",
  //       "task": "Review financial statements",
  //       "status": "In Progress",
  //       "startDate": "2024-05-03",
  //       "dueDate": "2024-05-12",
  //       "priority": "High"
  //     },
  //   ]

  ngOnInit(): void {
    this.tableData =this.server.getUser_Data();
  }

  onDataListUpdate(data:any){
    this.server.setData(data);
    this.tableData = this.server.getUser_Data();
  }

  toggleSideForm() {
    this.item = null;
    this.reset=true
    this.isSideNavForm_Open = true
    this.overlayService.openOverlay();
    this.isEditable = false;

    
  }

  deleteUser(id:number){
    const permit = confirm('Do you really want to delete?');
    if(permit){
      this.tableData = this.tableData.filter((value)=> value.id !== id);
      localStorage.setItem('taskFormData',JSON.stringify(this.tableData))
    }
    
  }

  editItem(data:any,i:number){
    this.isSideNavForm_Open=true
    this.item = data;
    this.itemIndex = i;
    this.isEditable = true;
    this.overlayService.openOverlay();
  }

  updatedData(data:any){
    this.tableData = this.server.editData(data)
    this.isSideNavForm_Open = false;
  }

  closeForm(event:string){
    if(event=="closeForm"){
      this.item=null
      this.isSideNavForm_Open=false
    }

  }


  onOverlayClick(){
    this.item = null
    this.isSideNavForm_Open = false;
    this.overlayService.closeOverlay();
  }
  
}
