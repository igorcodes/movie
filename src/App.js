import React from "react";
import Filters from "./components/Filters/Filters";
import VideoList from "./components/Videos/VideoList";
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">

          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters />
              </div>
            </div>
          </div>

          <div className="col-8">
            <h3>Рекомендуемые фильмы и сериалы:</h3>
            <VideoList />
          </div>

        </div>
      </div>
    );
  }
};
