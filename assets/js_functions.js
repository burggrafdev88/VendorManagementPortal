//jQuery to add vendor through AJAX
$(document).on('submit', '#addVendorForm', function(){

    //set variables equal to fields in the form.
    let first_name = $('#addVendorForm input[name=f_name]').val();
    let last_name = $('#addVendorForm input[name=l_name]').val();
    let company = $('#addVendorForm input[name=company]').val();

    //check if physical access field is checked. Then set equal to 'True' or 'False'. (jQuery sets it equal to
    // 'true' or 'false'.  Python needs the first letter capitalized to be able to read it.
    let physical_access = $('#addVendorForm input[name=physical_access]').is(':checked');
    physical_access = physical_access === true ? 'True' : 'False';

    //check if physical access field is checked. Then set equal to 'True' or 'False' depending on its value.
    // (jQuery sets it equal to 'true' or 'false'.  Python needs the first letter capitalized to be able to read it.
    let logical_access = $('#addVendorForm input[name=logical_access]').is(':checked');
    logical_access = logical_access === true ? 'True' : 'False';

    //check if logical access field is checked. Then set equal to 'True' or 'False' depending on its value.
    // (jQuery sets it equal to 'true' or 'false'.  Python needs the first letter capitalized to be able to read it.
    let length_of_service = $('#addVendorForm input[name=length_of_service]').val();
    let work_description = $('#addVendorForm input[name=work_description]').val();

    let bank_poc = $('#addVendorForm input[name=user_id]').val();

    //if all fields have a value, execute an ajax call.
    if(first_name && last_name && company && physical_access != null && logical_access != null && length_of_service &&
    work_description) {

        //make ajax call
        $.ajax({
            url: 'add_vendor_ajax',
            data: {
                'f_name': first_name,
                'l_name': last_name,
                'company': company,
                'physical_access': physical_access,
                'logical_access': logical_access,
                'length_of_service': length_of_service,
                'work_description': work_description,
                'bank_poc': bank_poc,
            },
            dataType: 'json',
            success: function (data) {
                if (data.vendor) {
                    alert("Your vendor has been added.");
                }
            },
            error: function (error) {
                alert('There was an error. Please try again. ' + error);
            }
        });
    }
});

/*JavaScript function to pull up edit vendor form*/
const editVendorFunction = (id) => {
    let tr_id = "#vendor" + id;
    let first_name = $(tr_id).find(".first_name").text();
    let last_name = $(tr_id).find(".last_name").text();
    let company = $(tr_id).find(".company").text();
    let physical_access =$(tr_id).find(".physical_access").text();
    let logical_access =$(tr_id).find(".logical_access").text();
    let length_of_service = $(tr_id).find(".length_of_service").text();
    let work_description = $(tr_id).find(".work_description").text();

    $('#editVendor input[name=vendor_id]').val(id);
    $('#editVendor input[name=f_name]').val(first_name);
    $('#editVendor input[name=l_name]').val(last_name);
    $('#editVendor input[name=company]').val(company);

    if (physical_access === 'True'){
        $('#editVendor input[name=physical_access]').prop("checked", true);
    } else {
        $('#editVendor input[name=physical_access]').prop("checked", false);
    }

    if (logical_access === 'True'){
        $('#editVendor input[name=logical_access]').prop("checked", true);
    } else {
        $('#editVendor input[name=logical_access]').prop("checked", false);
    }

    $('#editVendor input[name=length_of_service]').val(length_of_service);
    $('#editVendor input[name=work_description]').val(work_description);

    $('#editVendor input').prop('readonly', true);
    $('#editVendor input').prop('disabled', true);
}

/*JavaScript to change edit vendor form from readonly to editable*/
const enableForm = () => {
    $('#editVendor input').prop('readonly', false);
    $('#editVendor input').prop('disabled', false);
}

