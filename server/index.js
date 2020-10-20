const express =require ("express")
const app= express();
const mysql =require('mysql')
const bodyParser=require('body-parser')
const cors=require('cors')


var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
    password: 'password',
	database: 'database-1',
	
});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get',(req,res)=>{
	const sqlSelect=
	"SELECT *FROM  movie_reviews";
	mysqlConnection.query(sqlSelect, function(err,result){
		if (result.length>0) {
			res.send(result)
		}
	})
})


app.post('/api/insert', (req,res)=>{

	const movieName=req.body.movieName
	const movieReview=req.body.movieReview


	const sqlInsert =
	"INSERT INTO movie_reviews ( `movieName`, `movieReview`) VALUES ('"+movieName+"','"+movieReview+"')"
	mysqlConnection.query(sqlInsert,(err,result)=>{
		console.log(result);

	})
})

app.post('/api/delete/',(req,res) =>{
	const name= req.body.movieName
	const sqlDelete=
		"DELETE FROM `data`.`movie_reviews` WHERE (`movieName` = '"+name+"');"
	 mysqlConnection.query(sqlDelete,(err,result)=>{
		 if (err) console.log(err)
		 else{
		 	console.log(name)
		 }
	 })
})

app.put("/api/update",(req,res)=>{
	const name= req.body.movieName;
	const review =req.body.movieReview;
	console.log(review)
	const sqlUpdate ="UPDATE  movie_reviews  SET movieReview ='"+review+"' WHERE movieName ='"+name+"'";

	mysqlConnection.query(sqlUpdate,(err,result) =>{
		if (err) console.log(err)
	});



}
);

app.listen (3001, () => {
    console.log('runnimg on port 3001');

});
