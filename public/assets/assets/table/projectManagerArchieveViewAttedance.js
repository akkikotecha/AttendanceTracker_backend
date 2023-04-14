
$(document).ready(function() {
    $(window).resize(function() {
        if($(window).width() > 1024) {
            $('.header_top').addClass('d-none');
        } else {
            $('.header_top').removeClass('d-none');
        }
    }).resize(); 
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


var items = [];

getData();

var date = new Date();
$('.date_picker').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy',
        viewMode: 'date',
        minViewMode: 'date',
        
         // startDate: new Date(),

        
    }).on('changeDate',changeDate);

function changeDate()
{ console.log('HELLO ');
   
    items = [];
    getData();
}


$('#selectJobsite').on('change',function(){
    console.log('HELLO ');
   
    items = [];
    getData();
})
function getData()
{

              console.log("HELLO "+$('#startShiftDate').val());
                //var ResponseData=[];
              $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getProjectManagerAllAttedanceData",
                method:"POST",
                data:{date:$('#startShiftDate').val(),selectJobSiteid:window.localStorage.getItem("selectJobSiteid"),prj_id:window.localStorage.getItem('id'),parent_id:window.localStorage.getItem("parent_attedanceID"),status:0},
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                     "Authorization": "Bearer "+localStorage.getItem("APIToken")
        
                 },
        
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
                        var updated_date_formate = val.updatedAt;  

                        var created_date_formate = val.createdAt;  
                        site_name = val['jobSiteData'][0].site_name;
                        attedance_date = val.shift_start_date;
                        hour_deduct = val.hour_deduct;
                        
                         
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
 
 
                      items.push({'total_hour_minute':total_hours+" Hrs. "+total_minutes+" Min.", "selectHourDeduct":selectHourDeduct, "ID": val._id,"created_at": created_date_formate,"updated_at": updated_date_formate,"site_name": val['jobSiteData'][0].site_name,"no_of_employee":no_emp,"type": val.type,"employee_name": val['empforemenData'][0].first_name+" "+val['empforemenData'][0].last_name, "shift_start_date": val.shift_start_date, "shift_start_time": moment(val.shift_start_time,'h:mm A').format('HH:mm'), "shift_end_time": moment(val.shift_end_time,'h:mm A').format('HH:mm'), "hour_deduct": hrs +
                      " Hours  " + min + " Minutes" });
                  })
                  var dateString = attedance_date.split('T');
                   
                  $('#attedance_date_show').text(moment($.trim(dateString[0])).format("MM-DD-YYYY"));
                    $('#job_site_show').text(site_name);
                    //$('#hour_deduct_show').text(hour_deduct);
                    
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
                    serverSorting: true,
                    serverFiltering: true,
                    serverPaging: true,  
                    sortable: true,
                    filterable: true,
                    columnMenu: {
                        componentType: "classic",
                    },              
                    excel: {
                        fileName: "View ndance.xlsx",
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
                        field:"employee_name",
                        title:"Employee/Foreman",
                        width:150,
   
                    },
                    {
                        field:"no_of_employee",
                        title:"No of Worker",
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
                    {
                        field: "updated_at",
                        title: "Updated Date",
                        lockable: true,
            
                        width: 180,
            
                    },

                    ],

                });
            
                }  
            });


    }
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



        
        $('#grid').on("click","button.AttedanceRedirect",function(){
            //console.log("EJJJEE");
            var id=$(this).attr('data-val');
           
            window.localStorage.setItem("JobSiteid",id);
            //console.log(window.localStorage.getItem('baseurlhostname')+"selectAttendanceDetail");
            window.location.href = window.localStorage.getItem('baseurlhostname')+"http://localhost:2000/ViewProjectManagerAttedance"
          //  window.location.reload();
            //$('#selectProjectManager').modal('show');
        })


        $('#grid').on("click","button.AssignData",function(){
            //console.log("EJJJEE");
            var id=$(this).attr('data-val');
           

            window.localStorage.setItem("jobSiteSelectId",id)
            $('#selectProjectManager').modal('show');
        })

        $("#grid").on("click", "button.removeData", function() {
            var id=$(this).attr('data-val');
           
           // console.log(window.localStorage.getItem('BaseURLAPI')+"deleteProjectManager/"+id);
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"deleteJobsite/"+id,
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
               headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                 "Authorization": "Bearer "+localStorage.getItem("APIToken")
    
             },
    
                success:function(result)
                {

                        window.location.reload();
                }
            });

//                    console.log("HELLLLOO O "+$(this).attr('data-val'));
          });
    

          $("#grid").on("click", "button.edit_data", function() {
          //console.log("HELLO");
          $('#site_name').val($(this).attr('data-sitename'));
          $('#address').val($(this).attr('data-address'));
          $('#start_date').val($(this).attr('data-startDate'));
          $('#end_date').val($(this).attr('data-endDate'));
          $('#status').val($(this).attr('data-status'));
          $('#edit_id').val($(this).attr('data-val'));
          

          $('#editJobSiteData').modal('show');
        })
          