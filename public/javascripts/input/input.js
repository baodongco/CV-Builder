$(function () {

    //JS Skill
    var txtSkillName = $('#txtSkillName');
    var level = 0;
    var experience = $('#ddlExperience');
    var lastYearUsed = $('#ddlLYU');
    var tblSkills = $('#tblSkills tbody');
    var lblLevel = $('#lblLevel');
    $('a.btn').click(function () {
        var name = this.name;
        var parent = $(this).parents('div.tab-pane');
        $('#li' + parent.attr('id')).removeClass('active');
        $('#li' + name).addClass('active');
    });

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

    var rowCount = $('#tblSkills >tbody >tr').length;
    $('#btnAddSkill').click(function () {
        var check = $('#skillHiddenIndex').val();
        if (check == -1) {
            var hiddenField = '';
            var tdHtml = '<tr id="' + rowCount + '"><td><span id="spSkillName-' + rowCount + '">' + txtSkillName.val() + '</td>';
                tdHtml += '<td class="text-center"><ul id="lprogress' + rowCount + '" class="nav skill-lprogress"><li id="lball0' + rowCount + '"><div id="llayer0" class="ball"></div><div id="llayer12" class="pulse"></div></li><li id="lball1' + rowCount + '"><div id="layer1" class="ball"></div><div id="layer7" class="pulse"></div></li><li id="lball2' + rowCount + '"><div id="layer2" class="ball"></div><div id="llayer8" class="pulse"></div></li><li id="lball3' + rowCount + '"><div id="layer3" class="ball"></div><div id="layer9" class="pulse"></div></li><li id="lball4' + rowCount + '"><div id="layer4" class="ball"></div><div id="layer10" class="pulse"></div></li><li id="lball5' + rowCount + '"><div id="layer5" class="ball"></div><div id="llayer11" class="pulse"></div></li></ul><span id="spExpertise-'+rowCount+'" style="color:blue">' + lblLevel.text() + '</span></td>';
            tdHtml += '<td><span id="spExperience-' + rowCount + '">' + experience.val() + '</span></td>';
            tdHtml += '<td><span id="spLastYearUsed-' + rowCount + '">' + lastYearUsed.val() + '</td>';
            tdHtml += '<td><button type="button" class="btn-primary btnSkillEdit" id="btnEditSkill-' + rowCount + '">Edit</button><button type="button" class="btn-primary btnDeleteSkill" id="btnDeleteSkill-' + rowCount + '">Delete</button></tr>';
            tblSkills.append(tdHtml);
            $('#lprogress' + rowCount + ' li').removeClass('running').queue(function (next) {
                for (var i = 0; i <= level; i++) {
                    $('#lball' + i + rowCount).addClass('running');
                }
                next();
            });
            $('#progress li').removeClass('running').queue();
            $('#ball0').addClass('running');
            hiddenField += '<input type="hidden" id="skillName-' + rowCount + '" name="skill[' + rowCount + '][name]" value="' + txtSkillName.val() + '">';
            hiddenField += '<input type="hidden" id="skillExpertise-' + rowCount + '" name="skill[' + rowCount + '][expertise]" value="' + lblLevel.text() + '">';
            hiddenField += '<input type="hidden" id="skillExperience-' + rowCount + '" name="skill[' + rowCount + '][experience]" value="' + experience.val() + '">';
            hiddenField += '<input type="hidden" id="skillLastUsed-' + rowCount + '" name="skill[' + rowCount + '][lastUsed]" value="' + lastYearUsed.val() + '">';
            $('#field-skill').append(hiddenField);
            rowCount++;
        }
        else {
            $('#spSkillName-' + check).text(txtSkillName.val());
            $('#spExperience-' + check).text(experience.val());
            $('#spLastYearUsed-' + check).text(lastYearUsed.val());
            $('#spExpertise-'+check).text(lblLevel.text());
            $('#lprogress' + check + ' li').removeClass('running').queue(function (next) {
                for (var i = 0; i <= level; i++) {
                    $('#lball' + i + check).addClass('running');
                }
                next();
            });
            $('#skillName-' + check).val(txtSkillName.val());
            $('#skillLastUsed-' + check).val(lastYearUsed.val());
            $('#skillExperience-' + check).val(experience.val());
            $('#skillExpertise-' + check).val(lblLevel.text());
            $('#skillHiddenIndex').val('-1');
            $('#progress li').removeClass('running').queue();
            $('#ball0').addClass('running');
        }

        experience.val("0 month");
        lastYearUsed.val("2016");
        txtSkillName.val('');
        lblLevel.text('N/A');
        level = 0;
    });
    $('#tblSkills').on('click', '.btnDeleteSkill', function () {
        var row = $(this).parents('tr');
        var id = row.attr('id');
        console.log(id);
        $('#skillName-' + id).remove();
        $('#skillExpertise-' + id).remove();
        $('#skillExperience-' + id).remove();
        $('#skillLastUsed-' + id).remove();
        row.remove();
        if (rowCount > 0)
            rowCount--;
        $('#skillHiddenIndex').val('-1');

    });
    $('#tblSkills').on('click', '.btnSkillEdit', function () {
        var row = $(this).parents('tr');
        var id = row.attr('id');
        var skillExpertise = $('#skillExpertise-' + id).val();
        $('#skillHiddenIndex').val(id);
        txtSkillName.val($('#skillName-' + id).val());
        experience.val($('#skillExperience-' + id).val());
        lblLevel.text(skillExpertise);
        if (skillExpertise == 'N/A') {
            level = 0;
        }
        if (skillExpertise == 'Beginner') {
            level = 1;
        }
        if (skillExpertise == 'Basic') {
            level = 2;
        }
        if (skillExpertise == 'Intermediate') {
            level = 3;
        }
        if (skillExpertise == 'Advance') {
            level = 4;
        }
        if (skillExpertise == 'Expert') {
            level = 5;
        }
        $('#progress li').removeClass('running').queue(function (next) {
            for (var i = 0; i <= level; i++) {
                $('#ball' + i).addClass('running');
            }
            next();
        });
        lastYearUsed.val($('#skillLastUsed-' + id).val());
        txtSkillName.focus();
        rowCount++;
    });
    //End JS skill

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


    //Clone experience
    var cloneIndexExp = $("#field-experience").length;
    function cloneExp() {
        $("#field-experience").clone()
            .insertBefore("#groupBtnExperience")
            .attr("id", "field-experience" + cloneIndexExp)
            .addClass("clonedExpInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('experienceCompany')) {
                    this.name = 'experience[' + cloneIndexExp + '][company]';
                    this.id = id + '-' + cloneIndexExp;
                }
                if (id.startsWith('experienceDesignation')) {
                    this.name = 'experience[' + cloneIndexExp + '][designation]';
                    this.id = id + '-' + cloneIndexExp;
                }
                if (id.startsWith('dateEdu')) {
                    this.id = id + '-' + cloneIndexExp;
                    this.name = name + '-' + cloneIndexExp;
                }
                if (id.startsWith('experienceTo') || id.startsWith('experienceFr')) {
                    this.id = id + '-' + cloneIndexExp;
                    this.name = [name.slice(0, 11), cloneIndexExp, name.slice(12)].join('');;
                }
                if (id.startsWith('detailsEx'))
                    this.id = id + '-' + cloneIndexExp;
            })
            .on('click', 'btnAddMoreExperience', cloneExp)
            .on('click', 'button.remove', removeExp);

        $("#field-experience" + cloneIndexExp).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('detailsExperience')) {
                name = 'experience[' + cloneIndexExp + '][detail]';
                $('#detailsExperience-' + cloneIndexExp).empty();
                $('#detailsExperience-' + cloneIndexExp).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });
            }
            $("#experienceFromDate-" + cloneIndexExp + ", #experienceToDate-" + cloneIndexExp).datepicker({
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
                    var other = this.id == "experienceFromDate-" + (cloneIndexExp - 1) ? "#experienceToDate-" + (cloneIndexExp - 1) : "#experienceFromDate-" + (cloneIndexExp - 1);
                    var option = this.id == "experienceFromDate-" + (cloneIndexExp - 1) ? "maxDate" : "minDate";
                    if ((selectedDate = $(other).val()).length > 0) {
                        year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                        month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker("option", option, new Date(year, month, 1));
                    }
                },
            });
        });

        $('#experienceFromDate-' + cloneIndexExp).val('');
        $('#experienceToDate-' + cloneIndexExp).val('');
        cloneIndexExp++;


    }
    function removeExp() {
        $(this).parents(".clonedExpInput").remove();
    }


    $("#btnAddMoreExperience").on("click", cloneExp);

    $("button.remove").on("click", removeExp);
    //End clone experience

    //Clone Project
    var cloneIndexPro = $("#field-project").length;
    function clonePro() {
        $("#field-project").clone()
            .insertBefore("#groupBtnProject")
            .attr("id", "field-project" + cloneIndexPro)
            .addClass("clonedProInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('projectTitle')) {
                    this.name = 'project[' + cloneIndexPro + '][title]';
                }
                if (id.startsWith('projectUrl')) {
                    this.name = 'project[' + cloneIndexPro + '][url]';
                }
                if (id.startsWith('projectTo') || id.startsWith('projectFr')) {
                    this.id = id + '-' + cloneIndexPro;
                    this.name = [name.slice(0, 8), cloneIndexPro, name.slice(9)].join('');
                }
                if (id.startsWith('detailsProject'))
                    this.id = id + '-' + cloneIndexPro;
            })
            .on('click', 'btnAddMoreProject', clonePro)
            .on('click', 'button.remove', removePro);
        $("#field-project" + cloneIndexPro).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $('#' + id).removeClass('hasDatepicker');
            $(this).remove('legend');
            if (name.startsWith('project[0][de')) {
                name = 'project[' + cloneIndexPro + '][detail]';
                $('#detailsProject-' + cloneIndexPro).empty();
                $('#detailsProject-' + cloneIndexPro).append('<textarea class="editor" name="' + name + '" id="' + id + '"></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });
            }
            $("#projectFromDate-" + cloneIndexPro + ", #projectToDate-" + cloneIndexPro).datepicker({
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
                    var other = this.id == "projectFromDate-" + (cloneIndexPro - 1) ? "#projectToDate-" + (cloneIndexPro - 1) : "#projectFromDate-" + (cloneIndexPro - 1);
                    var option = this.id == "projectFromDate-" + (cloneIndexPro - 1) ? "maxDate" : "minDate";
                    if ((selectedDate = $(other).val()).length > 0) {
                        year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                        month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker("option", option, new Date(year, month, 1));
                    }
                },
            });
        });
        $('#projectFromDate-' + cloneIndexPro).val('');
        $('#projectToDate-' + cloneIndexPro).val('');
        cloneIndexPro++;
    }
    $('#field-project').remove('legend');
    function removePro() {
        $(this).parents(".clonedProInput").remove();
    }
    $("#btnAddMoreProject").on("click", clonePro);

    $("button.remove").on("click", removePro);
    //End clone project

    //Clone certification
    var cloneIndexCert = $("#field-certification").length;
    function cloneCert() {
        $("#field-certification").clone()
            .insertBefore("#groupBtnCertification")
            .attr("id", "field-certification" + cloneIndexCert)
            .addClass("clonedCertInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('certificationTitle')) {
                    this.name = 'certification[' + cloneIndexCert + '][title]';
                    this.id = id + '-' + cloneIndexCert;
                }
                if (id.startsWith('certificationAuthority')) {
                    this.name = 'certification[' + cloneIndexCert + '][authority]';
                    this.id = id + '-' + cloneIndexCert;
                }
                if (id.startsWith('certificationDate')) {
                    this.id = id + '-' + cloneIndexCert;
                    this.name = 'certification[' + cloneIndexCert + '][date]';
                }
                if (id.startsWith('detailsCertification'))
                    this.id = id + '-' + cloneIndexCert;
            })
            .on('click', 'btnAddMoreCetification', cloneCert)
            .on('click', 'button.remove', removeCert);

        $("#field-certification" + cloneIndexCert).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('detailsCertification')) {
                name = 'certification[' + cloneIndexCert + '][detail]';
                $('#detailsCertification-' + cloneIndexCert).empty();
                $('#detailsCertification-' + cloneIndexCert).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });
            }
            $("#certificationDate-" + cloneIndexCert).datepicker({
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
            });
        });

        $('#certificationDate-' + cloneIndexCert).val('');
        cloneIndexCert++;


    }
    function removeCert() {
        $(this).parents(".clonedCertInput").remove();
    }


    $("#btnAddMoreCetification").on("click", cloneCert);

    $("button.remove").on("click", removeCert);
    //End clone experience

    //clone Education
    var cloneIndexEdu = $("#field-education").length;
    function cloneEdu() {
        $("#field-education").clone()
            .insertBefore("#groupBtnEducation")
            .attr("id", "field-education" + cloneIndexEdu)
            .addClass("clonedEduInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('txtEduInstitute')) {
                    this.name = 'education[' + cloneIndexEdu + '][institute]';
                    this.id = id + '-' + cloneIndexEdu;
                }
                if (id.startsWith('txtEduDegree')) {
                    this.name = 'education[' + cloneIndexEdu + '][degree]';
                    this.id = id + '-' + cloneIndexEdu;
                }
                if (id.startsWith('dateEdu')) {
                    this.id = id + '-' + cloneIndexEdu;
                    this.name = name + '-' + cloneIndexEdu;
                }
                if (id.startsWith('educationTo') || id.startsWith('educationFr')) {
                    this.id = id + '-' + cloneIndexEdu;
                    this.name = [name.slice(0, 10), cloneIndexEdu, name.slice(11)].join('');;
                }
                if (id.startsWith('detailsE'))
                    this.id = id + '-' + cloneIndexEdu;
            })
            .on('click', 'btnAddMoreEducation', cloneEdu)
            .on('click', 'button.remove', removeEdu);
        $("#field-education" + cloneIndexEdu).append('<hr>');
        $("#field-education" + cloneIndexEdu).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('educationDetails')) {
                name = 'education[' + cloneIndexEdu + '][detail]';
                $('#detailsEducation-' + cloneIndexEdu).empty();
                $('#detailsEducation-' + cloneIndexEdu).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '180') });
            }
            $("#educationFromDate-" + cloneIndexEdu + ", #educationToDate-" + cloneIndexEdu).datepicker({
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
                    var other = this.id == "educationFromDate-" + (cloneIndexEdu - 1) ? "#educationToDate-" + (cloneIndexEdu - 1) : "#educationFromDate-" + (cloneIndexEdu - 1);
                    var option = this.id == "educationFromDate-" + (cloneIndexEdu - 1) ? "maxDate" : "minDate";
                    if ((selectedDate = $(other).val()).length > 0) {
                        year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                        month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                        $(this).datepicker("option", option, new Date(year, month, 1));
                    }
                },
            });
        });

        $('#educationFromDate-' + cloneIndexEdu).val('');
        $('#educationToDate-' + cloneIndexEdu).val('');
        cloneIndexEdu++;


    }
    function removeEdu() {
        $(this).parents(".clonedEduInput").remove();
    }
    $("#btnAddMoreEducation").on("click", cloneEdu);

    $("button.remove").on("click", removeEdu);
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