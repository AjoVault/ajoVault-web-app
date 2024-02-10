import React from 'react';

class MyComponent extends React.Component {
  render() {
    const imageUrl = "https://res.cloudinary.com/dws3lnn4d/image/upload/v1706269001/AjoVault%20App/logo_cn0nrq.svg";
    return <img src={imageUrl} alt="placeholder" />;
  }
}

export default MyComponent;
