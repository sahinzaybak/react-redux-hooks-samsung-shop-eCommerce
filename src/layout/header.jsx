import React, { PureComponent } from 'react'
import '../assets/scss/layout/header.scss'
import headerImage from '../assets/images/header.png'

class header extends PureComponent {

  render() {
    return (
      <div className="header">
        <img src={headerImage} alt=""/>
      </div>
    )
  }
}

export default header;
