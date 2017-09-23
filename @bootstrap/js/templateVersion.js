import './touch'

function checkViewTemplateVersion () {
  const w = $(window).width()
  if (w >= 992) {
    global.viewTemplateVersion = 'desktop'
  } else if (w >= 768) {
    global.viewTemplateVersion = 'tablet'
  } else {
    global.viewTemplateVersion = 'mobile'
  }
}

$(window).on('resize', function () {
  checkViewTemplateVersion()
})

if ($('html').hasClass('touch')) {
  global.systemTemplateVersion = 'mobile'
} else {
  global.systemTemplateVersion = 'desktop'
}

checkViewTemplateVersion()
