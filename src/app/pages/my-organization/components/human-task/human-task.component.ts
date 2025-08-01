import { Component, OnInit } from '@angular/core';

export enum DragOperationTypes {
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
      { id: 5, name: 'Site E', x: 320, y: 965 },
      { id: 5, name: 'Site F', x: 2000, y: 365 },
      { id: 5, name: 'Site G', x: 320, y: 2265 },
      { id: 5, name: 'Site H', x: 920, y: 365 },
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

  constructPathForSite(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type?: string
  ): string {
    if (type === 'zigzag') {
      const segments = 12; // Number of zigzag points
      const amplitude = 15; // Zigzag height (how far it goes up/down)

      // Calculate increments per segment
      let dx = (x2 - x1) / segments;
      let dy = (y2 - y1) / segments;

      let path = `M${x1} ${y1}`;

      for (let i = 1; i <= segments; i++) {
        // Alternate offset up and down on a direction perpendicular to the line

        // Find the unit vector along the line
        let length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        let ux = (x2 - x1) / length;
        let uy = (y2 - y1) / length;

        // Find perpendicular vector (rotated 90 degrees)
        let px = -uy;
        let py = ux;

        // Alternate sign of offset to create zigzag effect
        let sign = i % 2 === 0 ? 1 : -1;

        // Calculate zigzag point position
        let x = x1 + dx * i + px * amplitude * sign;
        let y = y1 + dy * i + py * amplitude * sign;

        path += ` L${x} ${y}`;
      }

      return path;
    }

    // Default straight line
    return `M${x1} ${y1} L${x2} ${y2}`;
  }

  // constructPathForSite(x1: number, y1: number, x2: number, y2: number) {
  //   let pathD: string = `M${x1 + 10} ${y1 - 5} L${x2 + 10} ${y2 - 5}`;
  //   return pathD;
  // }

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
    lens.style.width = (window.innerWidth + 20 - 50).toString() + 'px';
    lens.style.height = (window.innerHeight - 20 - 88).toString() + 'px';
    img.parentElement.insertBefore(lens, img);
    /* Insert lens: */
    /* Calculate the ratio between result DIV and lens: */
    let rect = result.getBoundingClientRect();
    let imgRect = img.getBoundingClientRect();

    cx = rect.width / lens.offsetWidth;
    cy = rect.height / lens.offsetHeight;

    /* Set background properties for the result DIV */
    // result.style.backgroundImage = "url('" + img.src + "')";

    result.style.backgroundSize =
      imgRect.width * cx + 'px ' + imgRect.height * cy + 'px';

    // this.viewBoxSize(
    //   +(imgRect.width * cx + 'px'),
    //   +(imgRect.height * cy + 'py'),
    //   this.mainWidth - 50,
    //   this.mainHeight - 88
    // );
    // this.cdr.detectChanges();

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

