import React from 'react'
import { Line, Doughnut } from "react-chartjs-2"
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip } from "chart.js"
import { getLastSevenDays } from '../../lib/features'
import { orange } from '../constants/color'

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip)

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
}

const labels = getLastSevenDays()

const LineChart = ({ value = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,0.2)"
            }
        ]
    }


    return <Line data={data} options={lineChartOptions} />

}

const doughnutChartOption = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true
        },
    },
    tooltips: {
        enabled: true
    }

}

const DoughnutChart = ({ value = [], labels }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Total Chats vs Group Chats",
                backgroundColor: ["rgba(75,192,192,0.2)", orange],
                borderColor: ["rgba(75,192,192,0.2)", orange],
                offset: 40
            }
        ],
    }

    return <Doughnut
        style={{ zIndex: 20 }}
        data={data}
        options={doughnutChartOption}
    />
}

export { LineChart, DoughnutChart }
