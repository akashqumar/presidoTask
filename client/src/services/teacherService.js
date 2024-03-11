import axios from 'axios';

const API_URL = 'https://teachback.onrender.com/api/teachers/';

const getAllTeachers = () => {
  return axios.get(API_URL);
};

const addTeacher = (teacherData) => {
  return axios.post(API_URL, teacherData);
};

const updateTeacher = (id, teacherData) => {
  return axios.patch(`${API_URL}/${id}`, teacherData);
};

const deleteTeacher = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const filterTeachers = (criteria) => {
  return axios.post(`${API_URL}/filter`, criteria);
};

export default {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  filterTeachers
};
