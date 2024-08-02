import {  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from 'src/app/services/overlay.service';
import { ServerService } from 'src/app/services/server.service';

import { noSpaceValidator } from '../../../../validators/noSpaceAllowed'

@Component({
  selector: 'app-side-form',
  templateUrl: './side-form.component.html',
  styleUrls: ['./side-form.component.css'],
})
export class SideFormComponent implements OnInit, OnChanges {

  constructor(private server:ServerService, private overlayService:OverlayService) {}
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  isScroll:boolean = false;
  
  disable:boolean = true;
  @Input() isSideNavForm_Open: boolean = false;
  @Input() reset: boolean = false;
  // @Input() reset: boolean = false;
  @Input() sideFormData: any = [];

  @Input() item:any;
  @Input() itemIndex?:number;
  @Output() closeForm:EventEmitter<any>=new EventEmitter<any>();

  @Input()isEditable?:boolean;;
  editingIndex?:number;

  @Output() booleanEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateDataEvent: EventEmitter<any> = new EventEmitter<any>();

  tableData: any[] = [
    
  ];
  date:any;
  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0,10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.item){
      this.task_form.patchValue(this.item);
      this.editingIndex = this.itemIndex
    }else{
      this.task_form.reset();
    }
  }


  task_form = new FormGroup({
    id: new FormControl({ value: '', disabled: true },),
    solutionArea: new FormControl('',[Validators.required]),
    workflow: new FormControl('',[Validators.required]),
    taskId: new FormControl('',[Validators.required,noSpaceValidator()]),
    task: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required]),
    startDate: new FormControl('',[Validators.required]),
    dueDate: new FormControl('',[Validators.required]),
    priority: new FormControl('',[Validators.required]),
  });


  generateUniqueId() {
    const id = 'id' + Math.random().toString(16).slice(2);
    this.task_form.get('id')?.patchValue(id);
  }
  onForm_Submit() {
    if (this.task_form.valid) {
      const form_Data = {...this.task_form.value,id:this.task_form.get('id')?.value};
      if(this.isEditable){
        this.isSideNavForm_Open = true
        this.updateDataEvent.emit(form_Data);
        this.isEditable = false;
      }else{
        this.closeForm.emit("closeForm")
        this.booleanEvent.emit(form_Data)
      }
      this.isEditable = false;
     this.task_form.reset();
     this.overlayService.closeOverlay();

    }else{
      let key=Object.keys(this.task_form.controls)
     
      key.map(val=>{
        let control=this.task_form.controls[val as keyof typeof this.task_form.controls]
        if(control.errors){
          control.markAsTouched()
          // console.log(control.markAllAsTouched())
        }
      })
    }
    this.isSideNavForm_Open = false;
  }

  updateItem(index:number, newItem:string){
    this.tableData = this.server.getUser_Data();
    this.tableData[index] = newItem;
    this.server.setData(this.tableData);
  }

  closeSideForm(){
    this.isSideNavForm_Open = false;
    // this.item=null
    this.task_form.reset();
    this.closeForm.emit("closeForm")
    this.overlayService.closeOverlay()
  }

  
  onClear_click(){
    if(!this.item){
      this.task_form.reset();
    }else{
      this.task_form.patchValue({
      solutionArea: '',
      workflow: '',
      taskId: '',
      task: '',
     status: '',
      startDate: '',
      dueDate: '',
     priority:'',
      })
    }
  }

}
