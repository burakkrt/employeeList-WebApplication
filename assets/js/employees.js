// Kişi gövde sınıfı
class person{

    constructor(id = Number,name = String,yearBirth = Number,imageName = String){
        this.id = id;
        this.name = name;
        this.yearBirth = yearBirth;
        this.imageName = imageName;
    }

    get id(){
        return this._id;
    }

    set id(value){
        if(typeof value != "number" || value < 0 || value == null){
            return console.log("Hata : İd hatalı !");
        }
        else this._id = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        if(typeof value == "number" || value == null){
            return console.log("Hata : İsim hatalı !");
        }
        else this._name = value;
    }

    get yearBirth(){
        return this._yearBirth;
    }

    set yearBirth(value){
        if(typeof value != "number" || value == null){
            return console.log("Hata : Doğum yılı hatalı !");
        }
        else this._yearBirth = value;
    }

    get imageName(){
        return this._imageName;
    }
    
    set imageName(value){
        if(typeof value == "number" || value == null){
            return console.log("Hata : Resim ismi hatalı !");
        }
        else this._imageName = value;
    }
}
// Kişiden türetilmiş personel sınıfı
class employee extends person{

    constructor(id = Number,name = String,yearBirth = Number,imageName = String, departmentId = Number,positionId = Number,salary = Number,score = Number,startJob = Number,mail = String){
        super(id, name, yearBirth, imageName);
        this.departmentId = departmentId;
        this.positionId = positionId;
        this.salary = salary;
        this.score = score;
        this.startJob = startJob;
        this.mail = mail;
    }

    get departmentId(){
        return this._departmentId;
    }

    set departmentId(value){
        if(typeof value != "number" || value == null) return console.log("Hata : Departman id hatalı !");
        else this._departmentId = value;
    }

    get positionId(){
        return this._positionId;
    }

    set positionId(value){
        if(typeof value != "number" || value == null) return console.log("Hata : Pozisyon id hatalı !");
        else this._positionId = value;
    }

    get salary(){
        return this._salary;
    }

    set salary(value){
        if(typeof value != "number" || value == null) return console.log("Hata : Maaş hatalı !");
        else this._salary = value;
    }

    get score(){
        return this._score;
    }

    set score(value){
        if(typeof value != "number" || value == null) return console.log("Hata : Skor hatalı !");
        else this._score = value;
    }

    get startJob(){
        return this._startJob;
    }

    set startJob(value){
        if(typeof value != "number" || value == null) return console.log("Hata : İşe başlangıç yılı hatalı !");
        else {
            if(value > new Date().getFullYear() || value < 1000) return console.log("Hata : İşe başlangıç yılı 1000 'den küçük veya gelecek zaman olamaz !");
            else this._startJob = value;
        }
    }

    get mail(){
        return this._mail;
    }

