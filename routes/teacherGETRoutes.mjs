import express from "express";
import { Teacher } from "../models/index.js";

const router = express.Router();

router.get("/", async function(req, res) {
    let teachdata=[];
    Teacher.find().then((result)=>{
        result.forEach(it => {
            teachdata.push(it);
        });
        res.render('index',{teach:teachdata,main_heading:"Teacher Information"});
    }).catch((err)=>{
        console.log(err);
    }) 
});

router.get("/add",function(req, res){
    res.render('add');
});

router.get("/sort",function(req,res){
    res.render("sort",{main_heading:'Sort The Data'});
});


router.get("/filter",function(req,res){
    res.render("filter");
});

router.get("/find",function(req,res){
    res.render("find",{main_heading:'Find Teacher Form'});
});


router.get("/update",function(req,res){
    res.render("update");
});

router.get("/delete",function(req,res){
    res.render("delete");
});

router.get("/info",function(req,res){
    Teacher.find().then((result)=>{
        let sum=0,n=0,mn=20000  ,mx=0;
        result.forEach(it => {
            let val=parseInt(it.classes);
            sum+=val
            mx=Math.max(mx,val);
            mn=Math.min(mn,val);
            n++;
        });
        let htmlContent;
        if(n>0){
            sum=parseInt(sum/n);
            htmlContent = `
            <h1>Total no of teachers:${n}</h1>
            <h1>Average no of classes:${sum}</h1>
            <h1>Maximum no of classes:${mx}</h1>
            <h1>Minimum no of classes:${mn}</h1>
            <button type="button"><a type="button" href="/">Click here to return to home</button>`;
            res.write(htmlContent);
            res.send();
        }else{
            htmlContent=`
            <h1>Opps! no teachers data found</h1><br>
            <button type="button"><a type="button" href="/">Click here to return to home</button>`;
            res.write(htmlContent);
            res.send();
        }
    }).catch((err)=>{
        console.log(err);
    }) 
});

export default router;
