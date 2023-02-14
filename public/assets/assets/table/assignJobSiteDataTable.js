
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
                            url: crudServiceBaseUrl + "getJobSiteAssign",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "getJobSiteAssign",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "getJobSiteAssign",
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
                url:window.localStorage.getItem('BaseURLAPI')+"getJobSiteAssign/"+window.localStorage.getItem('id'),
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {
               console.log("RESULT "+result)
                $.each(result, (i, val) => {
                    var startDate = new Date(val.start_date);
                    var startedDate = [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()].join('-');

                    if(val.end_date == "" || val.end_date == null || val.end_date == undefined)
                    {
                  
                        var endedDate = "";
                    }else
                    {
                        var endDate = new Date(val.end_date);
                        var endedDate = [endDate.getDate(), endDate.getMonth() + 1, endDate.getFullYear()].join('-');
                    }

                      items.push({ "ID": val._id,"site_name": val.site_name, "address": val.address, "start_date": startedDate, "end_date": endedDate, "status": val.status });
                  })




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
                    
                },     excel: {
                        fileName: "Job Site.xlsx",
                        filterable: true,
                        allPages: true
                    },

                    columns: [
                    //     {
                    //     selectable: true,
                    //     width: 75,
                    //     attributes: {
                    //         "class": "checkbox-align",
                    //     },
                    //     headerAttributes: {
                    //         "class": "checkbox-align",
                    //     }
                    // },
            
                        
                    {
                        field: "site_name",
                        title: "Site Name",
                        width: 300
                    }, 
                            {        
                        title: "Attendance",
            
                        template: "<button class='btn btn-primary AttedanceRedirect' data-val=#: ID # title='' >Attendance</button>",
                        width: 140
                       // field: "ID",
                       
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
            window.location.href = window.localStorage.getItem('baseurlhostname')+"selectAttendanceDetail"
          //  window.location.reload();
            //$('#selectProjectManager').modal('show');
        })

        

        $('#grid').on("click","button.AssignData",function(){
            //console.log("EJJJEE");
            var id=$(this).attr('data-val');
           
console.log("HELLOE");
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
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {

                    window.location.reload();
            }
        });

//                    console.log("HELLLLOO O "+$(this).attr('data-val'));
          });
    


          