    set mail(value){
        if(typeof value != "string" || value == null) return console.log("Hata : Mail adresi hatalı !");
        else {
            if(value.includes("@",0)){
                this._mail = value;
                return;
            }
            else return console.log("Hata : Girilen değer mail adresi geçerli değil !")
        }
    }

}
// Yaş hesaplama fonksiyonu
person.prototype.age = function(){
    if(typeof this.yearBirth != "number" || this.yearBirth == undefined){
        return "Hata : Yaş değeri boş veya sayısal bir değer değil !";
    }
    else {
        let yearBirth = new Date().getFullYear() - this.yearBirth;
        if(yearBirth > 200 || yearBirth < 0) return "Hata : Yaş 0 ile 200 arasında değil !"
        else return yearBirth;
    }
}
// Çalışma yılı hesaplama
person.prototype.optionTime = function(){
    if(typeof this.startJob != "number" || this.startJob == undefined){
        return "Hata : İşe başlangıç yılı boş veya sayısal değer değil !";
    }
    else {
        let optionTime = new Date().getFullYear() - this.startJob;
        if(optionTime < 0) return "Hata : İşe başlangıç yılı negatif bir değer olamaz !";
        else return optionTime;
    }
}
// Departman adı çağırma
person.prototype.departmentName = function(){ 
    for(let department of departments){
        if(this.departmentId == department.id) return department.name
    }
}
// Pozisyon adı çağırma
person.prototype.positionName = function(){
    for(let department of departments){
        if(this.departmentId == department.id){
            for(let position of department.position){
                if(this.positionId == position.id){
                    return position.position;
                }
            }
        }
    }
}
// Departman ve pozisyonlar
const departments = [
    {id:0,name:"Management Department",position:[
        {id:0,position:"CEO (Chief Executive Officer)"},
        {id:1,position:"CEO (Chief Executive Officer) Assistants"},
        {id:2,position:"Management Menager"},
        {id:3,position:"Management Menager Assistants"},
        {id:4,position:"Senior Management Specialist"},
        {id:5,position:"Management Specialist"},
        {id:6,position:"Junior Management Specialist"},
        {id:7,position:"Management Specialist Assistants"},
        {id:8,position:"Management Intern"}
    ]},
    {id:1,name:"Production Department",position:[
        {id:0,position:"Production Menager"},
        {id:1,position:"Production Menager Assistants"},
        {id:2,position:"Senior Production Specialist"},
        {id:3,position:"Production Specialist"},
        {id:4,position:"Junior Production Specialist"},
        {id:5,position:"Production Specialist Assistants"},
        {id:6,position:"Production Intern"}
    ]},
    {id:2,name:"Marketing Department",position:[
        {id:0,position:"Marketing Menager"},
        {id:1,position:"Marketing Menager Assistants"},
        {id:2,position:"Senior Marketing Specialist"},
        {id:3,position:"Marketing Specialist"},
        {id:4,position:"Junior Marketing Specialist"},
        {id:5,position:"Marketing Specialist Assistants"},
        {id:6,position:"Marketing Intern"}
    ]},
    {id:3,name:"Accounting Department",position:[
        {id:0,position:"Accounting Menager"},
        {id:1,position:"Accounting Menager Assistants"},
        {id:2,position:"Senior Accounting Specialist"},
        {id:3,position:"Accounting Specialist"},
        {id:4,position:"Junior Accounting Specialist"},
        {id:5,position:"Accounting Specialist Assistants"},
        {id:6,position:"Accounting Intern"}
    ]},
    {id:4,name:"Human Resources Department",position:[
        {id:0,position:"Human Resources Menager"},
        {id:1,position:"Human Resources Menager Assistants"},
        {id:2,position:"Senior Human Resources Specialist"},
        {id:3,position:"Human Resources Specialist"},
        {id:4,position:"Junior Human Resources Specialist"},
        {id:5,position:"Human Resources Specialist Assistants"},
        {id:6,position:"Human Resources Intern"}
    ]},
    {id:5,name:"AR-GE Department",position:[
        {id:0,position:"AR-GE Menager"},
        {id:1,position:"AR-GE Menager Assistants"},
        {id:2,position:"Senior AR-GE Specialist"},
        {id:3,position:"AR-GE Specialist"},
        {id:4,position:"Junior AR-GE Specialist"},
        {id:5,position:"AR-GE Specialist Assistants"},
        {id:6,position:"AR-GE Intern"}
    ]}
]
// Departman document idler
const departmentsDocument = [
    {id:0,documentId:"management-department"},
    {id:1,documentId:"production-department"},
    {id:2,documentId:"marketing-department"},
    {id:3,documentId:"accounting-department"},
    {id:4,documentId:"human-resources-department"},
    {id:5,documentId:"ar-ge-department"},

];

