import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
  return res.render("userPages/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, password, password1, username, name, location } = req.body;
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (password !== password1) {
    return res.status(400).render("userPages/join", {
      pageTitle: "Join",
      errorMessage: "please check the password confirmation",
    });
  }
  if (exists) {
    return res.status(400).render("userPages/join", {
      pageTitle: "Join",
      errorMessage: "there is account has same email or username",
    });
  }
  await User.create({
    email,
    password,
    username,
    name,
    location,
  });
  return res.status(200).redirect("/login");
};
export const getLogin = (req, res) => {
  return res.render("userPages/login", { pageTitle: "login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("userPages/login", {
      pageTitle: "login",
      errorMessage: "there is no user with username you input",
    });
  }
  const vaildPassword = await bcrypt.compare(password, user.password);
  if (!vaildPassword) {
    return res.render("userPages/login", {
      pageTitle: "login",
      errorMessage: "invailed password",
    });
  }
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};

export const startGitHubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    scope: "read:user user:email",
    allow_signup: false,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGitHubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userRequest);
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("userPages/edit", { pageTitle: "edit profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      loggedInUser: { _id },
    },
    body: { email, name, location, avatar },
    file,
  } = req;
  if (res.locals.loggedInUser.email !== email) {
    const exists = await User.exists({ email });
    if (exists) {
      return res.redirect("/");
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { email, name, location, avatarUrl: file ? file.path : avatar },
        { new: true }
      );
      req.session.loggedInUser = updatedUser;
      return res.redirect("/");
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { email, name, location, avatar: file ? file.path : avatar },
    { new: true }
  );
  req.session.loggedInUser = updatedUser;
  return res.redirect("/");
};

export const getPassword = (req, res) => {
  return res.render("userPages/change-password", {
    pageTitle: "change-password",
  });
};
export const postPassword = async (req, res) => {
  const {
    session: {
      loggedInUser: { _id },
    },
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  if (newPassword !== newPassword1) {
    return res.status(400).render("userPages/change-password", {
      pageTitle: "change-password",
      errorMessage: "please check password confirmation",
    });
  }
  const user = await User.findById(_id);
  const vaildPassword = await bcrypt.compare(oldPassword, user.password);
  if (!vaildPassword) {
    return res.status(400).render("userPages/change-password", {
      pageTitle: "change-password",
      errorMessage: "please check old password",
    });
  }
  user.password = newPassword;
  await user.save();
  req.session.loggedInUser.password = user.password;
  return res.status(200).redirect("/users/edit");
};
