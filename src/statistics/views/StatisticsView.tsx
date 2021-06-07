import React from 'react';
import {
    Button,
    Flex,
    Heading
} from "@chakra-ui/react";
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useStatistics } from './../../common/hooks/useStatistics';
import { useEffect } from 'react';

export const StatisticsView: React.FC = () => {
    const [chartTitle, setChartTitle] = useState('Last month');
    const { chartLabels, chartData, fetchStatistics } = useStatistics();

    const setChart = (chartTitle: string): void => {
        setChartTitle(chartTitle);
        fetchStatistics(chartTitle);
    }

    const generateData = (labels: string[], data: number[]) => (
        {
            labels,
            datasets: [
                {
                    label: 'Sales amount in PLN',
                    data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        }
    );

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        maintainAspectRatio: true,
        responsive: true
    };

    const [data, setData] = useState(generateData([], []));

    useEffect(() => {
        fetchStatistics(chartTitle);
    }, []);

    useEffect(() => {
        setData(generateData(chartLabels, chartData));
    }, [chartLabels, chartData])

    return (
        <Flex flexDirection='column' height='calc(100vh - 50px)' alignItems='center' bgColor='#BFA5A4'>
            <Heading color='#574240' textAlign='center' mt={5} mb={8} fontSize='80px'>
                Statistics
            </Heading>
            <Heading color='#574240' textAlign='center' mt={5} mb={3} fontSize='30px' fontWeight='semibold'>
                {chartTitle}
            </Heading>
            <Flex width='600px' height='300px' mb={5}>
                <Bar data={data} options={options} type='bar'/>
            </Flex>
            <Flex justifyContent='center'>
                <Button mr={3} onClick={() => setChart('Last year')}>Last year</Button>
                <Button mr={3} onClick={() => setChart('This year')}>This year</Button>
                <Button mr={3} onClick={() => setChart('Last month')}>Last month</Button>
                <Button onClick={() => setChart('This month')}>This month</Button>
            </Flex>
        </Flex>

    );
}
