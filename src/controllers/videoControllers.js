import express from "express";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("videoPages/home", { pageTitle: "home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(400).redirect("/");
  }
  return res.render("videoPages/watch", { pageTitle: video.title, video });
};

export const getUpload = (req, res) => {
  return res.render("videoPages/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      loggedInUser: { _id },
    },
    body: { title, description, hashtags },
    file,
  } = req;
  await Video.create({
    fileUrl: file.path,
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
    owner: _id,
  });
  return res.redirect("/");
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    res.status(400).redirect("/");
  }
  return res.render("videoPages/edit", { pageTitle: "edit", video });
};
export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.status(200).redirect(`/videos/${id}`);
  } catch (error) {
    return res.status(400).redirect("/");
  }
};
export const remove = async (req, res) => {
  const { id } = req.params;
  const exists = Video.exists({ id });
  if (!exists) {
    res.status(400).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.status(200).redirect("/");
};
export const search = async (req, res) => {
  let videos = [];
  const keyword = req.query;
  if (keyword) {
    videos = await Video.find({ title: { $regex: new RegExp(keyword, "i") } });
  }
  res.status(200).render("videoPages/search", { pageTitle: "search", videos });
};
