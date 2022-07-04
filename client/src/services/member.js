import api from './api';

export const listMembers = () => api.get('/group').then((res) => res.data);

export const memberAdd = (member) =>
  api.post('/member/add', member).then((res) => res.data);

export const memberLoad = (id) =>
  api.get(`/member/${id}`).then((res) => res.data);

export const memberEdit = (id, member) =>
  api.patch(`/member/${id}`, member).then((res) => res.data);

export const memberRemove = (id) =>
  api.delete(`/member/${id}`).then((res) => res.data);
