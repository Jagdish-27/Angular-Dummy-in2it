import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit, AfterViewInit {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }


  ngOnInit(): void {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
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
      let data = [
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

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "user_name",

        })
      );
      xAxis.data.setAll(data);

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

      // Create series
      // let series1 = chart.series.push(
      //   am5xy.ColumnSeries.new(root, {
      //     name: "Series",
      //     xAxis: xAxis,
      //     yAxis: yAxis,
      //     valueYField: "total_ticket",
      //     categoryXField: "user_name"
      //   })
      // );
      // series1.data.setAll(data);

      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "total_ticket",
          categoryXField: "user_name"
        })
      );
      series2.data.setAll(data);

      // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {}));
      // legend.data.setAll(chart.series.values);

      // changing legend color
      // legend.data.setAll([{
      //   name: "Series",
      //   color: am5.color(0x297373)
      // }]);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

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
}
