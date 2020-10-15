const express =require ("express")
const app= express();
const mysql =require('mysql')
const bodyParser=require('body-parser')
const cors=require('cors')


var mysqlConnection = mysql.createConnection({
	host: 'database-1.czsqu5b24nmo.us-east-1.rds.amazonaws.com',
	user: 'admin',
    password: 'virat1819',
	database: 'database-1',
	
});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get',(req,res)=>{
	const sqlSelect=
	"SELECT *FROM  movie_reviews";
	mysqlConnection.query(sqlSelect, [movieName,movieReview],(err,result)=>{
		res.send(result);
	})
})


app.post('/api/insert', (req,res)=>{

	const movieName=req.body.movieName
	const movieReview=req.body.movieReview


	const sqlInsert =
	"INSERT INTO movie_reviews ( movieName. movieReview) VALUES (?,?)"
	mysqlConnection.query(sqlInsert,[movieName,movieReview],(err,result)=>{
		console.log(result);

	})
})

app.delete('/api/delete/:movieName',(req,res) =>{
	const name=req.params.movieName
	const sqlDelete=
	"DELETE FROM movie_reviews WHERE movieName= ?";
	 mysqlConnection.query(sqlDelete,name,(err,result)=>{
		 if (err) console.log(err)
	 })
})

app.put("/api/update",(req,res)=>{
	const name=req.params.movieName;
	const review =req.body.movieReview;
	const sqlUpdate ="UPDATE  movie_reviews  SET movieReview =? WHERE movieName =?";

	mysqlConnection.query(sqlUpdate,[review,name],(err,result) =>{
		if (err) console.log(err)
	});



}
);

app.listen (3001, () => {
    console.log('runnimg on port 3001');

});
