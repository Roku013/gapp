import api from './api';

export const listGroups = () =>
  api.get('/group').then((response) => response.data);

export const groupAdd = (group) =>
  api.post('/group/add', group).then((res) => res.data);

export const groupLoad = (id) =>
  api.get(`/group/${id}`).then((res) => res.data);
