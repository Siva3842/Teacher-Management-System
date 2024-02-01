import express from "express";
import { Teacher } from "../models/index.js";

const router = express.Router();

router.post("/add", async function(req, res) {
    const data=req.body;
    const temp= new Teacher({
        name: data.name,
        age: data.age,
        classes: data.classes,
        dob:{
            day:    data.day,
            month:  data.month,
            year:   data.year
        }
    });
    temp.save();
    res.redirect("/");
});


router.post("/sort", async function(req, res) {
    const data=req.body.value;
    let result=[];
    Teacher.find().then((Teachers_data)=>{
        Teachers_data.forEach((it)=>{
            result.push(it);
        });
        if(data==="age"){
            result.sort((a,b)=>(parseInt(a.age)-parseInt(b.age)));
        }else if(data=="name"){
            result.sort((a, b) => {
                const nameA = a.name.toLowerCase(); 
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA >= nameB) return 1;
            });
        }else if(data==="classes"){
            result.sort((a,b)=>(parseInt(a.classes)-parseInt(b.classes)));
        }else if (data === "dob") {
            result.sort((a, b) => {
              const aDob = new Date(a.dob.year, a.dob.month, a.dob.day); 
              const bDob = new Date(b.dob.year, b.dob.month, b.dob.day);
              return aDob - bDob; 
            });
        }else{
            res.render("sort",{main_heading:'Enter(age or name or classes or dob ) as a value '});
        }
        res.render("index",{teach:result,main_heading:`sorted according to ${data}`});
    }).catch((err)=>{
        console.log(err);
    }) 
});

router.post("/filter",function(req,res){
    const data=req.body;
    let start_age = data.lage ;
    let end_age = data.upage ;
    let start_class = data.lclasses;
    let end_class = data.uclasses ;
    let start_year = data.lyear;
    let end_year = data.uyear;

    let result=[];
    Teacher.find().then((Teachers_data)=>{
        Teachers_data.filter((it)=>{
                const ageCondition = (it.age >= start_age && it.age <= end_age);
                const classCondition = (it.classes >= start_class && it.classes <= end_class);
                const yearCondition = (it.dob.year >= start_year && it.dob.year <= end_year);
                if(ageCondition && yearCondition && classCondition){
                    result.push(it);
                } 
        })
        res.render("index",{teach:result,main_heading:`Filterred Data based on the conditions`});
    }).catch((err)=>{
        console.log(err);
    })
});

router.post("/find",function(req,res){
    const reqname=req.body.value; 

    Teacher.findOne({ 'name': reqname })
    .then(foundTeacher => {
        if (foundTeacher) {
            let htmlContent = `
            <h1>Name of teacher:${foundTeacher.name}</h1>
            <h1>Age of Teacher:${foundTeacher.age}</h1>
            <h1>No of classes:${foundTeacher.classes}</h1>
            <h1>Date of birth :${foundTeacher.dob.day}/${foundTeacher.dob.month}/${foundTeacher.dob.year}</h1>
            <button type="button"><a type="button" href="/">Click here to return to home</button>`;
            res.write(htmlContent);
            res.send();
            console.log("Found teacher:", foundTeacher.name);
        }else {
            res.render("find",{main_heading:'Oops! couldnt find try another one:)'});
            console.log("Data Not Present");
        }
    })
    .catch(error => {
        console.error("Error finding teacher:", error);
    });
});

router.post("/update",async function(req,res){
    const key=req.body.name;
    const attribute = req.body.attribute_to_be_changed;
    const newval=req.body.attribute_value;
    const filter = { 'name': key };
    const update = { [attribute]:newval};
    let doc = await Teacher.findOneAndUpdate(filter,update,{new:true});
    res.redirect("/");  
});

router.post("/delete",function(req,res){
    const del_name=req.body.name;
    Teacher.deleteOne({ name: del_name }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log("Some error occured");
        console.log(error); // Failure
    });
    res.redirect("/");
});

export default router;
