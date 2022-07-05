import api from "./api";

export const profileLoad = (id) =>
  api.get(`/profile/${id}`).then((response) => response.data);

export const profileEdit = (id, profile) =>
  api.patch(`/profile/${id}`, profile).then((response) => response.data);
