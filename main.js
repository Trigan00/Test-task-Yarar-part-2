const PanelEl = document.querySelector(".Panel");

const fetchData = async () => {
  try {
    const res = await fetch("https://trigan00.github.io/jsonapi/dots.json");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

ymaps.ready(async function () {
  const dots = await fetchData();

  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.751574, 37.573856],
      zoom: 9,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );

  const clusterer = new ymaps.Clusterer({
    // Макет метки кластера pieChart.
    clusterIconLayout: "default#pieChart",
    // Радиус диаграммы в пикселях.
    clusterIconPieChartRadius: 25,
    // Радиус центральной части макета.
    clusterIconPieChartCoreRadius: 10,
    // Ширина линий-разделителей секторов и внешней обводки диаграммы.
    clusterIconPieChartStrokeWidth: 3,
    // Определяет наличие поля balloon.
    hasBalloon: false,
    clusterDisableClickZoom: true,
  });
  const geoObjects = [];

  for (var i = 0; i < dots.length; i++) {
    const coords = dots[i].coordinates.split(", ");
    geoObjects[i] = new ymaps.Placemark(
      coords,
      { balloonContent: dots[i].name, wa_id: dots[i].id },
      {
        preset: "islands#circleIcon",
        iconColor: dots[i].color,
      }
    );
  }

  clusterer.add(geoObjects);
  myMap.geoObjects.add(clusterer);

  myMap.setBounds(clusterer.getBounds(), {
    checkZoomRange: true,
  });

  const showPanel = (data) => {
    PanelEl.style.display = "block";
    let displayMessage = "";
    data.forEach((id, index) => {
      displayMessage += ` 
            <div class = "place" id = "${id}" >
              <span>${index + 1}</span>
              <span>${dots[id].name}</span>
            </div>
            <hr>
        `;
    });
    PanelEl.innerHTML = displayMessage;

    const places = document.querySelectorAll(".place");
    places.forEach((place) => {
      place.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        const coords = dots[id].coordinates.split(", ");
        myMap.setCenter(coords, 18);
      });
    });
  };

  myMap.geoObjects.events.add("click", function (e) {
    const object = e.get("target");
    const data = [];
    if (object.options._name === "cluster") {
      object.properties._data.geoObjects.forEach((el) => {
        data.push(el.properties._data.wa_id);
      });
    } else {
      data.push(object.properties._data.wa_id);
    }
    showPanel(data);
    myMap.setCenter(object.geometry._coordinates);
  });
});
