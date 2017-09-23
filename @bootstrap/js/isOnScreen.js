$.fn.isOnScreen = function (partial) {
  const t = $(this).first()

  const box = t[0].getBoundingClientRect()

  const win = {
    h: $(window).height(),
    w: $(window).width(),
  }
  const topEdgeInRange = box.top >= 0 && box.top <= win.h
  const bottomEdgeInRange = box.bottom >= 0 && box.bottom <= win.h

  const leftEdgeInRange = box.left >= 0 && box.left <= win.w
  const rightEdgeInRange = box.right >= 0 && box.right <= win.w

  const coverScreenHorizontally = box.left <= 0 && box.right >= win.w
  const coverScreenVertically = box.top <= 0 && box.bottom >= win.h

  const topEdgeInScreen = topEdgeInRange && (leftEdgeInRange ||
    rightEdgeInRange || coverScreenHorizontally)
  const bottomEdgeInScreen = bottomEdgeInRange && (leftEdgeInRange ||
    rightEdgeInRange || coverScreenHorizontally)

  const leftEdgeInScreen = leftEdgeInRange && (topEdgeInRange ||
    bottomEdgeInRange || coverScreenVertically)
  const rightEdgeInScreen = rightEdgeInRange && (topEdgeInRange ||
    bottomEdgeInRange || coverScreenVertically)

  const isPartiallyOnScreen = topEdgeInScreen || bottomEdgeInScreen ||
    leftEdgeInScreen || rightEdgeInScreen
  const isEntirelyOnScreen = topEdgeInScreen && bottomEdgeInScreen &&
    leftEdgeInScreen && rightEdgeInScreen

  return partial ? isPartiallyOnScreen : isEntirelyOnScreen
}
