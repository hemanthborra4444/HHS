require('dotenv').config();
const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
var status=0;
const app=express();
  


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());



app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized:false,
  
}));



app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect(process.env.SECRET,{useNewUrlParser:true,family:4,useUnifiedTopology: true});

//schema and model for profession 

const myschema=new mongoose.Schema( {
  
  username:String,
  password:String,
  name:String,
  profession:String,
  price:String,
  gender:String
});

const mymodel=new mongoose.model('mymodel',myschema);
//schema and model for reviews

const messageschema=new mongoose.Schema(
  {
    username:String,
    message:String
  }
);
const messagemodel=new mongoose.model('messagemodel',messageschema);
const reviewschema=new mongoose.Schema(
  {
    name:String,
    text:String
  }
);
const reviewmodel=new mongoose.model('reviewmodel',reviewschema);

//schema and model for booking
const bookschema=new mongoose.Schema({
  worker:String,
  user:String,
  phn:String
});
const bookmodel=new mongoose.model('bookmodel',bookschema);

//schema and model for customers
const userschema= new mongoose.Schema(
  {
    myusername:String,
    username:String,
    password:String
  }
);
userschema.plugin(passportLocalMongoose);
const User=new mongoose.model("User",userschema);


passport.use(User.createStrategy())
passport.serializeUser(function(user,done){
  done(null,user.id)
});
passport.deserializeUser(function(id,done)
{
  User.findById(id,function(err,user)
  {
    done(err,user);
  })
});

//for login and registration

app.post("/customer-register",function(req,res)
{
  User.register({username:req.body.username},req.body.password,function(err,user)
  {
    if (err)
    {
      console.log(err);
      res.redirect("/");
    }
    else{
      passport.authenticate("local")(req,res,function()
      {
        status=1
        res.cookie('username',req.body.username);
        res.redirect("/profile")
      });
     
    }
  });

});
app.post("/customer-login",function(req,res)
{
  const user=new User({
    username:req.body.username,
    password:req.body.password
  });
  req.login(user,function(err)
  {
    if (err)
    {
      console.log(err)   
     }
     else{
      passport.authenticate("local")(req,res,function()
      {
        status=2;
        res.cookie('username',req.body.username);
        res.redirect("/profile");
      });
     }
  })
});
app.post("/prof-register",function(req,res)
{
  const name=req.body.name;
  const username=req.body.username;
  const password=req.body.password;
  const profession=req.body.profession;
  const price=req.body.price;
  const gender=req.body.gender;


  const m=mymodel(
    {
      name:name,
      username:username,
      password:password,
      profession:profession,
      price:price,
      gender:gender
    }
  );
  m.save(function(err)
  {
    if(err)
    {
      console.log(err)
    }
    else{
      status=1
      res.cookie('pusername',req.body.username);
      res.redirect("/profession");
    }
  });

});
app.post("/prof-log",function(req,res)
{  
  username=req.body.userid;
  password=req.body.password;
  mymodel.findOne({username:username},function(err,foundUser)
  {
    if(err)
    {
      console.log(err)
    }
    else{
      if(foundUser)
      {
        
        if (foundUser.password===req.body.password)
        {
          res.cookie('pusername',req.body.userid);
          res.redirect("/profession")
        }
        else{
        res.redirect("/")
        }
      }
    }
  });
});
app.get("/chat",function(req,res)
{
  res.render("chat");
})
app.get ("/logout",function(req,res)
{
  res.clearCookie("username");
  res.clearCookie("pusername");
 
  status =3;
    res.redirect('/');

});

//for reviews

app.post("/reviewform",function(req,res)
{
  const name=req.body.name;
  const text=req.body.message;
  const m= new reviewmodel(
    {
      name:name,
      text:text
    }
  );
  m.save(function(err)
  {
    if(err)
    {
      console.log(err)
    }
    else{
   
      res.redirect("/");
    }
  });

});
// main homepage



//for booking 


app.post("/phn",function(req,res)
{
  const username=req.cookies.username;
  const phone=req.body.mobile;
  const wusername=req.body.workerId;
  const m= bookmodel(
    {
      user:username,
      phn:phone,
      worker:wusername
    }
  );
  m.save(function(err)
  {
    if(err)
    {
      console.log(err)
    }
    else{ 
      res.redirect("/profile");
    }
  });
 

});

app.get("/book",function(req,res)
{


  const user1=req.cookies.username;
  console.log(user1)
 if (user1!=undefined)
 { 
 mymodel.find(function(err,items)
 {
  
  res.render("book",{item:items,user:user1});
  });
}
else{
  console.log("login")
}
});




//professional page

app.get("/profession",function(req,res)
{

  const user1=req.cookies.pusername;
 

 if (user1!=undefined)
 { 
  mymodel.find().count(function(err, count){
    var clients1=count;
    User.find().count(function(err, count){
      var clients2=count;
  res.render("profession",{user:user1,clients:clients1+clients2});
    });
  });

 }
 else{
  res.redirect("/");
 }
});

//customers page

app.get("/profile",function(req,res)
{
 

  const user1=req.cookies.username;

 if (user1!=undefined)
 { 
  mymodel.find().count(function(err, count){
    var clients1=count;
    User.find().count(function(err, count){
      var clients2=count;
  res.render("profile",{user:user1,clients:clients1+clients2})
    });
  });
  }
  else{
    res.redirect("/");
  }
});


//for notifications

app.get("/notifications",function(req,res)
{
  const user1=req.cookies.pusername;

 if (user1!=undefined)
 { 
  
  bookmodel.find({worker:user1},function(err,items)
  {
   
   res.render("notification",{item:items});
   });
  }
  else{
    res.alert("please login");
    res.redirect("/")
  }
});
//for home page
app.get("/",function(req,res){
  reviewmodel.find(function(err,items)
 {
  if(err)
  {
    console.log(err)
  }
  else{
    mymodel.find().count(function(err, count){
      var clients1=count;
      User.find().count(function(err, count){
        var clients2=count;
res.render("index",{item:items,clients:clients1+clients2,status:status});
});
});
}
});});

app.listen(3000,function()
{

});