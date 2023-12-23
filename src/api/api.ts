/* eslint-disable */

import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

export const searchUsers = async (query: string) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}`);
    console.log("Success, can fetch: ", response.data.items[0].login)
    return response.data.items;

  } catch (error) {
    console.log('GitHub API Error:', error);
    return error;
    // throw error;
  }
};

export const getDetailUser = async (username: string) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      console.log("Found this user details:", response.data.login)
      return response.data;
      
    } catch (error) {
      console.log('GitHub API Error:', error);
      return error;
      // throw error;
    }
  };
