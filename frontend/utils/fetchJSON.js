// import fetch from 'unfetch'
import axios from 'axios'

const fetchList = async function fetchList(url, options) {
  options.headers = Object.assign({
    'Accept': 'application/json',
    'Authorization': 'Bearer nextadmin'
  }, options.headers);
  if(typeof data !== 'string') {
    options.data = JSON.stringify(options.data);
  }
  // console.log(options);
  
  // complex POST request with JSON, headers:
  const res = await axios(url, options);

  return { data: res.data.data, total: res.data.total};
}

const fetchCRUD = async function fetchCRUD(url, options) {
  options.headers = Object.assign({
    'Accept': 'application/json',
    'Authorization': 'Bearer nextadmin'
  }, options.headers);
  if(typeof body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  // console.log(options);
  
  // complex POST request with JSON, headers:
  const res = await axios(url, options);
  const data = await res.data;

  return { data };
}

//versi fetch
// const fetchList = async function fetchList(url, options) {
//   options.headers = Object.assign({
//     'Accept': 'application/json',
//     'Authorization': 'Bearer nextadmin'
//   }, options.headers);
//   if(typeof body !== 'string') {
//     options.body = JSON.stringify(options.body);
//   }
//   // console.log(options);
  
//   // complex POST request with JSON, headers:
//   const res = await fetch(url, options);
//   const data = await res.json();

//   return { data: data.data, total: data.total};
// }

// const fetchCRUD = async function fetchCRUD(url, options) {
//   options.headers = Object.assign({
//     'Accept': 'application/json',
//     'Authorization': 'Bearer nextadmin'
//   }, options.headers);
//   if(typeof body !== 'string') {
//     options.body = JSON.stringify(options.body);
//   }
//   // console.log(options);
  
//   // complex POST request with JSON, headers:
//   const res = await fetch(url, options);
//   const data = await res.json();

//   return { data };
// }

export {
  fetchList,
  fetchCRUD
}