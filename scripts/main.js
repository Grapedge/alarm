function app() {
  let map = new AMap.Map('container', {
    zoom: 17,
    viewMode: '3D',
  });

  let tMarker;
  map.on('click', function (ev) {
    const { lat, lng } = ev.lnglat;
    if (tMarker) map.remove(tMarker);
    tMarker = new AMap.Marker({
      position: [lng, lat], //位置
    });
    map.add(tMarker);
    alarm.startWatch(onAlarm, lng, lat);
  });

  var geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    buttonOffset: new AMap.Pixel(10, 20),
    zoomToAccuracy: true,
    buttonPosition: 'RB',
  });
  geolocation.getCurrentPosition();
  map.addControl(geolocation);
  const alarm = new Alarm(geolocation);
  function onAlarm(data) {
    alert('已到站: ' + data.formattedAddress);
  }
}

AMap.plugin('AMap.Geolocation', app);
