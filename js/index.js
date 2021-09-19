const header_height = 95 ;
const list_height = 150 ;
let checkbox = document.querySelector(".bar input[type='checkbox']");
const header = {
    header : document.querySelector(".header"),
    list : document.querySelector(".header nav")
}

checkbox.addEventListener("click",()=>{
    
    if(!checkbox.checked){
        header.list.style.opacity = "0";
        header.header.style.height = header_height+"px";
        header.list.style.top = "0px";
        header.list.style.pointerEvents = "none";



    }else{

        header.header.style.height = (header_height+list_height) +"px";
        header.list.style.top = "60px";
        header.list.style.pointerEvents = "all";
        
        header.list.style.opacity = "1";
        

    }
});





let resizeObserver = new ResizeObserver(() => {


    if(header.header.offsetWidth<=1000){
        if(!checkbox.checked){
            // check nhi h yha

            header.list.style.opacity = "0";

        }else{
            // check h yha
            header.list.style.opacity = "1";
            if(header.header.offsetHeight <= header_height){
                header.header.style.height = (header_height+list_height) +  "px";
            }


        }
    } else if( header.header.offsetWidth>1000){
        header.list.style.opacity = "1";
         if(header.header.offsetHeight > header_height){

        header.header.style.height = header_height +"px";}
        header.list.style.pointerEvents = "all";
   
    }

});
resizeObserver.observe(header.header);


const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    const x =document.querySelector('.my_projects_container');
   entries.forEach(entry => {
      if (entry.isIntersecting) {      
         x.style.animation = "fadeIn 2s ease";
         x.style.animationFillMode = "both";
      }
    });
  });
  observer.observe(document.querySelector('.my_projects_container'));


  /*Loading a All data about user  here from Json */
/*
 <div class="my_projects_container_item">
                  <div class="my_projects_container_item_img">
                    <div class="my_projects_container_item_img_box">
                        <img src="./images/demo.PNG" alt="">
                    </div>
                  </div>

                  <div class="my_projects_container_item_content">
                      <h2 class  = "my_projects_container_item_content_title">My app</h2>
                      <p>This app is a ReactJs application, 
                          using the latest technologies, 
                          such as hooks, scss modules to style and the most important using AI,
                           I've integrated AI to be able to ask a few simple question.
                    </p>
                  </div>

                  <div class="my_projects_container_item_stack">
                      <h2>Stack</h2>
                      <div class="my_projects_container_item_stack_item">
                          <span>#react</span>
                          <span>#Nodejs</span>
                          <span>#AWS</span>
                        </div>
                    </div>

                    <div class="my_projects_container_item_abslute">
                        <div class="my_projects_container_item_abslute_buttons">
                            <a href="#">Visit</a>
                            <a href="#">Code </a>
                        </div>
                        <div class="my_projects_container_item_abslute_readme">
                        <a href="#">Read<br>More</a>      
                        </div>
                    </div>
              </div>
*/
  function ProjecCard(data){

    let projectCard  = document.createElement("div");
    projectCard.classList.add("my_projects_container_item");

let image = document.createElement("div");
let imageBox = document.createElement("div");
let img = document.createElement("img");
image.classList.add("my_projects_container_item_img")
imageBox.classList.add("my_projects_container_item_img_box");
img.src= data.image; //add url here
imageBox.appendChild(img);
image.appendChild(imageBox);
      projectCard.appendChild(image);



let itemcontent = document.createElement("div");
let itemcontenth2 = document.createElement("h2");
itemcontenth2.innerText = data.name;
let itemcontentP = document.createElement("p");
itemcontentP.innerText = data.description;
itemcontent.classList.add("my_projects_container_item_content");
itemcontenth2.classList.add("my_projects_container_item_content_title");
itemcontent.appendChild(itemcontenth2);
itemcontent.appendChild(itemcontentP);
projectCard.appendChild(itemcontent);

// stack add 
let stackBox = document.createElement("div");
stackBox.classList.add("my_projects_container_item_stack");
stackBox.appendChild(document.createElement("h2")).innerText = "Stack" ;

let stackitem = document.createElement("div");
stackitem.classList.add("my_projects_container_item_stack_item");

data.stack.map((item,index)=>{
    stackitem.appendChild(document.createElement("span")).innerText =  `#${item}`;

});



projectCard.appendChild(stackBox);
projectCard.appendChild(stackitem);
      
// buttons add

let buttonsBox = document.createElement("div");
buttonsBox.classList.add("my_projects_container_item_abslute");

let buttons = document.createElement("div");
buttons.classList.add("my_projects_container_item_abslute_buttons");
let readme = document.createElement("div");

buttons.innerHTML =  `<a href="${data.visit}">Visit</a>
<a href="${data.sourceCode}">Code </a>` ;


readme.classList.add("my_projects_container_item_abslute_readme");



readme.innerHTML = `<a href="#">Read<br>More</a>`;


buttonsBox.appendChild(buttons);
buttonsBox.appendChild(readme);

projectCard.appendChild(buttonsBox);
     return projectCard;

  }


function datax(){
    return {
    name : document.querySelector(".show_content_flex p:nth-child(2)"),
    status : document.querySelector(".show_content_flex p:nth-child(3)"),
    projectContainer : document.querySelector(".my_projects_container"),
    aboutme : document.querySelectorAll(".about_me_content p"),
    socialMedia : document.querySelectorAll(".lets_contact_social_media_section .lets_contact_social_media_section_button")
 };

}

  fetch("./js/data.json").then((responce)=>{return responce.json();}).then((data)=>{


  let element= datax();
 
  element.name.innerText = data.name;
  element.status.innerText = data.status;
  element.socialMedia.forEach((s,index)=>{
    s.addEventListener( "click" ,  function(){
        window.open(data.socialMedia[index].link, "_blank");
    });
  });
  element.aboutme.forEach((p,index)=>{
      p.innerText = data.aboutme[index];
     
  });



  data.projects.forEach(project=>{
      element.projectContainer.appendChild(ProjecCard(project));
  });

  }).catch((expection)=>{console.log(expection);});