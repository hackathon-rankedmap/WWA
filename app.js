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
        map.goHome();
        });
        button.icon = new am4core.Sprite();
        button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

      // Series for World map
      var polygonSeries = new am4maps.MapPolygonSeries();
      var worldSeries = map.series.push(polygonSeries);
      
      worldSeries.exclude = ["AQ"];
      worldSeries.useGeodata = true;

     

      var polygonTemplate = worldSeries.mapPolygons.template;
      polygonTemplate.applyOnClones = true;
      polygonTemplate.togglable = true;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = map.colors.getIndex(0);
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;
      polygonTemplate.strokeOpacity = 0.5;
      polygonTemplate.fill = map.colors.getIndex(0);
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

    // Add and configure small map
    map.smallMap = new am4maps.SmallMap();
    map.smallMap.series.push(polygonSeries);

    getPopularArticles('fr-fr', 1).then( (articles) => getPopularTopics(articles) ).then((topics) => console.log(topics));
    // getPopularArticles('fr-fr', 1).then( (articles) => console.log(articles));


    // searchByText('psg', '20190319__20190319', 'fr-fr');


//navbar

function myFunctionfr(){
    console.log("az");
            var target = polygonSeries.getPolygonById("FR");
            // Pre-zoom
            map.zoomToMapObject(target);

}

      function myFunctionEU(){
          console.log("az");
          var target = polygonSeries.getPolygonById("US");
          // Pre-zoom
          map.zoomToMapObject(target);
      }

      function myFunctionRU(){
          console.log("az");
          var target = polygonSeries.getPolygonById("GB");
          // Pre-zoom
          map.zoomToMapObject(target);
      }

      function myFunctionBR(){
          console.log("az");
          var target = polygonSeries.getPolygonById("BE");
          // Pre-zoom
          map.zoomToMapObject(target);
      }
      function myFunctionAL(){
          console.log("az");
          var target = polygonSeries.getPolygonById("DE");
          // Pre-zoom
          map.zoomToMapObject(target);
      }

      function myFunctionES(){
          console.log("az");
          var target = polygonSeries.getPolygonById("ES");
          // Pre-zoom
          map.zoomToMapObject(target);
      }
      function myFunctionPR(){
          console.log("az");
          var target = polygonSeries.getPolygonById("PT");
          // Pre-zoom
          map.zoomToMapObject(target);
      }
      function myFunctionIT(){
          console.log("az");
          var target = polygonSeries.getPolygonById("IT");
          // Pre-zoom
          map.zoomToMapObject(target);
      }




