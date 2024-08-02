import { Component, Input, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-certainty',
  templateUrl: './certainty.component.html',
  styleUrls: ['./certainty.component.css']
})
export class CertaintyComponent {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  @Input() chartData:any;


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
      let root = am5.Root.new("chartdiv4");

      // to remove the waterMark from the chart
      if (root._logo) {
        root._logo.dispose();
      }


      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: "none",
        paddingLeft: 0,
        layout: root.verticalLayout
      }));


      // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {
      //   centerX: am5.p50,
      //   x: am5.p50
      // }))

      
      // hide the side data counting on the Y-axis in amCharts 5
 
      var yRenderer = am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
        minorGridEnabled: true,
      })

      yRenderer.labels.template.set('visible', false);

      // Create axes
      let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: yRenderer
      }));

      yAxis.data.setAll(this.chartData);

      let xRenderer = am5xy.AxisRendererX.new(root,{ })

      xRenderer.labels.template.set('visible',false);

      let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
      }));


      // Add series

      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'value',
        categoryYField: "name",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
        }),
        
      }));

      // series.columns.template.setAll({
      //   height: am5.p100,
      //   strokeOpacity: 0
      // });

      var columnTemplate = series.columns.template;
      
      columnTemplate.adapters.add("fill", (fill, target) => {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      // setting different colors in XY chart in the series
      chart.set("colors", am5.ColorSet.new(root, {
        colors: [
          am5.color(0x0B5394),
          am5.color(0x0e7de2),
          am5.color(0x3d85c6),
          am5.color(0x9ddaff),
          am5.color(0xdad9d9),
        ]
      }))
      
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true
          })
        });
      });

      // series.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     locationX: 1,
      //     locationY: 0.5,
      //     sprite: am5.Label.new(root, {
      //       centerX: am5.p100,
      //       centerY: am5.p50,
      //       text: "{name}",
      //       fill: am5.color(0xffffff),
      //       populateText: true
      //     })
      //   });
      // });

      series.data.setAll(this.chartData);
      series.appear();


      series.columns.template.setAll({
        tooltipText:"{value}:[bold]{name}[/]",
        tooltipPosition:'pointer',
        cursorOverStyle:'pointer'
      })

      // Add legend
      // added name to the legend
      let legend = chart.children.push(am5.Legend.new(root, {
        nameField: "categoryY",
        centerX: am5.p50,
        x: am5.p50,
        // layout:root.gridLayout,
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
        }),
        marginBottom:20,
        clickTarget:'none'
      }));

      legend.markers.template.setAll({width:15,height:15});
      
      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0
      });
      
      legend.data.setAll(series.dataItems);



      // legend.data.setAll([{
      //   name: "Series",
      //   color: am5.color(0x297373)
      // }]);

      // Add cursor
      // let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      //   behavior: "zoomY"
      // }));
      // cursor.lineY.set("forceHidden", true);
      // cursor.lineX.set("forceHidden", true);

      
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


      chart.children.unshift(am5.Label.new(root, {
        text: `Certainty`,
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0,
      }));
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
