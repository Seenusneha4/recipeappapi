const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });

var recipemodel=Mongoose.model("recipe",
new Mongoose.Schema({
    recipetitle:String,
    category:String,
    description:String,
    preparedby:String
   
   
})
)
Mongoose.connect("mongodb+srv://bookapp:3456@cluster0.9e3p4.mongodb.net/recipeDb")
 
app.post("/api/search",(req,res)=>{
    var getrecipetitle=req.body
    recipemodel.find(getrecipetitle,(error,data)=>{
        if(error)
         {
             res.send({"status":"error","data":error})    
 
         }
         else
         {
             res.send({"status":"success","data":data})
         }
    })
})

app.post("/api/delete",(req,res)=>{
    var getid=req.body
    recipemodel.findByIdAndRemove(getid,(error,data)=>{
        if(error)
         {
             res.send({"status":"error","data":error})    
 
         }
         else
         {
             res.send({"status":"success","data":data})
         }
    })
})

app.post("/api/recipeapp",(req,res)=>{
    var getrecipetitle=req.body.recipetitle
    var getcategory=req.body.category
    var getdescription=req.body.description
    var getpreparedby=req.body.preparedby
    
    data={"recipetitle":getrecipetitle,"category":getcategory,"description":getdescription,"preparedby":getpreparedby}
    let recipe=new recipemodel(data)
    recipe.save((error,data)=>{
        if(error)
         {
             res.send({"status":"error","data":error})    
 
         }
         else
         {
             res.send({"status":"success","data":data})
         }
    })
})

app.get("/api/viewall",(req,res)=>{
    recipemodel.find((error,data)=>{
        if(error)
        {
         res.send({"status":"error","data":error})    
        }
        else
        {
         res.send({"data":data})
        }
    })
 })



app.listen(4500,()=>{
    console.log("server running")
})