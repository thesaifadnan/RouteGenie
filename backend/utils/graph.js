export const locations = {
  "ISBT Dehradun": { lat: 30.3456, lng: 78.0322 },
  "Clock Tower": { lat: 30.3165, lng: 78.0322 },
  "Dehradun Railway Station": { lat: 30.3169, lng: 78.0328 },
  "Survey Chowk": { lat: 30.3246, lng: 78.0412 },
  "Rajpur Road": { lat: 30.3348, lng: 78.0429 },
  "Pacific Mall": { lat: 30.3187, lng: 78.0189 },
  "Ballupur Chowk": { lat: 30.3314, lng: 78.0521 },
  "Sahastradhara": { lat: 30.3709, lng: 78.0942 },
  "Dalanwala": { lat: 30.3278, lng: 78.0376 }
};

export const graph = {
  "ISBT Dehradun": {
    "Dehradun Railway Station": 5.1,
    "Ballupur Chowk": 6.0
  },
  "Dehradun Railway Station": {
    "ISBT Dehradun": 5.1,
    "Clock Tower": 0.5,
    "Survey Chowk": 3.0,
  },
  "Clock Tower": {
    "Dehradun Railway Station": 0.5,
    "Survey Chowk": 2.5,
    "Rajpur Road": 1.0,
    "Ballupur Chowk": 2.5,
    "Dalanwala": 1.0
  },
  "Survey Chowk": {
    "Clock Tower": 2.5,
    "Dehradun Railway Station": 3.0,
    "Rajpur Road": 0.8,
    "Dalanwala": 0.7,
    "Sahastradhara": 2.8
  },
  "Rajpur Road": {
    "Clock Tower": 1.0,
    "Survey Chowk": 0.8,
    "Ballupur Chowk": 2.1,
    "Pacific Mall": 4.0,
  },
  "Pacific Mall": {
    "Rajpur Road": 4.0,
    "Sahastradhara": 5.8
  },
  "Ballupur Chowk": {
    "Rajpur Road": 2.1,
    "Clock Tower": 2.5,
    "ISBT Dehradun": 6.0,
  },
  "Sahastradhara": {
    "Survey Chowk": 2.8,
    "Pacific Mall": 5.8,
  },
  "Dalanwala": {
    "Survey Chowk": 0.7,
    "Clock Tower": 1.0,
  }
};