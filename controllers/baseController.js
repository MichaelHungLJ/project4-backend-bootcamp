class BaseController {
  constructor(model) {
    this.model = model;
  }

  test(req, res) {
    return res.send("Test router is hit!");
  }
}

module.exports = BaseController;
