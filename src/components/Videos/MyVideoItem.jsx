import React from "react";

export default class MyVideoItem extends React.PureComponent {


  render() {
    const { item, titlelink, posterlink } = this.props;
    const x = titlelink.indexOf(item)
    
    return (
      <div className="card bg-dark text-white mb-3" style={{ width: "100%" }}>
		  <img className="card-img-top card-img--height" src={posterlink[x]} alt="" />
        <div className="card-body">
          <div className="card-header">
          <h3>Фильм:</h3>
          <h3><strong>{item}</strong></h3>
          </div>
		</div>
      </div>
    );
  }
}

/* , ${item.title} */
