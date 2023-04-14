

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



$(document).ready(function () {
       
       
            var crudServiceBaseUrl = window.localStorage.getItem('BaseURLAPI'),
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: crudServiceBaseUrl + "getEmployeeForeman",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "getEmployeeForeman",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "getEmployeeForeman",
                            dataType: "jsonp"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                console.log("HELLO "+kendo.stringify(options.models));
                                return { models: kendo.stringify(options.models) };
                            }
                        }
                    },
                    batch: true,
                    pageSize: 20,
                    autoSync: true,
                    aggregate: [{
                        field: "TotalSales",
                        aggregate: "sum"
                    }],
                    group: {
                        field: "Status",
                        dir: "desc",
                        aggregates: [
                            { field: "Status", aggregate: "Status" }
                        ]
                    },
                    schema: {
                        model: {
                            id: "_id",
                            fields: {
                                _id: { editable: false, nullable: true },
                                site_name: { type: "boolean", editable: false },
                                address: { type: "number", editable: false },
                                start_date: { type: "date" },
                                end_date:{type:'date'},
                                status: { type: "number" },
                                Category: {
                                    defaultValue: {
                                        CategoryID: 8,
                                        CategoryName: "Seafood"
                                    }
                                },
                                Country: {
                                    defaultValue: {
                                        CountryNameLong: "Bulgaria",
                                        CountryNameShort: "bg"
                                    }
                                }
                            }
                        }
                    }
                });
              //  console.log("HELLO "+JSON.stringify(dataSource));
              var items = [];
                //var ResponseData=[];
              $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getActiveEmployeeForeman",
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
               headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                 "Authorization": "Bearer "+localStorage.getItem("APIToken")
    
             },
                success:function(result)
            {
               
                $.each(result, (i, val) => {

                    //console.log(JSON.stringify(val));
                      items.push({ "ID": val._id,"name": val.first_name+" "+val.last_name,"first_name": val.first_name,"last_name":val.last_name, "email": val.email, "type": val.employee_and_foreman_select, "mobile": val.mobile_no, "oso_id": val.oso_id });
                  })

                  $("#grid").kendoGrid({
                    dataSource: items,
                    height: 680,
                    //                    editable: "incell",
                                        pageable: {
                                            refresh: true,
                                            pageSizes: true,
                                            pageSize:20,

                                            buttonCount: 5

                                          },
                                        sortable: true,
                                        navigatable: true,
                                        resizable: true,
                                        reorderable: true,
                                        toolbarColumnMenu: true,
                                        groupable: true,
                                        dataBound: onDataBound,
                                        serverSorting: true,
                                        serverFiltering: true,
                                        serverPaging: true,  
                                        sortable: true,
                                    filterable: true,
                                    columnMenu: {
                                        componentType: "classic",
                                    },     
                                    toolbar: ["search"],
                    excel: {
                        fileName: "Employee Foreman.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    columns: [
                        {
//                        selectable: true,
                        width: 75,
                        attributes: {
                            "class": "checkbox-align",
                            "data-val":"#: ID #"
                        },
                        headerAttributes: {
                            "class": "checkbox-align",
                            "data-val":"#: ID #"
                        },
                        title:"Mark Attendance",
                        template: "<input type='checkbox' class='SelectedemployeeForeman ID#: ID #' data-val=#:first_name# data-last_name=#: last_name # data-type=#: type #  data-id=#: ID # title=''  />",                       
                    }, 
                    {
                        field: "name",
                        title: "Full Name",
                        width: 160
                    }, 
                    {
                        field: "type",
                        title: "Type",
                        width: 125
                    },
                    {
                        field: "oso_id",
                        title: "Osho ID",
                          width: 120
                    },
                      {
                        field: "mobile",
                        title: "Mobile Numner",
                        width: 140
                    }, 
                    ],
                });


                
                //ResponseData = items;
                //console.log("HELO "+ResponseData);
        //        console.log("Item "+items);

            }
        });   

  

        });

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

        function onDataBoundData(e) {
            var gridData = this;
            gridData.table.find("tr").each(function () {
                var dataItem = gridData.dataItem(this);
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

        var values_array=[];
        var array_employee=[]
        var array_foreman=[];
         
         
          
  var custom_arr1 = [];
    
  $("#grid").on("click", ".SelectedemployeeForeman",function(){
    $('.user_select').addClass('d-none');  
     
              if($(this).prop('checked') == true)
              {
                  values_array.push({"value":$(this).attr('data-val'),"last_name":$(this).attr('data-last_name'),"type":$(this).attr('data-type'),"id":$(this).attr('data-id')});               
                  custom_arr1.push($(this).attr('data-id')+"-"+$(this).attr('data-type'));

                    if($(this).attr('data-type')=="Employee")
                    {
                        array_employee.push({"value":$(this).attr('data-val'),"last_name":$(this).attr('data-last_name'),"type":$(this).attr('data-type'),"id":$(this).attr('data-id')});               
                         
                    }else{
                        array_foreman.push({"value":$(this).attr('data-val'),"last_name":$(this).attr('data-last_name'),"type":$(this).attr('data-type'),"id":$(this).attr('data-id')});                      
                    }

                  
                }
              else
              {
                  
                  values_array.splice(values_array.indexOf($(this).attr('data-val')),1);
                  custom_arr1.splice(custom_arr1.indexOf($(this).attr('data-id')),1);
      
                    if($(this).attr('data-type')=="Employee")
                    {
                        array_employee.splice(array_employee.indexOf($(this).attr('data-val')),1);                         
                    }else{
                        array_foreman.splice(array_foreman.indexOf($(this).attr('data-val')),1);
                    }
              }

              $('.check_condition').addClass('d-none');
              $(this).closest("tr").addClass('d-none '+$(this).attr('data-val')+'');
              
              get_data();
             // modelData();
              
          });

var image = '';
$('#document_upload').change(function(e) {
    var files = e.target.files; 
  
    for (var i = 0, file; file = files[i]; i++) {
    //  console.log(file);
      var formData = new FormData();
      formData.append("myFile", file);
    
      $.ajax({
        url: window.localStorage.getItem('BaseURLAPI')+"uploadDocument",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        headers: {
            // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
             "Authorization": "Bearer "+localStorage.getItem("APIToken")

         },

        success: function(data) {
          console.log(data.image_url);
          image = data.image_url;
        }
      });
    }
  });
function diff_hours(dt2, dt1) 
 {

    var diff =  Math.abs(new Date(dt2.getTime()) - new Date(dt1.getTime()));
    var seconds = Math.floor(diff/1000); //ignore any left over units smaller than a second
    var minutes = Math.floor(seconds/60); 
    seconds = seconds % 60;
    var hours = Math.floor(minutes/60);
    minutes = minutes % 60;
    
    console.log(dt2.getTime() + " "+dt1.getTime());
       
    console.log(hours+" Hrs "+minutes+" Min");
      return hours+" Hrs "+minutes+" Min";
    
 }

          $('#attedanceFormSubmit').on('submit',function(){

            if(typeof custom_arr1 !== 'undefined' && custom_arr1.length > 0)
            {            
            }
            else
            {
                $('.user_select').removeClass('d-none');  
            }

            if ($(this).parsley().validate()) {
 
                if(typeof custom_arr1 !== 'undefined' && custom_arr1.length > 0)
                {
                    modelData();
    
                    $('#st_date').text($("input[name='startShiftDate']").val());
                    $('#hour_deduct').text($("input[name='hourDeduct']").val());

                    //dt2 = new Date(moment().format('DD-MM-YYYY')+" "+$("input[name='startShiftTime']").val());
                    //dt1 = new Date(moment().format('DD-MM-YYYY')+" "+);

                    var dateOne = moment(moment().format('YYYY-MM-DD')+" "+$("input[name='startShiftTime']").val());
                    var dateTwo = moment(moment().format('YYYY-MM-DD')+" "+$("input[name='endShiftTime']").val());
                    
                   // console.log(dateOne+" "+dateTwo);
                    var hours = dateTwo.diff(dateOne, 'hours')
                 var min = dateTwo.diff(dateOne, 'minutes');
                    
                 var minutes = min-(hours * 60);
                   
                  var selectHourDeduct = hours+" Hrs. "+minutes+" Min.";
              
                    $('#no_of_hour').text(hours+" Hrs "+minutes+" Min");
                    $('#get_start_date').val($("input[name='startShiftDate']").val());
                    $('#get_hour_deduct').val($("input[name='hourDeduct']").val());
                    $('#confirmAttedance').modal();
                }else
                {
                    $('.user_select').removeClass('d-none');  
                }  
    }
})


$('.submitAttedanceData').on('click',function(){
console.log("IMAHE " +image);
    Swal.fire({
        title: 'Do you want to confirm  this attendance?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fd7e14',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
           

            var dataForeman = [];
            $('.shiftdateclass').each(function(){
                    if($(this).attr('data-id') == $('#count_emp_'+$(this).attr('data-id')).attr('data-id'))
                    {
                        dataForeman.push($('#get_start_date').val()+"*"+$(this).attr('data-id')+"*"+$("#shift_start_time_"+$(this).attr('data-id')).val()+"*"+$("#shift_end_time_"+$(this).attr('data-id')).val()+"*"+$('#hour_deduct_'+$(this).attr('data-id')).val()+"*"+$('#count_emp_'+$(this).attr('data-id')).val()+"*"+$(this).attr('data-type')+"*"+$('#startShiftTime').val()+"*"+$('#endShiftTime').val()+"*"+$('#selectHourDeduct').val()+"*"+window.localStorage.getItem("id")+"*"+image);
                    }else{
                        dataForeman.push($('#get_start_date').val()+"*"+$(this).attr('data-id')+"*"+$("#shift_start_time_"+$(this).attr('data-id')).val()+"*"+$("#shift_end_time_"+$(this).attr('data-id')).val()+"*"+$('#hour_deduct_'+$(this).attr('data-id')).val()+"*"+null+"*"+$(this).attr('data-type')+"*"+$('#startShiftTime').val()+"*"+$('#endShiftTime').val()+"*"+$('#selectHourDeduct').val()+"*"+window.localStorage.getItem("id")+"*"+image);
                    }            
            })
            
           
            var xdata = $('#attedanceFormSubmit').serializeArray();
            var jsonData = custom_arr1;
            
            xdata.push({name:"values_array",value:jsonData});
            xdata.push({ name: "jobSiteId", value: window.localStorage.getItem("JobSiteid") });
            xdata.push({ name: "action_by", value: window.localStorage.getItem("id") });
            
            xdata.push({ name: "get_jobsite_data_name", value: $('#get_jobsite_data_name').val() });
            
            xdata.push({name:"array_data",value:dataForeman});
            
            //console.log(xdata);

            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"AttedanceAdd",
                method:"POST",
                data:xdata,dataArr:values_array,
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                     "Authorization": "Bearer "+localStorage.getItem("APIToken")
        
                 },
        
                    success:function(result)
                    {
                        //console.log(result.message);
                        if(result.message=="Added")
                        {
                            $('.display_msg').removeClass('d-none');
                            Swal.fire({
                                title: 'Attendance Submitted Successfully',
                                text: '',
                                icon: 'success',
                                confirmButtonText: 'ok',
                                confirmButtonColor: "#fd7e14"});

                            setTimeout(function() {
                                //window.location.href = window.localStorage.getItem('baseurlhostname')+"confirmAttedanceDetail"
                                window.location.reload();
                            }, 2500);
                        }else{
                            $('.display_error_msg').removeClass('d-none');
                        }
                        
                    }  
                });
            }
        })
})




