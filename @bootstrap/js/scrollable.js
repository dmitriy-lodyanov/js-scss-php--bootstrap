export function makeScrollable ($node) {
  const $contents = $node.contents()
  const $inner = $('<div class="inner-scroll"/>')
  $node.append($inner)
  $contents.detach()
  $inner.append($contents)
  $inner.scrollbar({
    showArrows: true,
    scrolly: 'advanced',
  })
}
