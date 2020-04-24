/**
 * 创建闹钟
 */
function Alarm(geolocation, { gapTime = 10000 } = {}) {
  let watcher;
  let isLocating = false;

  let callback;
  let tPos = [];
  /**
   * 开始监控
   */
  this.startWatch = function (fn, lng, lat) {
    callback = fn;
    tPos = [lng, lat];
    if (watcher) clearInterval(watcher);
    const runner = () => {
      if (isLocating) return;
      geolocation.getCurrentPosition();
    };
    runner();
    watcher = setInterval(runner, gapTime);
  };

  AMap.event.addListener(geolocation, 'complete', onLocated);
  AMap.event.addListener(geolocation, 'error', onError);
  function onLocated(data) {
    console.log(data);
    const dis = AMap.GeometryUtil.distance(
      [data.position.lng, data.position.lat],
      [...tPos]
    );
    if (dis <= 500) {
      if (typeof callback === 'function') callback(data);
      clearInterval(watcher);
    }
  }

  function onError(data) {
    clearInterval(watcher);
    alert('定位出错：' + data.message);
  }
}
