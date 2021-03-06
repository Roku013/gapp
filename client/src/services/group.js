import api from './api';

export const groupListLoad = (groupName) =>
  api.get(`/group`, groupName).then((res) => res.data);

export const groupAdd = (group) =>
  api.post('/group/add', group).then((res) => res.data);

export const groupSearch = (groupName) =>
  api.get(`/group?groupName=${groupName}`).then((res) => res.data);

export const listGroups = (id) =>
  api.get(`/group/profile/${id}`).then((res) => res.data);

export const groupMemberSearch = (id, name) =>
  api.get(`/group/${id}/member/search?name=${name}`).then((res) => res.data);

export const groupMemberAdd = (id, member) =>
  api.post(`/group/${id}/member/add`, { member }).then((res) => res.data);

export const groupMemberDelete = (id, group) =>
  api.delete(`/group/${id}/member/add?group=${group}`).then((res) => res.data);

export const groupLoad = (id) =>
  api.get(`/group/${id}`).then((res) => res.data);

export const groupEdit = (id, group) =>
  api.patch(`/group/${id}`, group).then((res) => res.data);

export const groupRemove = (id) =>
  api.delete(`/group/${id}`).then((res) => res.data);