function onDataBoundProjectAK(e) {
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

          get_data();
  function get_data()
  {
    //  console.log("AKKAKAK "+values_array);    
      var append_data = '';
              var j = 1;
              var arrayData = '';
              for(var i in array_employee)
              {
                arrayData = array_employee[i];
//                    console.log(arrayData.value);
                  append_data += '<div class="col-lg-2 col-2 pri_pad_new" style="max-width:140px"><div class="row w-100 p-2 mb-3 pri_pad pl-0" style="margin-top: 00px;background-color: #f7f7f7;  border:1px solid #F4F4F4;border-radius: 12px;font-size: 15px;"><div class="col-lg-3 col-4 text-center ml-0 pl-0 mr-0 pr-0 d-none"><button class="btn btn-success set_select_button pri_one " type="button">'+ j++ +'</button></div><div class="col-lg-12 col-12"><h6 class="f-600 mt-0 pri_two mb-0" style="font-size:12px">'+arrayData.value+" "+arrayData.last_name +'</h6><span style="font-size:10px">'+arrayData.type+'</span></div><div class="" style="position: absolute;top: -6px;right: 10px;"><button class="set_select_close uncheck_check_box" style="border:none!important;background:transparent!important;" data-value="'+arrayData.value+'" data-id="'+arrayData.id+'" type="button"><i class="fa fa-times-circle" style="font-size:22px;color:red" ></i></button></div></div></div>';
                  
              }
              
              $('.fetch_check_box_checked').html(append_data);



              var append_data_foreman = '';
              var j = 1;
              var arrayDataForeman = '';
              for(var i in array_foreman)
              {
                arrayDataForeman = array_foreman[i];
//                    console.log(arrayData.value);
                append_data_foreman += '<div class="col-lg-2 col-2 pri_pad_new" style="max-width:140px"><div class="row w-100 p-2 mb-3 pri_pad pl-0" style="margin-top: 00px;background-color: #f7f7f7;  border:1px solid #F4F4F4;border-radius: 12px;font-size: 15px;"><div class="col-lg-3 col-4 text-center ml-0 pl-0 mr-0 pr-0 d-none"><button class="btn btn-success set_select_button pri_one " type="button">'+ j++ +'</button></div><div class="col-lg-12 col-12"><h6 class="f-600 mt-0 pri_two mb-0" style="font-size:12px">'+arrayDataForeman.value+" "+arrayDataForeman.last_name +'</h6><span style="font-size:10px">'+arrayDataForeman.type+'</span></div><input type="number" class="count_no_of_foreman  count_no_of_foreman_'+arrayDataForeman.id+' form-control" style="width:70px" data-id='+arrayDataForeman.id+' data-type='+arrayDataForeman.type+' value="1" min="1" max="1000" onkeyup=enforceMinMax(this) name="count_no_of_foreman "><div class="" style="position: absolute;top: -6px;right: 10px;"><button class="set_select_close uncheck_check_box" style="border:none!important;background:transparent!important;" data-value="'+arrayDataForeman.value+'" data-id="'+arrayDataForeman.id+'" type="button"><i class="fa fa-times-circle" style="font-size:22px;color:red" ></i></button></div></div></div>';
                  
              }
              
              $('.fetch_check_box_checked_foreman').html(append_data_foreman);

  }
  

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
  
              $(document).on('click','.uncheck_check_box',function(e){
                //console.log("HELLO  Remove ");
                  var close_value = $(this).attr('data-value');
                  var id = $(this).attr('data-id');
                  
                  $('.'+close_value).removeClass('d-none');
                  $('.ID'+id).prop('checked',false);
                  
                    for(var i in values_array)
                    {
                        arrayData = values_array[i];
                        if(arrayData.id == id)
                        {
                          //console.log(arrayData);
                          $(this).prop('checked',false);
                          values_array.splice(values_array.indexOf(values_array[i]),1);
                          custom_arr1.splice(custom_arr1.indexOf(values_array[i]),1);
                        }
                    }


                    for(var i in array_employee)
                    {
                        arrayDataEmployee = array_employee[i];
                        //console.log(arrayData);
                      if(arrayDataEmployee.id == id)
                      {
                          console.log(arrayDataEmployee);
                          $(this).prop('checked',false);
                         // values_array.splice(values_array.indexOf(values_array[i]),1);
                        //  custom_arr1.splice(custom_arr1.indexOf(values_array[i]),1);
                          array_employee.splice(array_employee.indexOf(arrayDataEmployee),1);                         
                   
  
                      }
                    }

                    for(var i in array_foreman)
                    {
                        arrayDataForeman = array_foreman[i];
                      if(arrayDataForeman.id == id)
                      {
                        console.log(arrayDataForeman);
                        $(this).prop('checked',false);
                         // values_array.splice(values_array.indexOf(values_array[i]),1);
                        //  custom_arr1.splice(custom_arr1.indexOf(values_array[i]),1);
                        array_foreman.splice(array_foreman.indexOf(arrayDataForeman),1);                         
                   
  
                      }
                    }


                    get_data();

                    modelData();

              });


                
              $(document).on('click','.reset_attedance',function(e){
                
                var this_data = $(this);

                  for(var i in values_array)
                  {
                      arrayData = values_array[i];
                        console.log(arrayData);
                        $('.'+arrayData.value).removeClass('d-none');
                 
                        $('.ID'+arrayData.id).prop('checked',false);
                        
                       // $('.check_condition').addClass('d-none');
                       this_data.closest("tr").addClass('d-none');

                       // $(this).closest("tr").addClass('d-none '+$(this).attr('data-val')+'');
          
                  }
//                  console.log("HE:LLO ");
                  values_array=[];
                  custom_arr1=[];
                  array_employee=[];
                  array_foreman=[];

                  get_data();  
  


            });
              
    


        $("#grid").on("click", "button.removeData", function() {
            var id=$(this).attr('data-val');
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"deleteEmployee/"+id,
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







          modelData();
          function modelData()
        {

                //console.log("MODEL AP : "+empdata);
            var items = [];
            var itemsID = [];

           
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getProjectManager",
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
               headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                 "Authorization": "Bearer "+localStorage.getItem("APIToken")
    
             },
                success:function(result)
            {
               // console.log
               var concate = '';


                $.each(values_array, (i, val) => {
                    
                      items.push({ "id": val.id,"value":val.value+' '+val.last_name,"first_name":val.value,"last_name":val.last_name,"type": val.type,"start_time":moment($('#startShiftTime').val(),'H:mm A').format('HH:mm'),"end_time":moment($('#endShiftTime').val(),'H:mm A').format('HH:mm'),'count_emp_data':$('.count_no_of_foreman_'+val.id).val(),'hour_deduct':$('#selectHourDeduct').val()});
                  })

// console.log("HELLO "+JSON.stringify(items))
;                  $("#confirmAttedanceData").kendoGrid({
                    dataSource: items,
                    //height: 680,
//                  editable: "incell",
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
                    dataBound: onDataBoundProjectak,
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
                        fileName: "Job Site.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    
                    columns: [
                     {
                        template: "<button class='btn btn-primary  uncheck_check_box' data-id='#:id#' data-val='#:id#'   title='Edit' ><i class='fa fa-close text-white'></i></button>",
                 
                        width: 80,

                     },     
                    {
                        field: "value",
                        title: "Full Name",
                        width: 150,
                    },
                    {
                        field: "type",
                        title: "Type",
                        template: '<span>#:type#</span><span> #if(type == "Foreman") {# <input type="number" class="form-control count_emp_#:id# " id="count_emp_#:id#" data-id="#:id#" value="#: count_emp_data #" style="width:60px"  > #} #</span>',
                        width: 150,

                    },
                    {
                        field: "type",
                        title: "Start Time",
                        template: '<div class="form-group"><label>Start Time<i class="text-red">*</i></label><div class="input-group  "><input type="text" style="background-color:white"  class="form-control id_3 shiftdateclass" data-id="#:id#" style="background-color: transparent!important;"  id="shift_start_time_#:id#" data-type="#:type#" name="startShiftTime" placeholder="Shift Start" value="#:start_time#"><span class="input-group-addon input_new_group"><i class="fa fa-clock-o"></i></span> </div></div>',
                        width: 150,

                    },
                    
                    {
                        field: "type",
                        title: "End Time",
                        template: '<div class="form-group" ><label>Start Time<i class="text-red">*</i></label><div class="input-group  "><input type="text"  style="background-color:white" class="form-control id_3" style="background-color: transparent!important;"  id="shift_end_time_#:id#" name="startShiftTime" placeholder="Shift Start" value="#:end_time#"><span class="input-group-addon input_new_group"><i class="fa fa-clock-o"></i></span> </div></div>',
                        width: 150,

                    },
                    
                    {
                        field: "type",
                        title: "Minute Deduct",
                        template: '<input type="number" class="form-control hour_deduct_#:id#" id="hour_deduct_#:id#" value="#: hour_deduct #" style="width:60px"  ></span>',
                        width: 150,

                    }
                ],
                });
                //ResponseData = items;
                //console.log("HELO "+ResponseData);
        //        console.log("Item "+items);

            }
        });  

        
        }
          
          function onDataBoundProjectak(e) {
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
    



        