const employeeArray = [];
let emp1 = new employee(0,"Kaira Katarina",1980,"flame-person-1.png",0,0,24200,10,1996,"kairakatarina@mail.com");
let emp2 = new employee(1,"Beyonce Knowles",1976,"flame-person-2.png",0,1,18000,10,1999,"beyonceknowles@mail.com");
let emp3 = new employee(2,"James Cameron",1988,"male-person-1.png",0,2,12500,9,2005,"jamescameron@mail.com");
let emp4 = new employee(3,"Lady Gaga",1982,"flame-person-3.png",0,3,11200,9,2010,"ladygaga@mail.com");
let emp5 = new employee(4,"Tiger Woods",1990,"male-person-2.png",1,0,7200,9,2000,"tigerwoods@mail.com");
let emp6 = new employee(5,"Britney Spears",1989,"flame-person-4.png",1,1,4200,7,2015,"britneyspears@mail.com");
let emp7 = new employee(6,"Sandra Bullock",1995,"flame-person-5.png",1,2,3700,5,2019,"sandrabullock@mail.com");
let emp8 = new employee(7,"Johnny Depp",1987,"male-person-3.png",1,3,3200,5,2020,"johnnydepp@mail.com");
let emp9 = new employee(8,"Simon Cowell",1990,"male-person-4.png",1,4,3050,6,2018,"simoncowell@mail.com");
let emp10 = new employee(9,"Taylor Swift",1994,"flame-person-6.png",1,5,2400,4,2021,"taylorswift@mail.com");
let emp11 = new employee(10,"Miley Cyrus",1988,"flame-person-7.png",2,0,7200,9,2015,"mileycyrus@mail.com");
let emp12 = new employee(11,"Kobe Bryant",1985,"male-person-5.png",2,1,4200,7,2019,"kobebryant@mail.com");
let emp13 = new employee(12,"Rush Limbaugh",1991,"male-person-6.png",2,2,3700,5,2021,"rushlimbaugh@mail.com");
let emp14 = new employee(13,"Bruce Springsteen",1997,"male-person-7.png",2,3,3200,3,2020,"springsteen@mail.com");
let emp15 = new employee(14,"Angelina Jolie",1994,"flame-person-8.png",3,1,4200,6,2016,"angelinajolie@mail.com");
let emp16 = new employee(15,"Michael Jordan",1991,"male-person-8.png",3,2,3700,5,2019,"michaeljordan@mail.com");
let emp17 = new employee(16,"Dr. Phil McGraw",1988,"male-person-9.png",3,0,7200,8,2009,"philmcgraw@mail.com");
let emp18 = new employee(17,"Steven Spielberg",1992,"male-person-10.png",4,0,7200,6,2011,"stevenspielberg@mail.com");
let emp19 = new employee(18,"Ellen Degeneres",1997,"male-person-11.png",4,1,4200,6,2017,"ellendegeneres@mail.com");
let emp20 = new employee(19,"David Letterman",1994,"male-person-12.png",4,2,3700,5,2019,"davidletterman@mail.com");
let emp21 = new employee(20,"Marie Curie",1994,"flame-person-9.png",4,3,3200,4,2021,"jenniferaniston@mail.com");
let emp22 = new employee(21,"Remziye Hisar",1994,"flame-person-10.png",4,4,3050,3,2021,"remziyehisar@mail.com");
let emp23 = new employee(22,"Rosa Parks",1998,"flame-person-11.png",4,5,2700,2,2022,"rosaparks@mail.com");
let emp24 = new employee(23,"Anne Frank",1988,"flame-person-12.png",5,0,7200,8,1998,"annefrank@mail.com");
let emp25 = new employee(24,"Amelia Earhart",1992,"flame-person-13.png",5,1,4200,6,2005,"ameliaearhart@mail.com");
let emp26 = new employee(25,"Michael Bay",1995,"flame-person-14.png",5,2,3700,6,2014,"michaelbay@mail.com");
let emp27 = new employee(26,"Jay Leno",1990,"male-person-13.png",3,3,3200,4,2018,"jayleno@mail.com");
let emp28 = new employee(27,"David Beckham",1994,"male-person-14.png",3,4,2700,2,2020,"davidbackham@mail.com");
let emp29 = new employee(28,"Jerry Seinfeld",2000,"male-person-15.png",3,5,2400,1,2021,"jerryseinfeld@mail.com");
let emp30 = new employee(29,"Sabiha Gökçen",1990,"flame-person-15.png",0,4,2700,6,2014,"sabihagokcen@mail.com");