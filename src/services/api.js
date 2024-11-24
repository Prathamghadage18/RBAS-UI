import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000";

// Centralized Error Handler
const handleRequestError = (error) => {
  if (error.response) {
    console.error("API response error:", error.response);
  } else if (error.request) {
    console.error("API request error:", error.request);
  } else {
    console.error("General error:", error.message);
  }
  throw error;
};

// USERS
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    handleRequestError(error);
  }
};

// ROLES
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const createRole = async (role) => {
  try {
    const response = await axios.post(`${API_URL}/roles`, role);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updateRole = async (id, role) => {
  try {
    const response = await axios.put(`${API_URL}/roles/${id}`, role);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/roles/${id}`);
    console.log(`Role with ID ${id} deleted successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error);
    throw error;
  }
};


// PERMISSIONS
export const getPermissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/permissions`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const addPermission = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/permissions`, { name });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const deletePermission = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete permission with id "${id}":`, error);
    throw error;
  }
};

