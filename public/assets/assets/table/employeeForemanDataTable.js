
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
                url:window.localStorage.getItem('BaseURLAPI')+"getEmployeeForeman",
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
               headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                 "Authorization": "Bearer "+localStorage.getItem("APIToken")
    
             },
                success:function(result)
            {
               
                $.each(result, (i, val) => {

                    if(val.oshoIdExpireDate == "" || val.oshoIdExpireDate == null || val.oshoIdExpireDate == undefined)
{

    var oshoExpiryDate = "";
    var   FormateoshoExpiryDate = "";
}else
{
    var oshoExpiryDate = new Date(val.oshoIdExpireDate);
    var oshoExpiryDateFormate = [oshoExpiryDate.getDate(), oshoExpiryDate.getMonth() + 1, oshoExpiryDate.getFullYear()].join('-');
    
    var FormateoshoExpiryDate = moment(val.oshoIdExpireDate).format('YYYY-MM-DD');  

    //var FormateendedDate = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join('-');


}


                    //console.log(JSON.stringify(val));
                      items.push({ "ID": val._id,"name": val.first_name+" "+val.last_name,"first_name": val.first_name,"last_name":val.last_name, "email": val.email, "type": val.employee_and_foreman_select, "mobile": val.mobile_no, "oso_id": val.oso_id,'oshoExpiryDate': FormateoshoExpiryDate,"upload_data":val.osho_image,"status":val.status });
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
                        fileName: "Employee Foreman.xlsx",
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
                        field: "name",
                        title: "Full Name",
                        width: 300
                    }, {
                        field: "email",
                        title: "Email",
                        format: "{0:c}",
                        width: 200
                    }, {
                        field: "type",
                        title: "Type",
                        width: 130,
                    }, {
                        field: "mobile",
                        title: "Mobile Numner",
//                        editor: clientCategoryEditor,
                        width: 125
                    }, {
                        field: "oso_id",
                        title: "Osho ID",
                  //      editable: returnFalse,
                        width: 140
                    },
                    {
                        title:"Osho Image",
                       // template: "<a href='#: upload_data#'  target='_blank'><i class='fa fa-image' style='font-size:25px'></i></a>",
                        template: "<span>#if(upload_data != '') {# <a href='#: upload_data#'  target='_blank'><i class='fa fa-image' style='font-size:25px'></i></a> #} #</span>",
                        width: 120
                       
                    },
                
                    {                    
                        template: "<button class='btn btn-primary  edit_data' data-id='#:ID#' data-first_name='#:first_name#' data-last_name='#:last_name#' data-email='#:email#' data-type='#:type#' data-mobile='#:mobile#' data-osho='#:oso_id#' data-oshoExpiryDate='#:oshoExpiryDate#'  title='Edit' ><i class='fa fa-edit text-white'></i></button>#if(status == '0') {# <button class='btn removeData text-white' data-val=#: ID #  title='Delete' style='background-color:rgb(221, 51, 51)!important' data-status = '1'>Deactive</button>  #}else{# <button class='btn btn-warning removeData  text-white' data-val=#: ID #  title='Delete' data-status = '0'>Active</button> #} #",
                        width: 160
                       // field: "ID",
                       
},                ],
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



        $("#grid").on("click", "button.removeData", function() {
            var id=$(this).attr('data-val');
            var status = $(this).attr('data-status');

            if(status == 0)
            {
                var title= 'Do you want to Deactive this employee/foreman?';
                var New_title = 'Employee/Foreman Deactivated Successfully...';
                
            }else
            {
                var title= 'Do you want to Active this employee/foreman?';
                var New_title = 'Employee/Foreman Activated Successfully...';
                
            }
            Swal.fire({
                title: title,
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#fd7e14',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
          //  console.log(window.localStorage.getItem('BaseURLAPI')+"deleteProjectManager/"+id);
            $.ajax({
                url:window.localStorage.getItem('BaseURLAPI')+"deleteEmployee/"+id+"/"+status,
                method:"GET",
               // data:x,_token:"{{ csrf_token() }}",
               headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                 "Authorization": "Bearer "+localStorage.getItem("APIToken")
    
             },
                success:function(result)
            {
                Swal.fire({
                    title: New_title,
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
            //console.log("HELLO");
            $('#first_name').val($(this).attr('data-first_name'));
            
            $('#last_name').val($(this).attr('data-last_name'));
            $('#email').val($(this).attr('data-email'));
            $('#mobile_number').val($(this).attr('data-mobile'));
            $('#osho_id').val($(this).attr('data-osho'));
            $('#edit_id').val($(this).attr('data-id'));
            //$('#oshoExpiryDate').val($(this).attr('data-oshoExpiryDate'));
            $('#oshoExpiryDate').val(moment($(this).attr('data-oshoExpiryDate')).format('MM-DD-YYYY'));
            
            $('#selectEmployeeForemanType').val($(this).attr('data-type'))
            $('#editEmployeeForeman').modal('show');
          })
  
