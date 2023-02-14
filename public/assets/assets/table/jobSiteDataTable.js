
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
                            url: crudServiceBaseUrl + "getJobsite",
                            dataType: "jsonp"
                        },
                        update: {
                            url: crudServiceBaseUrl + "getJobsite",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "getJobsite",
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
                url:window.localStorage.getItem('BaseURLAPI')+"getJobsite",
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {
               var concate = '';
                $.each(result, (i, val) => {
                    
                    // $.each(val.User, (i, value) => {
                    // //    console.log("hello "+JSON.stringify(val));
                    // concate += '<button  type="button"  class="btn btn-primary mr-2">'+value.first_name+" "+value.last_name+'</button>';
                    // })
                    var startDate = new Date(val.start_date);
                    var startedDate = [startDate.getMonth() + 1, startDate.getDate(), startDate.getFullYear()].join('-');
                   // var FormatestartedDate = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()].join('-');

                    var FormatestartedDate = moment(val.start_date).format('YYYY-MM-DD');  


                    if(val.end_date == "" || val.end_date == null || val.end_date == undefined)
                    {
                  
                        var endedDate = "";
                        var FormateendedDate = "";
                    }else
                    {
                        var endDate = new Date(val.end_date);
                        var endedDate = [endDate.getMonth() + 1, endDate.getDate(), endDate.getFullYear()].join('-');
                        
                        var FormateendedDate = moment(val.end_date).format('YYYY-MM-DD');  

                        //var FormateendedDate = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join('-');

                   
                    }

                    var data  = JSON.stringify(val.User);
                   // console.log("data : "+data)

                      items.push({ "con_data":data,"concate":val.User,"ID": val._id,"site_name": val.site_name, "address": val.address, "start_date": startedDate, "end_date": endedDate, "status": val.status,'StartDate':FormatestartedDate,'EndDate':FormateendedDate });
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
                    
                },              
                    excel: {
                        fileName: "Job Site.xlsx",
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
                        title: "Select/Unselect PM",
            
                        template: "<button class='btn btn-primary AssignData' data-assign='#: con_data #' data-val=#: ID # title='' ><i class='fa fa-plus'></i></button> ",
                        "className": "text-center",
                        width: 170,
                       // field: "ID",
                       
                            },
                            {
            template:"# for (var k = 0; k < concate.length; k++) { # <button class='btn btn-info btn_show_pm mt-2  tag-green' style='border:none;    padding: 4px;padding-left: 8px;padding-right: 8px;'  data-val=#: ID # title='' >#: concate[k].first_name # #: concate[k].last_name #</button> # } #",
                                title:"Assigned PM",
                                width: 250,

                            }, 
                    {
                        field: "site_name",
                        title: "Site Name",
                        width: 150,
                    }, {
                        field: "address",
                        title: "Address",
                        format: "{0:c}",
                        width: 150
                    }, {
                        field: "start_date",
                        title: "Start date",
//                        editor: clientCategoryEditor,
                        width: 125
                    }, {
                        field: "end_date",
                        title: "End Date",
                  //      editable: returnFalse,
                        width: 140
                    }, {
                        field: "status",
                        title: "Status",
                       // editor: clientCountryEditor,
                        width: 120
                    },
/*                            {        
                        title: "Action",
//                        template: "<button class='btn btn-primary AttedanceRedirect' data-val=#: ID # title='' >Attedance</button><button class='btn btn-warning ml-2 text-white' data-val=#: ID # title='' ><i class='fa fa-eye'></i></button>",
            
                        template: "<button class='btn btn-warning ml-2 text-white' data-val=#: ID # title='' ><i class='fa fa-eye'></i></button>",
                        width: 220
                       // field: "ID",
                       
                    }, */
                    {     
                                       
                        template: "<button class='btn btn-primary  edit_data' data-id='#:ID#' data-siteName='#:site_name#' data-address='#:address#' data-startDate='#:StartDate#' data-endDate='#:EndDate#'  data-status='#:status#' data-val='#: ID #' title='Edit' ><i class='fa fa-edit text-white'></i></button><button class='btn btn-warning removeData ml-2' data-val=#: ID # title='Delete' ><i class='fa fa-trash text-white'></i></button>",
                        width: 140
                       // field: "ID",
                       
                    },],
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

        var empdata ;
        $('#grid').on("click","button.AssignData",function(){
            var id=$(this).attr('data-val');
            empdata = JSON.parse(JSON.stringify($(this).attr('data-assign')));
            console.log("AP "+empdata);
            window.localStorage.setItem("jobSiteSelectId",id)
            
            model();
            $('#selectProjectManager').modal('show');
        })

        $("#grid").on("click", "button.removeData", function() {
            var id=$(this).attr('data-val');
            Swal.fire({
                title: 'Do you want to delete this job site?',
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
                url:window.localStorage.getItem('BaseURLAPI')+"deleteJobsite/"+id,
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success:function(result)
                {
                    Swal.fire({
                        title: 'Job Site Deleted Successfully...',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok',
                        confirmButtonColor: "#fd7e14"});
                    
                        window.location.reload();
                }
            });
        }
    });
//                    console.log("HELLLLOO O "+$(this).attr('data-val'));
          });
    

          $("#grid").on("click", "button.edit_data", function() {

            var startDate = new Date($(this).attr('data-startDate'));
            var startedDate = [startDate.getMonth() + 1, startDate.getDate(), startDate.getFullYear()].join('-');
           // var FormatestartedDate = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()].join('-');

            var FormatestartedDate = moment($(this).attr('data-startDate')).format('YYYY-MM-DD');  


            if($(this).attr('data-endDate') == "" || $(this).attr('data-endDate') == null || $(this).attr('data-endDate') == undefined)
            {
          
                var endedDate = "";
                var FormateendedDate = "";
            }else
            {
                var endDate = new Date($(this).attr('data-endDate'));
                var endedDate = [endDate.getMonth() + 1, endDate.getDate(), endDate.getFullYear()].join('-');
                
                var FormateendedDate = moment($(this).attr('data-endDate')).format('YYYY-MM-DD');  

                //var FormateendedDate = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join('-');

           
            }




          //console.log("HELLO");
          $('#site_name').val($(this).attr('data-sitename'));
          $('#address').val($(this).attr('data-address'));
          $('#start_date').val(startedDate);
          $('#end_date').val(endedDate);
          $('#status').val($(this).attr('data-status'));
          $('#edit_id').val($(this).attr('data-val'));
          

          $('#editJobSiteData').modal('show');
        })
          

        $("#start_date").on("change", function() {
            this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                .format( this.getAttribute("data-date-format") )
            )
        }).trigger("change")
    
        
        model();
        function model()
        {

                //console.log("MODEL AP : "+empdata);
            var items = [];
            var itemsID = [];

            $.each(JSON.parse(empdata), function(key, value) {
                 //   console.log("AP : "+value._id);
                    itemsID.push(value._id)
            })
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"getProjectManager",
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(result)
            {
               // console.log
               var concate = '';


                $.each(result, (i, val) => {
                      items.push({ "itemsID":itemsID,"ID": val._id,"full_name":val.first_name+' '+val.last_name,"first_name":val.first_name,"last_name":val.last_name,"email":val.email,"type" :"Project Manager","mobile_no":val.mobile_no,"oso_id":val.oso_id});
                  })


                  $("#gridDataProjectManager").kendoGrid({
                    dataSource: items,
                    height: 680,
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
                    dataBound: onDataBoundProject,
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
                        title: "Select",
                        template: '<span><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" #if(jQuery.inArray(ID, itemsID) !== -1) {# checked #}# name="select_pm[]" value="#:ID#" ><span class="custom-control-label">&nbsp;</span></label></span>',

                        //template: "<span style='float:left;margin-right:5px'>#:type#</span> <span>#if(type == 'Foreman') {#  #} #</span>",                       

                     },       
                    {
                        field: "full_name",
                        title: "Full Name",
                        width: 150,
                    },

                    {
                        field: "email",
                        title: "Email",
                        width: 150,
                    },
                    
                    {
                        field:'oso_id',
                        title:'Osho Id',
                        width: 150,
                    },
                ],
                });
                //ResponseData = items;
                //console.log("HELO "+ResponseData);
        //        console.log("Item "+items);

            }
        });  

        
        }
        
        function onDataBoundProject(e) {
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