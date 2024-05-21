
const loadAllDoctors = async () => {
    try {
        const firstPageResponse = await fetch("https://smart-care-o2t9.onrender.com/doctor/list/");
        const firstPageData = await firstPageResponse.json();
        let allDoctors = firstPageData.results;

        const totalPages = Math.ceil(firstPageData.count / allDoctors.length);
        const fetchRequests = [];

        for (let page = 2; page <= totalPages; page++) {
            fetchRequests.push(fetch(`https://smart-care-o2t9.onrender.com/doctor/list/?page=${page}`).then(response => response.json()));
        }

        const remainingPagesData = await Promise.all(fetchRequests);
        remainingPagesData.forEach(pageData => {
            allDoctors = allDoctors.concat(pageData.results);
        });

        displayDoctors(allDoctors);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayDoctors = (doctors) => {
    const doctorsDiv = document.getElementById("doctors-div");
    doctors.forEach((doctor) => {
        doctorsDiv.innerHTML += `
        <div class="col-md-3">
            <ul class="list-unstyled">
                <li>
                    <div class="team-img">
                        <img class="img-responsive" src="${doctor.image}" alt="">
                        <ul>
                            <li><a href="https://www.twitter.com"><i class="icon-custom icon-sm rounded-x fa fa-twitter"></i></a></li>
                            <li><a href="https://www.facebook.com"><i class="icon-custom icon-sm rounded-x fa fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com"><i class="icon-custom icon-sm rounded-x fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <h3>${doctor.user}</h3>
                    <h4>/ ${doctor.designation.join(", ")}</h4>
                    <p>${doctor.specialization.join(", ")}</p>
                    <p>Fee: ${doctor.fee}</p>
                    <p>Available Time: ${doctor.available_time.join(", ")}</p>
                    <a href="" onclick="redirectToDetails(${doctor.id})" target="_blank">See Details</a>
                </li>
            </ul>
        </div>
        `;
    });
}

{/* <button></button> */}

const redirectToDetails = (doctor_id) => {
    console.log(doctor_id)
    window.location.href = `/docDetails.html?id=${doctor_id}`;
}

const loadDetails = () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const doctor_id = urlParams.get('id');
    console.log(doctor_id)
    fetch(`https://smart-care-o2t9.onrender.com/doctor/list/${doctor_id}`)
    .then(res => res.json())
    .then(data => {
        displayDetails(data);
        
    
    })
}


const getLink = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctor_id = urlParams.get('id');
    console.log(doctor_id)
    fetch(`https://smart-care-o2t9.onrender.com/doctor/list/${doctor_id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // window.location.href = data.meet_link
        window.open(data.meet_link, '_blank');
    
    })
}

const displayDetails = (data) => {
    const docDiv = document.getElementById("doc_details");
    console.log(docDiv)
    console.log(data)
    const htmlContain = `
    <div class="row">
        <div class="col-md-12">
            <div class="doctor-details">
                <div class="doctor-img">
                    <img src="${data.image}" alt="Doctor Image">
                </div>
                <div class="doctor-info">
                    <h2>Dr. ${data.user}</h2>
                    <p>${data.designation.join(", ")}</p>
                    <p>Specialization: ${data.specialization.join(", ")}</p>
                    <p>Available Time: ${data.available_time.join(", ")}</p>
                    <p>Fee: ${data.fee}</p>
                    <button type="button" onclick="loadTime(${data.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
	                    Take Appointment
                    </button>
                </div>                   
            </div>
        </div>
    </div>
    `;
    // const docDiv = document.getElementById("doc_details");
    console.log(docDiv)
    docDiv.innerHTML = `
    <div class="container">
        ${htmlContain}              
    </div>
    `;
}



const loadTime = (id) => {
    console.log("doc id" ,id)
    fetch(`https://smart-care-o2t9.onrender.com/doctor/available_time/?doctor_id=${id}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("time-container");
          const option = document.createElement("option");
          option.value = item.id;
          option.innerText = item.name;
          parent.appendChild(option);
        });
        console.log(data);
    });
};


const handleAppointment = () => {
    const param = new URLSearchParams(window.location.search).get("id");
    const status = document.getElementsByName("status");
    const selected = Array.from(status).find((button) => button.checked);
    const symptom = document.getElementById("symptom").value;
    const time = document.getElementById("time-container");
    const selectedTime = time.options[time.selectedIndex];
    const patient_id = localStorage.getItem("user_id");

    const info = {
        appointment_types: selected.value,
        appointment_status: "Pending",
        time: selectedTime.value,
        symptom: symptom,
        cancel: false,
        patient: patient_id,
        doctor: param,
    };
    console.log(info)

    fetch("https://smart-care-o2t9.onrender.com/appointment/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data) => {
    //   window.location.href = `pdf.html?doctorId=${param}`;
      // handlePdf();
      console.log(data);
    });
    
}



// loadTime()

loadDetails()
loadAllDoctors();
