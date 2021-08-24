import axios from "axios";

//conexao com api Phyton
export function getAPIClient(ctx?:any){
  
 const api = axios.create({
  baseURL:'https://api.cachebank.com.br/api/v2'
})

api.interceptors.request.use(config =>{
  console.log(config)

  return config;
})


  api.defaults.headers['client_id'] = `apk611a73d43e8f74.30989668`;
  api.defaults.headers['client_secret'] = `3efbeaca60bde57c779f84672c24cc26`;

return api
}