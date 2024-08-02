import { Component, Input, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent  from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.css']
})
export class FunnelChartComponent implements OnInit {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  @Input() chartDataItems:any=[];


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
      let root = am5.Root.new("chartdiv5");

      // to remove the waterMark from the chart
      if (root._logo) {
        root._logo.dispose();
      }

      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      let chart = root.container.children.push(am5percent.SlicedChart.new(root, {
        layout: root.horizontalLayout,
      }));

      // Create series
      let series = chart.series.push(am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "vertical",
        valueField: "count",
        categoryField: "name",
        legendLabelText: "{percentage}",
        legendValueText: '',
        // x:am5.percent(-50),
        // width:200,
        // centerX: am5.p50,
        // x: am5.p50,
      }));

      series.labels.template.set('text','[#fff]{count}');


      // Set data
      series.data.setAll(this.chartDataItems);


      // Play initial series animation
      series.appear();


      // Create legend
      let legend = chart.children.unshift(am5.Legend.new(root, {
        nameField:'category',
        centerY: am5.p50,
        y: am5.p50,
        marginTop: 15,
        marginBottom: 15,
        layout:root.verticalLayout,
        clickTarget:'none',
      }));

      // give padding to legend items
      legend.itemContainers.template.setAll({paddingBottom:30,paddingTop:25});


      legend.markers.template.setAll({
        width:0,height:0
      })
      legend.data.setAll(series.dataItems);

      let legend2 = chart.children.push(am5.Legend.new(root, {
        centerY: am5.p50,
        y: am5.p50,
        marginTop: 15,
        marginBottom: 15,
        layout:root.verticalLayout,
        clickTarget:'none',
        // paddingBottom:25
      }));

      // reverse the legend items or else remove the space if needed
      legend2.itemContainers.template.setAll({
        reverseChildren:true
      })

      legend2.itemContainers.template.setAll({paddingBottom:30,paddingTop:20});


      legend2.data.setAll(series.dataItems);

      legend2.markers.template.setAll({
        width:0,height:0
      })

      // legend.markerRectangles.template.setAll({
      //   cornerRadiusTL: 10,
      //   cornerRadiusTR: 10,
      //   cornerRadiusBL: 10,
      //   cornerRadiusBR: 10
      // });
      // Make stuff animate on load
      chart.appear(1000, 100);


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
