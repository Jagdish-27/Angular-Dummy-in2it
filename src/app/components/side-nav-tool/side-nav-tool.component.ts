import { Component, OnInit } from '@angular/core';
import { Nav_List_Data } from 'src/app/interfaces/Product';
import { ServerService } from 'src/app/services/server.service';
@Component({
  selector: 'app-side-nav-tool',
  templateUrl: './side-nav-tool.component.html',
  styleUrls: ['./side-nav-tool.component.css']
})
export class SideNavToolComponent implements OnInit {

  constructor(private serverService:ServerService) { }

  sideNavOpen:boolean = true;

  nav_list_data:Nav_List_Data = {
    my_menu:['My Task','Team Task'],
    settings:['Custom Task','Organization Settings'],
    my_organization:['Organization','Contact','Solution Areas','Process','Workflows','Human Task','Workflows Execution','Schedule List'],
    designer:['Workflow Builder','Form Builder','Charts'],
    tables:['Products'],
  }

  // Mapping object to associate menu items with their corresponding icon names
  iconMappings: { [key: string]: string } = {
    'My Task': 'user',
    'Team Task': 'users',
    'Custom Task': 'settings',
    'Organization Settings': 'settings',
    'Organization':'life-buoy',
    'Contact':'mail',
    'Solution Areas': 'box',
    'Process': 'zap',
    'Workflows': 'activity',
    'Human Task': 'user-check',
    'Workflows Execution': 'zap-off',
    'Schedule List': 'calendar',
    'Workflow Builder': 'grid',
    'Form Builder': 'layout',
    'Charts': 'activity',
    'Products':'box',
  };


  ngOnInit(): void {
  }


  onIconClick(){
    this.sideNavOpen = !this.sideNavOpen;
  }

  emitRoutes(link:string,module:string){
    link = link.toLowerCase();
    this.serverService.setHeadTitle({link,module});
  }

}
