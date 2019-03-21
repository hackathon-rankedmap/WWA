<template>
    <div class="mapPage">
        <NavBar></NavBar>

        <div class="columns">
            <div class="column is-one-quarter">
                <SideBar class="column ">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                titre de la topic
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content" >
                                titre de l'article
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.

                                <br>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="content" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.

                                <br>

                            </div>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <br>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.

                                <br>

                            </div>
                        </div>

                        <footer class="card-footer">
                            <a href="#" class="card-footer-item">S'abonner</a>

                        </footer>
                    </div>

                </SideBar>

            </div>

            <div class="hello column" id="chartDiv">
            </div>
        </div>
            <div class="content" id="sport">
                <div class=" content" >
                    <img src="../assets/images/Fichier_11@4x.png" alt="" width="60" height="10">
                    <p class="title" ><strong>SPORT</strong></p>
                    <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
                </div>
                <div class="content">
                    <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                        une vue d'ensemble du monde du sport international</p>
                </div>
            </div>
        <div class="content" id="santé">
                <div class="content" >
                    <img src="../assets/images/Fichier_12@4x.png" alt="" width="60" height="10" >
                    <p class="title" ><strong>SANTE</strong></p>
                    <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
                </div>
                <div class="content">
                    <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                        une vue d'ensemble du monde du sport international</p>
                </div>
            </div>
        <div class="content" id="divertissement">
                <div class="content" >
                    <img src="../assets/images/Fichier_6@4x.png" alt="" width="60" height="10">
                    <p class="title" ><strong>DIVERTISSEMENT</strong></p>
                    <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
                </div>
                <div class="content">
                    <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                        une vue d'ensemble du monde du sport international</p>
                </div>
             </div>
        <div class="content" id="top">

                <div class="content" >
                    <img src="../assets/images/Fichier_6@4x.png" alt="" width="60" height="10">
                    <p class="title" ><strong>LES PLUS RECENTS</strong></p>
                    <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
                </div>
                <div class="content">
                    <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                        une vue d'ensemble du monde du sport international</p>
                </div>
            </div>
             <div class="content" id="scienceTech">
                <div class="content" >
                    <img src="../assets/images/Fichier_8@4x.png" alt="" width="60" height="10">
                    <p class="title" ><strong>SCIENCE ET TECHNOLOGIE</strong></p>
                    <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
                </div>
                <div class="content">
                    <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                        une vue d'ensemble du monde du sport international</p>
                </div>
            </div>
        <div class="content" id="economie">
            <div class="content" >
                <img src="../assets/images/Fichier_7@4x.png" alt="" width="60" height="10">
                <p class="title" ><strong>ECONOMIE</strong></p>
                <p class="Subtitle" >Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.</p>
            </div>
            <div class="content">
                <p class="description" >Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir
                    une vue d'ensemble du monde du sport international</p>
            </div>
        </div>

        <footer class="footer">
            <p class="basDePage">
                Powered by
                <img src="../assets/images/resoneo.png" width="80">
            </p>
        </footer>

    </div>
</template>
<script>
  import NavBar from './NavBarComponent.vue'
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4maps from "@amcharts/amcharts4/maps";
  import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
  import {serverBus} from "../main";

  export default {
    name: 'Map',
    components:{
      NavBar,
    },
    data () {
      return {
        category : this.$route.params.category,
      }
    },

    mounted() {
      serverBus.$on('locale', (locale) => {
        if (locale === 'MD') {
          map.goHome();
        } else {
          const target = polygonSeries.getPolygonById(locale);
          map.zoomToMapObject(target);
        }
      });
      // Create chart instance
      var map = am4core.create("chartDiv", am4maps.MapChart);
      map.geodata = am4geodata_worldLow;
      map.projection = new am4maps.projections.Miller();
      var button = map.chartContainer.createChild(am4core.Button);
      button.padding(5, 5, 5, 5);
      button.width = 20;
      button.align = "right";
      button.marginRight = 15;
      button.events.on("hit", function () {
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
      polygonSeries.data = [
        {
          "id": "US",
          "edition": "en-us-ny",
          "name": "United States",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "IT",
          "edition": "it-it",
          "name": "Italie",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "PT",
          "edition": "pt-br",
          "name": "Portugal",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "GB",
          "edition": "en-gb",
          "name": "United Kingdom",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "BE",
          "edition": "fr-be",
          "name": "Belgium",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "ES",
          "edition": "es-es",
          "name": "Spain",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "DE",
          "edition": "de-de",
          "name": "Germany",
          "fill": am4core.color("#F05C5C")
        },
        {
          "id": "FR",
          "edition": "fr-fr",
          "name": "France",
          "fill": am4core.color("#F05C5C")
        }
      ];

      serverBus.$on('getScoresByCat', (scores) => {
        polygonSeries.data.forEach((country, index, array) => {
          if(scores[country['edition']] !== undefined){
            country['score'] = scores[country['edition']];
          }
        });
      });

// Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = "fill";


      var lastSelected;
      polygonTemplate.events.on("hit", (ev) => {
        this.$router.push(`/map/${this.category}/${ev.target._dataItem.dataContext.edition}`);
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


      polygonTemplate.events.on("hit", function (ev) {
        map.closeAllPopups();
        let data = ev.target.dataItem.dataContext;
        let name = data.name;
        if(data.score !== undefined){
          name += `<br>${data.score}`;
        }
        map.openPopup(name);
      });



      // Add zoom control
      map.zoomControl = new am4maps.ZoomControl();


    }
  }

</script>

<style>
    #chartDiv {
        width: 100%;
        height: 600px;
        background-color: #080027;

    }

.mapPage{
    background-color: #060025;
}
    .basDePage{
        margin-top:3%;
        padding: 12px;
        margin-right: 85%;

    }

    .card-content{
        background : url("../assets/images/resoneo.png");
        opacity: 0.33;
        background-size: 100%;
        background-repeat: no-repeat;


    }
    .content{
        font-weight: bold;
    }
    .description{
        color: white;
    }


</style>