      /* Display what the lens "sees": */
      // document.getElementById('myresult')?.removeAttribute('viewBox');
      // document
      //   .getElementById('myresult')
      //   ?.setAttribute(
      //     'viewBox',
      //     `${x} ${y} ${window.innerWidth + 20 - 50} ${
      //       window.innerHeight - 20 - 88
      //     }`
      //   );
      // result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
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
      document.getElementById('myresult')?.removeAttribute('viewBox');
      document
        .getElementById('myresult')
        ?.setAttribute(
          'viewBox',
          `${x} ${y} ${window.innerWidth + 20 - 50} ${
            window.innerHeight - 20 - 88
          }`
        );
      return { x: x, y: y };
    }
  }

  // zoom in zoom out
  //   var svgCanvas = document.getElementById("canvas");
  // var viewPort = document.getElementById("viewport");
  drag = false;
  offset = { x: 0, y: 0 };
  factor = 0.1;
  matrix = new DOMMatrix();
  mouseWheel(event: WheelEvent) {
    let viewPort = document.getElementById('viewport') as HTMLElement;
    var zoom = event.deltaY > 0 ? -1 : 1;
    var scale = 1 + this.factor * zoom;
    this.offset = {
      x: event.offsetX,
      y: event.offsetY,
    };
    this.matrix.preMultiplySelf(
      new DOMMatrix()
        .translateSelf(this.offset.x, this.offset.y)
        .scaleSelf(scale, scale)
        .translateSelf(-this.offset.x, -this.offset.y)
    );
    viewPort.style.transform = this.matrix.toString();
  }

  // zoom in zoom out functionality ********************- using SCALING
  // refreshTopology() {
  //   this.topologyData = JSON.parse(JSON.stringify(this.topologyViewData));
  //   this.actualZoom = 1;
  //   this.svgGrid.nativeElement.style.transform = `scale(1)`;
  //   this.mouseWheelActivity = null;
  //   this.getCircuitCoordinate();
  // }
  // /**
  //  * @description this method use to manage zoom in and zoom out on mouseWheel
  //  * @author Jagdish
  //  * @params {wheelEvent: WheelEvent}
  //  * @retunrs :void
  //  */
  // mouseWheel(wheelEvent: WheelEvent) {
  //   this.hideSideDetails();
  //   wheelEvent?.stopPropagation();

  //   const zoomScale = 1.1;
  //   let zoomDirection = wheelEvent.deltaY;
  //   if (this.mouseWheelActivity) {
  //     wheelEvent = this.mouseWheelActivity;
  //   } else {
  //     this.mouseWheelActivity = wheelEvent;
  //   }

  //   let zoomX = wheelEvent.offsetX;
  //   let zoomY = wheelEvent.offsetY;

  //   let currentScale: any = this.svgGrid.nativeElement.style.transform;
  //   currentScale = currentScale
  //     ? parseFloat(currentScale.split('(')[1].split(')')[0])
  //     : 1;

  //   let newScale: number;

  //   if (zoomDirection <= 0) {
  //     newScale = currentScale * zoomScale;
  //   } else {
  //     if (currentScale <= 1) {
  //       this.mouseWheelActivity = null;
  //       return;
  //     }
  //     newScale = currentScale / zoomScale;
  //   }

  //   this.svgGrid.nativeElement.style.transform = `scale(${newScale})`;

  //   const transformOriginX =
  //     (zoomX / this.svgGrid.nativeElement.clientWidth) * 100;
  //   const transformOriginY =
  //     (zoomY / this.svgGrid.nativeElement.clientHeight) * 100;
  //   this.svgGrid.nativeElement.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
  // }

  // zoomIn() {
  //   this.applyZoom(-1);
  // }

  // zoomOut() {
  //   this.applyZoom(1);
  // }
  /**
   * @description this method use to manage zoom in and zoom out on button click
   * @author Jagdish
   * @params {direction: number}
   * @retunrs :void
   */
  // applyZoom(direction: number) {
  //   this.hideSideDetails();

  //   const zoomScale = 1.1;
  //   let zoomDirection = direction;
  //   let wheelEvent = this.mouseWheelActivity || {
  //     offsetX: this.svgGrid.nativeElement.clientWidth / 2,
  //     offsetY: this.svgGrid.nativeElement.clientHeight / 2,
  //   };

  //   if (!this.mouseWheelActivity) {
  //     this.mouseWheelActivity = wheelEvent;
  //   }

  //   let zoomX = wheelEvent.offsetX;
  //   let zoomY = wheelEvent.offsetY;

  //   let currentScale: any = this.svgGrid.nativeElement.style.transform;
  //   currentScale = currentScale
  //     ? parseFloat(currentScale.split('(')[1].split(')')[0])
  //     : 1;

  //   let newScale: number;

  //   if (zoomDirection <= 0) {
  //     newScale = currentScale * zoomScale;
  //   } else {
  //     // Prevent zooming out too much
  //     if (currentScale <= 1) {
  //       this.mouseWheelActivity = null;
  //       return;
  //     }
  //     newScale = currentScale / zoomScale;
  //   }

  //   this.svgGrid.nativeElement.style.transform = `scale(${newScale})`;

  //   const transformOriginX =
  //     (zoomX / this.svgGrid.nativeElement.clientWidth) * 100;
  //   const transformOriginY =
  //     (zoomY / this.svgGrid.nativeElement.clientHeight) * 100;
  //   this.svgGrid.nativeElement.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
  // }

  /// zoom in and out using Approach using Viewbox*************************%
  // mouseWheel(wheelEvent: WheelEvent) {
  //   this.hideSideDetails();
  //   wheelEvent?.stopPropagation();
  //   const zoomScale = 1.1;
  //   let zoomDirection = wheelEvent.deltaY;
  //   if (this.mouseWheelActivity) {
  //     wheelEvent = this.mouseWheelActivity;
  //   } else {
  //     this.mouseWheelActivity = wheelEvent;
  //   }

  //   let zoomX = wheelEvent.offsetX;
  //   let zoomY = wheelEvent.offsetY;

  //   let scaledViewBoxWidth;
  //   let scaledViewBoxHeight;
  //   let scaledViewBoxX;
  //   let scaledViewBoxY;
  //   let zoomLeftFraction = zoomX / this.svgGrid.nativeElement.clientWidth;
  //   let zoomTopFraction = zoomY / this.svgGrid.nativeElement.clientHeight;
  //   let [viewboxX, viewboxY, viewboxWidth, viewboxHeight]: any = this.svgGrid.nativeElement
  //     .getAttribute("viewBox")
  //     ?.split(" ")
  //     .map((s) => parseFloat(s));

  //   if (zoomDirection <= 0) {
  //     this.actualZoom++;
  //     scaledViewBoxWidth = viewboxWidth / zoomScale;
  //     scaledViewBoxHeight = viewboxHeight / zoomScale;

  //     scaledViewBoxX = viewboxX + (viewboxWidth - scaledViewBoxWidth) * zoomLeftFraction;
  //     scaledViewBoxY = viewboxY + (viewboxHeight - scaledViewBoxHeight) * zoomTopFraction;
  //   } else {
  //     if (this.actualZoom <= 1) {
  //       this.mouseWheelActivity = null;
  //       return;
  //     }
  //     this.actualZoom--;
  //     scaledViewBoxWidth = viewboxWidth * zoomScale;
  //     scaledViewBoxHeight = viewboxHeight * zoomScale;

  //     scaledViewBoxX = viewboxX - (scaledViewBoxWidth - viewboxWidth) * zoomLeftFraction;
  //     scaledViewBoxY = viewboxY - (scaledViewBoxHeight - viewboxHeight) * zoomTopFraction;
  //   }
  //   const scaledViewBox: any = [scaledViewBoxX, scaledViewBoxY, scaledViewBoxWidth, scaledViewBoxHeight].map((s) => s.toFixed(2)).join(" ");
  //   this.svgGrid.nativeElement.setAttribute("viewBox", scaledViewBox);

  //   this.currentViewboxToSvgRatio = scaledViewBoxWidth / this.svgGrid.nativeElement.clientWidth;
  // }

  // zoom in zoom out on view box;***********************

  // Handle zooming in
  // zoomIn() {
  //   this.changeZoom(-1); // Zoom in on button click
  // }

  // // Handle zooming out
  // zoomOut() {
  //   this.changeZoom(1); // Zoom out on button click
  // }

  // maxZoom: number = 5;
  // minZoom: number = 1;
  // Adjust the zoom level and update the viewBox
  // changeZoom(zoomDirection: number) {
  //   let zoomScale = 1.1;
  //   let scaledViewBoxX;
  //   let scaledViewBoxY;
  //   let [viewboxX, viewboxY, viewboxWidth, viewboxHeight]: any = this.svgGrid.nativeElement
  //     .getAttribute("viewBox")
  //     ?.split(" ")
  //     .map((s) => parseFloat(s)); // Get current viewBox values

  //   // Calculate the new zoom level
  //   if (zoomDirection < 0) {
  //     // Zoom in
  //     // if (this.actualZoom < this.maxZoom) {
  //     this.actualZoom++;
  //     viewboxWidth /= zoomScale;
  //     viewboxHeight /= zoomScale;
  //     scaledViewBoxX = viewboxX + (viewboxWidth - viewboxWidth / zoomScale) / 2;
  //     scaledViewBoxY = viewboxY + (viewboxHeight - viewboxHeight / zoomScale) / 2;
  //     // } else {
  //     //   return;
  //     // }
  //   } else {
  //     // Zoom out
  //     if (this.actualZoom > this.minZoom) {
  //       this.actualZoom--;
  //       viewboxWidth = viewboxWidth * zoomScale;
  //       viewboxHeight = viewboxHeight * zoomScale;
  //       scaledViewBoxX = viewboxX + (viewboxWidth / zoomScale - viewboxWidth) / 2;
  //       scaledViewBoxY = viewboxY + (viewboxHeight / zoomScale - viewboxHeight) / 2;
  //     } else {
  //       return;
  //     }
  //   }

  //   // Adjust the viewBox position (minX and minY) to keep the zoom centered
  //   const centerX = viewboxWidth / 2;
  //   const centerY = viewboxHeight / 2;

  //   // Set the new minX and minY to keep the zoom centered

  //   // Set the new viewBox for the SVG

  //   const scaledViewBox: any = [scaledViewBoxX, scaledViewBoxY, viewboxWidth, viewboxHeight].map((s) => s.toFixed(2)).join(" ");
  //   this.svgGrid.nativeElement.setAttribute("viewBox", scaledViewBox);

  //   this.currentViewboxToSvgRatio = viewboxWidth / this.svgGrid.nativeElement.clientWidth;
  // }
}
