import React, { Component } from 'react';
import ContentLoader from 'react-content-loader'
class productDetailLoader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-6">
          <ContentLoader speed={2} viewBox="0 0 800 800">
            <rect x="0" y="18" rx="0" ry="0" width="100%" height="600" />
            <rect x="10" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="110" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="210" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="310" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="410" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="510" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="610" y="640" rx="0" ry="0" width="80" height="80" />
            <rect x="710" y="640" rx="0" ry="0" width="80" height="80" />
          </ContentLoader>
        </div>
        <div className="col-12 col-md-6">
          <ContentLoader speed={2} viewBox="0 0 800 800">
            <rect x="0" y="18" rx="0" ry="0" width="50%" height="20" />
            <rect x="0" y="58" rx="0" ry="0" width="50%" height="20" />
            <rect x="0" y="68" rx="0" ry="0" width="50%" height="20" />
            <rect x="0" y="110" rx="0" ry="0" width="50%" height="20" />
            <rect x="0" y="170" rx="0" ry="0" width="50%" height="26" />
            <rect x="0" y="180" rx="0" ry="0" width="50%" height="25" />
            <rect x="0" y="240" rx="0" ry="0" width="80%" height="26" />
            <rect x="0" y="330" rx="0" ry="0" width="50%" height="30" />
            <rect x="0" y="380" rx="0" ry="0" width="50%" height="30" />
            <rect x="0" y="455" rx="5" ry="5" width="50%" height="50" />
            <rect x="0" y="530" rx="5" ry="5" width="80%" height="50" />
            <rect x="0" y="610" rx="5" ry="5" width="80%" height="50" />
            <rect x="0" y="680" rx="5" ry="5" width="80%" height="50" />
          </ContentLoader>
        </div>
      </div>
    );
  }
}

export default productDetailLoader