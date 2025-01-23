import { Component, OnInit } from '@angular/core';

enum DragOperationTypes {
  Shape = 0,
  Grid = 1,
}
@Component({
  selector: 'app-human-task',
  templateUrl: './human-task.component.html',
  styleUrls: ['./human-task.component.css'],
})
export class HumanTaskComponent implements OnInit {
  constructor() {}
  mainHeight!: number;
  mainWidth!: number;
  elem!: HTMLElement;

  rotationPoint: number = 0;

  topologyDetails = {
    topologyItems: [
      { id: 1, name: 'Site A', x: 315, y: 220 },
      { id: 2, name: 'Site B', x: 200, y: 150 },
      {
        id: 3,
        name: 'Site C',
        x: 120,
        y: 205,
        z_end: { x: 200, y: 435, connect_with: 'Site D' },
      },
      {
        id: 4,
        name: 'Site D',
        x: 200,
        y: 435,
        z_end: { x: 315, y: 220, connect_with: 'Site A' },
      },
      { id: 5, name: 'Site E', x: 320, y: 365 },
    ] as any,
  };

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.mainHeight = window.innerHeight - 20;
    this.mainWidth = window.innerWidth + 20;
    this.imageZoom('myimage', 'myresult');
  }

  viewBoxSize(x1: number, y1: number, x2: number, y2: number) {
    let pathD: string = x1 + ' ' + y1 + ' ' + x2 + ' ' + y2;
    return pathD;
  }

  constructPathForSite(x1: number, y1: number, x2: number, y2: number) {
    let pathD: string = `M${x1 + 10} ${y1 - 5} L${x2 + 10} ${y2 - 5}`;
    return pathD;
  }

  public dragOperationTypes: typeof DragOperationTypes = DragOperationTypes;
  // selectedElement!: HTMLElement | any;
  lastMouseEvent!: MouseEvent;
  dragOperationType!: DragOperationTypes;
  selectedElement: any = null;
  sX = 0;
  sY = 0;
  pointerDown(
    event: MouseEvent,
    selectedElement: HTMLElement,
    dragOperationTypes: DragOperationTypes,
    siteDetails?: any,
    index?: number
  ) {
    this.lastMouseEvent = event;
    this.selectedElement = selectedElement;
    this.dragOperationType = dragOperationTypes;
    if (siteDetails && (index || index == 0)) {
      // this.siteDetails = {
      //   details: siteDetails,
      //   index: index,
      // };
    }
    event.stopPropagation();
  }

  down(e: any, data: any) {
    const isMouse = !e.type.indexOf('mouse');

    if (isMouse && e.which !== 1 && e.buttons !== 0) {
      return;
    }

    this.selectedElement = data;
    this.sX = e.layerX;
    this.sY = e.layerY;
  }

  up() {
    this.selectedElement = null;
  }

  leave() {
    this.selectedElement = null;
  }

  move(e: any) {
    if (this.selectedElement != null) {
      e.preventDefault();
      this.topologyDetails.topologyItems.forEach(
        (res: { z_end: { connect_with: any; x: any; y: any } }) => {
          if (res.z_end?.connect_with == this.selectedElement.name) {
            (res.z_end.x = e.clientX - 40), (res.z_end.y = e.clientY - 50);
          }
        }
      );
      this.selectedElement.x += e.layerX - this.sX;
      this.selectedElement.y += e.layerY - this.sY;

      this.sX = e.layerX;
      this.sY = e.layerY;
    }
  }

  showDevices(data: any) {
    // clearTimeout(this.siteInterval);
    data.showDevice = true;
    this.setSitesBlur('set');
    this.setCordi(data);
    // this.setupViewForDevices(data, index);
    //this.setCircuitCordinateForDevice(data);
    // this.getCircuitCoordinate();
  }
  setCordi(dom: {
    rect: { x: number; y: number; height: number; width: number };
    x: number;
    y: number;
    cross: any;
  }) {
    dom.rect = {
      x: dom.x - 50,
      y: dom.y - 10,
      height: 40,
      width: 60,
    };
    dom.cross = {
      x: dom.rect.x + dom.rect.width - 10,
      y: dom.rect.y - 5,
    };
  }
  setSitesBlur(type: any) {
    if (type == 'unset') {
      let index = -1;

      let innerIndex = this.topologyDetails.topologyItems.findIndex(
        (x: any) => x.showDevice == true
      );
      if (innerIndex != -1) {
        index = innerIndex;
      }

      if (index == -1) {
        this.topologyDetails.topologyItems.forEach((res: any) => {
          res.showDevice = undefined;
        });
      }
    } else {
      this.topologyDetails.topologyItems.forEach((res: any) => {
        if (res.showDevice != true) {
          res.showDevice = false;
        }
      });
    }
  }

  hideDevice(data: any) {
    data.showDevice = false;
    this.setSitesBlur('unset');
    // this.hideSideDetails();
    // this.getCircuitCoordinate();
  }

  magnify(imgID: string, zoom: number) {
    var img: any,
      glass: HTMLElement,
      result: any,
      w: number,
      h: number,
      bw: number;
    img = document.getElementById(imgID);
    result = document.getElementById('myresult');
    /*create magnifier glass:*/
    glass = document.createElement('DIV');
    glass.setAttribute('class', 'img-magnifier-glass');

    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = 'no-repeat';
    glass.style.backgroundSize =
      img.width * zoom + 'px ' + img.height * zoom + 'px';
    bw = 3;

    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    let cx = result.offsetWidth / glass.offsetWidth;
    let cy = result.offsetHeight / glass.offsetHeight;
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';

    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener('mousemove', moveMagnifier);
    result.addEventListener('mousemove', moveMagnifier);
    img.addEventListener('mousemove', moveMagnifier);
    /*and also for touch screens:*/
    result.addEventListener('touchmove', moveMagnifier);
    glass.addEventListener('touchmove', moveMagnifier);
    img.addEventListener('touchmove', moveMagnifier);
    function moveMagnifier(e: any) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - w / zoom) {
        if (glass.parentNode) {
          glass.parentNode.removeChild(glass);
        }
        // x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        if (glass.parentNode) {
          glass.parentNode.removeChild(glass);
        }
        // y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
      /*set the position of the magnifier glass:*/
      glass.style.left = x - w + 'px';
      glass.style.top = y - h + 'px';
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition =
        '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  imageZoom(imgID: string, resultID: string) {
    var img: any, lens: HTMLElement, result: any, cx: number, cy: number;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement('DIV');
    lens.setAttribute('class', 'img-zoom-lens');
    img.parentElement.insertBefore(lens, img);
    /* Insert lens: */
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    /* And also for touch screens: */
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);
    function moveLens(e: any) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) {
        // if (lens.parentNode) {
        //   lens.parentNode.removeChild(lens);
        // }
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        // if (lens.parentNode) {
        //   lens.parentNode.removeChild(lens);
        // }
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /* Set the position of the lens: */
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      lens.style.border = 'red';
      /* Display what the lens "sees": */
      result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */

      x = e.pageX - a.left;
      y = e.pageY - a.top;

      // /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  onOver() {
    console.log('running');
  }
}
