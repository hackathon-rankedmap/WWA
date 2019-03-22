<template>
    <div>
        <NavBar></NavBar>
        <div class="side">
            <SideBar v-show="toggleSideBar" :articles="articles"></SideBar>
            <div class="hello" id="chartDiv"></div>
        </div>
        <div v-if="footer[category] !== undefined">
            <div class="content" :style="{backgroundColor: footer[category]['background'], color: 'white', padding: '75px 25%'  }">
                <div class="content" >
                    <p class="title" ><strong>{{ footer[category]["name"] }}</strong></p>
                    <p class="Subtitle" >{{ footer[category]["subtitle"] }}</p>
                </div>
                <div class="content">
                    <p class="description" >{{ footer[category]["description"] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import NavBar from './NavBarComponent.vue'
  import SideBar from './SideBar'
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4maps from "@amcharts/amcharts4/maps";
  import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
  import {serverBus} from "../main";
  import * as ozae from '../ozaeApi';

  export default {
    name: 'Map',
    components:{
      NavBar,
      SideBar
    },
    data () {
      return {
        toggleSideBar: false,
        category : this.$route.params.category,
        articles : [],
        footer: {
          sport: {
            name: 'SPORT',
            subtitle: 'Les resultats et les documents, les meilleurs buts et les derniers records, vivez le sport.',
            description: 'Nous centralisons tout les articles des magazines spécialisés de manières à vous fournir\n' +
              '                    une vue d\'ensemble du monde du sport international',
            background: '#ffbb50'
          },
          sante: {
            name: 'SANTE',
            subtitle: 'Bénéficier des dernières informations sur les dernières études et tendances afin de vivre sainement.',
            description: 'Soyez au courant des avancées médicales sur les vaccins, ds points réguliers sur les épidémies en cours et suivez leurs évolutions. \n' +
              'Restez connectez avec nos partenaires spécialisés dans le domaine médical.\n',
            background: '#52a7ff'
          },
          divertissement: {
            name: 'DIVERTISSEMENT',
            subtitle: 'Courts et longs métrages, séries,  YouTube, TV et musique, toutes les nouveautés sont ici.',
            description: 'Ici retrouvez vos avis et critique sur les derniers films et séries ; retrouvez toutes les informations des sorties culturelles partout dans le monde.\n' +
              'Soyez informé des concerts ou sorties des albums musicaux, à l\'échelle nationale et international.\n',
            background: '#ff51e0'
          },
          science: {
            name: 'SCIENCE',
            subtitle: 'Restez à jour vis-à-vis des avancées scientifiques et technologique.',
            description: 'Mise à Jour, technologie sans-fil, processeur, molécules, etc... Si tout cela vous intéresse vous êtes au bon endroit. Tout les compte rendus des recherches et les avancées technologiques se rencontre ici. \n' +
              'Effectuez une veille technologique grâce à nos partenaires experts dans ces domaines.\n',
            background: '#57c556'
          },
          economie: {
            name: 'ECONOMIE',
            subtitle: 'Se tenir au courant de chaque changement majeur, chaque conséquence de l\'économie internationale.',
            description: 'Grand changement au niveau de la bourse, amendes, faillites et évolutions des bourses retrouvez votre condenser d\'articles sur l\'économie où que vous soyez. \n' +
              'Tenez vous au courant, perfectionnez ou apprenez vos connaissances sur les économies grâces aux articles de nos partenaires.\n',
            background: '#888888'
          }
        },
        mapData: [
          {
            "id": "US",
            "edition": "en-us-ny",
            "name": "United States",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "IT",
            "edition": "it-it",
            "name": "Italie",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "PT",
            "edition": "pt-br",
            "name": "Portugal",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "GB",
            "edition": "en-gb",
            "name": "United Kingdom",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "BE",
            "edition": "fr-be",
            "name": "Belgium",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "ES",
            "edition": "es-es",
            "name": "Spain",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "DE",
            "edition": "de-de",
            "name": "Germany",
            // "fill": am4core.color("#F05C5C")
          },
          {
            "id": "FR",
            "edition": "fr-fr",
            "name": "France",
            // "fill": am4core.color("#F05C5C")
          }
        ]
      }
    },
    methods:{
      goHome(){
        this.$router.push('/');
      },
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

      serverBus.$on('getScoresByCat', (scores) => {
        console.log(scores);
        this.mapData.forEach((country, index, array) => {
          if(scores[country['edition']] !== undefined){
            country['fill'] = am4core.color("#367B25");
            country['score'] = scores[country['edition']];
          }
        });
      });

      polygonSeries.data = this.mapData;
// Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = "fill";


      var lastSelected;
      polygonTemplate.events.on("hit", (ev) => {
        let edition = ev.target._dataItem.dataContext.edition;
        this.$router.push(`/map/${this.category}/${edition}`);
        const matching = {
          'economie': 'b',
          'sante': 'm',
          'sport': 's',
          'science': 't',
          'divertissement': 'e'
        };
        if(matching[this.category] === undefined){
            ozae.searchByText(this.category, '20190320__20190321', edition)
              .then(articles => {
                this.articles = articles;
                console.log(this.articles);
                this.toggleSideBar = true
              });
        } else {
            ozae.getPopularArticles(edition, 6, matching[this.category], 'DESC', 20)
              .then((articles) => {
                  this.articles = articles;
                  console.log(this.articles);
                  this.toggleSideBar = true;
            });
        }

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
        min-height: 600px;
        background-color: #080027;
    }
    .side {
        display: flex;
    }

</style>
