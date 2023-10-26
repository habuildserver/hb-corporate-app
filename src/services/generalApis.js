const API_BASE_URL = process.env.API_BASE_URL;

export const LoginApis = {
    LOGIN: () => `${API_BASE_URL}/login`,
    LOGOUT: () => `${API_BASE_URL}/logout`,
  };

export const CorporatedataApis = {
  GET_ORG_STATS: ()=> `${API_BASE_URL}/getOrgStats`,
  GET_ORG_PARTICIPATION: (range)=>`${API_BASE_URL}/getOrgParticipation?range=${range}`,
  GET_ORG_ATTENDANCE: ()=>`${API_BASE_URL}/getOrgAttendance`,
  GET_ORG_AGE_PARTICIPATION: ()=>`${API_BASE_URL}/getAgeStats`,
  GET_ORG_GENDER_PARTICIPATION: ()=>`${API_BASE_URL}/getGenderStats`,
  GET_ORG_POWER_USER: ()=>`${API_BASE_URL}/getOrgPowerUsers`,
  GET_EMPLOYEE_LIST: (pagenumber)=>`${API_BASE_URL}/getEmployeeList?pagesize=50&pagenumber=${pagenumber}`,
  SEARCH_EMPLOYEE: (searchFor,searchTerm)=>`${API_BASE_URL}/getCorporateMemberdetails/${searchFor}/${searchTerm}`
}