import api from './api';

export const groupLoad = (id) =>
  api.get(`/group/${id}`).then((res) => res.data);

export const groupAdd = (group) =>
  api.post('/group', group).then((res) => res.data);
