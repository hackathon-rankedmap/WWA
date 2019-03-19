<template>
    <div class="hello" id="chartDiv"></div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4maps from "@amcharts/amcharts4/maps";
  import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

  export default {
    name: 'Map',
    mounted() {
      // Create chart instance
      var map = am4core.create("chartDiv", am4maps.MapChart);
      map.geodata = am4geodata_worldLow;
      map.projection = new am4maps.projections.Miller();
      var button = map.chartContainer.createChild(am4core.Button);
        button.padding(5, 5, 5, 5);
        button.width = 20;
        button.align = "right";
        button.marginRight = 15;
        button.events.on("hit", function() {
        map.closeAllPopups();
        map.goHome();
        });
        button.icon = new am4core.Sprite();
        button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

      // Series for World map
      var polygonSeries = new am4maps.MapPolygonSeries();
      var worldSeries = map.series.push(polygonSeries);
      
      worldSeries.exclude = ["AQ"];
      
  

      worldSeries.useGeodata = true;

     // Map countries color
      function am4themes_myTheme(target) {
        if (target instanceof am4core.ColorSet) {
          target.list = [
            am4core.color("#1BA68D"),
            am4core.color("#E7DA4F"),
            am4core.color("#E77624"),
            am4core.color("#DF3520"),
            am4core.color("#64297B"),
            am4core.color("#232555")
          ];
        }
      }
      
      
      
    

      var polygonTemplate = worldSeries.mapPolygons.template;
      polygonTemplate.applyOnClones = true;
      polygonTemplate.togglable = true;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#080027");
      polygonTemplate.fill = map.colors.getIndex(0);
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;
      polygonTemplate.strokeOpacity = 0.5;
      polygonTemplate.fill = map.colors.getIndex(0);


// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");
polygonTemplate.fill = am4core.color("#504f5d");


// Remove Antarctica
polygonSeries.exclude = ["AQ"];

// Add some data
polygonSeries.data = [{
  "id": "US",
  "name": "United States",
  "fill": am4core.color("#F05C5C")
}, 
{
    "id": "IT",
    "name": "Italie",
    "fill": am4core.color("#F05C5C")
  },
  {
    "id": "PT",
    "name": "Portugal",
    "fill": am4core.color("#F05C5C")
  },
  {
    "id": "GB",
    "name": "United Kingdom",
    "fill": am4core.color("#F05C5C")
  },
  {
    "id": "BE",
    "name": "Belgium",
    "fill": am4core.color("#F05C5C")
  },
  {
    "id": "ES",
    "name": "Spain",
    "fill": am4core.color("#F05C5C")
  },
  {
    "id": "DE",
    "name": "Germany",
    "fill": am4core.color("#F05C5C")
  },{
  "id": "FR",
  "name": "France",
  "fill": am4core.color("#F05C5C")
}];

// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";


      var lastSelected;
      polygonTemplate.events.on("hit", function(ev) {
        if (lastSelected) {
          // This line serves multiple purposes:
          // 1. Clicking a country twice actually de-activates, the line below
          //    de-activates it in advance, so the toggle then re-activates, making it
          //    appear as if it was never de-activated to begin with.
          // 2. Previously activated countries should be de-activated.
          lastSelected.isActive = false;
        }
        ev.target.series.chart.zoomToMapObject(ev.target);
        if (lastSelected !== ev.target) {
          lastSelected = ev.target;
        }
      })
     
      
      
      /* Create selected and hover states and set alternative fill color */
      var ss = polygonTemplate.states.create("active");
      ss.properties.fill = map.colors.getIndex(5).brighten(-0.5);
      
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = map.colors.getIndex(0).brighten(-0.5);

     


      
      polygonTemplate.events.on("hit", function(ev) {
        map.closeAllPopups();
        map.openPopup("<strong>" + ev.target.dataItem.dataContext.name + "</strong>");
        
        
      });

      // Add zoom control
    map.zoomControl = new am4maps.ZoomControl();

      // getPopularArticles('fr-fr', 1).then( (articles) => getPopularTopics(articles) ).then((topics) => console.log(topics));
      // getPopularArticles('fr-fr', 1).then( (articles) => console.log(articles));


      // searchByText('psg', '20190319__20190319', 'fr-fr');
    }
  }
</script>

<style>
    #chartDiv {
        width: 100%;
        height: 600px;
        background-color: #080027;

    }
</style>
