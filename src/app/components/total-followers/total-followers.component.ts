import { Component, ViewChild, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexGrid,
    ApexXAxis,
    ApexYAxis,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HttpClient } from '@angular/common/http';

export interface totalfollowersChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    responsive: ApexResponsive;
    grid: ApexGrid;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string | any;
}

@Component({
    selector: 'app-total-followers',
    standalone: true,
    imports: [MaterialModule, NgApexchartsModule, MatButtonModule, TablerIconsModule],
    templateUrl: './total-followers.component.html',
})
export class AppTotalFollowersComponent implements OnInit {
    totalFollowers: number = 0;

    @ViewChild('chart') chart: ChartComponent = Object.create(null);
    public totalfollowersChart!: Partial<totalfollowersChart> | any;

    constructor(private http: HttpClient) {
        this.totalfollowersChart = {
            series: [
                {
                    name: "Total",
                    data: [29, 52, 38, 47, 56, 67], // datos iniciales
                },
            ],
            chart: {
                fontFamily: "inherit",
                type: "bar",
                height: 100,
                stacked: true,
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true,
                },
            },
            grid: {
                show: false,
                borderColor: "rgba(0,0,0,0.1)",
                strokeDashArray: 1,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            colors: ["#ff6692", "#e7d0d9"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "30%",
                    borderRadius: [3],
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all",
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            tooltip: {
                theme: "dark",
            },
            legend: {
                show: false,
            },
        };
    }

    ngOnInit() {
        this.loadReservasData();
    }

    loadReservasData() {
        this.http.get<{ dia: string; total: number }[]>('http://localhost/reservas_por_dia.php')
            .subscribe(data => {
                const seriesData = data.map(item => item.total);
                this.totalFollowers = seriesData.reduce((a, b) => a + b, 0);

                // Actualizamos el chart con los datos recibidos
                this.totalfollowersChart.series = [
                    {
                        name: 'Reservas',
                        data: seriesData,
                    }
                ];

                this.totalfollowersChart.xaxis = {
                    categories: data.map(item => item.dia),
                    labels: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                };
            });
    }
}
