import axios from 'axios';

export const getLastMonthStatistics = (): Promise<Object> => (
    axios.get('/api/Statistics/month/last')
         .then(response => response.data)
         .catch(() => null)
);

export const getCurrentMonthStatistics = (): Promise<Object> => (
    axios.get('/api/Statistics/month/current')
         .then(response => { console.log(response.data); return response.data})
         .catch(() => null)
);

export const getLastYearStatistics = (): Promise<Object> => (
    axios.get('/api/Statistics/year/last')
         .then(response => response.data)
         .catch(() => null)
);

export const getCurrentYearStatistics = (): Promise<Object> => (
    axios.get('/api/Statistics/year/current')
         .then(response => response.data)
         .catch(() => null)
);
