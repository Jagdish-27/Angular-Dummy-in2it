import { Component, Input } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-via-source-chart',
  templateUrl: './via-source-chart.component.html',
  styleUrls: ['./via-source-chart.component.css']
})
export class ViaSourceChartComponent {

  @Input() PieChartData:any=[];

  @Input() PieChartId:any;

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

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
      let root = am5.Root.new(this.PieChartId);


      // to remove the waterMark from the chart
      if (root._logo) {
        root._logo.dispose();
      }
      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: this.PieChartId == 'chartdiv2' ? root.verticalLayout : root.horizontalLayout,
        innerRadius: am5.percent(70)
      }));


      // Create series


      let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField:`${this.PieChartId == 'chartdiv2' ? 'value':'count'}`,
        categoryField: `${this.PieChartId == 'chartdiv2' ? 'sourceName':'name'}`,
        alignLabels: false,
        legendLabelText: "{category}",
        legendValueText: "{value}",
        // visible:false,
      }));

      // converting percentage value in the number on tool tip

      series.slices.template.set('tooltipText', '{category}: {value}');


      // changing the series color
      if(this.PieChartId == 'chartdiv2'){
        series.get("colors")?.set("colors", [
          am5.color(0xe1c5f6),
          am5.color(0x48d6ee),
          am5.color(0x9ddaff),
        ]);
      }else{
        series.get("colors")?.set("colors", [
          am5.color(0xdad9d9),
          am5.color(0x9ddaff),
          am5.color(0x3d85c6),
          am5.color(0x0e7de2),
          am5.color(0x0B5394),
        ]);
      }
      

      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0,
        visible: false,
       
      });

      series.slices.template.states.create('active', {
        shiftRadius: 0,
      })

      series.slices.template.states.create('hover', {
        scale: 1,
      })


      series.data.setAll(this.PieChartData);


      // Create legend
      // click target to disable the legend buttons
      let legend;
      if(this.PieChartId == 'chartdiv2'){
        legend = chart.children.unshift(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
          layout: root.horizontalLayout,
          clickTarget: 'none',
          
        }));
      }else{
        legend = chart.children.push(am5.Legend.new(root, {
          centerY: am5.percent(50),
          y: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
          layout: root.verticalLayout,
          clickTarget: 'none',
          marginLeft:30,
        }));
      }
      

      legend.data.setAll(series.dataItems);

      // Hide percentage values in legend
      if(this.PieChartId == 'chartdiv2'){
        legend.valueLabels.template.setAll({ visible: false });
      }

      // Play initial series animation
      series.appear(1000, 100);

      chart.children.unshift(am5.Label.new(root, {
        text: `${this.PieChartId == 'chartdiv2' ? 'Via Source':''}`,
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0,
      }));

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
      });
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

