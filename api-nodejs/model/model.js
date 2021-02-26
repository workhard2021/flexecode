const mongoose=require('mongoose');
var url = "mongodb+srv://acss:ansoumane@cluster0.irndu.mongodb.net/testacss?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGO_DB || url);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const articleSchema= new mongoose.Schema({
	     title:{type:String,required:true},
	     categorie:{type:String,required:true},
	     imageUrl:{type:String},
		 cloud_id:{type:String},
	     comment:{type:String,required:true},
	     linkGithub:{type:String},
	     linkYoutube :{type:String},
	     dateInsert:{type:Date,Default:Date.now()},
	     codeSource:{type:Object},  
});

mongoose.connection.on('connected',()=>{
	  console.log('mongoose is connected !!!!')
})

const modelArticle =new  mongoose.model('article',articleSchema);

const userSchema= new mongoose.Schema({
	     fullName:{type:String,required:true},
	     imageUser:{type:String},
		 cloud_id:{type:String},
	     password:{type:String,required:true},
	     email:{type:String,required:true,unique:true},
	     dateInsert:{type:Date,Default:Date.now()},
	     role:{type:String,Default:'user'},
	     comment:{type:String}
	 });

const  modelUser = new mongoose.model('user',userSchema);
const commentaireSchema=mongoose.Schema({
	     comment:{type:String,required:true},
	     email:{type:String,required:true},
	     fullName:{type:String,Default:'Annonyme'},
	     idArticle:{type:String,required:true},
	     commentItem:{type:Array},
	     dateInsert:{type:Date,Default:Date.now()}   
});


const modelCommentaire= new mongoose.model('commentaire',commentaireSchema);

const projectSchema=mongoose.Schema({
	     title:{type:String,required:true},
	     comment:{type:String,required:true},
	     imageUser:{type:String},
	     categorie:{type:String},
		 cloud_id:{type:String},
	     link:{type:String},
	     dateInsert:{type:Date,Default:Date.now()}   
});

const modelProject =new mongoose.model('project',projectSchema);

module.exports={
	    modelArticle:modelArticle,
	    modelUser:modelUser,
	    modelCommentaire:modelCommentaire,
	    modelProject:modelProject 
};



 






