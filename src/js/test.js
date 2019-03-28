import _ from 'lodash';
import $ from 'jquery';

import test from '../css/test.scss';

    // nav 菜单折叠效果 

    $('.titles').on('click', function(){
        var _this = $(this);
        if (_this.hasClass('active')) {return false;}
        $('#menu ul').slideUp(300);
        $('#menu .titles').removeClass('active');
        _this.addClass('active').next('ul').slideDown(300);
    })

    var dom = document.getElementById("container");
    var app = {};
    var option = null;
    // 参加活动 id
    var joinActivtyId = [820, 932, 901, 934, 1290, 1330, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1420, 1520, 1620, 1720, 1820, 1920, 1020];
    // 生效活动数量
    var EffectiveActivitieNum = [8200, 9320, 9010, 9340, 12900, 13300, 13220, 13230, 13240, 13250, 13260, 13270, 13280, 13290, 14200, 15200, 16200, 17200, 18200, 19200, 1020];
    option = {
        // 提示框展示信息
        tooltip: {
            trigger: 'axis',
            formatter:function(params) {
                var result = '';
                params.forEach(function(item, ind) {
                        var index = item.dataIndex;
                        // 当前滑动 下标
                        if (item.data && ind == 0) {
                            result += '时间： &nbsp;&nbsp;&nbsp;<span style="color: #e54b8e">' + params[0].name + '号</span><br/>'+
                                    '总成交量: &nbsp;&nbsp;&nbsp;<span style="color: #e54b8e">' + item.data + '</span><br/>'+
                                    '参加活动id: <span style="color: #e54b8e">' + joinActivtyId[index]+ '</span><br/>'+
                                    '生效活动数: <span style="color: #e54b8e">' + EffectiveActivitieNum[index]+ '</span><br/>';
                        }
                    });
                return result;
            },
            backgroundColor: '#3f3f3f'
        },
        legend: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            
        },
        //x轴配置
        xAxis: {
            type: 'category',
            data: ['09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20', '09-20']
        },
        //y轴配置
        yAxis: {
            type: 'value',
            boundaryGap: false,
        },
        series: [{
            // name: '总成交量',
            data: [820, 932, 901, 934, 1290, 1330, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1420, 1520, 1620, 1720, 1820, 1920, 1020],
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#e54b8e',
                }
            },
        },{
            // name: '总成交量',
            data: [8200, 9320, 9010, 9340, 12900, 13300, 13220, 13230, 13240, 13250, 13260, 13270, 13280, 13290, 14200, 15200, 16200, 17200, 18200, 19200, 10200],
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#243e88',
                }
            },
        },
        ]
    };


    if (option && typeof option === "object") {
    }

    // test data
    var data = [
        {
        name: '有效销售额',
        menu: [{
                date: "2018-12-01",
                sallerNum: '6000',
            },{
                date: "2018-12-02",
                sallerNum: '7000',
            },{
                date: "2018-12-03",
                sallerNum: '8000', 
            },{
                date: "2018-12-04",
                sallerNum: '9000', 
            },{
                date: "2018-12-05",
                sallerNum: '10000', 
            }] 
        },
        {
            name: '有效销售额',
            menu: [{
                    date: "2018-12-01",
                    sallerNum: '6000',
                },{
                    date: "2018-12-02",
                    sallerNum: '7000',
                },{
                    date: "2018-12-03",
                    sallerNum: '8000', 
                },{
                    date: "2018-12-04",
                    sallerNum: '9000', 
                },{
                    date: "2018-12-05",
                    sallerNum: '10000', 
                }] 
            },
            {
                name: '有效销售额',
                menu: [{
                        date: "2018-12-01",
                        sallerNum: '6000',
                    },{
                        date: "2018-12-02",
                        sallerNum: '7000',
                    },{
                        date: "2018-12-03",
                        sallerNum: '8000', 
                    },{
                        date: "2018-12-04",
                        sallerNum: '9000', 
                    },{
                        date: "2018-12-05",
                        sallerNum: '10000', 
                    }] 
                },
                {
                    name: '有效销售额',
                    menu: [{
                            date: "2018-12-01",
                            sallerNum: '6000',
                        },{
                            date: "2018-12-02",
                            sallerNum: '7000',
                        },{
                            date: "2018-12-03",
                            sallerNum: '8000', 
                        },{
                            date: "2018-12-04",
                            sallerNum: '9000', 
                        },{
                            date: "2018-12-05",
                            sallerNum: '10000', 
                        }] 
                    },
                    
        {
        name: '有效销售额',
        menu: [{
                date: "2018-12-01",
                sallerNum: '1000',
            },{
                date: "2018-12-02",
                sallerNum: '2000',
            },{
                date: "2018-12-03",
                sallerNum: '3000', 
            },{
                date: "2018-12-04",
                sallerNum: '4000', 
            },{
                date: "2018-12-05",
                sallerNum: '5000', 
            }] 
        },
        {
        name: '有效销售额',
        menu: [{
                date: "2018-12-01",
                sallerNum: '10000',
            },{
                date: "2018-12-02",
                sallerNum: '9000',
            },{
                date: "2018-12-03",
                sallerNum: '8000', 
            },{
                date: "2018-12-04",
                sallerNum: '7000', 
            },{
                date: "2018-12-05",
                sallerNum: '6000', 
            }] 
        },
        {
        name: '有效销售额',
        menu: [{
                date: "2018-12-01",
                sallerNum: '5000',
            },{
                date: "2018-12-02",
                sallerNum: '4000',
            },{
                date: "2018-12-03",
                sallerNum: '3000', 
            },{
                date: "2018-12-04",
                sallerNum: '2000', 
            },{
                date: "2018-12-05",
                sallerNum: '1000', 
            }] 
        }
    ]

    var str = '';
    data.forEach(function(item, index){
        if (index == 0) {
            str+= '<li class="swiper-slide active"><div class="name">有效销售额</div><div class="num">2010.52</div><div class="before">昨日:12.1%</div></li>'
        } else {
            str+= '<li class="swiper-slide"><div class="name">有效销售额</div><div class="num">2010.52</div><div class="before">昨日:12.1%</div></li>'
        }
    })
    $('#swiper').html(str);
    var mySwiper = new Swiper ('.swiper-container', {
        slidesPerView : 'auto',
    })   


    //  运营数据 tab 点击效果
    $('.scrollBox ul li').on('click',function(){
        var index = $(this).index();
        var xx = [];
        var yy = [];
        var zz = [];
        data[index]['menu'].forEach(function(item, index){
            yy.push(item.date);
            xx.push(item.sallerNum *3);
            zz.push(item.sallerNum *2);
        })
        option.xAxis.data = yy;
        option.series[0].data = xx;
        option.series[1].data = zz;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        $('.scrollBox ul li').removeClass('active');
        $(this).addClass('active');
    })


//  近三十天 经营状态 问号 提示框
    $('[data-toggle="tooltip"]').tooltip();




// 运营数据 左右 切换事件
    $('.btn_view .prev').on('click',function(){
        $('.btn_view div').removeClass('active');
        $(this).addClass('active')
    })

// 运营数据 左右 切换事件
    $('.btn_view .next').on('click',function(){
        $('.btn_view div').removeClass('active');
        $(this).addClass('active');
    })