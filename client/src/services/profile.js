import api from "./api";

export const profileLoad = (id) =>
  api.get(`/profile/${id}`).then((response) => response.data);

export const profileEdit = (id, userEdit) =>
  api.patch(`/profile/${id}`, userEdit).then((response) => response.data);
