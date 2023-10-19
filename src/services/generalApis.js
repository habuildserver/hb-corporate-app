const API_BASE_URL = process.env.API_BASE_URL;

export const LoginApis = {
    LOGIN: () => `${API_BASE_URL}/login`,
    LOGOUT: () => `${API_BASE_URL}/logout`,
  };

export const CorporatedataApis = {
  GET_ORG_STATS: ()=> `${API_BASE_URL}/getOrgStats`,
  GET_ORG_PARTICIPATION: ()=>`${API_BASE_URL}/getOrgParticipation`,
  GET_ORG_ATTENDANCE: ()=>`${API_BASE_URL}/getOrgAttendance`,
  GET_ORG_AGE_PARTICIPATION: ()=>`${API_BASE_URL}/getAgeStats`,

}