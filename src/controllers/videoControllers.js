import express from "express";

export const upload = (req, res) => res.send("upload");
export const comment = (req, res) => res.send("comment");
export const watch = (req, res) => res.send("watch");
export const remove = (req, res) => {
  console.log(req.params);
  res.send("remove");
};
export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => res.send("search");
