
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
        format: 'mm-dd-yyyy',
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
   // console.log('HELLO ');
   
    items = [];
    getData();
})

var scrollOffset = {
    left: 0,
    top: 0
};

// Save the scroll position before the new data is rendered.
function onGridDataBinding (e) {
    var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
    scrollOffset.left = container.scrollLeft();
    scrollOffset.top = container.scrollTop(); // use only if virtual scrolling is disabled
}

// Restore the scroll position after the new data is rendered.
function onGridDataBound (e) {
    var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
    container.scrollLeft(scrollOffset.left);
    container.scrollTop(scrollOffset.top); // use only if virtual scrolling is disabled
}



function getData()
{
           console.log("HELLO "+$('#startShiftDate').val());
                //var ResponseData=[];
              $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getGroupAllAttedanceData",
                method:"POST",
                data:{date:$('#startShiftDate').val(),jobsite:$('#selectJobsite').val()},
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {
                console.log(result);
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
                    var document_upload = JSON.stringify(result[i]._id.document_upload).replace(/"/g, "");
                    console.log("document_upload "+document_upload);
                    

                    var dateOne = moment(moment().format('YYYY-MM-DD')+" "+selectStartTime);
                    var dateTwo = moment(moment().format('YYYY-MM-DD')+" "+selectEndTime);
                    
                   // console.log(dateOne+" "+dateTwo);
                    var hours = dateTwo.diff(dateOne, 'hours')
                 var min = dateTwo.diff(dateOne, 'minutes');
                    
                 var minutes = min-(hours * 60);
                   
                  var selectHourDeduct = hours+" Hrs. "+minutes+" Min.";

                    //var selectHourDeduct = "";
                    var dateString = shift_start_date.split('T')
                    
                    items.push({"selectHourDeduct":selectHourDeduct,"attedanceUniqueID":attedanceUniqueID,"ID": ID,"site_name": site_name,"no_of_employee":no_of_employee,"shift_start_date":moment($.trim(dateString[0])).format("MM-DD-YYYY"),"document_upload":document_upload,"selectStartTime": selectStartTime,"selectEndTime": selectEndTime,"created_at":created_at});
                  })

                 //console.log("HELLO "+items);
                  //return false;
                  window.grid =  $("#grid").kendoGrid({
                    dataSource: items,
                    height: 680,
                    dataBinding: onGridDataBinding,
                    dataBound: onGridDataBound,
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
                        scale: 0.5  
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
                        title: "Attachment",
                        template:"#if(document_upload != '') {# <a href='#: document_upload#' class='ml-1'  target='_blank'><button class='btn  tag-blue ' title='image' ><i class='fa fa-file' style='font-size: 17px;color: white;'></i></button></a> #} #",
                        width:120
                    },
                    {        
                        title: "Action",
                        template: "<button class='btn  tag-blue AttedanceRedirect text-white' data-parent=#:attedanceUniqueID# data-val=#: ID # title='' ><i class='fa fa-eye'> </i></button><button class='btn btn-primary ml-2  edit_data' data-parent=#:attedanceUniqueID# data-val=#: ID #  title='Edit' ><i class='fa fa-edit text-white'></i></button><button class='btn btn-warning removeData ml-2' data-val=#:attedanceUniqueID#  title='Delete' ><i class='fa fa-trash text-white'></i></button>",
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
            var parent=$(this).attr('data-parent');
           
            window.localStorage.setItem("selectJobSiteid",id);

            window.localStorage.setItem("parent_attedanceID",parent);

            //console.log(window.localStorage.getItem('baseurlhostname')+"selectAttendanceDetail");
            window.location.href = window.localStorage.getItem('baseurlhostname')+"viewAttedance"
          //  window.location.reload();
            //$('#selectProjectManager').modal('show');
        })


        $("#grid").on("click", "button.removeData", function() {
            var id=$(this).attr('data-val');
            Swal.fire({
                title: 'Do you want to delete this attendance?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#fd7e14',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
      
           // console.log(window.localStorage.getItem('BaseURLAPI')+"deleteProjectManager/"+id);
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"deleteViewAllAttedance/"+id,
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success:function(result)
                {
                   Swal.fire({
                        title: 'Attendance Deleted Successfully...',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok',
                        confirmButtonColor: "#fd7e14"
                    });
                    window.location.reload();
                }
            });
        }
    })
});

