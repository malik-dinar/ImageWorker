import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  // vus: 100,   // virtual users         
  // iterations: '100',   
  vus: 100,  // set 1000 virtual users
  duration: '5m',  // test duration
  // stages:[
  //   {duration: '2m', target: 5},
  //   {duration: '5m', target: 10},
  //   {duration: '2m', target: 5}
  // ],
   cloud: {
    projectID: 3782455,
    name: 'Test run image'
  }
};

const fileData = open('./sampleImg.png', 'b');

export default function () {

  const url = `http://localhost:5000/api/image-processing`; 

  const payload = {
    image: http.file(fileData, 'image.png', 'image/png'), 
  };

  const res = http.post(url, payload);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); 
}


//run command 
// k6 run upload-test.js - locally
// k6 cloud run upload-test.js - view visual from grafana instance