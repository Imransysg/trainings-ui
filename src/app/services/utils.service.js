angular.module('veegam-trials').factory('utilsService', function () {

    // var basePath = '';

    // function getAppMetaData() {
    //     if (localStorage.getItem("payload") != undefined || localStorage.getItem("payload") != null) {
    //         var payload = JSON.parse(localStorage.getItem("payload"));
    //         var required_keys;
    //         required_keys = $.map(Object.keys(payload), function(val) {
    //             if (val.indexOf("app_metadata") != -1) {
    //                 return payload[val];
    //             }

    //         });
    //     }
    // }

    function getUserMetaData() {
        if (localStorage.getItem("payload") != undefined || localStorage.getItem("payload") != null) {
            var payload = JSON.parse(localStorage.getItem("payload"));
            var required_keys;
            required_keys = $.map(Object.keys(payload), function (val) {
                if (val.indexOf("app_metadata") != -1) {
                    return payload[val];
                }

            });
            return required_keys;
        }
    }

    function getDefualtOrg() {
        return getUserMetaData() ? Object.keys(getUserMetaData()[0].permissions.orgs[0])[0] : null;
    }

    function getUserName() {
       // if (value) {
            return getUserMetaData() ? getUserMetaData()[0].username : null;
       // }
        //else {
        //    return getUserMetaData() ? getUserMetaData()[0].organizations[0].organization : null;
        //}

    }

    function getEULAVersion() {
        var userData = getUserMetaData();
        if (userData != undefined && userData[0].eula_version != undefined) {
            return userData[0].eula_version;
        }
    }

    function getUserId() {
        var jsonObject = JSON.parse(localStorage.getItem("payload"));
        var userData = jsonObject ? jsonObject.sub : "";

        if (userData.indexOf('|') != -1) { return userData.split('|')[1]; }
    }

    function getEmailId() {
        var jsonObject = JSON.parse(localStorage.getItem("payload"));
        var email = jsonObject ? jsonObject.email : "";

        return email;
    }

    function getUserType() {
        var userData = getUserMetaData();
        if (userData != undefined && userData[0].userType != undefined) {
            return userData[0].userType;
        }
    }

    function getExpTime() {
        var jsonObject = JSON.parse(localStorage.getItem("payload"));
        var exp = jsonObject ? jsonObject.exp : "";

        return exp;
    }


    // function to create the report in CSV Format
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        //var fileName = "MyReport_";
        var fileName;
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName = ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // function to create the report in PDF Format
    function JSONToPDFConvertor(JSONData, ReportTitle, fileName, width) {
        var tableBody = [];
        for (var i = 0; i < JSONData.length; i++) {
            if (i === 0) {
                for (var j = 0; j < JSONData[i].length; j++) {
                    var headingName = JSONData[i][j];
                    var index = JSONData[i].indexOf(headingName);
                    if (index !== -1) {
                        JSONData[i][index] = { text: headingName, bold: true, alignment: 'center' };
                    }
                }
            }
        }
        var docDefinition = {
            // header: function(currentPage, pageCount) {
            //     return { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' };
            // },
            footer: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: [0, 10, 0, 0] };
            },
            content: [
                { text: ReportTitle, style: 'header' },
                {
                    style: 'tableStyling',
                    table: {
                        headerRows: 1,
                        widths: width,
                        body: JSONData
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'center'
                },
                tableStyling: {
                    fontSize: 10,
                    alignment: 'center'
                }
            }
        };
        pdfMake.createPdf(docDefinition).download(fileName + '.pdf');
    }

    return {
        getOrganization: getDefualtOrg,
        getUserName: getUserName,
        getUserId: getUserId,
        getEULAVersion: getEULAVersion,
        getUserType: getUserType,
        getEmailId: getEmailId,
        JSONToCSVConvertor: JSONToCSVConvertor,
        JSONToPDFConvertor: JSONToPDFConvertor,
        getExpTime: getExpTime
    };

});