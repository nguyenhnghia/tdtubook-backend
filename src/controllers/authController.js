class AuthController {
  // [get] /auth
  Hello(req, res) {
    res.send("hello world");
  }
}
module.exports = new AuthController();
