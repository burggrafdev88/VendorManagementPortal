const overlay = document.getElementById('overlay');

const openModal = (idName) => {
    // const modal = document.getElementById(idName);
    // modal.classList.add('active');
    // overlay.classList.add('active');
    console.log('Opened brah.');
};

const closeModal = (idName) => {
    const modal = document.getElementById(idName);
    modal.classList.remove('active');
    overlay.classList.remove('active');
};

// $( "#addVendorForm22" )[0].submit(function(){
//    alert("Add vendor handler called.");
// });

$(document).on('submit', '#addVendorForm', function(){
    console.log('Handler for add vendor called.');
    //preventing from page reload and default actions
    // event.preventDefault();

    //serialize the data for sending the form data.
    let serializedData = $( this ).serialize();
    console.log(serializedData);

    //make ajax call
    $.ajax({
        type: 'POST',
        url: "add_vendor",
        data: serializedData,
        success: function(response){
            //on successful creating of object - append newly added vendor to table
            let instance = JSON.parse(response["instance"]);
            let fields = instance[0]["fields"];
            $("#vendorTable tbody").prepend(
                `<tr>
                    <td>${fields["f_name"]||""}</td>
                    <td>${fields["l_name"]||""}</td>
                    <td>${fields["company"]||""}</td>
                    <td>${fields["physical_access"]||""}</td>
                    <td>${fields["logical_access"]||""}</td>
                    <td>${fields["length_of_service"]||""}</td>
                </tr>`
            )
        },
        error: function (response) {
            // alert the error if any error occured
            alert(response["responseJSON"]["error"]);
        }
    });
});


$(document).on('click', '#editVendorButton', function () {
    let id = $(this).attr('id');
    alert("Howdy! " + id);
});

const editVendorFunction = (id) => {
    let tr_id = "#vendor" + id;
    let first_name = $(tr_id).find(".first_name").text();
    let last_name = $(tr_id).find(".last_name").text();
    let company = $(tr_id).find(".company").text();
    let physical_access =$(tr_id).find(".physical_access").text();
    let logical_access =$(tr_id).find(".logical_access").text();
    let length_of_service = $(tr_id).find(".length_of_service").text();
    let work_description = $(tr_id).find(".work_description").text();

    alert("Hello " + first_name);
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

    $('#editVendor input').attr('readonly', 'readonly');
    $('#editVendor input').attr('disabled', 'disabled');
}


// Update Django Ajax Call
function editUsesr(id) {
    if (id) {



        // name = $(tr_id).find(".userName").text();
        // address = $(tr_id).find(".userAddress").text();
        // age = $(tr_id).find(".userAge").text();
        // $('#form-id').val(id);
        // $('#form-name').val(name);
        // $('#form-address').val(address);
        // $('#form-age').val(age);
    }
}




// // // const closeModalButtons = document.querySelectorAll('[data-close-button]')
// const overlay = document.getElementById('overlay')
//
// openModalButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalAppointmentTarget)
//         openModal(modal)
//     })
// })
//
//
//
// // closeModalButtons.forEach(button => {
// //     button.addEventListener('click', () => {
// //         const modal = button.closest('.modal')
// //         closeModal(modal)
// //     })
// // })
//
// function openModal(modal){
//     if(modal == null) return
//     console.log('Modal opened.')
//     modal.classList.add('active')
//     overlay.classList.add('active')
// }
//
// // function closeModal(modal){
// //     if(modal == null) return
// //     modal.classList.remove('active')
// //     overlay.classList.remove('active')
// // }