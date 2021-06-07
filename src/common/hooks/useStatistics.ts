import { useState } from 'react';
import {
    getCurrentMonthStatistics,
    getCurrentYearStatistics,
    getLastMonthStatistics,
    getLastYearStatistics
} from '../api/statisticsAPI';

export const useStatistics = () => {
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);

    const fetchStatistics = async (chartTitle: string): Promise<Boolean> => {
        let statistics: Object;

        switch (chartTitle) {
            case 'Last year':
                statistics = await getLastYearStatistics();
                break;
            case 'This year':
                statistics = await getCurrentYearStatistics();
                break;
            case 'Last month':
                statistics = await getLastMonthStatistics();
                break;
            case 'This month':
                statistics = await getCurrentMonthStatistics();
                break;
            default:
                statistics = await getLastMonthStatistics();
                break;
        }
        
        if (statistics !== null) {
            setChartLabels(Object.keys(statistics));
            setChartData(Object.values(statistics));
            return true;
        }

        return false;
    }
    
    return { chartLabels, chartData, fetchStatistics };
}
