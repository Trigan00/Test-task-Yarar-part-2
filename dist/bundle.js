(()=>{var __webpack_modules__={463:()=>{eval('const PanelEl = document.querySelector(".Panel");\nconst fetchData = async () => {\n  try {\n    const res = await fetch("https://trigan00.github.io/jsonapi/dots.json");\n    return res.json();\n  } catch (error) {\n    console.log(error);\n  }\n};\nymaps.ready(async function () {\n  const dots = await fetchData();\n  const myMap = new ymaps.Map("map", {\n    center: [55.751574, 37.573856],\n    zoom: 9\n  }, {\n    searchControlProvider: "yandex#search"\n  });\n  const clusterer = new ymaps.Clusterer({\n    // Макет метки кластера pieChart.\n    clusterIconLayout: "default#pieChart",\n    // Радиус диаграммы в пикселях.\n    clusterIconPieChartRadius: 25,\n    // Радиус центральной части макета.\n    clusterIconPieChartCoreRadius: 10,\n    // Ширина линий-разделителей секторов и внешней обводки диаграммы.\n    clusterIconPieChartStrokeWidth: 3,\n    // Определяет наличие поля balloon.\n    hasBalloon: false,\n    clusterDisableClickZoom: true\n  });\n  const geoObjects = [];\n  for (var i = 0; i < dots.length; i++) {\n    const coords = dots[i].coordinates.split(", ");\n    geoObjects[i] = new ymaps.Placemark(coords, {\n      balloonContent: dots[i].name,\n      wa_id: dots[i].id\n    }, {\n      preset: "islands#circleIcon",\n      iconColor: dots[i].color\n    });\n  }\n  clusterer.add(geoObjects);\n  myMap.geoObjects.add(clusterer);\n  myMap.setBounds(clusterer.getBounds(), {\n    checkZoomRange: true\n  });\n  const showPanel = data => {\n    PanelEl.style.display = "block";\n    let displayMessage = "";\n    data.forEach((id, index) => {\n      displayMessage += ` \n            <div class = "place" id = "${id}" >\n              <span>${index + 1}</span>\n              <span>${dots[id].name}</span>\n            </div>\n            <hr>\n        `;\n    });\n    PanelEl.innerHTML = displayMessage;\n    const places = document.querySelectorAll(".place");\n    places.forEach(place => {\n      place.addEventListener("click", e => {\n        const id = e.currentTarget.id;\n        const coords = dots[id].coordinates.split(", ");\n        myMap.setCenter(coords, 18);\n      });\n    });\n  };\n  myMap.geoObjects.events.add("click", function (e) {\n    const object = e.get("target");\n    const data = [];\n    if (object.options._name === "cluster") {\n      object.properties._data.geoObjects.forEach(el => {\n        data.push(el.properties._data.wa_id);\n      });\n    } else {\n      data.push(object.properties._data.wa_id);\n    }\n    showPanel(data);\n    myMap.setCenter(object.geometry._coordinates);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDYzLmpzIiwibmFtZXMiOlsiUGFuZWxFbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZldGNoRGF0YSIsInJlcyIsImZldGNoIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInltYXBzIiwicmVhZHkiLCJkb3RzIiwibXlNYXAiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwic2VhcmNoQ29udHJvbFByb3ZpZGVyIiwiY2x1c3RlcmVyIiwiQ2x1c3RlcmVyIiwiY2x1c3Rlckljb25MYXlvdXQiLCJjbHVzdGVySWNvblBpZUNoYXJ0UmFkaXVzIiwiY2x1c3Rlckljb25QaWVDaGFydENvcmVSYWRpdXMiLCJjbHVzdGVySWNvblBpZUNoYXJ0U3Ryb2tlV2lkdGgiLCJoYXNCYWxsb29uIiwiY2x1c3RlckRpc2FibGVDbGlja1pvb20iLCJnZW9PYmplY3RzIiwiaSIsImxlbmd0aCIsImNvb3JkcyIsImNvb3JkaW5hdGVzIiwic3BsaXQiLCJQbGFjZW1hcmsiLCJiYWxsb29uQ29udGVudCIsIm5hbWUiLCJ3YV9pZCIsImlkIiwicHJlc2V0IiwiaWNvbkNvbG9yIiwiY29sb3IiLCJhZGQiLCJzZXRCb3VuZHMiLCJnZXRCb3VuZHMiLCJjaGVja1pvb21SYW5nZSIsInNob3dQYW5lbCIsImRhdGEiLCJzdHlsZSIsImRpc3BsYXkiLCJkaXNwbGF5TWVzc2FnZSIsImZvckVhY2giLCJpbmRleCIsImlubmVySFRNTCIsInBsYWNlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY3VycmVudFRhcmdldCIsInNldENlbnRlciIsImV2ZW50cyIsIm9iamVjdCIsImdldCIsIm9wdGlvbnMiLCJfbmFtZSIsInByb3BlcnRpZXMiLCJfZGF0YSIsImVsIiwicHVzaCIsImdlb21ldHJ5IiwiX2Nvb3JkaW5hdGVzIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95YW5kZXgtbWFwLXBhcnQtMi8uL21haW4uanM/MWQ1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQYW5lbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5QYW5lbFwiKTtcclxuXHJcbmNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCJodHRwczovL3RyaWdhbjAwLmdpdGh1Yi5pby9qc29uYXBpL2RvdHMuanNvblwiKTtcclxuICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgfVxyXG59O1xyXG5cclxueW1hcHMucmVhZHkoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGRvdHMgPSBhd2FpdCBmZXRjaERhdGEoKTtcclxuXHJcbiAgY29uc3QgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFxyXG4gICAgXCJtYXBcIixcclxuICAgIHtcclxuICAgICAgY2VudGVyOiBbNTUuNzUxNTc0LCAzNy41NzM4NTZdLFxyXG4gICAgICB6b29tOiA5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiBcInlhbmRleCNzZWFyY2hcIixcclxuICAgIH1cclxuICApO1xyXG5cclxuICBjb25zdCBjbHVzdGVyZXIgPSBuZXcgeW1hcHMuQ2x1c3RlcmVyKHtcclxuICAgIC8vINCc0LDQutC10YIg0LzQtdGC0LrQuCDQutC70LDRgdGC0LXRgNCwIHBpZUNoYXJ0LlxyXG4gICAgY2x1c3Rlckljb25MYXlvdXQ6IFwiZGVmYXVsdCNwaWVDaGFydFwiLFxyXG4gICAgLy8g0KDQsNC00LjRg9GBINC00LjQsNCz0YDQsNC80LzRiyDQsiDQv9C40LrRgdC10LvRj9GFLlxyXG4gICAgY2x1c3Rlckljb25QaWVDaGFydFJhZGl1czogMjUsXHJcbiAgICAvLyDQoNCw0LTQuNGD0YEg0YbQtdC90YLRgNCw0LvRjNC90L7QuSDRh9Cw0YHRgtC4INC80LDQutC10YLQsC5cclxuICAgIGNsdXN0ZXJJY29uUGllQ2hhcnRDb3JlUmFkaXVzOiAxMCxcclxuICAgIC8vINCo0LjRgNC40L3QsCDQu9C40L3QuNC5LdGA0LDQt9C00LXQu9C40YLQtdC70LXQuSDRgdC10LrRgtC+0YDQvtCyINC4INCy0L3QtdGI0L3QtdC5INC+0LHQstC+0LTQutC4INC00LjQsNCz0YDQsNC80LzRiy5cclxuICAgIGNsdXN0ZXJJY29uUGllQ2hhcnRTdHJva2VXaWR0aDogMyxcclxuICAgIC8vINCe0L/RgNC10LTQtdC70Y/QtdGCINC90LDQu9C40YfQuNC1INC/0L7Qu9GPIGJhbGxvb24uXHJcbiAgICBoYXNCYWxsb29uOiBmYWxzZSxcclxuICAgIGNsdXN0ZXJEaXNhYmxlQ2xpY2tab29tOiB0cnVlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGdlb09iamVjdHMgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSBkb3RzW2ldLmNvb3JkaW5hdGVzLnNwbGl0KFwiLCBcIik7XHJcbiAgICBnZW9PYmplY3RzW2ldID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgICAgY29vcmRzLFxyXG4gICAgICB7IGJhbGxvb25Db250ZW50OiBkb3RzW2ldLm5hbWUsIHdhX2lkOiBkb3RzW2ldLmlkIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwcmVzZXQ6IFwiaXNsYW5kcyNjaXJjbGVJY29uXCIsXHJcbiAgICAgICAgaWNvbkNvbG9yOiBkb3RzW2ldLmNvbG9yLFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2x1c3RlcmVyLmFkZChnZW9PYmplY3RzKTtcclxuICBteU1hcC5nZW9PYmplY3RzLmFkZChjbHVzdGVyZXIpO1xyXG5cclxuICBteU1hcC5zZXRCb3VuZHMoY2x1c3RlcmVyLmdldEJvdW5kcygpLCB7XHJcbiAgICBjaGVja1pvb21SYW5nZTogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgc2hvd1BhbmVsID0gKGRhdGEpID0+IHtcclxuICAgIFBhbmVsRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGxldCBkaXNwbGF5TWVzc2FnZSA9IFwiXCI7XHJcbiAgICBkYXRhLmZvckVhY2goKGlkLCBpbmRleCkgPT4ge1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZSArPSBgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJwbGFjZVwiIGlkID0gXCIke2lkfVwiID5cclxuICAgICAgICAgICAgICA8c3Bhbj4ke2luZGV4ICsgMX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4+JHtkb3RzW2lkXS5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxocj5cclxuICAgICAgICBgO1xyXG4gICAgfSk7XHJcbiAgICBQYW5lbEVsLmlubmVySFRNTCA9IGRpc3BsYXlNZXNzYWdlO1xyXG5cclxuICAgIGNvbnN0IHBsYWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XHJcbiAgICBwbGFjZXMuZm9yRWFjaCgocGxhY2UpID0+IHtcclxuICAgICAgcGxhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgY29vcmRzID0gZG90c1tpZF0uY29vcmRpbmF0ZXMuc3BsaXQoXCIsIFwiKTtcclxuICAgICAgICBteU1hcC5zZXRDZW50ZXIoY29vcmRzLCAxOCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgbXlNYXAuZ2VvT2JqZWN0cy5ldmVudHMuYWRkKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IG9iamVjdCA9IGUuZ2V0KFwidGFyZ2V0XCIpO1xyXG4gICAgY29uc3QgZGF0YSA9IFtdO1xyXG4gICAgaWYgKG9iamVjdC5vcHRpb25zLl9uYW1lID09PSBcImNsdXN0ZXJcIikge1xyXG4gICAgICBvYmplY3QucHJvcGVydGllcy5fZGF0YS5nZW9PYmplY3RzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgZGF0YS5wdXNoKGVsLnByb3BlcnRpZXMuX2RhdGEud2FfaWQpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEucHVzaChvYmplY3QucHJvcGVydGllcy5fZGF0YS53YV9pZCk7XHJcbiAgICB9XHJcbiAgICBzaG93UGFuZWwoZGF0YSk7XHJcbiAgICBteU1hcC5zZXRDZW50ZXIob2JqZWN0Lmdlb21ldHJ5Ll9jb29yZGluYXRlcyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBRWhELE1BQU1DLFNBQVMsR0FBRyxZQUFZO0VBQzVCLElBQUk7SUFDRixNQUFNQyxHQUFHLEdBQUcsTUFBTUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDO0lBQ3ZFLE9BQU9ELEdBQUcsQ0FBQ0UsSUFBSSxFQUFFO0VBQ25CLENBQUMsQ0FBQyxPQUFPQyxLQUFLLEVBQUU7SUFDZEMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQztFQUNwQjtBQUNGLENBQUM7QUFFREcsS0FBSyxDQUFDQyxLQUFLLENBQUMsa0JBQWtCO0VBQzVCLE1BQU1DLElBQUksR0FBRyxNQUFNVCxTQUFTLEVBQUU7RUFFOUIsTUFBTVUsS0FBSyxHQUFHLElBQUlILEtBQUssQ0FBQ0ksR0FBRyxDQUN6QixLQUFLLEVBQ0w7SUFDRUMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztJQUM5QkMsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxFQUNEO0lBQ0VDLHFCQUFxQixFQUFFO0VBQ3pCLENBQUMsQ0FDRjtFQUVELE1BQU1DLFNBQVMsR0FBRyxJQUFJUixLQUFLLENBQUNTLFNB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\n//# sourceURL=webpack-internal:///463\n')}},__webpack_exports__={};__webpack_modules__[463]()})();