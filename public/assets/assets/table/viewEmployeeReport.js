
$(document).ready(function() {
    $(window).resize(function() {
        if($(window).width() > 1024) {
            $('.header_top').addClass('d-none');
        } else {
            $('.header_top').removeClass('d-none');
        }
    }).resize(); 



    setTimeout(function(){
 
        
        var start = moment().subtract(29, 'days');
        var end = moment();
    
        $('input[name="daterange"]').daterangepicker({
          opens: 'right',
          startDate: start,
          endDate: end,
          ranges: {
             'Today': [moment(), moment()],
             'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
             'Last 7 Days': [moment().subtract(6, 'days'), moment()],
             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
             'This Month': [moment().startOf('month'), moment().endOf('month')],
             'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
        }, function(start,end) {
          //  getData();
        });
    
        
    //getData();
    $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
        console.log("HELLO ");
        getData();
    });
    }, 1000);
    
//getData();

});



$(function() {
    "use strict";
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.menu_toggle_new').on('click',function(){
    $('.font-montserrat').toggleClass('offcanvas-active');
    $('.brand-name').toggleClass('brand-name-margin-set');
    $('.cursor-pointer').toggleClass('padding_left_css');
})

    function getRandomValues() {
        // data setup
        var values = new Array(20);

        for (var i = 0; i < values.length; i++) {
            values[i] = [5 + randomVal(), 10 + randomVal(), 15 + randomVal(), 20 + randomVal(), 30 + randomVal(),
                35 + randomVal(), 40 + randomVal(), 45 + randomVal(), 50 + randomVal()
            ];
        }

        return values;
    }    
    function randomVal() {
        return Math.floor(Math.random() * 80);
    }

    // MINI BAR CHART
    var values2 = getRandomValues();    
    var paramsBar = {
        type: 'bar',
        barWidth: 5,
        height: 25,
    };

    $('#mini-bar-chart1').sparkline(values2[0], paramsBar);
        paramsBar.barColor = '#6c757d';
    $('#mini-bar-chart2').sparkline(values2[1], paramsBar);
        paramsBar.barColor = '#6c757d';
    $('#mini-bar-chart3').sparkline(values2[2], paramsBar);
        paramsBar.barColor = '#6c757d';
    $('#mini-bar-chart4').sparkline(values2[3], paramsBar);
        paramsBar.barColor = '#6c757d';

});



  $('.select_multiple_data').on("select2:select", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    getData();
}).trigger('change');

$('.select_multiple_data').on("select2:unselecting", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    //getData();
    console.log("unselecting");
}).trigger('change');

$('.select_multiple_data').on("select2:unselect", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    getData();
    console.log("unselect");
}).trigger('change');



$('.select_multiple_data_jobsite').on("select2:select", function(e) { 
    //$('#select_multiple_data_jobsite').select2().trigger('change');
    getData();
});

$('.select_multiple_data_jobsite').on("select2:unselecting", function(e) { 
    //$('.select_multiple_data_jobsite').select2().trigger('change');
    var unselected_value = $('.select_multiple_data_jobsite').val();
    //console.log("unselecting "+unselected_value);
}).trigger('change');

