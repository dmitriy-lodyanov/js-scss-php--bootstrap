export const isInputLocked = false

export const MOUSE_WHEEL_EV = 'DOMMouseScroll mousewheel wheel'
export const ANIMATION_END_EV =
  'webkitAnimationEnd oanimationend msAnimationEnd animationend'

export function animate ($node, animationName, cb) {
  if ($node.currentAnimation) {
    $node
      .off(ANIMATION_END_EV)
      .removeClass($node.currentAnimation)

    if ($node.currentAnimationCB) {
      $node.currentAnimationCB()
    }

    delete $node.currentAnimation
    delete $node.currentAnimationCB
  }

  $node.currentAnimation = animationName
  $node.currentAnimationCB = cb

  $node
    .addClass(animationName)
    .on(ANIMATION_END_EV, (e) => {
      if (e.target !== e.currentTarget) {
        return
      }
      delete $node.currentAnimation
      delete $node.currentAnimationCB

      $node
        .off(ANIMATION_END_EV)
        .removeClass(animationName)

      if (cb) {
        cb()
      }
    })
}