$("#grid").on("click", "button.edit_data", function() {
    //console.log("HELLO");
    var parent_id = $(this).attr('data-parent');
    var objectid = $(this).attr('data-val');
    $.ajax({
        url:window.localStorage.getItem('BaseURLAPI')+"getAllAttedanceData",
        method:"POST",
        data:{date:"",parent_id:parent_id,selectJobSiteid:objectid},
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(result)
        {
            var data_item = [];
            var no_emp;

            var attedance_date,site_name,hour_deduct;
            $.each(result, (i, val) => {

                if(val.no_of_employee == "null" || val.no_of_employee =="")
                {
                    no_emp = "";
                }else{
                    no_emp = val.no_of_employee;
                }
                var updated_date_formate = moment(val.updatedAt).format('DD-MM-YYYY HH:mm');  

                var created_date_formate = moment(val.createdAt).format('DD-MM-YYYY HH:mm');  

                //console.log("AK "+created_date_formate + " "+updated_date_formate);
                site_name = val['jobSiteData'][0].site_name;
                attedance_date = val.shift_start_date;
                hour_deduct = val.hour_deduct;

                data_item.push({ "ID": val._id,"created_at": created_date_formate,"updated_at": updated_date_formate,"site_name": val['jobSiteData'][0].site_name,"no_of_employee":no_emp,"type": val.type,"employee_name": val['empforemenData'][0].first_name+" "+val['empforemenData'][0].last_name, "shift_start_date": moment(val.shift_start_date).format('YYYY-MM-DD'), "shift_start_time": val.shift_start_time, "shift_end_time": val.shift_end_time, "hour_deduct": val.hour_deduct });
          })

//          console.log("AP : "+data_item);

            $('#attedance_date_show').text(attedance_date);
            $('#job_site_show').text(site_name);
            $('#hour_deduct_show').text(hour_deduct);
            
          $("#AttedancegridData").kendoGrid({
            dataSource: data_item,
            height: 680,
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
                    title: "Attendance",
                    template: "<button class='btn btn-primary uncheck_check_box SelectedemployeeForeman' ID#: ID #' data-id='#: ID #' title='' ><i class='fa fa-close'></i></button>",
                    width: 60
                   // field: "ID",   
                },
             {
                field:"employee_name",
                title:"Employee/Foreman",
                width:120,
            },
            {
                field: "type",
                title: "Type",
                template: "<span style='float:left;margin-right:5px'>#:type#</span> <span>#if(type == 'Foreman') {# <input type='text' name='count_emp_data' data-id='#: ID#' class='count_no_employee form-control ID#: ID #' id='count_emp_#:ID#' min='1' max='1000' onkeyup=enforceMinMax(this) style='width:60px;margin-top:-7px'  title='' value='#: no_of_employee #'  /> #} #</span>",                       
                width: 150
            },
            {
                field:"shift_start_time",
                title:"Shift Start Time",
                template: '<div class="form-group timepicker_div"><div class="input-group" ><input type="text" class="form-control shiftdateclass timepicker" name="startShiftTime" style="background-color:white!important" placeholder="Shift Start" id="shift_start_time_#:ID#" data-type="#:type#" data-id="#:ID#" value="#: shift_start_time #"><span class="input-group-addon input_new_group" ><i class="fa fa-clock-o"></i></span> </div><p class="text-danger mb-0 text-left f-12" id="error-attedanceEndShiftTime"></p></div>',                       
                width: 130
        
            },
            {
                field:"shift_end_time",
                title:"Shift End Time",
                template: '<div class="form-group timepicker_div"><div class="input-group" ><input type="text" class="form-control timepicker" name="endShiftTime" placeholder="Shift End" style="background-color:white!important" id="shift_end_time_#:ID#" value="#: shift_end_time #"><span class="input-group-addon input_new_group" ><i class="fa fa-clock-o"></i></span> </div><p class="text-danger mb-0 text-left f-12" id="error-attedanceEndShiftTime"></p></div>',                       
                width: 130
        
            },
            {
                field:"hour_deduct",
                title:"Min. Deduct",
                template: "<input type='text' name='count_emp_data' data-id='#: ID#' class='hour_deduct form-control ID#: ID #' id='hour_deduct_#:ID#' style='width:60px;margin-top:-7px'   title='' value='#: hour_deduct #'  />",                       
                width: 120
        
            },


            ],
        });
    
        }  
    });




    $('#editAttedanceData').modal('show');
})



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


  

