var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000

var renderCategories = fs.readFileSync("./pages/categories.html");
var renderCourses = fs.readFileSync("./pages/courses.html");
var renderProfil = fs.readFileSync("./pages/profil.html");


function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end();
    }
}

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<h2 style='text-align: center;'>Pencarian</h2>");
            response.write("<p style='text-align: center;'>Anda Mencari : <b>" + keyword + "</b> </p>");
            response.write("<h3 style='text-align: center;'><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.end("<button><a href='/' align: 'center';>Kembali</a></button>");
            
            }
        else{
            fs.readFile("./pages/index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url == '/categories'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(renderCategories);
        response.end();
    }
    else if (request.url == '/courses'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(renderCourses);
        response.end();
    }
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("./pages/login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "yovie" && formData.password === "1121101987"){
                response.writeHead(200,{"Content-Type":"text/html"});
                response.end(renderProfil);
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.write(data)
                response.end();
            }
        });

    }
    else if (request.url==="/daftar" && request.method === "GET"){
        fs.readFile("./pages/daftar.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (q.pathname ==="/daftar" && request.method === "GET"){
        var requestUser = q.query.username;
        var requestPass = q.query.password;
        var requestEmail = q.query.email;
        if (requestUser){
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write("<h2 style='text-align: center;'>Pendaftaran Berhasil</h2>");
            response.write("<p style='text-align: center;'>Username : <b>" + requestUser + "</b> </p>");
            response.write("<p style='text-align: center;'>Password : <b>" + requestPass + "</b> </p>");
            response.write("<p style='text-align: center;'>E-mail : <b>" + requestEmail + "</b> </p>");
            response.write("<button><a href='/login' align: 'center';>Login</a></button>");
            response.end();
            }
        else{
            fs.readFile("./pages/daftar.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write("<h2>Daftar Gagal</h2>");
            response.write("<a href='/daftar'>Coba Kembali</a>");
            response.end();
            })
        
        }
    
    };

});    

server.listen(port);
console.log("server Berjalan")
