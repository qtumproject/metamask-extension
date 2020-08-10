import EventEmitter from 'events'
import React, { useState } from 'react'
import Mascot from './mascot.component'
import Button from '../button'
import ButtonGroup from '../button-group'

const animationEventEmitter = new EventEmitter()

const containerStyle = {
  height: '600px',
  width: '357px',
  border: '1px solid black',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const buttonStyle = {
  marginTop: '16px',
}

export default {
  title: 'Mascot',
}

export function Approve () {
  const [lookAtDirection, setLookAtDirection] = useState(null)
  const [followMouseMode, setFollowMouseMode] = useState(false)
  const [clickToLookMode, setClickToLookMode] = useState(false)
  const [clickedTarget, setClickedTarget] = useState(null)

  const createDirectionOnClick = (direction) => () => {
    setFollowMouseMode(false)
    setClickToLookMode(false)
    setLookAtDirection(direction)
  }

  return (
    <div
      style={containerStyle}
      onClick={(event) => {
        if (clickToLookMode) {
          setClickedTarget({ x: event.clientX, y: event.clientY })
        }
      }}
    >
      <Mascot
        animationEventEmitter={animationEventEmitter}
        width="120"
        height="120"
        followMouse={followMouseMode}
        lookAtTarget={clickedTarget}
        lookAtDirection={lookAtDirection}
      />
      <div style={buttonStyle}>
        <ButtonGroup
          style={{ width: '300px', flexFlow: 'column' }}
          defaultActiveButtonIndex={4}
        >
          <Button onClick={createDirectionOnClick('up')}>
            Up
          </Button>
          <Button onClick={createDirectionOnClick('down')}>
            Down
          </Button>
          <Button onClick={createDirectionOnClick('left')}>
            Left
          </Button>
          <Button onClick={createDirectionOnClick('right')}>
            Right
          </Button>
          <Button onClick={createDirectionOnClick('middle')}>
            Middle
          </Button>
          <Button
            onClick={() => {
              setFollowMouseMode(true)
              setClickToLookMode(false)
            }}
          >
            Follow Mouse mode
          </Button>
          <Button
            onClick={() => {
              setFollowMouseMode(false)
              setClickToLookMode(true)
            }}
          >
            Look a clicked location mode
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