$('.submitAttedanceData').on('click',function(){
    Swal.fire({
        title: 'Do you want to edit this attendance?',
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
                        dataForeman.push($(this).attr('data-id')+"*"+$("#shift_start_time_"+$(this).attr('data-id')).val()+"*"+$("#shift_end_time_"+$(this).attr('data-id')).val()+"*"+$('#count_emp_'+$(this).attr('data-id')).val()+"*"+$('#hour_deduct_'+$(this).attr('data-id')).val());
                    }else{
                        dataForeman.push($(this).attr('data-id')+"*"+$("#shift_start_time_"+$(this).attr('data-id')).val()+"*"+$("#shift_end_time_"+$(this).attr('data-id')).val()+"*"+null+"*"+$('#hour_deduct_'+$(this).attr('data-id')).val());
                    }            
            });

                var xdata = [];
                xdata.push({name:"array_data",value:dataForeman});
                $.ajax({
                    url:window.localStorage.getItem('BaseURLAPI')+"updateAttedanceData",
                    method:"POST",
                    data:xdata,
                    headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success:function(result)
                    {
                    //    console.log(result.message);
                        if(result.message=="Updated")
                        {
                            $('.display_msg').removeClass('d-none');
                            Swal.fire({
                                title: 'Attendance Updated Successfully',
                                text: '',
                                icon: 'success',
                                confirmButtonText: 'ok',
                                confirmButtonColor: "#fd7e14"
                            });
                            setTimeout(function() {
                                window.location.reload();
                            }, 2500);
                        }else{
                            $('.display_error_msg').removeClass('d-none');
                        } 
                    }  
                });
            }
        });
    });


    $(document).on('click','.uncheck_check_box',function(e){
        
          var id = $(this).attr('data-id');

            var this_data = $(this);
          Swal.fire({
            title: 'Are you Sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fd7e14',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
  
          $.ajax({
            url:window.localStorage.getItem('BaseURLAPI')+"deleteOneAttedanceData",
            method:"POST",
            data:{'deleteId':id},
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {
            //    console.log(result.message);

                if(result.message=="record Deleted")
                {
                    $('.display_msg').removeClass('d-none');
                    Swal.fire({
                        title: 'Attendance Delete Successfully',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok',
                        confirmButtonColor: "#fd7e14"
                    });

                    setTimeout(function() {
                        this_data.closest("tr").addClass('d-none');

                   //     window.location.reload();
                    }, 1500);
                }else{
                    $('.display_error_msg').removeClass('d-none');
                } 
            }  
        });

    }
});
      });


      $('#saveTabularData').on('click',function(){

        kendo.spreadsheet.drawTabularData({
          dataSource: grid.dataSource,
          columns: grid.columns,
          headerBackground: "#567",
          headerColor: "#fff",
          evenBackground: "#eee",
        }).then(function(group){
          kendo.pdf.saveAs(group, "test.pdf");
        });
    })

          