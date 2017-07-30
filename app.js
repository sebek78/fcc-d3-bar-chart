const chart = document.getElementById("chart");
const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

fetch(url)
  .then((resp)=> resp.json())
  .then(function(data) {
    //success
      console.log(data.data);
  })
  .catch(function(error){
    console.log(error)
  });
