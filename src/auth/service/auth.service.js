import http from "@/core/http-common";

class AuthService {
  endPoint = "users/auth/";

  login(user) {
    return http
      .post(this.endPoint + "sign-in", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          console.log("user:" + response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return http.post(this.endPoint + "sign-up", {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
    });
  }
}
export default new AuthService();
