import { Component, EventEmitter, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {


  chartdiv2 = 'chartdiv2';
  chartdiv3 = 'chartdiv3';

  emitData =  new EventEmitter<any>();

  prevNumber:number = 0;
  nextNumber:number = 5;
  chartDataList:any = [];

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, public serverService:ServerService) { }

  

  ngOnInit(): void {
    this.chartDataList = this.serverService.charts_data.sales_ticket_per_owner;
  }


  

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
        this.emitData.emit(this.chartDataList.slice(this.prevNumber,this.nextNumber));
      });
    }
  }

  ngAfterViewInit() {

    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      // to remove the waterMark from the chart
      if (root._logo) {
        root._logo.dispose();
      }

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Adding Chart Title

      chart.children.unshift(am5.Label.new(root, {
        text: "Sales Tickets Per Owner",
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));

      // Define data
      let sales_ticket_per_owner = [
        {
          "user_name": "Tinku Sharma",
          "total_ticket": 89
        },
        {
          "user_name": "Vishal Mishra",
          "total_ticket": 3
        },
        {
          "user_name": "Pawna Kumare",
          "total_ticket": 19
        },
        {
          "user_name": "Shivank Tyagi",
          "total_ticket": 36
        },
        {
          "user_name": "Vikash Tiwari123",
          "total_ticket": 6
        },
        {
          "user_name": "Vikash Tiwari",
          "total_ticket": 5
        },
        {
          "user_name": "Ankit Tyagi",
          "total_ticket": 90
        }
      ];

      
      // hide the side data counting on the Y-axis in amCharts 5
      var yRenderer = am5xy.AxisRendererY.new(root, {})
          
      yRenderer.labels.template.set('visible', false)


      // Create Y-axis
      
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer,
        })
      );
      // yAxis.labelsContainer.template?.set('visible',false);


      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            stroke: am5.color("#000"), // Specify the color of the border
                  strokeWidth: 1, // Adjust the width of the border as needed
                  strokeOpacity: 1, // Set the opacity of the border
                  // lineDash: [4, 2] // Optionally, set a dashed pattern
          }),

          categoryField: "user_name",

        })
      );

      this.emitData.subscribe((value)=>{
        xAxis.data.setAll(value);
      })

      // Remove horizontal and vertical lines 

      yAxis.get("renderer").grid.template.setAll({
        strokeWidth: 0,
        visible: false
      });


      xAxis.get("renderer").grid.template.setAll({
        location: 0,
        strokeWidth: 0,
        visible: false
      });

      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "total_ticket",
          categoryXField: "user_name"
        })
      );
      this.emitData.subscribe((value)=>{
        series2.data.setAll(value);
      })

      series2.columns.template.setAll({
        width:am5.percent(15),
        // fillOpacity: 0.5,
        cornerRadiusTL: 5,
        cornerRadiusTR: 5
      });

      // setting the tool tip on the series
      series2.columns.template.setAll({
        tooltipText:"{total_ticket}:[bold]{user_name}[/]",
        tooltipPosition:'pointer',
        cursorOverStyle:'pointer'
      })

      // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {}));
      // legend.data.setAll(chart.series.values);

      // changing legend color
      // legend.data.setAll([{
      //   name: "Series",
      //   color: am5.color(0x297373)
      // }]);

      // Add cursor
      // chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    });
    
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  updateChart(type:string){

    if(type == 'next' && this.nextNumber < this.chartDataList.length){
      this.prevNumber += 1;
      this.nextNumber += 1;
      this.emitData.emit(this.chartDataList.slice(this.prevNumber,this.nextNumber));
    }else if(type == 'prev' && this.prevNumber > 0){
      this.prevNumber -= 1;
      this.nextNumber -= 1;

      this.emitData.emit(this.chartDataList.slice(this.prevNumber,this.nextNumber));
    }

  }
}
