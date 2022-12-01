import express from "express";

export const home = (req, res) => res.send("home");
export const search = (req, res) => res.send("search");
export const watch = (req, res) => {
  console.log(req.params);
  return res.send("watch");
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const comments = (req, res) => res.send("comments");
