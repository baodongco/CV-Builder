$(function () {
    CKEDITOR.replaceAll();
    CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '220') });
    //JS Skill
    var txtSkillName = $('#txtSkillName');
    var level = 0;
    var experience = $('#ddlExperience');
    var lastYearUsed = $('#ddlLYU');
    var tblSkills = $('#tblSkills tbody');
    var lblLevel = $('#lblLevel');
    var cloneIndexExp = $('#experienceLength').val();
    if (isNaN(cloneIndexExp) || cloneIndexExp == -1) {
        cloneIndexExp = 1;
    }
    else
        cloneIndexExp++;

    var cloneIndexPro = $("#projectLength").val();
    if (isNaN(cloneIndexPro) || cloneIndexPro == -1) {
        cloneIndexPro = 1;
    }
    else
        cloneIndexPro++;

    var cloneIndexCert = $("#certificationLength").val();
    if (isNaN(cloneIndexCert) || cloneIndexCert == -1) {
        cloneIndexCert = 1;
    }
    else
        cloneIndexCert++;
    var cloneIndexEdu = $("#educationLength").val();
    if (isNaN(cloneIndexEdu) || cloneIndexEdu == -1) {
        cloneIndexEdu = 1;
    }
    else
        cloneIndexEdu++;

    var skillLenght = $('#skillsLength').val();
    for (var i = 0; i < skillLenght; i++) {
        var expertiseLevel = $('#skillExpertise-' + i).val();
        var numberExpertiseLevel = 0;
        if (expertiseLevel == 'N/A') {
            numberExpertiseLevel = 0;
        }
        if (expertiseLevel == 'Beginner') {
            numberExpertiseLevel = 1;
        }
        if (expertiseLevel == 'Basic') {
            numberExpertiseLevel = 2;
        }
        if (expertiseLevel == 'Intermediate') {
            numberExpertiseLevel = 3;
        }
        if (expertiseLevel == 'Advance') {
            numberExpertiseLevel = 4;
        }
        if (expertiseLevel == 'Expert') {
            numberExpertiseLevel = 5;
        }
        $('#lprogress' + i + ' li').removeClass('running').queue(function (next) {
            for (var j = 0; j <= numberExpertiseLevel; j++) {
                $('#lball' + j + i).addClass('running');
            }
            next();
        });
    }

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
        if (txtSkillName.val().trim().length>0){
            if (check == -1) {
                var hiddenField = '';
                var tdHtml = '<tr id="' + rowCount + '"><td><span id="spSkillName-' + rowCount + '">' + txtSkillName.val() + '</td>';
                tdHtml += '<td class="text-center"><ul id="lprogress' + rowCount + '" class="nav skill-lprogress"><li id="lball0' + rowCount + '"><div id="llayer0" class="ball"></div><div id="llayer12" class="pulse"></div></li><li id="lball1' + rowCount + '"><div id="layer1" class="ball"></div><div id="layer7" class="pulse"></div></li><li id="lball2' + rowCount + '"><div id="layer2" class="ball"></div><div id="llayer8" class="pulse"></div></li><li id="lball3' + rowCount + '"><div id="layer3" class="ball"></div><div id="layer9" class="pulse"></div></li><li id="lball4' + rowCount + '"><div id="layer4" class="ball"></div><div id="layer10" class="pulse"></div></li><li id="lball5' + rowCount + '"><div id="layer5" class="ball"></div><div id="llayer11" class="pulse"></div></li></ul></td>';
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
                $('#spExpertise-' + check).text(lblLevel.text());
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
        }
        else{
            $('#modalSkillNotNull').modal('show');
            txtSkillName.focus();
        }
    });
    var rowRemove = '';
    $('#tblSkills').on('click', '.btnDeleteSkill', function () {
        rowRemove = $(this).parents('tr');
        $('#modalRemoveSkill').modal('show');
    });
    $('#btnConfirmRemove').on('click', function () {
        var check = $('#modalRemoveSkill').data('id');
        if (check.startsWith('btnDelEducation')) {
            var id = check.slice(-1);
            $('#field-education-' + id).remove();
        }
        else if (check.startsWith('btnDelExp')) {
            var id = check.slice(-1);
            $('#field-experience-' + id).remove();
        }
        else if (check.startsWith('btnDelPro')) {
            var id = check.slice(-1);
            $('#field-project-' + id).remove();
        }
        else if (check.startsWith('btnDelCerti')) {
            var id = check.slice(-1);
            $('#field-certification-' + id).remove();
        }
        else {
            var id = rowRemove.attr('id');
            $('#skillName-' + id).remove();
            $('#skillExpertise-' + id).remove();
            $('#skillExperience-' + id).remove();
            $('#skillLastUsed-' + id).remove();
            rowRemove.remove();
            if (rowCount > 0)
                rowCount--;
            $('#skillHiddenIndex').val('-1');
        }
        $('#modalRemoveSkill').modal('hide');
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

    for (var i = 0; i < cloneIndexExp; i++) {
        $("#experienceFromDate-" + i).datepicker({
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
            onSelect: function (selected) {

                $("#experienceToDate-" + i).datepicker("option", "minDate", selected);

            }

        });


        $("#experienceToDate-" + i).datepicker({

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
            onSelect: function (selected) {

                $("#experienceFromDate-" + i).datepicker("option", "maxDate", selected);

            }

        });
    }

    for (var i = 0; i < cloneIndexEdu; i++) {
        $("#educationFromDate-" + i + ", #educationToDate-" + i).datepicker({
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
                var other = this.id == "educationFromDate-" + i ? "#educationToDate-" + i : "#educationFromDate-" + i;
                var option = this.id == "educationFromDate-" + i ? "maxDate" : "minDate";
                if ((selectedDate = $(other).val()).length > 0) {
                    year = selectedDate.substring(selectedDate.length - 4, selectedDate.length);
                    month = jQuery.inArray(selectedDate.substring(0, selectedDate.length - 5), $(this).datepicker('option', 'monthNames'));
                    $(this).datepicker("option", option, new Date(year, month, 1));
                }
            },
        });
    }

    for (var i = 0; i < cloneIndexPro; i++) {
        $("#projectFromDate-" + i + ", #projectToDate-" + i).datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: '1999:2016',
            showButtonPane: true,
            maxDate: new Date(),
            dateFormat: 'yy-mm-01',
            onClose: function (dateText, inst) {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, month, 1));
            },
        });
    }



    //Clone experience
    var $fieldExperienceClone = $("#field-experience-0");
    function cloneExp() {
        $fieldExperienceClone.clone(true, true)
            .insertBefore("#groupBtnExperience")
            .attr("id", "field-experience-" + cloneIndexExp)
            .addClass("clonedExpInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('experienceCompany')) {
                    this.name = 'experience[' + cloneIndexExp + '][company]';
                    this.id = id.slice(0, -1) + cloneIndexExp;
                }
                if (id.startsWith('experienceDesignation')) {
                    this.name = 'experience[' + cloneIndexExp + '][designation]';
                    this.id = id.slice(0, -1) + cloneIndexExp;
                }
                if (id.startsWith('experienceTo') || id.startsWith('experienceFr')) {
                    this.id = id.slice(0, -1) + cloneIndexExp;
                    this.name = [name.slice(0, 11), cloneIndexExp, name.slice(12)].join('');
                }
                if (id.startsWith('detailsEx'))
                    this.id = id.slice(0, -1) + cloneIndexExp;
                if (id.startsWith('btnDel')) {
                    this.id = id.slice(0, -1) + cloneIndexExp;
                    $(this).on('click', remove);
                }
            })

        $("#field-experience-" + cloneIndexExp).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('detailsExperience')) {
                name = 'experience[' + cloneIndexExp + '][detail]';
                id = 'experienceDetail-' + cloneIndexExp;
                $(this).empty();
                $(this).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '220') });
            }
            $("#experienceFromDate-" + cloneIndexExp + ", #experienceToDate-" + cloneIndexExp).datepicker({
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
    //delete expr
    $(".removeExperience").on("click", remove);
    $("#btnAddMoreExperience").on("click", cloneExp);
    //End clone experience

    //Clone Project
    var $fieldProjectClone = $("#field-project-0");
    function clonePro() {
        $fieldProjectClone.clone()
            .insertBefore("#groupBtnProject")
            .attr("id", "field-project-" + cloneIndexPro)
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
                    this.id = id.slice(0, -1) + cloneIndexPro;
                    this.name = [name.slice(0, 8), cloneIndexPro, name.slice(9)].join('');
                }
                if (id.startsWith('detailsProject'))
                    this.id = id.slice(0, -1) + cloneIndexPro;
                if (id.startsWith('btnDel')) {
                    this.id = id.slice(0, -1) + cloneIndexPro;
                    $(this).on('click', remove);
                }
            })
        $("#field-project-" + cloneIndexPro).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $('#' + id).removeClass('hasDatepicker');
            $(this).remove('legend');
            if (name.startsWith('project[0][de')) {
                name = 'project[' + cloneIndexPro + '][detail]';
                $('#detailsProject-' + cloneIndexPro).empty();
                $('#detailsProject-' + cloneIndexPro).append('<textarea class="editor" name="' + name + '" id="' + id + '"></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '220') });
            }
            $("#projectFromDate-" + cloneIndexPro + ", #projectToDate-" + cloneIndexPro).datepicker({
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
        cloneIndexPro++;
    }
    $('#field-project-' + cloneIndexPro).remove('legend');
    $("#btnAddMoreProject").on("click", clonePro);

    $(".removeProject").on("click", remove);
    //End clone project


    //Clone certification
    var $fieldCertificationClone = $("#field-certification-0");
    function cloneCert() {
        $fieldCertificationClone.clone()
            .insertBefore("#groupBtnCertification")
            .attr("id", "field-certification-" + cloneIndexCert)
            .addClass("clonedCertInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('certificationTitle')) {
                    this.name = 'certification[' + cloneIndexCert + '][title]';
                    this.id = id.slice(0, -1) + cloneIndexCert;
                }
                if (id.startsWith('certificationAuthority')) {
                    this.name = 'certification[' + cloneIndexCert + '][authority]';
                    this.id = id.slice(0, -1) + cloneIndexCert;
                }
                if (id.startsWith('certificationDate')) {
                    this.id = id.slice(0, -1) + cloneIndexCert;
                    this.name = 'certification[' + cloneIndexCert + '][date]';
                }
                if (id.startsWith('detailsCertification'))
                    this.id = id.slice(0, -1) + cloneIndexCert;
                if (id.startsWith('btnDelCerti')) {
                    this.id = id.slice(0, -1) + cloneIndexCert;
                    $(this).on('click', remove);
                }
            })

        $("#field-certification-" + cloneIndexCert).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('detailsCertification')) {
                name = 'certification[' + cloneIndexCert + '][detail]';
                $('#detailsCertification-' + cloneIndexCert).empty();
                $('#detailsCertification-' + cloneIndexCert).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '220') });
            }
            $("#certificationDate-" + cloneIndexCert).datepicker({
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
            });
        });
        cloneIndexCert++;


    }


    $("#btnAddMoreCetification").on("click", cloneCert);

    $(".removeCertification").on("click", remove);
    //End clone experience

    //clone Education
    var $fieldEducationClone = $("#field-education-0");
    function cloneEdu() {
        $fieldEducationClone.clone()
            .insertBefore("#groupBtnEducation")
            .attr("id", "field-education-" + cloneIndexEdu)
            .addClass("clonedEduInput")
            .find("*")
            .val("")
            .each(function () {
                var id = this.id || "";
                var name = this.name || "";
                if (id.startsWith('txtEduInstitute')) {
                    this.name = 'education[' + cloneIndexEdu + '][institute]';
                    this.id = id.slice(0, -1) + cloneIndexEdu;
                }
                if (id.startsWith('txtEduDegree')) {
                    this.name = 'education[' + cloneIndexEdu + '][degree]';
                    this.id = id.slice(0, -1) + cloneIndexEdu;
                }
                if (id.startsWith('educationTo') || id.startsWith('educationFr')) {
                    this.id = id.slice(0, -1) + cloneIndexEdu;
                    this.name = [name.slice(0, 10), cloneIndexEdu, name.slice(11)].join('');;
                }
                if (id.startsWith('detailsE'))
                    this.id = id.slice(0, -1) + cloneIndexEdu;
                if (id.startsWith('btnDelEducation')) {
                    this.id = id.slice(0, -1) + cloneIndexEdu;
                    $(this).data('id', 'edu' + cloneIndexEdu);
                    $(this).on('click', remove);
                }
            })
        $("#field-education-" + cloneIndexEdu).append('<hr>');
        $("#field-education-" + cloneIndexEdu).find("*").each(function () {
            var id = this.id || '';
            var name = this.name || '';
            $(this).remove('legend');
            $('#' + id).removeClass('hasDatepicker');

            if (id.startsWith('educationDetails')) {
                name = 'education[' + cloneIndexEdu + '][detail]';
                $('#detailsEducation-' + cloneIndexEdu).empty();
                $('#detailsEducation-' + cloneIndexEdu).append('<textarea class="editor" name="' + name + '" id="' + id + '" placeholder="Add a few details about this educational qualification..."></textarea>');
                CKEDITOR.replace(name);
                CKEDITOR.on('instanceLoaded', function (e) { e.editor.resize('100%', '220') });
            }
            $("#educationFromDate-" + cloneIndexEdu + ", #educationToDate-" + cloneIndexEdu).datepicker({
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
        cloneIndexEdu++;


    }
    function remove() {
        var id = this.id;
        $('#modalRemoveSkill').data("id", id).modal('show');
    }
    $("#btnAddMoreEducation").on("click", cloneEdu);

    $(".removeEducation").on("click", remove);
    //End clone Education

    for (var i = 0; i < cloneIndexCert; i++) {
        $("#certificationDate-" + i).datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: '1999:2016',
            showButtonPane: true,
            maxDate: new Date(),
            dateFormat: 'yy-mm-01',
            onClose: function (dateText, inst) {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, month, 1));
            },
        });
    }
    $("#fileuploader").uploadFile({
        url: "/resumes/photo",
        multiple: false,
        maxFileSize: 2999 * 1024,
        maxFileCount: 1,
        fileName: "userPhoto",
        returnType: "text",
        acceptFiles: "image/*",
        showPreview: true,
        showDelete: true,
        statusBarWidth: 600,
        previewHeight: "250px",
        previewWidth: "250px",
        previewCrop: true,
        onLoad: function (obj) {
            $.ajax({
                cache: false,
                url: "/resumes/photo/load",
                dataType: "json",
                method: "POST",
                success: function (data) {

                    console.log('hit');
                    console.log(data);
                    var check = false;
                    /*for (var key in data){
                        if(data[key] == '') check = false;else check = true;
                    }
                    console.log(check);*/
                    if (check != null) {
                        console.log(check);
                        //for(var i=0;i<data.length;i++){ 
                        obj.createProgress(data.i128, "/public/photo/" + data.i128, data.size);
                    }
                    //console.log('cai moi la: ');
                    //console.log(obj);
                    //}
                },
                error: function (status) {
                    console.log(status);
                }
            });
        },

        deleteCallback: function (data, pd) {
            //console.log(typeof(data));
            //console.log(data[0]);

            if (typeof (data) == "object") {

                $.post("/resumes/photo", { op: "delete", nameImg: data[0] },

                    function (resp, textStatus, jqXHR) {
                        //Show Message
                        alert("File Deleted");
                    });
            }
            else {
                var obj2 = JSON.parse(data);
                console.log('obj 2 la ');
                console.log(obj2);
                $.post("/resumes/photo", { op: "delete", nameImg: obj2.i128 },

                    function (resp, textStatus, jqXHR) {
                        //Show Message
                        alert("File Deleted");
                    });
            }

            pd.statusbar.hide(); //You choice.

        },
        onSuccess: function (data) {
            console.log(data);
            $('#myImage').val(data);
            $('#myImageUrl').val(data);
        }

    });
});