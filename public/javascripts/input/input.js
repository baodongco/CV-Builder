$(function () {
    //JS Skill
    var txtSkillName = $('#txtSkillName');
    var level = 0;
    var experience = $('#txtExperience');
    var lastYearUsed = $('#txtLYU');
    var tblSkills = $('#tblSkills tbody');
    var lblLevel = $('#lblLevel');
    $('#progress').removeClass('running');
    $('#ball0').addClass('running');
    $('#progress li').hover(function () {
        var id = this.id;
        var num = id.substring(4);
        $('#progress').removeClass('running');
        $('#progress li').removeClass('running').queue(function (next) {
            for (var i = 0; i <= num; i++) {
                $('#ball' + i).addClass('running');
            }
            next();
        });
        if (num == 0) {
            lblLevel.text('N/A');
        }
        if (num == 1) {
            lblLevel.text('Beginner');
        }
        if (num == 2) {
            lblLevel.text('Basic');
        }
        if (num == 3) {
            lblLevel.text('Intermediate');
        }
        if (num == 4) {
            lblLevel.text('Advance');
        }
        if (num == 5) {
            lblLevel.text('Expert');
        }
        return false;
    }, function () {
        $('#progress').removeClass('running');
        $('#progress li').removeClass('running').queue(function (next) {
            for (var i = 0; i <= level; i++) {
                $('#ball' + i).addClass('running');
            }
            next();

        });
        if (level == 0) {
            lblLevel.text('N/A');
        }
        if (level == 1) {
            lblLevel.text('Beginner');
        }
        if (level == 2) {
            lblLevel.text('Basic');
        }
        if (level == 3) {
            lblLevel.text('Intermediate');
        }
        if (level == 4) {
            lblLevel.text('Advance');
        }
        if (level == 5) {
            lblLevel.text('Expert');
        }
        return false;
    });
    $('#progress li').click(function () {
        var id = this.id;
        var num = id.substring(4);
        level = num;
        $('#progress').removeClass('running');
        $('#progress li').removeClass('running').queue(function (next) {
            for (var i = 0; i <= num; i++) {
                $('#ball' + i).addClass('running');
            }
            next();
        });
        return false;
    });

    $('#btnSave').click(function () {
        var rowCount = $('#tblSkills >tbody >tr').length;
        var newRow = rowCount + 1;
        console.log(newRow + ' ' + level);
        var tdHtml = '<tr><td>' + txtSkillName.val() + '</td>';
        tdHtml += '<td><ul id="lprogress' + newRow + '" class="nav skill-progress"><li id="lball0' + newRow + '"><div id="llayer0" class="ball"></div><div id="llayer12" class="pulse"></div></li><li id="lball1' + newRow + '"><div id="layer1" class="ball"></div><div id="layer7" class="pulse"></div></li><li id="lball2' + newRow + '"><div id="layer2" class="ball"></div><div id="llayer8" class="pulse"></div></li><li id="lball3' + newRow + '"><div id="layer3" class="ball"></div><div id="layer9" class="pulse"></div></li><li id="lball4' + newRow + '"><div id="layer4" class="ball"></div><div id="layer10" class="pulse"></div></li><li id="lball5' + newRow + '"><div id="layer5" class="ball"></div><div id="llayer11" class="pulse"></div></li></ul>' + lblLevel.text() + '</td>';
        tdHtml += '<td>' + experience.val() + '</td>';
        tdHtml += '<td>' + lastYearUsed.val() + '</td>';
        tblSkills.append(tdHtml);
        $('#lprogress' + newRow + ' li').removeClass('running').queue(function (next) {
            for (var i = 0; i <= level; i++) {
                $('#lball' + i + newRow).addClass('running');
            }
            next();
        });
        $('#progress li').removeClass('running').queue();
        $('#ball0').addClass('running');
        txtSkillName.val('');
        lblLevel.text('N/A');
        level = 0;
        txtSkillName.focus();
    });
    //End JS skill


    // $("#experienceFromDate, #experienceToDate").datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     showButtonPanel: true,
    //     yearRange: '1999:2016',
    //     maxDate: new Date(),
    //     dateFormat: 'yy/mm/01',
    //     onClose: function (dateText, inst) {
    //         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
    //         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //         $(this).datepicker('setDate', new Date(year, month, 1));
    //     },
    //     // beforeShow: function (input, inst) {
    //     //     if ((datestr = $(this).val()).length > 0) {
    //     //         year = datestr.substring(datestr.length - 4, datestr.length);
    //     //         month = jQuery.inArray(datestr.substring(0, datestr.length - 5), $(this).datepicker('option', 'monthNames'));
    //     //         $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
    //     //         $(this).datepicker('setDate', new Date(year, month, 1));
    //     //     }
    //     //     var other = this.id == "experienceFromDate" ? "#experienceToDate" : "#experienceFromDate";
    //     //     var option = this.id == "experienceFromDate" ? "maxDate" : "minDate";
    //     //     if ((selectedDate = $(other).val()).length > 0) {
    //     //         year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
    //     //         month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
    //     //         $(this).datepicker("option", option, new Date(year, month, 1));
    //     //     }
    //     // },
    //     beforeShow: function customRange(input) {
    //         if (input.id == 'experienceFromDate') {
    //             return {
    //                 maxDate: jQuery('#experienceToDate').datepicker("getDate")
    //             };
    //         } else if (input.id == 'experienceToDate') {
    //             return {
    //                 minDate: jQuery('#experienceFromDate').datepicker("getDate")
    //             };
    //         }
    //     }
    // });

    $("#experienceFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '1999:2016',
        maxDate: new Date(),
        dateFormat: 'yy/mm/01',
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },

        onSelect: function (selected) {

            $("#experienceToDate").datepicker("option", "minDate", selected);

        }

    });

    $("#experienceToDate").datepicker({

        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '1999:2016',
        maxDate: new Date(),
        dateFormat: 'yy/mm/01',
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },
        onSelect: function (selected) {

            $("#experienceFromDate").datepicker("option", "maxDate", selected);

        }

    });

    $("#educationFromDate, #educationToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '1999:2016',
        maxDate: new Date(),
        dateFormat: 'yy-mm-01',
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },
        beforeShow: function (input, inst) {
            if ((datestr = $(this).val()).length > 0) {
                year = datestr.substring(datestr.length - 4, datestr.length);
                month = jQuery.inArray(datestr.substring(0, datestr.length - 5), $(this).datepicker('option', 'monthNames'));
                $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
                $(this).datepicker('setDate', new Date(year, month, 1));
            }
            var other = this.id == "educationFromDate" ? "#educationToDate" : "#educationFromDate";
            var option = this.id == "educationFromDate" ? "maxDate" : "minDate";
            if ((selectedDate = $(other).val()).length > 0) {
                year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                $(this).datepicker("option", option, new Date(year, month, 1));
            }
        },
    });
    $("#projectFromDate, #projectToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '1999:2016',
        showButtonPane: true,
        maxDate: new Date(),
        dateFormat: 'yy/mm/01',
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },
    });

    CKEDITOR.replaceAll();
    CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });

    //clone Education
    var cloneIndex = $("#field-education").length;
    function clone() {
        $("#field-education").clone()
            .insertBefore("#groupBtnEducation")
            .attr("id", "field-education" + cloneIndex)
            .find("*")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('dateEdu')) {
                    this.id = id + '-' + cloneIndex;
                    this.name = name + '-' + cloneIndex;
                }
                if (id.startsWith('educationTo') || id.startsWith('educationFr')) {
                    this.id = id + '-' + cloneIndex;
                    this.name = name.substring(0, 10) + cloneIndex + name.substring(11, 22);
                }
                if (id.startsWith('detailsE'))
                    this.id = id + '-' + cloneIndex;
            })
            .on('click', 'btnAddMoreEducation', clone)
            .on('click', 'button.remove', remove);
        $("#field-education" + cloneIndex).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $('#' + id).removeClass('hasDatepicker');

            if (name.startsWith('education[0][d')) {
                name = 'education[' + cloneIndex + '][details]';
                $('#detailsEducation-' + cloneIndex).empty();
                $('#detailsEducation-' + cloneIndex).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });
            }
            $("#educationFromDate-" + cloneIndex + ", #educationToDate-" + cloneIndex).datepicker({
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                yearRange: '1999:2016',
                maxDate: new Date(),
                dateFormat: 'yy/mm/01',
                onClose: function (dateText, inst) {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, month, 1));
                },
                beforeShow: function (input, inst) {
                    if ((datestr = $(this).val()).length > 0) {
                        year = datestr.substring(datestr.length - 4, datestr.length);
                        month = jQuery.inArray(datestr.substring(0, datestr.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
                        $(this).datepicker('setDate', new Date(year, month, 1));
                    }
                    var other = this.id == "educationFromDate-" + (cloneIndex - 1) ? "#educationToDate-" + (cloneIndex - 1) : "#educationFromDate-" + (cloneIndex - 1);
                    var option = this.id == "educationFromDate-" + (cloneIndex - 1) ? "maxDate" : "minDate";
                    if ((selectedDate = $(other).val()).length > 0) {
                        year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                        month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker("option", option, new Date(year, month, 1));
                    }
                },
            });
        });
        $('#educationFromDate-' + cloneIndex).val('');
        $('#educationToDate-' + cloneIndex).val('');
        cloneIndex++;


    }
    function remove() {
        $(this).parents(".clonedInput").remove();
    }
    $("#btnAddMoreEducation").on("click", clone);

    $("button.remove").on("click", remove);
    //End clone Education

    $("#certificationDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: '1999:2016',
        showButtonPane: true,
        maxDate: new Date(),
        dateFormat: 'yy/mm/01',
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        },
    });
});