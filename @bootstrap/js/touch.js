function isTouchDevice () {
  return 'ontouchstart' in window || navigator.maxTouchPoints
}
if (isTouchDevice()) {
  $('html').addClass('touch')
} else {
  $('html').addClass('no-touch')
}

function isIOS () {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}
if (isIOS()) {
  $('html').addClass('ios')
}
