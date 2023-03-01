module.exports = {
  headers: {
    authorization: {
      pattern: /^Bearer .+$/g,
      extractTokenPattern: /^Bearer /g,
    },
  },
  user: {
    username: {
      pattern: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
    },
  },
};
