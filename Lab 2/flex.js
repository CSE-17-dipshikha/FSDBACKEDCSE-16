import fs from "node:fs/promises"
import path from "node:path";
const Filepath = path.join(process.cwd(), "example.txt");


async function createFile(content){
    try {
         await fs.writeFile(Filepath,content,"utf8")
         console.log("File created succesfully!");
    }catch(err){
        console.error("Error creating file:err");
    }
}


async function readfile(){
    try{
        const data = await fs.readFile(Filepath,"utf8");
        console.log ("file created succesfully!");
        console.log(data);
    }catch(err){
        console.error("Error reading file:");
    }
}
async function updatefile(){
    try{
        const data = await fs.updatefile(Filepath,"utf8");
        console.log ("file content:\n",data)
    }catch (err){
        console.error("file exicute:",err);
    }

}

async function deleFile(){

    try{
        const data = await fs.updatefile(Filepath,"utf8");
        console.log("file content:\n",data);
        return data;
    }catch(err){
        console.error("file exicute;",err)

    }
}  
    
createFile("welcome to file");

readfile();
