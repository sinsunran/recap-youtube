import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  return next();
};

export const loginOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn === true) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn === true) {
    return res.redirect("/");
  } else {
    return next();
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatars/",
  limits: {
    fieldSize: 1000000,
  },
});
export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: {
    fieldSize: 1000000,
  },
});
