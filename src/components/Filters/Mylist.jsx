import React from "react";
import MyVideoItem from "../Videos/MyVideoItem";

const posterlink = [];
const posterlink2 = new Set();
const titlelink2 = new Set();
const titlelink = [];
const posters = [];
const titles = [];

export default class Mylist extends React.Component {
	han = () => {
    var cookies = document.cookie.split(/;/);
    for (var i = 0, len = cookies.length; i < len; i++) {
    var cookie = cookies[i].split(/=/);
    console.log("cookie", cookie)
    posters.push(cookie[0]);
    console.log("posters", posters)
    titles.push('t' + cookie[1]);
    console.log("titles", titles)
    }

    for (let poster of posters) {
        if (poster[1] === "/") { posterlink2.add('https://image.tmdb.org/t/p/w500' + poster.slice(1)) }
         else if (poster[0] === "/") { posterlink2.add('https://image.tmdb.org/t/p/w500' + poster.slice(0)) }
    }
    console.log("posterlink2", posterlink2)


    for (let title of titles) {
      if (title[0] == "t" && title.length>3) {
        let str = "";
        for (let char of title) {
          if (char == '%' || char == 2 ||char ==  0) {str = str + ' '} else {str = str + char} 
        }
        console.log("str", str)
        console.log("str.length", str.length)
        if(str.length<40 ){titlelink2.add(str.slice(1))}
        console.log("titlelink2", titlelink2)
      }
    }
  }


  link2 = () => {
      titlelink2.forEach((value) => { 
        if (titlelink.indexOf(value) === -1) {
          titlelink.push(value);
        }
        });
        console.log("titlelink", titlelink)
      }

  link1 = () => {
    posterlink2.forEach((value) => { 
        if (posterlink.indexOf(value) === -1) {
          posterlink.push(value);
        }
        });
        console.log("posterlink", posterlink)
      }

  MyVideoList = () => (
    <div className="row">
      <h1 align="center"><strong><br/>Отмеченные Фильмы:</strong></h1>
          {titlelink.map(title => {                       
              return (
                <div className="col-6 mb-4">
                  <MyVideoItem item={title} posterlink={posterlink} titlelink={titlelink} />
                </div>
              );
          })}
    </div>
  );
  
	render() {
		return (
						  <div className="container">
                {this.han()}
                {this.link1()}
                {this.link2()}
                {this.MyVideoList()}
						  </div>
		)
	}
}


