// routegenie/utils/graph.js - Same for both frontend and backend
export const locations = {
  "Clock Tower": { lat: 30.3165, lng: 78.0322 },
  "Rajpur Road": { lat: 30.3348, lng: 78.0429 },
  "ISBT Dehradun": { lat: 30.3456, lng: 78.0322 },
  "Sahastradhara": { lat: 30.3709, lng: 78.0942 },
  "Forest Research Institute": { lat: 30.3462, lng: 77.9923 },
  "Dehradun Railway Station": { lat: 30.3169, lng: 78.0328 },
  "Pacific Mall": { lat: 30.3187, lng: 78.0189 },
  "Survey Chowk": { lat: 30.3246, lng: 78.0412 },
  "Ballupur Chowk": { lat: 30.3314, lng: 78.0521 },
  "Dalanwala": { lat: 30.3278, lng: 78.0376 },
  "Clement Town": { lat: 30.3582, lng: 77.9936 },
  "Premnagar": { lat: 30.3391, lng: 77.9993 },
  "Subhash Nagar": { lat: 30.3215, lng: 78.0254 },
  "Majra": { lat: 30.3058, lng: 78.0473 },
  "Raipur": { lat: 30.3625, lng: 78.0589 },
  "Mussoorie Diversion": { lat: 30.3802, lng: 78.0678 },
  "Haridwar Bypass": { lat: 30.3512, lng: 78.0123 }
};

export const graph = {
  "Clock Tower": {
    "Rajpur Road": 3.2,
    "ISBT Dehradun": 4.1,
    "Dehradun Railway Station": 0.5,
    "Pacific Mall": 1.8,
    "Survey Chowk": 1.2
  },
  "Rajpur Road": {
    "Clock Tower": 3.2,
    "Forest Research Institute": 6.0,
    "Ballupur Chowk": 2.1,
    "Dalanwala": 1.5
  },
  "ISBT Dehradun": {
    "Clock Tower": 4.1,
    "Sahastradhara": 7.8,
    "Premnagar": 3.5,
    "Haridwar Bypass": 5.2
  },
  "Sahastradhara": {
    "ISBT Dehradun": 7.8,
    "Mussoorie Diversion": 4.3,
    "Raipur": 8.5
  },
  "Forest Research Institute": {
    "Rajpur Road": 6.0,
    "Clement Town": 2.8,
    "Premnagar": 4.2,
    "Clock Tower": 5.7
  },
  "Dehradun Railway Station": {
    "Clock Tower": 0.5,
    "Subhash Nagar": 1.8,
    "Majra": 3.2
  },
  "Pacific Mall": {
    "Clock Tower": 1.8,
    "Subhash Nagar": 1.0,
    "Survey Chowk": 1.5
  },
  "Survey Chowk": {
    "Clock Tower": 1.2,
    "Pacific Mall": 1.5,
    "Dalanwala": 0.8
  },
  "Ballupur Chowk": {
    "Rajpur Road": 2.1,
    "Dalanwala": 1.2,
    "Raipur": 5.8
  },
  "Dalanwala": {
    "Rajpur Road": 1.5,
    "Survey Chowk": 0.8,
    "Ballupur Chowk": 1.2,
    "Subhash Nagar": 1.7
  },
  "Clement Town": {
    "Forest Research Institute": 2.8,
    "Premnagar": 3.0
  },
  "Premnagar": {
    "ISBT Dehradun": 3.5,
    "Forest Research Institute": 4.2,
    "Clement Town": 3.0,
    "Haridwar Bypass": 2.5
  },
  "Subhash Nagar": {
    "Dehradun Railway Station": 1.8,
    "Pacific Mall": 1.0,
    "Dalanwala": 1.7,
    "Majra": 2.3
  },
  "Majra": {
    "Dehradun Railway Station": 3.2,
    "Subhash Nagar": 2.3
  },
  "Raipur": {
    "Sahastradhara": 8.5,
    "Ballupur Chowk": 5.8,
    "Mussoorie Diversion": 6.2
  },
  "Mussoorie Diversion": {
    "Sahastradhara": 4.3,
    "Raipur": 6.2
  },
  "Haridwar Bypass": {
    "ISBT Dehradun": 5.2,
    "Premnagar": 2.5
  }
};

// Optional: Add road types for vehicle restrictions
export const roadTypes = {
  "Clock Tower-Rajpur Road": "main",
  "Rajpur Road-Forest Research Institute": "main",
  "ISBT Dehradun-Sahastradhara": "hilly",
  "Majra-Subhash Nagar": "narrow"
};