$('.select_multiple_data_jobsite').on("select2:unselect", function(e) { 
    var unselected_value = $('.select_multiple_data_jobsite').val();
        // console.log("unselect "+unselected_value);
    getData();
    //console.log("unselect : "+e.params.args.data);
}).trigger('change');




  setTimeout(function(){
 
    getData(); 
}, 1000);
     
     
function getData()
{
    $('.page-loader-wrapper').css({'display':'block'});
   // console.log("HELLO "+$('input[name="daterange"]').val());
   const daterangedata = $('input[name="daterange"]').val();
   console.log("Date Picker : "+daterangedata);
    var items = [];
                var ResponseData='';
                var JobSiteData='';
                
                var multi = $('.select_multiple_data').val();
                $.each(multi, function (indexes, values){
                    //console.log("values : "+values);
                    ResponseData += values+',';
                });
                strVal = ResponseData.slice(0, -1);
                

                var multi_jobisite = $('.select_multiple_data_jobsite').val();
                $.each(multi_jobisite, function (indexes, values){
                    //console.log("values : "+values);
                    JobSiteData += values+',';
                });
                JobSiteVal = JobSiteData.slice(0, -1);
                

                $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getEmployeeReport",
                method:"POST",
                data:{date:daterangedata,employee:strVal,jobsite:JobSiteVal},
                success:function(result)
                {
                  //console.log("HELLO "+JSON.stringify(result));
                    var dateVal = [];
                    var final_total = [];
                    
                    $.each(result, (i, val) => {
              
                        if (jQuery.inArray(val.empforemenData[0]['first_name']+" "+val.empforemenData[0]['last_name'], dateVal) === -1)
                        {
                            dateVal.push(val.empforemenData[0]['first_name']+" "+val.empforemenData[0]['last_name']);
                            var startTime = moment(val.shift_start_time, 'HH:mm A');
                            var endTime = moment(val.shift_end_time, 'HH:mm A');
                            var duration = moment.duration(endTime.diff(startTime));
                            var hours = parseInt(duration.asHours());
                            var minutes = parseInt(duration.asMinutes()) % 60;                            
                            var final_min = Number(hours) * 60 + Number(minutes);

                                                        final_total.push({'emp_name':val.empforemenData[0]['first_name']+" "+val.empforemenData[0]['last_name'],'total':final_min})
                            
                        }else{
                            var startTime = moment(val.shift_start_time, 'HH:mm A');
                            var endTime = moment(val.shift_end_time, 'HH:mm A');
                            
                            // calculate total duration
                            var duration = moment.duration(endTime.diff(startTime));               
                            var hours = parseInt(duration.asHours());
                            var minutes = parseInt(duration.asMinutes()) % 60;
                            var final_min = Number(hours) * 60 + Number(minutes);

                            final_total.push({'emp_name':val.empforemenData[0]['first_name']+" "+val.empforemenData[0]['last_name'],'total':final_min})
                        }

                    })
                    var final_date = [];
                    var count = [];
                    var ta;
                  
                    console.log("final_total : "+JSON.stringify(final_total));
                    var final_array_result = [];
                    final_total.reduce(function(res, value) {
                        if (!res[value.emp_name]) {
                          res[value.emp_name] = { emp_name: value.emp_name, total: 0 };
                          final_array_result.push(res[value.emp_name])
                        }
                        res[value.emp_name].total += value.total;
                        return res;
                      }, {});

                   
                    $.each(final_array_result, (i, value) => {
                        var minutes = value.total%60;
                        var hours = (value.total - minutes) / 60;
//                        console.log(hours + ":" + minutes);
                        var hours_str = " Hours ";
                        var minute_str = " Minutes ";
                        if(hours < 2)
                        {
                            hours_str = ' Hour ';
                        }
                        if(minutes < 2)
                        {
                            minute_str = ' Minute ';
                        }
                        items.push({"emp_name":value.emp_name,"final_total":hours+hours_str+minutes+minute_str});

                    })

                  $("#grid").kendoGrid({
                    dataSource: items,
                    height: 680,
            //      editable: "incell",
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        pageSize:10,

                        buttonCount: 5
                      },
                    sortable: true,
                    navigatable: true,
                    resizable: true,
                    reorderable: true,
                    toolbarColumnMenu: true,
                    groupable: true,
                    dataBound: onDataBound,
                    toolbar: ["excel", "pdf", "search"],
                    serverSorting: true,
                    serverFiltering: true,
                    serverPaging: true,  
                    sortable: true,
                    filterable: true,
                    columnMenu: {
                        componentType: "classic",
                    },              
                    excel: {
                        fileName: "View Employee Report.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    columns: [
                    
                    {
                        field: "emp_name",
                        title: "Name",
                        width: 170
                    },
                    
                    {
                        field: "final_total",
                        title: "Total Hours",
                        width: 170
                    },
                    
                ],
            });            
        }  
    });
    $('.page-loader-wrapper').css({'display':'none'});
}

     
    $('#grid').on("click","button.AttedanceRedirect",function(){
        //console.log("EJJJEE");
        var id=$(this).attr('data-val');
        var parent=$(this).attr('data-parent');
       
        window.localStorage.setItem("selectJobSiteid",id);

        window.localStorage.setItem("parent_attedanceID",parent);

        //console.log(window.localStorage.getItem('baseurlhostname')+"selectAttendanceDetail");
        window.location.href = window.localStorage.getItem('baseurlhostname')+"viewAttedance"
      //  window.location.reload();
        //$('#selectProjectManager').modal('show');
    })
  function onDataBound(e) {
            var grid = this;
            grid.table.find("tr").each(function () {
                var dataItem = grid.dataItem(this);
                var themeColor = dataItem.Discontinued ? 'success' : 'error';
                var text = dataItem.Discontinued ? 'available' : 'not available';

                $(this).find(".badgeTemplate").kendoBadge({
                    themeColor: themeColor,
                    text: text,
                });

                $(this).find(".rating").kendoRating({
                    min: 1,
                    max: 5,
                    label: false,
                    selection: "continuous"
                });

                $(this).find(".sparkline-chart").kendoSparkline({
                    legend: {
                        visible: false
                    },
                    data: [dataItem.TargetSales],
                    type: "bar",
                    chartArea: {
                        margin: 0,
                        width: 180,
                        background: "transparent"
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            format: '{0}%',
                            background: 'none'
                        }
                    },
                    categoryAxis: {
                        majorGridLines: {
                            visible: false
                        },
                        majorTicks: {
                            visible: false
                        }
                    },
                    valueAxis: {
                        type: "numeric",
                        min: 0,
                        max: 130,
                        visible: false,
                        labels: {
                            visible: false
                        },
                        minorTicks: { visible: false },
                        majorGridLines: { visible: false }
                    },
                    tooltip: {
                        visible: false
                    }
                });

                kendo.bind($(this), dataItem);
            });
        }

        function returnFalse() {
            return false;
        }

        function clientCategoryEditor(container, options) {
            $('<input required name="Category">')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataTextField: "CategoryName",
                    dataValueField: "CategoryID",
                    dataSource: {
                        data: categories
                    }
                });
        }

        function clientCountryEditor(container, options) {
            $('<input required name="Country">')
                .appendTo(container)
                .kendoDropDownList({
                    dataTextField: "CountryNameLong",
                    dataValueField: "CountryNameShort",
                    template: "<div class='dropdown-country-wrap'><img src='../content/web/country-flags/#:CountryNameShort#.png' alt='#: CountryNameLong#' title='#: CountryNameLong#' width='30' /><span>#:CountryNameLong #</span></div>",
                    dataSource: {
                        transport: {
                            read: {
                                url: " https://demos.telerik.com/kendo-ui/service/countries",
                                dataType: "jsonp"
                            }
                        }
                    },
                    autoWidth: true
                });
        }

        var categories = [{
            "CategoryID": 1,
            "CategoryName": "Beverages"
        }, {
            "CategoryID": 2,
            "CategoryName": "Condiments"
        }, {
            "CategoryID": 3,
            "CategoryName": "Confections"
        }, {
            "CategoryID": 4,
            "CategoryName": "Dairy Products"
        }, {
            "CategoryID": 5,
            "CategoryName": "Grains/Cereals"
        }, {
            "CategoryID": 6,
            "CategoryName": "Meat/Poultry"
        }, {
            "CategoryID": 7,
            "CategoryName": "Produce"
        }, {
            "CategoryID": 8,
            "CategoryName": "Seafood"
        }];



     




function enforceMinMax(el) {
    if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }


  

   

          