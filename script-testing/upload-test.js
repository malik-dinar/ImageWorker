import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,            
  duration: '30s',   
};

const fileData = open('./sampleImg.png', 'b');

export default function () {
  const BASE_URL = __ENV.BASE_URL;

  const url = `${BASE_URL}/api/image-processing`; 

  const payload = {
    image: http.file(fileData, 'image.png', 'image/png'), 
  };

  const res = http.post(url, payload);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); 
}