// Django AJAX call to update record.
$(document).on('submit', '#editVendor', function() {
    let vendor_id = $('#editVendor input[name="vendor_id"]').val();
    let first_name = $('#editVendor input[name="f_name"]').val();
    let last_name = $('#editVendor input[name="l_name"]').val();
    let company = $('#editVendor input[name="company"]').val();

    //check if physical access field is checked. Then set equal to 'True' or 'False' depending on its value.
    // (jQuery sets it equal to 'true' or 'false'.  Python needs the first letter capitalized to be able to read it.
    let physical_access = $('#editVendor input[name="physical_access"]').is(":checked");
    physical_access = physical_access === true ? 'True' : 'False';

    //check if logical access field is checked. Then set equal to 'True' or 'False' depending on its value.
    // (jQuery sets it equal to 'true' or 'false'.  Python needs the first letter capitalized to be able to read it.
    let logical_access = $('#editVendor input[name="logical_access"]').is(":checked");
    logical_access = logical_access === true ? 'True' : 'False';

    let length_of_service = $('#editVendor input[name="length_of_service"]').val();
    let work_description = $('#editVendor input[name="work_description"]').val();

    if (vendor_id && first_name && last_name && company && physical_access != null && logical_access != null && length_of_service &&
        work_description) {

        // Create ajax call
        $.ajax({
            url: 'edit_vendor',
            data: {
                'id': vendor_id,
                'f_name': first_name,
                'l_name': last_name,
                'company': company,
                'physical_access': physical_access,
                'logical_access': logical_access,
                'length_of_service': length_of_service,
                'work_description': work_description,
            },
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert("Vendor data has been updated.");
                }
            },
            error: function (error) {
                alert(error);
            }
        });
    //    if not all fields are filled in in the if statement above, alert the message below.
    } else {
        alert("All fields must be valid.");
    }
});

/*JavaScript to delete vendor record.*/
const deleteVendorFunction = (id) =>{
    let vendor_id = id;

    // Create ajax call
    $.ajax({
        url: 'delete_vendor',
        data: {
            'id': vendor_id,
        },
        dataType: 'json',
        success: function (status) {
            if (status) {
                alert("Vendor data has been deleted.");
                location.reload();
            } else{
                alert("Vendor delete was unsuccessful");
            }
        },
        error: function (error) {
            alert(error);
        }
    });
}


const scheduleAppointmentSetVendorID = (id) =>{
    let vendorID = id;
    $('#hidden_vendorID_field').val(vendorID);
}

//jQuery to schedule screening through AJAX
$(document).on('submit', '#scheduleScreeningForm', function(){
    alert('Function called.');

    //set variables equal to fields in the form.
    // let user_id = $('#scheduleScreeningForm input[name=user_id]').val();
    let vendor_id = $('#scheduleScreeningForm input[name=vendor_id]').val();
    let day = $('#scheduleScreeningForm input[name=day]').val();
    
    //moment function is from the moment.js package
    day = moment(day).format('YYYY-MM-DD');

    let start_time = $('#scheduleScreeningForm input[name=start_time]').val();
    let end_time = $('#scheduleScreeningForm input[name=end_time]').val();
    let notes = $('#scheduleScreeningForm textarea[name=notes]').val();

    //if all fields have a value, execute an ajax call.
    if(vendor_id && day && start_time && end_time && notes) {

        //make ajax call
        $.ajax({
            url: '/events/schedule_screening_ajax',
            data: {
                // '': user_id,
                'vendor': vendor_id,
                'day': day,
                'start_time': start_time,
                'end_time': end_time,
                'notes': notes,
            },
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert("Your vendor's appointment has been scheduled.");
                }
            },
            error: function (error) {
                alert('There was an error. Please try again. ' + error);
            }
        });
    }
});


// //USE THE FUNCTION BELOW TO HELP BUILD MY MOMENT.JS FUNCTION
// /*Once DOM is fully loaded, run script to format table cells with dates*/
// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log("Function to format currencies called.");
//
//     let dateElements = document.getElementsByClassName("date");
//
//     for(let i = 0; i < dateElements.length; i++){
//         let date = dateElements[i].innerHTML;
//
//         /*moment function is part of the moment.js package*/
//         date = moment(date).format('M/D/YYYY');
//         dateElements[i].innerHTML = date;
//     }    YYYY-MM-DD


