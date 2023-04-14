
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
                url:window.localStorage.getItem('BaseURLAPI')+"getHistoryLog",
                method:"GET",
                data:{date:$('#startShiftDate').val(),jobsite:$('#selectJobsite').val()},
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                     "Authorization": "Bearer "+localStorage.getItem("APIToken")
        
                 },
                    success:function(result)
            {
               // console.log(result);
               var no_emp;
                $.each(result, (i, val) => {
                  

//                    console.log("val : "+);
                    //console.log("document_upload "+document_upload);
                  
                     items.push({"log_activity":val.log_activity,"create_date":val.create_date,"action": val.Assign_data[0].first_name+" "+val.Assign_data[0].last_name});
                  })

                  
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
                        fileName: "History Logs.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    columns: [
                    
                    {
                        field: "create_date",
                        title: "Date",
                        width: 90
                    },

                    {
                        field:"log_activity",
                        title:"Log Activity",
                        width:200
                    },
                    {
                        field:"action",
                        title:"Action By",
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




        getData_new();
function getData_new()
{
           console.log("HELLO "+$('#startShiftDate').val());
                //var ResponseData=[];
              $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getHistoryLog",
                method:"GET",
                data:{date:$('#startShiftDate').val(),jobsite:$('#selectJobsite').val()},
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                     "Authorization": "Bearer "+localStorage.getItem("APIToken")
        
                 },
                    success:function(result)
            {
               // console.log(result);
               var no_emp;
                $.each(result, (i, val) => {
                  

//                    console.log("val : "+);
                    //console.log("document_upload "+document_upload);
                  
                     items.push({"log_activity":val.log_activity,"create_date":val.create_date,"action": val.Assign_data[0].first_name+" "+val.Assign_data[0].last_name});
                  })

                  
                  window.grid =  $("#grid_new").kendoGrid({
                    dataSource: items,
                    //height: 680,
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
                        fileName: "History Logs.xlsx",
                        filterable: true,
                        allPages: true
                    },
                    columns: [
                    
                    {
                        field: "create_date",
                        title: "Date",
                        width: 90
                    },

                    {
                        field:"log_activity",
                        title:"Log Activity",
                        width:200
                    },
                    {
                        field:"action",
                        title:"Action By",
                        width:150

                    },

                    ],
                });
            
                }  
            });


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


  


          