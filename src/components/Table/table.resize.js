import {$} from '@core/Dom';

export function resizeHandler(e) {
  return new Promise(resolve => {
    const $target = $(e.target)
    const parent = $target.closest('[data-type]')
    const coords = parent.coords()
    const type = parent.data('type')
    let value
    const resizeNum = type === 'col' ? parent.data('col') : parent.data('row')

    $target.addClass('resize-active')
    const cells = document.querySelectorAll(
        `[data-col="${parent.data('col')}"]`
    )

    document.onmousemove = function(e) {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = `${coords.width + delta}`

        $target.css({left: value + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = `${coords.height + delta}`
        $target.css({top: value + 'px'})
      }
    }

    document.onmouseup = function() {
      if (type === 'col') {
        cells.forEach(cell => {
          $(cell).css({width: value + 'px'})
        })
      } else {
        parent.css({height: value + 'px'})
      }

      resolve({
        value,
        id: resizeNum,
        type
      })

      $target.removeClass('resize-active')
      document.onmousemove = null
      document.onmouseup = null
    }
  })
}
