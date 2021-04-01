import React, { Component } from 'react';
import ContentLoader from 'react-content-loader'
class productListLoader extends Component {
  render() {
    return (
      <div className="row">
      {[...Array(3)].map((x, i) =>
        <div className="col-4 col-md-4" key={i}>
          <ContentLoader speed={2} viewBox="0 0 400 700" backgroundColor="#fff" foregroundColor="#e0e0e0">
            <rect x="0" y="0" rx="20" ry="20" width="400" height="646" />
          </ContentLoader>
        </div>
      )}
    </div>
    );
  }
}

export default productListLoader