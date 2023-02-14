
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
                url:window.localStorage.getItem('BaseURLAPI')+"getMasterReport",
                method:"POST",
                data:{date:daterangedata,employee:strVal,jobsite:JobSiteVal},
                success:function(result)
                {
                    console.log(result);
                   var no_emp;
    
                   var attedance_date,site_name,hour_deduct;
                    $.each(result, (i, val) => {
    
                            if(val.no_of_employee == "null" || val.no_of_employee =="")
                            {
                                no_emp = "";
                            }else{
                                no_emp = val.no_of_employee;
                            }
                            var updated_date_formate = moment(val.updatedAt).format('MM-DD-YYYY HH:mm');  
    
                            var created_date_formate = moment(val.createdAt).format('MM-DD-YYYY HH:mm');  
                            site_name = val['jobSiteData'][0].site_name;
                            
                            hour_deduct = val.hour_deduct;
    
                            // dt2 = new Date(moment().format('DD-MM-YYYY')+" "+val.shift_start_time);
                            // dt1 = new Date(moment().format('DD-MM-YYYY')+" "+val.shift_end_time);
                            
                            var dateOne = moment(moment().format('YYYY-MM-DD')+" "+val.shift_start_time);
                            var dateTwo = moment(moment().format('YYYY-MM-DD')+" "+val.shift_end_time);
                            
                           // console.log(dateOne+" "+dateTwo);
                            var hours = dateTwo.diff(dateOne, 'hours')
                         var min = dateTwo.diff(dateOne, 'minutes');
                         var minutes = min-(hours * 60);
                          var selectHourDeduct = hours+" Hrs. "+minutes+" Min.";
        
    
                          var total = val.hour_deduct;
                // Getting the hours.
                var hrs = Math.floor(total / 60);
                // Getting the minutes.
                var min = total % 60;
        
               
    
    var startTime = moment(hours+":"+minutes, 'HH:mm');
    var endTime = moment(hrs+":"+min, 'HH:mm');
    
    // calculate total duration
    var duration = moment.duration(startTime.diff(endTime));
    
    // duration in hours
    var total_hours = parseInt(duration.asHours());
    
    // duration in minutes
    var total_minutes = parseInt(duration.asMinutes()) % 60;
    
    if(val.shift_start_date != "")
    {
        attedance_date = val.shift_start_date;
    var dateString = attedance_date.split('T');
    var dateString_data = moment($.trim(dateString[0])).format("MM-DD-YYYY");

    }else
    {
        attedance_date = "";
        var dateString_data = "";

    }
    
                items.push({'site_name_data':site_name,'attedance_date_data':dateString_data,'total_hour_minute':total_hours+" Hrs. "+total_minutes+" Min.", "selectHourDeduct":selectHourDeduct,"ID": val._id,"created_at": created_date_formate,"updated_at": updated_date_formate,"site_name": val['jobSiteData'][0].site_name,"no_of_employee":no_emp,"type": val.type,"employee_name": val['empforemenData'][0].first_name+" "+val['empforemenData'][0].last_name, "shift_start_date": val.shift_start_date, "shift_start_time": moment(val.shift_start_time,'H:mm A').format('H:mm A'), "shift_end_time": moment(val.shift_end_time,'h:mm A').format('h:mm A'), "hour_deduct": hrs +
                " Hours  " + min + " Minutes" });
                      })
                      
                        
                      //  $('#hour_deduct_show').text(hour_deduct);
                        
                     // console.log(items);
                      //return false;
                      $("#grid").kendoGrid({
                        dataSource: items,
                        height: 680,
                //                    editable: "incell",
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
                        pdf: {  
                            allPages: true,  
                            avoidLinks: true,  
                            paperSize: "A4",  
                            margin: {  
                                top: "2cm",  
                                left: "0.5cm",  
                                right: "0.5cm",  
                                bottom: "1cm"  
                            },  
                            landscape: true,  
                            repeatHeaders: true,  
                            template: $("#attedance_date_show").html(),  
                            scale: 0.5  
                        },
                        pdfExport: function(e) {
                            var rows = e.sender.table[0].rows;
        
                            for (var i = 0; i < rows.length; i++) {
                                var row = rows[i];
                                if (!$(row).hasClass("k-selected")) {
                                    $(row).addClass("hiddenRow")
                                };
                            };
                            e.promise
                                .done(function() {
                                    $(".hiddenRow").each(function() {
                                        $(this).parents("tr").removeClass("hiddenRow");
                                    });
                                });
                        },
                        serverSorting: true,
                        serverFiltering: true,
                        serverPaging: true,  
                        sortable: true,
                        filterable: true,
                        columnMenu: {
                            componentType: "classic",
                        },              
                        excel: {
                            fileName: "View Attendance.xlsx",
                            filterable: true,
                            allPages: true
                        },
                        columns: [
                        //     {
                        //     selectable: true,
                        //     width: 75,                    //     attributes: {
                        //         "class": "checkbox-align",
                        //     },
                        //     headerAttributes: {
                        //         "class": "checkbox-align",
                        //     }
                        // },
                {
                    field:"attedance_date_data",
                            title:"Attedance Date",
                            hidden: false,
                            width:150,
        
                },
                {
                    field:"site_name_data",
                            title:"Site Name",
                    hidden: false,
                       width:150,
        
                },
                                {
                            field:"employee_name",
                            title:"Employee/Foreman",
                            width:150,
       
                        },
                        
    
                          {
                            field: "shift_start_time",
                            title: "Shift Start Time",
                            format: "{0:c}",
                            width: 130
                        }, {
                            field: "shift_end_time",
                            title: "Shift End Time",
                            width: 130,
                        },
                        {
                            field:"selectHourDeduct",
                            title:"Shift Hours",
                            width:150,
                        },
                        {
                            field:"hour_deduct",
                            title:"Hrs Deduct",
                            width:120,
                        },
                        {
                            field:"total_hour_minute",
                            title:"Total Hours",
                            width:120,
                        },
                        {
                            field: "created_at",
                            title: "Created Date",
                            lockable: true,
                
                            width: 180,
                
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


  

   

          