
employeeArray.push(emp1,emp2,emp3,emp4,emp5,emp6,emp7,emp8,emp9,emp10,emp11,emp12,emp13,emp14,emp15,emp16,emp17,emp18,emp19,emp20,emp21,emp22,emp23,emp24,emp25,emp26,emp27,emp28,emp29,emp30);

const filterHeader = document.getElementsByClassName("nav-item filter-header")[0];
const filterEmployees = document.getElementById("filters-content");

const documentFilterMenu = document.getElementById("filter-menu");
const searchEmp = document.getElementsByClassName("filter-search-emp")[0];
const filterEmp = document.getElementsByClassName("filter-filter-emp")[0];
const editEmp = document.getElementsByClassName("filter-edit-emp")[0];
const addEmp = document.getElementsByClassName("filter-add-emp")[0];
const filtersEmp = [searchEmp,filterEmp,editEmp,addEmp];

const searchEmpHeader = document.getElementById("search-emp");
const filterEmpHeader = document.getElementById("filter-emp");
const editEmpHeader = document.getElementById("edit-emp");
const addEmpHeader = document.getElementById("add-emp");
let oldValue;
let activeFilter;
let oldDateFilterMenuClick = new Date().getTime();

// Personelleri Listeleme (değişiklikten sonra tekrar listeleme)
function employeeList(){
    // Personelin HTML belgesi içerisinde yerleşeceği konumları tut.
    let personDocumentDepartmentEmployee;
    let personDocumentManagerEmployee = document.getElementById("menagers");
    let personDocumentAssistantManagerEmployee = document.getElementById("assistant-menagers");
    // Personelleri listelemeden önce temizle
    for(let employee of document.querySelectorAll(".employees")) employee.innerHTML = "";
    
    employeeArray.map((person) => {
        // Personel kartı
        let addPersonCard = `
                <div class="person-card">
                    <div class="person-card-header"><img src="assets/img/${person.imageName}" alt="person-image"></div>
                    <div class="person-card-body">
                        <div class="header">
                            <span class="name">${person.name}</span>
                            <span class="job">${person.positionName()}</span>
                        </div>
                        <div class="footer">
                            <span class="age"><strong>Age : </strong>${person.age()}</span>
                            <span class="option-time"><strong>Operation Time : </strong>${person.optionTime()} Years</span>
                            <span class="achievement-score"><strong>Achievement Score : </strong> ${person.score} / 10</span>
                            <span class="mail"><strong>Mail : </strong>${person.mail}</span>
                        </div>
                    </div>
                </div>
                `;
        // Personelin bulunduğu depertmanın html içinde yerleşeceği tablonun id si.
        departmentsDocument.map((department) => {
            if(person.departmentId == department.id){
                personDocumentDepartmentEmployee = document.getElementById(department.documentId);
                return;
            }
        })
        // Personelin yönetici veya yönetici asistanı olup olmadığını kontrol.
        if(person.positionId == 0){
            // CEO ekle
            if(person.departmentId == 0){
                personDocumentManagerEmployee.insertAdjacentHTML("beforeend",addPersonCard);
            }
            // Yönetici Ekle
            else {
                personDocumentManagerEmployee.insertAdjacentHTML("beforeend",addPersonCard);
            }  
        }
        // Yönetici asistanı ekle
        else if (person.positionId == 1){
            personDocumentAssistantManagerEmployee.insertAdjacentHTML("beforeend",addPersonCard);
        }
        // Personeli HTML içerisini gönder
        personDocumentDepartmentEmployee.insertAdjacentHTML("beforeend",addPersonCard);
    })
}
// Açılışta çalışanları listele
employeeList();
// Tüm aktif olan class ları temizleme(filter header)
function beforeClearFilters(){
    filtersEmp.map((filter) => filter.classList.remove("active"));
    activeFilter = "";
    // Filter Menu İcon passive
    documentFilterMenu.children[0].classList.replace("active","passive");
    // Filters passive
    for(let element of document.querySelectorAll(".filter")){
        element.classList.replace("active","passive");
    }
}
// Filtre aramaya tıkladığında menuye filtre başlığı ekle ve filtre içeriği eklenecek yeri göster
function callFilters(value = String){

    if(!filterHeader.getAttribute("class").includes("active",0)){
        filterHeader.classList.add("active");
        filterHeader.children[0].innerHTML = `<i class="fa-solid fa-arrow-down-short-wide"></i>${value}`;
        filterEmployees.classList.add("active");
    }
    else filterHeader.children[0].innerHTML = `<i class="fa-solid fa-arrow-down-short-wide"></i>${value}`;  
}
// NotFound ekranını göster
function notFoundCall(){

    let content = `
        <div class="not-search-employees" id="not-search-employees">
            <div class="content">
                <span class="header">SORRY</span>
                <span class="desc">No employee found for the search criteria. Edit the filtering options and try again.</span>
            </div>
        </div>
    `;

    if(!filterEmployees.getAttribute("class").includes("not-founds",0)){
        if(!filterEmployees.getAttribute("class").includes("not-search-employees",0)){
            filterEmployees.classList.add("not-founds","not-search-employees");
            filterEmployees.insertAdjacentHTML("beforeend",content);
        }
    }
}
// NotFound ekranını temizle
function notFoundRemove(){
    if(filterEmployees.getAttribute("class").includes("not-founds",0)) filterEmployees.classList.remove("not-founds");
    if(filterEmployees.getAttribute("class").includes("not-search-employees",0)) filterEmployees.classList.remove("not-search-employees");
    if(document.getElementById("not-search-employees") != undefined) document.getElementById("not-search-employees").remove();
    if(document.getElementById("not-search-employees") != undefined) document.getElementById("not-search-employees").remove();
}
// Hata mesajı göster
function warningErrorCall(warningDocumentId = String, textValue = String, warningType= Boolean){
    let warningError = document.getElementById(warningDocumentId);
    // Tıklandığında warning mesajı animasyonunu çalıştırma
    if(!warningError.getAttribute("class").includes("active",0)){
        if(!warningError.getAttribute("class").includes("passive",0)){
            warningError.classList.add("active");
            setTimeout(() => warningError.classList.replace("active","passive"), 2500);
        }
        else{
            warningError.classList.replace("passive","active");
            setTimeout(() => warningError.classList.replace("active","passive"), 2500);
        }  


        // Success veya error eklemeden önce var olan varsa temizle.
        if(warningError.getAttribute("class").includes("success",0)) warningError.classList.remove("success");
        if(warningError.getAttribute("class").includes("error",0)) warningError.classList.remove("error");

        // Hata mesajı tipi kontrol (warningType : True = başarılı, False = Başarısız)
        if(warningType != null){
            if(warningType == true){
            warningError.classList.add("success");
            warningError.innerHTML = `<i class="fa-solid fa-circle-check"></i>${textValue}`;
            }
            else if(warningType == false){
                warningError.classList.add("error");
                warningError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>${textValue}`;
            }
        }
  
    }
}
// Warning error passive classını temizle
function clearWarningError(){

    for(let warningError of document.getElementsByClassName("warning-error")){
        if(warningError.getAttribute("class").includes("passive",0)){
            warningError.classList.remove("passive");
        }
    } 
}
// Filter content alanının temizlenmesi
function clearFilterContent(){
    for(let classes of filterEmployees.classList){
        if(classes != "filter-content" && classes != "active"){
            filterEmployees.classList.remove(classes);
        }
    }
    filterEmployees.innerHTML = "";
}
// Filter menü iconu ve filtre başklıkları açılış kapanış
documentFilterMenu.addEventListener("click", () =>{
    // Tüm Warning error içindeki passive clasını temizle
    clearWarningError();
    // tıklandığı anki saati milisecond cinsinden oluştur ve eski tıklanma ile arasında .. saniye varsa çalştır.
    let clickNowDate = new Date().getTime();
    // eğer en son tıklana ile arasında 1000ms var ise tekrar tıklanabilir.
    if(clickNowDate - oldDateFilterMenuClick > 1000){
        if(documentFilterMenu.children[0].getAttribute("class").includes("active")){
            // Filter Menu İcon passive
            documentFilterMenu.children[0].classList.replace("active","passive");
            // Filters passive
            for(let element of document.querySelectorAll(".filter")){
                element.classList.replace("active","passive");
            }
            // Filters content visible passive
            function filtersActivitiy() {
                if(activeFilter != undefined) activeFilter.classList.add("active");
            }
            setTimeout(filtersActivitiy,900);     
        }
        else {
            // Filter Menu icon active
            documentFilterMenu.children[0].classList.replace("passive","active");
            // Filters active
            for(let element of document.querySelectorAll(".filter")){
                if(element.getAttribute("class").includes("passive",0)){
                    element.classList.replace("passive","active")
                }
                else element.classList.add("active")
            }
            // Filters content visible activitiy
            filtersEmp.map((filter) =>{
                if(filter.getAttribute("class").includes("active",0)) {
                    activeFilter = filter;  
                }
                filter.classList.remove("active");
                
            });
        };
        oldDateFilterMenuClick = new Date().getTime();
    }
    // Menu tıklama işaretini ilk tıklamada sil
    if(document.getElementById("welcome-sing") != undefined) document.getElementById("welcome-sing").remove();
});


////////////////// Filter Headers /////////////////
// Çalışan ara filtre başlığına tıklandığında (Search of Employee)
searchEmpHeader.addEventListener("click", () => {
    //inputları temizle
    for(let input of document.querySelectorAll(".filter-search-emp input")){
        input.value = "";
        input.addEventListener("keydown",(event) => {if(event.key == "Enter") document.getElementById("search-emp-button").click()})
        }
    beforeClearFilters();
    notFoundRemove();
    clearFilterContent();
    setTimeout(() => {searchEmp.classList.add("active")} ,900);
    callFilters("Filter employees");
    setTimeout(() => filterHeader.children[0].click(), 1);
    function editEmployees(){

        filterEmployees.classList.add("filter-employees");
        // Tüm çalışanları görüyorsunuz.
        let allListWacth = `<span class="all-employees-view"><i class="fa-solid fa-eye"></i>You are currently viewing all employees.</span>`;
        filterEmployees.insertAdjacentHTML("beforeend",allListWacth);
    
        // Tüm çalışanları listele
        employeeArray.map((employee) =>{
    
            let personCard = `
            <div class="person-card-horizontal" id="${employee.id}">
                <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                <div class="person-card-horizontal-content">
                    <div class="person-card-horizontal-content-header">
                        <div class="name-job">
                            <h3>${employee.name}</h3>
                            <span>${employee.positionName()}</span>
                        </div> 
                    </div>
                    <div class="person-card-horizontal-content-desc">
                        <span><strong>Age : </strong>${employee.age()}</span>
                        <span><strong>Operation Time : </strong>${employee.optionTime()}</span>
                        <span><strong>Achievement Score : </strong>${employee.score}</span>
                        <span><strong>Mail : </strong>${employee.mail}</span>
                    </div>
                </div>
            </div>
        `;
        filterEmployees.insertAdjacentHTML("beforeend",personCard);
    
        });
    }
    editEmployees();
    
});
// Çalışan filtrele filtre başlığına tıklandığında (Edit Employee)
filterEmpHeader.addEventListener("click", () =>{
     
    // score input add eventlistenir enter
    for(let scoreInput of document.querySelectorAll("#for-score-form input")){
        //inputları temizle
        scoreInput.value = "";
        // inputun içinde iken enter a basınca buttona tıkla
        scoreInput.addEventListener("keydown", (Event) => {if(Event.key == "Enter") document.getElementById("filter-score-button").click(); })
    }
    // operation time input add eventlistenir enter
    for(let operationTimeInput of document.querySelectorAll("#for-operation-time-form input")){
        //inputları temizle
        operationTimeInput.value = "";
        // inputun içinde iken enter a basınca buttona tıkla
        operationTimeInput.addEventListener("keydown", (Event) => {if(Event.key == "Enter") document.getElementById("filter-option-time-button").click(); })
    }
    beforeClearFilters();
    notFoundRemove();
    clearFilterContent();
    setTimeout(() => {filterEmp.classList.add("active")} ,900);
    callFilters("Filter employees");
    setTimeout(() => filterHeader.children[0].click(), 1);
    function editEmployees(){

        filterEmployees.classList.add("filter-employees");
        // Tüm çalışanları görüyorsunuz.
        let allListWacth = `<span class="all-employees-view"><i class="fa-solid fa-eye"></i>You are currently viewing all employees.</span>`;
        filterEmployees.insertAdjacentHTML("beforeend",allListWacth);
        // Tüm çalışanları listele
        employeeArray.map((employee) =>{
    
            let personCard = `
            <div class="person-card-horizontal" id="${employee.id}">
                <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                <div class="person-card-horizontal-content">
                    <div class="person-card-horizontal-content-header">
                        <div class="name-job">
                            <h3>${employee.name}</h3>
                            <span>${employee.positionName()}</span>
                        </div> 
                    </div>
                    <div class="person-card-horizontal-content-desc">
                        <span><strong>Age : </strong>${employee.age()}</span>
                        <span><strong>Operation Time : </strong>${employee.optionTime()}</span>
                        <span><strong>Achievement Score : </strong>${employee.score}</span>
                        <span><strong>Mail : </strong>${employee.mail}</span>
                    </div>
                </div>
            </div>
        `;
        filterEmployees.insertAdjacentHTML("beforeend",personCard);
    
        });
    }
    editEmployees();
})
// Çalışan düzenle veya sil filtre başlığına tıklandığında
editEmpHeader.addEventListener("click", () => {
    beforeClearFilters();
    setTimeout(() => {editEmp.classList.add("active")} ,900);
    notFoundRemove();
    clearFilterContent();
    callFilters("Edit or delete employees");
    setTimeout(() => filterHeader.children[0].click(), 1);
    // Tüm çalışanları ve arama kutucuğunu göster
    function editEmployees(){

        filterEmployees.classList.add("edit-employees");
        // Çalışan arama alanı ekle
        let searchEmp = `
            
            <div class="for-filter">
            <span class="warning-error-2" id="warning-message-edit-search"><i class="fa-solid fa-circle-exclamation"></i></span>
                <form class="form-filters" id="for-score-form">
                    <h3 class="for-header">Search Employee</h3>
                    <div class="little">
                        <label class="filter-label" for="smaller-than">Full Name :</label>
                        <input class="filter-text" type="text" class="filter" id="filter-edit-name">
                    </div>
                    <div class="big">
                        <label class="filter-label" for="greater-than">or Mail :</label>
                        <input class="filter-text" type="text" class="filter" id="filter-edit-mail">
                    </div>
                    <button class="filter-button" type="button" id="filter-edit-search-button"><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                </form>
            </div>
        `;
        filterEmployees.insertAdjacentHTML("afterbegin", searchEmp);
    
        // Tüm çalışanları listele
        employeeArray.map((employee) =>{
    
            let personCard = `
            <div class="person-card-horizontal" id="${employee.id}">
                <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                <div class="person-card-horizontal-content">
                    <div class="person-card-horizontal-content-header">
                        <div class="name-job">
                            <h3>${employee.name}</h3>
                            <span>${employee.positionName()}</span>
                        </div> 
                        <div class="person-edit">
                            <button type="button" onclick="editPerson(${employee.id})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                            <button type="button" onclick="deletePerson(${employee.id})"><i class="fa-sharp fa-solid fa-user-minus"></i></i>Delete</button>
                        </div>
                    </div>
                    <div class="person-card-horizontal-content-desc">
                        <span><strong>Age : </strong>${employee.age()}</span>
                        <span><strong>Operation Time : </strong>${employee.optionTime()}</span>
                        <span><strong>Achievement Score : </strong>${employee.score}</span>
                        <span><strong>Mail : </strong>${employee.mail}</span>
                    </div>
                </div>
            </div>
        `;
        filterEmployees.insertAdjacentHTML("beforeend",personCard);
    
        });
    }
    editEmployees();
    callEditFunctions();
})
// Çalışan ekle başlığına tıklandığında
addEmpHeader.addEventListener("click", () => {
    // Eskiden kalan tüm imputların içini temizle
    for(let input of document.getElementById("for-add-form").querySelectorAll("input")){ input.value = "";}
    beforeClearFilters();
    setTimeout(() => {addEmp.classList.add("active")} ,900);
    notFoundRemove();
    clearFilterContent();
    callFilters("Add employees");
    setTimeout(() => filterHeader.children[0].click(), 1);
    let addPersonCard = `
    <div class="person-card">
        <div class="person-card-header"><img src="assets/img/person-null.png" alt="person-image" id="preview-person-image"></div>
        <div class="person-card-body">
            <div class="header">
                <span class="name" id="add-preview-name"></span>
                <span class="job" id="add-preview-position"></span>
            </div>
            <div class="footer">
                <span class="age" id="add-preview-year-birth"><strong>Age : </strong></span>
                <span class="option-time" id="add-preview-start-job"><strong>Operation Time : </strong></span>
                <span class="achievement-score" id="add-preview-score"><strong>Achievement Score : </strong></span>
                <span class="mail" id="add-preview-mail"><strong>Mail : </strong></span>
            </div>
        </div>
    </div>
    `;
    filterEmployees.insertAdjacentHTML("beforeend",addPersonCard);
    filterEmployees.classList.add("add-employees");
    // departmanları listele. (departman seçildikten sonra pozisyonlar gösteirlecek)
    let departmanSelectElement = document.getElementById("add-departman");
    let positionSelectElement = document.getElementById("add-position");
    // Eskiden kalan departman seçimini null yap
    if(document.getElementById("add-departman").value != null) document.getElementById("add-departman").value = null;
    // Tüm departmanları listele
    while(departmanSelectElement.children.length > 1){
    departmanSelectElement.lastChild.remove();
    }
    departments.map((department) =>{
        departmanSelectElement.insertAdjacentHTML("beforeend", `<option value="${department.name}">${department.name}</option>`)
    });
    // Add employee 'de departman seçildikten sonra pozisyonları listele
    departmanSelectElement.addEventListener("click", () =>{
    let value = departmanSelectElement.value;
    // Eğer seçilen değerin içi boş değil ise
    if(value != "null"){
        // Tüm departmanları dolaş 
        departments.map((departments) =>{
            // ve seçilen departmanla eşit olanı bul
            if(departments.name == value){
                // Eğer içinde eski bir değer kalmışsa hepsini temizle
                if(positionSelectElement.children.length > 0){
                    while(positionSelectElement.children.length > 1){
                        positionSelectElement.lastChild.remove();
                    }
                }
                document.getElementById("default-select-department").textContent = "";
                // Sorna seçilen departmanın pozisyonlarını listeye aktar
                departments.position.map((position) =>{
                    positionSelectElement.insertAdjacentHTML("beforeend", `<option value="${position.position}">${position.position}</option>`)
                })
            }
        });
    }
    });
    // Erkek kadın seçimine göre preview e resim aktarma
    let checkboxMale = document.getElementById("add-male");
    let checkboxFlame = document.getElementById("add-flame");
    let contentMale = document.getElementById("add-male-content");
    let contentFlame = document.getElementById("add-flame-content");
    // Eskiden kalan checked ve reflesh iconunu temizle
    checkboxMale.checked = false;
    checkboxFlame.checked = false;
    if(contentMale.lastChild.nodeName == "I") contentMale.lastChild.remove();
    if(contentFlame.lastChild.nodeName == "I") contentFlame.lastChild.remove();
    checkboxMale.addEventListener("click", () =>{

    // Eğer male checkbox işaretlenmiş ise
    if(checkboxMale.checked == true) {
        
        // Diğer checkbox 'ı false yap, flame de reflesh iconu varsa temizle
        checkboxFlame.checked = false;
        if(contentFlame.lastChild.nodeName == "I") contentFlame.lastChild.remove();
        // preview e random resim aktar
        // 1 ila 11 arasından random sayı oluştur
        let randomNumber = Math.ceil(Math.random() * 11);
        let previewPersonImage = document.getElementById("preview-person-image");
        let previewImageSrc = `assets/img/male-person-${randomNumber}.png`;
        previewPersonImage.setAttribute("src",previewImageSrc);
        if(contentMale.children.length <= 2){
            contentMale.insertAdjacentHTML("beforeend",`<i class="fa-solid fa-arrows-rotate" alt="test" onclick="maleFlameReflesh(true)"></i>`)
        }
    }
    else {
        if(contentMale.lastChild.nodeName == "I") contentMale.lastChild.remove();
        document.getElementById("preview-person-image").setAttribute("src",`assets/img/person-null.png`)
    }
    });
    checkboxFlame.addEventListener("click", () =>{

    // Eğer male checkbox işaretlenmiş ise
    if(checkboxFlame.checked == true){

        // Diğer checkbox 'ı false yap, male de reflesh iconu varsa temizle
        checkboxMale.checked = false;
        if(contentMale.lastChild.nodeName == "I") contentMale.lastChild.remove();
        // preview e random resim aktar
        // 1 ila 11 arasından random sayı oluştur
        let randomNumber = Math.ceil(Math.random() * 11);
        let previewPersonImage = document.getElementById("preview-person-image");
        let previewImageSrc = `assets/img/flame-person-${randomNumber}.png`;
        previewPersonImage.setAttribute("src",previewImageSrc);
        if(contentFlame.children.length <= 2){
            contentFlame.insertAdjacentHTML("beforeend",`<i class="fa-solid fa-arrows-rotate" onclick="maleFlameReflesh(false)"></i>`)
        }
    }
    else {
        if(contentFlame.lastChild.nodeName == "I") contentFlame.lastChild.remove();
        document.getElementById("preview-person-image").setAttribute("src",`assets/img/person-null.png`)

    }
    });
});

////////////////// Filter Content /////////////////
// Search employee button
document.getElementById("search-emp-button").addEventListener("click", () =>{
    // Veriables
    let inputName = document.getElementById("search-emp-name");
    let inputMail = document.getElementById("search-emp-email");
    let employeResult;
    // Buttona a her tıklandığında 2500 ms butonu pasifleştir (ard arada tıklanmaması için);
    timeOut2500FilterButton(document.getElementById("search-emp-button"));

    // Çalışanları name ve  mail değerine göre ara 
    function searchEmployee(name = String, mail = String){
        if(name != "false" && mail != "false"){
            employeeArray.map(employee =>{
                if((employee.name).toLowerCase() == name.toLowerCase()) employeResult = employee;
                else if((employee.mail).toLowerCase() == mail.toLowerCase()) employeResult = employee;
            });
        }
        else if(name == "false" && mail != "false"){
            employeeArray.map(employee =>{
                if((employee.mail).toLowerCase() == mail.toLowerCase()) employeResult = employee;
            });
        }
        else if(name != "false" && mail == "false"){
            employeeArray.map(employee =>{
                if((employee.name).toLowerCase() == name.toLowerCase()) employeResult = employee;
            });
        }
    }
 
    // Name ve mail inputlarının içeriğin kontrol et ve ara
    if(inputName.value != "" || inputMail.value != ""){
        if(inputName.value.length > 0 && inputMail.value.length > 0){
            searchEmployee(inputName.value,inputMail.value);
        }
        else if(inputName.value.length > 0 && inputMail.value == ""){
            searchEmployee(inputName.value,"false");
        }
        else if(inputName.value.length == "" && inputMail.value.length > 0){
            searchEmployee("false",inputMail.value);
        }

        if(employeResult == undefined || employeResult == ""){
            if(!filterEmployees.getAttribute("class").includes("not-founds",0)){
                if(filterEmployees.children.length < 1){
                    warningErrorCall("warning-message-search-emp","No employee found for the search criteria.",false);
                    notFoundCall();
                    callFilters("Search for employees");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
                else {
                    warningErrorCall("warning-message-search-emp","No employee found for the search criteria.",false);
                    clearFilterContent();
                    notFoundCall();
                    callFilters("Search for employees");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
            }
            else warningErrorCall("warning-message-search-emp","No employee found for the search criteria.",false);
            
           }
           else {
                // Tüm kontrollerden sonra çalışanı bulur ise
                warningErrorCall("warning-message-search-emp","Successful. The employee is displayed.",true);
                notFoundRemove();
                clearFilterContent();
                inputName.value = "";
                inputMail.value = "";
                callFilters("Search for employees");
                setTimeout(() => filterHeader.children[0].click(), 500);
                filterEmployees.classList.add("search-employe-result");

                // Eşleşen personeli filter content in içine aktar;
                employeeArray.map((person) => {
                    if(person.id == employeResult.id){
                        // Personel kartı
                        let addPersonCard = `
                        <div class="person-card">
                            <div class="person-card-header"><img src="assets/img/${person.imageName}" alt="person-image"></div>
                            <div class="person-card-body">
                                <div class="header">
                                    <span class="name">${person.name}</span>
                                    <span class="job">${person.positionName()}</span>
                                </div>
                                <div class="footer">
                                    <span class="age"><strong>Age : </strong>${person.age()}</span>
                                    <span class="option-time"><strong>Operation Time : </strong>${person.optionTime()} Years</span>
                                    <span class="achievement-score"><strong>Achievement Score : </strong> ${person.score} / 10</span>
                                    <span class="mail"><strong>Mail : </strong>${person.mail}</span>
                                </div>
                            </div>
                        </div>
                        `;
                        filterEmployees.insertAdjacentHTML("beforeend",addPersonCard);
                        employeResult = "";
                    }
                });         
           }
    }
    else {
        warningErrorCall("warning-message-search-emp","Please fill in at least one field.",false);
    }

});
// Filter / Score filter button
document.getElementById("filter-score-button").addEventListener("click", () =>{
    let filterResultEmployee = [];
    let inputScoreLittle = document.getElementById("filter-score-little");
    let inputScoreBig = document.getElementById("filter-score-big");
    let inputOptionTimeLitte = document.getElementById("filter-option-time-little");
    let inputOptionTimeBig = document.getElementById("filter-option-time-big");
    // Buttona a her tıklandığında 2500 ms butonu pasifleştir (ard arada tıklanmaması için);
    timeOut2500FilterButton(document.getElementById("filter-score-button"));
    // Çalışanları skor puanına göre ara
    function filterScore(little = String, big = String){
        if(little != "false" && big != "false"){
            employeeArray.map(employee =>{
               if(employee.score < little && employee.score > big) filterResultEmployee.push(employee);
            });
        }
        else if(little == "false" && big != "false"){
            employeeArray.map(employee =>{
                if(employee.score > big) filterResultEmployee.push(employee);
            });
        }
        else if(little != "false" && big == "false"){
            employeeArray.map(employee =>{
                if(employee.score < little) filterResultEmployee.push(employee);
            });
        }
    }
    // Score inputlarının içeriğini kontrol et ve ara
    if(inputScoreLittle.value != "" || inputScoreBig.value != ""){

        if(inputScoreLittle.value.length > 0 && inputScoreBig.value.length > 0){
            filterScore(inputScoreLittle.value,inputScoreBig.value);
        }
        else if(inputScoreLittle.value.length > 0 && inputScoreBig.value == ""){
            filterScore(inputScoreLittle.value,"false");
        }
        else if(inputScoreLittle.value.length == "" && inputScoreBig.value.length > 0){
            filterScore("false",inputScoreBig.value);
        }

        if(filterResultEmployee == undefined || filterResultEmployee == ""){
            if(!filterEmployees.getAttribute("class").includes("not-founds",0)){
                if(filterEmployees.children.length < 1){
                    warningErrorCall("warning-message-filter-score","No employee found for the search criteria.",false);
                    notFoundCall();
                    callFilters("Filter by score");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
                else {
                    warningErrorCall("warning-message-filter-score","No employee found for the search criteria.",false);
                    clearFilterContent();
                    notFoundCall();
                    callFilters("Filter by score");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
            }
            else warningErrorCall("warning-message-filter-score","No employee found for the search criteria.",false);
           }
           else {
                // Eğer bulundu ise
                if(filterResultEmployee.length > 0){
                    //Listelemeden önce temizle
                    warningErrorCall("warning-message-filter-score","Successful. The employee is displayed.",true);
                    notFoundRemove();
                    clearFilterContent();
                    inputScoreLittle.value = "";
                    inputScoreBig.value = "";
                    inputOptionTimeBig.value = "";
                    inputOptionTimeLitte.value = "";
                    callFilters("Filter by score");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                    filterEmployees.classList.add("filter-option-score");
                    // Bulunan çalışanları filter content in içinde listele.
                    filterEmployees.innerHTML = "";
                    // Filtreleme sonucu kaç çalışan bulduğunu göster.
                    let allListWacth = `<span class="all-employees-view"><i class="fa-solid fa-street-view"></i>We found <b class="text-focus-criteria">${filterResultEmployee.length}</b> employees matching your search criteria.</span>`;
                    filterEmployees.insertAdjacentHTML("beforeend",allListWacth);

                    filterResultEmployee.map((employee) =>{

                        let personCard = `
                        <div class="person-card-horizontal">
                            <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                            <div class="person-card-horizontal-content">
                                <div class="person-card-horizontal-content-header">
                                    <div class="name-job">
                                        <h3>${employee.name}</h3>
                                        <span>${employee.positionName()}</span>
                                    </div> 
                                </div>
                                <div class="person-card-horizontal-content-desc">
                                    <span><strong>Age : </strong>${employee.age()}</span>
                                    <span><strong>Operation Time : </strong>${employee.optionTime()}</span>
                                    <span><strong>Achievement Score : </strong><span class="text-focus">${employee.score}</span></span>
                                    <span><strong>Mail : </strong>${employee.mail}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    filterEmployees.insertAdjacentHTML("beforeend",personCard);
                    });
                }
           }
           
           
    }
    else warningErrorCall("warning-message-filter-score","Please fill in at least one field.",false);

});
// Filter / Operation Time button
document.getElementById("filter-option-time-button").addEventListener("click", () =>{
    let filterResultEmployee = [];
    let inputScoreLittle = document.getElementById("filter-score-little");
    let inputScoreBig = document.getElementById("filter-score-big");
    let inputOptionTimeLitte = document.getElementById("filter-option-time-little");
    let inputOptionTimeBig = document.getElementById("filter-option-time-big");
    // Buttona a her tıklandığında 2500 ms butonu pasifleştir (ard arada tıklanmaması için);
    timeOut2500FilterButton(document.getElementById("filter-option-time-button"));
    // Çalışanları çalışma zamanına göre ara
    function filterOptionTime(little = String, big = String){
        if(little != "false" && big != "false"){
            employeeArray.map(employee =>{
               if(employee.optionTime() < little && employee.optionTime() > big) filterResultEmployee.push(employee);
            });
        }
        else if(little == "false" && big != "false"){
            employeeArray.map(employee =>{
                if(employee.optionTime() > big) filterResultEmployee.push(employee);
            });
        }
        else if(little != "false" && big == "false"){
            employeeArray.map(employee =>{
                if(employee.optionTime() < little) filterResultEmployee.push(employee);
            });
        }
    }

    // Operation Time inputlarının içeriğini kontrol et ve ara
    if(inputOptionTimeLitte.value != "" || inputOptionTimeBig.value != ""){

        if(inputOptionTimeLitte.value.length > 0 && inputOptionTimeBig.value.length > 0){
            filterOptionTime(inputOptionTimeLitte.value,inputOptionTimeBig.value);
        }
        else if(inputOptionTimeLitte.value.length > 0 && inputOptionTimeBig.value == ""){
            filterOptionTime(inputOptionTimeLitte.value,"false");
        }
        else if(inputOptionTimeLitte.value.length == "" && inputOptionTimeBig.value.length > 0){
            filterOptionTime("false",inputOptionTimeBig.value);
        }

        if(filterResultEmployee == undefined || filterResultEmployee == ""){
            if(!filterEmployees.getAttribute("class").includes("not-founds",0)){
                if(filterEmployees.children.length < 1){
                    warningErrorCall("warning-message-option-time","No employee found for the search criteria.",false);
                    notFoundCall();
                    callFilters("Filter by Operation Time");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
                else {
                    warningErrorCall("warning-message-option-time","No employee found for the search criteria.",false);
                    clearFilterContent();
                    notFoundCall();
                    callFilters("Filter by Operation Time");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
            }
            else warningErrorCall("warning-message-option-time","No employee found for the search criteria.",false);
           }
           else {
                // Eğer bulundu ise
                if(filterResultEmployee.length > 0){
                    //Listelemeden önce temizle
                    warningErrorCall("warning-message-option-time","Successful. The employee is displayed.",true);
                    notFoundRemove();
                    clearFilterContent();
                    inputScoreLittle.value = "";
                    inputScoreBig.value = "";
                    inputOptionTimeBig.value = "";
                    inputOptionTimeLitte.value = "";
                    callFilters("Filter by Operation Time");
                    setTimeout(() => filterHeader.children[0].click(), 500);
                    filterEmployees.classList.add("filter-option-score");
                    // Filtreleme sonucu kaç çalışan bulduğunu göster.
                    let allListWacth = `<span class="all-employees-view"><i class="fa-solid fa-street-view"></i>We found <b class="text-focus-criteria">${filterResultEmployee.length}</b> employees matching your search criteria.</span>`;
                    filterEmployees.insertAdjacentHTML("beforeend",allListWacth);
                    // Bulunan çalışanları filter content in içinde listele.
                    filterResultEmployee.map((employee) =>{

                        let personCard = `
                        <div class="person-card-horizontal">
                            <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                            <div class="person-card-horizontal-content">
                                <div class="person-card-horizontal-content-header">
                                    <div class="name-job">
                                        <h3>${employee.name}</h3>
                                        <span>${employee.positionName()}</span>
                                    </div> 
                                </div>
                                <div class="person-card-horizontal-content-desc">
                                    <span><strong>Age : </strong>${employee.age()}</span>
                                    <span><strong>Operation Time : </strong><span class="text-focus">${employee.optionTime()}</span></span>
                                    <span><strong>Achievement Score : </strong>${employee.score}</span>
                                    <span><strong>Mail : </strong>${employee.mail}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    filterEmployees.insertAdjacentHTML("beforeend",personCard);
        
                    });
                }
           }
           
           
    }
    else warningErrorCall("warning-message-filter-score","Please fill in at least one field.",false);
});
// Edit empoyee in all functions
function callEditFunctions(){

    document.getElementById("filter-edit-search-button").addEventListener("click", () => {
    // Veriables
    let inputName = document.getElementById("filter-edit-name");
    let inputMail = document.getElementById("filter-edit-mail");
    let employeResult;
    // Buttona a her tıklandığında 2500 ms butonu pasifleştir (ard arada tıklanmaması için);
    timeOut2500FilterButton(document.getElementById("filter-edit-search-button"));    
    // Çalışanları name ve  mail değerine göre ara 
    function searchEmployee(name = String, mail = String){
        if(name != "false" && mail != "false"){
            employeeArray.map(employee =>{
                if((employee.name).toLowerCase() == name.toLowerCase()) employeResult = employee;
                else if((employee.mail).toLowerCase() == mail.toLowerCase()) employeResult = employee;
            });
        }
        else if(name == "false" && mail != "false"){
            employeeArray.map(employee =>{
                if((employee.mail).toLowerCase() == mail.toLowerCase()) employeResult = employee;
            });
        }
        else if(name != "false" && mail == "false"){
            employeeArray.map(employee =>{
                if((employee.name).toLowerCase() == name.toLowerCase()) employeResult = employee;
            });
        }
    }

     // Name ve mail inputlarının içeriğin kontrol et ve ara
     if(inputName.value != "" || inputMail.value != ""){
        if(inputName.value.length > 0 && inputMail.value.length > 0){
            searchEmployee(inputName.value,inputMail.value);
        }
        else if(inputName.value.length > 0 && inputMail.value == ""){
            searchEmployee(inputName.value,"false");
        }
        else if(inputName.value.length == "" && inputMail.value.length > 0){
            searchEmployee("false",inputMail.value);
        }

        if(employeResult == undefined || employeResult == ""){
            if(!filterEmployees.getAttribute("class").includes("not-founds",0)){
                if(filterEmployees.children.length < 1){
                    warningErrorCall("warning-message-edit-search","No employee found for the search criteria.",false);
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
                else {
                    warningErrorCall("warning-message-edit-search","No employee found for the search criteria.",false);
                    setTimeout(() => filterHeader.children[0].click(), 500);
                }
            }
            else warningErrorCall("warning-message-edit-search","No employee found for the search criteria.",false);
            
           }
           else {
                // Tüm kontrollerden sonra çalışanı bulur ise
                warningErrorCall("warning-message-edit-search","Successful. The employee is displayed.",true);
                inputName.value = "";
                inputMail.value = "";

                // Eşleşen personeli filter content in içine aktar;
                employeeArray.map((person) => {
                    if(employeResult.id == person.id){
                        // Bulunan elaman kartını listenin en üstüne ekle
                        let id = person.id;
                        let resultPerson = document.getElementById(id);               
                        
                        // Önce tüm personel kartlarını temizle
                        while(filterEmployees.children.length > 1){
                            filterEmployees.lastElementChild.remove();
                        }   

                        // Bulunan elamanı listenin en üstüne taşı
                        filterEmployees.insertAdjacentElement("beforeend",resultPerson);
                        resultPerson.classList.add("focus-card");
                        if(resultPerson.getAttribute("class").includes("no-focus-card",0)) resultPerson.classList.remove("no-focus-card");
                        // Tüm çalışanları listele (yenile)
                        employeeArray.map((employee) =>{
                            if(employee.id != person.id){
                                let personCard = `
                                <div class="person-card-horizontal" id="${employee.id}">
                                    <div class="person-card-horizontal-image"><img src="assets/img/${employee.imageName}" alt=""></div>
                                    <div class="person-card-horizontal-content">
                                        <div class="person-card-horizontal-content-header">
                                            <div class="name-job">
                                                <h3>${employee.name}</h3>
                                                <span>${employee.positionName()}</span>
                                            </div> 
                                            <div class="person-edit">
                                                <a onclick="editPerson(${employee.id})" ><i class="fa-solid fa-pen-to-square"></i>Edit</a>
                                            </div>
                                        </div>
                                        <div class="person-card-horizontal-content-desc">
                                            <span><strong>Age : </strong>${employee.age()}</span>
                                            <span><strong>Operation Time : </strong>${employee.optionTime()}</span>
                                            <span><strong>Achievement Score : </strong>${employee.score}</span>
                                            <span><strong>Mail : </strong>${employee.mail}</span>
                                        </div>
                                    </div>
                                </div>
                                `;
                                filterEmployees.insertAdjacentHTML("beforeend",personCard);
                            }  
                        });
                    }
                });
                employeResult = "";     
           }
    }
    else {
        warningErrorCall("warning-message-edit-search","Please fill in at least one field.",false);
    }
    });
    
}
// Add employee button
document.getElementById("add-employee-button").addEventListener("click", ()=>{
    // Veriables
    let inputName = document.getElementById("add-full-name");
    let inputYearBirth = document.getElementById("add-year-birth");
    let inputMail = document.getElementById("add-mail");
    let inputStartJob = document.getElementById("add-start-job");
    let inputScore = document.getElementById("add-score");
    let inputSalary = document.getElementById("add-salary");
    let selectDepartment = document.getElementById("add-departman");
    let selectPosition = document.getElementById("add-position");
    let checkboxMale = document.getElementById("add-male");
    let checkboxFlame = document.getElementById("add-flame");
    let stringChars = '!"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~æß€';
    let NumberChars = '!"#$%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~æß€';
    let stringMail = '!"#$%&\'()*+,-/:;<=>?[\\]^`{|}~æß€';
    let numberSalary = '!"#%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~æß€';
    // Buttona a her tıklandığında 2500 ms butonu pasifleştir (ard arada tıklanmaması için);
    timeOut2500FilterButton(document.getElementById("add-employee-button"));
    // Hatalı değer girildiğinde input un outline nını işaretle.
    function errorInputBorder(input){
        let countError = 0;
        let warningErrorInterval = setInterval(() => {
            if(countError >= 5) clearInterval(warningErrorInterval);
            if(!input.getAttribute("class").includes("warning-error-border",0)) input.classList.add("warning-error-border");
            else input.classList.remove("warning-error-border");
            countError++;
        }, 200);
        input.select();
    }
    // Imput içerik kontrolleri
    // Check name
    if(inputName.value != ""){ 
        let checkChar = false;
        let errorChar = "";
        for(let char of stringChars.split("")){
            if(inputName.value.includes(char,0)) {checkChar = true; errorChar = char; break;}
        }
        if(checkChar == false){
            if(inputName.value.length < 40){
                let check = false;
                employeeArray.map((employee) =>{if(employee.name.toLowerCase() == inputName.value.toLowerCase()) check= true; return;});
                if(check == true) {warningErrorCall("warning-message-add-employee","An employee with this name already exists.",false); inputName.focus(); errorInputBorder(inputName); return; }
            }
            else {warningErrorCall("warning-message-add-employee","The name can be up to 40 characters.",false); inputName.value = ""; inputName.focus(); errorInputBorder(inputName); return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee",`You cannot use the "<b>${errorChar}</b>" character when specifying a name.`,false); inputName.focus(); errorInputBorder(inputName); return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter name.",false); inputName.focus(); errorInputBorder(inputName);  return; }

    // Check year birth
    if(inputYearBirth.value != ""){ 
        let checkChar = false;
        for(let char of NumberChars.split("")){
            if(inputYearBirth.value.includes(char,0)) {checkChar = true; break;}
        }
        if(checkChar == false){
            if(inputYearBirth.value.length == 4){
                if((new Date().getFullYear() - Number(inputYearBirth.value)) < 200){
                    // Eğer bu inputta herşey tamam ise döngüyü devam ettir, bir sonraki kontrole geç.
                }
                else {warningErrorCall("warning-message-add-employee","Age cannot be older than 200 years.",false); inputYearBirth.focus(); errorInputBorder(inputYearBirth);  return;} 
            }
            else {warningErrorCall("warning-message-add-employee","The year of birth can consist of 4 digits.",false); inputYearBirth.focus(); errorInputBorder(inputYearBirth);  return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee","The year of birth can only consist of numbers.",false); inputYearBirth.focus(); errorInputBorder(inputYearBirth);  return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter year birth.",false); inputYearBirth.focus(); errorInputBorder(inputYearBirth);  return;}

    // Check mail
    if(inputMail.value != ""){ 
        let checkChar = false;
        let errorChar = "";
        for(let char of stringMail.split("")){
            if(inputMail.value.includes(char,0)) {checkChar = true; errorChar = char; break;}
        }
        if(checkChar == false){
            if(inputMail.value.length < 40){
                if(inputMail.value.includes("@",0)){
                    // Eğer bu inputta herşey tamam ise döngüyü devam ettir, bir sonraki kontrole geç.
                }
                else {warningErrorCall("warning-message-add-employee","The postal address must contain the @ sign.",false); inputMail.focus(); errorInputBorder(inputMail);  return;} 
            }
            else {warningErrorCall("warning-message-add-employee","The postal address cannot exceed 40 characters.",false); inputMail.focus(); errorInputBorder(inputMail);  return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee",`You cannot use the " <b">${errorChar}</b> " character in your e-mail address.`,false); inputMail.focus(); errorInputBorder(inputMail);  return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter mail.",false); inputMail.focus(); errorInputBorder(inputMail);  return;}

    // Check start job
    if(inputStartJob.value != ""){ 
        let checkChar = false;
        for(let char of NumberChars.split("")){
            if(inputStartJob.value.includes(char,0)) {checkChar = true; break;}
        }
        if(checkChar == false){
            if(inputStartJob.value.length == 4){
                if(Number(inputStartJob.value) <= new Date().getFullYear()  ){
                    // Eğer bu inputta herşey tamam ise döngüyü devam ettir, bir sonraki kontrole geç.
                }
                else {warningErrorCall("warning-message-add-employee","The entered value cannot be future time.",false); inputStartJob.focus(); errorInputBorder(inputStartJob);  return;} 
            }
            else {warningErrorCall("warning-message-add-employee","The starting year must consist of 4 digits.",false); inputStartJob.focus(); errorInputBorder(inputStartJob);  return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee","The start-up year can only consist of numbers.",false); inputStartJob.focus(); errorInputBorder(inputStartJob);   return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter start job.",false); inputStartJob.focus(); errorInputBorder(inputStartJob);  return;}

    // Check score
    if(inputScore.value != ""){ 
        let checkChar = false;
        for(let char of NumberChars.split("")){
            if(inputScore.value.includes(char,0)) {checkChar = true; break;}
        }
        if(checkChar == false){
            if(Number(inputScore.value) <= 10 && Number(inputScore.value) >= 0){
                    // Eğer bu inputta herşey tamam ise döngüyü devam ettir, bir sonraki kontrole geç.
            }
            else {warningErrorCall("warning-message-add-employee","The score can take a value from 0 to 10.",false); inputScore.focus(); errorInputBorder(inputScore);  return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee","The score must consist of numbers only.",false); inputScore.focus(); errorInputBorder(inputScore);  return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter score.",false); inputScore.focus(); errorInputBorder(inputScore);  return;}

    // Check salary
    if(inputSalary.value != ""){ 
        let checkChar = false;
        for(let char of numberSalary.split("")){
            if(inputSalary.value.includes(char,0)) {checkChar = true; break;}
        }
        if(checkChar == false){
            if(!inputSalary.value.includes("$",0)){
                if(Number(inputSalary.value) <= 1000000){
                    // Eğer bu inputta herşey tamam ise döngüyü devam ettir, bir sonraki kontrole geç.
                }
                else {warningErrorCall("warning-message-add-employee","You entered too many values. Please enter the monthly salary value.",false); inputSalary.focus(); errorInputBorder(inputSalary);  return;}   
            }
            else {warningErrorCall("warning-message-add-employee","You cannot use a $ sign because the salary type is already in dollars.",false); inputSalary.focus(); errorInputBorder(inputSalary);  return;}
        }
        // Eğer girilen karakter uyuşmuyor ise
        else {warningErrorCall("warning-message-add-employee","Salary can only consist of numbers.",false); inputSalary.focus(); errorInputBorder(inputSalary);  return;} 
    }
    else {warningErrorCall("warning-message-add-employee","Please enter salary.",false); inputSalary.focus(); errorInputBorder(inputSalary);  return;}

    // Check department
    if(selectDepartment.value != "null"){ 
        // İnput kontrol edildi ve uygun ise döngüye devam et
    }
    else {warningErrorCall("warning-message-add-employee","Please select department.",false);  return;}

    // Check position
    if(selectPosition.value != "null"){ 
        // İnput kontrol edildi ve uygun ise döngüye devam et
    }
    else {warningErrorCall("warning-message-add-employee","Please select position.",false);  return;}

    // Check gender (Male-Flame)
    if(checkboxMale.checked){
        // İnput kontrol edildi ve uygun ise döngüye devam et
    }
    else if(checkboxFlame.checked){
        // İnput kontrol edildi ve uygun ise döngüye devam et
    }
    else {warningErrorCall("warning-message-add-employee","Please select gender.",false);  return;}

    /////////// Personel kartını oluşturma /////////
    //seçilen resim ismini bulma
    let srcImageName = document.querySelector(".filter-content img").getAttribute("src").split("/");
    srcImageName = srcImageName[srcImageName.length-1]
    // department id bulma
    let newEmployeDepartmentId = departments.filter((department) => {
        if(department.name == selectDepartment.value) return department;
    });
    // position id bulma
    let newEmployeePositionId = newEmployeDepartmentId[0].position.filter((position) =>{
        if(position.position == selectPosition.value) return position
    });

    newEmployeePositionId = Number(newEmployeePositionId[0].id);
    newEmployeDepartmentId = Number(newEmployeDepartmentId[0].id);

    // Employee objesi oluştur ve bunu employee array 'ın içine aktar
    let newEmployee = new employee(
        employeeArray.length,
        inputName.value,
        Number(inputYearBirth.value),
        srcImageName,
        newEmployeDepartmentId,
        newEmployeePositionId,
        Number(inputSalary.value),
        Number(inputScore.value),
        Number(inputStartJob.value),
        inputMail.value);
    employeeArray.push(newEmployee);
    // Çalışanlar listesini yenile
    employeeList();

    // Eskiden kalan tüm imputların içini temizle
    for(let input of document.getElementById("for-add-form").querySelectorAll("input")){ input.value = "";}
    // Eskiden kalan checkbox ları temizle
    if(checkboxFlame.checked == true) checkboxFlame.click();
    if(checkboxMale.checked == true) checkboxMale.click();
    // Selected department position temizle
    selectDepartment.value = null;
    selectPosition.value = null;
    // Preview person kartını temizle
    filterEmployees.innerHTML = "";
    let addPersonCard = `
        <div class="person-card">
            <div class="person-card-header"><img src="assets/img/person-null.png" alt="person-image" id="preview-person-image"></div>
            <div class="person-card-body">
                <div class="header">
                    <span class="name" id="add-preview-name"></span>
                    <span class="job" id="add-preview-position"></span>
                </div>
                <div class="footer">
                    <span class="age" id="add-preview-year-birth"><strong>Age : </strong></span>
                    <span class="option-time" id="add-preview-start-job"><strong>Operation Time : </strong></span>
                    <span class="achievement-score" id="add-preview-score"><strong>Achievement Score : </strong></span>
                    <span class="mail" id="add-preview-mail"><strong>Mail : </strong></span>
                </div>
            </div>
        </div>
    `;
    filterEmployees.insertAdjacentHTML("beforeend",addPersonCard);
    // Başarılı mesajı göster
    warningErrorCall("warning-message-add-employee","The operation is successful. Please wait redirecting.",true);
    // Kartın eklendiği departmana yönlendir
    setTimeout(() => {
        if(newEmployeDepartmentId == 0){
            if(document.querySelectorAll(".nav-item")[2].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[2].children[0].click();
        }
        else if(newEmployeDepartmentId == 1){
            if(document.querySelectorAll(".nav-item")[3].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[3].children[0].click();
        }
        else if(newEmployeDepartmentId == 2){
            if(document.querySelectorAll(".nav-item")[4].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[4].children[0].click();
        }
        else if(newEmployeDepartmentId == 3){
            if(document.querySelectorAll(".nav-item")[5].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[5].children[0].click();
        }
        else if(newEmployeDepartmentId == 4){
            if(document.querySelectorAll(".nav-item")[6].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[6].children[0].click();
        }
        else if(newEmployeDepartmentId == 5){
            if(document.querySelectorAll(".nav-item")[7].children[0].nodeName == "A") document.querySelectorAll(".nav-item")[7].children[0].click();
        }
    }, 2500);  
});

//////////// Filter Headers İnputs Events "Enter" ///////////
let addButtonEmployee = document.getElementById("add-employee-button");
document.getElementById("add-full-name").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-year-birth").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-mail").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-start-job").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-score").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-salary").addEventListener("keydown", (event) =>{ if(event.key == "Enter"){addButtonEmployee.click();}});
document.getElementById("add-male").addEventListener("keydown", (event) =>{if(event.key == "Enter"){event.target.click();}});
document.getElementById("add-flame").addEventListener("keydown", (event) =>{if(event.key == "Enter"){event.target.click();}});

////////////////// onClick Functions/////////////////
// edit employees
function editPerson(personId){
    
    //Yıklandıktan sonra değiştirilecek bölümlerin başına edit işareti koy
    for(let person of filterEmployees.children){        
        let personEditButton = person.children[1].children[0].children[1];  
        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){
            //Tıklanan personel elementini bulduk.
            // Edit butonunu Save ve Cancel butonu ekle
            personEditButton.classList.add("save");
            personEditButton.innerHTML = `
            <button type="button" onclick="editSave(${person.id})" ><i class="fa-solid fa-check"></i>Save</button>
            <button type="button" onclick="editCancel(${person.id})" ><i class="fa-solid fa-xmark"></i>Cancel</button>
            `;
            // Edit tıklandığında düzenlenebilecek yerleri göster.(EditIcon)
            let indexChild = 0;
            for(let child of person.children[1].children[1].children){
                
                let addEditIcon = `<a onclick="personDescEdit(${person.id},${indexChild})"><i class="edit fa-solid fa-pen-to-square"></i></a>`;
                child.insertAdjacentHTML("afterbegin", addEditIcon);
                indexChild++;
            }
            
        }
        else{
            // (no-focus-card) Bir card editlendiğinde diğer cardları kapat
            if(person.getAttribute("class").includes("person-card-horizontal",0)){
            person.classList.add("no-focus-card");
            } 
        }
    }
}
function personDescEdit(personId,indexChild){

    //Veriables
    let personElement = document.getElementById(personId);
    let personDesc = personElement.children[1].children[1].children[indexChild];
    let descName =  personDesc.children[1].textContent;
    oldValue = personDesc.textContent.split(":")[1];
    // Tıklanan desc e göre değerleri ayalar
    let addDesc = "";
    if(indexChild == 0){
        addDesc = `
        <a onclick="personDescEdit(${personId},${indexChild})" class="passive"><i class="edit fa-solid fa-pen-to-square"></i></a>
        <strong>${descName}</strong>
        <input type="text" style="width: 160px" placeholder="Year of birth" id="${indexChild}">
        `;
    }
    else if(indexChild == 1){
        addDesc = `
        <a onclick="personDescEdit(${personId},${indexChild})" class="passive"><i class="edit fa-solid fa-pen-to-square"></i></a>
        <strong>${descName}</strong>
        <input type="text" style="width: 160px" placeholder="Year of employment" id="${indexChild}">
        `;
    }
    else if(indexChild == 2){
        addDesc = `
        <a onclick="personDescEdit(${personId},${indexChild})" class="passive"><i class="edit fa-solid fa-pen-to-square"></i></a>
        <strong>${descName}</strong>
        <input type="text" style="width: 160px" placeholder="(Max. 10 Score)" id="${indexChild}">
        `;
    }
    else if(indexChild == 3){
        addDesc = `
        <a onclick="personDescEdit(${personId},${indexChild})" class="passive"><i class="edit fa-solid fa-pen-to-square"></i></a>
        <strong>${descName}</strong>
        <input type="text" style="width: 200px" placeholder="sample@mail.com" id="${indexChild}">
        `;
    }

    //console.log(personElement.children[1].children[1].children[indexChild].textContent);
    // Önce içini temizle
    personElement.children[1].children[1].children[indexChild].innerHTML = "";

    // Tıklanan desc 'e input ekle
    personElement.children[1].children[1].children[indexChild].insertAdjacentHTML("beforeend",addDesc);
    // Aktif olan index hariç hepsini pasife çevir (opacity, pointer-event-none)
    for(let i = 0; i < personElement.children[1].children[1].children.length ; i++){
        if(i != indexChild) personElement.children[1].children[1].children[i].classList.add("passive");
    }


 

}
function editSave(personId){
    let inputCheck = false;
    // Kullanıcı save buttonuan tıklamadan önce desclerden biri değiştiril miş mi kontrol et
    for(let person of filterEmployees.children){
        
        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){
            
            // desc elemanlarından gezin
            for(let child of person.children[1].children[1].children){
                // desc elemanlarının childlarında gezin
                for(let childElement of child.children){
                    if(childElement.nodeName == "INPUT") inputCheck = true;
                }
            }
        }
    }

    // Eğer desclerden biri değiştirilmiş ise işlemleri uygula
    if(inputCheck == true){

        for(let person of filterEmployees.children){
        
            if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){
                
                // desc elemanlarından gezin
                for(let child of person.children[1].children[1].children){
                    // desc elemanlarının childlarında gezin
                    for(let childElement of child.children){
                        // eğer desc childlarından birinde input var ise
                        if(childElement.nodeName == "INPUT") {
                            // EDIT AGE //
                            if(childElement.getAttribute("id") == 0){
                                // Eğer input boş ise hata mesajı, border red, input focus
                                if(childElement.value == "") {
                                    if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                    warningErrorCall("warning-message-edit-search","Please fill in the blank field.",false);
                                    childElement.focus();
                                }
                                // Eğer input içindeli değer hatalı ise
                                else if(childElement.value < 1850 || childElement.value > new Date().getFullYear() || childElement.value.length < 4) {
                                    warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : 1997",false);
                                    if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                    childElement.focus();
                                }
                                // String kontrol
                                else{
                                    // Input un içine girilen değerde string katakterler var mı ? Kontrol et
                                    let check = false;
                                    const stringAll =  "#$%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
                                    stringAll.split("").filter((char) => {
                                        if(childElement.value.includes(char,0)) return check= true;
                                    });
                                    // String değer var ise hata
                                    if(check){
                                        warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : 1997",false);
                                        if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                        childElement.focus();
                                    }
                                    // Tüm şartlar uygun ise değeri değiştir.
                                    else{
                                        employeeArray.map((employee) =>{
                                            if(employee.id == personId){
    
                                                if(employee.yearBirth != Number(childElement.value))
                                                {
                                                // personel tablosunda veriyi değiştir
                                                employee.yearBirth = Number(childElement.value);
                                                // input, class, editIcons erşeyi temizle
                                                editCancel(personId); 
                                                // Yeni oluşturulan değeri html desc içine aktar;
                                                let newContent = `<strong>Age :<strong>`;
                                                let newContentValue = `<b class="new-edit">${employee.age()}</b>`;
                                                child.innerHTML = "";
                                                child.insertAdjacentHTML("beforeend",newContent);
                                                child.insertAdjacentHTML("beforeend",newContentValue);
                                                // Başarılı mesajı göster
                                                warningErrorCall("warning-message-edit-search",`The operation is successful. Age changed to ${employee.age()}.`,true);
                                                }
                                                else {
                                                    warningErrorCall("warning-message-edit-search",`The age is already ${employee.age()}.`,false);
                                                    childElement.focus();
                                                };
                                               
                                            }
                                        });
                                    }
                                }
                            }
                            // EDIT Operation Time //
                            else if(childElement.getAttribute("id") == 1){
                              // Eğer input boş ise hata mesajı, border red, input focus
                              if(childElement.value == "") {
                                if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                warningErrorCall("warning-message-edit-search","Please fill in the blank field.",false);
                                childElement.focus();
                                }
                                // Eğer input içindeli değer hatalı ise
                                else if(childElement.value < 1850 || childElement.value > new Date().getFullYear() || childElement.value.length < 4) {
                                    warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : 2020",false);
                                    if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                    childElement.focus();
                                }
                                // String kontrol
                                else{
                                    // Input un içine girilen değerde string katakterler var mı ? Kontrol et
                                    let check = false;
                                    const stringAll =  "#$%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
                                    stringAll.split("").filter((char) => {
                                        if(childElement.value.includes(char,0)) return check= true;
                                    });
                                    // String değer var ise hata
                                    if(check){
                                        warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : 2020",false);
                                        if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                        childElement.focus();
                                    }
                                    // Tüm şartlar uygun ise değeri değiştir.
                                    else{
                                        employeeArray.map((employee) =>{
                                            if(employee.id == personId){

                                                if(employee.startJob != Number(childElement.value))
                                                {
                                                // personel tablosunda veriyi değiştir
                                                employee.startJob = Number(childElement.value);
                                                // input, class, editIcons erşeyi temizle
                                                editCancel(personId); 
                                                // Yeni oluşturulan değeri html desc içine aktar;
                                                let newContent = `<strong>Operation Time :<strong>`;
                                                let newContentValue = `<b class="new-edit">${employee.optionTime()}</b>`;
                                                child.innerHTML = "";
                                                child.insertAdjacentHTML("beforeend",newContent);
                                                child.insertAdjacentHTML("beforeend",newContentValue);
                                                // Başarılı mesajı göster
                                                warningErrorCall("warning-message-edit-search",`The operation is successful. Operation Time changed to ${employee.optionTime()}.`,true);
                                                }
                                                else {
                                                    warningErrorCall("warning-message-edit-search",`The Operation Time is already ${employee.optionTime()}.`,false);
                                                    childElement.focus();
                                                };
                                            
                                            }
                                        });
                                    }
                                }
                            }
                            // EDIT SCORE //
                            else if(childElement.getAttribute("id") == 2){
                                 // Eğer input boş ise hata mesajı, border red, input focus
                              if(childElement.value == "") {
                                if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                warningErrorCall("warning-message-edit-search","Please fill in the blank field.",false);
                                childElement.focus();
                                }
                                // Eğer input içindeli değer hatalı ise
                                else if(childElement.value < 0 || childElement.value > 10) {
                                    warningErrorCall("warning-message-edit-search","Value between 1 and 10 only.",false);
                                    if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                    childElement.focus();
                                }
                                // String kontrol
                                else{
                                    // Input un içine girilen değerde string katakterler var mı ? Kontrol et
                                    let check = false;
                                    const stringAll =  "#$%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
                                    stringAll.split("").filter((char) => {
                                        if(childElement.value.includes(char,0)) return check= true;
                                    });
                                    // String değer var ise hata
                                    if(check){
                                        warningErrorCall("warning-message-edit-search","Value between 1 and 10 only.",false);
                                        if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 160px ; border: 1px solid red;";
                                        childElement.focus();
                                    }
                                    // Tüm şartlar uygun ise değeri değiştir.
                                    else{
                                        employeeArray.map((employee) =>{
                                            if(employee.id == personId){

                                                if(employee.score != Number(childElement.value))
                                                {
                                                // personel tablosunda veriyi değiştir
                                                employee.score = Number(childElement.value);
                                                // input, class, editIcons erşeyi temizle
                                                editCancel(personId); 
                                                // Yeni oluşturulan değeri html desc içine aktar;
                                                let newContent = `<strong>Achievement Score :<strong>`;
                                                let newContentValue = `<b class="new-edit">${employee.score}</b>`;
                                                child.innerHTML = "";
                                                child.insertAdjacentHTML("beforeend",newContent);
                                                child.insertAdjacentHTML("beforeend",newContentValue);
                                                // Başarılı mesajı göster
                                                warningErrorCall("warning-message-edit-search",`The operation is successful. Achievement score changed to ${employee.score}.`,true);
                                                }
                                                else {
                                                    warningErrorCall("warning-message-edit-search",`The achievement score is already ${employee.score}.`,false);
                                                    childElement.focus();
                                                };
                                            
                                            }
                                        });
                                    }
                                }
                            }
                            // EDIT MAIL //
                            else if(childElement.getAttribute("id") == 3){
                               // Eğer input boş ise hata mesajı, border red, input focus
                               if(childElement.value == "") {
                                if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 200px ; border: 1px solid red;";
                                warningErrorCall("warning-message-edit-search","Please fill in the blank field.",false);
                                childElement.focus();
                                }
                                // Eğer input içindeli değer hatalı ise
                                else if(childElement.value < 1850 || childElement.value > new Date().getFullYear() || childElement.value.length < 4) {
                                    warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : employee@mail.com",false);
                                    if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 200px ; border: 1px solid red;";
                                    childElement.focus();
                                }
                                // String kontrol
                                else{
                                    // Input un içine girilen değerde string katakterler var mı ? Kontrol et
                                    let check = false;
                                    const stringAll =  "#$%&\'()*+,-/:;<=>?[\\]^`{|}~";
                                    stringAll.split("").filter((char) => {
                                        if(childElement.value.includes(char,0)) return check= true;
                                        else if(!childElement.value.includes("@",1)) return check= true;
                                    });
                                    // String değer var ise hata
                                    if(check){
                                        warningErrorCall("warning-message-edit-search","You entered an incorrect value. Sample : employee@mail.com",false);
                                        if(!childElement.getAttribute("style").includes("boder",0)) childElement.style = "width: 200px ; border: 1px solid red;";
                                        childElement.focus();
                                    }
                                    // Tüm şartlar uygun ise değeri değiştir.
                                    else{
                                        employeeArray.map((employee) =>{
                                            if(employee.id == personId){

                                                if(employee.mail != childElement.value)
                                                {
                                                // personel tablosunda veriyi değiştir
                                                employee.mail = childElement.value;
                                                // input, class, editIcons erşeyi temizle
                                                editCancel(personId);
                                                console.log(child);
                                                // Yeni oluşturulan değeri html desc içine aktar;
                                                let newContent = `<strong>Mail :<strong>`;
                                                let newContentValue = `<b class="new-edit">${employee.mail}</b>`;
                                                child.innerHTML = "";
                                                child.insertAdjacentHTML("beforeend",newContent);
                                                child.insertAdjacentHTML("beforeend",newContentValue);
                                                // Başarılı mesajı göster
                                                warningErrorCall("warning-message-edit-search",`The operation is successful. Mail changed to ${employee.mail}.`,true);
                                                }
                                                else {
                                                    warningErrorCall("warning-message-edit-search",`The mail is already ${employee.mail}.`,false);
                                                    childElement.focus();
                                                };
                                            
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // Eğer desclerden biri değiştirilmemiş ise değiştirilecek değeri seçin hatası göster
    else warningErrorCall("warning-message-edit-search","Please select the value to be changed.",false);
}
function editCancel(personId){
    for(let person of filterEmployees.children){
        let personEditButton = person.children[1].children[0].children[1];
        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){
            
            // edit button save class remove 
            if(personEditButton.getAttribute("class").includes("save",0)) personEditButton.classList.remove("save");
            // save,cancel butonlarının silinip tekrar edit butona çevrilmesi
            personEditButton.innerHTML = `
             <div class="person-edit">
                <button type="button" onclick="editPerson(${personId})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                <button type="button" onclick="deletePerson(${personId})"><i class="fa-sharp fa-solid fa-user-minus"></i></i>Delete</button>
             </div>
            `;
            // Desc edit image ve input varsa temizle ve eski değerleri aktar.
            for(let child of person.children[1].children[1].children){
                // desc elemanlarından passive sınıflarını temizle
                if(child.getAttribute("class") != undefined && child.getAttribute("class").includes("passive",0) == true) child.classList.remove("passive");
                // input ve edit icnlarını sil eski değeri içine aktar
                for(let childElement of child.children){
                    
                    if(childElement.nodeName == "A") childElement.remove();

                    if(childElement.nodeName == "INPUT"){
                        childElement.remove();
                        child.insertAdjacentText("beforeend",oldValue);
                    }
                }
            }
        }
        // diğer personel kartlarının no-focus-card sınıflarını temizle
         if(!person.getAttribute("class").includes("for-filter",0) ){
            if(person.getAttribute("class").includes("no-focus-card",0)){
                person.classList.remove("no-focus-card");
            }
        }
    }   
}
function deletePerson(personId){

    for(let person of filterEmployees.children){

        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){

            let personEditButton = person.children[1].children[0].children[1];
            personEditButton.innerHTML = `
             <div class="person-edit">
             <span>The employee will be permanently deleted, are you sure ?</span>
                <button type="button" onclick="deletePersonYes(${personId})" class="deleteYes"><i class="fa-solid fa-check"></i>Yes</button>
                <button type="button" onclick="deletePersonCancel(${personId})" class="deleteCancel"><i class="fa-solid fa-xmark"></i>Cancel</button>
             </div>
            `;
        }
        // (no-focus-card) Bir card editlendiğinde diğer cardları kapat
        else if(person.getAttribute("class").includes("person-card-horizontal",0)){
        person.classList.add("no-focus-card");
        }
    }
}
function deletePersonYes(personId){
    // Seçilen elemant kartını sil ve listeyi yenile
    for(let person of filterEmployees.children){

        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("id") == personId){

           // Seçilen personeli arraylist den sil ve kalan elamanları tekrar sayfada listele
            employeeArray.map((employee) =>{
                if(employee.id == personId){
                    employeeArray.splice(employeeArray.indexOf(employee),1);
                    employeeList();
                    warningErrorCall("warning-message-edit-search",`The employee named <b>${employee.name}</b> was deleted.`,true);
                }
            });

            // Seçili personel horizantal kartını filtre employeden sil
            person.remove();
            
        }; 
    }
    // (no-focus-card) temizle
    for(let person of filterEmployees.children){

        if(person.getAttribute("class").includes("person-card-horizontal",0) == true && person.getAttribute("class").includes("no-focus-card",0) == true){

            person.classList.remove("no-focus-card");
        }
    }
    // Eğer tüm personeller silinir ise listelenecek eleman kalmadığı için hata mesajı göster.
    if(filterEmployees.children.length <= 1){
        filterEmployees.innerHTML = ""; 
        notFoundCall();  
    }
}
function deletePersonCancel(personId){
    editCancel(personId);
}
// add employes preview call functions
function previewName(){
    // Veriables
    let previewName = document.getElementById("add-preview-name");
    let inputName = document.getElementById("add-full-name");
    
    // Eğer input uzunluğu belirtilen değerden küçükse
    if(inputName.value.length <= 25){
        previewName.textContent = inputName.value;
    }
    // Eğer isim belirtilen karakter sayısından uzun ise sonuna "..." koy ve yazmayı bitir.
    else if(!previewName.textContent.includes("...",previewName.textContent.length-3)) previewName.textContent += "...";
}
function previewYearBirth(){
    // Veriables
    let previewYearBirth = document.getElementById("add-preview-year-birth");
    let inputYearBirth = document.getElementById("add-year-birth");
    
    if(inputYearBirth.value.length == 4){    
        let age = new Date().getFullYear() - Number(inputYearBirth.value);
        let content = `<strong>Age : </strong>${age}`;
        previewYearBirth.innerHTML = "";
        previewYearBirth.insertAdjacentHTML("beforeend",content);
    }
    else {
        let content = `<strong>Age : </strong>`;
        previewYearBirth.innerHTML = "";
        previewYearBirth.insertAdjacentHTML("beforeend",content);
    }
}
function previewMail(){
    // Veriables
    let previewName = document.getElementById("add-preview-mail");
    let inputName = document.getElementById("add-mail");
    
    // Eğer input uzunluğu belirtilen değerden küçükse
    if(inputName.value.length <= 25){
        let content = `<strong>Mail : </strong>${inputName.value}`;
        previewName.innerHTML = "";
        previewName.insertAdjacentHTML("beforeend",content);
    }
    // Eğer isim belirtilen karakter sayısından uzun ise sonuna "..." koy ve yazmayı bitir.
    else if(!previewName.textContent.includes("...",previewName.textContent.length-3)) previewName.textContent += "...";
}
function previewStartJob(){
    // Veriables
    let previewStartJob = document.getElementById("add-preview-start-job");
    let inputStartJob = document.getElementById("add-start-job");
    
    if(inputStartJob.value.length == 4 && Number(inputStartJob.value) <= new Date().getFullYear()){    
        let startJob = new Date().getFullYear() - Number(inputStartJob.value);
        let content = `<strong>Operation Time : </strong>${startJob} Year`;
        previewStartJob.innerHTML = "";
        previewStartJob.insertAdjacentHTML("beforeend",content);
    }
    else {
        let content = `<strong>Operation Time : </strong>`;
        previewStartJob.innerHTML = "";
        previewStartJob.insertAdjacentHTML("beforeend",content);
    }
}
function previewScore(){
    // Veriables
    let previewScore = document.getElementById("add-preview-score");
    let inputScore = document.getElementById("add-score");
    
    if(Number(inputScore.value) <= 10 && Number(inputScore.value) >= 0){    
        let content = `<strong>Achievement Score : </strong>${inputScore.value} / 10`;
        previewScore.innerHTML = "";
        previewScore.insertAdjacentHTML("beforeend",content);
    }
    else {
        let content = `<strong>Achievement Score : </strong>`;
        previewScore.innerHTML = "";
        previewScore.insertAdjacentHTML("beforeend",content);
    }
}
function previewPosition(){
    // Veriables
    let previewPosition = document.getElementById("add-preview-position");
    let selectPosition = document.getElementById("add-position");

    previewPosition.textContent = selectPosition.value;
}
// male flame reflesh iconuna tıkladığında resim değiş
function maleFlameReflesh(value){
    if(value == true) {
        // 1 ila 11 arasından random sayı oluştur
        let randomNumber = Math.ceil(Math.random() * 15);
        let previewPersonImage = document.getElementById("preview-person-image");
        let previewImageSrc = `assets/img/male-person-${randomNumber}.png`;
        previewPersonImage.setAttribute("src",previewImageSrc);
    }
    if(value == false) {
        // 1 ila 11 arasından random sayı oluştur
        let randomNumber = Math.ceil(Math.random() * 15);
        let previewPersonImage = document.getElementById("preview-person-image");
        let previewImageSrc = `assets/img/flame-person-${randomNumber}.png`;
        previewPersonImage.setAttribute("src",previewImageSrc);
    }
}
// Timeout pointer event none functions
function timeOut2500FilterButton(timeoutElement){
  
    let oldWitdh = timeoutElement.offsetWidth;
    let oldInnerHTML = timeoutElement.innerHTML;
    timeoutElement.style.width = `${oldWitdh}px`;
    timeoutElement.innerHTML = `<i class="fa-solid fa-spinner"></i>Please wait`;
    timeoutElement.classList.add("filter-button-please-wait");
    

    setTimeout(() => {
        timeoutElement.removeAttribute("style");
        if(timeoutElement.getAttribute("class").includes("filter-button-please-wait",0)) timeoutElement.classList.remove("filter-button-please-wait");
        
        timeoutElement.innerHTML = oldInnerHTML;
    }, 2500);
}

// Mobile
// Mobile menu button click event
document.getElementById("mobile-menu-button").addEventListener("click", ()=>{

    let headerElement = document.getElementsByTagName("header")[0];
    let navElement = document.querySelector(".navigation .nav")

    if(navElement.getAttribute("class").includes("mobile-menu-active",0)){
        navElement.classList.replace("mobile-menu-active","mobile-menu-passive")
    }
    else if(navElement.getAttribute("class").includes("mobile-menu-passive",0)){
        navElement.classList.replace("mobile-menu-passive","mobile-menu-active")
    }
    else{
        navElement.classList.add("mobile-menu-active");
    }

    let headersClick = document.querySelectorAll(".navigation .nav .nav-item a");
    for(let aElement of headersClick){
        aElement.addEventListener("click",()=> {document.getElementById("mobile-menu-button").click()});
         // mobile , başlıkların önündeki >_ ekini sil
        if(aElement.children.length > 0) aElement.children[0].remove();
    } 
});
// Sayfa açıldığında pencere boyutuna göre şekilendir (Sabit) // 1200px ve altı için mobile menu aktifleştir
let openPageSize = window.innerWidth;
if(openPageSize < 1200){
    let headerElement = document.getElementsByTagName("header")[0];
    if(!headerElement.getAttribute("class").includes("mobile-menu",0)) headerElement.classList.add("mobile-menu"); 
}
// Windows penceresi her değiştiğinde çalışacak
let oldResizeDate = new Date().getTime();
window.onresize = function() { 
    //veriables
    let headerElement = document.getElementsByTagName("header")[0];
    let nowResizeDate = new Date().getTime()


    // Her 100ms de bir kontrol et
    if((nowResizeDate - oldResizeDate) > 100){

        // 1200px ve altı için mobile menu aktifleştir
        if(window.innerWidth < 1200){
            if(!headerElement.getAttribute("class").includes("mobile-menu",0)) headerElement.classList.add("mobile-menu");
            if(document.querySelector(".filter-content").getAttribute("class").includes("active",0)) document.querySelector(".filter-content").setAttribute("class","filter-content");
            
        }
        else if(window.innerWidth > 1200){
            if(headerElement.getAttribute("class").includes("mobile-menu",0)) headerElement.classList.remove("mobile-menu");
        }


        
        // Şimdiki zamana eski zamana aktar.
        oldResizeDate = nowResizeDate;
    }
    


}
// About Me Button
document.getElementById("about-me-button").addEventListener("click", () =>{

    beforeClearFilters();
    notFoundRemove();
    clearFilterContent();
    if(!filterEmployees.getAttribute("class").includes("about-content",0)) filterEmployees.classList.add("about-content");

        let content = `
            <div class="about-content-header">
            <h3 class="about-h3">Employee List Project</h3>
            <div class="me">
                <p>Merhaba, Ben Burak. <br><br> Sivas Cumhuriyet Üniversitesi Yönetim Bilişim Sistemleri Bölümünden 2020 yılında mezun oldum.
                Dört yıllık üniversite eğitimim boyunca algoritma, programlama, veri tabanı, bilgisayar donanımı ve veri haberleşmesi gibi dersler aldım.
                Çeşitli çalışmalar yaparak kendimi geliştirme fırsatı buldum. Bu projede tarafımca sıfırdan kodlanmış olup dışarıdan kaynak kodu sokulmamıştır.
                </p>
                <div class="my-image">
                    <img src="assets/img/my-photo.jpg" alt="my-photo">
                </div>
            </div>
       </div>
       <div class="about-content-main">
            <div class="project-desc">
                <h3 class="about-h3">Proje Açıklama</h3>
                <p>Proje amacı bir şirketin tüm departman ve departmanlarına bağlı çalışanlarını listelemektir. Çalışanlar hakkında
                    <ul>
                        <li>Personel Adı</li>
                        <li>Personel Yaşı</li>
                        <li>Personelin Ne Kadar Süredir Şirket Bünyesinde Çalıştığı</li>
                        <li>Personelin Performansına Bağlı Puanlama Sistemi</li>
                        <li>Personelin Mail Adresi</li>
                        <li>Personelin Bağlı Olduğu Departman</li>
                        <li>Personelin Pozisyonu</li>
                    </ul>
                gibi bilgileri görüntüleyebilir, çalışanları inceleyebilir, düzenleyebilir veya silebilirsiniz. 
                </p>
                <p> Personelleri puanlarına veya şirket 
                    bünyesinde bulunma sürelerine göre filtrelenebilir. Örneğin 10 yıldan fazla çalışma süresi olan ve aynı zamanda yüksek çalışan puanına
                    sahip çalışanları merak ettiğinizde, filtreleme seçenekleri ile bu çalışanları listeleyebilirsiniz.</p>
            </div>
            <div class="project-technical-desc">
                <h3 class="about-h3">Proje Teknik Açıklama</h3>
                <p>
                    Sıfırtan HTML, CSS ve Javascript teknolojileri kullanılarak oluşturuldu. Bir veritabanına bağlı olmadan javascript sınıf kavramı
                    ile veriler tutulur ve prototype eklene fonksiyonlar ile hesaplamalar yapılır bu nedenle sayfa yenilendiğinde bigiler sıfırlanır.
                </p>
                <ul>
                    <li>Tasarım için dört ana toprak rengi kullanıldı.(#53331F, #CD8C8C, #866C69, #D4B8B1)</li>
                    <li>Bir web sitesinden ziyade bir uygulama izlenimi için yumuşak kenarlı içerikler ve yavaş akan bir önyüz tasarlandı.</li>
                    <li>Stil tasarımı için SCSS kullanıldı parçalıdan ziyade tek bir ana tasarım sınıfı uygulandı.</li>
                    <li>Modern javascript mantığı ile inheritance (miras) yoluyla personel sınıfları oluşturuldu, getter ve setter metodları ile sağlamlaştırıldı.</li>
                    <li>2k ya kadar destekli, duyarlı yapı oluşturuldu, bunun için css media query ve javascript media queryleri kullanıldı.</li>
                    <li>Nesne tabanlı programlama (OOP) esas alınarak oluşturuldu, farklı alanlarda ekleme ve düzenlemeler açık bir sistem oluşturuldu.</li>
                </ul>
            </div>

       </div>
       <div class="about-content-footer">
        <a href="https://github.com/burakkrt?tab=repositories" target="_blank"><i class="fa-brands fa-github"></i>GitHub</a>
        <a href="https://www.linkedin.com/in/kurt-burak/" target="_blank"><i class="fa-brands fa-linkedin"></i>Linkedin</a>
        <span><i class="fa-solid fa-envelope"></i>krtburak@outlook.com</span>
       </div>
        `;
    filterEmployees.insertAdjacentHTML("beforeend",content);
    callFilters("About Me");
    if(!filterEmployees.getAttribute("class").includes("active",0)) filterEmployees.classList.add("active");
    setTimeout(() => filterHeader.children[0].click(), 1);
    

});
