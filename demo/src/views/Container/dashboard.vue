<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card v-loading="CenterDataLoading" element-loading-text="正在玩命加载数据中...">
                    <div slot="header">
                        <span>教师数量</span>
                    </div>
                    <h3 style="margin: 0;">{{teacherNum}}</h3>
                    <div style="text-align: right;">
                        <el-tag size="mini">实时</el-tag>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-loading="CenterDataLoading" element-loading-text="正在玩命加载数据中...">
                    <div slot="header">
                        <span>学生数量</span>
                    </div>
                    <h3 style="margin: 0;">{{studentNum}}</h3>
                    <div style="text-align: right;">
                        <el-tag size="mini">实时</el-tag>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>不知道写啥</span>
                    </div>
                    <h3 style="margin: 0;">1234人</h3>
                    <div style="text-align: right;">
                        <el-tag size="mini">实时</el-tag>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>不知道写啥</span>
                    </div>
                    <h3 style="margin: 0;">1234人</h3>
                    <div style="text-align: right;">
                        <el-tag size="mini">实时</el-tag>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-top: 25px;">
            <el-col :span="15">
                <el-card>
                    <div slot="header">
                        <span>实时数据</span>
                    </div>
                    <div id="echartsData" style="width: 100%;height: 300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="9">
                <el-card v-loading="CenterDataLoading" element-loading-text="正在玩命加载数据中...">
                    <div slot="header">
                        <span>平台简介</span>
                    </div>
                    <p style="margin: 0;">{{Notice}}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as echarts from "echarts"
    import axios from "axios"
    export default {
        name: "dashboard",
        data() {
            return {
                teacherNum: 0,
                studentNum: 0,
                Notice: "这里是教务系统，目前还没有进行后端请求，请用axios后端请求获取相关数据2022-03-25",
                echartsOption: {
                    color: ['#80FFA5', '#00DDFF'],
                    title: {
                        text: '测试图表'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                            name: 'Line 1',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(128, 255, 165)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(1, 191, 236)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [140, 232, 101, 264, 90, 340, 250]
                        },
                        {
                            name: 'Line 2',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(0, 221, 255)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(77, 119, 255)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [120, 282, 111, 234, 220, 340, 310]
                        },
                        {
                            name: 'Line 3',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(55, 162, 255)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(116, 21, 219)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [320, 132, 201, 334, 190, 130, 220]
                        },
                        {
                            name: 'Line 4',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(255, 0, 135)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(135, 0, 157)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [220, 402, 231, 134, 190, 230, 120]
                        },
                        {
                            name: 'Line 5',
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 0
                            },
                            showSymbol: false,
                            label: {
                                show: true,
                                position: 'top'
                            },
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(255, 191, 0)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(224, 62, 76)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [220, 302, 181, 234, 210, 290, 150]
                        }
                    ]
                }
            }
        },
        mounted() {
            // 挂载事件
            this.xrEcharts();
            this.getCenterData();
        },
        methods: {
            getCenterData() {
                axios
                    .get("/system/CenterData")
                    .then(res => {
                        var result = res.data;
                        this.CenterDataLoading = false;
                        if (result.code == 200) {
                            this.teacherNum = result.data.teacherNum + "人"
                            this.studentNum = result.data.studentNum + "人"
                            this.Notice = result.data.Notice
                            return;
                        }
                    })
            },
            xrEcharts() {
                // 渲染图表事件
                var myEcharts = this.$echarts.init(document.getElementById("echartsData"));
                myEcharts.setOption(this.echartsOption)
            }
        }
    }
</script>

<style>
    .el-card span {
        font-weight: 900;
    }

    .el-card p {
        text-indent: 2em;
    }
</style>