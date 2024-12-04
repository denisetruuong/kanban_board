import { JwtPayload, jwtDecode } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  esp?: number;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
    // TODO: return the decoded token
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
    // TODO: return a value that indicates if the user is logged in
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.esp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.esp < currentTime;
      }
      return false;
    } catch (err) {
      return false;
    }
    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string | null {
    return localStorage.getItem("id_token");
    // TODO: return the token
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  }
}

export default new AuthService();
