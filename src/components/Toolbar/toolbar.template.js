function createButton(button) {
  const meta = `
    data-type="button" 
    data-value='${JSON.stringify(button.value)}'
  `
  let classes = 'button'
  classes += button.active ? ' active' : ''

  return `
     <div class=" ${classes}" ${meta}>
        <span class="material-icons" ${meta}>
            ${button.name}
        </span>
    </div>
  `
}

function propsStateForButton(icon, state, prop, defaultValue, value) {
  return {
    name: icon,
    active: state[prop] === value,
    value: {[prop]: state[prop] === value ? defaultValue : value}
  }
}

export function renderToolbar(state) {
  const buttonNames = [
    propsStateForButton(
        'format_align_left',
        state,
        'textAlign',
        'left',
        'left'
    ),
    propsStateForButton(
        'format_align_center',
        state,
        'textAlign',
        'left',
        'center'
    ),
    propsStateForButton(
        'format_align_right',
        state,
        'textAlign',
        'left',
        'right'
    ),
    propsStateForButton(
        'format_italic',
        state,
        'fontStyle',
        'normal',
        'italic'
    ),
    propsStateForButton(
        'format_underlined',
        state,
        'textDecoration',
        'none',
        'underline'
    ),
    propsStateForButton(
        'format_bold',
        state,
        'fontWeight',
        'normal',
        'bold'
    )
  ]

  return buttonNames.map(createButton).join('')
}
