export function checkTime() {
  const hours = 1;
  const now = new Date().getTime();
  const setupTime = localStorage.getItem('setupTime');

  if (setupTime == null) {
    localStorage.setItem('setupTime', now);
  } else {
    if(now - setupTime > hours*60*60*1000) {
      localStorage.clear()
      localStorage.setItem('setupTime', now);
    }
  }
};