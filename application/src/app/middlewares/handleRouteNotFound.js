const RouteNotFoundError = require("../errors/RouteNotFoundError");

module.exports = function handleRouteNotFound(request, response, next) {
  const routeNotFoundError = new RouteNotFoundError({ request });
  response.status(404).json(routeNotFoundError.asJSON());
};
