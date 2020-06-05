import service from './config';

class Login {
  login(params) {
    return service.post('login', params)
  }
}
export default new Login()