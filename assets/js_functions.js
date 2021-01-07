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

$(document).on('submit', '#addVendorForm22', function(){
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



const addVendorForm = document.getElementById('#addVendorForm22');
//
// /*Function to add vendor to the database and table via ajax*/
// $( "#addVendforForm" ).submit(function (event) {
//     alert('Handler for add vendor submit called.');
//
//     //preventing from page reload and default actions
//     // event.preventDefault();
//
//     //serialize the data for sending the form data.
//     let serializedData = $(this.serialize());
//
//     //make ajax call
//     $.ajax({
//         type: 'POST',
//         url: "{% url add_vendor %}",
//         data: serializedData,
//         success: function(response){
//             //on successful creating of object - append newly added vendor to table
//             let instance = JSON.parse(response["instance"]);
//             let fields = instance[0]["fields"];
//             $("#vendorTable tbody").prepend(
//                 `<tr>
//                     <td>${fields["f_name"]||""}</td>
//                     <td>${fields["l_name"]||""}</td>
//                     <td>${fields["company"]||""}</td>
//                     <td>${fields["physical_access"]||""}</td>
//                     <td>${fields["logical_access"]||""}</td>
//                     <td>${fields["length_of_service"]||""}</td>
//                 </tr>`
//             )
//         },
//         error: function (response) {
//             // alert the error if any error occured
//             alert(response["responseJSON"]["error"]);
//         }
//     })
// });
//
//








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