
$(document).ready(function() {
    $(window).resize(function() {
        if($(window).width() > 1024) {
            $('.header_top').addClass('d-none');
        } else {
            $('.header_top').removeClass('d-none');
        }
    }).resize(); 


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
        //getData();
    });

    
//getData();

});


$('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
    getData();
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


/*
$('.select_multiple_data').on('select2:selecting', function(e) {
    //console.log('Selecting: ' , e.params.args.data);
    getData();
  });
*/
  $('.select_multiple_data').on("select2:select", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    getData();
});

$('.select_multiple_data').on("select2:unselecting", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    getData();
    console.log("unselecting");
});

$('.select_multiple_data').on("select2:unselect", function(e) { 
    //$('#select_multiple_data').select2().trigger('change');
    getData();
    console.log("unselect");

});

  setTimeout(function(){
 
    getData(); 
}, 1000);
     
  function getData()
{
   
   // console.log("HELLO "+$('input[name="daterange"]').val());
   const daterangedata = $('input[name="daterange"]').val();
    var items = [];
                var ResponseData='';
                
                var multi = $('.select_multiple_data').val();
                $.each(multi, function (indexes, values){
                    //console.log("values : "+values);
                    ResponseData += values+',';
                });
                strVal = ResponseData.slice(0, -1);
                
                $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getJobSiteReport",
                method:"POST",
                data:{date:daterangedata,jobsite:strVal},
                success:function(result)
                {
                //  console.log("HELLO "+result);
                    var no_emp;
                    $.each(result, (i, val) => {
                        var data = JSON.stringify(val)
                    // console.log("I : "+JSON.stringify(result[i]._id.created_at));
                        var ID = JSON.stringify(result[i]._id.job_site_id[0]).replace(/"/g, " ");
                        var site_name = JSON.stringify(result[i]._id.job_site_name[0]).replace(/"/g, " ");
                        var no_of_employee = JSON.stringify(result[i].count).replace(/"/g, " ");
                        var shift_start_date = JSON.stringify(result[i]._id.shift_date).replace(/"/g, " ");
                        var created_at = JSON.stringify(result[i]._id.month).replace(/"/g, " ")+"-"+JSON.stringify(result[i]._id.day).replace(/"/g, " ")+"-"+ JSON.stringify(result[i]._id.year).replace(/"/g, " ")+" "+JSON.stringify(result[i]._id.hour).replace(/"/g, " ")+":"+JSON.stringify(result[i]._id.minute).replace(/"/g, " ");
                        var attedanceUniqueID = JSON.stringify(result[i]._id.attedanceUniqueID).replace(/"/g, " ");
                        var selectStartTime = JSON.stringify(result[i]._id.selectStartTime).replace(/"/g, " ");
                        var selectEndTime = JSON.stringify(result[i]._id.selectEndTime).replace(/"/g, " ");
                        
                        

                        var dateOne = moment(moment().format('YYYY-MM-DD')+" "+selectStartTime);
                        
                        var dateTwo = moment(moment().format('YYYY-MM-DD')+" "+selectEndTime);
                        
                        var hours = dateTwo.diff(dateOne, 'hours')
                   
                        var min = dateTwo.diff(dateOne, 'minutes');
                    
                        var minutes = min-(hours * 60);
                   
                        var selectHourDeduct = hours+" Hrs. "+minutes+" Min.";

                        items.push({"selectHourDeduct":selectHourDeduct,"attedanceUniqueID":attedanceUniqueID,"ID": ID,"site_name": site_name,"no_of_employee":no_of_employee,"shift_start_date": shift_start_date,"selectStartTime": selectStartTime,"selectEndTime": selectEndTime,"created_at":created_at});
                  
                    })

                 //console.log("HELLO "+items);
                  //return false;
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
                        fileName: "View Attendance.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    columns: [
                    
                    {
                        field: "shift_start_date",
                        title: "Attendance Date",
                        width: 170
                    },

                    {
                        field:"selectStartTime",
                        title:"Start Time",
                        width:150
                    },
                    {
                        field:"selectEndTime",
                        title:"End Time",
                        width:150

                    },
                    {
                        field:"selectHourDeduct",
                        title:"Shift Hours",
                        width:150,
                    },
                    {
                        field: "site_name",
                        title: "Site Name",
                        lockable: true,
            
                        width: 150,
            
                    },
                    {
                        field:"no_of_employee",
                        title:"No of Employee",
                        width:150,
                    },
                    {        
                        title: "Action",
                        template: "<button class='btn  tag-blue AttedanceRedirect text-white' data-parent=#:attedanceUniqueID# data-val=#: ID # title='' ><i class='fa fa-eye'> </i></button>",
                        width: 180   
                    }, 
                    {
                        field:"created_at",
                        title:"Created Date",
                        width:150
                    },

                    ],
                });
            
                }  
            });

            
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


  

   

          